"""In-process AI executor (replaces the cloud invocation in the old aws_lambda.py).

The ai/ package is embedded in docy and designed to be called in-process:
`from lambda_function import lambda_handler` (see ai/README.md). Jobs are
dispatched to a dedicated honker "ai" queue so the event loop is never
blocked (honker runs sync task functions via asyncio.to_thread).
"""

import sys
import time
from pathlib import Path
from typing import Dict, Optional

from loguru import logger

from docy.exceptions.exception import AiPluginNotInstalled
from docy.honker_db import db
from docy.services.common.ai_package import ai_plugin_installed

LOG = logger.bind(category="ai-executor")

_AI_DIR = Path(__file__).resolve().parent.parent / "ai"


def _ensure_ai_importable() -> None:
    """Make the embedded ai package importable.

    ai/ uses top-level imports (`import config`, `from run_context import ...`),
    so the directory itself must be on sys.path.
    """
    if str(_AI_DIR) not in sys.path:
        sys.path.insert(0, str(_AI_DIR))


# Module-level so the worker process has ai/ on sys.path before its first job:
# run_ai_task imports docy.ai lazily, and the obfuscated ai/__init__ wrapper
# needs the dir on sys.path to locate its bundled pyarmor runtime.
_ensure_ai_importable()


class HonkerClient:
    """AI execution client backed by the honker "ai" queue.

    Execution happens in a SEPARATE process (docy.ai_worker, spawned by
    `docy run`), so the workflow's heavy blocking work (soffice PDF
    conversion, pandas, LLM calls) never competes with the API event loop.
    This module is the enqueue side only: call_lambda() inserts the job;
    the worker process claims and runs it.

    AI workflows are long-running (10+ minutes). The ai_worker keeps the
    claim lease of the running job alive via a heartbeat thread, so the
    visibility timeout only needs to cover the heartbeat cadence: 900s with
    a 60s/600s heartbeat leaves a wide margin, and a crashed worker's job
    becomes re-claimable by another worker within <=15 minutes (stale
    'processing' rows with expired leases are also cancelled at worker
    startup). retries=1 keeps failures in _honker_dead instead of
    re-running expensive workflows (the ai code itself reports failures via
    MQ events).
    """

    queue = db.queue("ai", visibility_timeout_s=900)

    @staticmethod
    @queue.task(name="docy.ai.run", retries=1, store_result=False)
    def run_ai_task(event: Dict, context: Optional[Dict] = None) -> Dict:
        """Execute one AI job. Honker runs this sync function via
        asyncio.to_thread, so the event loop is never blocked.

        lambda_handler is imported lazily: the heavy ai package loads on the
        first execution (in a worker thread) instead of slowing down startup,
        and startup does not fail when the ai dependencies are missing.
        """
        try:
            from docy.ai.lambda_function import lambda_handler
        except Exception as e:
            LOG.exception("ai job: failed to import lambda_handler")
            return {
                "status": "failed",
                "error": f"{e}. {AiPluginNotInstalled().detail}",
            }
        finally:
            _ensure_ai_importable()
        try:
            return lambda_handler(event, context)
        except Exception as e:
            # Workflow success/failure is reported by the ai code itself via MQ
            # (task.finish etc.). The queued job returns normally either way so
            # honker acks it (completed status), avoiding dead-letter buildup,
            # duplicate re-execution on retry, and stuck 'processing' rows.
            LOG.exception(f"ai job failed: {e}")
            return {"status": "failed", "error": str(e)}

    def invoke(self, event: Dict, asynchronous: bool = True) -> Optional[Dict]:
        """asynchronous=True: enqueue and return immediately (fire-and-forget,
        persisted in SQLite, single attempt).
        asynchronous=False: run in the calling thread and return the result
        (same blocking semantics as the old synchronous boto3 invoke).
        """
        if not ai_plugin_installed():
            raise AiPluginNotInstalled()
        _ensure_ai_importable()
        if asynchronous:
            t0 = time.perf_counter()
            self.run_ai_task(event)
            LOG.info(
                f"[perf] honker ai-job enqueue took "
                f"{(time.perf_counter() - t0) * 1000:.1f}ms (sync on event loop)"
            )
            return None
        return self.run_ai_task.fn(event, None)


honker_client = HonkerClient()


def call_lambda(
    func_name: str,
    func_params: Dict,
    asynchronous=False,
    log_type="Tail",
    client=None,
):
    """Drop-in replacement for the old core/aws_lambda.py call_lambda.

    func_name / log_type / client are accepted but unused:
    the ai package runs in-process, no cloud dispatch is involved.
    """
    return honker_client.invoke(func_params, asynchronous=asynchronous)
