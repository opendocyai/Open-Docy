import asyncio
import inspect
import os
import platform
import signal
import socket
import subprocess
import sys
import threading
import time
import warnings
from contextlib import suppress
from pathlib import Path

import click
import httpx
import typer
from dotenv import load_dotenv
from fastapi import FastAPI
from httpx import HTTPError
from multiprocess import get_context
from multiprocess.process import BaseProcess
from rich import box
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from sqlmodel import select
from loguru import logger
from docy.cli import web as cli_web
from docy.cli import ai_package as cli_ai_package
from docy.core.web import resolve_static_dir
from docy.main import setup_app
from docy.models.tb_webhook import WebhookStatus
from docy.core.settings import project_settings as settings
from docy.services.common.ai_package import ai_plugin_installed


console = Console()

app = typer.Typer(no_args_is_help=False)


@app.callback(invoke_without_command=True)
def main_callback(ctx: typer.Context) -> None:
    """Start the server with default settings when invoked without a subcommand."""
    if ctx.invoked_subcommand is None:
        run_cmd = ctx.command.get_command(ctx, "run")
        ctx.invoke(run_cmd)


def is_port_in_use(port, host="127.0.0.1"):
    """Check if a port is in use.

    Args:
        port (int): The port number to check.
        host (str): The host to check the port on. Defaults to 'localhost'.

    Returns:
        bool: True if the port is in use, False otherwise.
    """
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex((host, port)) == 0


def get_free_port(port):
    """Given a used port, find a free port.

    Args:
        port (int): The port number to check.

    Returns:
        int: A free port number.
    """
    while is_port_in_use(port):
        port += 1
    return port


def handle_sigterm(signum, frame):  # noqa: ARG001
    """Handle SIGTERM signal gracefully."""
    logger.info("Received SIGTERM signal. Performing graceful shutdown...")
    # Raise SystemExit to trigger graceful shutdown
    sys.exit(0)


def _open_browser_when_ready(ports: list[int]) -> None:
    """Open the login page once all given ports are listening (browser port last)."""
    ready = all(cli_web.wait_for_port(port) for port in ports)
    url = f"http://127.0.0.1:{ports[-1]}/login"
    if ready:
        cli_web.open_browser(url)
    else:
        console.print(f"[yellow]Server did not start in time; open {url} manually.[/yellow]")


def _open_browser_in_thread(ports: list[int]) -> None:
    """Open the login page in the background once the ports are listening.

    Started only after the POSIX server child process has been created:
    forking while a thread runs can deadlock the child on a lock held at
    fork time (harmless with spawn, but keep the ordering).
    """
    threading.Thread(target=_open_browser_when_ready, args=(ports,), daemon=True).start()


