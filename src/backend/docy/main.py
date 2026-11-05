import asyncio
import importlib
import json
import os
import re
import subprocess
import sys
import time
import warnings
from contextlib import asynccontextmanager
from http import HTTPStatus
from pathlib import Path
from typing import TYPE_CHECKING
from urllib.parse import urlencode
from pydantic import PydanticDeprecatedSince20
from pydantic_core import PydanticSerializationError

from fastapi import FastAPI, HTTPException, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi_pagination import add_pagination
from starlette.middleware.authentication import AuthenticationMiddleware

from loguru import logger

from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint

from docy.api.router import router, register_special_path
from docy.core.log.logger import configure
from docy.core.web import resolve_static_dir, setup_static_files
from docy.services.auth.backend import BearerTokenAuthBackend
from docy.core.settings import project_settings as settings
from docy.exceptions.handler import register_exception


# Ignore Pydantic deprecation warnings from Langchain
warnings.filterwarnings("ignore", category=PydanticDeprecatedSince20)

class RequestCancelledMiddleware(BaseHTTPMiddleware):
    def __init__(self, app) -> None:
        super().__init__(app)

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        sentinel = object()

        async def cancel_handler():
            while True:
                if await request.is_disconnected():
                    return sentinel
                await asyncio.sleep(0.1)

        handler_task = asyncio.create_task(call_next(request))
        cancel_task = asyncio.create_task(cancel_handler())

        done, pending = await asyncio.wait([handler_task, cancel_task], return_when=asyncio.FIRST_COMPLETED)

        for task in pending:
            task.cancel()

        if cancel_task in done:
            return Response("Request was cancelled", status_code=499)
        return await handler_task

class JavaScriptMIMETypeMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        try:
            response = await call_next(request)
        except Exception as exc:
            if isinstance(exc, PydanticSerializationError):
                message = (
                    "Something went wrong while serializing the response. "
                    "Please share this error on our GitHub repository."
                )
                error_messages = json.dumps([message, str(exc)])
                raise HTTPException(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, detail=error_messages) from exc
            raise
        if (
            "files/" not in request.url.path
            and request.url.path.endswith(".js")
            and response.status_code == HTTPStatus.OK
        ):
            response.headers["Content-Type"] = "text/javascript"
        return response

def _filter_loop_transport_noise() -> None:
    """Silence the benign proactor error logged when a client aborts a connection.

    On Windows the proactor transport's connection-lost callback calls
    shutdown() on an already-reset socket, which raises ConnectionResetError
    (WinError 10054); asyncio logs it as an ERROR although the server is fine.
    """
    loop = asyncio.get_running_loop()
    previous_handler = loop.get_exception_handler()

    def _handler(loop, context):
        exc = context.get("exception")
        # Transport callbacks (the proactor noise) carry no "task" key; a
        # "Task exception was never retrieved" context does - those must stay
        # visible since they may hide a real bug.
        if isinstance(exc, (ConnectionResetError, ConnectionAbortedError)) and "task" not in context:
            return
        if previous_handler is not None:
            previous_handler(loop, context)
        else:
            loop.default_exception_handler(context)

    loop.set_exception_handler(_handler)


def add_schedule_tasks(scheduler):
    """
    Add scheduled tasks.
    """
    scheduler.lock_ttl = 15  # shorter TTL recovers faster even after a crash
    return scheduler.list()


def _last_ai_worker_fault() -> str:
    """Tail of the ai-worker faulthandler log (crash stack), if any."""
    path = Path(__file__).resolve().parent / "storage" / "logs" / "ai_worker_fault.log"
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return ""
    return "\n".join(text.splitlines()[-40:])


