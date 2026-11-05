# -*- coding: utf-8 -*-
# @Time    : 2026/2/11 18:57
# @Author  : yanjia
# @File    : oauth.py
# @Desc    : None
import base64
import secrets

from typing import Optional

from fastapi import Request

from docy.const import CommonRedisKey
from docy.exceptions import exception as PE
from docy.cache.cache_utils import get_from_cache, delete_keys_from_cache, save_to_cache


async def get_oauth_user_id_from_cookie(request: Request) -> Optional[str]:
    """Resolve the OAuth session from the cookie and return the user_id"""
    session_id = request.cookies.get(CommonRedisKey.oauth_session_key.rstrip(":"))
    if not session_id:
        return session_id
    return await get_from_cache(CommonRedisKey.get_user_auth_session_key(session_id))


async def create_oauth_session(request: Request, user_id: str) -> str:
    """Generate an OAuth session ID (cached to Redis/DB)"""
    session_id = secrets.token_urlsafe(32)
    if session_id:
        await save_to_cache(
            CommonRedisKey.get_user_auth_session_key(session_id),
            user_id,
            ex=CommonRedisKey.oauth_session_key_expired,
        )
    return session_id


async def delete_oauth_session(request: Request, session_id: str):
    """Delete the OAuth session"""
    await delete_keys_from_cache([CommonRedisKey.get_user_auth_session_key(session_id)])


def verify_pkce(verifier: str, challenge: str, method: str = "S256") -> bool:
    """Verify the PKCE code_challenge"""
    import hashlib
    import base64

    if method == "plain":
        return verifier == challenge

    if method == "S256":
        digest = hashlib.sha256(verifier.encode()).digest()
        computed = base64.urlsafe_b64encode(digest).rstrip(b"=").decode()
        return computed == challenge

    return False


def get_oauth_client_id_and_secret_by_authorization(
    authorization: str,
) -> tuple[str, str]:
    """
    Extract client_id and client_secret from authorization
    """
    # 'client_id:client_secret' is just simple base64 encoding
    client_id, client_secret = base64.b64decode(authorization).decode().split(":")
    return client_id, client_secret

    return True