@app.command()
def run(
    *,
    host: str | None = typer.Option(None, help="Host to bind the server to.", show_default=False),
    port: int | None = typer.Option(None, help="Port to listen on.", show_default=False),
    conf_file: Path | None = typer.Option(
        None,
        help="Path to the .ini file containing settings.",
        show_default=False,
    ),
    log_level: str | None = typer.Option("info", help="Logging level.", show_default=False),
    log_dir: Path | None = typer.Option(None, help="Path to the log directory.", show_default=False),
    no_browser: bool = typer.Option(
        False, "--no-browser", help="Do not open the default browser on startup.", show_default=False,
    ),
    build_web_flag: bool = typer.Option(
        False, "--build-web", help="Build the frontend before serving it.", show_default=False,
    ),
    frontend_dev: bool = typer.Option(
        False,
        "--frontend-dev",
        help="Run the Vite dev server alongside the backend (HMR, for frontend developers).",
        show_default=False,
    ),
    static_dir: Path | None = typer.Option(
        None,
        "--static-dir",
        help="Serve the frontend from this build directory instead of auto-detecting it.",
        show_default=False,
    ),
):
    """
    start docy server
    """
    signal.signal(signal.SIGTERM, handle_sigterm)
    protocol = "http"
    if conf_file:
        settings.reload(conf_file)
    # CLI overrides apply to this process only (mutate the in-memory section object,
    # shadowing the parser read); don't use settings.update() - it only writes to disk
    # without refreshing memory, which is both ineffective and rewrites the user's config file.
    if host:
        settings.server.http_server_host = host
    if port:
        settings.server.http_server_port = port
    if log_dir:
        settings.default.log_dir = str(log_dir)
    console.print(f"[bold green]Config file: {settings.path.resolve()}[/bold green]")
    from docy.core.security_guard import assert_secrets_not_default

    try:
        assert_secrets_not_default()
    except RuntimeError as exc:
        console.print(f"[red]{exc}[/red]")
        raise typer.Exit(1) from exc
    if not ai_plugin_installed():
        console.print(
            "[red]AI plugin is not installed; the server cannot start.[/red]\n"
            "[red]Install it by running the following command in the virtual environment:[/red]\n"
            "    uv run docy install-ai"
        )
        raise typer.Exit(1)
    if is_port_in_use(settings.server.http_server_port):
        # Switch the port in memory only; never write back to settings.ini
        # (no on-disk rewrite of the user config)
        settings.server.http_server_port = get_free_port(settings.server.http_server_port)
    options = {}
    process: BaseProcess | None = None
    vite_proc: subprocess.Popen | None = None
    browser_ports = [settings.server.http_server_port]

    if frontend_dev and build_web_flag:
        console.print(
            "[red]--frontend-dev and --build-web are mutually exclusive; "
            "ignoring --build-web.[/red]"
        )

    frontend_dir = cli_web.find_frontend_dir()
    static_files_dir: Path | None = None
    backend_only = False
    if frontend_dev:
        if not (frontend_dir / "package.json").is_file():
            console.print(f"[red]Frontend source not found at {frontend_dir}.[/red]")
            raise typer.Exit(1)
        vite_proc, vite_port = cli_web.start_vite_dev(frontend_dir, browser_ports[0])
        browser_ports.append(vite_port)
        backend_only = True
    else:
        if build_web_flag:
            if not (frontend_dir / "package.json").is_file():
                console.print(f"[red]Frontend source not found at {frontend_dir}.[/red]")
                raise typer.Exit(1)
            cli_web.build_web(frontend_dir)
        static_files_dir = resolve_static_dir(static_dir)
        if static_files_dir is None:
            console.print(
                "[yellow]Frontend build not found; serving the API only. "
                "Run `docy build-web` to build the frontend.[/yellow]"
            )
            backend_only = True

    try:
        if platform.system() == "Windows":
            # uvicorn runs in-process on Windows
            app = build_app(static_files_dir, backend_only)
            if not no_browser:
                _open_browser_in_thread(browser_ports)
            run_on_windows(
                settings.server.http_server_host,
                settings.server.http_server_port,
                log_level,
                options,
                app,
                protocol,
            )
        else:
            # Spawn (never fork): the parent already holds an open honker.db
            # connection via module imports, and a fork-inherited SQLite
            # connection is undefined behavior ('database is locked' on
            # macOS). The child rebuilds the app itself; this process
            # supervises readiness and graceful shutdown.
            process = run_on_mac_or_linux(
                settings.server.http_server_host,
                settings.server.http_server_port,
                log_level,
                options,
                static_files_dir,
                backend_only,
                protocol,
            )
            if not no_browser:
                _open_browser_in_thread(browser_ports)
        if process:
            process.join()
    except (KeyboardInterrupt, SystemExit) as e:
        logger.info("Shutting down server...")
        if process is not None:
            process.terminate()
            process.join(timeout=15)  # Wait up to 15 seconds for process to terminate
            if process.is_alive():
                logger.warning("Process did not terminate gracefully, forcing...")
                process.kill()
        raise typer.Exit(0) from e
    except Exception as e:
        logger.exception(e)
        if process is not None:
            process.terminate()
        raise typer.Exit(1) from e
    finally:
        if vite_proc is not None:
            cli_web.stop_process_tree(vite_proc)


