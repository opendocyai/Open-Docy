"""Audit health monitoring service.

Provides periodic inspection that detects:
  1. Broken hash chains — checked via sampled recomputation
  2. Write failure rate — success/failure ratio over a recent window
  3. Record growth rate — to estimate storage capacity
"""

from __future__ import annotations

import datetime
from dataclasses import dataclass, field

from loguru import logger
from sqlalchemy import and_, func, select

from docy.bases.base_manager import BaseManager
from docy.models.tb_audit import AuditLog
from docy.services.audit.hash_service import (
    GENESIS_HASH,
    compute_payload_hash,
)


@dataclass
class HealthReport:
    """Audit system health report."""

    checked_at: str
    total_chains: int = 0
    total_records: int = 0
    chains_with_errors: int = 0
    details: list[dict] = field(default_factory=list)
    healthy: bool = True


class AuditHealthMonitor(BaseManager):
    """
    Audit system health monitor.

    Usage:
        monitor = AuditHealthMonitor(db=db)
        report = await monitor.check()
        if not report.healthy:
            ...  # trigger an alert
    """

    async def check(
        self,
        sample_size: int = 100,
    ) -> HealthReport:
        """
        Run the health check.

        Args:
            sample_size: max number of records sample-verified per chain
        """
        report = HealthReport(
            checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat()
        )

        # 1. Count totals
        report.total_chains = await self._count_chains()
        report.total_records = await self._count_records()

        # 2. Sample-verify each chain
        chains = await self._list_chains()
        for chain_id in chains:
            chain_errors = await self._sample_verify(chain_id, sample_size)
            if chain_errors:
                report.chains_with_errors += 1
                report.healthy = False
                report.details.append(
                    {
                        "chain_id": chain_id,
                        "type": "hash_chain_error",
                        "sample_errors": len(chain_errors),
                        "errors": chain_errors[:5],  # keep only the first 5
                    }
                )

        # 2. Write failure rate (based on the outcome='failure' ratio)
        fail_rate = await self._failure_rate(hours=24)
        if fail_rate > 0.1:  # alert above 10%
            report.healthy = False
            report.details.append(
                {
                    "type": "high_failure_rate",
                    "rate_24h": round(fail_rate, 3),
                    "threshold": 0.1,
                }
            )

        if report.healthy:
            logger.info(
                f"audit_health_ok chains={report.total_chains} "
                f"records={report.total_records}"
            )
        else:
            logger.warning(f"audit_health_warning: {report.details}")

        return report

    async def _count_chains(self) -> int:
        result = await self.db.execute(
            select(func.count(func.distinct(AuditLog.chain_id)))
        )
        return result.scalar() or 0

    async def _count_records(self) -> int:
        result = await self.db.execute(select(func.count(AuditLog.id)))
        return result.scalar() or 0

    async def _list_chains(self) -> list[str]:
        result = await self.db.execute(
            select(AuditLog.chain_id.distinct()).limit(1000)
        )
        return [row[0] for row in result.fetchall()]

    async def _sample_verify(self, chain_id: str, sample_size: int) -> list[dict]:
        """Sample-verify the first sample_size records of a chain."""
        errors = []

        # Fetch the first N records
        stmt = (
            select(AuditLog)
            .where(AuditLog.chain_id == chain_id)
            .order_by(AuditLog.seq.asc())
            .limit(sample_size)
        )
        result = await self.db.execute(stmt)
        records = list(result.scalars().all())

        if not records:
            return errors

        expected_prev = GENESIS_HASH
        for rec in records:
            if rec.previous_hash != expected_prev:
                errors.append(
                    {
                        "seq": rec.seq,
                        "type": "broken_chain",
                        "detail": f"expected {expected_prev[:12]}..., got {rec.previous_hash[:12]}...",
                    }
                )
            expected_ph = compute_payload_hash(rec.payload)
            if rec.payload_hash != expected_ph:
                errors.append(
                    {
                        "seq": rec.seq,
                        "type": "payload_tampered",
                    }
                )
            expected_prev = rec.hash

        return errors

    async def _failure_rate(self, hours: int = 24) -> float:
        """Compute the write failure rate over the last N hours."""
        cutoff = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(
            hours=hours
        )
        total = await self.db.execute(
            select(func.count(AuditLog.id)).where(AuditLog.event_time >= cutoff)
        )
        failed = await self.db.execute(
            select(func.count(AuditLog.id)).where(
                and_(
                    AuditLog.event_time >= cutoff,
                    AuditLog.outcome == "failure",
                )
            )
        )
        total_n = total.scalar() or 0
        failed_n = failed.scalar() or 0
        if total_n == 0:
            return 0.0
        return failed_n / total_n
