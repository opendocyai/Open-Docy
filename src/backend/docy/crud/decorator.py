# -*- coding: utf-8 -*-
# @Time    : 2025/8/14 18:40
# @Author  : yanjia
# @File    : decorator.py
# @Desc    : None
import json
from functools import wraps
from typing import List, Optional, Set
from loguru import logger
from fastapi import Depends, Request, status
import inspect


from docy import const
from docy.cache.cache_utils import get_from_cache, delete_keys_from_cache, save_to_cache
from docy.database import get_async_db_connector
from docy.exceptions import exception as PE
from docy.services.auth.utils.dependencies import (
    get_current_oauth_user_token_data,
    TokenData,
)
from docy.utils.enums import OAuth2Policy
from docy.crud import role_dao


async def get_current_user_perms(
    request: Request,
    # Adding Depends would force get_current_user_perms to be dependency-injected in the route
) -> List[str]:
    """
    Get the user's role permissions from cache or database.
    """
    if request and request.user:
        user_id = request.user.id
        user_check_role_key = const.CommonRedisKey.get_user_check_role_key(user_id)
        role_user_str = await get_from_cache(user_check_role_key)

        if role_user_str:
            role_user: dict = json.loads(role_user_str)
            if role_user.get("user_id") != user_id:
                return []

            async with get_async_db_connector() as db:
                return await role_dao.get_role_perms(
                    db, role_user.get("role_id"), user_id
                )
    return []


def require_perm(perm: str):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            request = kwargs.get("request")
            if not request:
                logger.error(f"require_perm decorator func required 'request' parma.")
                raise PE.RequestError(desc="Required parameter 'request'")

            # Only validate normal (BEAR-TOKEN) API calls
            auth_type = request.scope.get("auth_type")
            if auth_type and auth_type == const.AT_BEARER_TOKEN:
                current_user_perms = await get_current_user_perms(kwargs.get("request"))
                # Support multiple permissions separated by commas
                required_perms = perm.split(",")
                if not bool(set(required_perms) & set(current_user_perms)):
                    logger.error(f"required_perms: {required_perms}")
                    logger.error(f"current_user_perms: {current_user_perms}")
                    raise PE.RequestError(
                        code=status.HTTP_403_FORBIDDEN, desc="Permission denial"
                    )

            # Sync/async invocation
            if inspect.iscoroutinefunction(func):
                return await func(*args, **kwargs)
            else:
                return func(*args, **kwargs)

        return wrapper

    return decorator


def write_check_role_cache():
    """
    Cache the currently selected role for the user.
    """

    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            _request, role_id, space_id = (
                kwargs.get("request"),
                kwargs.get("role_id"),
                kwargs.get("space_id"),
            )
            if _request and role_id and _request.user:
                user_check_role_key = const.CommonRedisKey.get_user_check_role_key(
                    _request.user.id
                )

                await save_to_cache(
                    user_check_role_key,
                    json.dumps(
                        {
                            "user_id": _request.user.id if _request.user else None,
                            "role_id": role_id,
                            "space_id": space_id,
                        }
                    ),
                )
            return await func(*args, **kwargs)

        return wrapper

    return decorator


