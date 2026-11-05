# -*- coding: utf-8 -*-
# @Time    : 2025/8/4 20:21
# @Author  : yanjia
# @File    : serializers.py
# @Desc    : None
from datetime import datetime
from decimal import Decimal
from typing import Any, Sequence, TypeVar
from pydantic import BaseModel, ConfigDict

from fastapi.encoders import decimal_encoder
from msgspec import json
from sqlalchemy import Row, RowMapping
from sqlalchemy.orm import ColumnProperty, SynonymProperty, class_mapper
from starlette.responses import JSONResponse

from docy.utils.dt import DATETIME_STANDARD_FORMAT

RowData = Row | RowMapping | Any

R = TypeVar('R', bound=RowData)


def select_columns_serialize(row: R, excludes: list[str] = None) -> dict[str, Any]:
    """
    Serialize the columns of a SQLAlchemy query table, excluding related columns

    :param row: SQLAlchemy query result row
    :param excludes: fields to filter out
    :return:
    """
    result = {}
    for column in row.__table__.columns.keys():
        if excludes and column in excludes:
            continue
        value = getattr(row, column)
        if isinstance(value, Decimal):
            value = decimal_encoder(value)
        result[column] = value
    return result


def select_list_serialize(row: Sequence[R], excludes: list[str] = None) -> list[dict[str, Any]]:
    """
    Serialize a SQLAlchemy query result list

    :param row: SQLAlchemy query result list
    :param excludes: fields to exclude
    :return:
    """
    return [select_columns_serialize(item, excludes) for item in row]


def select_as_dict(row: R, use_alias: bool = False) -> dict[str, Any]:
    """
    Convert a SQLAlchemy query result to a dict; may include related data

    :param row: SQLAlchemy query result row
    :param use_alias: whether to use aliases as column names
    :return:
    """
    if not use_alias:
        result = row.__dict__
        if '_sa_instance_state' in result:
            del result['_sa_instance_state']
    else:
        result = {}
        mapper = class_mapper(row.__class__)  # type: ignore
        for prop in mapper.iterate_properties:
            if isinstance(prop, (ColumnProperty, SynonymProperty)):
                key = prop.key
                result[key] = getattr(row, key)

    return result


class MsgSpecJSONResponse(JSONResponse):
    """
    Response class that serializes data to JSON using the high-performance msgspec library
    """

    def render(self, content: Any) -> bytes:
        return json.encode(content)


class SchemaBase(BaseModel):
    """Base model configuration"""

    model_config = ConfigDict(
        use_enum_values=True,
        json_encoders={datetime: lambda x: x.strftime(DATETIME_STANDARD_FORMAT)},
    )
