# -*- coding: utf-8 -*-
# @Time    : 2025/6/26 17:59
# @Author  : yanjia
# @File    : base.py
# @Desc    : None
from typing import Dict
from datetime import datetime, timezone

from sqlalchemy_crud_plus.types import Model
from sqlalchemy.ext.asyncio import AsyncSession

from docy.exceptions import exception as E


class CRUDBase:

    @staticmethod
    async def attach_sort_columns_orders_info(model: Model, kwargs: Dict) -> Dict:
        """Attach sort fields and sort orders."""
        try:
            order_by_list = kwargs.pop("order_by_list", [])
            sort_columns, sort_orders = [], []
            if  not order_by_list:
                return kwargs
            for sort_column, sort_order in order_by_list:
                if not hasattr(model, sort_column):
                    raise E.InvalidArguments(f'Invalid arguments orderBy: {sort_column}.{sort_order}')
                sort_columns.append(sort_column)
                sort_orders.append(sort_order)
            if sort_columns and sort_orders:
                kwargs["sort_columns"] = sort_columns
                kwargs["sort_orders"] = sort_orders
        except Exception as e:
            print(f"attach_sort_columns_orders_info error: {e}")
        return kwargs

    @staticmethod
    async def soft_delete_by_id(db: AsyncSession, model: Model, obj_id: str) -> None:
        try:
            obj = await db.get(model, obj_id)
            if not obj:
                raise Exception(f"soft_delete obj_id not found: {obj_id}")
            obj.is_delete = True
            obj.delete_at = datetime.now(timezone.utc)

            await db.commit()
        except Exception as e:
            raise Exception(f"soft_delete_by_id {obj_id} error: {e}")