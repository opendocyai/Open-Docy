"""
Honker-based producer (rewrite of the original mq_client RabbitMQ publishing logic)

Message format stays compatible with the original mq module:
{"event": "xxx.xxx", "data": {...}, ...}
"""
import time
import typing

from loguru import logger

LOG = logger.bind(category="mq")


class Client:
    """Message producer.

    honker is backed by local SQLite, so no connection is needed;
    connect/close exist only for interface compatibility.
    """

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            LOG.error(f"[!] Exception occurred: {exc_val}")
        return False

    def connect(self):
        """honker needs no connection; kept for interface compatibility."""

    def close(self):
        """honker needs no close; kept for interface compatibility."""

    def _send(self, dispatch_fn, message: typing.Dict, max_retries: int):
        """Call a honker @task wrapper, which enqueues; retry on delivery
        failures (e.g. SQLite lock) up to max_retries."""
        retry_count = 0
        while retry_count < max_retries:
            retry_count += 1
            try:
                _t_enq = time.perf_counter()
                dispatch_fn(message)
                LOG.info(
                    f" [x] Sent {message} "
                    f"(honker enqueue {(time.perf_counter() - _t_enq) * 1000:.1f}ms)"
                )
                return
            except Exception as e:
                LOG.error(f"[!] Attempt {retry_count} failed: {e}")
                if retry_count < max_retries:
                    time.sleep(0.1 * retry_count)
        LOG.error(
            f" [!] Message delivery failed after {max_retries} attempts: {message}"
        )

    def send_message(self, message: typing.Dict, max_retries: int = 5):
        """Deliver the message to the honker mq queue, consumed and dispatched
        by workers.

        Messages are persisted to the _honker_live table and cannot be lost
        before consumption; delivery failures (e.g. SQLite lock) retry up to
        max_retries.
        """
        # Deferred import to avoid a mq_client <-> mq_server circular dependency
        from docy.core.mq.mq_server import dispatch_mq_message

        self._send(dispatch_mq_message, message, max_retries)

    def send_log_message(self, message: typing.Dict, max_retries: int = 5):
        """Deliver a task.log message to the dedicated log queue, consumed
        with concurrency=1 to preserve per-task log order."""
        # Deferred import to avoid a mq_client <-> mq_server circular dependency
        from docy.core.mq.mq_server import dispatch_log_message

        self._send(dispatch_log_message, message, max_retries)


mq_client: Client = Client()


if __name__ == "__main__":
    message = {
        "event": "demo",
        "data": {"id": "541312439350729217", "name": "AiDriven"},
    }
    for i in range(50):
        mq_client.send_message(message)
        time.sleep(0.1)
