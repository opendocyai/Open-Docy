# -*- coding: utf-8 -*-
# @Time    : 2025/6/10 17:26
# @Author  : yanjia
# @File    : workspace.py
# @Desc    : workspace definition data responses

from marshmallow import fields

from . import BaseModelSchema, EnumMethodField, GenericObjectSchemaMixin
from docy.core.storage_drivers import default_s3_client
from docy.models.tb_workspace import Workspace


class WorkspaceListSchema(BaseModelSchema):
    space_type = EnumMethodField('space_type')
    auth_type = EnumMethodField('auth_type')
    role_name = fields.Str(attribute='role_name')
    role_type = fields.Str(attribute='role_type')
    role_id = fields.Str(attribute='role_id')
    avatar = fields.Method("get_uri")
    display = fields.Str(attribute='display_name')

    class Meta:
        model = Workspace
        fields = (
            "id",
            "name",
            "description",
            "avatar",
            "user_id",
            "created_at",
            "space_type",
            "role_type",
            "role_id",
            "role_name",
            "default_color",
            "auth_type",
            "display"
        )

    def get_uri(self, obj):
        if obj and obj.avatar:
            return default_s3_client.url(obj.avatar) if obj.avatar else None
        return None


class WorkspaceDetailSchema(BaseModelSchema):
    space_type = EnumMethodField('space_type')
    role_type = EnumMethodField('role_type')
    auth_type = EnumMethodField("auth_type")
    role_name = fields.Str(attribute="role_name")

    class Meta:
        model = Workspace
        load_instance = True

        exclude = ('is_delete', 'delete_at', 'expire_at', 'expire_days')

    avatar = fields.Method("get_uri")

    def get_uri(self, obj):
        if obj and obj.avatar:
            return default_s3_client.url(obj.avatar) if obj.avatar else None
        return None


class WorkspaceCreateSchema(BaseModelSchema):

    space_type = EnumMethodField('space_type')

    class Meta:
        model = Workspace
        fields = (
            "id",
            "name",
            "description",
            "space_type",
            "default_color"
        )
        load_instance = True  # Deserialize
