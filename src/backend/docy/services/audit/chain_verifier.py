"""Audit chain integrity verification service."""

from __future__ import annotations

import datetime

from loguru import logger
from sqlalchemy import select

from docy.bases.base_manager import BaseManager
from docy.core.settings import project_settings as settings
from docy.models.tb_audit import AuditLog
from docy.schema.audit import ChainVerificationResult, SingleRecordVerificationResult
from docy.services.audit.hash_service import (
    GENESIS_HASH,
    compute_chain_hash,
    compute_payload_hash,
    verify_hmac_signature,
)


class ChainVerifier(BaseManager):
    """
    Recompute each record's hash and compare it against the stored value to
    verify the integrity of the whole chain.

    Verification rules:
      1. previous_hash of seq=0 must == GENESIS_HASH
      2. previous_hash of seq=N must == record[N-1].hash
      3. payload_hash of each record must == SHA-256(canonical(payload))
      4. hash of each record must == compute_chain_hash(...)
      5. the HMAC signature of each record must be valid
    """

    async def verify_chain(self, chain_id: str) -> ChainVerificationResult:
        """Verify the complete hash chain of the given chain."""
        records = await self._fetch_all(chain_id)
        errors: list[dict] = []
        expected_prev = GENESIS_HASH

        for rec in records:
            # Check 1: previous-hash linkage
            if rec.previous_hash != expected_prev:
                errors.append(
                    {
                        "seq": rec.seq,
                        "type": "broken_chain",
                        "detail": f"expected prev={expected_prev[:16]}..., got={rec.previous_hash[:16]}...",
                    }
                )

            # Check 2: payload hash
            expected_ph = compute_payload_hash(rec.payload)
            if rec.payload_hash != expected_ph:
                errors.append(
                    {
                        "seq": rec.seq,
                        "type": "payload_tampered",
                        "detail": f"expected payload_hash={expected_ph[:16]}..., got={rec.payload_hash[:16]}...",
                    }
                )

            # Check 3: chain hash
            expected_hash = compute_chain_hash(
                previous_hash=rec.previous_hash,
                chain_id=rec.chain_id,
                seq=rec.seq,
                event_time=rec.event_time,
                payload_hash=rec.payload_hash,
                actor_id=rec.actor_id,
                action=rec.action,
                resource_type=rec.resource_type,
                resource_id=rec.resource_id,
                outcome=rec.outcome,
                user_id=rec.user_id,
                source_ip=rec.source_ip,
                request_id=rec.request_id,
            )
            if rec.hash != expected_hash:
                errors.append(
                    {
                        "seq": rec.seq,
                        "type": "hash_mismatch",
                        "detail": f"expected={expected_hash[:16]}..., got={rec.hash[:16]}...",
                    }
                )

            # Check 4: HMAC signature (only for signed records)
            if rec.signature:
                if not verify_hmac_signature(
                    rec.hash, rec.signature, settings.security.secret_key
                ):
                    errors.append(
                        {
                            "seq": rec.seq,
                            "type": "signature_invalid",
                            "detail": "HMAC signature verification failed",
                        }
                    )

            expected_prev = rec.hash

        return ChainVerificationResult(
            chain_id=chain_id,
            total_records=len(records),
            valid=len(errors) == 0,
            errors=errors,
            verified_at=datetime.datetime.now(datetime.timezone.utc),
        )

    # Single-record verification

    async def verify_single_record(
        self, event_id: str
    ) -> SingleRecordVerificationResult:
        """
        Verify the integrity of a single audit record within the hash chain.

        Verification rules:
          1. Fetch the previous record and check previous_hash equals its hash
          2. Check the current record's hash matches the compute_chain_hash result
          3. Verify the HMAC signature (if present)
        """
        # 1. Fetch the target record
        record = await self._get_by_id(event_id)
        if not record:
            raise ValueError(f"Audit log not found: {event_id}")

        errors: list[dict] = []

        # 2. Fetch the previous record (seq - 1)
        if record.seq > 0:
            prev_record = await self._get_previous(record.chain_id, record.seq)
            if prev_record is None:
                # Previous record missing; chain linkage cannot be verified
                errors.append({
                    "type": "previous_record_missing",
                    "detail": f"Previous record (seq={record.seq - 1}) not found in chain {record.chain_id}",
                })
            else:
                # Verify previous_hash matches the previous record's hash
                if record.previous_hash != prev_record.hash:
                    errors.append({
                        "type": "broken_chain",
                        "detail": (
                            f"previous_hash mismatch: expected={prev_record.hash[:16]}..., "
                            f"got={record.previous_hash[:16]}..."
                        ),
                    })
        else:
            # For seq=0, previous_hash must equal the genesis hash
            if record.previous_hash != GENESIS_HASH:
                errors.append({
                    "type": "broken_chain",
                    "detail": (
                        f"seq=0 previous_hash mismatch: expected genesis hash, "
                        f"got={record.previous_hash[:16]}..."
                    ),
                })

        # 3. Verify the current hash
        expected_hash = compute_chain_hash(
            previous_hash=record.previous_hash,
            chain_id=record.chain_id,
            seq=record.seq,
            event_time=record.event_time,
            payload_hash=record.payload_hash,
            actor_id=record.actor_id,
            action=record.action,
            resource_type=record.resource_type,
            resource_id=record.resource_id,
            outcome=record.outcome,
            user_id=record.user_id,
            source_ip=record.source_ip,
            request_id=record.request_id,
        )
        if record.hash != expected_hash:
            errors.append({
                "type": "hash_mismatch",
                "detail": f"expected={expected_hash[:16]}..., got={record.hash[:16]}...",
            })

        # 4. Verify the HMAC signature (if present)
        if record.signature:
            if not verify_hmac_signature(
                record.hash, record.signature, settings.security.secret_key
            ):
                errors.append({
                    "type": "signature_invalid",
                    "detail": "HMAC signature verification failed",
                })

        return SingleRecordVerificationResult(
            event_id=record.id,
            chain_id=record.chain_id,
            seq=record.seq,
            valid=len(errors) == 0,
            errors=errors,
            verified_at=datetime.datetime.now(datetime.timezone.utc),
        )

    async def _get_by_id(self, event_id: str) -> AuditLog | None:
        """Fetch a single audit record by ID."""
        stmt = select(AuditLog).where(AuditLog.id == event_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def _get_previous(self, chain_id: str, seq: int) -> AuditLog | None:
        """Fetch the seq-1 record in the given chain."""
        stmt = (
            select(AuditLog)
            .where(AuditLog.chain_id == chain_id, AuditLog.seq == seq - 1)
            .limit(1)
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def _fetch_all(self, chain_id: str) -> list[AuditLog]:
        stmt = (
            select(AuditLog)
            .where(AuditLog.chain_id == chain_id)
            .order_by(AuditLog.seq.asc())
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
