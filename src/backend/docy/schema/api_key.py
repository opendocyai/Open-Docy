"""API key serialization schemas (fields identical to the old schema/api_key.py)."""

from marshmallow import fields, post_dump

from docy.models.tb_apikey import APIKey
from docy.schema import BaseModelSchema, UserSchemaMixin


class ApiKeyRead(UserSchemaMixin, BaseModelSchema):

    create_by = fields.Method("get_fullname")  # Creator display name

    class Meta:
        model = APIKey
        exclude = ("is_delete", "delete_at")

    @post_dump
    def mask_api_key(self, data, many, **kwargs):
        def hide_api_key(v):
            if not v or len(v) <= 8:
                return v or ""
            return f"{v[:8]}{'*' * (len(v) - 8)}"

        # New keys store only the SHA-256 hash; legacy rows still hold plaintext.
        data['api_key_mask'] = hide_api_key(data.get('api_key') or data.get('api_key_hash'))
        data.pop('api_key', None)  # Do not return the raw api_key
        data.pop('api_key_hash', None)
        return data

    def get_fullname(self, obj):
        user_dict = {}

        if isinstance(obj, dict):
            if obj.get('user_id') in self.user_map:
                user_dict = self.user_map[obj.get('user_id')]
        else:
            user_dict = self.user_map[obj.user_id]

        return f'{user_dict["first_name"]} {user_dict["last_name"]}' if user_dict else None


class UnmaskedApiKeyRead(BaseModelSchema):
    class Meta:
        model = APIKey
        exclude = ("is_delete", "delete_at")
