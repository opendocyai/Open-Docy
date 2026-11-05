"""Database-level tamper-proof triggers for audit logs.

Creates BEFORE UPDATE and BEFORE DELETE triggers on the audit_log table to
block any modification or deletion of audit records at the database level.

SQLite dialect implementation (the original MySQL version used
SIGNAL SQLSTATE / information_schema).
"""

from __future__ import annotations

from loguru import logger
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

# Trigger names
TRIGGER_PREVENT_UPDATE = "trg_audit_log_prevent_update"
TRIGGER_PREVENT_DELETE = "trg_audit_log_prevent_delete"
TABLE_NAME = "audit_log"

_RAISE_MSG = "Audit log is append-only."


async def install_triggers(db: AsyncSession) -> None:
    """Install the tamper-proof triggers on the audit_log table.

    Usage: invoked via the /triggers/install endpoint.
    """
    # Drop old triggers (if any) to avoid duplicate-install errors
    await db.execute(text(f"DROP TRIGGER IF EXISTS {TRIGGER_PREVENT_UPDATE}"))
    await db.execute(text(f"DROP TRIGGER IF EXISTS {TRIGGER_PREVENT_DELETE}"))

    # BEFORE UPDATE trigger: block any UPDATE operation
    await db.execute(text(f"""
        CREATE TRIGGER {TRIGGER_PREVENT_UPDATE}
        BEFORE UPDATE ON {TABLE_NAME}
        BEGIN
            SELECT RAISE(ABORT, '{_RAISE_MSG} UPDATE is forbidden.');
        END
    """))

    # BEFORE DELETE trigger: block any DELETE operation
    await db.execute(text(f"""
        CREATE TRIGGER {TRIGGER_PREVENT_DELETE}
        BEFORE DELETE ON {TABLE_NAME}
        BEGIN
            SELECT RAISE(ABORT, '{_RAISE_MSG} DELETE is forbidden.');
        END
    """))
    await db.commit()

    logger.info(
        f"audit_triggers_installed table={TABLE_NAME} "
        f"triggers=[{TRIGGER_PREVENT_UPDATE}, {TRIGGER_PREVENT_DELETE}]"
    )


async def uninstall_triggers(db: AsyncSession) -> None:
    """Remove the tamper-proof triggers from audit_log (maintenance only)."""
    await db.execute(text(f"DROP TRIGGER IF EXISTS {TRIGGER_PREVENT_UPDATE}"))
    await db.execute(text(f"DROP TRIGGER IF EXISTS {TRIGGER_PREVENT_DELETE}"))
    await db.commit()

    logger.info(f"audit_triggers_removed table={TABLE_NAME}")


async def check_triggers(db: AsyncSession) -> dict:
    """Check whether the triggers are installed."""
    result = await db.execute(
        text(
            "SELECT name FROM sqlite_master "
            "WHERE type = 'trigger' AND name IN (:t1, :t2)"
        ),
        {"t1": TRIGGER_PREVENT_UPDATE, "t2": TRIGGER_PREVENT_DELETE},
    )
    installed = [row[0] for row in result.fetchall()]
    return {
        TRIGGER_PREVENT_UPDATE: TRIGGER_PREVENT_UPDATE in installed,
        TRIGGER_PREVENT_DELETE: TRIGGER_PREVENT_DELETE in installed,
    }
