import os
import shutil
import signal
import subprocess
import time
import webbrowser
from pathlib import Path

import typer
from rich.console import Console

from docy.core.settings import project_settings as settings


console = Console()


def find_frontend_dir() -> Path:
    """Locate src/frontend relative to the repo root (source checkout only)."""
    repo_root = Path(__file__).resolve().parents[4]
    return repo_root / "src" / "frontend"


def _is_wsl() -> bool:
    """True when running under WSL: the Windows PATH leaks in via interop."""
    return bool(os.environ.get("WSL_DISTRO_NAME"))


def _which_usable(name: str) -> str | None:
    """Like shutil.which, but ignores Windows-side executables under WSL.

    WSL inherits the Windows PATH (mounted under /mnt/); those tools are
    Windows shims (e.g. nvm4w's pnpm) that `exec node`, which is not
    reachable from the Linux shell, so they fail with exit code 127.
    """
    path = shutil.which(name)
    if path is None:
        return None
    if os.name != "nt" and _is_wsl() and path.startswith("/mnt/"):
        return None
    return path


def _print_toolchain_hint() -> None:
    """Platform-specific instructions for installing Node.js and pnpm."""
    if os.name == "nt":
        console.print(
            "[red]Node.js/pnpm not found. Install Node.js v18+ from "
            "https://nodejs.org, then run `corepack enable pnpm`.[/red]"
        )
    elif _is_wsl():
        console.print(
            "[red]Node.js/pnpm not found in the Linux environment. "
            "Install them inside WSL (Windows-side executables are ignored): "
            "`sudo apt install nodejs npm && sudo npm install -g pnpm`.[/red]"
        )
    else:
        console.print(
            "[red]Node.js/pnpm not found. Install Node.js v18+ "
            "(e.g. `brew install node` on macOS or `sudo apt install nodejs npm` "
            "on Linux), then run `corepack enable pnpm` or "
            "`npm install -g pnpm`.[/red]"
        )


def find_pnpm() -> list[str] | None:
    """Return the command prefix to invoke pnpm (direct binary or corepack).

    Prints a platform-specific hint and returns None when no usable
    Node.js/pnpm toolchain exists (missing node, or only Windows-side
    executables under WSL).
    """
    if _which_usable("node") is None:
        _print_toolchain_hint()
        return None
    pnpm = _which_usable("pnpm")
    if pnpm:
        return [pnpm]
    corepack = _which_usable("corepack")
    if corepack:
        return [corepack, "pnpm"]
    _print_toolchain_hint()
    return None


def build_web(frontend_dir: Path, api_base: str | None = None) -> None:
    """Install frontend deps and build the SPA into dist-web.

    The backend base URL is baked into the bundle as VITE_API_BASEURL at
    build time (process env overrides .env per Vite loadEnv), so the CLI
    passes the configured value explicitly instead of editing the user's
    .env file.
    """
    pnpm = find_pnpm()
    if pnpm is None:
        raise typer.Exit(1)
    base = api_base or f"http://127.0.0.1:{settings.server.http_server_port}"
    base = base.rstrip("/")
    if base.endswith("/api"):
        base = base[: -len("/api")]
    env = os.environ.copy()
    env["VITE_API_BASEURL"] = f"{base}/api"
    console.print(
        f"[bold]Installing frontend dependencies in {frontend_dir}...[/bold]"
    )
    subprocess.run([*pnpm, "-C", str(frontend_dir), "install"], check=True)
    console.print(f"[bold]Building frontend (dist-web, API -> {base})...[/bold]")
    subprocess.run(
        [*pnpm, "-C", str(frontend_dir), "run", "build"], check=True, env=env
    )
    console.print("[green]Frontend build complete.[/green]")


def wait_for_port(port: int, host: str = "127.0.0.1", timeout: float = 120.0) -> bool:
    """Poll until the port accepts TCP connections or the timeout expires."""
    # deferred to break the docy.__main__ <-> docy.cli.web import cycle
    from docy.__main__ import is_port_in_use

    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if is_port_in_use(port, host):
            return True
        time.sleep(0.3)
    return False


def browser_host(host: str) -> str:
    """Map a bind host to the address a local browser can reach."""
    if not host or host in ("0.0.0.0", "::"):
        return "127.0.0.1"
    return host


def open_browser(url: str) -> None:
    """Open url in the default browser; failure is only a warning."""
    try:
        if not webbrowser.open(url, new=2):
            console.print(f"[yellow]Browser did not open. Open {url} manually.[/yellow]")
    except Exception:
        console.print(f"[yellow]Failed to open browser. Open {url} manually.[/yellow]")


def start_vite_dev(frontend_dir: Path, backend_port: int) -> tuple[subprocess.Popen, int]:
    """Start the Vite dev server (HMR) on a free port starting at 5173.

    VITE_API_TARGET is injected into the subprocess env so the Vite /api proxy
    forwards to the backend (process env overrides .env per Vite loadEnv).
    """
    # deferred to break the docy.__main__ <-> docy.cli.web import cycle
    from docy.__main__ import get_free_port

    pnpm = find_pnpm()
    if pnpm is None:
        raise typer.Exit(1)
    vite_port = get_free_port(5173)
    env = os.environ.copy()
    env["VITE_API_TARGET"] = f"http://127.0.0.1:{backend_port}"
    proc = subprocess.Popen(
        [
            *pnpm,
            "-C",
            str(frontend_dir),
            "run",
            "dev",
            "--",
            "--port",
            str(vite_port),
            "--strictPort",
        ],
        env=env,
        start_new_session=(os.name != "nt"),
    )
    console.print(
        f"[bold green]Vite dev server started on "
        f"http://127.0.0.1:{vite_port} (API -> http://127.0.0.1:{backend_port})"
        "[/bold green]"
    )
    return proc, vite_port


def stop_process_tree(proc: subprocess.Popen) -> None:
    """Terminate a subprocess with all its descendants."""
    if proc.poll() is not None:
        return
    if os.name == "nt":
        subprocess.run(
            ["taskkill", "/PID", str(proc.pid), "/T", "/F"],
            capture_output=True,
        )
    else:
        try:
            os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
        except OSError:
            pass
    try:
        proc.wait(timeout=15)
    except subprocess.TimeoutExpired:
        if os.name != "nt":
            try:
                os.killpg(os.getpgid(proc.pid), signal.SIGKILL)
            except OSError:
                pass
        proc.kill()
        proc.wait(timeout=15)
