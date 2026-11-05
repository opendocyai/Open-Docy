"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/16
Last Modified: 2025/6/16
Last Editor:
Filename: template.py
Description: document template CRUD
"""

from typing import Dict

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy_crud_plus import CRUDPlus

from docy.exceptions import exception as E
from docy.models.tb_template import DocumentTemplate


class CRUDocumentTemplate(CRUDPlus[DocumentTemplate]):

    @staticmethod
    async def attach_sort_columns_orders_info(model, kwargs: Dict) -> Dict:
        """Attach sort columns and sort orders."""
        try:
            order_by_list = kwargs.pop("order_by_list", [])
            sort_columns, sort_orders = [], []
            if not order_by_list:
                return kwargs
            for sort_column, sort_order in order_by_list:
                if not hasattr(model, sort_column):
                    raise E.InvalidArguments(
                        f"Invalid arguments orderBy: {sort_column}.{sort_order}"
                    )
                sort_columns.append(sort_column)
                sort_orders.append(sort_order)
            if sort_columns and sort_orders:
                kwargs["sort_columns"] = sort_columns
                kwargs["sort_orders"] = sort_orders
        except Exception as e:
            print(f"attach_sort_columns_orders_info error: {e}")
        return kwargs

    async def get_list(self, session: AsyncSession, **kwargs):
        """Get the list."""
        sort_columns = kwargs.pop("sort_columns", "created_at")
        sort_orders = kwargs.pop("sort_orders", "desc")

        # Combine filtering and pagination
        result = await self.select_models_order(
            session,
            sort_columns,
            sort_orders,
            self.model.is_delete == False,
            **kwargs
        )
        return result

    async def get_query_set(self, **kwargs):
        sort_columns = kwargs.pop("sort_columns", "created_at")
        sort_orders = kwargs.pop("sort_orders", "desc")

        # Combine filtering and pagination
        query_set = await self.select_order(
            sort_columns, sort_orders, self.model.is_delete == False, **kwargs
        )
        return query_set


template_dao: CRUDocumentTemplate = CRUDocumentTemplate(DocumentTemplate)
