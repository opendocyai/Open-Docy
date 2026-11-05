"""PBKDF2 auto-upgrade tests: legacy 390k hashes are re-hashed to 600k on login."""

from contextlib import asynccontextmanager
from types import SimpleNamespace
from unittest.mock import AsyncMock

import pytest
from diskcache import Cache

from docy.exceptions.exception import LoginError
from docy.services.auth import backend as auth_backend
from docy.services.auth.login_throttle import LoginThrottle
from docy.services.auth.manager import UserManager
from docy.services.auth.utils.hashers import PBKDF2PasswordHasher
from docy.services.auth.utils.password import check_password, get_hasher, make_password
from docy.services.auth.utils.user import get_user_model

PASSWORD = "Correct-Horse-Battery-42!"


def _legacy_hash(password: str) -> str:
    hasher = PBKDF2PasswordHasher()
    return hasher.encode(password, hasher.salt(), iterations=390_000)


async def _create_user(db, password_hash: str):
    user_model = get_user_model()
    user = user_model(
        username="alice",
        email="alice@example.com",
        password=password_hash,
        is_active=True,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@pytest.fixture
def login_env(db, tmp_path, monkeypatch):
    """Point the login flow's external touchpoints at the tmp test session."""

    @asynccontextmanager
    async def fake_connector():
        yield db

    throttle = LoginThrottle(Cache(str(tmp_path)))
    monkeypatch.setattr(auth_backend, "get_async_db_connector", fake_connector)
    monkeypatch.setattr("docy.services.auth.manager.save_to_cache", AsyncMock())
    monkeypatch.setattr("docy.services.auth.manager.get_login_throttle", lambda: throttle)
    request = SimpleNamespace(client=SimpleNamespace(host="127.0.0.1"))
    return UserManager(db=db, request=request)


async def test_legacy_hash_upgraded_on_login(db, login_env):
    user = await _create_user(db, _legacy_hash(PASSWORD))
    token, _, returned_user = await login_env.login(
        login_env.request, username="alice", password=PASSWORD
    )
    assert token is not None
    assert returned_user is user
    assert user.password.startswith("pbkdf2_sha256$600000$")
    assert check_password(PASSWORD, user.password)
    await db.refresh(user)
    assert user.password.startswith("pbkdf2_sha256$600000$")


async def test_current_hash_not_rehashed(db, login_env):
    current_hash = make_password(PASSWORD)
    user = await _create_user(db, current_hash)
    await login_env.login(login_env.request, username="alice", password=PASSWORD)
    assert user.password == current_hash


async def test_wrong_password_leaves_hash_untouched(db, login_env):
    legacy = _legacy_hash(PASSWORD)
    user = await _create_user(db, legacy)
    with pytest.raises(LoginError):
        await login_env.login(login_env.request, username="alice", password="wrong-password")
    await db.refresh(user)
    assert user.password == legacy


def test_must_update_flags_legacy_iterations():
    assert get_hasher().must_update(_legacy_hash(PASSWORD)) is True
    assert get_hasher().must_update(make_password(PASSWORD)) is False
