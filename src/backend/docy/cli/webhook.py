"""CLI: manage webhook records directly in SQLite (no server required)."""
import asyncio
from urllib.parse import urlparse

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
from docy.models.tb_webhook import Webhooks  # noqa: E402
from docy.services.webhook.manager import WebhookManager  # noqa: E402
from docy.utils import get_mock_request  # noqa: E402
from docy.utils.sql_query import async_retrieve_object  # noqa: E402

USER_COLS = ("id", "endpoint", "description", "status")


def _row(webhook) -> dict:
    return {"id": webhook.id, "endpoint": webhook.endpoint,
            "description": webhook.description, "status": webhook.status}


def _require_user_spec(user_id: str | None, email: str | None) -> None:
    """--user-id / --email: exactly one is required"""
    if (user_id is None) == (email is None):
        console.print("[red]Provide exactly one of --user-id or --email.[/red]")
        raise typer.Exit(1)


def _check_url(endpoint: str | None) -> None:
    """endpoint must be an http(s) URL (WebhookManager does not validate)"""
    if endpoint is None:
        return
    parsed = urlparse(endpoint)
    if parsed.scheme not in ("http", "https") or not parsed.netloc:
        console.print("[red]endpoint must be an http(s) URL.[/red]")
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
            manager = WebhookManager(db=db, request=get_mock_request(user=user))
            try:
                await coro_factory(manager, user, *args)
            except (PE.OperationNotAllow, PE.ObjectNotFound) as e:
                console.print(f"[red]{e.detail}[/red]")
                raise typer.Exit(1) from e

    asyncio.run(_inner())


async def _resolve_webhook_owner(db, webhook_id: str):
    """Locate the webhook by id and resolve its owner user
    (no --user-id/--email needed when the id is known)
    """
    webhook = await async_retrieve_object(db, Webhooks, o_id=webhook_id)
    if not webhook:
        console.print(f"[red]Webhook not found (id={webhook_id}).[/red]")
        raise typer.Exit(1)
    user = await async_retrieve_object(db, User, condition=[User.id == webhook.creator])
    if not user:
        console.print(f"[red]Owner user not found (id={webhook.creator}).[/red]")
        raise typer.Exit(1)
    return user


def _run_id_async(coro_factory, webhook_id) -> None:
    """ID-based skeleton: migrate -> open session -> resolve webhook and owner by id -> mock request -> call manager"""
    _run_migrations()

    async def _inner():
        async with get_async_db_connector() as db:
            user = await _resolve_webhook_owner(db, webhook_id)
            manager = WebhookManager(db=db, request=get_mock_request(user=user))
            try:
                await coro_factory(manager, user, webhook_id)
            except (PE.OperationNotAllow, PE.ObjectNotFound) as e:
                console.print(f"[red]{e.detail}[/red]")
                raise typer.Exit(1) from e

    asyncio.run(_inner())


def _print_rows(title: str, rows: list[dict]) -> None:
    table = Table(title=title)
    for col in USER_COLS:
        table.add_column(col)
    for row in rows:
        status = row["status"]
        table.add_row(row["id"], row["endpoint"], row["description"] or "-",
                      status.value if hasattr(status, "value") else str(status))
    console.print(table)


def create_webhook(endpoint, user_id, email, description) -> None:
    _check_url(endpoint)

    async def _do(manager, user):
        webhook = await manager.create_webhook(endpoint, description=description)
        _print_rows("Webhook created", [_row(webhook)])
        console.print(f"[yellow]Signature: {webhook.signature}[/yellow]")
        console.print("[yellow]Save the signature now - it is shown only once.[/yellow]")

    _run_async(_do, user_id, email)


def get_webhook(webhook_id) -> None:
    async def _do(manager, user, webhook_id):
        webhook = await manager.get_webhook_by_id(webhook_id)
        _print_rows("Webhook", [_row(webhook)])

    _run_id_async(_do, webhook_id)


def list_webhooks(user_id, email, status) -> None:
    async def _do(manager, user):
        webhooks = await manager.list_user_webhooks(status=status)
        if not webhooks:
            console.print("[yellow]No webhooks found.[/yellow]")
            return
        _print_rows("Webhooks", [_row(w) for w in webhooks])

    _run_async(_do, user_id, email)


def update_webhook(webhook_id, endpoint, status, description) -> None:
    if endpoint is None and status is None and description is None:
        console.print("[red]Provide at least one of --endpoint, --status, --description.[/red]")
        raise typer.Exit(1)
    _check_url(endpoint)

    async def _do(manager, user, webhook_id):
        webhook = await manager.update_webhook(
            webhook_id, status=status, endpoint=endpoint, description=description
        )
        _print_rows("Webhook updated", [_row(webhook)])

    _run_id_async(_do, webhook_id)


def rotate_webhook(webhook_id) -> None:
    async def _do(manager, user, webhook_id):
        secret = await manager.rotate_webhook_secret(webhook_id)
        console.print(f"[green]New signature: {secret}[/green]")
        console.print("[yellow]Save it now - it is shown only once.[/yellow]")

    _run_id_async(_do, webhook_id)
