# -*- coding: utf-8 -*-
# @Time    : 2025/7/22 15:32
# @Author  : yanjia
# @File    : message.py
# @Desc    : None
from sqlalchemy_crud_plus import CRUDPlus

from docy.bases.cruds import CRUDBase
from docy.models.tb_message import InnerMessage


class CRUDInnerMessage(CRUDPlus[InnerMessage], CRUDBase):

    async def get_query_set(self, **kwargs):
        sort_columns = kwargs.pop("sort_columns", "created_at")
        sort_orders = kwargs.pop("sort_orders", "desc")

        # Filter by conditions
        if "name" in kwargs:
            if kwargs["name"] is not None:
                kwargs["name__like"] = f'%{kwargs.pop("name")}%'
            else:
                kwargs.pop("name", None)

        # Combine filtering and pagination
        query_set = await self.select_order(
            sort_columns, sort_orders, self.model.is_delete == False, **kwargs
        )
        return query_set


inner_message_dao: CRUDInnerMessage = CRUDInnerMessage(InnerMessage)