@app.command(hidden=True)
def _keep_run_as_subcommand() -> None:
    """typer>=0.15 promotes a single-command app to the root command, which
    makes `docy run` fail with "unexpected extra argument(s) (run)". This
    hidden command keeps `run` registered as a real subcommand.
    """


@app.command()
def ai_worker() -> None:
    """Run the ai queue consumer in the foreground (manual/debugging)."""
    from docy.ai_worker import main as _worker_main
    _worker_main()


@app.command()
def stop_ai_worker() -> None:
    """Stop all running ai-worker processes (Windows/macOS/Linux)."""
    from docy.cli.ai_worker import stop_ai_worker as _stop

    _stop()


@app.command()
def build_web(
    api_base: str | None = typer.Option(
        None,
        "--api-base",
        help=(
            "Backend base URL baked into the frontend bundle, e.g. "
            "http://192.168.1.100:3000. Default: http://127.0.0.1:<server port>."
        ),
        show_default=False,
    ),
) -> None:
    """Build the frontend SPA into dist-web for static hosting."""
    frontend_dir = cli_web.find_frontend_dir()
    if not (frontend_dir / "package.json").is_file():
        console.print(f"[red]Frontend source not found at {frontend_dir}.[/red]")
        raise typer.Exit(1)
    cli_web.build_web(frontend_dir, api_base=api_base)


@app.command()
def install_ai(
    server: str | None = typer.Option(
        None,
        "--server",
        help="Base URL of the package server (default: https://agent.docyai.com).",
        show_default=False,
    ),
    python_version: str | None = typer.Option(
        None,
        "--python-version",
        help="Python version digits, e.g. 313 (default: auto-detect).",
        show_default=False,
    ),
    platform_name: str | None = typer.Option(
        None,
        "--platform",
        help="Target platform, e.g. windows.x86_64 (default: auto-detect).",
        show_default=False,
    ),
    assume_yes: bool = typer.Option(
        False,
        "--yes",
        "-y",
        help="Replace an existing ai/ directory without prompting.",
        show_default=False,
    ),
    no_verify: bool = typer.Option(
        False,
        "--no-verify",
        help="Skip Ed25519 signature and SHA-256 verification of the downloaded package.",
        show_default=False,
    ),
) -> None:
    """Download and install the PyArmor-encrypted AI package (ai plugin).

    Detects the current Python version and platform, downloads the matching
    package from the download endpoint, and extracts it into the docy
    package ai/ directory. When the server provides a signed manifest, the
    download is verified (Ed25519 signature + SHA-256) before extraction.
    """
    cli_ai_package.install_ai(server, python_version, platform_name, assume_yes, no_verify)


webhook_app = typer.Typer(no_args_is_help=True, help="Manage webhook records without starting the server.")


@webhook_app.command(name="create")
def webhook_create(
    endpoint: str = typer.Option(
        ..., "--endpoint", help="Webhook target URL (http/https).", show_default=False,
    ),
    user_id: str | None = typer.Option(
        None, "--user-id", help="Target user by id.", show_default=False,
    ),
    email: str | None = typer.Option(
        None, "--email", help="Target user by email (looked up in auth_user).", show_default=False,
    ),
    description: str | None = typer.Option(
        None, "--description", help="Optional description.", show_default=False,
    ),
) -> None:
    """Create a webhook record for a user directly in the database."""
    from docy.cli.webhook import create_webhook as _f

    _f(endpoint, user_id, email, description)


@webhook_app.command(name="get")
def webhook_get(
    webhook_id: str = typer.Option(
        ..., "--webhook-id", help="Webhook record id.", show_default=False,
    ),
) -> None:
    """Retrieve one webhook record by id (mirrors GET /webhook/{id}/retrieve)."""
    from docy.cli.webhook import get_webhook as _f

    _f(webhook_id)


