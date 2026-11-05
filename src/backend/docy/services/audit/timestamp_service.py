"""RFC 3161 trusted timestamp service.

Obtains cryptographically trusted timestamps for audit records, proving a
record existed before a certain point in time.
Use cases:
  1. Compliance — proves logs were not backdated/tampered
  2. Legal evidence — timestamps carry legal weight

Supported TSAs:
  - freeTSA.org (free, no rate limits)
  - digicert (commercial)
"""

from __future__ import annotations

from loguru import logger

# Default TSA URL (configurable)
_DEFAULT_TSA_URL = "https://freetsa.org/tsr"


async def fetch_timestamp(chain_hash: str, tsa_url: str | None = None) -> str | None:
    """
    Fetch a trusted timestamp token from an RFC 3161 TSA.

    Args:
        chain_hash: SHA-256 hash of the audit chain record (64-char hex string)
        tsa_url: TSA endpoint URL; defaults to freeTSA.org

    Returns:
        the Base64-encoded timestamp response token (RFC 3161 TimeStampResp),
        or None on failure (timestamps are an enhancement and must not block
        the main flow)
    """
    import struct
    import httpx
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.serialization import Encoding
    from cryptography.x509 import load_der_x509_certificate

    url = tsa_url or _DEFAULT_TSA_URL

    try:
        # Build the RFC 3161 TimeStampReq
        # Simplified implementation: send the SHA-256 digest
        message_digest = bytes.fromhex(chain_hash)

        # Build the nonce (32-bit random value)
        import os
        nonce = os.urandom(4)  # 4 bytes = 32-bit integer
        nonce_int = int.from_bytes(nonce, 'big')

        # ASN.1-encoded TimeStampReq
        ts_request = _build_timestamp_request(message_digest, nonce_int)

        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                url,
                content=ts_request,
                headers={"Content-Type": "application/timestamp-query"},
            )

        if response.status_code == 200:
            # Return the Base64-encoded response
            import base64
            token = base64.b64encode(response.content).decode("ascii")
            logger.info(
                f"timestamp_obtained tsa_url={url} token_length={len(token)}"
            )
            return token
        else:
            logger.warning(
                f"timestamp_failed tsa_url={url} status={response.status_code}"
            )
            return None

    except Exception as e:
        logger.warning(f"timestamp_error error={e}")
        return None


def _build_timestamp_request(message_digest: bytes, nonce: int) -> bytes:
    """
    Build the ASN.1 DER encoding of an RFC 3161 TimeStampReq.

    TimeStampReq ::= SEQUENCE {
        version         INTEGER { v1(1) },
        messageImprint  MessageImprint,
          -- MessageImprint ::= SEQUENCE {
          --     hashAlgorithm AlgorithmIdentifier,
          --     hashedMessage OCTET STRING
          -- }
        reqPolicy       TSAPolicyId OPTIONAL,
        nonce           INTEGER OPTIONAL,
        certReq         BOOLEAN DEFAULT FALSE,
        extensions      [0] IMPLICIT Extensions OPTIONAL
    }

    Simplified implementation using hardcoded ASN.1 DER encoding.
    """
    def _length_bytes(val: int) -> bytes:
        """DER length encoding"""
        if val < 128:
            return bytes([val])
        else:
            enc = val.to_bytes((val.bit_length() + 7) // 8, 'big')
            return bytes([0x80 | len(enc)]) + enc

    def _integer(val: int) -> bytes:
        """DER INTEGER encoding (supports non-negative integers)"""
        if val == 0:
            return b'\x02\x01\x00'
        val_bytes = val.to_bytes((val.bit_length() + 7) // 8, 'big')
        # If the highest bit is 1, prefix with 0x00
        if val_bytes[0] & 0x80:
            val_bytes = b'\x00' + val_bytes
        return b'\x02' + _length_bytes(len(val_bytes)) + val_bytes

    # SHA-256 OID: 2.16.840.1.101.3.4.2.1
    sha256_oid = bytes([0x30, 0x0d, 0x06, 0x09, 0x60, 0x86, 0x48, 0x01,
                        0x65, 0x03, 0x04, 0x02, 0x01, 0x05, 0x00])

    # AlgorithmIdentifier = SEQUENCE { algorithm OID, parameters NULL }
    algorithm_id = sha256_oid

    # MessageImprint = SEQUENCE { hashAlgorithm, hashedMessage }
    hashed_message = b'\x04' + _length_bytes(len(message_digest)) + message_digest
    message_imprint = b'\x30' + _length_bytes(len(algorithm_id) + len(hashed_message))
    message_imprint += algorithm_id + hashed_message

    # version (INTEGER 1)
    version = b'\x02\x01\x01'

    # nonce
    nonce_enc = _integer(nonce)

    # certReq (BOOLEAN TRUE)
    cert_req = b'\x01\x01\xff'

    # TimeStampReq
    ts_req_content = version + message_imprint + nonce_enc + cert_req
    ts_req = b'\x30' + _length_bytes(len(ts_req_content)) + ts_req_content

    return ts_req
