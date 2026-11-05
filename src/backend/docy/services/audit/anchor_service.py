"""Audit chain anchor service (lightweight).

Writes each chain's latest hash into the anchor table, giving auditors a
publicly verifiable proof of existence.

Differences from the previous version:
  - No longer mentions "blockchain"; an anchor is just a "data snapshot"
  - Emphasizes the export + offline verification workflow
  - publish_all_chains() is intended for scheduled tasks
"""

from __future__ import annotations

from loguru import logger
from sqlalchemy import select

from docy.bases.base_manager import BaseManager
from docy.models.tb_audit import AuditAnchor, AuditLog


class AnchorService(BaseManager):
    """Audit chain anchor manager."""

    async def publish(self, chain_id: str) -> dict:
        """
        Publish an anchor for the given chain (records the latest seq and hash).

        Returns:
            {"chain_id": str, "seq": int, "hash": str, "action": "created"|"skipped"}
        """
        # Fetch the latest record
        stmt = (
            select(AuditLog.hash, AuditLog.seq)
            .where(AuditLog.chain_id == chain_id)
            .order_by(AuditLog.seq.desc())
            .limit(1)
        )
        result = await self.db.execute(stmt)
        row = result.first()
        if not row:
            return {"chain_id": chain_id, "action": "skipped", "reason": "empty chain"}

        latest_hash, latest_seq = row

        # Idempotency check
        existing = await self.db.execute(
            select(AuditAnchor).where(
                AuditAnchor.chain_id == chain_id,
                AuditAnchor.seq == latest_seq,
            )
        )
        if existing.scalar_one_or_none():
            return {"chain_id": chain_id, "seq": latest_seq, "hash": latest_hash, "action": "skipped"}

        anchor = AuditAnchor(chain_id=chain_id, seq=latest_seq, hash=latest_hash)
        self.db.add(anchor)
        await self.db.commit()

        logger.info(f"anchor_published chain_id={chain_id} seq={latest_seq}")
        return {"chain_id": chain_id, "seq": latest_seq, "hash": latest_hash, "action": "created"}

    async def publish_all_chains(self) -> list[dict]:
        """Publish anchors for all chains one by one. Called by scheduled tasks."""
        result = await self.db.execute(
            select(AuditLog.chain_id.distinct()).limit(1000)
        )
        chains = [row[0] for row in result.fetchall()]

        results = []
        for cid in chains:
            r = await self.publish(cid)
            results.append(r)

        logger.info(f"anchor_publish_all_done total={len(chains)}")
        return results

    async def list_anchors(self, chain_id: str) -> list[dict]:
        """List all anchors for the given chain."""
        stmt = (
            select(AuditAnchor)
            .where(AuditAnchor.chain_id == chain_id)
            .order_by(AuditAnchor.seq.asc())
        )
        result = await self.db.execute(stmt)
        return [
            {"seq": a.seq, "hash": a.hash, "created_at": str(a.created_at)}
            for a in result.scalars().all()
        ]

    async def verify_against_anchor(self, chain_id: str, published_hash: str) -> dict:
        """
        Compare the chain's current latest hash against the anchor hash provided
        by the auditor.

        The auditor obtains the anchor hash from an external channel (blockchain,
        GitHub, email, etc.) before calling this method.
        """
        stmt = (
            select(AuditLog.hash, AuditLog.seq)
            .where(AuditLog.chain_id == chain_id)
            .order_by(AuditLog.seq.desc())
            .limit(1)
        )
        result = await self.db.execute(stmt)
        row = result.first()
        if not row:
            return {"chain_id": chain_id, "match": False, "error": "empty chain"}

        current_hash, current_seq = row
        return {
            "chain_id": chain_id,
            "current_seq": current_seq,
            "current_hash": current_hash,
            "published_hash": published_hash,
            "match": current_hash == published_hash,
        }