@webhook_app.command(name="list")
def webhook_list(
    user_id: str | None = typer.Option(
        None, "--user-id", help="Owner user by id.", show_default=False,
    ),
    email: str | None = typer.Option(
        None, "--email", help="Owner user by email.", show_default=False,
    ),
    status: WebhookStatus | None = typer.Option(
        None, "--status", help="Filter by status.", show_default=False,
    ),
) -> None:
    """List a user's webhook records (mirrors GET /webhook/user/webhooks)."""
    from docy.cli.webhook import list_webhooks as _f

    _f(user_id, email, status)


@webhook_app.command(name="update")
def webhook_update(
    webhook_id: str = typer.Option(
        ..., "--webhook-id", help="Webhook record id.", show_default=False,
    ),
    endpoint: str | None = typer.Option(
        None, "--endpoint", help="New target URL.", show_default=False,
    ),
    status: WebhookStatus | None = typer.Option(
        None, "--status", help="New status.", show_default=False,
    ),
    description: str | None = typer.Option(
        None, "--description", help="New description.", show_default=False,
    ),
) -> None:
    """Update a webhook record by id (mirrors POST /webhook/{id}/update)."""
    from docy.cli.webhook import update_webhook as _f

    _f(webhook_id, endpoint, status, description)


@webhook_app.command(name="rotate")
def webhook_rotate(
    webhook_id: str = typer.Option(
        ..., "--webhook-id", help="Webhook record id.", show_default=False,
    ),
) -> None:
    """Rotate a webhook secret by id (mirrors POST /webhook/{id}/secret/rotate)."""
    from docy.cli.webhook import rotate_webhook as _f

    _f(webhook_id)


app.add_typer(webhook_app, name="webhook")


api_key_app = typer.Typer(no_args_is_help=True, help="Manage user api keys without starting the server.")


@api_key_app.command(name="create")
def api_key_create(
    name: str = typer.Option(
        ..., "--name", help="API key display name.", show_default=False,
    ),
    user_id: str | None = typer.Option(
        None, "--user-id", help="Target user by id.", show_default=False,
    ),
    email: str | None = typer.Option(
        None, "--email", help="Target user by email (looked up in auth_user).", show_default=False,
    ),
) -> None:
    """Create an api key for a user (mirrors POST /api_key/)."""
    from docy.cli.api_key import create_api_key as _f

    _f(name, user_id, email)


@api_key_app.command(name="list")
def api_key_list(
    user_id: str | None = typer.Option(
        None, "--user-id", help="Owner user by id.", show_default=False,
    ),
    email: str | None = typer.Option(
        None, "--email", help="Owner user by email.", show_default=False,
    ),
) -> None:
    """List a user's api keys, masked (mirrors GET /api_key/)."""
    from docy.cli.api_key import list_api_keys as _f

    _f(user_id, email)


@api_key_app.command(name="delete")
def api_key_delete(
    api_key_id: str = typer.Option(
        ..., "--api-key-id", help="API key record id.", show_default=False,
    ),
) -> None:
    """Delete an api key by id (mirrors DELETE /api_key/{id})."""
    from docy.cli.api_key import delete_api_key as _f

    _f(api_key_id)


@api_key_app.command(name="update")
def api_key_update(
    api_key_id: str = typer.Option(
        ..., "--api-key-id", help="API key record id.", show_default=False,
    ),
    name: str = typer.Option(
        ..., "--name", help="New display name.", show_default=False,
    ),
) -> None:
    """Rename an api key by id (mirrors PUT /api_key/{id})."""
    from docy.cli.api_key import update_api_key as _f

    _f(api_key_id, name)


app.add_typer(api_key_app, name="api-key")


agent_app = typer.Typer(no_args_is_help=True, help="Manage agents without starting the server.")


@agent_app.command(name="list")
def agent_list(
    email: str = typer.Option(
        ..., "--email", help="Owner user email (required).", show_default=False,
    ),
) -> None:
    """List a user's agents by email."""
    from docy.cli.agent import list_agents as _f

    _f(email)


