"""
Honker-based consumer (rewrite of the original mq_server RabbitMQ consumption logic)

Consumption modes:
  - In-app: main.py's lifespan already starts the global workers via
    db.run_workers(), so the dispatch_mq_message task registered here is
    consumed automatically (see docy/honker_db.py);
  - Standalone process: instantiate Server and call start_consuming().
"""
import asyncio
import inspect
import traceback

from honker import run_workers
from loguru import logger

from docy.honker_db import db
from docy.core.mq import decorater

LOG = logger.bind(category="mq")

MQ_QUEUE_NAME = "mq"
LOG_QUEUE_NAME = "log"

# Consumption queue; messages are JSON dicts of the form {"event": ..., "data": ..., ...}
mq_queue = db.queue(MQ_QUEUE_NAME)

# Dedicated task.log queue, consumed with concurrency=1 so log lines keep
# their send order (the shared mq queue is consumed concurrently and does not
# preserve order). Other events stay on the mq queue.
log_queue = db.queue(LOG_QUEUE_NAME, visibility_timeout_s=3600)

# Event filter mode: Server(app="log") only handles task.log events; the rest are dropped
_app_filter = "default"


def _resolve_handler(event: str):
    return decorater.get_backend(f'on_{event.replace(".", "_")}')


@log_queue.task(name="docy.log.dispatch", retries=3, retry_delay_s=5, store_result=False)
async def dispatch_log_message(message: dict):
    """Worker consumption entry for the log queue: task.log events only.

    Consumed with concurrency=1 (see main.py) so log lines are processed
    strictly in enqueue order; a retry re-schedules and does not block the
    queue. Non-log events are dropped defensively - producers must use
    send_log_message for task.log.
    """
    event = message.get("event")
    if event != "task.log":
        LOG.warning(f"non-task.log event on the log queue, dropped: {event}")
        return
    handler = _resolve_handler(event)
    if not handler:
        LOG.error(f"[!] function <{event}> not found!")
        return
    LOG.info(f"[x] Received log message: {event}")
    try:
        if inspect.iscoroutinefunction(handler):
            await handler(**message)
        else:
            await asyncio.to_thread(handler, **message)
    except Exception as e:
        LOG.error(f"[!] Log function execution failed: {e}\n{traceback.format_exc()}")
        raise  # Hand to honker for retry/dead-letter, preserving the error context


@mq_queue.task(name="docy.mq.dispatch", retries=3, retry_delay_s=5, store_result=False)
async def dispatch_mq_message(message: dict):
    """Worker consumption entry point: take a message from the queue and
    dispatch it to the registered handler by event.

    Messages are persisted in the _honker_live table; consumption uses a
    claim/ack mechanism, so messages are re-claimed after a worker crash and
    never lost. Handler failures raise, are retried by honker up to retries,
    and then go to the dead-letter table (_honker_dead) for inspection in
    the database, never silently dropped.
    """
    event = message.get("event")
    if not event:
        LOG.warning(f"message missing the event field, dropped: {message}")
        return
    if _app_filter == "log" and event != "task.log":
        # The log mq only cares about log events; others are ignored
        return
    handler = _resolve_handler(event)
    if not handler:
        LOG.error(f"[!] function <{event}> not found!")
        return
    LOG.info(f"[x] Received message: {event}")
    try:
        if inspect.iscoroutinefunction(handler):
            await handler(**message)
        else:
            await asyncio.to_thread(handler, **message)
    except Exception as e:
        LOG.error(f"[!] Function execution failed: {e}\n{traceback.format_exc()}")
        raise  # Hand to honker for retry/dead-letter, preserving the error context


class Server:
    """Consumer service.

    In honker mode queue consumption is done by worker loops:
      - In the same process as the app this class is not needed; main.py's
        lifespan already started the global workers;
      - For a standalone consumption process:

            server = Server(app="default")
            await server.start_consuming(stop_event)

    Multiple consumers (in-process workers and standalone Servers) can
    consume the same queue; honker's claim mechanism guarantees each message
    is claimed by only one worker.
    """

    def __init__(
        self,
        app: str = "default",
        queue_name: str = MQ_QUEUE_NAME,
        concurrency: int | None = None,
    ):
        global _app_filter
        self.app = app
        self.queue_name = queue_name
        self.concurrency = concurrency
        _app_filter = app

    async def start_consuming(self, stop_event: asyncio.Event | None = None):
        """Start the consumption loop until stop_event is set."""
        stop_event = stop_event or asyncio.Event()
        LOG.info(f"[*] Waiting for messages in {self.queue_name}...")
        await run_workers(
            db,
            queue=self.queue_name,
            concurrency=self.concurrency or 1,
            stop_event=stop_event,
        )

    async def close(self):
        """honker is backed by local SQLite, so no connection needs closing;
        kept for interface compatibility.
        """


from docy.core.mq import event  # noqa: E402,F401  # Importing it registers the event handlers
