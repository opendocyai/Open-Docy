"""Per-account and per-IP login throttling backed by diskcache.

Policy: 5 failed attempts within 15 minutes lock the key for 15 minutes;
each consecutive lockout doubles the lock duration up to a 24-hour cap.
A successful login resets both keys.
"""

import time
from pathlib import Path
from typing import Optional

from diskcache import Cache

MAX_FAILURES = 5
FAILURE_WINDOW_S = 15 * 60
BASE_LOCK_S = 15 * 60
MAX_LOCK_S = 24 * 3600

ACCT_PREFIX = "login_throttle:acct:"
IP_PREFIX = "login_throttle:ip:"


def _default_cache() -> Cache:
    path = Path(__file__).parent.parent.parent / "storage" / "cache" / "login_throttle"
    path.mkdir(parents=True, exist_ok=True)
    return Cache(str(path))


class LoginThrottle:
    def __init__(self, cache: Optional[Cache] = None):
        self._cache = cache if cache is not None else _default_cache()

    @staticmethod
    def _keys(account: str, ip: str) -> tuple[str, str]:
        return ACCT_PREFIX + account, IP_PREFIX + ip

    def _state(self, key: str) -> dict:
        state = self._cache.get(key)
        return state or {"failures": [], "lockouts": 0, "locked_until": 0.0}

    def check_locked(self, account: str, ip: str) -> float:
        """Return remaining lock seconds (>0 = locked), 0 if not locked."""
        remaining = 0.0
        for key in self._keys(account, ip):
            state = self._state(key)
            left = float(state.get("locked_until", 0.0)) - time.time()
            remaining = max(remaining, left)
        return remaining

    def record_failure(self, account: str, ip: str) -> None:
        now = time.time()
        for key in self._keys(account, ip):
            state = self._state(key)
            state["failures"] = [
                ts for ts in state.get("failures", []) if now - ts < FAILURE_WINDOW_S
            ]
            state["failures"].append(now)
            if len(state["failures"]) >= MAX_FAILURES:
                state["lockouts"] = int(state.get("lockouts", 0)) + 1
                state["locked_until"] = now + min(
                    BASE_LOCK_S * (2 ** (state["lockouts"] - 1)), MAX_LOCK_S
                )
                state["failures"] = []
            self._cache.set(key, state, expire=MAX_LOCK_S + 3600)

    def record_success(self, account: str, ip: str) -> None:
        for key in self._keys(account, ip):
            self._cache.delete(key)


_throttle: Optional[LoginThrottle] = None


def get_login_throttle(cache: Optional[Cache] = None) -> LoginThrottle:
    """Shared instance; pass a cache to build an isolated one (tests)."""
    global _throttle
    if cache is not None:
        return LoginThrottle(cache)
    if _throttle is None:
        _throttle = LoginThrottle()
    return _throttle
