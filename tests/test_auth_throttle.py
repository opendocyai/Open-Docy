"""Login throttling tests (handoff doc P0-4b acceptance cases)."""

import time

from diskcache import Cache

from docy.services.auth.login_throttle import (
    BASE_LOCK_S,
    MAX_FAILURES,
    LoginThrottle,
    get_login_throttle,
)


def _throttle(tmp_path):
    return LoginThrottle(Cache(str(tmp_path)))


def test_five_failures_lock_account(tmp_path):
    t = _throttle(tmp_path)
    for _ in range(MAX_FAILURES - 1):
        t.record_failure("alice@example.com", "1.2.3.4")
        assert t.check_locked("alice@example.com", "1.2.3.4") == 0
    t.record_failure("alice@example.com", "1.2.3.4")
    remaining = t.check_locked("alice@example.com", "9.9.9.9")
    assert 0 < remaining <= BASE_LOCK_S


def test_ip_lock_blocks_other_accounts(tmp_path):
    t = _throttle(tmp_path)
    for _ in range(MAX_FAILURES):
        t.record_failure("alice@example.com", "1.2.3.4")
    assert t.check_locked("bob@example.com", "1.2.3.4") > 0


def test_account_lock_blocks_other_ips(tmp_path):
    t = _throttle(tmp_path)
    for _ in range(MAX_FAILURES):
        t.record_failure("alice@example.com", "1.2.3.4")
    assert t.check_locked("alice@example.com", "9.9.9.9") > 0


def test_success_resets_both_keys(tmp_path):
    t = _throttle(tmp_path)
    for _ in range(MAX_FAILURES - 1):
        t.record_failure("alice@example.com", "1.2.3.4")
    assert t.check_locked("alice@example.com", "1.2.3.4") == 0
    t.record_success("alice@example.com", "1.2.3.4")
    for _ in range(MAX_FAILURES - 1):
        t.record_failure("alice@example.com", "1.2.3.4")
        assert t.check_locked("alice@example.com", "1.2.3.4") == 0


def _expire_locks(t, account, ip):
    for key in ("login_throttle:acct:" + account, "login_throttle:ip:" + ip):
        state = t._cache.get(key)
        state["locked_until"] = time.time() - 1
        t._cache.set(key, state)


def test_consecutive_lockouts_double(tmp_path):
    t = _throttle(tmp_path)
    first_remaining = None
    for round_no in range(3):
        for _ in range(MAX_FAILURES):
            t.record_failure("alice@example.com", "1.2.3.4")
        remaining = t.check_locked("alice@example.com", "1.2.3.4")
        if first_remaining is None:
            first_remaining = remaining
        if round_no < 2:
            _expire_locks(t, "alice@example.com", "1.2.3.4")
    assert t.check_locked("alice@example.com", "1.2.3.4") > first_remaining * 1.5


def test_failures_outside_window_do_not_lock(tmp_path):
    t = _throttle(tmp_path)
    for _ in range(MAX_FAILURES):
        t.record_failure("alice@example.com", "1.2.3.4")
    state = t._cache.get("login_throttle:acct:alice@example.com")
    state["failures"] = [time.time() - 3600] * (MAX_FAILURES - 1)
    state["locked_until"] = 0.0
    t._cache.set("login_throttle:acct:alice@example.com", state)
    state = t._cache.get("login_throttle:ip:1.2.3.4")
    state["failures"] = [time.time() - 3600] * (MAX_FAILURES - 1)
    state["locked_until"] = 0.0
    t._cache.set("login_throttle:ip:1.2.3.4", state)
    t.record_failure("alice@example.com", "1.2.3.4")
    assert t.check_locked("alice@example.com", "1.2.3.4") == 0


def test_get_login_throttle_injectable(tmp_path):
    t = get_login_throttle(Cache(str(tmp_path)))
    assert isinstance(t, LoginThrottle)
    for _ in range(MAX_FAILURES):
        t.record_failure("x@example.com", "1.1.1.1")
    assert t.check_locked("x@example.com", "1.1.1.1") > 0
