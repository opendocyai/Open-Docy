"""SSRF-safe webhook endpoint validation.

The endpoint is validated on create/update and again at send time (TOCTOU):
https is required (http only when explicitly allowed), URLs must not embed
credentials, and the host must not resolve to private, loopback, link-local,
multicast, reserved or unspecified address space (IPv4 and IPv6). An optional
allowed-hosts policy (settings.ini [DEFAULT] webhook_allowed_hosts) bypasses
the private-range block for exact hostname matches and permits http for those
hosts; it is off by default.
"""

import ipaddress
import socket
import urllib.parse
from configparser import NoOptionError, NoSectionError
from typing import Callable, Iterable, Optional

from docy.core.settings import project_settings
from docy.exceptions.exception import InvalidParameters

Resolver = Callable[..., Iterable]


def _is_blocked_address(ip: ipaddress.IPv4Address | ipaddress.IPv6Address) -> bool:
    return (
        ip.is_private
        or ip.is_loopback
        or ip.is_link_local
        or ip.is_multicast
        or ip.is_reserved
        or ip.is_unspecified
    )


def _parse_ip_literal(host: str) -> Optional[ipaddress.IPv4Address | ipaddress.IPv6Address]:
    try:
        return ipaddress.ip_address(host)
    except ValueError:
        return None


def validate_webhook_url(
    url: str,
    *,
    allow_http: bool = False,
    allowed_hosts: Optional[frozenset[str]] = None,
    resolver: Resolver = socket.getaddrinfo,
) -> None:
    """Raise InvalidParameters unless the URL is an externally-safe http(s) target."""
    try:
        parsed = urllib.parse.urlsplit(url)
    except ValueError:
        raise InvalidParameters("Webhook endpoint is not a valid URL.") from None

    if parsed.scheme not in ("http", "https"):
        raise InvalidParameters("Webhook endpoint scheme must be http or https.")
    if parsed.username or parsed.password:
        raise InvalidParameters("Webhook endpoint must not embed credentials.")
    host = parsed.hostname
    if not host:
        raise InvalidParameters("Webhook endpoint must include a host.")

    hosts = allowed_hosts or frozenset()
    host_allowed = host in hosts

    if parsed.scheme == "http" and not (allow_http or host_allowed):
        raise InvalidParameters("Webhook endpoint must use https (http is not enabled).")

    ip = _parse_ip_literal(host)
    if ip is not None:
        if _is_blocked_address(ip) and not host_allowed:
            raise InvalidParameters("Webhook endpoint must not target a private or reserved address.")
        return

    if host_allowed:
        return

    try:
        resolved = resolver(host, None, type=socket.SOCK_STREAM)
    except OSError:
        raise InvalidParameters("Webhook endpoint host could not be resolved.") from None

    addresses = {entry[4][0] for entry in resolved}
    if not addresses:
        raise InvalidParameters("Webhook endpoint host could not be resolved.")
    for addr in addresses:
        addr_ip = _parse_ip_literal(addr)
        if addr_ip is None:
            continue
        if _is_blocked_address(addr_ip):
            raise InvalidParameters(
                "Webhook endpoint must not target a private or reserved address."
            )


def webhook_url_policy() -> tuple[bool, frozenset[str]]:
    """Read the webhook URL policy from settings, tolerating missing keys."""
    try:
        raw_http = str(project_settings.default.webhook_allow_http).strip().lower()
    except (NoOptionError, NoSectionError, AttributeError):
        raw_http = "false"
    try:
        raw_hosts = str(project_settings.default.webhook_allowed_hosts)
    except (NoOptionError, NoSectionError, AttributeError):
        raw_hosts = ""
    allow_http = raw_http in ("true", "1", "yes", "on")
    allowed_hosts = frozenset(
        host.strip().lower() for host in raw_hosts.split(",") if host.strip()
    )
    return allow_http, allowed_hosts
