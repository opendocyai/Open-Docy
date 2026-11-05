"""
Task log handler.

Persists task run logs (pushed by AI through MQ) into the local disk cache
(cashews + diskcache, the OSE replacement for Redis) and into
`ActivityTask.last_run_logs` as the durable source of truth.
"""

import asyncio
import json
import logging
import re
import time
from datetime import datetime
from pathlib import Path

from docy.cache.cache_utils import (
    delete_key_from_cache,
    get_from_cache,
    save_to_cache,
)
from docy.const import LINESPLIT, TASK_LOG
from docy.database import get_async_db_connector
from docy.models.tb_activity import ActivityTask, TaskRecord
from docy.utils.sql_query import async_retrieve_object

log_path = Path(__file__).parent / "task_logs"


def utc_converter(*args):
    return time.gmtime()


class LOGHandler:
    """
    Deprecated: file-based task logs were abandoned.
    Kept only for the log-line parsing helpers used by LogStream.
    """

    def __new__(cls, *args, **kwargs):
        instance = super().__new__(cls)
        if not log_path.exists():
            log_path.mkdir(parents=True, exist_ok=True)
        setattr(cls, "log_path", log_path)
        return instance

    def add_log_handle(self, logger, task_id):
        # Initialize logging
        logger.setLevel(logging.INFO)

        # Create a separate log file per task ID
        handler = logging.FileHandler(
            self.log_path / f"{task_id}.log", encoding="utf-8"
        )
        formatter = logging.Formatter(
            "%(asctime)s.%(msecs)03d - %(message)s", datefmt="%Y-%m-%dT%H:%M:%S"
        )
        formatter.converter = utc_converter
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        return logger

    def clean_log_file(self, task_id):
        """
        Clean up the log file.
        """
        try:
            with open(self.log_path / f"{task_id}.log", "w") as f:
                f.truncate()
            return True
        except Exception as e:
            print(f"Failed to clear file: {str(e)}")
            return False

    def cleanup_task_logger(self, task_id):
        """
        Clean up the logging resources of a task.
        """
        logger = logging.getLogger(f"task_{task_id}")
        for h in logger.handlers[:]:
            logger.removeHandler(h)
            h.close()

    def get_task_logger(self, task_id):
        """
        Attach a logger to the task.
        """
        logger = logging.getLogger(f"task_{task_id}")
        if not logger.handlers[:]:
            self.add_log_handle(logger, task_id)
        return logger

    @staticmethod
    def split_single_log(log_str):
        pattern = r"^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}) - (.*)$"
        match = re.match(pattern, log_str, re.DOTALL)
        if match:
            _timestamp = match.group(1)
            dt_obj = datetime.strptime(_timestamp, "%Y-%m-%dT%H:%M:%S")
            _timestamp = dt_obj.timestamp()
            return _timestamp, match.group(2)
        return None, None


