"""Webhook signature validation."""

import hashlib
import hmac
import time


class WebhookValidator:
    """
    Responsible for webhook signature validation.
    """

    @staticmethod
    def verify_signature(payload: bytes, signature_header: str, secret: str) -> bool:
        """
        Verify the webhook signature.
        Args:
            payload: Raw bytes of the request body
            signature_header: Signature header, format t=timestamp,v1=signature
        Returns:
            Whether the verification passed
        """
        try:
            signature_data = WebhookValidator.parse_signature_header(signature_header)
            if not signature_data:
                return False

            timestamp = signature_data.get("t")
            received_signature = signature_data.get("v1")
            if not timestamp or not received_signature:
                return False

            # Validate the timestamp
            if not WebhookValidator.validate_timestamp(timestamp):
                return False

            # Compute the expected signature
            expected_signature = WebhookValidator.compute_signature(payload, timestamp, secret)

            # Compare the signatures safely
            return hmac.compare_digest(expected_signature, received_signature)

        except Exception as e:
            print(f"Webhook signature verification error: {str(e)}")
            return False

    @staticmethod
    def parse_signature_header(signature_header):
        """
        Parse the signature header.
        """
        try:
            # Format: t=timestamp,v1=signature
            parts = signature_header.split(",")
            result = {}
            for part in parts:
                if "=" in part:
                    key, value = part.split("=", 1)
                    result[key.strip()] = value.strip()
            return result
        except Exception:
            return {}

    @staticmethod
    def compute_signature(payload: bytes, timestamp: str, secret: str) -> str:
        """
        Compute the signature.
        Args:
            payload: Raw bytes of the request body
            timestamp: Timestamp string
            secret: Secret used for signing

        Returns:
            HMAC-SHA256 signature
        """
        payload_str = payload.decode("utf-8")
        signed_payload = f"{timestamp}.{payload_str}"

        # Compute the HMAC with the stored signing secret
        return hmac.new(
            secret.encode("utf-8"),
            signed_payload.encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()

    @staticmethod
    def validate_timestamp(timestamp: str) -> bool:
        """Validate the timestamp (5-minute tolerance)."""
        try:
            request_time = int(timestamp)
            current_time = int(time.time())
            # 5-minute tolerance window
            return abs(current_time - request_time) <= 300
        except ValueError:
            return False
