"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/7/16
Last Modified: 2025/7/16
Last Editor:
Filename: utils
Description:
"""

import jwt
from datetime import datetime, timedelta, timezone

from docy.core.settings import ProjectSettings as settings


def generate_opt_token(user_id: str, agent_id: str):
    expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    data = {
        "user_id": user_id,
        "agent_id": agent_id,
        "type": "operation_toke",
        "exp": expire,
        "resource_type": "agent",
    }
    return jwt.encode(
        data, settings.system.SECRET_KEY, algorithm=settings.system.ALGORITHM
    )


def decode_opt_token(token_str):
    try:
        return jwt.decode(
            token_str,
            settings.system.SECRET_KEY,
            algorithms=[settings.system.ALGORITHM],
            options={'verify_exp': False}
        )
    except Exception as e:
        return
