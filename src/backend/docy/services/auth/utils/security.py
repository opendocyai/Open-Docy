"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/7/9
Last Modified: 2025/7/9
Last Editor:
Filename: security
Description:
"""

import hashlib
from typing import Optional
from fastapi.security import OAuth2PasswordBearer
from fastapi import Request
from fastapi.exceptions import HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED
from docy.core.settings import project_settings as settings
from docy.database import get_async_db_connector
from docy.utils.sql_query import async_retrieve_object
from docy.models.tb_apikey import APIKey
from docy import const
from docy.exceptions import exception as PEXCEPTIONS


def generate_signature(data: str, secret_key: str):
    return hashlib.sha256(f"{data}{secret_key}".encode()).hexdigest()


def verify_signature(data: str, secret_key: str, signature: str):
    return generate_signature(data, secret_key) == signature


def validate_api_key(api_key: str, signature: str):
    """
    Same as authenticate_api_key, but the validation logic is encapsulated here
    :param api_key:
    :param signature:
    :return:
    """
    if api_key != settings.security.api_key:
        raise PEXCEPTIONS.APIInvalidError
    if signature and not verify_signature(
            api_key, settings.security.secret_key, signature
    ):
        raise PEXCEPTIONS.SignatureInvalidError
    return api_key


class APIOAuth2PasswordBearer(OAuth2PasswordBearer):

    async def __call__(self, request: Request) -> Optional[str]:
        # Extend token auth to also support API auth
        raise_error = False
        ai_api_key = request.headers.get(const.HD_AI_API_KEY)
        ai_signature = request.headers.get(const.HD_AI_SIGNATURE)
        api_key = request.headers.get(const.HD_API_KEY)
        if all([ai_api_key, ai_signature]):
            try:
                validate_api_key(ai_api_key, ai_signature)
            except:
                raise_error = True
        elif api_key:
            # Validate the user API key
            if await self.validate_user_api_key(api_key):
                raise_error = True
        else:
            return await super().__call__(request)
        if raise_error and self.auto_error:
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED,
                detail="Not authenticated",
                headers={"WWW-Authenticate": "Bearer"},
            )
        else:
            return None

    @staticmethod
    async def validate_user_api_key(api_key):
        async with get_async_db_connector() as db:
            api_key = await async_retrieve_object(
                db, APIKey, condition=[APIKey.api_key == api_key]
            )
            return api_key is None


if __name__ == "__main__":
    print(generate_signature(settings.security.api_key, settings.security.api_key))
