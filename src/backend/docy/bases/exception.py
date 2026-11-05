"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: base_exception
Description: 
"""
from typing import Optional


class ProjectBaseException(Exception):
    level: str = 'error'
    detail: str = 'Undefined Exception'
    code: int = 500
    meta: dict = None

    def __init__(self, desc: Optional[str] = None, code: Optional[int] = None, meta: Optional[dict] = None):
        self.detail = desc or self.detail
        self.code = code or self.code
        self.meta = meta or {}

    def __str__(self) -> str:
        return str(self.detail)