def _spawn_ai_worker() -> subprocess.Popen:
    """Spawn the ai worker process.

    Under an IDE debugger (debugpy), pydevd monkey-patches
    _winapi.CreateProcess and relaunches every python child under debugpy.
    The pyarmor-obfuscated ai package must not run under debugger
    instrumentation (sys.monitoring on protected frames segfaults the
    interpreter), so restore the original CreateProcess first - the worker
    then starts as plain python. Harmless when no debugger is attached.
    """
    if os.name == "nt":
        for mod_name in ("_winapi", "_subprocess"):
            try:
                mod = importlib.import_module(mod_name)
            except ImportError:
                continue
            original = getattr(mod, "original_CreateProcess", None)
            if original is not None and mod.CreateProcess is not original:
                mod.CreateProcess = original
                logger.info(
                    "debugpy CreateProcess patch restored; ai-worker will "
                    "run without debugger instrumentation"
                )
                break
    # The ai_worker runs on the same machine as this process, so the loopback
    # address is always reachable; use the port resolved at startup (settings may
    # have been rewritten by --port or port-occupancy detection) so the ai/config.py
    # fallback port cannot disagree with the actually listening port.
    env = os.environ.copy()
    env["DOCY_API_HOST"] = (
        f"http://127.0.0.1:{settings.server.http_server_port}/api/v1"
    )
    env["DOCY_LOG_DIR"] = str(settings.default.log_dir)
    return subprocess.Popen([sys.executable, "-m", "docy.ai_worker"], env=env)


def _ai_worker_count() -> int:
    """Number of parallel ai worker processes. Each worker runs one workflow
    at a time (the ai package keeps per-job state in module globals); the
    fleet provides cross-task parallelism via process isolation."""
    try:
        count = int(os.environ.get("DOCY_AI_WORKERS", "2"))
    except (TypeError, ValueError):
        return 2
    return max(1, min(count, 16))


