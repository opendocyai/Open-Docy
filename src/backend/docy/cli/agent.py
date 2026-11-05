"""CLI: manage agents directly in SQLite (no server required)."""
import asyncio

import typer
from rich.console import Console
from rich.table import Table

console = Console()

import docy.honker_db  # noqa: E402,F401  # must come before other docy imports (circular import constraint)

from docy.database import get_async_db_connector  # noqa: E402
from docy.database.db_sqllite import SQLiteDatabase  # noqa: E402
from docy.database.service import DatabaseService  # noqa: E402
from docy.models import User  # noqa: E402
from docy.models.tb_agent import Agent  # noqa: E402
from docy.utils.sql_query import async_list_objects, async_retrieve_object  # noqa: E402


def _fmt(value):
    """enum → value, None → '-'"""
    return value.value if hasattr(value, "value") else (value if value is not None else "-")


def _list_row(agent) -> dict:
    return {
        "id": agent.id,
        "name": agent.name,
        "description": agent.description,
        "status": _fmt(agent.status),
    }


async def _detail_row(db, agent) -> dict:
    creator = None
    if agent.creator_id:
        creator = await async_retrieve_object(db, User, o_id=agent.creator_id)
    creator_name = (creator.display or creator.username) if creator else "-"
    return {
        "id": agent.id,
        "name": agent.name,
        "description": agent.description,
        "status": _fmt(agent.status),
        "creator": creator_name,
        "visible": agent.visible,
        "created_at": _fmt(agent.created_at),
    }


def _print_rows(title: str, rows: list[dict]) -> None:
    table = Table(title=title)
    cols = list(rows[0].keys())
    for col in cols:
        table.add_column(col)
    for row in rows:
        table.add_row(*[str(row.get(c, "-")) for c in cols])
    console.print(table)


def _run_migrations() -> None:
    """Run migrations (idempotent): mirrors the main.py lifespan approach; the CLI
    does not start the server, so a fresh database needs tables created first
    """
    db_url = SQLiteDatabase.get_db_path(is_sync=False)
    asyncio.run(DatabaseService(db_url).run_migrations())


async def _resolve_user(db, email: str):
    user = await async_retrieve_object(db, User, condition=[User.email == email])
    if not user:
        console.print(f"[red]User not found (email={email}).[/red]")
        raise typer.Exit(1)
    return user


def _run_async(coro_factory, email, *args) -> None:
    """Common skeleton: migrate -> open session -> resolve user by email -> query directly"""
    _run_migrations()

    async def _inner():
        async with get_async_db_connector() as db:
            user = await _resolve_user(db, email)
            await coro_factory(db, user, *args)

    asyncio.run(_inner())


def _run_id_async(coro_factory, agent_id) -> None:
    """ID-based skeleton: migrate -> open session -> query by id"""
    _run_migrations()

    async def _inner():
        async with get_async_db_connector() as db:
            await coro_factory(db, agent_id)

    asyncio.run(_inner())


def list_agents(email) -> None:
    async def _do(db, user):
        agents = await async_list_objects(
            db, Agent, condition=[Agent.creator_id == user.id],
        )
        if not agents:
            console.print("[yellow]No agents found.[/yellow]")
            return
        _print_rows("Agents", [_list_row(a) for a in agents])

    _run_async(_do, email)


def get_agent(agent_id) -> None:
    async def _do(db, agent_id):
        agent = await async_retrieve_object(db, Agent, o_id=agent_id)
        if not agent:
            console.print(f"[red]Agent not found (id={agent_id}).[/red]")
            raise typer.Exit(1)
        _print_rows("Agent", [await _detail_row(db, agent)])

    _run_id_async(_do, agent_id)
