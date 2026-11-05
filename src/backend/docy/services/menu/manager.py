"""Menu management (ported from the legacy services/menu/manager.py)."""

from typing import Any, List

from loguru import logger

from docy.bases.base_manager import BaseManager
from docy.crud import menu_dao, role_dao
from docy.exceptions import exception as E
from docy.models.tb_menu import Menu
from docy.schema.menu import CreateMenuParam, UpdateMenuParam
from docy.utils.tree import get_menu_tree_data, get_tree_data


class MenuManager(BaseManager):
    """
    Menus.
    """

    model = Menu
    dao = menu_dao

    async def get_menu_detail(self, pk: str) -> Menu:
        """
        Get the menu details.

        :param pk: Menu ID
        :return:
        """
        menu = await menu_dao.get(self.db, menu_id=pk)
        if not menu:
            raise E.ObjectNotFound("menu not found")
        return menu

    async def get_menu_by_perms(self, perms: str) -> Menu:
        """
        Get the menu object by its permission string.

        :param perms str
        """
        return await self.dao.get_filter(self.db, perms=perms)

    async def get_sidebar(self, role_id: str) -> list[dict[str, Any] | None]:
        """
        Get the user's menu sidebar.

        :return:
        """
        sys_role = await role_dao.select_model(self.db, pk=role_id, load_strategies={'menus': 'selectinload'})  # Preload menus
        menu_ids = set()
        if sys_role:
            for menu in sys_role.menus:
                menu_ids.add(menu.id)
                if menu.parent_id:
                    menu_ids.add(menu.parent_id)
                    await self.db.refresh(menu, attribute_names=["parent"])  # Explicitly refresh the parent object
                    if isinstance(menu, Menu):  # Whether the refresh succeeded
                        if menu.parent.parent_id:
                            menu_ids.add(menu.parent.parent_id)

        menu_data_list = await menu_dao.get_sidebar(self.db, list(menu_ids))

        menu_tree = get_menu_tree_data(menu_data_list)

        return menu_tree

    async def get_full_tree(self, **kwargs) -> list[dict[str, Any]]:
        """
        Get the full menu tree.

        :return:
        """
        menu_data_list = await menu_dao.select_models_order(
            self.db,
            ["type", "sort"],
            ["asc", "asc"],
            is_delete=False,
            **kwargs
        )
        full_menu_tree = get_tree_data(menu_data_list)

        return full_menu_tree

    async def get_tree(self, role_id: str) -> list[dict[str, Any]]:
        """
        Get the menu tree.

        :param role_id:  Role ID
        :return:
        """
        sys_role = await role_dao.select_model(
            self.db,
            pk=role_id,
            load_strategies={'menus': 'selectinload'},
        )  # Preload menus

        menu_tree = get_tree_data([menu for menu in sys_role.menus if menu.type not in [0, 4]])

        return menu_tree

    async def create(self, obj: CreateMenuParam) -> None:
        """
        Create a menu.

        :param obj: Menu creation parameters
        :return:
        """
        title = await menu_dao.get_by_title(self.db, obj.title)
        if title:
            raise E.InvalidArguments("Menu title already exists")
        if obj.parent_id:
            parent_menu = await menu_dao.get(self.db, obj.parent_id)
            if not parent_menu:
                raise E.ObjectNotFound("Parent menu id not found")

        await menu_dao.create(self.db, obj)

    async def update(self, pk: str, obj: UpdateMenuParam) -> int:
        """
        Update a menu.

        :param pk: Menu ID
        :param obj: Menu update parameters
        :return:
        """

        menu = await menu_dao.get(self.db, pk)
        if not menu:
            raise E.ObjectNotFound("Menu not found")
        if obj.title:
            if menu.title != obj.title:
                if await menu_dao.get_by_title(self.db, obj.title):
                    raise E.InvalidArguments("Menu title already exists")
        if obj.parent_id:
            parent_menu = await menu_dao.get(self.db, obj.parent_id)
            if not parent_menu:
                raise E.ObjectNotFound("Parent menu id not found")
            if obj.parent_id == menu.id:
                raise E.InvalidArguments("It is prohibited to associate oneself as a parent")
        count = await menu_dao.update(self.db, pk, obj)

        return count

    async def delete(self, pk: str) -> int:
        """
        Delete a menu.

        :param pk: Menu ID
        :return:
        """
        children = await menu_dao.get_children(self.db, pk)
        if children:
            raise E.InvalidArguments("There are submenus under the menu, which cannot be deleted")

        count = await menu_dao.delete(self.db, pk)
        return count

    async def menus_all_exists(self, menu_ids: List[str]):
        """
        Check whether all the menu IDs exist.
        """
        exists_menu_count = await menu_dao.count(self.db, **{"id__in": menu_ids})
        return exists_menu_count == len(menu_ids)

    async def get_menu_list_by_role_id(self, role_id: str):
        """
        Get the menu list by role ID.
        """
        return await role_dao.get_role_menu_ids(self.db, role_id)

    async def get_menu_parent_ids(self, menu_ids: List[str]) -> List[str]:
        """
        Get the parent menu IDs of the given IDs.
        """
        menu_parent_ids = set()

        menu_list = await menu_dao.select_models(self.db, id__in=menu_ids, load_strategies=['parent'], is_delete=False)
        for menu in menu_list:
            if menu.parent_id:
                menu_parent_ids.add(menu.parent_id)
                if menu.parent.parent_id:
                    menu_parent_ids.add(menu.parent.parent_id)

        return list(menu_parent_ids)

    async def get_menu_default_ids(self) -> List[str]:
        """
        Get the preset menu IDs (support, settings).
        """
        default_menu_perm_tag_list = [
            "sys:academy:view",
            "sys:community:view",
            "sys:support:view",
            "sys:market:view",   # Every role has market by default
        ]

        default_menu_parent_ids = set()

        menu_list = await menu_dao.select_models(
            self.db,
            perms__in=default_menu_perm_tag_list,
            load_strategies=['parent'],  # The parent object must be loaded explicitly
            is_delete=False
        )
        for menu in menu_list:
            default_menu_parent_ids.add(menu.id)
            if menu.parent_id:
                default_menu_parent_ids.add(menu.parent_id)
                if menu.parent.parent_id:
                    default_menu_parent_ids.add(menu.parent.parent_id)

        return list(default_menu_parent_ids)

    async def get_menu_join_button_ids(self, menu_ids: List[str]) -> List[str]:
        """
        Get the list of business-button-level associated button menu IDs.

        Later the permission check will support multiple permissions, so this
        method can be deprecated.
        """
        join_button_menu_ids = []

        create_task_button_perm = "sys:task:add"
        create_task_button_join_perm_list = ["sys:market:save"]

        create_task_button_menu = await self.get_menu_by_perms(create_task_button_perm)
        create_task_join_menu_list = await self.dao.get_filter_list(
            self.db,
            perms__in=create_task_button_join_perm_list,
            load_strategies=["parent"]
        )

        if create_task_button_menu and create_task_button_menu.id in menu_ids:
            # Extract the associated menu IDs (parent menus must be included)
            for menu in create_task_join_menu_list:
                if menu.id not in menu_ids:
                    join_button_menu_ids.append(menu.id)
                    if menu.parent_id:
                        join_button_menu_ids.append(menu.parent_id)
                        join_button_menu_ids.append(menu.parent.parent_id)
        else:
            logger.error(f"get_menu_join_button_ids error: {create_task_button_perm} not found")

        return join_button_menu_ids
