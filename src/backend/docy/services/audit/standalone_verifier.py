#!/usr/bin/env python3
"""
Audit chain offline verification script (standalone_verifier.py)

Runs standalone with no project dependencies. Uses only the Python standard
library.

Usage:
    python standalone_verifier.py audit_chain.json

    Or export first:
    1. Export the audit chain from the system:
       GET /api/v1/audit/export/{chain_id}?format=json
    2. Save it to a file, e.g. audit_chain_id_xxx.json
    3. Run: python standalone_verifier.py audit_chain_id_xxx.json

Output:
    ✅ All records passed verification
    or
    ❌ N anomalies found, details below...
"""

from __future__ import annotations

import datetime
import hashlib
import json
import sys
from typing import Any


def sha256_hex(data: bytes | str) -> str:
    """Compute SHA-256 and return the hex string."""
    if isinstance(data, str):
        data = data.encode("utf-8")
    return hashlib.sha256(data).hexdigest()


def canonical_json(obj: Any) -> bytes:
    """Deterministic JSON serialization (consistent with hash_service.py)."""
    return json.dumps(
        obj, sort_keys=True, ensure_ascii=False, separators=(",", ":")
    ).encode("utf-8")


def compute_payload_hash(payload: Any) -> str:
    """Compute the SHA-256 hash of the payload."""
    return sha256_hex(canonical_json(payload))


def _normalize_event_time(event_time: str) -> str:
    """
    Normalize the ISO time string from the export file into the same format
    used by hash_service.py: UTC naive + microseconds truncated + "Z" suffix
    (e.g. "2026-09-18T20:44:12Z").

    The event_time in the export file may carry a "+00:00" offset or
    microseconds, so it must be normalized before the recomputed hash can
    match the one stored at write time.
    """
    if not event_time:
        return event_time
    try:
        dt = datetime.datetime.fromisoformat(event_time.replace("Z", "+00:00"))
    except ValueError:
        return event_time
    if dt.tzinfo is not None:
        dt = dt.astimezone(datetime.timezone.utc).replace(tzinfo=None)
    return dt.replace(microsecond=0).strftime("%Y-%m-%dT%H:%M:%SZ")


