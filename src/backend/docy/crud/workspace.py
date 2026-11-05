# -*- coding: utf-8 -*-
# @Time    : 2025/6/16 17:19
# @Author  : yanjia
# @File    : workspace.py
# @Desc    : None
import json
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy_crud_plus import CRUDPlus

from docy.cache.cache_utils import get_from_cache, save_to_cache
from docy.const import CommonRedisKey
from docy.models.tb_workspace import Workspace, WorkspaceMember
from docy.models.tb_role import SysRole


class CRUDWorkspace(CRUDPlus[Workspace]):

    pass

class CRUDWorkspaceMember(CRUDPlus[WorkspaceMember]):

    pass

class CRUDWorkspaceRole(CRUDPlus[SysRole]):

    @staticmethod
    async def get_role_perms(
        db: AsyncSession,
        role_id: str,
        user_id: str,
        space_id: Optional[str] = None
    ) -> List[str]:
        """
        Get button-level role permissions.
        Fetch from cache first, fall back to the database, then write back to cache.
        """
        # 1. If role_id is empty, try to get the user's role from cache or database
        if not role_id:
            if user_id:
                user_check_role_key = CommonRedisKey.get_user_check_role_key(user_id)
                # Get user role info from cache (returns a dict directly; no json.loads needed)
                user_check_role_dict = await get_from_cache(user_check_role_key)
                if user_check_role_dict and user_check_role_dict.get("user_id") == user_id:
                    role_id = user_check_role_dict.get("role_id")
                # On cache miss, query the database (e.g. get the role from the member table)
                if not role_id and space_id:
                    member = await member_dao.select_model_by_column(
                        db, workspace_id=space_id, user_id=user_id
                    )
                    if member:
                        role_id = member.role_id
            # Still no role_id: return an empty list
            if not role_id:
                return []

        # 2. Get permissions by role_id
        role_perms_key = CommonRedisKey.get_role_perms_key(role_id)

        # 2.1 Try the cache for the permission list
        perms_list = await get_from_cache(role_perms_key)
        if perms_list is not None:
            # Cache hit: return directly (note: get_from_cache already deserializes)
            return perms_list

        # 2.2 Cache miss: query the database
        sys_role = await role_dao.select_model(
            db, role_id, load_strategies={"menus": "selectinload"}
        )
        if not sys_role:
            return []

        # Collect menu permissions (deduplicated)
        perms_set = set()
        for menu in sys_role.menus:
            if menu.perms:
                perms_set.add(menu.perms)

        perms_list = list(perms_set)

        # 2.3 Cache the result (only when non-empty; caching an empty list with a short TTL is also an option)
        if perms_list:
            expire_seconds = CommonRedisKey.role_perms_key_expired  # assume this attribute is integer seconds
            await save_to_cache(role_perms_key, perms_list, ex=expire_seconds)

        return perms_list

    @staticmethod
    async def get_role_menu_ids(db: AsyncSession, role_id: str) -> List[str]:
        """Get the role's menu ids."""
        menus = []

        sys_role = await role_dao.select_model(db, role_id, load_strategies={"menus": "selectinload"})
        if sys_role:
            menus = [menu.id for menu in sys_role.menus]
        return menus


workspace_dao: CRUDWorkspace = CRUDWorkspace(Workspace)
member_dao: CRUDWorkspaceMember = CRUDWorkspaceMember(WorkspaceMember)
role_dao: CRUDWorkspaceRole = CRUDWorkspaceRole(SysRole)
