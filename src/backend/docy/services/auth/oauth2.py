# -*- coding: utf-8 -*-
# @Time    : 2026/2/11 11:03
# @Author  : yanjia
# @File    : oauth2.py
# @Desc    : oauth
import secrets
from typing import Optional, Dict, Tuple
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse, unquote

from fastapi import HTTPException
from starlette.responses import RedirectResponse

from docy.bases.base_manager import BaseManager
from constants import CommonRedisKey
from core.settings import project_settings as settings
from loguru import logger
from exceptions import exception as PE
from forms.oauth import ClientRegisterFrom
from docy.schema.oauth import (
    OauthClientRegisterSchema,
    OauthAuthorizationCodeInertSchema,
    OauthAuthorizationConsentRecordSchema,
    OAuthTokenInsertSchema,
    OAuthAccessTokenSchema,
)
from docy.services.auth.manager import UserManager
from docy.services.auth.utils.oauth import (
    verify_pkce,
    valid_oauth_token,
    get_oauth_user_id_from_cookie,
)
from docy.services.auth.utils.user import create_token
from docy.services.crud import (
    oauth2_client_dao,
    oauth2_token_dao,
    oauth2_authorization_code_dao,
    user_dao,
)
from docy.services.crud.oauth import oauth2_consent_dao
from docy.cache.cache_utils import (
    get_from_cache,
    delete_keys_from_cache,
    save_to_cache,
    delete_key_from_cache,
)
from docy.utils.dt import get_current_utc_time
from docy.utils.enums import OauthGrantType, OauthTokenTypeHint


