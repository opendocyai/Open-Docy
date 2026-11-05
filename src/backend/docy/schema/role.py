# -*- coding: utf-8 -*-
# @Time    : 2025/11/13 18:59
# @Author  : yanjia
# @File    : role.py
# @Desc    : None
from typing import Optional
from pydantic import Field

from docy.models.tb_role import SysRole, MemberType

from docy.forms.role import RoleCreateForm, RoleUpdateForm
from . import BaseModelSchema, EnumMethodField

class RoleCreateSchema(RoleCreateForm):

    role_type: Optional[MemberType] = Field(MemberType.MEMBER, description="Role type")

class RoleCreateOwnerSchema(RoleCreateForm):
    """Owner role without space_id"""

    space_id: Optional[str] = Field(None, description="space id")
    role_type: MemberType = Field(MemberType.MEMBER, description="Role type")

class RoleUpdateSchema(RoleUpdateForm):
    """Role update"""


class RoleOptionListSchema(BaseModelSchema):
    """
    Role list
    """

    class Meta:
        model = SysRole
        load_instance = True  # deserialize to model instances
        exclude = (
            "is_delete", "delete_at"
        )
