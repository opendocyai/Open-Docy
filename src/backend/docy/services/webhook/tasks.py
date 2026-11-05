"""Honker delivery task (replacing the legacy Celery tasks/webhook_task.py).

Failure semantics: exceptions are caught by honker and retried with
retries=3 / retry_delay_s=60; when exhausted, the task goes to _honker_dead
(close to the legacy behavior of giving up after 1/2/3 minutes).
"""

import asyncio
import json
import time

import httpx
from loguru import logger

from docy.exceptions.exception import InvalidParameters
from docy.honker_db import db
from docy.services.webhook.url_validator import validate_webhook_url, webhook_url_policy
from docy.services.webhook.utils import WebhookValidator

LOG = logger.bind(category="webhook")

MAX_RESPONSE_SIZE = 1024 * 1024


@db.task(queue="default", retries=3, retry_delay_s=60, store_result=False)
async def deliver_webhook(
    webhook_url: str,
    secret: str,
    payload: dict,
    transport: httpx.AsyncBaseTransport = None,
) -> dict:
    """Push an event to the endpoint registered by the user (with an HMAC signature)."""
    allow_http, allowed_hosts = webhook_url_policy()
    await asyncio.to_thread(
        validate_webhook_url,
        webhook_url,
        allow_http=allow_http,
        allowed_hosts=allowed_hosts,
    )
    payload_str = json.dumps(payload, ensure_ascii=False)
    ts = str(int(time.time()))
    sig = WebhookValidator.compute_signature(payload_str.encode(), ts, secret)
    headers = {
        "Content-Type": "application/json",
        "X-Webhook-Timestamp": ts,
        "X-Webhook-Signature": f"t={ts},v1={sig}",
    }
    async with httpx.AsyncClient(transport=transport, follow_redirects=False) as client:
        req = client.build_request(
            "POST", webhook_url, content=payload_str.encode(), headers=headers
        )
        resp = await client.send(req, stream=True)
        body = b""
        try:
            async for chunk in resp.aiter_bytes():
                body += chunk
                if len(body) > MAX_RESPONSE_SIZE:
                    raise InvalidParameters("Webhook response exceeded the size limit.")
        finally:
            await resp.aclose()
    if 300 <= resp.status_code < 400:
        raise InvalidParameters("Webhook endpoint must not redirect.")
    resp.raise_for_status()
    LOG.info(f"webhook delivered to {webhook_url} (status={resp.status_code})")
    return {"ok": True}