class OAuthorizationServer(BaseManager):

    dao = oauth2_client_dao

    async def resolve_login_user(
        self, user_id: Optional[str] = None
    ) -> Tuple[Optional[str], bool]:
        """Resolve the current request's logged-in user ID and auth status

        Tries the following in priority order:
        1. Explicitly passed user_id → returns (user_id, False)
           (e.g. in the select_account flow the frontend picked an account,
           which is merely a "selection", not proof of authentication)
        2. request.user → returns (user_id, True)
           (authenticated via the JWT Bearer Token middleware)
        3. Cookie oauth:session → returns (user_id, True)
           (authenticated via OAuth session lookup in Redis)

        Returns:
            (user_id, is_authenticated): returns (None, False) when not logged in
        """
        if user_id:
            if self._request:
                if self._request.user:
                    return user_id, self._request.user.id == user_id
                cookie_user_id = await get_oauth_user_id_from_cookie(self._request)
                if cookie_user_id:
                    return user_id, cookie_user_id == user_id
        else:
            if self._request:
                if self._request.user:
                    return self._request.user.id, True

                cookie_user_id = await get_oauth_user_id_from_cookie(self._request)
                if cookie_user_id:
                    return cookie_user_id, True

        return user_id, False

    async def get_oauth_client_by_id(self, client_id: str) -> oauth2_client_dao.model:
        return await self.dao.select_model_by_column(
            self.db, client_id=client_id, is_delete=False
        )

    async def get_oauth_client(self, client_name: str, **kwargs):
        user_id = kwargs.pop("user_id", None)
        if not user_id:
            if self._request:
                user_id = self.request.user.id

        return await self.dao.select_model_by_column(
            self.db, client_name=client_name, user_id=user_id, is_delete=False, **kwargs
        )

    async def register_client(self, register_form: ClientRegisterFrom):
        """
        Register a client
        """
        if self._request:
            user_id = self.request.user.id
        else:
            raise PE.UserNotLoginError

        exists_client = await self.get_oauth_client(
            register_form.client_name, user_id=user_id
        )
        if exists_client:
            raise PE.OauthClientNameExistError

        # Generate secure client_id and client_secret
        client_id = secrets.token_urlsafe(32)  # 32 bytes → 43 chars
        client_secret = secrets.token_urlsafe(48)  # 48 bytes → 64 chars

        client = OauthClientRegisterSchema(
            client_id=client_id,
            client_secret=client_secret,
            user_id=user_id,
            **register_form.model_dump(),
        )
        return await self.dao.create_model(self.db, client, flush=True, commit=True)

    async def get_client_lists(self, **kwargs):
        return await self.dao.select_models_order(
            self.db, "created_at", "asc", is_delete=False, **kwargs
        )

    async def validate_authorize_request(
        self, client_id: str, redirect_uri: str, scope: str
    ):
        """
        Validate authorize request parameters
        """
        oauth_client = await self.get_oauth_client_by_id(client_id)
        if not oauth_client:
            raise PE.OauthClientError
        if redirect_uri not in oauth_client.redirect_uris:
            raise PE.OauthClientRedirectUriError
        if scope not in oauth_client.scopes:
            raise PE.OauthClientScopeError

        return True

    async def save_authorization_code(
        self, insert_code_schema: OauthAuthorizationCodeInertSchema
    ):
        """
        Store the code
        """
        return await oauth2_authorization_code_dao.create_model(
            self.db, insert_code_schema, flush=True, commit=True
        )

    async def save_authorization_token(
        self, insert_token_schema: OAuthTokenInsertSchema
    ):
        """
        Store the token
        """
        return await oauth2_token_dao.create_model(
            self.db, insert_token_schema, flush=True, commit=True
        )

    @staticmethod
    def create_access_tokens(
        user_id: str, scope: str, client_id: str
    ) -> OAuthAccessTokenSchema:
        """Create access_token and refresh_token"""
        current_utc_time = get_current_utc_time()
        access_payload = {
            "iss": "fastapi-oauth",
            "sub": user_id,
            "iat": current_utc_time,
            "scope": scope,
            "type": "access_token",
            "client_id": client_id,
        }
        access_token = create_token(
            data=access_payload,
            utype="OAUTH",
            expire_minutes=settings.system.ACCESS_TOKEN_EXPIRE_MINUTES,
        )
        refresh_payload = {
            "iss": "fastapi-oauth",
            "sub": user_id,
            "iat": current_utc_time,
            "type": "refresh_token",
            "client_id": client_id,
        }
        refresh_token = create_token(
            data=refresh_payload,
            _type="refresh",
            utype="OAUTH",
            expire_minutes=settings.system.OAUTH_REFRESH_TOKEN_EXPIRE_MINUTES,
        )

        return OAuthAccessTokenSchema(
            access_token=access_token,
            token_type="Bearer",
            expires_in=3600,
            refresh_token=refresh_token,
            scope=scope,
            user_id=user_id,
        )

    async def create_authorization_response(
        self,
        user_id: str,
        client_id: str,
        redirect_uri: str,
        scope: str,
        state: Optional[str] = None,
        code_challenge: Optional[str] = None,
        code_challenge_method: Optional[str] = "plain",
        auto_approved: bool = False,
        update_consent_id: str = "",
    ) -> dict:  #  -> dict | RedirectResponse
        """
        Create the authorization response - generate the auth code and
        redirect back to the client

        Args:
            user_id: current logged-in user id
            client_id: client_id
            redirect_uri: client callback URL
            scope: authorized permission scope
            state: state value passed by the client (CSRF protection)
            code_challenge: PKCE challenge code
            code_challenge_method: PKCE method (plain or S256)
            auto_approved: whether to add a consent record
            update_consent_id: id of the consent record to update

        Returns:
            RedirectResponse: 302 redirect to the client callback URL
        """

        # Build the authorization code data
        authorization_code = secrets.token_urlsafe(48)
        insert_code_schema = OauthAuthorizationCodeInertSchema(
            code=authorization_code,
            user_id=user_id,
            redirect_uri=unquote(redirect_uri),
            client_id=client_id,
            scope=scope,
            nonce=state,
            code_challenge=code_challenge,
            code_challenge_method=code_challenge_method,
        )
        authorization_code = await self.save_authorization_code(insert_code_schema)
        if authorization_code:
            # Save the authorization code to Redis with a 10-minute TTL
            await save_to_cache(
                CommonRedisKey.get_oauth_authorize_code_key(authorization_code.code),
                authorization_code.code,
                ex=CommonRedisKey.oauth_authorize_code_key_expired,
            )

        # Build callback URL params
        callback_params = {"code": authorization_code.code}

        # state must be returned exactly as provided (if the client sent one)
        if state:
            callback_params["state"] = state

        # Build the full redirect URL
        # Return the 302 redirect response
        # Add security response headers

        # Add the consent record
        if auto_approved:
            create_consent_record = await self.save_oauth_authorize_consent_record(
                user_id, client_id, scope
            )
            if create_consent_record:
                logger.info(f"Consent record added: {create_consent_record}")
        if update_consent_id:
            update_rows = await self.update_oauth_authorize_consent_record_scope(
                update_consent_id, scope
            )
            if update_rows:
                logger.info(f"Consent record updated, id: {update_consent_id} scope: {scope}")

        callback_params.update({"redirect_uri": redirect_uri})
        return callback_params

    @staticmethod
    def build_redirect_url(base_url: str, params: dict) -> str:
        """
        Safely build the redirect URL to prevent open-redirect vulnerabilities
        """
        # Parse the base URL
        parsed = urlparse(base_url)

        # Validate the scheme (https only; http allowed in development)
        if parsed.scheme not in ["https", "http"]:
            raise ValueError(f"Invalid scheme: {parsed.scheme}")

        # Merge existing and new query params
        existing_params = parse_qs(parsed.query)
        existing_params.update({k: [v] for k, v in params.items()})

        # Re-encode the query string
        query_string = urlencode(existing_params, doseq=True)

        # Rebuild the URL
        new_url = urlunparse(
            (
                parsed.scheme,
                parsed.netloc,
                parsed.path,
                parsed.params,
                query_string,
                parsed.fragment,
            )
        )
        return new_url

    async def query_authorization_code(self, code: str, client):
        # Query the database
        pass

    async def delete_authorization_code(self, authorization_code: str) -> int:
        # Delete the authorization code
        return await oauth2_authorization_code_dao.delete_model_by_column(
            self.db,
            logical_deletion=True,
            deleted_flag_column="is_delete",
            deleted_at_column="delete_at",
            is_delete=False,
            code=authorization_code,
            flush=True,
            commit=True,
        )

    async def authenticate_user(self, authorization_code: str):
        # Return the user
        authenticate_code = await oauth2_authorization_code_dao.select_model_by_column(
            self.db,
            code=authorization_code,
            is_delete=False,
        )
        if authenticate_code:
            return await UserManager(self.db).get_user_by_id(authenticate_code.user_id)
        return None

    async def create_oauth_token_response(
        self,
        grant_type: str,
        code: str,
        redirect_uri: str,
        code_verifier: str,
        refresh_token: str,
        client_id: str,
        client_secret: str,
    ) -> OAuthAccessTokenSchema | dict:
        """
        Create the oauth access_token

        Args:
            grant_type: grant type authorization_code, refresh_token, password
            code: client_id
            redirect_uri: client callback URL
            code_verifier: PKCE
            refresh_token: refresh token
            client_id: client_id
            client_secret: client_secret
        Returns:
            OAuthAccessTokenSchema | dict
        """
        form = {
            "code": code,
            "redirect_uri": redirect_uri,
            "code_verifier": code_verifier,
            "refresh_token": refresh_token,
            "client_id": client_id,
            "client_secret": client_secret,
        }
        if grant_type not in OauthGrantType.grant_type_list():
            raise PE.OauthGrantTypeError
        if grant_type == OauthGrantType.AUTHORIZATION_CODE.value:
            return await self._handle_authorization_code(form)
        elif grant_type == OauthGrantType.PASSWORD.value:
            return await self._handle_password(form)
        elif grant_type == OauthGrantType.REFRESH_TOKEN.value:
            return await self._handle_refresh_token(form)
        return {}

    async def _handle_authorization_code(
        self, form: dict
    ) -> OAuthAccessTokenSchema | dict:
        """Handle the authorization code for token exchange"""
        code = form.get("code", "")
        redirect_uri = form.get("redirect_uri", "")
        code_verifier = form.get("code_verifier", "")  # PKCE

        client_id, client_secret = form.get("client_id", ""), form.get(
            "client_secret", ""
        )
        if client_id and client_secret:
            # Validate the client
            client = await self.get_oauth_client_by_id(client_id)
            if not client or client.client_secret != client_secret:
                raise HTTPException(status_code=401, detail="invalid_client")
            # Query the authorization code
            auth_code_data = await get_from_cache(
                CommonRedisKey.get_oauth_authorize_code_key(code),
            )
            if not auth_code_data:
                raise PE.OauthGrantCodeError
            else:
                auth_code_data = await oauth2_authorization_code_dao.get_oauth_code(
                    self.db, code
                )
            if not auth_code_data:
                raise PE.OauthGrantCodeError
            # Verify the authorization code is not expired
            if auth_code_data.is_expired:
                raise PE.OauthGrantCodeExpiredError
            # Validate the redirect_uri
            if auth_code_data.redirect_uri != redirect_uri:
                raise PE.OauthClientRedirectUriError
            # Verify PKCE
            if auth_code_data.code_challenge:
                if not code_verifier:
                    raise PE.OauthGrantRequestParamError
                if not verify_pkce(
                    code_verifier,
                    auth_code_data.code_challenge,
                    (
                        auth_code_data.code_challenge_method
                        if auth_code_data.code_challenge_method
                        else "plain"
                    ),
                ):
                    raise PE.OauthGrantRequestParamError
            # Fetch the user
            user = await UserManager(self.db).get_user_by_id(auth_code_data.user_id)
            if not user:
                raise PE.OauthUserError

            # Generate tokens
            token = await self.generate_oauth_access_token(
                user.id, auth_code_data.scope, client_id
            )

            # Delete the used authorization code and cache entry
            await self.delete_authorization_code(code)
            await delete_key_from_cache(
                CommonRedisKey.get_oauth_authorize_code_key(code),
            )
            return token

        return {}

    async def _handle_password(self, form: dict):
        """Handle the password grant"""
        username = form.get("username")
        password = form.get("password")
        scope = form.get("scope", "")

        user = await user_dao.get_user_by_email(self.db, username)
        # TODO: validate the password

        # Validate the scope
        requested_scopes = set(scope.split())
        allowed_scopes = set(user.scopes)
        if not requested_scopes.issubset(allowed_scopes):
            raise HTTPException(status_code=400, detail="invalid_scope")

        return {}

    async def _handle_refresh_token(self, form: dict) -> OAuthAccessTokenSchema | dict:
        """Handle the refresh token grant"""
        refresh_token = form.get("refresh_token", "")
        client_id, client_secret = form.get("client_id", ""), form.get("client_secret")
        client_instance = await self.get_oauth_client_by_id(client_id)
        if not client_instance or client_instance.client_secret != client_secret:
            raise HTTPException(status_code=401, detail="invalid_client")
        # Validate the refresh token
        token_user = await self.get_valid_token_user(
            refresh_token, token_type_hint="refresh"
        )
        if token_user:
            oauth2_token = await oauth2_token_dao.get_by_filter(
                self.db, refresh_token=refresh_token
            )
            if oauth2_token:
                scope = oauth2_token.scope
            else:
                scope = ""
            new_access_token = await self.generate_oauth_access_token(
                token_user.id, scope=scope, client_id=client_id
            )
            if new_access_token.access_token:
                return new_access_token
        else:
            raise PE.OauthGrantRefreshTokenError
        return {}

    async def is_already_authorized(
        self,
        user_id: str,
        client_id: str,
        requested_scope: str,
        require_exact_match: bool = False,
    ) -> Tuple:
        """
        Check whether the user has already authorized this client

        Args:
            user_id: user ID
            client_id: client ID
            requested_scope: requested permission scope (space-separated)
            require_exact_match: whether the scope must match exactly
                (default: containment is enough)

        Returns:
            bool: whether it is authorized and still valid
        """
        # Find the existing non-revoked consent record
        consent = await oauth2_consent_dao.select_model_by_column(
            self.db, user_id=user_id, client_id=client_id, is_revoked=0, is_delete=False
        )

        if not consent:
            return None, False

        # Check whether the authorization is still valid (not expired or revoked)
        if not consent.is_active:
            logger.error(
                f"authorized is expired or revoked: consent_record_id({consent.id})"
            )
            return consent, False

        # Parse the requested scope
        requested_scopes = requested_scope.split() if requested_scope else ["openid"]

        # Check whether the scope is satisfied
        if require_exact_match:
            # Exact match (not recommended unless specifically required)
            return consent, set(consent.scope) == set(requested_scopes)
        else:
            # Granted scope contains the requested scope (recommended)
            return consent, consent.has_scope(requested_scopes)

    async def save_oauth_authorize_consent_record(
        self,
        user_id: str,
        client_id: str,
        scope: str,
    ):
        """
        Save the consent record
        Args:
            user_id: user ID
            client_id: client ID
            scope: requested permission scope (space-separated)

        Returns:
            bool:
        """
        insert_schema = OauthAuthorizationConsentRecordSchema(
            user_id=user_id, client_id=client_id, scope=scope
        )
        return await oauth2_consent_dao.create_model(
            self.db, insert_schema, flush=True, commit=True
        )

    async def update_oauth_authorize_consent_record_scope(
        self, consent_id: str, scope: str
    ):
        """
        Update the consent record's scope
        """
        return await oauth2_consent_dao.update_model_by_column(
            self.db, {"scope": scope}, id=consent_id, is_delete=False
        )

    async def get_valid_token_user(self, valid_token: str, token_type_hint: str = ""):
        """
        Validate the token here
        """
        if not self.request:
            raise PE.RequestNeed
        token_user = await UserManager(self.db).get_access_from_refresh_token(
            valid_token, token_type_hint=token_type_hint
        )
        if not token_user:
            if token_type_hint == OauthTokenTypeHint.REFRESH_TOKEN.value:
                raise PE.InvalidRefreshToken
            else:
                raise PE.InvalidAccessToken
        if valid_oauth_token(
            self.request.app.redis_client, valid_token, token_user.id, token_type_hint
        ):
            return token_user
        return None

    async def generate_oauth_access_token(
        self, user_id: str, scope: str, client_id: str
    ) -> OAuthAccessTokenSchema:
        """
        Generate the oauth token and persist/cache it
        """
        token = self.create_access_tokens(user_id, scope, client_id)
        insert_token_schema = OAuthTokenInsertSchema(
            user_id=user_id,
            client_id=client_id,
            access_token=token.access_token,
            refresh_token=token.refresh_token,
            scope=scope,
            expires_in=token.expires_in,
            token_type=str(OauthGrantType.AUTHORIZATION_CODE.value),
        )
        await self.save_authorization_token(insert_token_schema)
        # Cache the token
        await save_to_cache(
            CommonRedisKey.get_oauth_token_key(user_id),
            token.model_dump(),
            ex=token.expires_in,
        )
        return token

    async def revoke_access_token(
        self,
        client_id: str,
        client_secret: str,
        token: str,
        token_type_hint: str = "",
    ) -> int:
        """
        Revoke the access_token
        Invalidates the access_token, but the user can still refresh the
        access_token via the refresh_token
        """
        update_rows = 0

        if client_id and client_secret:
            # Validate the refresh token
            token_user = await self.get_valid_token_user(
                token, token_type_hint=token_type_hint
            )
            if token_user:
                if token_type_hint == OauthTokenTypeHint.REFRESH_TOKEN.value:
                    _filter = {"refresh_token": token}
                else:
                    _filter = {"access_token": token}
                update_rows = await oauth2_token_dao.update_model_by_column(
                    self.db,
                    {
                        "access_token_revoked_at": int(
                            get_current_utc_time().timestamp()
                        )
                    },
                    is_delete=False,
                    **_filter,
                )
                if update_rows:
                    # Delete the access_token cache but keep the refresh_token cache
                    cache_token = await get_from_cache(
                        CommonRedisKey.get_oauth_token_key(token_user.id),
                    )
                    if cache_token:
                        cache_token.pop("access_token", None)
                        ttl = await self.request.app.redis_client.ttl(
                            CommonRedisKey.get_oauth_token_key(token_user.id)
                        )
                        await save_to_cache(
                            CommonRedisKey.get_oauth_token_key(token_user.id),
                            cache_token,
                            ex=ttl,
                        )
                return update_rows
            else:
                if token_type_hint == OauthTokenTypeHint.REFRESH_TOKEN.value:
                    raise PE.InvalidRefreshToken
                else:
                    raise PE.InvalidAccessToken

        return update_rows

    async def revoke_authorization(
        self, client_id: str, authorization_user_id: str
    ) -> int:
        """Revoke the app authorization"""
        update_rows = await oauth2_consent_dao.revoke_authorization(
            self.db, client_id, authorization_user_id
        )
        if update_rows:
            # Delete the token cache
            authorization_consent = await oauth2_consent_dao.get_by_filter(
                self.db, client_id=client_id
            )
            if authorization_consent:
                if authorization_user_id:
                    await delete_key_from_cache(
                        CommonRedisKey.get_oauth_token_key(authorization_user_id),
                        # The app may be created by an admin while authorized by another user
                    )
        return update_rows

    async def list_authorized_apps(self, user_id: str):
        return await oauth2_consent_dao.select_models_order(
            self.db,
            sort_columns=["created_at"],
            sort_orders=["desc"],
            is_delete=False,
            is_revoked=0,
            user_id=user_id,
        )
