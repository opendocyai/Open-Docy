"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: user
Description: User-related functions
"""

import json
import base64
import uuid
from typing import Optional, Tuple
from enum import Enum
from urllib.parse import urlencode

from datetime import datetime, timedelta, timezone
import jwt
import copy

from docy import const as Const
from docy.const import CommonRedisKey

from docy.utils.sql_query import async_retrieve_object, async_list_objects
from docy.cache.cache_utils import get_from_cache, delete_keys_from_cache, save_to_cache
from docy.core._string import import_string, get_random_code
from docy.database import get_async_db_connector
from docy.core.aes import encrypt_with_b64_after_aes, ecb_encrypt

from docy.core.settings import ProjectSettings as settings
from docy.exceptions.exception import ImproperlyConfigured


class EmailEvevt(Enum):
    """
    Distinguish email-sending events
    """

    active_user = "active.user"
    find_password = "find.password"


def get_user_model():
    return import_string("docy.models.User")


def get_upn(email: str, password: str, active_code: str) -> str:
    _, password = encrypt_with_b64_after_aes(password)
    data = (active_code, email, password)
    upn = base64.b64encode(json.dumps(data).encode()).decode()
    return upn


# Unused in OSE: the activation/reset email flow is disabled (its call sites
# are commented out) and the [Redirect] config section has been removed.


async def valid_token(token, user_id) -> bool:
    """
    Verify the SSO token equals the token stored in redis
    """
    user_token = await get_from_cache(f"{Const.USER_TOKEN_PREFIX}{user_id}")
    if not user_token:
        return False
    if user_token.get("access_token") != token:
        return False
    return True


def get_backends():
    """
    Get the list of authentication backends
    """
    backends = []
    backend_settings = settings.system.AUTHENTICATION_BACKENDS
    for backend_path in backend_settings:
        backend = import_string(backend_path)()
        backends.append((backend, backend_path))
    if not backends:
        raise ImproperlyConfigured(
            "No authentication backends have been defined. Does "
            "AUTHENTICATION_BACKENDS contain anything?"
        )
    return backends


# Unused in OSE: the reset-password email flow is disabled (its call sites
# are commented out) and the [Redirect] config section has been removed.


def create_token(
    data: dict,
    _type: str = "access",
    utype: str = "USER",
    expire_minutes: Optional[int] = None,
) -> str:
    to_encode = data.copy()
    to_encode |= {"type": _type}
    if _type == "access":
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=(
                settings.system.ACCESS_TOKEN_EXPIRE_MINUTES
                if not expire_minutes
                else expire_minutes
            )
        )
    elif _type == "refresh":
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=(
                settings.system.REFRESH_TOKEN_EXPIRE_MINUTES
                if not expire_minutes
                else expire_minutes
            )
        )
    else:
        if expire_minutes:
            expire = datetime.now(timezone.utc) + timedelta(minutes=expire_minutes)
        else:
            raise ValueError("Unsupported token!")

    to_encode |= {"exp": expire, "utype": utype}
    encode_jwt = jwt.encode(
        to_encode, settings.system.SECRET_KEY, algorithm=settings.system.ALGORITHM
    )
    return encode_jwt


def decode_token(token: str) -> bool:
    flag = True
    try:
        jwt.decode(
            token, settings.system.SECRET_KEY, algorithms=[settings.system.ALGORITHM]
        )
    except:
        flag = False
    return flag


async def clean_token(request, access_token, refresh_token):
    """
    Clean up redis tokens on user logout
    """
    key = f"{Const.USER_TOKEN_PREFIX}{request.user.id}"
    user_token = await get_from_cache(key)
    if not user_token:
        # Nothing to clean up
        return
    # Delete the key
    await delete_keys_from_cache([key])


async def send_active_email(email: str, active_link: str, user_name: str):
    pass


async def update_user_resource_limit(user_id, db, redis_con=None, task_limit=None):
    # Update both the database and the cache
    model = get_user_model()
    user = await async_retrieve_object(db, model, o_id=user_id)
    if not user:
        return
    limit = copy.deepcopy(user.resource_limit or {})
    if task_limit is not None:
        limit["task_limit"] = task_limit
    user.resource_limit = limit
    await db.commit()

    if redis_con is not None:
        # Delete the stale cache entry
        key = f"{user_id}_resource_limit"
        await delete_keys_from_cache([key])


async def get_user_resource_limit(user_id, db, redis_con):
    key = f"{user_id}_resource_limit"
    limit = await get_from_cache(key)
    if not limit:
        # Fetch from the database
        model = get_user_model()
        user = await async_retrieve_object(db, model, o_id=user_id)
        limit = user.resource_limit or {}
        # Cache in redis
        await save_to_cache(key, limit, ex=5 * 3600)
    return limit


async def send_verification_email(to, html_body, sub):
    await email_handle.send_email(to=to, html=html_body, sub=sub)


async def generate_sms_code(prefix: str, key: str, ex: int = 5) -> Tuple[str, str]:
    task_id = str(uuid.uuid4()).replace("-", "")
    code = get_random_code()
    key = f"{prefix}_{key}_{task_id}"
    r: redis.client.Redis = await redis.from_url(settings.redis.uri())
    async with r.pipeline(transaction=True) as pipe:
        await pipe.set(key, code, ex=5 * 60).execute()
    await r.close()
    return task_id, code


async def valid_sms_code(
    task_id: str, code: str, prefix: str, key: str, delete_code=False
) -> bool:
    key = f"{prefix}_{key}_{task_id}"
    r: redis.client.Redis = await redis.from_url(settings.redis.uri())
    try:
        r_code: str = await r.get(key)
        print(await r.ttl(key))
    except:
        await r.close()
        return False
    same = False if (r_code or b"**abcde**").decode() != code else True
    if same and delete_code:
        try:
            await r.delete(key)
        except:
            await r.close()
    return same
