"""
Logging configuration
"""
import asyncio
import sys
import logging
from pathlib import Path
from loguru import logger, _defaults
from loguru._error_interceptor import ErrorInterceptor
from loguru._file_sink import FileSink
from loguru._simple_sinks import AsyncSink
from platformdirs import user_cache_dir
from rich.logging import RichHandler

from .trace import get_trace_id
from docy.core.settings import project_settings as settings


VALID_LOG_LEVELS = ["TRACE", "DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]

CONSOLE_FMT = (
    "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | "
    "<level>{level: <8}</level> | "
    "<cyan>{extra[category]}</cyan> | "
    "<cyan>{module}</cyan> | "  
    "<cyan>{extra[trace_id]}</cyan> | "
    "<level>{message}</level>"
)

FILE_FMT = (
    "{time:YYYY-MM-DD HH:mm:ss.SSS} | "
    "{level: <8} | "
    "{extra[category]} | "
    "{module} | " 
    "{extra[trace_id]} | "
    "{message}"
)

class AsyncFileSink(AsyncSink):
    def __init__(self, file):
        self._sink = FileSink(
            path=file,
            rotation="10 MB",  # Log rotation based on file size
            delay=True,
        )
        super().__init__(self.write_async, None, ErrorInterceptor(_defaults.LOGURU_CATCH, -1))

    async def complete(self):
        await asyncio.to_thread(self._sink.stop)
        for task in self._tasks:
            await self._complete_task(task)

    async def write_async(self, message):
        await asyncio.to_thread(self._sink.write, message)

def patch_record(record):
    record["extra"].setdefault("category", "docy")
    record["extra"].setdefault("trace_id", get_trace_id())

def configure(
    *,
    log_level: str | None = None,
    log_dir: Path | None = None,
    async_file: bool = False,
    log_stdout_pretty: bool = False,
    file_suffix: str = "",
)->None:
    """
    Configure logging
    """
    if log_level is None:
        log_level = "INFO"
    if log_dir is None:
        log_dir = settings.default.log_dir
    logger.remove()  # Remove default handlers
    logger.configure(patcher=patch_record)
    if log_stdout_pretty:
        logger.configure(
            handlers=[
                {
                    "sink": RichHandler(rich_tracebacks=True, markup=True),
                    "format": CONSOLE_FMT,
                    "level": log_level.upper(),
                }
            ]
        )
    else:
        logger.add(sys.stdout, level=log_level.upper(), format=CONSOLE_FMT, backtrace=True, diagnose=True)

    if log_dir is None:
        log_dir = settings.default.log_dir
    log_dir = Path(log_dir) if log_dir else Path(user_cache_dir("docy"))
    if not log_dir.is_dir():
        log_dir.mkdir(parents=True, exist_ok=True)
    logger.debug(f"Log directory: {log_dir}")
    # file_suffix separates concurrent processes (e.g. the ai-worker child),
    # otherwise their shared handles block log rotation on Windows (WinError 32).
    access_file = log_dir / f"docy_access{file_suffix}.log"
    error_file = log_dir / f"docy_error{file_suffix}.log"
    docy_file = log_dir / f"docy{file_suffix}.log"
    try:
        logger.add(
            sink = AsyncFileSink(access_file) if async_file else access_file,
            format=FILE_FMT,
            level=log_level.upper(),
            filter=lambda record: record["extra"].get("category") == "uvicorn.access",
        )
        logger.add(
            sink = AsyncFileSink(error_file) if async_file else error_file,
            format=FILE_FMT,
            level=log_level.upper(),
            filter=lambda record: record["extra"].get("category") == "uvicorn.error",
        )
        logger.add(
            sink = AsyncFileSink(docy_file) if async_file else docy_file,
            format=FILE_FMT,
            level=log_level.upper(),
            filter=lambda record: record["extra"].get("category") not in ("uvicorn.access", "uvicorn.error"),
        )
        logger.info(f"Access file: {access_file}")
        logger.info(f"Error file: {error_file}")
        logger.info(f"Docy file: {docy_file}")
    except Exception:  # noqa: BLE001
        logger.exception("Error setting up log file")
    logger.debug(f"Logger set up with log level: {log_level}")
    setup_uvicorn_logger()


class InterceptHandler(logging.Handler):
    """Forward standard logging records to Loguru and assign a category automatically."""

    def emit(self, record: logging.LogRecord) -> None:
        # Get the Loguru level
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Decide the category based on the logger name
        if record.name == 'uvicorn.access':
            cat = 'uvicorn.access'
        elif record.name=='uvicorn.error':
            cat = 'uvicorn.error'
        else:
            cat = 'docy'

        # Locate the calling stack depth
        import inspect
        frame = logging.currentframe()
        depth = 2
        while frame and frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).bind(category=cat).log(level, record.getMessage())

# Replace the handlers of uvicorn-related loggers
def setup_uvicorn_logger():
    handler = InterceptHandler()
    for name in ('uvicorn', 'uvicorn.access', 'uvicorn.error'):
        lg = logging.getLogger(name)
        lg.handlers = [handler]
        # Child loggers don't propagate upwards to avoid duplicates
        lg.propagate = (name == 'uvicorn')
        # Explicitly enable: INFO level + unset disabled. uvicorn's dictConfig
        # wipes uvicorn.error's handlers; fileConfig during alembic migration
        # once set disabled=True here and made access logs disappear entirely,
        # so we fix both cases here as a safeguard.
        lg.setLevel(logging.INFO)
        lg.disabled = False