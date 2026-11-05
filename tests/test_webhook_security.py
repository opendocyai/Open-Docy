"""Webhook endpoint SSRF validation tests (handoff doc P0-4a acceptance cases)."""

from types import SimpleNamespace

import httpx
import pytest

from docy.exceptions.exception import InvalidParameters
from docy.services.webhook.tasks import deliver_webhook
from docy.services.webhook.url_validator import validate_webhook_url

PUBLIC_IP = "93.184.216.34"


def _resolver(*addresses: str):
    def resolve(host, port, type=None):
        return [(2, 1, 6, "", (addr, 0)) for addr in addresses]

    return resolve


@pytest.mark.parametrize(
    "url",
    [
        "http://127.0.0.1/hook",
        "http://169.254.169.254/latest/meta-data",
        "http://10.0.0.8/hook",
        "http://192.168.1.1/hook",
        "http://[::1]/hook",
        "http://[fe80::1]/hook",
        "ftp://example.com/hook",
        "file:///etc/passwd",
        "https://user:pass@example.com/hook",
    ],
)
def test_rejects_blocked_urls(url):
    with pytest.raises(InvalidParameters):
        validate_webhook_url(url, resolver=_resolver(PUBLIC_IP))


def test_rejects_hostname_resolving_to_private():
    with pytest.raises(InvalidParameters):
        validate_webhook_url(
            "https://internal.example.com/hook", resolver=_resolver("10.0.0.8")
        )


def test_rejects_hostname_with_any_private_address():
    with pytest.raises(InvalidParameters):
        validate_webhook_url(
            "https://dual.example.com/hook",
            resolver=_resolver(PUBLIC_IP, "192.168.0.1"),
        )


def test_rejects_unresolvable_host():
    def failing_resolver(host, port, type=None):
        raise OSError("no such host")

    with pytest.raises(InvalidParameters):
        validate_webhook_url("https://nope.example/hook", resolver=failing_resolver)


def test_rejects_http_by_default():
    with pytest.raises(InvalidParameters):
        validate_webhook_url("http://public.example/hook", resolver=_resolver(PUBLIC_IP))


def test_accepts_https_public_target():
    validate_webhook_url("https://example.com/hook", resolver=_resolver(PUBLIC_IP))


def test_allow_http_accepts_http_public_but_rejects_private():
    validate_webhook_url(
        "http://public.example/hook", allow_http=True, resolver=_resolver(PUBLIC_IP)
    )
    with pytest.raises(InvalidParameters):
        validate_webhook_url(
            "http://10.0.0.8/hook", allow_http=True, resolver=_resolver("10.0.0.8")
        )


def test_allowed_hosts_bypasses_private_and_http_for_exact_host():
    validate_webhook_url(
        "http://internal.example.com/hook",
        allowed_hosts=frozenset({"internal.example.com"}),
        resolver=_resolver("10.0.0.5"),
    )
    with pytest.raises(InvalidParameters):
        validate_webhook_url(
            "http://other.example.com/hook",
            allowed_hosts=frozenset({"internal.example.com"}),
            resolver=_resolver("10.0.0.5"),
        )


async def test_delivery_rejects_redirect():
    async def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(302, headers={"Location": "http://127.0.0.1/hook"})

    with pytest.raises(InvalidParameters):
        await deliver_webhook.fn(
            "https://example.com/hook",
            "whsec_test",
            {"event": "task.done"},
            transport=httpx.MockTransport(handler),
        )


async def test_delivery_rejects_oversized_response():
    async def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(200, content=b"x" * (1024 * 1024 + 1))

    with pytest.raises(InvalidParameters):
        await deliver_webhook.fn(
            "https://example.com/hook",
            "whsec_test",
            {"event": "task.done"},
            transport=httpx.MockTransport(handler),
        )


async def test_delivery_success_sends_signature_headers():
    seen = {}

    async def handler(request: httpx.Request) -> httpx.Response:
        seen["url"] = str(request.url)
        seen["timestamp"] = request.headers.get("X-Webhook-Timestamp")
        seen["signature"] = request.headers.get("X-Webhook-Signature")
        return httpx.Response(200, content=b"ok")

    result = await deliver_webhook.fn(
        "https://example.com/hook",
        "whsec_test",
        {"event": "task.done"},
        transport=httpx.MockTransport(handler),
    )
    assert result == {"ok": True}
    assert seen["url"] == "https://example.com/hook"
    assert seen["timestamp"]
    assert seen["signature"].startswith("t=")


async def test_delivery_revalidates_url_at_send_time():
    sent = []

    async def handler(request: httpx.Request) -> httpx.Response:
        sent.append(request)
        return httpx.Response(200)

    with pytest.raises(InvalidParameters):
        await deliver_webhook.fn(
            "http://127.0.0.1/hook",
            "whsec_test",
            {"event": "task.done"},
            transport=httpx.MockTransport(handler),
        )
    assert not sent


def _fake_validate(url, **kw):
    if "127.0.0.1" in url:
        raise InvalidParameters("blocked")


async def test_manager_rejects_loopback_endpoint(db, monkeypatch):
    from docy.services.webhook.manager import WebhookManager

    monkeypatch.setattr("docy.services.webhook.manager.validate_webhook_url", _fake_validate)
    request = SimpleNamespace(user=SimpleNamespace(id="u1"))
    manager = WebhookManager(db=db, request=request)
    with pytest.raises(InvalidParameters):
        await manager.create_webhook("http://127.0.0.1/hook")
