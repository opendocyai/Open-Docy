"""SQLAlchemy query result serialization helpers (ported from the legacy utils/serializers.py)."""

from decimal import Decimal
from typing import Any, Sequence, TypeVar

from fastapi.encoders import decimal_encoder
from sqlalchemy import Row, RowMapping

RowData = Row | RowMapping | Any

R = TypeVar('R', bound=RowData)


def select_columns_serialize(row: R, excludes: list[str] = None) -> dict[str, Any]:
    """
    Serialize the columns of an SQLAlchemy query table, excluding relationship columns.

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
    Serialize a list of SQLAlchemy query results.

    :param row: SQLAlchemy query result list
    :param excludes: fields to exclude
    :return:
    """
    return [select_columns_serialize(item, excludes) for item in row]