class PermissionChecker:
    """
    Permission checker - verifies the user holds the required scopes.
    """

    def __init__(
        self,
        # Required OAuth2 scopes
        scopes: Optional[List[str]] = None,
        # Required internal user roles
        roles: Optional[List[str]] = None,
        # Required internal user permissions
        permissions: Optional[List[str]] = None,
        # Policy when OAuth2 has no scope
        oauth2_policy: OAuth2Policy = None,
        # Explicitly allow OAuth2 access (ignore the policy)
        allow_oauth2: bool = False,
        # Explicitly deny OAuth2
        deny_oauth2: bool = False,
        # Custom error message
        oauth2_forbidden_msg: str = None,
    ):
        self.scopes: Set[str] = set(scopes or [])
        self.roles: Set[str] = set(roles or [])
        self.permissions: Set[str] = set(permissions or [])
        self.oauth2_policy = oauth2_policy or OAuth2Policy.STRICT.value
        self.allow_oauth2 = allow_oauth2
        self.deny_oauth2 = deny_oauth2
        self.oauth2_forbidden_msg = oauth2_forbidden_msg or "OAuth2 access denied"

    async def __call__(
        self, user_token_data: TokenData = Depends(get_current_oauth_user_token_data)
    ):
        # OAuth2 user handling
        if user_token_data.is_oauth2:
            if self.deny_oauth2:  # Explicitly deny OAuth2
                raise PE.RequestError(
                    code=status.HTTP_403_FORBIDDEN, desc=self.oauth2_forbidden_msg
                )

            # Explicitly allowed (special marker)
            if self.allow_oauth2:
                return user_token_data

            # Specific scopes required
            if self.scopes:
                user_scopes = set(user_token_data.scopes)
                if not self.scopes.issubset(user_scopes):
                    missing = self.scopes - user_scopes
                    raise PE.RequestError(
                        code=status.HTTP_403_FORBIDDEN,
                        desc=f"Insufficient scope. Missing: {', '.join(missing)}",
                    )
                return user_token_data

            # No scope requirement; apply the default policy
            if self.oauth2_policy == OAuth2Policy.STRICT.value:
                # Strict mode: scopes must be defined, otherwise deny
                raise PE.RequestError(
                    code=status.HTTP_403_FORBIDDEN,
                    desc=f"{self.oauth2_forbidden_msg}: Endpoint requires explicit scope definition for OAuth2 access",
                )

            elif self.oauth2_policy == OAuth2Policy.CHECK_SCOPE.value:
                # Check the base scope
                if "profile" not in user_token_data.scopes:
                    raise PE.RequestError(
                        code=status.HTTP_403_FORBIDDEN,
                        desc=f"{self.oauth2_forbidden_msg}: OAuth2 access requires 'profile' scope",
                    )
                return user_token_data

            elif self.oauth2_policy == OAuth2Policy.PERMISSIVE.value:
                # Permissive mode: allow through
                return user_token_data

            else:
                logger.error(f"Unknown OAuth2 policy: {self.oauth2_policy}")
                raise PE.RequestError(
                    code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    desc="Unknown OAuth2 policy",
                )

        # Internal user handling
        if user_token_data.is_internal or user_token_data.user_id:
            # Internal users pass directly
            return user_token_data

        raise PE.RequestError(
            code=status.HTTP_401_UNAUTHORIZED, desc="Unknown user type"
        )


# Convenience functions
def internal_only():
    """Internal users only."""
    return PermissionChecker(deny_oauth2=True)


def require_oauth(oauth2_policy: OAuth2Policy = OAuth2Policy.PERMISSIVE.value):
    """Login only; OAuth2 policy configurable."""
    return PermissionChecker(oauth2_policy=oauth2_policy)


def require_admin():
    """Require admin permissions."""
    return PermissionChecker(
        scopes=["admin"],
        roles=["admin"],
        oauth2_forbidden_msg="Admin access required",
    )


def has_scope(*scopes: str, **kwargs):
    """Require specific scopes."""
    return PermissionChecker(
        scopes=list(scopes), roles=["admin"], **kwargs  # internal admin passes automatically
    )


def require_role(*roles: str):
    """Internal user role check only; OAuth2 denied."""
    return PermissionChecker(
        roles=list(roles),
        deny_oauth2=True,  # Explicitly deny OAuth2
    )


def require_permission(*permissions: str):
    """Internal user permission check only; OAuth2 denied."""
    return PermissionChecker(
        permissions=list(permissions),
        deny_oauth2=True,
    )


def public_oauth():
    """Explicitly allow OAuth2 without scope checks (public endpoints)."""
    return PermissionChecker(allow_oauth2=True)


def oauth_readonly():
    """Allow OAuth2 read-only access (requires api:read or api scope)."""
    return PermissionChecker(
        scopes=["api:read", "api"],  # either one is sufficient
        oauth2_forbidden_msg="Read access required",
    )


# Common permission combinations
require_user = has_scope("openid", "profile")
require_api_read = has_scope("api:read")
require_api_write = has_scope("api:write")