@agent_app.command(name="get")
def agent_get(
    agent_id: str = typer.Option(
        ..., "--agent-id", help="Agent record id.", show_default=False,
    ),
) -> None:
    """Get an agent by id."""
    from docy.cli.agent import get_agent as _f

    _f(agent_id)


@agent_app.command(name="export")
def agent_export(
    agent_id: str = typer.Option(
        ..., "--agent-id", help="Agent record id.", show_default=False,
    ),
    output: str | None = typer.Option(
        None, "--output", help="Output .docy path (default: sample/<agent name>.docy).",
        show_default=False,
    ),
) -> None:
    """Export an agent into a self-contained .docy package."""
    from docy.cli.agent_package import export_agent as _f

    _f(agent_id, output)


@agent_app.command(name="import")
def agent_import(
    file: str = typer.Option(
        ..., "--file", help="Path to the .docy package.", show_default=False,
    ),
    email: str = typer.Option(
        ..., "--email", help="Target user email (required).", show_default=False,
    ),
    name: str | None = typer.Option(
        None, "--name", help="Override the imported agent name.", show_default=False,
    ),
) -> None:
    """Import a .docy package into the user's personal workspace."""
    from docy.cli.agent_package import import_agent as _f

    _f(file, email, name)


app.add_typer(agent_app, name="agent")


activity_app = typer.Typer(no_args_is_help=True, help="Manage tasks without starting the server.")


@activity_app.command(name="list")
def activity_list(
    email: str = typer.Option(
        ..., "--email", help="Owner user email (required).", show_default=False,
    ),
) -> None:
    """List a user's activities by email."""
    from docy.cli.activity import list_activities as _f

    _f(email)


@activity_app.command(name="get")
def activity_get(
    activity_id: str = typer.Option(
        ..., "--activity-id", help="Activity record id.", show_default=False,
    ),
) -> None:
    """Get an activity by id."""
    from docy.cli.activity import get_activity as _f

    _f(activity_id)


@activity_app.command(name="webhook")
def activity_webhook(
    activity_id: str = typer.Option(
        ..., "--activity-id", help="Activity record id.", show_default=False,
    ),
    enable: bool | None = typer.Option(
        None, "--on/--off", help="Enable or disable webhook push for the activity.", show_default=False,
    ),
) -> None:
    """Turn webhook push on or off for an activity by id."""
    from docy.cli.activity import webhook_activity as _f

    _f(activity_id, enable)


app.add_typer(activity_app, name="activity")


@app.command()
def install_libreoffice() -> None:
    """Install LibreOffice automatically on Windows (winget).

    On macOS/Linux it prints the package-manager command instead: there is no
    universal package manager and system installs need elevated privileges.
    """
    import shutil
    import subprocess

    system = platform.system()
    if system == "Windows":
        if shutil.which("winget"):
            console.print("[bold green]Installing LibreOffice via winget...[/bold green]")
            try:
                subprocess.run(
                    [
                        "winget", "install",
                        "--id", "TheDocumentFoundation.LibreOffice",
                        "-e",
                        "--accept-package-agreements",
                        "--accept-source-agreements",
                    ],
                    check=True,
                )
                console.print("[bold green]LibreOffice installed.[/bold green]")
                return
            except subprocess.CalledProcessError as e:
                console.print(f"[red]winget install failed (rc={e.returncode})[/red]")
        else:
            console.print("[yellow]winget not found on this machine.[/yellow]")
        console.print(
            "[yellow]Please install LibreOffice manually from "
            "https://www.libreoffice.org/download/download-libreoffice/[/yellow]"
        )
        raise typer.Exit(1)
    elif system in ("Linux", "Darwin"):
        if system == "Linux":
            console.print(
                "Install LibreOffice manually, e.g.:\n"
                "  sudo apt-get install libreoffice        # Debian/Ubuntu\n"
                "  sudo dnf install libreoffice            # Fedora"
            )
        else:
            console.print(
                "Install LibreOffice manually, e.g.:\n  brew install --cask libreoffice"
            )
        console.print(
            "[yellow]Nothing was installed: there is no universal package manager and "
            "system installs need elevated privileges. Run the command above, then "
            "verify with 'soffice --version'.[/yellow]"
        )
    else:
        console.print(
            f"Unsupported platform {system}. Please install LibreOffice manually from "
            "https://www.libreoffice.org/download/download-libreoffice/"
        )
        raise typer.Exit(1)


