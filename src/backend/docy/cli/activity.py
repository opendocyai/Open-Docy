"""CLI: manage tasks directly in SQLite (no server required)."""
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
from docy.models.tb_activity import ActivityTask  # noqa: E402
from docy.services.activity.manager import ActivityManager  # noqa: E402
from docy.utils import get_mock_request  # noqa: E402
from docy.utils.sql_query import async_list_objects, async_retrieve_object  # noqa: E402


def _fmt(value):
    """enum → value, None → '-'"""
    return value.value if hasattr(value, "value") else (value if value is not None else "-")


def _creator_name(user) -> str:
    """User name: display takes priority, fallback to username"""
    return user.display or user.username


def _list_row(task, creator_name: str) -> dict:
    return {
        "id": task.id,
        "name": task.name,
        "creator": creator_name,
        "status": _fmt(task.status),
        "webhook_push": task.webhook_push,
    }


def _detail_row(task, creator_name: str) -> dict:
    return {
        "id": task.id,
        "name": task.name,
        "creator": creator_name,
        "agent_id": task.agent_id,
        "status": _fmt(task.status),
        "webhook_push": task.webhook_push,
        "created_at": _fmt(task.created_at),
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
    """Common skeleton: migrate -> open session -> resolve user by email -> mock request -> call manager"""
    _run_migrations()

    async def _inner():
        async with get_async_db_connector() as db:
            user = await _resolve_user(db, email)
            manager = ActivityManager(db=db, request=get_mock_request(user=user))
            try:
                await coro_factory(manager, user, *args)
            except (PE.ObjectNotFound, PE.ObjectOwnerNotMatch) as e:
                console.print(f"[red]{e.detail}[/red]")
                raise typer.Exit(1) from e

    asyncio.run(_inner())


async def _resolve_task_owner(db, activity_id: str):
    """Locate the activity (task) by id and resolve its owner user"""
    task = await async_retrieve_object(db, ActivityTask, o_id=activity_id)
    if not task:
        console.print(f"[red]Activity not found (id={activity_id}).[/red]")
        raise typer.Exit(1)
    user = await async_retrieve_object(db, User, condition=[User.id == task.creator_id])
    if not user:
        console.print(f"[red]Owner user not found (id={task.creator_id}).[/red]")
        raise typer.Exit(1)
    return user


def _run_id_async(coro_factory, activity_id, *args) -> None:
    """ID-based skeleton: migrate -> open session -> resolve activity and owner by id -> mock request -> call manager"""
    _run_migrations()

    async def _inner():
        async with get_async_db_connector() as db:
            user = await _resolve_task_owner(db, activity_id)
            manager = ActivityManager(db=db, request=get_mock_request(user=user))
            try:
                await coro_factory(manager, user, activity_id, *args)
            except (PE.ObjectNotFound, PE.ObjectOwnerNotMatch) as e:
                console.print(f"[red]{e.detail}[/red]")
                raise typer.Exit(1) from e

    asyncio.run(_inner())


def list_activities(email) -> None:
    async def _do(manager, user):
        tasks = await async_list_objects(
            manager.db,
            ActivityTask,
            condition=[
                ActivityTask.creator_id == user.id,
                ActivityTask.visible.isnot(False),
            ],
        )
        if not tasks:
            console.print("[yellow]No activities found.[/yellow]")
            return
        creator_name = _creator_name(user)
        _print_rows("Activities", [_list_row(t, creator_name) for t in tasks])

    _run_async(_do, email)


def get_activity(activity_id) -> None:
    async def _do(manager, user, activity_id):
        task = await manager.get_task_by_id(activity_id)
        _print_rows("Activity", [_detail_row(task, _creator_name(user))])

    _run_id_async(_do, activity_id)


def webhook_activity(activity_id, enable) -> None:
    if enable is None:
        console.print("[red]Provide --on or --off.[/red]")
        raise typer.Exit(1)

    async def _do(manager, user, activity_id):
        task = await manager.update_task(activity_id, update_dict={"webhook_push": enable})
        _print_rows("Activity updated", [_detail_row(task, _creator_name(user))])

    _run_id_async(_do, activity_id)
