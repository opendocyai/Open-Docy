"""Role-menu binding management (ported from the legacy services/menu/role.py)."""

from typing import List

from sqlalchemy import delete
from loguru import logger

from docy.bases.base_manager import BaseManager
from docy.models.tb_role import sys_role_menu


class RoleMenuManager(BaseManager):
    """
    Role menus.
    """

    model = sys_role_menu

    async def clear_role_menu_bind(self, role_id: str):
        """
        Clear the role-menu bindings.
        """

        await self.db.execute(delete(sys_role_menu).where(sys_role_menu.c.role_id == role_id))
        await self.db.commit()

    async def role_menu_bind(self, role_id: str, menu_ids: List[str]):
        """
        Bind menus to a role.
        """

        values = [{"role_id": role_id, "menu_id": mid} for mid in menu_ids]
        await self.db.execute(sys_role_menu.insert().values(values))
        await self.db.commit()
