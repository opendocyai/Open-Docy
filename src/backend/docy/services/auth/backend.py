"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: backend
Description: Authentication backend
"""

from typing import Optional, Any, Coroutine

from sqlalchemy import or_
from starlette.requests import Request
from starlette.middleware.authentication import AuthenticationBackend
import jwt

from docy.database import get_async_db_connector
from docy.core.settings import project_settings as settings
from docy.services.auth.utils.password import check_password
from docy.services.auth.utils.user import get_user_model, valid_token
from docy.services.auth.utils.security import validate_api_key
from docy.models.tb_apikey import APIKey
from docy.services.api_key.manager import hash_api_key
from docy.services.auth.manager import UserManager
from docy.utils.sql_query import async_retrieve_object
from docy.exceptions.exception import AuthenticateError, UserNotActive, APIInvalidError
from docy import const


class BaseBackend:
    def authenticate(self, request, **kwargs):
        return None

    def get_user(self, user_id):
        return None

    def get_user_permissions(self, user_obj, obj=None):
        return set()

    def get_group_permissions(self, user_obj, obj=None):
        return set()

    def get_all_permissions(self, user_obj, obj=None):
        return {
            *self.get_user_permissions(user_obj, obj=obj),
            *self.get_group_permissions(user_obj, obj=obj),
        }

    def has_perm(self, user_obj, perm, obj=None):
        return perm in self.get_all_permissions(user_obj, obj=obj)


class DefaultBackend(BaseBackend):
    async def authenticate(
            self,
            request,
            username: Optional[str] = None,
            password: Optional[str] = None,
            **kwargs,
    ):
        assert all([username, password]), "`username` and `password` must be passed."
        async with get_async_db_connector() as db:
            try:
                user_model = get_user_model()
                user = await async_retrieve_object(
                    db, user_model, condition=[user_model.username == username]
                )
                if user and check_password(password, user.password):
                    return user
                return None
            except:
                return None


class BearerTokenAuthBackend(AuthenticationBackend):
    """
    Authenticate users via token
    """

    async def authenticate(self, request: Request):
        # Find the relevant user by the API used for authorization, including
        # the user API key and the AI API key
        user_by_api = False
        username, auth_type, api_key_id = await self.get_user_name_by_apikey(request)
        auth = ""
        token = ""
        request.scope["auth_type"] = auth_type
        if not username:
            auth_type = const.AT_BEARER_TOKEN
            api_key_id = None
            if request.scope["path"] in request.app.special_pats["sse"]:
                # These requests must pass the token
                token = request.query_params.get("token")
                if not token:
                    raise AuthenticateError("Invalid JWT Token.")
                auth = f"Bearer {token}"
            else:
                if "Authorization" not in request.headers:
                    return None, None
                auth = request.headers["Authorization"]
            try:
                scheme, token = auth.split()
                if scheme.lower() != "bearer":
                    return None, None
                decode = jwt.decode(
                    token,
                    settings.system.SECRET_KEY,
                    algorithms=[settings.system.ALGORITHM],
                )
                if decode.get("client_id"):
                    auth_type = const.AT_BEARER_TOKEN_OAUTH
            except (ValueError, UnicodeDecodeError, jwt.InvalidTokenError) as exc:
                raise AuthenticateError("Invalid JWT Token.")
            username: str = decode.get("sub")
        else:
            user_by_api = True
        user_model = get_user_model()
        async with get_async_db_connector() as db:
            user = await async_retrieve_object(
                db, user_model, condition=[or_(user_model.username == username, user_model.id == username)]
            )
            if user is None:
                raise AuthenticateError("Invalid JWT Token.")
            if not user.is_active:
                raise UserNotActive
            if auth_type == const.AT_BEARER_TOKEN:
                # If the current token differs from the token stored in redis
                if not await valid_token(token, user.id):
                    raise AuthenticateError("Invalid JWT Token.")
            elif auth_type == const.AT_USER_API_KEY:
                if not user.is_active:
                    raise UserNotActive
        # Store the API invocation type in scope for later use
        request.scope["auth_type"] = auth_type
        request.scope["api_key_id"] = api_key_id  # store api_key_id for user API key auth
        return auth, user

    async def get_user_name_by_apikey(self, request: Request) -> tuple[str | None, str] | tuple[None, None]:
        ai_api_key = request.headers.get(const.HD_AI_API_KEY)
        ai_signature = request.headers.get(const.HD_AI_SIGNATURE)
        user_id = request.headers.get(const.HD_USER_ID)
        api_key = request.headers.get(const.HD_API_KEY)
        if all([ai_api_key, ai_signature]):
            try:
                validate_api_key(ai_api_key, ai_signature)
            except:
                raise APIInvalidError
            user_name, _ = await self.query_user_name_api_key(user_id=user_id)
            auth_type = const.AT_AI_API_KEY
            return user_name, auth_type, const.AIAPIKEYID
        elif api_key:
            user_name, api_key_id = await self.query_user_name_api_key(api_key=api_key)
            auth_type = const.AT_USER_API_KEY
            return user_name, auth_type, api_key_id
        return None, None, None

    @staticmethod
    async def query_user_name_api_key(
            *, api_key: str = None, user_id: str = None
    ) -> Optional[str]:
        async with get_async_db_connector() as db:
            api_key_id = None
            if api_key:
                key_hash = hash_api_key(api_key)
                instance = await async_retrieve_object(
                    db, APIKey, condition=[APIKey.api_key_hash == key_hash]
                )
                if not instance:
                    # Legacy plaintext rows: verify, then upgrade in place.
                    instance = await async_retrieve_object(
                        db, APIKey, condition=[APIKey.api_key == api_key]
                    )
                    if not instance:
                        raise APIInvalidError
                    instance.api_key_hash = key_hash
                    instance.api_key = None
                    await db.commit()
                user_id = instance.user_id
                api_key_id = instance.id
            if user_id:
                user_model = get_user_model()
                user = await async_retrieve_object(
                    db, user_model, condition=[user_model.id == user_id]
                )
                if user:
                    return user.username, api_key_id
        return None, None
