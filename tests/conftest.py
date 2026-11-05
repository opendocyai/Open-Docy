"""Shared pytest fixtures.

Tests must never touch the live storage/ directories (the dev server may be
running against them): every DB-backed test gets a fresh tmp sqlite database.
"""

import importlib
import tempfile
from pathlib import Path

import pytest

# Cold-import order rule: docy.honker_db must be imported before anything that
# reaches docy.ai (circular import otherwise). Importing it only registers
# honker tasks in this process; no workers are started, nothing is consumed.
import docy.honker_db  # noqa: F401

from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from docy.bases.base_model import Base

MODELS_DIR = Path(docy.honker_db.__file__).parent / "models"


def _import_all_models() -> None:
    for path in sorted(MODELS_DIR.rglob("tb_*.py")):
        module_name = f"docy.models.{path.stem}"
        try:
            importlib.import_module(module_name)
        except Exception as exc:  # mirror alembic env.py tolerance
            print(f"model import skipped {module_name}: {exc}")


@pytest.fixture
async def db():
    """Fresh tmp sqlite DB with the full schema; yields an AsyncSession."""
    _import_all_models()
    with tempfile.TemporaryDirectory(prefix="docy_test_") as tmp:
        engine = create_async_engine(f"sqlite+aiosqlite:///{Path(tmp) / 'test.db'}")
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        session = async_sessionmaker(engine, expire_on_commit=False)()
        try:
            yield session
        finally:
            await session.close()
            await engine.dispose()
