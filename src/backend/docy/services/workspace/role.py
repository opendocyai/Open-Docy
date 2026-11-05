# -*- coding: utf-8 -*-
# @Time    : 2025/6/13 13:43
# @Author  : yanjia
# @File    : role_menu.py
# @Desc    : Team space role logic
from typing import Dict, List, Tuple
from loguru import logger

from docy.bases.base_manager import BaseManager
from docy.models.tb_workspace import MemberType
from docy.models.tb_role import SysRole
from docy.schema.role import RoleCreateSchema, RoleUpdateSchema, RoleCreateOwnerSchema
from docy.crud import role_dao, member_dao
from docy.exceptions.exception import RequestError

class RoleManager(BaseManager):
    """
    Role module logic.
    """

    model = SysRole
    dao = role_dao

    async def get_role_by_id(self, _id: str) -> SysRole:

        return await self.dao.select_model(self.db, _id, is_delete=False)

    async def get_role_by_name(self, name: str) -> SysRole:
        return await self.dao.select_model_by_column(self.db, name=name, is_delte=False)

    async def get_role(self, **kwargs) -> SysRole:
        """
        Get a role.
        """
        return await self.dao.select_model_by_column(self.db, is_delete=False, **kwargs)

    async def get_role_list(self, **kwargs):
        """
        Get the role list.
        """
        return await self.dao.select_models_order(
            self.db,
            ["sort", "created_at"],
            ["asc", "asc"],
            is_delete=False,
            **kwargs
        )

    async def get_or_create_role(self, role_type: MemberType = MemberType.OWNER, **kwargs) -> Tuple[SysRole, bool]:
        """
        Get or create a team role.

        {
            "space_id": "",
            "name": "",
            "remark": "",
        }

        """
        if role_type == MemberType.OWNER:
            role = await self.get_role(role_type=role_type)
            if role:
                return role, True
            else:
                role = await self.dao.create_model(
                    self.db,
                    RoleCreateOwnerSchema(
                        name=str(role_type.value),
                        role_type=role_type,
                        remark=str(role_type.value)
                    ),
                    flush=True,
                    commit=True
                )
                return role, False
        else:
            role = await self.get_role(
                role_type=role_type,
                space_id=kwargs.get("space_id"),
                name=kwargs.get("name", "Member"),
            )
            if role:
                return role, True
            else:
                role = await self.dao.create_model(
                    self.db,
                    RoleCreateSchema(
                        name=kwargs.pop("name", "Member"),
                        role_type=role_type,
                        **{k: v for k, v in kwargs.items() if v is not None},
                    ),
                    flush=True,
                    commit=True
                )
                return role, False

    async def get_role_type_id_dict(self) -> Dict[str, str]:
        """
        Get the dict mapping role types to IDs.
        """
        role_type_id_dict = {}
        role_list = await role_dao.select_models(self.db, is_delete=False)

        for role in role_list:
            role_type_id_dict[role.role_type] = role.id

        return role_type_id_dict

    async def get_role_perms(self, role_id: str, user_id: str) -> List[str]:
        """
        Get the button-level permissions of the role.
        """

        return await role_dao.get_role_perms(self.db, role_id, user_id)

    async def update_role(self, role_id: str, update_role_schema: RoleUpdateSchema) -> int:
        """
        Update a role.
        """
        return await self.dao.update_model(self.db, role_id, update_role_schema)

    async def delete_roles(self, ids: List[str], soft_delete: bool = True
    ) -> int:
        """Delete roles."""
        # Check the members already bound to the role
        if await member_dao.exists(self.db, is_delete=False, role_id__in=ids):
            logger.error(f"delete_roles error: space member use role: {ids}")
            raise RequestError(desc="Role is assigned to users and cannot be deleted.")

        delete_rows = await role_dao.delete_model_by_column(
            self.db,
            allow_multiple=len(ids) > 1,
            logical_deletion=soft_delete,
            deleted_flag_column="is_delete",
            deleted_at_column="delete_at",
            flush=True,
            commit=True,
            id__in=ids,
            is_delete=False,
        )

        return delete_rows
