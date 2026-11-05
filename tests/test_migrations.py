"""Alembic migration tests: a fresh database must upgrade to head cleanly."""

import sqlite3
from pathlib import Path

from alembic import command
from alembic.config import Config

REPO_ROOT = Path(__file__).resolve().parent.parent
ALEMBIC_INI = REPO_ROOT / "src/backend/docy/alembic.ini"
SCRIPT_LOCATION = REPO_ROOT / "src/backend/docy/alembic"


def test_upgrade_head_on_fresh_db(tmp_path):
    cfg = Config(str(ALEMBIC_INI))
    cfg.set_main_option("script_location", str(SCRIPT_LOCATION))
    db_file = tmp_path / "mig.db"
    cfg.set_main_option("sqlalchemy.url", f"sqlite+aiosqlite:///{db_file.as_posix()}")
    command.upgrade(cfg, "head")

    conn = sqlite3.connect(str(db_file))
    try:
        api_key_cols = {row[1] for row in conn.execute("PRAGMA table_info(api_key)")}
        assert "api_key_hash" in api_key_cols, "api_key_hash column missing"
        auth_cols = {row[1] for row in conn.execute("PRAGMA table_info(auth_user)")}
        assert "stripe_online" not in auth_cols, "stripe_online should be dropped"
        assert "stripe_sandbox" not in auth_cols, "stripe_sandbox should be dropped"
        webhook_cols = {row[1] for row in conn.execute("PRAGMA table_info(webhooks)")}
        assert "endpoint" in webhook_cols
    finally:
        conn.close()


def test_downgrade_restores_stripe_columns(tmp_path):
    cfg = Config(str(ALEMBIC_INI))
    cfg.set_main_option("script_location", str(SCRIPT_LOCATION))
    db_file = tmp_path / "mig.db"
    cfg.set_main_option("sqlalchemy.url", f"sqlite+aiosqlite:///{db_file.as_posix()}")
    command.upgrade(cfg, "head")
    command.downgrade(cfg, "a5f3c8d1e2b4")

    conn = sqlite3.connect(str(db_file))
    try:
        auth_cols = {row[1] for row in conn.execute("PRAGMA table_info(auth_user)")}
        assert "stripe_online" in auth_cols
        assert "stripe_sandbox" in auth_cols
    finally:
        conn.close()
