# -*- coding: utf-8 -*-
# @Time    : 2025/6/10 17:36
# @Author  : yanjia
# @File    : workspace.py
# @Desc    : Workspace form validation
from typing import Optional
from pydantic import BaseModel, Field, ValidationError, field_validator, EmailStr
from docy.models.tb_workspace import WorkspaceType, MemberType


class UpdateWorkspaceForm(BaseModel):
    name: str = Field(description='Workspace name', min_length=1, max_length=64)
    avatar: str | None = Field(description='Avatar', default=None)
    description: str | None = Field(description='Description', default=None, max_length=500)

class CreateWorkspaceForm(BaseModel):
    name: str = Field(description='Team workspace name', min_length=1, max_length=64)
    description: str | None = Field(None, description='Team workspace description', max_length=500)
    user_id: str | None = Field(None, description='User id')
    space_type: WorkspaceType = Field(WorkspaceType.TEAM, description='Workspace type')

    @field_validator('name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v

class SendInviteEmailPostForm(BaseModel):
    email_list: list[EmailStr] = Field(description='Email list', min_length=1)
    invite_link: str | None = Field(None, description='Invite link')
    space_id: str = Field(description='Team workspace id')
    expire_days: int | None = Field(description='Expiration days', default=7)
    role_id: str = Field(..., description="Role id")

class UpdateMemberRoleInfo(BaseModel):

    role_id: str = Field(..., description="Role id")
    role_type: Optional[MemberType] = Field(None, description="Role type")