def get_lifespan(*, fix_migration=False, version=None):

    @asynccontextmanager
    async def lifespan(_app: FastAPI):
        from docy.database.service import DatabaseService
        from docy.database.db_sqllite import SQLiteDatabase
        from docy.honker_db import db  # noqa: F811  # triggers @task registration
        from docy.tasks import start_subscribers  # noqa: F811
        from honker import LockHeld, Scheduler, crontab, every_s

        configure(async_file=True)
        _filter_loop_transport_noise()
        from docy.core.security_guard import assert_secrets_not_default

        assert_secrets_not_default()
        db_url = SQLiteDatabase.get_db_path(is_sync=False)
        db_service = DatabaseService(db_url)
        await db_service.run_migrations(fix=fix_migration)

        # Menu/default-role initialization (idempotent: skipped when menus already exist)
        from docy.database import get_async_db_connector
        from docy.services.menu.init_menu import init_menu_and_roles
        async with get_async_db_connector() as menu_init_db:
            await init_menu_and_roles(menu_init_db)

        # Force-release any stale lock left behind at startup
        with db.transaction() as tx:
            tx.query("DELETE FROM _honker_locks WHERE name = ?", ["honker-scheduler"])

        scheduler = Scheduler(db)
        tasks = add_schedule_tasks(scheduler)

        stop_event = asyncio.Event()
        async def _run_scheduler():
            for attempt in range(1, 8):
                try:
                    await scheduler.run(stop_event=stop_event)
                    return
                except LockHeld:
                    wait = min(10 * attempt, 60)
                    logger.warning(
                        f"scheduler lock held (attempt {attempt}); retrying in {wait}s..."
                    )
                    await asyncio.sleep(wait)
                except Exception as exc:
                    logger.exception(f"scheduler exited abnormally: {exc}")
                    return
            logger.error("scheduler retries exhausted; not started")

        addition_tasks = []
        # The ai queue is consumed by a separate process (docy.ai_worker), not here:
        # workflows are long heavy jobs (PDF conversion/LLM), and in-process
        # execution would slow down every endpoint
        from honker import registry
        cpu_concurrency = os.cpu_count() or 1
        for queue_name in registry().queues() - {"ai"}:
            # The log queue must be consumed by a single worker: task.log
            # lines arrive via MQ and concurrent consumption would scramble
            # their order (and the lost-update races it caused). Every other
            # queue keeps full concurrency.
            queue_concurrency = 1 if queue_name == "log" else cpu_concurrency
            addition_tasks.append(asyncio.create_task(
                db.run_workers(queue=queue_name, concurrency=queue_concurrency, stop_event=stop_event)
            ))
        if tasks:
            scheduler_task = asyncio.create_task(_run_scheduler())
            addition_tasks.append(scheduler_task)
        subscriber_task = asyncio.create_task(start_subscribers(stop_event))
        addition_tasks.append(subscriber_task)

        # Spawn the ai worker fleet (inherits stdio; logs share the API console).
        # Note: the uv venv python.exe is a launcher (shim) that spawns the real
        # interpreter; on shutdown each process tree must be killed with
        # taskkill /T, otherwise the real worker is orphaned
        ai_procs: list[subprocess.Popen] = []
        if os.environ.get("DOCY_NO_AI_WORKER", "").strip().lower() in ("1", "true", "yes", "on"):
            logger.info(
                "DOCY_NO_AI_WORKER is set; ai-worker not spawned. "
                "ai jobs will queue until `uv run docy ai-worker` is started manually"
            )
        else:
            worker_count = _ai_worker_count()
            for i in range(worker_count):
                try:
                    ai_procs.append(_spawn_ai_worker())
                    logger.info(f"ai-worker[{i}] spawned (pid={ai_procs[-1].pid})")
                except Exception:
                    logger.exception(
                        f"failed to spawn ai-worker[{i}]; ai jobs will queue "
                        "until `uv run docy ai-worker` is started manually"
                    )

        if ai_procs:

            async def _watch_one(slot: int) -> None:
                # Keep ai flowing while the server is up: respawn the crashed
                # worker with capped exponential backoff. A crashed worker's
                # in-flight job lease expires (<=15min) and another worker of
                # the fleet re-claims it.
                proc = ai_procs[slot]
                backoff = 2.0
                while not stop_event.is_set():
                    started = time.monotonic()
                    rc = await asyncio.to_thread(proc.wait)
                    if stop_event.is_set():
                        return
                    if time.monotonic() - started >= 60:
                        backoff = 2.0  # survived 60s: healthy, reset backoff
                    logger.error(
                        f"ai-worker[{slot}] exited unexpectedly (rc={rc}); "
                        f"respawning in {backoff:.0f}s"
                    )
                    if rc != 0:
                        report = await asyncio.to_thread(_last_ai_worker_fault)
                        if report:
                            logger.error(
                                f"ai-worker crash stack (faulthandler):\n{report}"
                            )
                    await asyncio.sleep(backoff)
                    backoff = min(backoff * 2, 60.0)
                    if stop_event.is_set():
                        return
                    try:
                        proc = _spawn_ai_worker()
                        ai_procs[slot] = proc
                        logger.info(f"ai-worker[{slot}] respawned (pid={proc.pid})")
                    except Exception:
                        logger.exception(
                            f"failed to respawn ai-worker[{slot}]; will retry"
                        )

            for slot in range(len(ai_procs)):
                addition_tasks.append(asyncio.create_task(_watch_one(slot)))

        try:
            yield
        except Exception as exc:
            raise exc
        finally:
            logger.info("Cleaning up resources...")
            # Signal stop first so the scheduler exits gracefully via stop_event and releases the lock
            stop_event.set()
            for ai_proc in ai_procs:
                if ai_proc.poll() is None:
                    # Kill the whole process tree (shim + real interpreter); WAL makes the hard kill safe
                    if os.name == "nt":
                        subprocess.run(
                            ["taskkill", "/PID", str(ai_proc.pid), "/T", "/F"],
                            capture_output=True,
                        )
                    else:
                        ai_proc.terminate()
                    try:
                        ai_proc.wait(timeout=15)
                    except subprocess.TimeoutExpired:
                        logger.warning("ai-worker did not exit; killing")
                        ai_proc.kill()
            for task in addition_tasks:
                try:
                    await asyncio.wait_for(task, timeout=15)
                except (asyncio.TimeoutError, asyncio.CancelledError):
                    task.cancel()
                    try:
                        await task
                    except asyncio.CancelledError:
                        pass
            await db_service.close()
            await asyncio.sleep(0.1)
            await logger.complete()
            logger.debug("Docy shutdown complete")
    
    return lifespan

