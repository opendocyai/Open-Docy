"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/9
Last Modified: 2025/6/9
Last Editor:
Filename: manager
Description: User-related operations
"""

import uuid
import json
import asyncio
import base64
import inspect
import unicodedata
import pandas as pd
from typing import Optional
from datetime import datetime, timezone
from fastapi import Request
import jwt
from sqlalchemy import or_
from docy.bases.base_manager import BaseManager
from docy.utils.sql_query import async_retrieve_object
from docy.exceptions.exception import (
    LoginError,
    LoginThrottled,
    UserNotActive,
    InvalidRefreshToken,
    RefreshTokenError,
    RequestNeed,
    UserHasBeActive,
    ValidateError,
    OldPasswordNotMatch,
    InvalidAccessToken,
)
from docy.schema.auth import Token
from docy.services.auth.login_throttle import get_login_throttle
from docy.core.mq.mq_client import mq_client
from docy.core.settings import project_settings as settings
from docy.core._string import gen_short_uuid, get_color, gen_snowflake_id
from docy.cache.cache_utils import save_to_cache, get_from_cache, delete_keys_from_cache
from docy.services.workspace.manager import WorkspaceManager
from docy.services.setting.manager import UserSettingManager
from docy.services.auth.utils.user import valid_sms_code, update_user_resource_limit
from docy.models.tb_workspace import WorkspaceType
import docy.const as Const
from docy.services.auth.utils.device import get_or_create_browser_id, BROWSER_ID_COOKIE_KEY
from docy.services.auth.utils.user import (
    get_user_model,
    get_upn,
    get_backends,
    create_token,
    clean_token,
    send_active_email,
    send_verification_email,
)
from docy.services.auth.utils.password import (
    get_hasher,
    make_password,
    set_unusable_password,
    set_password,
    check_password,
)


class UserManager(BaseManager):
    """
    User module logic is implemented here.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_model = get_user_model()

    @classmethod
    def normalize_email(cls, email):
        """
        Normalize the email address by lowercasing the domain part of it.
        """
        email = email or ""
        try:
            email_name, domain_part = email.strip().rsplit("@", 1)
        except ValueError:
            pass
        else:
            email = email_name + "@" + domain_part.lower()
        return email

    @classmethod
    def normalize_username(cls, username):
        return (
            unicodedata.normalize("NFKC", username)
            if isinstance(username, str)
            else username
        )

    @staticmethod
    def create_tokens(data: dict, utype: str = "USER"):
        access_token = create_token(data=data, utype=utype)
        refresh_token = create_token(data=data, _type="refresh", utype=utype)
        return Token(access_token=access_token, refresh_token=refresh_token)

    async def gen_random_name(self, prefix="Docy", _type=""):
        code = gen_short_uuid()
        u_name = f"{prefix}{_type}_{code}"
        user = await async_retrieve_object(
            self.db, self.user_model, condition=[self.user_model.username == u_name]
        )
        while user is not None:
            code = gen_short_uuid()
            u_name = f"{prefix}{_type}_{code}"
        return u_name

    async def get_user_by_id(self, user_id):
        return await async_retrieve_object(
            self.db, self.user_model, condition=[self.user_model.id == user_id]
        )

    async def get_customer_id(self, user_id):
        """Get the customer id by user id."""
        return

    async def get_user_by_customer(self, customer_id: str):
        """Removed with the billing module; kept as a no-op for API compatibility."""
        return None

    async def check_email_link(self, task_id, code, delete_code=False):
        return await valid_sms_code(
            task_id,
            code,
            prefix="open_docy",
            key="password.email",
            delete_code=delete_code,
        )

    async def reset_password(
        self,
        email: str,
        password: str,
    ):
        user = await async_retrieve_object(
            self.db, self.user_model, condition=[self.user_model.email == email]
        )
        if not user:
            return
        await self.change_password(
            user.password, email, password, old_password=None, is_login=False
        )
        # After password reset, remove the old token from redis
        # After password reset, clear the browser login association

    async def change_password(
        self,
        encode_password: str,
        email: str,
        password: str,
        old_password: Optional[str] = None,
        is_login=True,
    ):
        user = await async_retrieve_object(
            self.db, self.user_model, condition=[self.user_model.email == email]
        )
        if is_login and not user.password.startswith("!"):
            if not old_password or not check_password(old_password, encode_password):
                raise OldPasswordNotMatch
        user.password = set_password(password)
        self.db.add(user)
        await self.db.commit()

    async def verify_email(self, user_id: str, upn: str):
        user = await async_retrieve_object(self.db, self.user_model, o_id=user_id)
        if user is None:
            raise ValueError("User not found.")
        if user.is_active:
            raise UserHasBeActive
        user_name = user.full_name
        if user.upn != upn:
            raise ValueError("UPN not matched.")
        # Parse the upn
        b64_upn = base64.b64decode(upn).decode()
        active_code, _, _ = json.loads(b64_upn)
        if user.active_code != active_code:
            raise ValueError("Active code not matched.")
        if user.is_active:
            raise ValueError("User has already been activated.")

        # Activate the user
        user.is_active = True
        await self.db.commit()
        # Create a personal workspace
        # Send the welcome email

        # Grant coins
        # Coins were granted after creating the free subscription; moved to activation

    async def send_active_email(self, email: str, active_link: str):
        user = await async_retrieve_object(
            self.db, self.user_model, condition=[self.user_model.email == email.lower()]
        )
        if not user:
            raise ValueError("User not found!")
        active_link = generate_register_link(user.id, active_link, user.upn, email)
        self.bg_task.add_task(send_active_email, email, active_link, user.full_name)

    async def send_verification(self, email: str, code: str, task_id: str):
        user = await async_retrieve_object(
            self.db, self.user_model, condition=[self.user_model.email == email.lower()]
        )
        if user is None:
            raise ValidateError(f"Email<{email}> not found!")
        template_name = "passwd_reset.html"
        _t = settings.system.templates.get_template(template_name)
        params = get_email_params(4)
        params["user_name"] = user.display
        params["reset_link"] = generate_find_password_link(
            task_id=task_id, code=code, email=email
        )
        params["verification_code_expire_minutes"] = (
            settings.security.verification_code_expire_minutes
        )
        html_body = _t.render(**params)
        self.bg_task.add_task(
            send_verification_email,
            [
                email,
            ],
            html_body,
            "Reset your Docy AI password",
        )

    async def get_access_from_refresh_token(
        self, refresh_token: str, token_type_hint: str = "refresh"
    ):
        """
        Parse the user ID out of the token.

        token_type_hint: str  "access" or "refresh"
        """
        try:
            payload = jwt.decode(
                refresh_token,
                settings.system.SECRET_KEY,
                algorithms=[settings.system.ALGORITHM],
            )
        except:
            raise RefreshTokenError
        if payload.get("type") != token_type_hint:
            if token_type_hint == "access":
                raise InvalidAccessToken
            elif token_type_hint == "refresh":
                raise InvalidRefreshToken
        token_user = await async_retrieve_object(
            self.db,
            self.user_model,
            condition=[
                or_(
                    self.user_model.username == payload["sub"],
                    self.user_model.id == payload["sub"],
                )
            ],
        )
        return token_user

    async def valid_refresh(self, user_id, token) -> bool:
        if not self.request:
            raise RequestNeed
        user_token = await get_from_cache(f"{Const.USER_TOKEN_PREFIX}{user_id}")
        if not user_token:
            return False
        if user_token.get("refresh_token") != token:
            return False
        return True

        # ref_key = f"invalid_{user_id}_ref_tokens"
        # return await valid_token(redis_client, ref_key, token)

    async def refresh(self, refresh_token: str, utype: str):
        token_user = await self.get_access_from_refresh_token(refresh_token)
        if not token_user:
            raise InvalidRefreshToken
        # Validate the token here
        if not await self.valid_refresh(token_user.id, refresh_token):
            raise InvalidRefreshToken
        access_token = create_token(data={"sub": token_user.username}, utype=utype)
        token = Token(access_token=access_token, refresh_token=refresh_token)
        # Token refreshed; replace the old token in redis
        await save_to_cache(
            f"{Const.USER_TOKEN_PREFIX}{token_user.id}",
            {"access_token": access_token, "refresh_token": token.refresh_token},
        )
        return token

    async def valid_email(self, email: str) -> bool:
        email = email.lower()
        user = await async_retrieve_object(
            self.db, self.user_model, condition=[self.user_model.email == email]
        )
        if user:
            return True
        return False

    async def create_token_after_active(self, user_id: str):
        user = await async_retrieve_object(self.db, self.user_model, o_id=user_id)
        return self.create_tokens({"sub": user.username}, user.type)

    async def authenticate(self, request: Request, utype: str = "USER", **credentials):
        credentials |= {"utype": utype}
        for backend, backend_path in get_backends():
            backend_signature = inspect.signature(backend.authenticate)
            try:
                backend_signature.bind(request, **credentials)
            except TypeError:
                # This backend doesn't accept these credentials as arguments. Try
                # the next one.
                continue
            try:
                user = await backend.authenticate(request, **credentials)
            except:
                # This backend says to stop in our tracks - this user should not be
                # allowed in at all.
                break
            if user is None:
                continue
            # Annotate the user object with the path of the backend.
            user.backend = backend_path
            return user
        return None

    async def create_user_from_google(
        self,
        email: str,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
    ):
        extra_fields = {}
        extra_fields["is_superuser"] = False
        extra_fields["is_staff"] = False

        extra_fields["display"] = f"{first_name} {last_name}"
        user_id = gen_snowflake_id()
        extra_fields["id"] = user_id
        username = await self.gen_random_name()
        # Generate the activation code
        active_code = str(uuid.uuid4()).replace("-", "")
        extra_fields["active_code"] = active_code

        extra_fields["first_name"] = first_name
        extra_fields["last_name"] = last_name
        user = await self._create_user(username, email, "fake_password", **extra_fields)
        # Initialize the user
        # Create user settings
        # Create the personal workspace
        # Send the welcome email
        return user

    async def _create_user(
        self,
        username,
        email: str,
        password: str,
        first_name: str,
        last_name: str,
        **extra_fields,
    ):
        if not username:
            raise ValueError("The given username must be set.")
        email = self.normalize_email(email)
        username = self.normalize_username(username)
        display = extra_fields.get("display")
        extra_fields["default_color"] = get_color()
        # Activate the user directly; no activation code needed
        extra_fields["is_active"] = True
        # Process the password
        if password == "fake_password":
            password = set_unusable_password()
        else:
            password = set_password(password)
        user = self.user_model(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            **extra_fields,
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def create_user(
        self,
        email: str,
        password: str,
        first_name: str,
        last_name: str,
        /,
        username=None,
        active_link: Optional[str] = None,
    ):
        email = email.lower()
        user_id = gen_snowflake_id()
        extra_fields = {}
        extra_fields["is_superuser"] = False
        extra_fields["is_staff"] = False
        extra_fields["is_active"] = False
        extra_fields["id"] = user_id

        user_name = f"{first_name} {last_name}"
        extra_fields["display"] = user_name
        if not username:
            username = await self.gen_random_name()

        # Activation code no longer needed; users are activated right after
        # registration
        user = await self._create_user(
            username, email, password, first_name, last_name, **extra_fields
        )
        # Generate the activation link
        # Initialize the user
        message = {
            "event": "user.init",
            "data": {
                "google_login": False,
                "user_id": user_id,
                "user_name": user_name,
                "random_name": username,
                "email": email,
            },
        }
        mq_client.send_message(message)
        # Create personal settings
        # Create the personal workspace
        return user

    async def creaate_user_settings(self, user_id: str):
        """
        Create the user's settings.
        """
        await UserSettingManager(db=self.db, request=self.request).get_user_setting(
            user_id
        )

    async def login(
        self,
        request: Request,
        utype: str = "USER",
        email: str = None,
        username: str = None,
        password: str = None,
    ):
        """
        Convert email to username on login.
        """
        ident = email or username
        if not ident:
            raise LoginError
        ip = request.client.host if request.client else "unknown"
        throttle = get_login_throttle()
        locked = await asyncio.to_thread(throttle.check_locked, ident, ip)
        if locked > 0:
            raise LoginThrottled(meta={"retry_after": int(locked) + 1})
        try:
            if email:
                user = await async_retrieve_object(
                    self.db, self.user_model, condition=[self.user_model.email == email]
                )
            elif username:
                user = await async_retrieve_object(
                    self.db,
                    self.user_model,
                    condition=[self.user_model.username == username],
                )
            else:
                raise LoginError
            if not user:
                raise LoginError
            try:
                user = await self.authenticate(
                    request, utype, username=user.username, password=password
                )
            except:
                raise LoginError
            if not user:
                raise LoginError
        except LoginError:
            await asyncio.to_thread(throttle.record_failure, ident, ip)
            raise
        if not user.is_active:
            raise UserNotActive
        await asyncio.to_thread(throttle.record_success, ident, ip)
        # Re-hash passwords stored with an outdated work factor (pre-600k PBKDF2).
        if (
            user.password
            and not user.password.startswith("!")
            and get_hasher().must_update(user.password)
        ):
            user.password = make_password(password)
        # Create the access key and refresh key

        # Update the last login time
        first_login = user.last_login is None
        user.last_login = datetime.now(timezone.utc)
        self.db.add(user)
        await self.db.commit()
        token = self.create_tokens({"sub": user.username}, utype)
        # Add the new token to redis; used to validate tokens on API access
        await save_to_cache(
            f"{Const.USER_TOKEN_PREFIX}{user.id}",
            {"access_token": token.access_token, "refresh_token": token.refresh_token},
        )
        return token, first_login, user

    async def google_login(self, request: Request, **kwargs):
        login_method = "google"
        utype = "USER"
        try:
            user = await self.authenticate(
                request,
                utype,
                username=kwargs["email"],
                password="fake_password",
                login_method=login_method,
                **kwargs,
            )
        except:
            raise ValueError("Google sign-in failed. Please try again")
        if not user:
            raise ValueError("Google sign-in failed. Please try again")
        access_token = create_token(data={"sub": user.username}, utype=utype)
        refresh_token = create_token(
            data={"sub": user.username}, _type="refresh", utype=utype
        )
        redis_client = request.app.redis_client
        await save_to_cache(
            f"{Const.USER_TOKEN_PREFIX}{user.id}",
            {"access_token": access_token, "refresh_token": refresh_token},
        )
        # Update the last login time
        user = await async_retrieve_object(self.db, self.user_model, o_id=user.id)
        first_login = user.last_login is None
        user.last_login = datetime.now(timezone.utc)
        self.db.add(user)
        await self.db.commit()
        return (
            Token(access_token=access_token, refresh_token=refresh_token),
            first_login,
            user.id,
        )

    def logout(self, request, access_token, refresh_token):
        # User logout
        self.bg_task.add_task(clean_token, request, access_token, refresh_token)

    async def update_user(self, user_id, first_name, last_name, avatar):
        user = await async_retrieve_object(self.db, self.user_model, o_id=user_id)
        if user:
            if first_name:
                user.first_name = first_name
            if last_name:
                user.last_name = last_name
            user.display = f"{user.first_name} {user.last_name}"
            if avatar:
                user.avatar = avatar
            # Update the personal workspace avatar as well
            await self.update_space_info(user_id, avatar=avatar)
            self.db.add(user)
            await self.db.commit()
            await self.db.refresh(user)
        return user

    async def update_space_info(
        self, user_id, avatar: str = None, name: str = None, email: str = None
    ):
        space_manager = WorkspaceManager(self.db)
        workspaces_lst = await space_manager.get_user_workspace_list(user_id)
        for space in workspaces_lst:
            if space.space_type == WorkspaceType.PERSONAL and space.user_id == user_id:
                await space_manager.update_workspace(space.id, avatar=avatar)
                return

    async def judge_password(self, user_id) -> bool:
        user = await async_retrieve_object(self.db, self.user_model, o_id=user_id)
        return not user.password.startswith("!")

    # Add a record to the user's wallet
    async def add_wallet_record(self, user_id: str = None, wallet_record=None):
        if user_id is None:
            user_id = self.request.user.id
        if wallet_record is None:
            raise ValueError("wallet_record is None")
        wallet = await self.retrive_user_wallet(user_id)
        if wallet is None:
            raise ValueError("wallet is None")
        wallet_record = WalletRecord(
            user_id=user_id,
            wallet_id=wallet.id,
            **wallet_record.dict(),
        )
        self.db.add(wallet_record)
        await self.db.commit()
        await self.db.refresh(wallet_record)
        return wallet_record
