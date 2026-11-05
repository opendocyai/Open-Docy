"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/7/9
Last Modified: 2025/7/9
Last Editor:
Filename: common
Description:
"""

from marshmallow import fields, post_dump
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, field_for, auto_field
from docy.core.storage_drivers import default_s3_client
from docy.models.tb_common import FileUpload
from . import BaseModelSchema


class FileSchema(BaseModelSchema):
    class Meta:
        model = FileUpload

    url = fields.Method("get_uri")

    def get_uri(self, obj):
        if obj and obj.file_key:
            return default_s3_client.url(obj.file_key)