def create_app():
    """
    Create the FastAPI app and include the router.
    """
    from docy.utils.version import get_version_info
    __version__ = get_version_info()
    configure()
    lifespan = get_lifespan(version=__version__)
    app = FastAPI(
        title="docy",
        version=__version__,
        lifespan=lifespan,
    )
    app.add_middleware(JavaScriptMIMETypeMiddleware)
    app.add_middleware(AuthenticationMiddleware, backend=BearerTokenAuthBackend())

    @app.middleware("http")
    async def check_boundary(request: Request, call_next):
        # only API paths; static assets named like "upload-*.js" must not
        # be parsed as multipart (see the SPA static hosting in core/web.py)
        if request.url.path.startswith("/api") and "/upload" in request.url.path:
            content_type = request.headers.get("Content-Type")

            if not content_type or "multipart/form-data" not in content_type or "boundary=" not in content_type:
                return JSONResponse(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    content={"detail": "Content-Type header must be 'multipart/form-data' with a boundary parameter."},
                )

            boundary = content_type.split("boundary=")[-1].strip()

            if not re.match(r"^[\w\-]{1,70}$", boundary):
                return JSONResponse(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    content={"detail": "Invalid boundary format"},
                )

            body = await request.body()

            boundary_start = f"--{boundary}".encode()
            # The multipart/form-data spec doesn't require a newline after the boundary, however many clients do
            # implement it that way
            boundary_end = f"--{boundary}--\r\n".encode()
            boundary_end_no_newline = f"--{boundary}--".encode()

            if not body.startswith(boundary_start) or not body.endswith((boundary_end, boundary_end_no_newline)):
                return JSONResponse(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    content={"detail": "Invalid multipart formatting"},
                )

        return await call_next(request)

    @app.middleware("http")
    async def flatten_query_string_lists(request: Request, call_next):
        flattened: list[tuple[str, str]] = []
        for key, value in request.query_params.multi_items():
            flattened.extend((key, entry) for entry in value.split(","))

        request.scope["query_string"] = urlencode(flattened, doseq=True).encode("utf-8")

        return await call_next(request)

    # CORS must be the outermost middleware: the OPTIONS preflight for /upload
    # and error responses short-circuited by check_boundary only get CORS headers
    # if they pass back through CORSMiddleware (exception handlers add none).
    # Same-origin deployments (docy-hosted frontend / vite proxy) don't need CORS;
    # only local addresses are allowed by default. For cross-origin deployments,
    # configure cors_origins (comma-separated) in the [Server] section of settings.ini.
    port = settings.server.http_server_port
    origins = [f"http://127.0.0.1:{port}", f"http://localhost:{port}"]
    try:
        for origin in (settings.server.cors_origins or "").split(","):
            origin = origin.strip()
            if origin and origin not in origins:
                origins.append(origin)
    except Exception:
        pass
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        # Credentials are safe here: origins are an explicit allowlist, never
        # a wildcard (a wildcard origin with credentials is rejected by
        # browsers and would be invalid anyway).
        allow_credentials=True,
        # The methods the API actually implements (plus HEAD for GET routes
        # and OPTIONS for preflight).
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
        # Explicit allowlist: never a wildcard, so browsers only accept the
        # headers the API actually reads (auth, webhook signing, request id).
        allow_headers=[
            "Content-Type",
            "Authorization",
            "Accept",
            "X-Requested-With",
            "X-Webhook-Signature",
            "X-Webhook-Secret",
            "X-Webhook-Timestamp",
        ],
    )

    add_pagination(app)

    app.include_router(router)
    register_special_path(app)

    register_exception(app)

    return app

def setup_app(static_files_dir: Path | None = None, *, backend_only: bool = False) -> FastAPI:
    """Setup the FastAPI app."""
    app = create_app()
    if not backend_only:
        resolved = resolve_static_dir(static_files_dir)
        if resolved is not None:
            logger.info(f"Serving frontend from {resolved}")
            setup_static_files(app, resolved)
        else:
            logger.warning(
                "Frontend build not found; serving the API only. "
                "Run `docy build-web` to build the frontend."
            )
    return app