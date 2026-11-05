# -*- coding: utf-8 -*-
# @File    : role.py
# @Desc    : Role form validation
from typing import Optional

from pydantic import BaseModel, Field


class RoleCreateForm(BaseModel):
    space_id: Optional[str] = Field(None, description="Workspace id")
    name: str = Field(..., min_length=1, max_length=64, description="Role name")
    remark: Optional[str] = Field(None, max_length=512, description="Remark")
    status: int = Field(1, description="Role status (0 disabled, 1 enabled)")
    sort: int = Field(10, description="Sort order")


class RoleUpdateForm(BaseModel):
    space_id: Optional[str] = Field(None, description="Workspace id")
    name: Optional[str] = Field(None, min_length=1, max_length=64, description="Role name")
    remark: Optional[str] = Field(None, max_length=512, description="Remark")
    status: Optional[int] = Field(None, description="Role status (0 disabled, 1 enabled)")
    sort: Optional[int] = Field(None, description="Sort order")


class RoleMenuAssign(BaseModel):
    role_id: str
    menu_ids: list[str]   # List of menu ids to assign (button/menu/directory)


class RoleMenuOut(BaseModel):
    role_id: str
    menu_ids: list[str]


class MenuOut(BaseModel):
    id: str
    title: str
    name: str
    path: str | None
    type: int
    icon: str | None
    checked: bool = False
    children: list["MenuOut"] = []