def compute_chain_hash(
    previous_hash: str,
    chain_id: str,
    seq: int,
    event_time: str,  # ISO format string
    payload_hash: str,
    actor_id: str,
    action: str,
    resource_type: str,
    resource_id: str,
    outcome: str,
    user_id: str,
    source_ip: str = "",
    request_id: str = "",
) -> str:
    """
    Compute the chain hash — fully consistent with the system's
    hash_service.py.
    Separator: "||"
    Order: previous_hash || chain_id || seq || event_time || payload_hash
          || actor_id || action || resource_type || resource_id
          || outcome || user_id || source_ip || request_id
    """
    SEP = "||"
    hash_input = SEP.join(
        [
            previous_hash,
            chain_id,
            str(seq),
            _normalize_event_time(event_time),
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


def verify_export_file(filepath: str) -> dict:
    """
    Verify an exported audit chain file.

    Returns:
        {
            "valid": True/False,
            "total": int,
            "errors": [...],
            "chain_id": str,
        }
    """
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    meta = data.get("meta", {})
    records = data.get("records", [])
    export_sig = data.get("signature")

    chain_id = meta.get("chain_id", "unknown")
    genesis_hash = meta.get("genesis_hash", "0" * 64)
    total = len(records)

    errors: list[dict] = []
    expected_prev = genesis_hash

    # Verify the export signature if present (needs the secret key; can be skipped)
    if export_sig:
        print(
            f"  ℹ️  Export file contains an HMAC signature "
            f"(requires the system key to verify; skipping)"
        )

    for i, rec in enumerate(records):
        seq = rec.get("seq")
        prev = rec.get("previous_hash", "")
        stored_hash = rec.get("hash", "")
        payload = rec.get("payload", {})
        stored_ph = rec.get("payload_hash", "")

        # Check 1: previous hash
        if prev != expected_prev:
            errors.append(
                {
                    "seq": seq,
                    "index": i,
                    "type": "broken_chain",
                    "detail": f"expected previous_hash={expected_prev[:16]}..., got {prev[:16]}...",
                }
            )

        # Check 2: payload hash
        expected_ph = compute_payload_hash(payload)
        if stored_ph != expected_ph:
            errors.append(
                {
                    "seq": seq,
                    "index": i,
                    "type": "payload_tampered",
                    "detail": f"expected payload_hash={expected_ph[:16]}..., got {stored_ph[:16]}...",
                }
            )

        # Check 3: chain hash
        event_time = rec.get("event_time", "")
        expected_hash = compute_chain_hash(
            previous_hash=prev,
            chain_id=rec.get("chain_id", chain_id),
            seq=seq,
            event_time=event_time,
            payload_hash=stored_ph,
            actor_id=rec.get("actor_id", ""),
            action=rec.get("action", ""),
            resource_type=rec.get("resource_type", ""),
            resource_id=rec.get("resource_id", ""),
            outcome=rec.get("outcome", ""),
            user_id=rec.get("user_id", ""),
            source_ip=rec.get("source_ip", ""),
            request_id=rec.get("request_id", ""),
        )
        if stored_hash != expected_hash:
            errors.append(
                {
                    "seq": seq,
                    "index": i,
                    "type": "hash_mismatch",
                    "detail": f"expected hash={expected_hash[:16]}..., got {stored_hash[:16]}...",
                }
            )

        expected_prev = stored_hash

    return {
        "valid": len(errors) == 0,
        "total": total,
        "errors": errors,
        "chain_id": chain_id,
        "latest_hash": records[-1]["hash"] if records else None,
        "latest_seq": records[-1]["seq"] if records else None,
    }


def main():
    if len(sys.argv) < 2:
        print(
            "Usage: python standalone_verifier.py <export_file.json> [--compare <anchor hash>]"
        )
        print("")
        print("Examples:")
        print("  python standalone_verifier.py audit_chain.json")
        print("  python standalone_verifier.py audit_chain.json --compare abc123...")
        sys.exit(1)

    filepath = sys.argv[1]

    # Parse the --compare argument
    compare_hash = None
    for i, arg in enumerate(sys.argv):
        if arg == "--compare" and i + 1 < len(sys.argv):
            compare_hash = sys.argv[i + 1]
            break

    print(f"🔍 Verifying audit chain file: {filepath}")
    print("=" * 60)

    try:
        result = verify_export_file(filepath)
    except FileNotFoundError:
        print(f"❌ File not found: {filepath}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"❌ JSON parse error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Verification failed: {e}")
        sys.exit(1)

    print(f"  Chain ID:      {result['chain_id']}")
    print(f"  Total records: {result['total']}")
    print()

    if result["valid"]:
        print(
            "✅ All records passed verification — the hash chain is intact "
            "and untampered."
        )
    else:
        print(f"❌ Found {len(result['errors'])} anomalies:")
        print("-" * 60)
        for err in result["errors"]:
            print(f"  seq={err['seq']:>4}  [{err['type']}] {err['detail']}")
        print()
        print(
            "⚠️  Audit chain integrity verification failed — possible tampering."
        )
        sys.exit(2)

    # Anchor comparison
    if result["latest_hash"]:
        print()
        print(f"  📌 Latest record hash: {result['latest_hash']}")
        print(f"     seq:               {result['latest_seq']}")
        print()

        if compare_hash:
            if result["latest_hash"] == compare_hash:
                print("✅ Anchor comparison passed — current chain hash matches the public anchor.")
            else:
                print("❌ Anchor comparison failed!")
                print(f"   Current chain hash: {result['latest_hash']}")
                print(f"   Public anchor:      {compare_hash}")
                print()
                print("⚠️  The chain may have been replaced entirely!")
                sys.exit(3)
        else:
            print("💡 Timestamp proof tip:")
            print(
                f"   To prove this chain existed before a certain time, publish the latest hash to a public channel."
            )
            print(f"   Then compare using the --compare <anchor hash> argument.")
            print(
                f"   Example: python standalone_verifier.py audit.json --compare {result['latest_hash'][:16]}..."
            )
    else:
        print()
        print("   (no records")

    print()
    print("💡 Notes:")
    print("  - This script only verifies hash chain integrity, not the HMAC")
    print("    signature (verifying the signature requires the system key).")
    print("  - For the highest level of assurance, anchor the chain hash to a")
    print("    blockchain.")
    print("  - Anchor check: verify the last record's hash equals the public")
    print("    anchor value.")

    if result["total"] > 0:
        print()
        print(f"  📌 Latest record hash (publishable as an anchor):")
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
        last_rec = data["records"][-1]
        print(f"     chain_id: {last_rec['chain_id']}")
        print(f"     seq:      {last_rec['seq']}")
        print(f"     hash:     {last_rec['hash']}")


if __name__ == "__main__":
    main()
