"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/11
Last Modified: 2025/6/11
Last Editor:
Filename: auth
Description:
"""
import time
from typing import Optional
from pydantic import BaseModel
from marshmallow import fields, post_dump
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, field_for, auto_field
from docy.core.storage_drivers import default_s3_client
from docy.models.tb_auth import User
from docy.core.settings import project_settings as settings
from . import BaseModelSchema


class Token(BaseModel):
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    token_type: Optional[str] = "bearer"


class UserSchema(BaseModelSchema):

    class Meta:
        model = User
        exclude = ("password", "upn", "active_code")

    avatar = fields.Method("get_uri")
    customer = fields.Method("get_customer")

    def get_uri(self, obj):
        if obj and obj.avatar:
            return default_s3_client.url(obj.avatar)

    def get_customer(self, obj):
        """Get user."""
        return


class UserSampleSchema(BaseModelSchema):
    avatar = fields.Method("get_uri")

    class Meta:
        model = User
        fields = (
            "id",
            "avatar",
            "email",
            "display",
            "default_color",
            "first_name",
            "last_name",
        )

    def get_uri(self, obj):
        if obj.avatar:
            return default_s3_client.url(obj.avatar)
