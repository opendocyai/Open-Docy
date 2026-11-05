"""Menu data access (ported from the old services/crud/menu.py, without the old CRUDBase mixin)."""

from typing import Optional, Sequence

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped
from sqlalchemy_crud_plus import CRUDPlus

from docy.models.tb_menu import Menu
from docy.schema.menu import CreateMenuParam, UpdateMenuParam


class CRUDMenu(CRUDPlus[Menu]):

    async def get_sidebar(self, db: AsyncSession, menu_ids: list[str] | None) -> Sequence[Menu]:
        """
        Get the user's sidebar menus.

        :param db: database session
        :param menu_ids: menu id list
        :return:
        """
        filters = {'type__in': [0, 1, 4]}

        if menu_ids:
            filters['id__in'] = menu_ids
        else:
            return []

        return await self.select_models_order(db, 'sort', 'asc', **filters)

    async def get(self, db: AsyncSession, menu_id: str) -> Menu | None:
        """
        Get menu details.

        :param db: database session
        :param menu_id: menu id
        :return:
        """
        return await self.select_model(db, menu_id)

    async def get_filter(self, db: AsyncSession, **kwargs) -> Optional[Menu]:
        """
        Get a single menu.

        :param db: database session
        :return:
        """

        return await self.select_model_by_column(db, is_delete=False, **kwargs)

    async def get_filter_list(
            self,
            db: AsyncSession,
            title: Optional[str] = None,
            status: Optional[int] = None,
            **kwargs
    ) -> Sequence[Menu]:
        """
        Get the menu list.

        :param db: database session
        :param title: menu title
        :param status: menu status
        :return:
        """

        if title is not None:
            kwargs['title__like'] = f'%{title}%'
        if status is not None:
            kwargs['status'] = status

        return await self.select_models_order(db, 'sort', 'asc', is_delete=False, **kwargs)

    async def get_all(self, db: AsyncSession, menu_ids: list[int] | None) -> Sequence[Menu]:
        """
        Get all menus.
        """
        filters = {}
        if menu_ids:
            filters['id__in'] = menu_ids
        else:
            return []

        return await self.select_models_order(db, 'sort', 'asc', **filters)

    async def get_by_title(self, db: AsyncSession, title: str) -> Menu | None:
        """
        Get a menu by title.

        :param db: database session
        :param title: menu title
        :return:
        """
        return await self.select_model_by_column(db, title=title, type__ne=2)

    async def create(self, db: AsyncSession, obj: CreateMenuParam) -> Menu:
        """
        Create a menu.

        :param db: database session
        :param obj: create-menu parameters
        :return:
        """
        return await self.create_model(db, obj)

    async def update(self, db: AsyncSession, menu_id: str, obj: UpdateMenuParam) -> int:
        """
        Update a menu.

        :param db: database session
        :param menu_id: menu id
        :param obj: update-menu parameters
        :return:
        """
        return await self.update_model(db, menu_id, obj)

    async def delete(self, db: AsyncSession, menu_id: str) -> int:
        """
        Delete a menu.

        :param db: database session
        :param menu_id: menu id
        :return:
        """
        return await self.delete_model(db, menu_id)

    async def get_children(self, db: AsyncSession, menu_id: str) -> Mapped[list[Menu] | None]:
        """
        Get child menus.

        :param db: database session
        :param menu_id: menu id
        :return:
        """
        menu = await self.select_model(db, menu_id, load_strategies=['children'])
        return menu.children


menu_dao: CRUDMenu = CRUDMenu(Menu)