class CacheLogHandler:
    """
    Buffer task logs in the local disk cache (cashews + diskcache),
    with ActivityTask.last_run_logs as the durable store.
    """

    log_cache_prefix = "task_log_"
    line_split = LINESPLIT
    log_expire = 3 * 24 * 3600  # cached logs expire after 3 days

    # Per-task locks: task.log events of one task are dispatched concurrently
    # (mq queue consumed with concurrency=cpu_count), and their read-modify-write
    # on the cache/DB row must be serialized. Class-level so every instance
    # (incl. LogStream's) shares the same locks.
    _locks: dict[str, asyncio.Lock] = {}

    @classmethod
    def _lock(cls, task_id: str) -> asyncio.Lock:
        lock = cls._locks.get(task_id)
        if lock is None:
            lock = asyncio.Lock()
            cls._locks[task_id] = lock
        return lock

    @staticmethod
    def split_single_log(log_str):
        pattern = r"^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}) - (.*)$"
        match = re.match(pattern, log_str, re.DOTALL)
        if match:
            _timestamp = match.group(1)
            dt_obj = datetime.strptime(_timestamp, "%Y-%m-%dT%H:%M:%S.%f")
            _timestamp = dt_obj.timestamp()
            return _timestamp, match.group(2)
        return None, None

    def _cache_key(self, task_id: str) -> str:
        return f"{self.log_cache_prefix}{task_id}"

    async def cleanup_task_logger(self, task_id: str, db=None):
        """
        Clear cached and persisted logs before each task run.
        Serialized against concurrent log writes by the per-task lock.
        """
        async with self._lock(task_id):
            await delete_key_from_cache(self._cache_key(task_id))
            if db:
                task = await async_retrieve_object(db, ActivityTask, o_id=task_id)
                if task:
                    task.last_run_logs = None
                    db.add(task)
                    await db.commit()

    async def _cached_log(self, task_id: str, db, content: str):
        """
        Buffer a new log line in the local cache. When the cache entry expired,
        refill it from the database first so cached and persisted logs stay in sync.
        Callers must hold the per-task lock.
        """
        key = self._cache_key(task_id)
        logs = await get_from_cache(key)
        if not logs:
            logs = await self.get_logs_from_db(task_id, db)
        else:
            logs = logs.split(self.line_split)
        logs.append(content)
        await save_to_cache(key, self.line_split.join(logs), ex=self.log_expire)

    async def _cached_log_to_db(self, task_id: str, db, content: str):
        """
        Append a log line to ActivityTask.last_run_logs (durable store).
        Callers must hold the per-task lock.
        """
        task = await async_retrieve_object(db, ActivityTask, o_id=task_id)
        logs = await self.get_logs_from_db(task_id, db)
        if task:
            logs.append(content)
            task.last_run_logs = self.line_split.join(logs)
            db.add(task)
            await db.commit()

    async def get_task_logs(self, task_id=None, db=None):
        """
        Get all logs of a task: read from the local cache first,
        fall back to the database and refill the cache.
        """
        all_logs = []
        if task_id:
            logs = await get_from_cache(self._cache_key(task_id))
            if logs:
                all_logs = logs.split(self.line_split)
        if db and not all_logs and task_id:
            all_logs = await self.get_logs_from_db(task_id, db)
            if all_logs:
                await save_to_cache(
                    self._cache_key(task_id),
                    self.line_split.join(all_logs),
                    ex=self.log_expire,
                )
        return all_logs

    async def get_logs_from_db(self, task_id, db):
        """
        Read persisted logs from the database.
        """
        all_logs = []
        task = await async_retrieve_object(db, ActivityTask, o_id=task_id)
        if task and task.last_run_logs:
            all_logs = task.last_run_logs.split(self.line_split)
        return all_logs

    async def write_log(self, task_id, db, log, run_id=None, model=None):
        """
        Append one log line (cache + durable store) under the per-task lock.
        When run_id is given, the log is dropped unless it belongs to the task's
        current run; the check runs inside the lock so a stale log can never be
        written after a cleanup.
        """
        async with self._lock(task_id):
            # Drop identity-map snapshots loaded before the lock: handlers
            # of one task run concurrently (mq consumed with
            # concurrency=cpu_count) and each session caches the task row on
            # its first (pre-lock) read. Re-reading without expiring would
            # return that stale snapshot and let a handler overwrite logs
            # committed by another one after the snapshot was taken.
            db.expire_all()
            if run_id is not None:
                task = await async_retrieve_object(
                    db, model or ActivityTask, o_id=task_id
                )
                if task is None:
                    return
                if task.last_run_id != run_id:
                    # task.finish clears last_run_id while the run's final logs
                    # may still be in flight; accept them if the run is real
                    # (it has a task record). A different non-None last_run_id
                    # means a newer run started - stale logs are dropped.
                    if task.last_run_id is not None:
                        return
                    record = await async_retrieve_object(
                        db, TaskRecord, condition=[TaskRecord.run_id == run_id]
                    )
                    if record is None:
                        return
            await self._cached_log(task_id, db, log)
            await self._cached_log_to_db(task_id, db, log)


task_log_handler = CacheLogHandler()


class LogStream:
    """
    Stream history logs of a task. Realtime log pushing is handled by
    docy.core.logstream.LogStream in the new codebase.
    """

    def __init__(self, task_id, request=None):
        self.task_id = task_id
        self.request = request
        self.handler = CacheLogHandler()

    async def _read_history_log(self):
        try:
            async with get_async_db_connector() as db:
                logs = await self.handler.get_task_logs(self.task_id, db)
                for line in logs:
                    yield line
        except Exception:
            raise

    async def stream_logs(self, event_form=None):
        async for log in self._read_history_log():
            if self.request and await self.request.is_disconnected():
                break
            await asyncio.sleep(0.1)
            # Split the content into timestamp and log message
            _timestamp, msg = LOGHandler.split_single_log(log)
            if not all([_timestamp, msg]):
                continue
            data = {
                "event_type": TASK_LOG,
                "object_id": self.task_id,
                "object_type": "task",
                "content": msg,
                "payload": None,
                "timestamp": int(_timestamp),
                "timestring": f"{datetime.fromtimestamp(_timestamp).isoformat(timespec='seconds')}+00:00",
            }
            yield json.dumps(data)


async def main():
    task_id = "579578027638266369"
    async with get_async_db_connector() as db:
        logs = await task_log_handler.get_task_logs(task_id, db)
        for log_item in logs:
            print(log_item)


if __name__ == "__main__":
    asyncio.run(main())
