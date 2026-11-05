"""Webhook model: pushes task status/results to a user-registered endpoint."""

import enum
import hashlib
import hmac
import secrets
import time
from typing import Optional

from sqlalchemy import Column, Enum, Index, Integer, String

from docy.bases.base_model import Base
from docy.core.fields import UTCDateTime


class WebhookStatus(enum.Enum):
    active = "ACTIVE"
    inactive = "INACTIVE"


class Webhooks(Base):
    __tablename__ = "webhooks"
    endpoint: str = Column(String(300), nullable=False, comment="Endpoint registered by the user for task status/result push.")
    signature: str = Column(
        String(500),
        nullable=False,
        default=lambda: f"whsec_{secrets.token_urlsafe(32)}",
        comment="Random verification signature generated when creating the webhook",
    )
    creator: str = Column(String(64), nullable=False, comment="ID of the user who created the webhook")
    status: WebhookStatus = Column(
        Enum(WebhookStatus), nullable=False, default=WebhookStatus.active, comment="Whether enabled"
    )
    max_retries: int = Column(Integer, nullable=False, default=3, comment="Max retry count")
    last_triggered_at: Optional[UTCDateTime] = Column(UTCDateTime, default=None, nullable=True)
    description: Optional[str] = Column(String(500), default=None, nullable=True, comment="Webhook description")

    __table_args__ = (
        Index("idx_webhooks_creator", "creator"),
        Index("idx_webhooks_status", "status"),
        Index("idx_webhooks_endpoint", "endpoint"),
    )

    def __repr__(self):
        return (
            f"<Webhook(id={self.id}, endpoint={self.endpoint}, creator={self.creator})>"
        )

    @staticmethod
    def _generate_secret_key() -> str:
        """Generate a random signature key."""
        return f"whsec_{secrets.token_urlsafe(32)}"

    def verify_signature(self, payload: bytes, signature_header: str) -> bool:
        """
        Verify the webhook signature.

        Args:
            payload: raw bytes of the request body
            signature_header: signature header, format: t=timestamp,v1=signature

        Returns:
            whether verification passed
        """
        try:
            signature_data = self._parse_signature_header(signature_header)
            if not signature_data:
                return False

            timestamp = signature_data.get("t")
            received_signature = signature_data.get("v1")
            if not timestamp or not received_signature:
                return False

            expected_signature = self._compute_signature(payload, timestamp)

            return hmac.compare_digest(expected_signature, received_signature)
        except Exception as e:
            print(f"Webhook signature verification error: {str(e)}")
            return False

    def _parse_signature_header(self, signature_header: str) -> dict:
        """Parse the signature header."""
        try:
            parts = signature_header.split(",")
            result = {}
            for part in parts:
                if "=" in part:
                    key, value = part.split("=", 1)
                    result[key.strip()] = value.strip()
            return result
        except Exception:
            return {}

    def _validate_timestamp(self, timestamp: str) -> bool:
        """Validate timestamp freshness (5-minute tolerance)."""
        try:
            request_time = int(timestamp)
            current_time = int(time.time())
            return abs(current_time - request_time) <= 300
        except ValueError:
            return False

    def _compute_signature(self, payload: bytes, timestamp: str) -> str:
        """
        Compute the expected signature.

        Args:
            payload: raw request body bytes
            timestamp: timestamp string

        Returns:
            HMAC-SHA256 signature
        """
        payload_str = payload.decode("utf-8")
        signed_payload = f"{timestamp}.{payload_str}"

        return hmac.new(
            self.signature.encode("utf-8"),
            signed_payload.encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()

    def rotate_secret(self) -> str:
        """Rotate the signature key."""
        self.signature = self._generate_secret_key()
        return self.signature
