"""
Core SHA-256 hash chain computation service.

Formula: hash = SHA-256(previous_hash ‖ "||" ‖ chain_id ‖ "||" ‖ seq ‖ "||"
                    ‖ event_time ‖ "||" ‖ payload_hash ‖ "||" ‖ actor_id
                    ‖ "||" ‖ action ‖ "||" ‖ resource_type ‖ "||" ‖ resource_id
                    ‖ "||" ‖ outcome ‖ "||" ‖ user_id ‖ "||" ‖ source_ip
                    ‖ "||" ‖ request_id)

Signature: HMAC-SHA256(hash, secret_key) — signs the chain hash with the
system key so attackers with database write access cannot forge a hash chain.
"""

from __future__ import annotations

import datetime
import hashlib
import hmac
import json
from typing import Any

# Genesis record's previous_hash: 64 zero characters
GENESIS_HASH = "0" * 64
_SEPARATOR = "||"


def canonical_json(data: Any) -> bytes:
    """
    Generate Canonical JSON (deterministic serialization).

    Rules:
    - keys sorted lexicographically (SORT_KEYS)
    - no extra whitespace
    - UTF-8 encoded

    Keep consistent with canonical_json in standalone_verifier.py (both use
    the stdlib json so server-side and offline verification results match).
    """
    return json.dumps(
        data, sort_keys=True, ensure_ascii=False, separators=(",", ":")
    ).encode("utf-8")


def sha256_hex(data: bytes | str) -> str:
    """Compute SHA-256 and return the 64-char hex string."""
    if isinstance(data, str):
        data = data.encode("utf-8")
    return hashlib.sha256(data).hexdigest()


def compute_payload_hash(payload: Any) -> str:
    """Compute the SHA-256 hash of the payload."""
    return sha256_hex(canonical_json(payload))


def compute_chain_hash(
    previous_hash: str,
    chain_id: str,
    seq: int,
    event_time: datetime.datetime,
    payload_hash: str,
    actor_id: str,
    action: str,
    resource_type: str,
    resource_id: str,
    outcome: str,
    user_id: str,
    source_ip: str | None = None,
    request_id: str | None = None,
) -> str:
    """
    Compute the SHA-256 hash of the current record in the audit chain.

    Input concatenation: previous_hash || chain_id || seq || event_time_iso
              || payload_hash || actor_id || action || resource_type || resource_id
              || outcome || user_id || source_ip || request_id
    Separator: "||"
    """
    # Normalize to a UTC naive datetime to eliminate timezone differences;
    # truncate to seconds so writes and verification are reproducible
    if isinstance(event_time, datetime.datetime):
        if event_time.tzinfo is not None and event_time.utcoffset() is not None:
            event_time = event_time.astimezone(datetime.timezone.utc).replace(
                tzinfo=None
            )
        event_time = event_time.replace(microsecond=0)
        time_str = event_time.strftime("%Y-%m-%dT%H:%M:%SZ")
    else:
        time_str = str(event_time)

    hash_input = _SEPARATOR.join(
        [
            previous_hash,
            chain_id,
            str(seq),
            time_str,
            payload_hash,
            actor_id,
            action,
            resource_type,
            resource_id,
            outcome,
            user_id,
            source_ip or "",
            request_id or "",
        ]
    )

    return sha256_hex(hash_input)


def compute_hmac_signature(chain_hash: str, secret_key: str) -> str:
    """
    Sign the chain hash with the system key using HMAC-SHA256.

    Signature = HMAC-SHA256(chain_hash, secret_key)

    Purpose: even if an attacker gains database write access and can construct
             a hash chain, a valid signature cannot be produced without the
             secret_key.
    """
    if isinstance(secret_key, str):
        secret_key = secret_key.encode("utf-8")
    if isinstance(chain_hash, str):
        chain_hash = chain_hash.encode("utf-8")
    return hmac.new(secret_key, chain_hash, hashlib.sha256).hexdigest()


def verify_hmac_signature(chain_hash: str, signature: str, secret_key: str) -> bool:
    """Verify the HMAC signature (constant-time comparison)."""
    expected = compute_hmac_signature(chain_hash, secret_key)
    return hmac.compare_digest(expected, signature)
