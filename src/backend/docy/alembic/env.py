import asyncio
import importlib
from pathlib import Path
from logging.config import fileConfig

from alembic import context
from sqlalchemy import pool, text, MetaData
from sqlalchemy.event import listen
from sqlalchemy.ext.asyncio import async_engine_from_config
from sqlmodel import SQLModel

from docy.bases.dbs import Base

# Import all models so SQLModel.metadata includes all tables
# from docy.models.test import TestItem  # noqa: F401

BasePath = Path(__file__).parent.parent / 'models'

config = context.config

if config.config_file_name is not None:
    # disable_existing_loggers=False: migrations run during the lifespan startup;
    # the default True disables loggers not listed in alembic.ini, such as
    # uvicorn.access / uvicorn.error, so all request access logs (including errors) vanish.
    fileConfig(config.config_file_name, disable_existing_loggers=False)

apps = ["models"]
exclude_tables = [
    "apscheduler_jobs",
    "apscheduler_job_executions",
    "apscheduler_triggers_interval",
    "apscheduler_triggers_cron",
    "apscheduler_triggers_date",
]

NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

def include_object(object, name, type_, reflected, compare_to):
    """
    Custom include_object logic to exclude specific tables
    """
    if type_ == "table" and name in exclude_tables:
        return False
    return True

def discover_targets():
    target_metadata = MetaData()
    # metadata_list = []
    for path in BasePath.rglob("tb_*.py"):
        for app in apps:
            try:
                index = path.parts.index(app)
            except:
                continue
            module_name = ".".join(path.parts[index-1:]).replace(".py", "")
            try:
                importlib.import_module(module_name)
            except Exception as e:
                print(e)
    # Add all tables
    for table in Base.metadata.tables.values():
        if (
                table.name not in target_metadata.tables
                and table.name not in exclude_tables
        ):
            table.tometadata(target_metadata)

    return target_metadata

# discover_targets()

target_metadata = discover_targets() #SQLModel.metadata
target_metadata.naming_convention = NAMING_CONVENTION


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        render_as_batch=True,
        include_object=include_object,
    )
    with context.begin_transaction():
        context.run_migrations()


def _sqlite_do_connect(dbapi_connection, _connection_record):
    dbapi_connection.isolation_level = None


def _sqlite_do_begin(conn):
    conn.exec_driver_sql("BEGIN EXCLUSIVE")


def _do_run_migrations(connection):
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        render_as_batch=True,
        include_object=include_object,
    )
    with context.begin_transaction():
        if connection.dialect.name == "postgresql":
            connection.execute(text("SET LOCAL lock_timeout = '60s';"))
            connection.execute(text("SELECT pg_advisory_xact_lock(112233);"))
        context.run_migrations()


async def _run_async_migrations() -> None:
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    if connectable.dialect.name == "sqlite":
        listen(connectable.sync_engine, "connect", _sqlite_do_connect)
        listen(connectable.sync_engine, "begin", _sqlite_do_begin)

    async with connectable.connect() as connection:
        await connection.run_sync(_do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    asyncio.run(_run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
