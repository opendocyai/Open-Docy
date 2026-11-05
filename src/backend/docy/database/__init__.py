import os
from pathlib import Path
from typing import AsyncGenerator, Generator
from contextlib import asynccontextmanager, contextmanager
from loguru import logger
from sqlalchemy import event, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlmodel import SQLModel, Field, Session
from sqlmodel.ext.asyncio.session import AsyncSession as SQLModelAsyncSession

from .db_sqllite import SQLiteDatabase

# Main database engine
DB_NAME = "docy"
_engine_cache = {}
_session_factory_cache = {}

def get_db_factory(db_name: str = "docy") -> SQLiteDatabase:
    """Get the database instance."""
    return SQLiteDatabase()


def get_engine(db_name: str = "docy", is_async: bool = False):
    """Get the database engine."""
    db_setting = get_db_factory(db_name)
    async_mark = "async" if is_async else "sync"
    db_key = f"{db_name}_{async_mark}"
    if db_key not in _engine_cache:
        engine = db_setting.create_db_engine(is_sync=not is_async)
        db_setting.configure_engine(engine)
        _engine_cache[db_key] = engine
    return _engine_cache[db_key]

def get_async_session_factory(db_name: str = DB_NAME) -> async_sessionmaker:
    """
    Get the async session factory.

    Args:
        db_name: database name

    Returns:
        async_sessionmaker instance
    """
    db_name = f"{db_name}_async"
    if db_name not in _session_factory_cache:
        engine = get_engine(db_name, is_async=True)
        _session_factory_cache[db_name] = async_sessionmaker(
            engine,
            class_=SQLModelAsyncSession,
            expire_on_commit=False,
            autocommit=False,
            autoflush=False,
        )
    
    return _session_factory_cache[db_name]


def get_sync_session_factory(db_name: str = DB_NAME) -> sessionmaker:
    """Get the sync session factory."""
    cache_key = f"{db_name}_sync"
    if cache_key not in _session_factory_cache:
        engine = get_engine(db_name, is_async=False)
        _session_factory_cache[cache_key] = sessionmaker(
            engine,
            class_=Session,
            expire_on_commit=False,
            autocommit=False,
            autoflush=False,
        )
    return _session_factory_cache[cache_key]


async def async_db(db_name: str = DB_NAME) -> AsyncGenerator[SQLModelAsyncSession, None]:
    """
    Async database session context manager.

    Args:
        db_name: database name

    Yields:
        AsyncSession: async database session

    Usage:
        async with async_db() as session:
            result = await session.execute(query)
            ...
    """
    session_factory = get_async_session_factory(db_name)
    session = session_factory()

    try:
        yield session
        await session.commit()
    except Exception as e:
        await session.rollback()
        logger.error("Database operation failed: {}", e, exc_info=True)
        raise
    finally:
        await session.close()

async def api_async_db() -> AsyncGenerator[SQLModelAsyncSession, None]:
    """
    API-specific async database session.
    Adds extra error handling and transaction management.

    Yields:
        AsyncSession: async database session
    """
    session_factory = get_async_session_factory(DB_NAME)
    session = session_factory()

    try:
        yield session

        # Explicitly check and commit the transaction
        if session.in_transaction():
            await session.commit()

    except Exception as e:
        # Roll back the transaction
        import traceback
        if session.in_transaction():
            await session.rollback()
        logger.error(f"API database operation failed: {e}\n{traceback.format_exc()}")
        raise

    finally:
        await session.close()


def sync_db(db_name: str = DB_NAME) -> Generator[Session, None, None]:
    """Sync database session (generator, to be wrapped by contextmanager)."""
    session_factory = get_sync_session_factory(db_name)
    session = session_factory()
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        logger.error("Database operation failed: {}", e, exc_info=True)
        raise
    finally:
        session.close()


def api_sync_db() -> Generator[Session, None, None]:
    """API-specific sync database session for FastAPI Depends."""
    session_factory = get_sync_session_factory(DB_NAME)
    session = session_factory()
    try:
        yield session
        if session.in_transaction():
            session.commit()
    except Exception as e:
        if session.in_transaction():
            session.rollback()
        logger.error("API database operation failed: {}", e, exc_info=True)
        raise
    finally:
        session.close()


def get_async_db_connector(db_name: str = DB_NAME):
    """Get the async database connector for `async with` statements."""
    return asynccontextmanager(async_db)(db_name)


def get_sync_db_connector(db_name: str = DB_NAME):
    """Get the sync database connector for `with` statements."""
    return contextmanager(sync_db)(db_name)