"""CLI: manage user api keys directly in SQLite (no server required)."""
import asyncio

import typer
from rich.console import Console
from rich.table import Table

console = Console()

import docy.honker_db  # noqa: E402,F401  # must come before other docy imports (circular import constraint)

from docy.database import get_async_db_connector  # noqa: E402
from docy.database.db_sqllite import SQLiteDatabase  # noqa: E402
from docy.database.service import DatabaseService  # noqa: E402
from docy.exceptions import exception as PE  # noqa: E402
from docy.models import User  # noqa: E402
from docy.models.tb_apikey import APIKey  # noqa: E402
from docy.services.api_key.manager import ApiKeyManager  # noqa: E402
from docy.utils import get_mock_request  # noqa: E402
from docy.utils.sql_query import async_retrieve_object  # noqa: E402

KEY_COLS = ("id", "name", "api_key", "last_used_at", "is_active")


def _mask_api_key(api_key: str) -> str:
    """Masking rule consistent with mask_api_key in schema/api_key.py"""
    return f"{api_key[:8]}{'*' * (len(api_key) - 8)}"


def _row(api_key) -> dict:
    return {"id": api_key.id, "name": api_key.name, "api_key": api_key.api_key,
            "last_used_at": api_key.last_used_at, "is_active": api_key.is_active}


def _require_user_spec(user_id: str | None, email: str | None) -> None:
    """--user-id / --email: exactly one is required"""
    if (user_id is None) == (email is None):
        console.print("[red]Provide exactly one of --user-id or --email.[/red]")
        raise typer.Exit(1)


def _run_migrations() -> None:
    """Run migrations (idempotent): mirrors the main.py lifespan approach; the CLI
    does not start the server, so a fresh database needs tables created first
    """
    db_url = SQLiteDatabase.get_db_path(is_sync=False)
    asyncio.run(DatabaseService(db_url).run_migrations())


async def _resolve_user(db, user_id: str | None, email: str | None):
    user = await async_retrieve_object(
        db, User,
        condition=[User.email == email] if email else [User.id == user_id],
    )
    if not user:
        console.print(
            f"[red]User not found ({'email=' + email if email else 'id=' + user_id}).[/red]"
        )
        raise typer.Exit(1)
    return user


def _run_async(coro_factory, user_id, email, *args) -> None:
    """Common skeleton: migrate -> open session -> resolve user -> mock request -> call manager"""
    _require_user_spec(user_id, email)
    _run_migrations()

    async def _inner():
        async with get_async_db_connector() as db:
            user = await _resolve_user(db, user_id, email)
            manager = ApiKeyManager(db=db, request=get_mock_request(user=user))
            try:
                await coro_factory(manager, user, *args)
            except (PE.ObjectNotFound, PE.ObjectOwnerNotMatch) as e:
                console.print(f"[red]{e.detail}[/red]")
                raise typer.Exit(1) from e
            except ValueError as e:
                console.print(f"[red]{e}[/red]")
                raise typer.Exit(1) from e

    asyncio.run(_inner())


async def _resolve_api_key_owner(db, api_key_id: str):
    """Locate the api key by id and resolve its owner user
    (no --user-id/--email needed when the id is known)
    """
    api_key = await async_retrieve_object(db, APIKey, o_id=api_key_id)
    if not api_key:
        console.print(f"[red]API Key not found (id={api_key_id}).[/red]")
        raise typer.Exit(1)
    user = await async_retrieve_object(db, User, condition=[User.id == api_key.user_id])
    if not user:
        console.print(f"[red]Owner user not found (id={api_key.user_id}).[/red]")
        raise typer.Exit(1)
    return user


def _run_id_async(coro_factory, api_key_id) -> None:
    """ID-based skeleton: migrate -> open session -> resolve api key and owner by id -> mock request -> call manager"""
    _run_migrations()

    async def _inner():
        async with get_async_db_connector() as db:
            user = await _resolve_api_key_owner(db, api_key_id)
            manager = ApiKeyManager(db=db, request=get_mock_request(user=user))
            try:
                await coro_factory(manager, user, api_key_id)
            except (PE.ObjectNotFound, PE.ObjectOwnerNotMatch) as e:
                console.print(f"[red]{e.detail}[/red]")
                raise typer.Exit(1) from e
            except ValueError as e:
                console.print(f"[red]{e}[/red]")
                raise typer.Exit(1) from e

    asyncio.run(_inner())


def _print_rows(title: str, rows: list[dict], show_key: bool = False) -> None:
    table = Table(title=title)
    for col in KEY_COLS:
        table.add_column(col)
    for row in rows:
        key = row["api_key"] if show_key else _mask_api_key(row["api_key"])
        table.add_row(row["id"], row["name"], key,
                      str(row["last_used_at"] or "-"), str(row["is_active"]))
    console.print(table)


def create_api_key(name, user_id, email) -> None:
    async def _do(manager, user):
        api_key = await manager.create_api_key(name)
        _print_rows("API key created", [_row(api_key)], show_key=True)
        console.print("[yellow]Save the api key now - it is shown only once.[/yellow]")

    _run_async(_do, user_id, email)


def list_api_keys(user_id, email) -> None:
    async def _do(manager, user):
        keys = await manager.get_api_key()
        if not keys:
            console.print("[yellow]No api keys found.[/yellow]")
            return
        _print_rows("API keys", [_row(k) for k in keys])

    _run_async(_do, user_id, email)


def delete_api_key(api_key_id) -> None:
    async def _do(manager, user, api_key_id):
        await manager.delete_api_key(api_key_id)
        console.print(f"[green]API key {api_key_id} deleted.[/green]")

    _run_id_async(_do, api_key_id)


def update_api_key(api_key_id, name) -> None:
    async def _do(manager, user, api_key_id):
        api_key = await manager.update_api_key(api_key_id, name)
        _print_rows("API key updated", [_row(api_key)])

    _run_id_async(_do, api_key_id)
