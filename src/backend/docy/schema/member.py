# -*- coding: utf-8 -*-
# @Time    : 2025/6/12 17:49
# @Author  : yanjia
# @File    : member.py
# @Desc    : None
from datetime import datetime, timezone
from typing import Optional

from pydantic import BaseModel, Field, field_serializer, model_validator
from marshmallow import fields

from . import BaseModelSchema, EnumMethodField, UserSchemaMixin
from .base import SchemaResponseBase
from docy.core.storage_drivers import default_s3_client
from docy.models.tb_workspace import WorkspaceMember, WorkspaceType, MemberType, MemberStatus


class WorkspaceMemberListSchema(UserSchemaMixin, BaseModelSchema):

    space_type = EnumMethodField('space_type')
    role_type = EnumMethodField('role_type')
    status = EnumMethodField('status')

    avatar = fields.Method("get_avatar")
    fullname = fields.Method("get_fullname")
    default_color = fields.Method("get_default_color")

    class Meta:
        model = WorkspaceMember
        exclude = ("delete_at", "is_delete")

    def get_avatar(self, obj):
        if isinstance(obj, WorkspaceMember):
            if obj.email in self.user_map:
                return self.user_map[obj.email]['avatar']
        if isinstance(obj, dict):
            if obj.get('email') in self.user_map:
                return self.user_map[obj.get('email')]['avatar']
        return None

    def get_default_color(self, obj):
        if isinstance(obj, WorkspaceMember):
            if obj.email in self.user_map:
                return self.user_map[obj.email]['default_color']
        if isinstance(obj, dict):
            if obj.get('email') in self.user_map:
                return self.user_map[obj.get('email')]['default_color']
        return None

    def get_fullname(self, obj):
        user_dict = {}
        if isinstance(obj, WorkspaceMember):
            if obj.email in self.user_map:
                user_dict = self.user_map[obj.email]

        if isinstance(obj, dict):
            if obj.get('email') in self.user_map:
                user_dict = self.user_map[obj.get('email')]

        return f'{user_dict["first_name"]} {user_dict["last_name"]}' if user_dict else None


class CreateSpaceMemberSchema(BaseModel):
    workspace_id: str = Field(..., description="Team space id")
    email: str = Field(..., description="Email")
    space_type: WorkspaceType = Field(..., description="Team space type")
    role_id: str = Field(..., description="Team space id")
    role_type: MemberType = Field(..., description="Team space type")
    user_id: Optional[str] = Field(None, description="User id")
    status: Optional[MemberStatus] = Field(MemberStatus.pending, description="Member status")


class MemberListDetailSchema(CreateSpaceMemberSchema, SchemaResponseBase):

    name: str = Field(None, alias="role_name", description="Role name")
    display: Optional[str] = Field(None, alias="fullname", description="User full name")
    avatar: Optional[str] = Field(None, description="Avatar URL")
    default_color: Optional[str] = Field(None, description="Default user color when no avatar")
    status: int
    last_active_at: Optional[datetime] = Field(None, alias="last_active", description='Last active time')

    # Full validation
    @model_validator(mode="before")
    def _validate_member_return(self):

        member, user, role = self
        member_dict = member.to_dict(None, excludes=["is_delete", "delete_at"]) if member else {}
        user_dict = user.to_dict(None, includes=["avatar", "display", "default_color"]) if user else {"display": member_dict.get("email", "").split("@")[0]}
        role_dict = role.to_dict(None, includes=["name"]) if role else {}

        member_return = {
            **member_dict,
            **user_dict,
            **role_dict
        }

        return member_return

    @field_serializer("last_active_at")
    def serialize_last_login(self, last_active_at: datetime) -> Optional[str]:
        if last_active_at:
            return last_active_at.astimezone(timezone.utc).isoformat()
        return None

    @field_serializer("avatar")
    def serialize_avatar(self, avatar: str) -> Optional[str]:
        if avatar:
            return default_s3_client.url(avatar)
        return None