def build_app(static_files_dir: Path | None, backend_only: bool) -> FastAPI:
    """Build the FastAPI app from the resolved frontend decision."""
    if backend_only:
        return setup_app(backend_only=True)
    return setup_app(static_files_dir=static_files_dir)


def run_server_in_child(
    host: str,
    port: int,
    log_level: str,
    options: dict,
    static_files_dir: Path | None,
    backend_only: bool,
    conf_file: Path,
    log_dir: str,
) -> None:
    """POSIX spawn-child entry point: rebuild the app inside a fresh process.

    Re-applies the parent's in-memory config first (conf file reload, final
    port after port-conflict switching, log dir override) so the child state
    matches the parent's, then builds the app. Spawn guarantees the parent's
    honker.db connection (opened via module imports) is not inherited: a
    fork-inherited SQLite connection is undefined behavior and fails with
    'database is locked' on macOS.
    """
    settings.reload(conf_file)
    settings.server.http_server_port = port
    if log_dir:
        settings.default.log_dir = log_dir
    app = build_app(static_files_dir, backend_only)
    run_docy(host, port, log_level, options, app)


def run_on_windows(
    host: str, port: int, log_level: str, options: dict, app: FastAPI, protocol: str
) -> None:
    """Run the docy server in-process on Windows."""
    run_docy(host, port, log_level, options, app)


def run_docy(host: str, port: int, log_level: str, options: dict, app: FastAPI) -> None:
    """Run the docy server via uvicorn."""
    import uvicorn

    logger.info(f"run docy server on {host}:{port}")
    uvicorn.run(app, host=host, port=port, log_level=log_level.lower(), loop="asyncio")


def wait_for_server_ready(
    host: str, port: int, protocol: str, process: BaseProcess | None = None
) -> None:
    """Poll the health endpoint until the server responds or the child process dies."""
    status_code = 0
    while status_code != httpx.codes.OK:
        if process is not None and not process.is_alive():
            raise RuntimeError(
                f"Server process exited (rc={process.exitcode}) before becoming ready."
            )
        try:
            status_code = httpx.get(
                f"{protocol}://{host}:{port}/api/v1/common/health",
                verify=host not in ("127.0.0.1", "localhost"),
            ).status_code
        except HTTPError:
            time.sleep(1)
        except Exception:  # noqa: BLE001
            logger.opt(exception=True).debug("Error while waiting for the server to become ready.")
            time.sleep(1)


def run_on_mac_or_linux(
    host: str,
    port: int,
    log_level: str,
    options: dict,
    static_files_dir: Path | None,
    backend_only: bool,
    protocol: str,
) -> BaseProcess:
    """Run the server in a spawned child process on POSIX and wait until it
    is ready."""
    webapp_process = get_context("spawn").Process(
        target=run_server_in_child,
        args=(
            host,
            port,
            log_level,
            options,
            static_files_dir,
            backend_only,
            settings.path,
            settings.default.log_dir,
        ),
    )
    webapp_process.start()
    try:
        wait_for_server_ready(host, port, protocol, webapp_process)
    except Exception:
        webapp_process.terminate()
        raise
    return webapp_process

def main()->None:
    """
    Main entry point.
    """
    # Load the root .env: `uv run` loads it automatically, a bare `docy run` does not;
    # child processes (ai-worker) inherit the environment from here. Search upward
    # from the module path first, then fall back to the CWD.
    if not load_dotenv():
        load_dotenv(Path.cwd() / ".env")
    with warnings.catch_warnings():
        warnings.filterwarnings("ignore")
        app()


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        logger.exception(e)
        raise typer.Exit(1) from e