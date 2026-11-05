"""Separate-process consumer for the honker "ai" queue.

The ai workflow does heavy blocking work (soffice PDF conversion, pandas,
LLM calls). Running it inside the FastAPI process starved the event loop;
this module moves execution into its own OS process, spawned automatically
by `docy run` (see main.py lifespan) or started manually via
`uv run docy ai-worker`.

Parallelism across tasks comes from running MULTIPLE worker processes:
each process drains the same queue and runs one workflow at a time (the ai
package keeps per-job state in module-level globals, so two workflows must
never share a process). honker claims are atomic, so a job is executed by
exactly one worker. A heartbeat thread keeps the claim lease of the running
job alive; a crashed worker stops heartbeating and its job becomes
claimable again within one lease period.
"""

import asyncio
import faulthandler
import os
import threading
import time
from pathlib import Path

from loguru import logger

LOG = logger.bind(category="ai-worker")

# Hard crashes (rc=3221225477 = 0xC0000005) leave no Python traceback in
# stderr; faulthandler dumps all thread stacks at crash time to this file.
# The watcher in main.py tails it when respawning. Enabled at module level
# so import-time crashes are covered too.
FAULT_LOG = Path(__file__).resolve().parent / "storage" / "logs" / "ai_worker_fault.log"

try:
    FAULT_LOG.parent.mkdir(parents=True, exist_ok=True)
    _fault_fh = FAULT_LOG.open("a", encoding="utf-8")
except OSError:
    _fault_fh = None

faulthandler.enable(file=_fault_fh, all_threads=True)
LOG.info(f"faulthandler enabled -> {FAULT_LOG}")

# Job claim lease and heartbeat cadence (queue visibility is 900s):
# a dead worker stops heartbeating, the lease expires within <=15min and
# another worker re-claims the job.
HEARTBEAT_INTERVAL_S = 60
HEARTBEAT_EXTEND_S = 600


def _cancel_stale_jobs(db, ai_queue) -> None:
    """Cancel only 'processing' rows whose claim lease already expired -
    leftovers of a dead worker. Rows of live workers have a future
    claim_expires_at (kept alive by their heartbeat) and must not be
    touched; with a worker fleet there is no global lock making all
    processing rows safe to cancel."""
    now = time.time()
    with db.transaction() as tx:
        stale_rows = tx.query(
            "SELECT id FROM _honker_live WHERE queue = 'ai' "
            "AND state = 'processing' AND claim_expires_at < ?",
            [now],
        )
    for stale_row in stale_rows:
        ai_queue.cancel(stale_row["id"])
        LOG.info(f"cancelled stale processing job {stale_row['id']}")


async def _run_ai_job(job, run_ai_task) -> None:
    """Run one claimed ai job in a thread with a heartbeat thread keeping
    the claim lease alive; ack on success, dead-letter on crash."""
    envelope = (job.payload or {}).get("__honker_task__") or {}
    args = envelope.get("args", [])
    kwargs = envelope.get("kwargs", {})
    stop_flag = threading.Event()

    def _heartbeat() -> None:
        # Runs in a dedicated thread: the sync job phase (soffice, LLM)
        # blocks the event loop for minutes, so an asyncio-based heartbeat
        # would stall. The lease is 900s; extending 600s every 60s leaves a
        # wide margin against SQLite hiccups.
        while not stop_flag.wait(HEARTBEAT_INTERVAL_S):
            if not job.heartbeat(extend_s=HEARTBEAT_EXTEND_S):
                LOG.error(f"ai job {job.id} lease heartbeat failed")

    hb_thread = threading.Thread(
        target=_heartbeat, name="ai-job-heartbeat", daemon=True
    )
    hb_thread.start()
    try:
        await asyncio.to_thread(run_ai_task, *args, **kwargs)
        job.ack()
    except Exception as e:
        # run_ai_task reports workflow failures itself via MQ and returns
        # normally; reaching here means the job crashed unexpectedly.
        LOG.exception(f"ai job {job.id} crashed: {e}")
        job.fail(error=str(e))
    finally:
        stop_flag.set()
        hb_thread.join(timeout=15)


async def _drain_ai_queue(ai_queue, run_ai_task, stop_event) -> None:
    """Claim one job at a time and run it. Parallelism across tasks comes
    from multiple worker processes draining this same queue."""
    worker_id = f"ai-worker-{os.getpid()}"
    LOG.info(f"ai-worker consuming queue=ai worker_id={worker_id} pid={os.getpid()}")
    async for job in ai_queue.claim(worker_id, idle_poll_s=5.0):
        if stop_event.is_set():
            job.retry(delay_s=0, error="worker shutting down")
            return
        await _run_ai_job(job, run_ai_task)


async def _run() -> None:
    from docy.honker_db import db  # registers all tasks; ai queue options match the API side
    from docy.core.log.logger import configure
    from docy.core.aiexecutor import honker_client

    configure(file_suffix="_ai_worker")

    ai_queue = db.queue("ai")
    _cancel_stale_jobs(db, ai_queue)

    # Sweep per-run temp roots (Cache/runs/<uniq>/) left by crashed/killed
    # runs; the >24h age guard keeps it safe while other workers are live.
    from docy.ai.run_context import sweep_stale_run_dirs

    swept = sweep_stale_run_dirs(max_age_hours=24.0)
    if swept:
        LOG.info(f"swept {swept} stale run temp dir(s)")

    stop_event = asyncio.Event()
    try:
        await _drain_ai_queue(ai_queue, honker_client.run_ai_task.fn, stop_event)
    finally:
        stop_event.set()
        await logger.complete()


def main() -> None:
    # Load the root .env (the main process loads it first and children inherit it; this
    # covers manual `python -m docy.ai_worker` runs or cases where the environment was
    # not inherited)
    from dotenv import load_dotenv

    if not load_dotenv():
        load_dotenv(Path.cwd() / ".env")
    # The server process passes its resolved log dir (--log-dir override
    # included) through the environment so worker logs land in the same
    # directory.
    log_dir = os.environ.get("DOCY_LOG_DIR")
    if log_dir:
        from docy.core.settings import project_settings as settings

        settings.default.log_dir = log_dir
    asyncio.run(_run())


if __name__ == "__main__":
    main()
