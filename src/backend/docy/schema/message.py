# -*- coding: utf-8 -*-
# @Time    : 2025/7/22 16:09
# @Author  : yanjia
# @File    : message.py
# @Desc    : None

from marshmallow import fields

from . import BaseModelSchema, UserSchemaMixin
from docy.models.tb_message import InnerMessage


class InnerMessageSchema(BaseModelSchema):

    model = fields.Method("model_to_title")

    class Meta:
        model = InnerMessage
        exclude = ("is_delete", "delete_at", "raw_data", "inner_path")

    def model_to_title(self, obj):
        return str(obj.model).title()