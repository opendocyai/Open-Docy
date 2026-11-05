"""API key hashing tests (handoff doc P0-4c: keys stored hashed, shown once)."""

from contextlib import asynccontextmanager
from types import SimpleNamespace

import pytest

from docy.exceptions.exception import APIInvalidError
from docy.models.tb_apikey import APIKey
from docy.services.api_key.manager import ApiKeyManager, hash_api_key
from docy.services.auth import backend as auth_backend


@pytest.fixture
def request_stub():
    return SimpleNamespace(user=SimpleNamespace(id="u1"))


async def test_create_stores_only_hash(db, request_stub):
    manager = ApiKeyManager(db=db, request=request_stub)
    row, plaintext = await manager.create_api_key("test key")
    assert plaintext.startswith("sk-")
    assert row.api_key is None
    assert row.api_key_hash == hash_api_key(plaintext)


async def test_hash_first_lookup_and_legacy_upgrade(db, monkeypatch, request_stub):
    manager = ApiKeyManager(db=db, request=request_stub)
    row, plaintext = await manager.create_api_key("test key")

    @asynccontextmanager
    async def fake_connector():
        yield db

    monkeypatch.setattr(auth_backend, "get_async_db_connector", fake_connector)

    username, key_id = await auth_backend.BearerTokenAuthBackend.query_user_name_api_key(
        api_key=plaintext
    )
    assert username is None and key_id is None  # no matching user in tmp DB
    assert row.api_key_hash == hash_api_key(plaintext)


async def test_legacy_plaintext_row_authenticates_and_upgrades(db, monkeypatch):
    legacy_key = "sk-legacy-plaintext"
    row = APIKey(api_key=legacy_key, name="legacy", user_id="u1")
    db.add(row)
    await db.commit()
    await db.refresh(row)

    @asynccontextmanager
    async def fake_connector():
        yield db

    monkeypatch.setattr(auth_backend, "get_async_db_connector", fake_connector)

    await auth_backend.BearerTokenAuthBackend.query_user_name_api_key(api_key=legacy_key)
    await db.refresh(row)
    assert row.api_key is None
    assert row.api_key_hash == hash_api_key(legacy_key)


async def test_wrong_key_rejected(db, monkeypatch):
    @asynccontextmanager
    async def fake_connector():
        yield db

    monkeypatch.setattr(auth_backend, "get_async_db_connector", fake_connector)
    with pytest.raises(APIInvalidError):
        await auth_backend.BearerTokenAuthBackend.query_user_name_api_key(api_key="sk-wrong")
