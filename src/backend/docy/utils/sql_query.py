"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: sql_query
Description: common query helpers.
"""

from typing import Optional, List, Any
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.sql import Select
from sqlalchemy import or_
from docy.const import _TB_IMPORT_REGISTRY


def retrieve_object_queryset(
        db: Session,
        model,
        condition: Optional[List] = None,
        o_id: Optional[str] = None,
        is_delete: Optional[bool] = False,
        order_by: Optional[List[Any]] = None,
) -> Any:
    queryset = db.query(model)
    if o_id:
        queryset = db.query(model).filter(model.id == o_id)
    if condition:
        queryset = queryset.filter(*condition)
    if is_delete is not None:
        queryset = queryset.filter(model.is_delete == is_delete)
    # apply ordering conditions
    if order_by:
        queryset = queryset.order_by(*order_by)
    return queryset


def list_object_query_set(
        db: Session,
        model,
        condition: Optional[List] = None,
        o_id: Optional[str] = None,
        is_delete: Optional[bool] = False,
        order_by: Optional[List[Any]] = None,
) -> Any:
    return retrieve_object_queryset(db, model, condition, o_id, is_delete, order_by)

def retrieve_object(
        db: Session,
        model,
        condition: Optional[List] = None,
        o_id: Optional[str] = None,
        is_delete: Optional[bool] = False,
        order_by: Optional[List[Any]] = None,
):
    return retrieve_object_queryset(db, model, condition, o_id, is_delete, order_by).first()

def list_objects(
        db: Session,
        model,
        condition: Optional[List] = None,
        o_id: Optional[str] = None,
        is_delete: Optional[bool] = False,
        order_by: Optional[List[Any]] = None,
) -> Any:
    return retrieve_object_queryset(db, model, condition, o_id, is_delete, order_by).all()


async def async_retrieve_object_queryset(
        db: AsyncSession,
        model,
        fields: List[str] | None = None,
        condition: Optional[List] = None,
        o_id: Optional[str] = None,
        is_delete: Optional[bool] = False,
        order_by: Optional[List] = None,
) -> Any:
    if fields:
        columns = [getattr(model, field) for field in fields]
        stmt: Select = select(*columns)
    else:
        stmt: Select = select(model)

    if o_id:
        stmt = stmt.where(model.id == o_id)
    if condition:
        stmt = stmt.where(*condition)
    if is_delete is not None:
        stmt = stmt.where(model.is_delete == is_delete)
    if order_by:
        stmt = stmt.order_by(*order_by)
    return stmt


async def async_retrieve_object(
        db: AsyncSession,
        model,
        fields: List[str] | None = None,
        condition: Optional[List] = None,
        o_id: Optional[str] = None,
        is_delete: Optional[bool] = False,
        order_by: Optional[List] = None,
):
    """
    Fetch one row asynchronously; for scenarios with a single matching object.
    """
    stmt = await async_retrieve_object_queryset(
        db, model, fields, condition, o_id, is_delete, order_by
    )
    result = await db.execute(stmt)
    try:
        record = result.scalars().first()
    except:
        return
    return record


async def async_list_objects(
        db: AsyncSession,
        model,
        fields: List[str] | None = None,
        condition: Optional[List] = None,
        o_id: Optional[str] = None,
        is_delete: Optional[bool] = False,
        order_by: Optional[List] = None,
):
    """
    Fetch a list of rows from the database asynchronously.
    """
    stmt = await async_retrieve_object_queryset(
        db, model, fields, condition, o_id, is_delete, order_by
    )
    result = await db.execute(stmt)
    if fields and len(fields) > 1:
        # with multiple fields, return a list of tuples
        return result.all()  # returns a list of Row objects
    else:
        # with a single field or the full object, return a list of scalars
        return result.scalars().all()


def get_model_by_type(resource_type: str):
      entry = _TB_IMPORT_REGISTRY.get(resource_type)
      if not entry:
          raise ValueError(f"not support resource type: {resource_type}")
      module_path, class_name = entry
      module = __import__(module_path, fromlist=[class_name])
      return getattr(module, class_name)