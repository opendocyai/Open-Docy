"""CLI: export/import agents as self-contained .docy packages (no server required)."""
import asyncio
from contextlib import contextmanager
from pathlib import Path

import typer
from rich.console import Console
from rich.table import Table
from rich.text import Text

console = Console()

import docy.honker_db  # noqa: E402,F401  # must come before other docy imports (circular import constraint)

from docy.database import get_async_db_connector  # noqa: E402
from docy.database.db_sqllite import SQLiteDatabase  # noqa: E402
from docy.database.service import DatabaseService  # noqa: E402
from docy.exceptions import exception as PE  # noqa: E402
from docy.models import User  # noqa: E402
from docy.utils import get_mock_request  # noqa: E402
from docy.utils.sql_query import async_retrieve_object  # noqa: E402

RESULT_COLS = (
    "agent_id",
    "name",
    "template_count",
    "custom_node_count",
    "file_count",
)


def _run_migrations() -> None:
    """Run migrations (idempotent): mirrors the main.py lifespan approach; the CLI
    does not start the server, so a fresh database needs tables created first
    """
    db_url = SQLiteDatabase.get_db_path(is_sync=False)
    try:
        asyncio.run(DatabaseService(db_url).run_migrations(quiet=True))
    except Exception as exc:
        console.print(f"[red]Database migration failed: {exc}[/red]")
        raise typer.Exit(1) from exc


@contextmanager
def _suppress_runtime_logs():
    """Suppress loguru logs from docy modules to keep CLI output clean; restore afterwards"""
    from loguru import logger as _logger

    _logger.disable("docy")
    try:
        yield
    finally:
        _logger.enable("docy")


def _ask_yes(question: str) -> bool:
    answer = console.input(f"{question} [dim](y/N)[/dim] ").strip().lower()
    return answer in ("y", "yes")


async def _resolve_user(db, email: str):
    user = await async_retrieve_object(db, User, condition=[User.email == email])
    if not user:
        console.print(f"[red]User not found (email={email}).[/red]")
        raise typer.Exit(1)
    return user


def _print_result(result: dict) -> None:
    table = Table(title="Imported Agent")
    for col in RESULT_COLS:
        table.add_column(col)
    table.add_row(*[str(result.get(col, "-")) for col in RESULT_COLS])
    console.print(table)
    for warning in result.get("warnings") or []:
        console.print(f"[yellow]{warning}[/yellow]")


def export_agent(agent_id: str, output: str | None) -> None:
    """Export an agent by id into a .docy package."""
    from docy.services.agent.agent_package import AgentPackageManager, get_sample_dir

    with _suppress_runtime_logs():
        console.print(
            "[bold yellow]Export copies the entire agent, including every file it references[/bold yellow]"
        )
        console.print(
            "[yellow](templates, documents, assets) - make sure it contains no private information.[/yellow]"
        )
        if not _ask_yes("[bold cyan]Continue?[/bold cyan]"):
            console.print("[yellow]Export canceled.[/yellow]")
            raise typer.Exit()

        _run_migrations()

        async def _inner() -> tuple[bytes, str]:
            async with get_async_db_connector() as db:
                manager = AgentPackageManager(db)
                try:
                    return await manager.export_package(agent_id)
                except PE.ProjectBaseException as e:
                    console.print(f"[red]{e.detail}[/red]")
                    raise typer.Exit(1) from e

        with console.status("[bold cyan]Exporting agent...[/bold cyan]", spinner="dots"):
            zip_bytes, default_name = asyncio.run(_inner())

        if output:
            out_path = Path(output).resolve()
        else:
            out_dir = get_sample_dir()
            out_dir.mkdir(exist_ok=True)
            out_path = (out_dir / default_name).resolve()
        if out_path.exists():
            console.print("[bold yellow]File already exists:[/bold yellow]", Text(str(out_path)))
            if not _ask_yes("[bold yellow]Overwrite?[/bold yellow]"):
                console.print("[yellow]Export canceled.[/yellow]")
                raise typer.Exit()

        out_path.write_bytes(zip_bytes)
        console.print("[bold green]Exported agent to[/bold green]", Text(str(out_path)))


def import_agent(file: str, email: str, name: str | None) -> None:
    """Import a .docy package into the user's personal workspace."""
    from docy.services.agent.agent_package import AgentPackageManager

    with _suppress_runtime_logs():
        _run_migrations()

        async def _inner():
            async with get_async_db_connector() as db:
                user = await _resolve_user(db, email)
                manager = AgentPackageManager(db, request=get_mock_request(user=user))
                file_bytes = Path(file).read_bytes()
                try:
                    result = await manager.import_package(file_bytes, name=name)
                except PE.ProjectBaseException as e:
                    console.print(f"[red]{e.detail}[/red]")
                    raise typer.Exit(1) from e
                _print_result(result)

        asyncio.run(_inner())
