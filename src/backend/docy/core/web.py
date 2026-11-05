import importlib.resources
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from starlette.exceptions import HTTPException as StarletteHTTPException


def resolve_static_dir(explicit: Path | None = None) -> Path | None:
    """Locate the built frontend directory (must contain index.html).

    Priority: explicit path (--static-dir), repo src/frontend/dist-web
    (source checkout), packaged docy/web/static (wheel install).
    """
    if explicit is not None:
        return explicit if (explicit / "index.html").is_file() else None

    candidates: list[Path] = []

    # source checkout: <repo>/src/frontend/dist-web
    repo_root = Path(__file__).resolve().parents[4]
    candidates.append(repo_root / "src" / "frontend" / "dist-web")

    # wheel install: the built frontend shipped inside the package
    try:
        web_pkg = importlib.resources.files("docy.web")
    except ModuleNotFoundError:
        web_pkg = None
    if web_pkg is not None:
        candidates.append(Path(str(web_pkg)) / "static")

    for candidate in candidates:
        if (candidate / "index.html").is_file():
            return candidate
    return None


def setup_static_files(app: FastAPI, static_dir: Path) -> None:
    """Serve the SPA from static_dir with history-mode fallback.

    A catch-all route is used instead of a StaticFiles mount: a mount would
    swallow unknown GET /api/... paths and return HTML, breaking the uniform
    JSON 404 envelope for API routes (exceptions/handler.py).
    """
    static_root = static_dir.resolve()

    @app.get("/{full_path:path}", include_in_schema=False)
    async def spa_fallback(full_path: str) -> FileResponse:
        if full_path == "api" or full_path.startswith("api/"):
            raise StarletteHTTPException(status_code=404, detail="Not Found")
        target = (static_root / full_path).resolve()
        if target.is_relative_to(static_root) and target.is_file():
            return FileResponse(target)
        return FileResponse(static_root / "index.html")
