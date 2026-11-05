"""
Audit write service — core component.

Responsibilities:
  1. Query the previous hash
  2. Compute the payload_hash and the chain hash
  3. Atomically INSERT into audit_log
  4. Retry automatically on concurrent conflicts
"""

from __future__ import annotations

import datetime
import uuid

from loguru import logger
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_random_exponential,
)

from docy.bases.base_manager import BaseManager
from docy.core.settings import project_settings as settings
from docy.models.tb_audit import AuditLog
from docy.schema.audit import AuditEventCreate, AuditFilterOptionsResponse
from docy.services.audit.hash_service import (
    GENESIS_HASH,
    compute_chain_hash,
    compute_hmac_signature,
    compute_payload_hash,
)

# Max retries (for concurrent conflicts)
_MAX_RETRIES = 3


class AuditWriter(BaseManager):
    """Async audit log writer."""

    @retry(
        retry=retry_if_exception_type(IntegrityError),
        stop=stop_after_attempt(_MAX_RETRIES),
        wait=wait_random_exponential(multiplier=0.1, max=1.0),
        reraise=True,
    )
    async def write(self, event: AuditEventCreate) -> AuditLog:
        """
        Write one audit record.

        Flow:
          1. Query the latest record with the same chain_id to get seq and
             previous_hash
          2. Compute payload_hash = SHA-256(canonical(event.payload))
          3. Compute the chain_hash (linked to the previous hash)
          4. Atomic INSERT
          5. On UNIQUE conflicts (concurrent races), retry automatically

        Returns:
            the successfully written AuditLog record

        Raises:
            IntegrityError: conflict persists after retries are exhausted
        """
        session = self.db

        # 1. Fetch the previous record
        prev = await self._get_latest(session, event.chain_id)

        if prev is None:
            seq = 0
            previous_hash = GENESIS_HASH
        else:
            seq = prev.seq + 1
            previous_hash = prev.hash

        # 2. Compute hashes
        now = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0)
        _request_id = event.request_id or str(uuid.uuid4())
        payload_hash = compute_payload_hash(event.payload)
        chain_hash = compute_chain_hash(
            previous_hash=str(previous_hash),
            chain_id=event.chain_id,
            seq=seq,
            event_time=now,
            payload_hash=payload_hash,
            actor_id=event.actor_id,
            action=event.action.value,
            resource_type=event.resource_type.value,
            resource_id=event.resource_id,
            outcome=event.outcome.value,
            user_id=self.request.user.id,
            source_ip=event.source_ip,
            request_id=_request_id,
        )

        # 2.5 Compute the HMAC signature
        signature = compute_hmac_signature(chain_hash, settings.security.secret_key)

        # 3. Build the ORM object and INSERT
        # Extract space_id from chain_id (format: {space_id}--{resource_type})
        space_id = event.chain_id.split("--")[0] if "--" in event.chain_id else ""

        record = AuditLog(
            chain_id=event.chain_id,
            seq=seq,
            previous_hash=previous_hash,
            hash=chain_hash,
            event_time=now,
            actor_id=event.actor_id,
            actor_type=event.actor_type.value,
            resource_type=event.resource_type.value,
            resource_id=event.resource_id,
            action=event.action.value,
            outcome=event.outcome.value,
            source_ip=event.source_ip,
            request_id=_request_id,
            payload=event.payload,
            payload_hash=payload_hash,
            user_id=self.request.user.id,
            space_id=space_id,
            signature=signature,
        )
        session.add(record)
        try:
            await session.commit()
        except IntegrityError:
            await session.rollback()
            raise

        logger.info(
            f"audit_record_written chain_id={event.chain_id} "
            f"seq={seq} hash={chain_hash[:16]}..."
        )
        return record

    async def write_batch(
        self, events: list[AuditEventCreate]
    ) -> list[AuditLog | None]:
        """
        Write audit records in batch.

        All events in a batch must belong to the same chain (same chain_id) so
        the hash chain order is correct. Cross-chain events must be batched
        separately.

        Returns:
            list of successfully written records (failed items become None
            without blocking later items)

        Note:
            a failure of any single item does not affect the others
            (best-effort).
        """
        results: list[AuditLog | None] = []
        for event in events:
            try:
                record = await self.write(event)
                results.append(record)
            except Exception:
                logger.exception(
                    f"audit_batch_write_failed chain_id={event.chain_id} "
                    f"action={event.action.value}"
                )
                results.append(None)
        logger.info(
            f"audit_batch_written total={len(events)} "
            f"succeeded={sum(1 for r in results if r is not None)} "
            f"failed={sum(1 for r in results if r is None)}"
        )
        return results

    @staticmethod
    async def _get_latest(session: AsyncSession, chain_id: str) -> AuditLog | None:
        """Fetch the latest record of the chain (the one with the largest seq)."""
        stmt = (
            select(AuditLog)
            .where(AuditLog.chain_id == chain_id)
            .order_by(AuditLog.seq.desc())
            .limit(1)
        )
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def get_event_types() -> AuditFilterOptionsResponse:
        """
        Get the list of all selectable filter options.

        Returns fixed enum values directly; no DB query needed.
        """
        return AuditFilterOptionsResponse(
            resource_types=[
                "space",
                "agent",
                "task",
                "knowledge",
                "policy",
                "template",
            ],
            actions=[
                "create",
                "update",
                "execute",
                "delete",
                "invite",
                "publish",
                "complete",
                "fail",
                "action_required",
                "resume",
                "cancel",
                "batch_delete",
            ],
            outcomes=["success", "failure"],
            integrity_statuses=["success", "warning", "failed"],
        )
