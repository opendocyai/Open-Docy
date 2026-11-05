"""Audit log tables: audit_log / audit_anchor (append-only hash chain)."""

import datetime

from sqlalchemy import (
    BIGINT,
    JSON,
    Column,
    Index,
    String,
    Text,
    UniqueConstraint,
    func,
)

from docy.bases.base_model import Base
from docy.core.fields import UTCDateTime


class AuditLog(Base):
    """Audit log: INSERT only; UPDATE / DELETE are forbidden."""

    __tablename__ = "audit_log"

    chain_id = Column(String(64), nullable=False, comment="Chain ID")
    seq = Column(BIGINT, nullable=False, comment="Log sequence number")
    previous_hash = Column(String(64), nullable=False, comment="Hash of the previous entry")
    hash = Column(String(64), nullable=False, comment="SHA256")
    event_time = Column(
        UTCDateTime, server_default=func.now(), nullable=False, comment="UTC time"
    )
    trusted_timestamp = Column(Text, nullable=True, comment="Trusted timestamp")
    user_id = Column(String(64), nullable=False, comment="User ID")
    space_id = Column(
        String(64), nullable=False, default="", comment="Workspace ID for data isolation"
    )
    actor_id = Column(String(64), nullable=False, comment="Actor ID")
    actor_type = Column(String(20), nullable=False, comment="Actor type")
    resource_type = Column(String(30), nullable=False, comment="Resource type")
    resource_id = Column(String(64), nullable=False, comment="Resource ID")
    action = Column(String(30), nullable=False, comment="Action verb")
    outcome = Column(String(20), nullable=False, comment="Outcome: success/failure")
    source_ip = Column(String(45), nullable=True, comment="Source IP")
    request_id = Column(String(36), nullable=True, comment="Request ID")
    payload = Column(JSON, nullable=False, comment="Custom payload")
    payload_hash = Column(String(64), nullable=False, comment="SHA256")
    signature = Column(
        String(128), nullable=True, comment="HMAC-SHA256(chain_hash, secret_key)"
    )

    __table_args__ = (
        UniqueConstraint("chain_id", "seq", name="uk_chain_seq"),
        Index("idx_audit_chain", "chain_id", "seq"),
        Index("idx_audit_time", "event_time"),
        Index("idx_audit_user", "user_id"),
        Index("idx_audit_resource", "resource_type", "resource_id"),
    )


class AuditAnchor(Base):
    """Audit chain anchor: records the latest chain hash at a point in time for public time proof."""

    __tablename__ = "audit_anchor"

    chain_id = Column(String(64), nullable=False, comment="Chain ID")
    seq = Column(BIGINT, nullable=False, comment="Max seq at anchor time")
    hash = Column(String(64), nullable=False, comment="Chain hash at that seq")

    __table_args__ = (
        UniqueConstraint("chain_id", "seq", name="uk_anchor_chain_seq"),
        Index("idx_anchor_chain", "chain_id", "seq"),
    )
