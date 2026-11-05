"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/9
Last Modified: 2025/6/9
Last Editor:
Filename: __init__.py
Description: schemas required for data serialization
"""

from enum import Enum
from typing import List
from marshmallow import fields, Schema, ValidationError, pre_dump
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from docy.database import get_sync_db_connector
from docy.core._string import import_string
from docy.utils.sql_query import list_object_query_set
from docy.services.auth.utils.user import get_user_model


class BaseModelSchema(SQLAlchemyAutoSchema):
    def dump(self, obj, *, many=None, **kwargs):
        # If the passed object is None, return None directly
        if obj is None:
            if many:
                return []
            return None
        return super().dump(obj, many=many, **kwargs)

    # The same handling is needed for dumps (serialize to a JSON string)
    def dumps(self, obj, *, many=None, **kwargs):
        if obj is None:
            if many:
                return "[]"
            return "null"
        return super().dumps(obj, many=many, **kwargs)


class EnumMethodField(fields.Method):
    def __init__(self, field_name, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.field_name = field_name

    def _serialize(self, value, attr, obj, **kwargs):
        if isinstance(obj, dict):
            field_value = obj.get(self.field_name)
        else:
            field_value = getattr(obj, self.field_name, None)
        if isinstance(field_value, Enum):
            return field_value.value
        return field_value


class UserSchemaMixin:

    def __init__(
            self,
            instance_ids: List[str] = None,
            filed_names: List[str] = None,
            *args,
            **kwargs,
    ):
        super().__init__(*args, **kwargs)
        self.user_map = self.get_user_map(instance_ids, filed_names)

    def get_user_map(self, instance_ids, filed_names) -> dict:
        from docy.schema.auth import UserSchema
        if not instance_ids or not filed_names:
            return {}
        ids = []
        additional_names = []
        user_model = get_user_model()
        for f in filed_names:
            additional_names.append(getattr(self.Meta.model, f))
        with get_sync_db_connector() as db:
            model = self.Meta.model
            qs = (
                db.query(model)
                .filter(model.id.in_(instance_ids))
                .with_entities(*additional_names)
                .all()
            )
            [ids.extend(i) for i in qs]
            if "email" in filed_names:  # Support email-based association
                email_ids = list(set(ids))
                qs = list_object_query_set(
                    db, user_model, condition=[user_model.email.in_(email_ids)]
                )
                return dict([(u["email"], u) for u in UserSchema().dump(qs, many=True)])
            else:
                user_ids = list(set(ids))
                qs = list_object_query_set(
                    db, user_model, condition=[user_model.id.in_(user_ids)]
                )
                return dict([(u["id"], u) for u in UserSchema().dump(qs, many=True)])


class GenericObjectSchemaMixin:
    """
    Supports more generic associated fields
    """

    def __init__(
            self,
            instance_ids: List[str] | None = None,
            filed_settings: List[str] | None = None,
            *args,
            **kwargs,
    ):
        """
        Config for objects of different fields, e.g.
        instance_ids: IDs of all objects to query
        filed_settings: config of the fields to query, as follows
        [
            {
                'set_name': 'user_set',
                'schema': 'schema.auth.UserSchema',
                'filed_names':['owner', 'creator']
            },
            ...
        ]
        """
        super().__init__(*args, **kwargs)
        if not filed_settings and hasattr(self, "filed_settings"):
            filed_settings = self.filed_settings
        if not instance_ids and not filed_settings:
            self.has_associated_map = False
            return
        else:
            self.has_associated_map = True
        model = self.Meta.model
        self.additional_names = []
        field_names = []
        [field_names.extend(s["filed_names"]) for s in filed_settings]
        for f in field_names:
            if hasattr(model, f):
                self.additional_names.append(f)
        with get_sync_db_connector() as db:
            qs = db.query(model).filter(model.id.in_(instance_ids))
            # Iterate the whole config and add each setting
            for setting in filed_settings:
                self.set_map(db, qs, model, **setting)

    def set_map(self, db, qs, model, set_name, schema, filed_names):
        ids = []
        additional_names = []
        schema_class = import_string(schema)
        for f in filed_names:
            if f in self.additional_names:
                additional_names.append(getattr(model, f))
        qs = qs.with_entities(*additional_names).all()
        [ids.extend(i) for i in qs]
        obj_model = schema_class.Meta.model
        qs = list_object_query_set(
            db, obj_model, condition=[obj_model.id.in_(list(set(ids)))]
        )
        if getattr(self, set_name, None):
            ori_dict = getattr(self, set_name)
            ori_dict |= dict([(u["id"], u) for u in schema_class().dump(qs, many=True)])
        else:
            if issubclass(schema_class, GenericObjectSchemaMixin):
                setattr(
                    self,
                    set_name,
                    dict([(u["id"], u) for u in schema_class(instance_ids=[q.id for q in qs]).dump(qs, many=True)]),
                )
            else:
                setattr(
                    self,
                    set_name,
                    dict([(u["id"], u) for u in schema_class().dump(qs, many=True)]),
                )
