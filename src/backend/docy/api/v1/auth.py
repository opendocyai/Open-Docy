"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/9
Last Modified: 2025/6/9
Last Editor:
Filename: auth
Description: user-related endpoints
"""

import base64
from typing import (
    Annotated,
)
from fastapi import (
    APIRouter,
    Depends,
    Body,
    Request,
    BackgroundTasks,
    HTTPException,
    status,
    Header,
    Path,
    Query,
    Response,
)
from loguru import logger
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession

from docy.const import CommonRedisKey
from docy.database import api_async_db
from docy.core.aes import ecb_encrypt
from docy.core._string import get_random_strs
from docy.core._response import pre_response as R
from docy.core.settings import project_settings as settings

from docy.forms.user import (
    EmailForm,
    SignUpForm,
    CustomOAuth2PasswordRequestForm,
    RefreshForm,
    EmailSend,
    UpdateForm,
    FindPasswordForm,
)
from docy.schema.auth import UserSchema
from docy.utils.sql_query import async_list_objects
from docy.services.auth.utils.dependencies import oauth2_scheme, verify_oauth_token
from docy.services.auth.utils.oauth import (
    create_oauth_session,
    delete_oauth_session,
    get_oauth_user_id_from_cookie,
)
from docy.services.auth.utils.device import get_or_create_browser_id, BROWSER_ID_COOKIE_KEY
from docy.services.auth.utils.user import EmailEvevt, generate_sms_code, valid_sms_code
from docy.services.auth.manager import UserManager
from docy.services.auth.utils.security import APIOAuth2PasswordBearer
from docy.exceptions.exception import AuthenticateError, ValidationCodeError

router = APIRouter(tags=["Auth"], prefix="/auth")

SUPPORT_LOGINWAY = ["email", "username"]


@router.get("/secret-key")
async def secret_key():
    """Provide the key for password encryption; the key is configured in the settings file<br>
    In the returned data, **key** and **content** are both base64-encoded. After base64
    decoding, use key to AES-decrypt the encrypted key,<br>
    then base64-decode the encrypted key again to get the hex key; convert the hex to
    bytes to obtain the final key.
    """
    key = get_random_strs()
    print(key)
    o_secret = settings.default.secret.encode()
    base64_secret = base64.b64encode(o_secret).decode()  # The key to encrypt
    _, content = ecb_encrypt(key, base64_secret)
    return {
        "key": base64.b64encode(key.encode()).decode(),
        "content": base64.b64encode(bytes.fromhex(content)).decode(),
    }


@router.post("/email-exist")
async def valid_email(
    request: Request,
    email: EmailForm = Body(...),
    db: AsyncSession = Depends(api_async_db),
):
    """Check whether the email has already been registered."""
    manager = UserManager(db=db, request=request)
    exist = await manager.valid_email(str(email.email))
    return R.format({"exist": exist})


@router.post("/sign-up")
async def sign_up(
    request: Request,
    background_tasks: BackgroundTasks,
    form: SignUpForm,
    db: AsyncSession = Depends(api_async_db),
):
    """***User registration***<br>
    The received password is the result of frontend AES encryption followed by
    base64 encoding.<br>
    The backend first decrypts the password, then validates its complexity, and
    finally encrypts it for storage in the database.
    """
    manager = UserManager(db=db, request=request, bg_task=background_tasks)
    await manager.create_user(
        form.email,
        form.password,
        form.first_name,
        form.last_name,
        active_link=str(request.base_url),
    )
    return R.format()


@router.post("/login")
async def login(
    request: Request,
    response: Response,
    form: Annotated[CustomOAuth2PasswordRequestForm, Depends()],
    db: AsyncSession = Depends(api_async_db),
):
    """***User login***<br>
    password is a base64-encoded string of the AES-encrypted password
    ***Note: this form is sent as `application/x-www-form-urlencoded`, not `json`***
    """
    credentials = {"password": form.password}
    manager = UserManager(db=db, request=request)
    if form.grant_way not in SUPPORT_LOGINWAY:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un support login way.",
        )
    grant_way = dict(zip(SUPPORT_LOGINWAY, SUPPORT_LOGINWAY))[form.grant_way]
    username = (
        form.username.lower() if grant_way == SUPPORT_LOGINWAY[0] else form.username
    )
    credentials |= {grant_way: username}
    access_token, first_login, user = await manager.login(request, **credentials)
    if access_token:
        access_token = access_token.model_dump() | {"first_login": first_login}
        # Set OAuth session cookie after successful login
        # (shared across paths, 1 day, same as the Redis TTL)
        oauth_session = await create_oauth_session(request, user.id)
        response.set_cookie(
            key=CommonRedisKey.oauth_session_key.rstrip(":"),
            value=oauth_session,
            max_age=CommonRedisKey.oauth_session_key_expired,
            path="/",
            httponly=False,
            samesite="lax",  # allows cross-origin cookie setting
        )

    return R.format(data=access_token)


@router.post("/token")
async def b_login(
    request: Request,
    form: Annotated[CustomOAuth2PasswordRequestForm, Depends()],
    db: AsyncSession = Depends(api_async_db),
):
    """***Backend debug login; the frontend ignores this endpoint***"""
    credentials = {"password": form.password}
    manager = UserManager(db=db, request=request)
    if form.grant_way not in SUPPORT_LOGINWAY:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupport login way.",
        )
    credentials |= {
        dict(zip(SUPPORT_LOGINWAY, SUPPORT_LOGINWAY))[form.grant_way]: form.username
    }
    data = await manager.login(request, **credentials)
    # Update last login time
    print(data)
    if isinstance(data, tuple):
        return data[0]
    else:
        return data


@router.delete("/logout")
async def logout(
    request: Request,
    response: Response,
    background_tasks: BackgroundTasks,
    refresh_token: str = Header(alias="Ref-Token"),
    access_token: str = Header(alias="Authorization"),
    db: AsyncSession = Depends(api_async_db),
):
    """User logout."""
    manager = UserManager(request=request, bg_task=background_tasks)
    manager.logout(request, access_token, refresh_token)
    try:
        # oauth session delete
        session_id = request.cookies.get(CommonRedisKey.oauth_session_key.rstrip(":"))
        if session_id:
            response.delete_cookie(key=session_id)
            await delete_oauth_session(request, session_id)

    except Exception as e:
        logger.error(f"logout error: {e}")
    return R.format()


@router.post("/refresh")
async def refresh(
    request: Request, form: RefreshForm, db: AsyncSession = Depends(api_async_db)
):
    """***Refresh the access token***<br>
    Refresh the token via the refresh token when the access token expires.
    """
    manager = UserManager(db, request=request)
    data = await manager.refresh(form.refresh_token, "USER")
    return R.format(data=data)


@router.get("/user/me")
def me(request: Request, token: str = Depends(oauth2_scheme)):  #
    """Get the current user info by token."""
    return R.format(data=UserSchema().dump(request.user))


@router.post("/user/update")
async def user_update(
    request: Request,
    form_data: UpdateForm,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """***Update user info***<br>
    Fields that can currently be modified:<br>
    <blockquote>
        display: the user's display name
        country_code: country phone code
        phone: the user's phone number
        first_name: the user's first name
        last_name: the user's last name
    </blockquote>
    """
    manager = UserManager(db, request=request)
    user = await manager.update_user(
        request.user.id,
        first_name=form_data.first_name,
        last_name=form_data.last_name,
        avatar=form_data.avatar,
    )
    data = UserSchema().dump(user)
    return R.format(data=data)


@router.get("/user/has-password")
async def password_blank(
    request: Request,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Check whether the user has a password; has_password=True in the result
    means a password is set.
    """
    manager = UserManager(db, request=request)
    is_password_blank = await manager.judge_password(request.user.id)
    return R.format(data={"has_password": is_password_blank})




@router.post("/user/reset-password")
async def reset_password(
    request: Request,
    form_data: FindPasswordForm,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """***Reset the password while not logged in***<br>
    Note: the old password is not required in this case.
    """
    manager = UserManager(db, request=request)
    await manager.reset_password(
        email=form_data.email.lower(), password=form_data.password
    )
    return R.format()
