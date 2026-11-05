import asyncio
import json
from datetime import datetime
from typing import Optional, AsyncGenerator, List

from loguru import logger as LOG
from sqlalchemy.ext.asyncio import AsyncSession

from docy.database import get_async_db_connector
from docy.models.tb_activity import ActivityTask, TaskStatus
from docy.const import LINESPLIT

class LogStream:
    """
    Log streaming handler: reads historical logs from the database and pushes live logs
    """
    def __init__(self, task_id: str, db: AsyncSession):
        self.task_id = task_id
        self.db = db
        self.last_log_position = 0

    async def get_task_with_fresh_session(self) -> ActivityTask:
        """
        Fetch the latest task object using a fresh database session
        to avoid stale data caused by Session caching.
        """
        async with get_async_db_connector() as fresh_db:
            task = await fresh_db.get(ActivityTask, self.task_id)
            return task

    async def get_logs_from_db(self, task: ActivityTask) -> list[str]:
        """Get the log list from the database"""
        if not task.last_run_logs:
            return []
        return task.last_run_logs.split(LINESPLIT)

    async def stream_logs(self) -> AsyncGenerator[dict, None]:
        """
        Stream logs:
        - push historical logs first
        - if the task is running, poll for new logs
        - if the task has finished, push remaining logs and close the connection
        """
        task = await self.get_task_with_fresh_session()
        if not task:
            yield {
                "event": "error",
                "data": json.dumps({"error": f"Task {self.task_id} not found"})
            }
            return

        # Push historical logs
        logs = await self.get_logs_from_db(task)
        LOG.info(f"Task {self.task_id} found {len(logs)} history logs, status={task.status.value}")

        await asyncio.sleep(2)  # Wait for the connection to be established

        for log_line in logs:
            yield self._format_log_event(log_line)
            await asyncio.sleep(0.1)  # Avoid pushing too fast at once

        self.last_log_position = len(logs)

        # If the task is running, poll for new logs
        if task.status == TaskStatus.IN_PROGRESS:
            LOG.info(f"Task {self.task_id} is IN_PROGRESS, watching for new logs...")
            while True:
                await asyncio.sleep(2)  # Poll every 2 seconds
                # Use a fresh session to fetch the latest task
                task = await self.get_task_with_fresh_session()
                if not task:
                    LOG.warning(f"Task {self.task_id} no longer exists")
                    break

                # Check the task status
                if task.status != TaskStatus.IN_PROGRESS:
                    LOG.info(f"Task {self.task_id} status changed to {task.status.value}, stopping watch")
                    # Push any final logs that may have appeared
                    current_logs = await self.get_logs_from_db(task)
                    if len(current_logs) > self.last_log_position:
                        new_logs = current_logs[self.last_log_position:]
                        for log_line in new_logs:
                            yield self._format_log_event(log_line)
                    break

                current_logs = await self.get_logs_from_db(task)
                # Check for new logs
                if len(current_logs) > self.last_log_position:
                    new_logs = current_logs[self.last_log_position:]
                    LOG.info(f"Task {self.task_id} has {len(new_logs)} new logs")
                    for log_line in new_logs:
                        yield self._format_log_event(log_line)
                    self.last_log_position = len(current_logs)
        else:
            LOG.info(f"Task {self.task_id} status is {task.status.value}, not watching for new logs")

    def _format_log_event(self, log_content: str) -> dict:
        """
        Format a log entry as an SSE event.
        log_content format: 2025-08-19T09:49:46.814 - Unknown error
        """
        # Try to parse the timestamp
        timestamp = None
        msg = log_content
        try:
            if " - " in log_content:
                timestamp_str, msg = log_content.split(" - ", 1)
                # Parse the ISO-format timestamp
                dt = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
                timestamp = int(dt.timestamp())
        except Exception:
            pass

        return {
            "event": "message",
            "data": json.dumps({
                "event_type": "task.log",
                "object_id": self.task_id,
                "object_type": "task",
                "content": msg,
                "payload": None,
                "timestamp": timestamp or int(datetime.utcnow().timestamp()),
                "timestring": datetime.utcnow().isoformat(timespec='seconds') + "+00:00",
            })
        }