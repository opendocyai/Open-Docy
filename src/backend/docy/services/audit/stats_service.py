"""Audit statistics dashboard service.

Provides the following capabilities:
  1. Total event count
  2. Active user count over the last 7 days
  3. Integrity status (sampled verification)
  4. Week-over-week trend calculation
"""

from __future__ import annotations

import datetime
from datetime import timedelta, timezone

from loguru import logger
from sqlalchemy import and_, func, select

from docy.bases.base_manager import BaseManager
from docy.models.tb_audit import AuditLog
from docy.schema.audit import AuditStatsResponse
from docy.services.audit.hash_service import (
    GENESIS_HASH,
    compute_chain_hash,
)


class AuditStatsService(BaseManager):
    """Audit statistics dashboard service."""

    async def get_stats(self, space_id: str) -> AuditStatsResponse:
        """Get dashboard statistics (isolated by space)."""
        total_events = await self._count_events(space_id)
        users_active = await self._count_active_users(space_id, days=7)
        integrity_status = await self._check_integrity_status(space_id)
        weekly_trend = await self._calculate_weekly_trend(space_id)

        return AuditStatsResponse(
            total_events=total_events,
            users_active_7d=users_active,
            integrity_status=integrity_status,
            weekly_trend=weekly_trend,
        )

    def _space_filter(self, space_id: str):
        """Build the space_id filter condition."""
        return AuditLog.space_id == space_id

    async def _count_events(self, space_id: str) -> int:
        """Count total events."""
        result = await self.db.execute(
            select(func.count(AuditLog.id)).where(self._space_filter(space_id))
        )
        return result.scalar() or 0

    async def _count_active_users(self, space_id: str, days: int = 7) -> int:
        """Count distinct active users over the last N days."""
        cutoff = datetime.datetime.now(timezone.utc) - timedelta(days=days)
        cutoff_naive = cutoff.replace(tzinfo=None)
        result = await self.db.execute(
            select(func.count(func.distinct(AuditLog.user_id))).where(
                and_(
                    self._space_filter(space_id),
                    AuditLog.event_time >= cutoff_naive,
                )
            )
        )
        return result.scalar() or 0

    async def _check_integrity_status(self, space_id: str, sample_size: int = 100) -> str:
        """
        Sample-verify the hash chain integrity of the latest records.

        Return values:
          - "success": hash chain is intact, verification passed
          - "warning": hash chain has anomalies that need attention
          - "failed": an error occurred during verification
        """
        from collections import defaultdict

        try:
            stmt = (
                select(AuditLog)
                .where(self._space_filter(space_id))
                .order_by(AuditLog.event_time.desc())
                .limit(sample_size)
            )
            result = await self.db.execute(stmt)
            records = list(result.scalars().all())

            if not records:
                return "success"

            # Group by chain_id; sort each group by seq
            chains: dict[str, list[AuditLog]] = defaultdict(list)
            for rec in records:
                chains[rec.chain_id].append(rec)

            # Verify the hash chain within each chain
            for chain_id, chain_records in chains.items():
                chain_records.sort(key=lambda r: r.seq)

                for i, rec in enumerate(chain_records):
                    if i == 0:
                        if rec.seq == 0 and rec.previous_hash != GENESIS_HASH:
                            logger.warning(
                                f"integrity_check_failed: first record seq=0 but previous_hash != GENESIS_HASH, "
                                f"chain_id={chain_id} event_id={rec.id} seq={rec.seq}"
                            )
                            return "warning"
                    else:
                        if rec.previous_hash != chain_records[i - 1].hash:
                            logger.warning(
                                f"integrity_check_failed: previous_hash mismatch, "
                                f"chain_id={chain_id} event_id={rec.id} seq={rec.seq} "
                                f"expected={chain_records[i - 1].hash} actual={rec.previous_hash}"
                            )
                            return "warning"

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
                        logger.warning(
                            f"integrity_check_hash_mismatch: "
                            f"chain_id={chain_id} event_id={rec.id} seq={rec.seq} "
                            f"expected={expected_hash} actual={rec.hash}"
                        )
                        return "warning"

            return "success"
        except Exception as e:
            logger.error(f"integrity_check_error: {e}")
            return "failed"

    @staticmethod
    def _calendar_week_bounds(
        now: datetime.datetime,
    ) -> tuple[datetime.datetime, datetime.datetime]:
        """
        Compute the natural calendar week boundaries (Monday 00:00).

        Returns:
            (this_week_start, last_week_start)
            - this_week_start: Monday 00:00 of the current week
            - last_week_start: Monday 00:00 of the previous week
              (the current week starts at this_week_start)
        """
        this_week_start = (now - timedelta(days=now.weekday())).replace(
            hour=0, minute=0, second=0, microsecond=0
        )
        last_week_start = this_week_start - timedelta(days=7)
        return this_week_start, last_week_start

    async def _calculate_weekly_trend(self, space_id: str) -> float | None:
        """
        Compute the week-over-week trend: this week (since Monday 00:00) vs
        the full previous natural week.

        Natural-week windows: this week [this Monday 00:00, now), last week
        [last Monday 00:00, this Monday 00:00).

        Returns the percentage change, e.g. 12.4 means up 12.4%, -100.0 means
        down 100%. Returns None when the previous week has zero events (the
        trend cannot be computed).
        """
        now = datetime.datetime.now(timezone.utc)
        now_naive = now.replace(tzinfo=None)
        this_week_start, last_week_start = self._calendar_week_bounds(now_naive)

        # Event count this week: [this Monday 00:00, now)
        this_week_result = await self.db.execute(
            select(func.count(AuditLog.id)).where(
                and_(
                    self._space_filter(space_id),
                    AuditLog.event_time >= this_week_start,
                    AuditLog.event_time < now_naive,
                )
            )
        )
        this_week_count = this_week_result.scalar() or 0

        # Event count last week (full natural week): [last Monday 00:00, this Monday 00:00)
        last_week_result = await self.db.execute(
            select(func.count(AuditLog.id)).where(
                and_(
                    self._space_filter(space_id),
                    AuditLog.event_time >= last_week_start,
                    AuditLog.event_time < this_week_start,
                )
            )
        )
        last_week_count = last_week_result.scalar() or 0

        # Cannot compute the trend without prior-week data; return None
        if last_week_count == 0:
            return None

        trend = ((this_week_count - last_week_count) / last_week_count) * 100
        return round(trend, 1)
