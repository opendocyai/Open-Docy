# -*- coding: utf-8 -*-
# @Time    : 2026/2/28 15:52
# @Author  : yanjia
# @File    : dependencies.py
# @Desc    : None
from datetime import datetime
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
import jwt
from pydantic import BaseModel
from typing import Optional, List

from starlette.requests import Request

from docy.core.settings import project_settings as settings
from docy.services.auth.utils.security import APIOAuth2PasswordBearer


# Configure the OAuth2 scheme (custom error handling)
oauth2_scheme = APIOAuth2PasswordBearer(tokenUrl="api/v1/auth/token", auto_error=True)

# Or the more generic HTTP Bearer
http_bearer = HTTPBearer(auto_error=False)


class TokenData(BaseModel):
    user_id: Optional[str] = None
    username: Optional[str] = None
    scopes: List[str] = []
    exp: Optional[datetime] = None
    client_id: Optional[str] = None

    @property
    def is_internal(self):
        return self.client_id is None

    @property
    def is_oauth2(self):
        return self.client_id is not None

    def has_any_scope(self, scopes: List[str]) -> bool:
        """Check whether any scope matches (OR logic)"""
        return any(s in self.scopes for s in scopes)

    def has_all_scopes(self, scopes: List[str]) -> bool:
        """Check whether all scopes match (AND logic)"""
        return all(s in self.scopes for s in scopes)


async def verify_oauth_token(token: str) -> TokenData:
    """
    Validate the JWT token and return the parsed data
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not token:
        raise credentials_exception

    try:
        payload = jwt.decode(
            token, settings.system.SECRET_KEY, algorithms=[settings.system.ALGORITHM]
        )

        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception

        token_data = TokenData(
            user_id=user_id,
            username=payload.get("preferred_username", user_id),
            scopes=payload.get("scope", "").split(),
            exp=datetime.fromtimestamp(payload.get("exp")) if payload.get("exp") else None,
            client_id=payload.get("client_id"),
        )
    except jwt.InvalidTokenError:
        raise credentials_exception

    return token_data


async def get_current_oauth_user_token_data(request: Request, token: str = Depends(oauth2_scheme)) -> TokenData:
    """
    Get the current user (basic auth)
    """
    if not token:
        if request.user:
            return TokenData(user_id=request.user.id, username=request.user.username)
        # Whether client_id is set determines internal user vs oauth2 user
        return TokenData(client_id=None)

    return await verify_oauth_token(token)


async def get_current_active_user(
    current_user: TokenData = Depends(get_current_oauth_user_token_data),
) -> TokenData:
    """
    Get the current active user
    """
    if current_user.exp and datetime.utcnow() > current_user.exp:
        raise HTTPException(status_code=401, detail="Token expired")

    # Optional: check whether the user is disabled
    if not current_user.is_active:
        raise HTTPException(status_code=403, detail="User disabled")

    return current_user
