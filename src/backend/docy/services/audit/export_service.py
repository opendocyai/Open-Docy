"""Audit log export service (enhanced).

The export format contains:
  1. Metadata block: GENESIS_HASH, algorithm description, export time, record count
  2. Data block: the array of audit records
  3. Signature block: HMAC signature of the exported data

Auditors can verify independently using this file and the public anchors.
"""

from __future__ import annotations

import csv
import datetime
import io
import json
from typing import AsyncGenerator

from sqlalchemy import select

from docy.bases.base_manager import BaseManager
from docy.core.settings import project_settings as settings
from docy.models.tb_audit import AuditAnchor, AuditLog
from docy.services.audit.hash_service import (
    GENESIS_HASH,
    compute_hmac_signature,
)

# Export protocol version
EXPORT_VERSION = "1.0"
# Hash algorithm description (for external auditors)
HASH_ALGORITHM = (
    "SHA-256 chain hash: "
    "hash = SHA-256(previous_hash || chain_id || seq || event_time_iso "
    "|| payload_hash || actor_id || action || resource_type || resource_id "
    "|| outcome || user_id || source_ip || request_id)"
)


class AuditExportService(BaseManager):
    """Stream audit logs for export, including verification metadata and signature."""

    # Fields needing protection from Excel scientific notation (long numeric IDs)
    _SCIENTIFIC_NOTATION_FIELDS = {"id", "seq", "user_id", "actor_id", "resource_id", "chain_id"}

    @classmethod
    def _format_header(cls, key: str) -> str:
        """Format column headers: capitalize the first letter, replace underscores with spaces."""
        return key.replace("_", " ").title()

    @classmethod
    def _format_value(cls, key: str, value) -> str:
        """
        Format cell values:
        - Prefix long ID-like fields with a tab so Excel does not convert
          them to scientific notation
        - Convert dict/list to a JSON string
        """
        if value is None:
            return ""
        if isinstance(value, (dict, list)):
            return json.dumps(value, ensure_ascii=False)
        # Prevent Excel from showing long numeric IDs in scientific notation
        if key in cls._SCIENTIFIC_NOTATION_FIELDS and str(value).isdigit() and len(str(value)) >= 15:
            return "\t" + str(value)
        return str(value)

    async def stream_enhanced(
        self,
        chain_id: str,
        format_: str = "json",
        from_seq: int = 0,
        to_seq: int | None = None,
    ) -> AsyncGenerator[bytes, None]:
        """Stream the enhanced export data."""
        records = await self._fetch(chain_id, from_seq, to_seq)

        if format_ == "json":
            async for chunk in self._stream_json_enhanced(chain_id, records):
                yield chunk
        else:
            async for chunk in self._stream_csv_enhanced(chain_id, records):
                yield chunk

    async def _fetch(
        self, chain_id: str, from_seq: int, to_seq: int | None
    ) -> list[AuditLog]:
        stmt = (
            select(AuditLog)
            .where(AuditLog.chain_id == chain_id, AuditLog.seq >= from_seq)
            .order_by(AuditLog.seq.asc())
        )
        if to_seq is not None:
            stmt = stmt.where(AuditLog.seq <= to_seq)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    def _serialize_record(self, row: AuditLog) -> dict:
        return {
            "id": row.id,
            "chain_id": row.chain_id,
            "seq": row.seq,
            "previous_hash": row.previous_hash,
            "hash": row.hash,
            "event_time": row.event_time.isoformat() if row.event_time else None,
            "user_id": row.user_id,
            "actor_id": row.actor_id,
            "actor_type": row.actor_type,
            "resource_type": row.resource_type,
            "resource_id": row.resource_id,
            "action": row.action,
            "outcome": row.outcome,
            "source_ip": row.source_ip,
            "request_id": row.request_id,
            "payload": row.payload,
            "payload_hash": row.payload_hash,
            "signature": row.signature,
        }

    @staticmethod
    def _canonical_json(obj: dict) -> bytes:
        """Deterministically serialize the export data block (for signing)."""
        return json.dumps(
            obj, sort_keys=True, ensure_ascii=False, separators=(",", ":")
        ).encode("utf-8")

    async def _stream_json_enhanced(
        self, chain_id: str, records: list[AuditLog]
    ) -> AsyncGenerator[bytes, None]:
        """Generate the enhanced JSON export (including anchors)."""
        serialized = [self._serialize_record(r) for r in records]

        # Fetch the anchor list
        anchor_stmt = (
            select(AuditAnchor)
            .where(AuditAnchor.chain_id == chain_id)
            .order_by(AuditAnchor.seq.asc())
        )
        anchor_result = await self.db.execute(anchor_stmt)
        anchors = [
            {"seq": a.seq, "hash": a.hash, "created_at": str(a.created_at)}
            for a in anchor_result.scalars().all()
        ]

        # Latest record info (publishable as a public anchor)
        latest_hash = None
        latest_seq = None
        if records:
            latest_hash = records[-1].hash
            latest_seq = records[-1].seq

        # Build the export package
        export_package = {
            "meta": {
                "version": EXPORT_VERSION,
                "exported_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "chain_id": chain_id,
                "total_records": len(records),
                "genesis_hash": GENESIS_HASH,
                "hash_algorithm": HASH_ALGORITHM,
                "instructions": (
                    "Verification steps: "
                    "1) Confirm meta.genesis_hash == 64 zeros; "
                    "2) Recompute each hash: for seq=0, previous_hash should equal genesis_hash, "
                    "for seq>0, previous_hash should equal the previous record's hash; "
                    "3) Check each payload_hash == SHA-256(canonical_json(payload)); "
                    "4) Check whether the last record's hash equals the hash in the anchor record."
                ),
            },
            "records": serialized,
            "anchors": anchors,
            "latest": {
                "seq": latest_seq,
                "hash": latest_hash,
            } if latest_hash else None,
            "anchor_hint": (
                "Publish the latest.hash from this file to a public channel (GitHub, blockchain, "
                "etc.) so auditors can confirm by comparison that this chain has not been "
                "wholesale replaced."
            ),
        }

        # Sign the data block
        data_json = self._canonical_json(
            {"meta": export_package["meta"], "records": export_package["records"]}
        )
        sig = compute_hmac_signature(
            data_json.decode("utf-8"), settings.security.secret_key
        )
        export_package["signature"] = sig

        yield json.dumps(export_package, indent=2, ensure_ascii=False).encode("utf-8")

    async def _stream_csv_enhanced(
        self, chain_id: str, records: list[AuditLog]
    ) -> AsyncGenerator[bytes, None]:
        """Generate the enhanced CSV export (with metadata comment lines)."""
        buf = io.StringIO()
        meta_lines = [
            f"# Audit Export v{EXPORT_VERSION}",
            f"# chain_id: {chain_id}",
            f"# exported_at: {datetime.datetime.now(datetime.timezone.utc).isoformat()}",
            f"# total_records: {len(records)}",
            f"# genesis_hash: {GENESIS_HASH}",
            f"# algorithm: {HASH_ALGORITHM}",
            "",
        ]
        for line in meta_lines:
            buf.write(line + "\n")
            yield buf.getvalue().encode("utf-8")
            buf.seek(0)
            buf.truncate()

        # CSV header row + data rows
        if records:
            writer = csv.writer(buf)
            headers = list(self._serialize_record(records[0]).keys())
            writer.writerow([self._format_header(h) for h in headers])
            yield buf.getvalue().encode("utf-8")
            buf.seek(0)
            buf.truncate()

            for row in records:
                data = self._serialize_record(row)
                writer.writerow([self._format_value(k, v) for k, v in data.items()])
                yield buf.getvalue().encode("utf-8")
                buf.seek(0)
                buf.truncate()

    # Filter-based export (supports the UI Export CSV feature)

    async def stream_by_filter(
        self,
        stmt,
        format_: str = "json",
    ) -> AsyncGenerator[bytes, None]:
        """
        Stream-export audit logs using the given SQLAlchemy Select statement
        (with filter conditions already applied).

        Differences from stream_enhanced:
          - stream_enhanced exports a single chain_id
          - stream_by_filter exports by arbitrary filter conditions
            (cross-chain, cross-user, etc.)

        Args:
            stmt: SELECT statement built by AuditQueryService.build_query()
            format_: export format, "json" or "csv"
        """
        # Execute the query to fetch all matching records (no pagination)
        result = await self.db.execute(stmt)
        records = list(result.scalars().all())

        if format_ == "json":
            async for chunk in self._stream_json_filtered(records):
                yield chunk
        else:
            async for chunk in self._stream_csv_filtered(records):
                yield chunk

    async def _stream_json_filtered(
        self, records: list[AuditLog]
    ) -> AsyncGenerator[bytes, None]:
        """Export in JSON format by filter conditions."""
        serialized = [self._serialize_record(r) for r in records]

        export_package = {
            "meta": {
                "version": EXPORT_VERSION,
                "exported_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "export_type": "filtered",
                "total_records": len(records),
                "genesis_hash": GENESIS_HASH,
                "hash_algorithm": HASH_ALGORITHM,
            },
            "records": serialized,
        }

        # Sign the data block
        data_json = self._canonical_json(
            {"meta": export_package["meta"], "records": export_package["records"]}
        )
        sig = compute_hmac_signature(
            data_json.decode("utf-8"), settings.security.secret_key
        )
        export_package["signature"] = sig

        yield json.dumps(export_package, indent=2, ensure_ascii=False).encode("utf-8")

    async def _stream_csv_filtered(
        self, records: list[AuditLog]
    ) -> AsyncGenerator[bytes, None]:
        """Export in CSV format by filter conditions."""
        buf = io.StringIO()

        # CSV metadata comment lines
        meta_lines = [
            f"# Audit Export v{EXPORT_VERSION} (Filtered)",
            f"# exported_at: {datetime.datetime.now(datetime.timezone.utc).isoformat()}",
            f"# total_records: {len(records)}",
            "# genesis_hash: 0000...0000",
            "",
        ]
        for line in meta_lines:
            buf.write(line + "\n")
            yield buf.getvalue().encode("utf-8")
            buf.seek(0)
            buf.truncate()

        # CSV header row + data rows
        if records:
            writer = csv.writer(buf)
            headers = list(self._serialize_record(records[0]).keys())
            writer.writerow([self._format_header(h) for h in headers])
            yield buf.getvalue().encode("utf-8")
            buf.seek(0)
            buf.truncate()

            for row in records:
                data = self._serialize_record(row)
                writer.writerow([self._format_value(k, v) for k, v in data.items()])
                yield buf.getvalue().encode("utf-8")
                buf.seek(0)
                buf.truncate()

    # Backward-compatible alias
    async def stream(
        self,
        chain_id: str,
        format_: str = "json",
        from_seq: int = 0,
        to_seq: int | None = None,
    ) -> AsyncGenerator[bytes, None]:
        """Stream export (backward-compatible with the old API)."""
        async for chunk in self.stream_enhanced(chain_id, format_, from_seq, to_seq):
            yield chunk
