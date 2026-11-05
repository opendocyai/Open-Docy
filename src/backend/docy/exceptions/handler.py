"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: handle
Description:
"""
import json
import traceback
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError
from starlette import status
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from loguru import logger
from docy import const
from docy.bases.exception import ProjectBaseException
from .exception import AuthenticateError, LoginThrottled
from docy.core._response import pre_response as R


def register_exception(app: FastAPI):
    """
    Register exception handling logic here.

    :param app:
    :return:
    """

    @app.exception_handler(StarletteHTTPException)
    async def HTTPException(request, exc):
        logger.error(traceback.format_exc())
        return JSONResponse(
            headers=exc.headers,
            status_code=exc.status_code,
            content=R.format(
                status='http exception.',
                code=exc.status_code,
                msg=exc.detail
            )
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request, exc):
        logger.error(f"Request validation error on {request.method} {request.url.path}: {exc.errors()}")
        errors = []
        for e in exc.errors():
            errors.append(get_humon_valid_error(e, request))
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=R.format(
                status="validation error.",
                code=status.HTTP_400_BAD_REQUEST,
                msg='<br/>'.join(errors)
            )
        )

    def get_humon_valid_error(e, request: Request):
        if isinstance(e, dict):
            msg = e.get('ctx', {}).get('reason')
            if request.scope and request.scope.get('auth_type') == const.AT_BEARER_TOKEN:
                if not msg:
                    msg = e.get('msg')
                if msg and not msg.endswith('.'):
                    msg += '.'
            else:
                if not msg:
                    msg = json.dumps(e)
            return msg
        return e

    @app.exception_handler(Exception)
    async def default_exception_handler(request: Request, exc):
        if isinstance(exc, AuthenticateError):
            # CORS headers for 401 responses come from the outermost
            # CORSMiddleware in main.py (configured allowlist), so only the
            # auth challenge header is added here.
            headers = {"WWW-Authenticate": "Bearer"}
            return JSONResponse(
                headers=headers,
                status_code=exc.code,
                content=R.format(
                    status='error',
                    code=exc.code,
                    msg=exc.detail
                )
            )
        elif isinstance(exc, LoginThrottled):
            retry_after = int(exc.meta.get("retry_after", 60)) if exc.meta else 60
            return JSONResponse(
                headers={"Retry-After": str(retry_after)},
                status_code=exc.code,
                content=R.format(
                    status=exc.level,
                    code=exc.code,
                    msg=exc.detail
                )
            )
        elif isinstance(exc, ProjectBaseException):
            return JSONResponse(
                status_code=exc.code,
                content=R.format(
                    status=exc.level,
                    code=exc.code,
                    msg=exc.detail
                )
            )
        elif isinstance(exc, SQLAlchemyError):
            return JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content=R.format(
                    status='operation failed.',
                    code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    msg="Operation failed. Please check the request parameters and try again later."
                )
            )
        else:
            logger.exception(f"Unhandled exception on {request.method} {request.url.path}: {exc}")
            return JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content=R.format(
                    status='server error.',
                    code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    msg="Internal system error. Please contact the administrator."
                )
            )
