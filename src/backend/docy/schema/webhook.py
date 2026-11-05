"""Webhook serialization schemas (fields identical to the old schema/webhook.py)."""

from marshmallow import fields

from docy.models.tb_webhook import Webhooks
from docy.schema import BaseModelSchema, EnumMethodField


class WebhookDetailSchema(BaseModelSchema):
    status = EnumMethodField("status")

    class Meta:
        model = Webhooks
        fields = ("id", "endpoint", "description", "status")


class WebhookCreateSchema(BaseModelSchema):
    status = EnumMethodField("status")
    secret = fields.String(attribute="signature", dump_only=True)

    class Meta:
        model = Webhooks
        fields = ("id", "endpoint", "secret", "description", "status")
