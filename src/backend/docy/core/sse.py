"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/25
Last Modified: 2026/8/14
Filename: sse
Description: honker-based SSE notification wrapper
(replaces the original redis pub/sub implementation)
"""

import asyncio
import json
import time
from datetime import datetime, timezone
from typing import List, AsyncGenerator

from loguru import logger

from docy.forms import EventForm
from docy.exceptions.exception import InvalidParameters
from docy.honker_db import db

LOG = logger.bind(category="sse")

GLOBAL_CHANNEL = "sse:global_channel"
USER_CHANNEL_PREFIX = "sse:user:"
CHANNEL_PREFIX = "sse:"

# _honker_notifications is never auto-cleaned; throttle deletion of expired
# notifications by time to keep the table from growing unbounded
NOTIFICATION_TTL_S = 3600
PRUNE_INTERVAL_S = 600
# Per-pull timeout for the listener; on timeout, loop back to check the stop
# flag and exit gracefully
LISTENER_POLL_S = 1.0


class SSEManager:
    """
    honker-based SSE connection management

    - Subscribe: db.listen(channel) returns a Listener that only receives
      notifications published after subscribing (same semantics as pg_notify)
    - Publish: db.transaction() + tx.notify(channel, payload)
    """

    def __init__(self):
        self._last_prune_at = 0.0

    def create_connection(self, event: EventForm, global_channel: bool = True) -> List:
        """
        Set up subscription connections and return the listener list:
        with an object_id, subscribe to the object-specific channel, plus
        the global channel on demand.
        """
        listeners = []
        if event.object_id:
            listeners.append(
                db.listen(f"{CHANNEL_PREFIX}{event.object_type}:{event.object_id}")
            )
        if global_channel:
            listeners.append(db.listen(GLOBAL_CHANNEL))
        return listeners

    async def generate_events(self, listeners) -> AsyncGenerator[str, None]:
        """
        Collect notifications from all listeners and yield JSON strings one by one.
        Exit gracefully via the stop flag to avoid CancelledError leaking
        through the Rust layer (see docy.tasks.start_subscribers).
        """
        queue: asyncio.Queue = asyncio.Queue()
        stop = asyncio.Event()
        pumps = [
            asyncio.create_task(self._pump(listener, queue, stop))
            for listener in listeners
        ]
        try:
            while True:
                yield await queue.get()
        finally:
            stop.set()
            await asyncio.gather(*pumps, return_exceptions=True)

    async def _pump(self, listener, queue: asyncio.Queue, stop: asyncio.Event) -> None:
        while not stop.is_set():
            try:
                notification = await asyncio.wait_for(
                    listener.__anext__(), timeout=LISTENER_POLL_S
                )
            except asyncio.TimeoutError:
                continue
            except StopAsyncIteration:
                LOG.warning(f"listener ended: {listener.channel}")
                return
            except Exception as e:
                LOG.error(f"listener error: {listener.channel}: {e}")
                return
            payload = notification.payload
            if not isinstance(payload, str):
                payload = json.dumps(payload)
            queue.put_nowait(payload)

    def _maybe_prune(self) -> None:
        now = time.monotonic()
        if now - self._last_prune_at < PRUNE_INTERVAL_S:
            return
        try:
            removed = db.prune_notifications(older_than_s=NOTIFICATION_TTL_S)
            if removed:
                LOG.debug(f"pruned {removed} expired sse notifications")
        except Exception as e:
            LOG.error(f"prune sse notifications failed: {e}")
        finally:
            self._last_prune_at = now

    async def push_message(self, event: EventForm, global_message: bool = False):
        data = event.model_dump()
        utc_time = datetime.now(timezone.utc)
        data["timestamp"] = int(utc_time.timestamp())
        data["timestring"] = f"{utc_time.isoformat(timespec='seconds')}+00:00"
        try:
            if global_message:
                channel = GLOBAL_CHANNEL
            else:
                if not event.object_id:
                    raise InvalidParameters("Targeted messages must specify an object_id.")
                channel = f"{CHANNEL_PREFIX}{event.object_type}:{event.object_id}"
            with db.transaction() as tx:
                tx.notify(channel, json.dumps(data))
            self._maybe_prune()
        except InvalidParameters:
            raise
        except Exception as e:
            LOG.error(f"push message failed: {e}")


sse_manager = SSEManager()
