"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/9
Last Modified: 2025/6/9
Last Editor:
Filename: __init__.py
Description: common helpers for business logic.
"""

from fastapi import Request, FastAPI
from docy.exceptions import exception as PE
from docy.const import AT_FAKE
from docy.utils.dt import DATE_STANDARD_FORMAT, DATETIME_STANDARD_FORMAT


def create_mock_app(redis_client=None):
    mock_app = FastAPI()
    mock_app.redis_client = redis_client
    return mock_app


def get_mock_request(method="GET", path="/", headers=None, redis_client=None, app=None, user=None):
    mock_app = app or create_mock_app(redis_client)
    scope = {
        "type": "http",
        "method": method,
        "path": path,
        "headers": headers or [],
        "server": ("testserver", 80),
        "app": mock_app,
        "user": user,
        "auth_type": AT_FAKE,
    }
    return Request(scope, mock_app)

def inner_request(request: Request):
    """
    Internal request, used to call external interfaces.
    """
    if request.client.host not in ["localhost", "127.0.0.1"]:
        raise PE.OperationNotAllow("Internal API only, external access prohibited.")
