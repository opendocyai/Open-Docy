import asyncio
from loguru import logger
from docy.honker_db import db

logger = logger.bind(category="task")


# Regular tasks
# Tasks decorated with @db.task() are enqueued when invoked manually.
# Auto-registered into the global TaskRegistry on import.

@db.task(queue="default", retries=3)
async def example_task(name: str) -> dict:
    await asyncio.sleep(3)
    logger.info(f"example_task({name})")
    return {"hello": name}


# Scheduled tasks
# @db.task() registers the task function; scheduler.add() binds the schedule.
# Both share one Scheduler instance to avoid WAL snapshot races.

@db.task(queue="cron", store_result=False)
async def heartbeat() -> dict:
    logger.info("heartbeat tick")
    return {"tick": True}


@db.task(queue="cron", store_result=False)
async def cleanup_expired_files() -> dict:
    logger.info("cleanup_expired_files")
    return {"cleaned": 0}


@db.task(queue="cron", store_result=False)
async def daily_report() -> dict:
    logger.info("daily_report")
    return {"report": "ok"}


# Pub/Sub subscriptions
# Listener background tasks start in lifespan; received events are enqueued as tasks.

@db.task(queue="default", retries=2)
async def handle_file_uploaded(payload: dict) -> dict:
    logger.info(f"file_uploaded event: {payload}")
    return {"processed": True}


@db.task(queue="default", retries=2)
async def handle_user_action(payload: dict) -> dict:
    logger.info(f"user_action event: {payload}")
    return {"processed": True}


async def start_subscribers(stop_event: asyncio.Event):
    """
    Subscribe to the honker notification channel and enqueue received events as @tasks.

    Same as the scheduler: exit gracefully via stop_event so CancelledError never
    crosses the Rust layer.
    """
    channels = {
        "file_uploaded": handle_file_uploaded,
        "user_action": handle_user_action,
    }

    async def _listen(channel: str, task_handler):
        listener = db.listen(channel)
        logger.info(f"Subscribed to channel: {channel}")
        while not stop_event.is_set():
            try:
                notification = await asyncio.wait_for(
                    listener.__anext__(), timeout=1.0
                )
                logger.info(
                    f"[{channel}] notification received id={notification.id}, payload={notification.payload}"
                )
                task_handler(notification.payload)
            except asyncio.TimeoutError:
                continue  # normal timeout; loop back and check stop_event
            except StopAsyncIteration:
                logger.warning(f"[{channel}] listener iterator ended; resubscribing")
                await asyncio.sleep(1)
                listener = db.listen(channel)
        logger.info(f"[{channel}] subscription stopped")

    tasks = [
        asyncio.create_task(_listen(ch, handler))
        for ch, handler in channels.items()
    ]
    await stop_event.wait()
    for t in tasks:
        t.cancel()
    await asyncio.gather(*tasks, return_exceptions=True)

