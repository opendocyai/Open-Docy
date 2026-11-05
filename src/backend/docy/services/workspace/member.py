# -*- coding: utf-8 -*-
# @Time    : 2025/6/12 14:48
# @Author  : yanjia
# @File    : member.py
# @Desc    : Workspace member association table
from datetime import datetime, UTC
from typing import Dict, Optional, List

from sqlalchemy import select, func, and_
from sqlalchemy.orm import aliased
from sqlalchemy_crud_plus import JoinConfig
from loguru import logger

from docy.bases.base_manager import BaseManager
from docy.core.pagination import AsyncPagination
from docy.core.settings import project_settings as settings
from docy.forms.workspace import UpdateMemberRoleInfo
from docy.schema.workspace import WorkspaceListSchema
from docy.schema.member import CreateSpaceMemberSchema
from docy.crud import member_dao, user_dao, workspace_dao, role_dao
from docy.exceptions import exception as E
from docy.models.tb_auth import User
from docy.models.tb_workspace import WorkspaceMember, Workspace, MemberType, WorkspaceType, MemberStatus
from docy.utils.sql_query import async_retrieve_object, async_list_objects

from docy.services.workspace.role import RoleManager



class MemberManager(BaseManager):
    """
    Logic for the workspace member module.
    """

    model = WorkspaceMember
    dao = member_dao

    async def get_workspace_member_by_id(self, _id) -> Optional[Workspace]:
        return await self.db.get(self.model, _id)

    async def get_workspaces_by_user(self, user_id: str) -> List[Workspace]:

        return await async_list_objects(
            self.db, WorkspaceMember, condition=[WorkspaceMember.user_id == user_id]
        )

    async def get_space_member(self, **kwargs) -> WorkspaceMember:
        """
        Get the workspace member object.
        """
        return await self.dao.select_model_by_column(self.db, is_delete=False, **kwargs)

    async def create_workspace_member(
            self, workspace_member_dict: dict
    ) -> Optional[str]:
        """
        Create a workspace member.

        :param workspace_member_dict: dict

        example: {
            "workspace_id": "123456",
            "user_id": "123456",
            "email": "example@qq.com",
            "role_id": "123456",
            "space_type": WorkspaceType.PERSONAL,
        }
        """
        # Check whether the workspace member already exists
        exists_workspace_member = await self.get_space_member(
            **{
                "user_id": workspace_member_dict.get("user_id"),
                "email": workspace_member_dict.get("email"),
                "workspace_id": workspace_member_dict.get("workspace_id"),
            }
        )

        if exists_workspace_member:
            raise E.RequestError("workspace member already exists")
        try:
            db_workspace = self.model(**workspace_member_dict)

            self.db.add(db_workspace)
            await self.db.commit()
            await self.db.refresh(db_workspace)
            workspace_member_id = db_workspace.id

        except Exception as e:
            logger.error(f"create_workspace_member error: {e}")
            await self.db.rollback()
            raise e

        return workspace_member_id

    # Define a helper that converts query results into a serializable format
    @staticmethod
    async def process_rows(rows: List[Dict]) -> List[Dict]:
        processed_rows = []
        for row in rows:
            member = row[0]
            avatar = row[1]
            first_name = row[2]
            last_name = row[3]
            default_color = row[4]
            processed_rows.append(
                {
                    "id": member.id,
                    "avatar": avatar,
                    "fullname": f"{first_name} {last_name}",
                    "workspace_id": member.workspace_id,
                    "user_id": member.user_id,
                    "role_id": member.role_id,
                    "space_type": member.space_type,
                    "role_type": member.role_type,
                    "default_color": default_color,
                    "email": member.email,
                    "created_at": member.created_at,
                }
            )
        return processed_rows

    async def get_workspace_member_list(
            self, workspace_id: str
    ) -> List[Dict]:
        """Get the workspace member list."""
        query_set = (
            select(
                self.model,
                User.avatar,
                User.first_name,
                User.last_name,
                User.default_color,
            )
            .join(User, User.id == self.model.user_id)  # noqa
            .where(self.model.workspace_id == workspace_id)
        )

        result = await self.db.execute(query_set)
        return await self.process_rows(result.all())

    async def get_workspace_member_paginated(self, workspace_id: str, page=1, page_size=settings.system.PAGE_SIZE):
        """Paginated query."""

        query_set = await member_dao.select(
            self.model.workspace_id == workspace_id, user_id__is_not=None, is_delete=False)
        pagination = AsyncPagination(self.db, query_set, page=page, page_size=page_size)

        paginated_data: dict = await pagination.get_paginated_data()

        return paginated_data

    @staticmethod
    async def get_member_queryset(**kwargs):
        """
        Paginated query (new).
        """

        user_alias = aliased(user_dao.model)
        role_alias = aliased(role_dao.model)

        query_set = await member_dao.select_order(
            kwargs.pop("sort_columns", "created_at"),
            kwargs.pop("sort_orders", "asc"),
            join_conditions=[
                JoinConfig(
                    model=user_alias,
                    join_on=and_(
                        member_dao.model.user_id == user_alias.id,
                        user_alias.is_delete == False
                    ),
                    join_type="left",
                    fill_result=True,
                ),
                JoinConfig(
                    model=role_alias,
                    join_on=and_(
                        member_dao.model.role_id == role_alias.id,
                        role_alias.is_delete == False
                    ),
                    join_type="inner",
                    fill_result=True,
                ),
            ],
            is_delete=False,
            **kwargs,
        )

        return query_set

    async def delete_workspace_member_by_id(self, _id: str) -> None:
        """
        Remove a team space member by ID.
        """
        db_workspace_member = await self.get_workspace_member_by_id(_id)
        if not db_workspace_member:
            raise E.TeamspaceMemberNotFound()
        # Get the workspace
        teamspace = await workspace_dao.select_model(
            self.db, db_workspace_member.workspace_id, is_delete=False
        )
        if not teamspace:
            raise E.TeamspaceNotFound()
        # Check whether the operator is the workspace owner
        if self.request and self.request.user:
            if self.request.user.id != teamspace.user_id:
                raise E.RequestError("The current user is not a team owner")

        await self.db.delete(db_workspace_member)
        await self.db.commit()

        return None

    async def add_member(self, create_member_schema: CreateSpaceMemberSchema) -> Optional[str]:
        """
        Add a member.
        """

        # Check for duplicates
        exists_workspace_member = await self.get_space_member(
            workspace_id=create_member_schema.workspace_id,
            email=create_member_schema.email,
            status=MemberStatus.pending
        )
        if exists_workspace_member:
            logger.error(f"workspace member already exists: {create_member_schema.model_dump()}")
            return exists_workspace_member

        return await self.dao.create_model(self.db, create_member_schema, flush=True, commit=True)

    async def get_teamspace_member_count(self, space_id: str, _filter: dict) -> int:
        """
        Get the team space member count.
        """
        return await member_dao.count(self.db, self.model.workspace_id == space_id, **_filter)

    async def leave_teamspace(self, space_id: str, user_id: str) -> None:
        """
        Leave the team.
        """
        teamspace_member = await async_retrieve_object(
            self.db,
            self.model,
            condition=[
                self.model.workspace_id == space_id,
                self.model.user_id == user_id
            ],
        )
        if teamspace_member:
            await self.db.delete(teamspace_member)
            await self.db.commit()

    async def update_member_info_for_teamspace(self, member_id: str, email: str):
        """

        After a new user creates a personal space, look up member records
        that were invited while logged out.
        """

        _filter = {
            "user_id": None,
            "email": email,
            "space_type": WorkspaceType.TEAM,
            "role_type": MemberType.MEMBER,
            "is_delete": False,
        }

        members = await member_dao.select_models(self.db, **_filter)
        for member in members:
            member.user_id = member_id

        await self.db.commit()

    async def delete_workspace_member(self, space_id: str, soft_delete: bool = True) -> int:
        """
        Delete workspace members.

        Mainly deletes owner members.
        """

        if not soft_delete:
            delete_rows = await member_dao.delete_model_by_column(
                self.db,
                allow_multiple=True,
                flush=True,
                commit=True,
                workspace_id=space_id,
                is_delete=False,
            )
        else:
            delete_rows = await member_dao.delete_model_by_column(
                self.db,
                allow_multiple=True,
                logical_deletion=soft_delete,
                deleted_flag_column="is_delete",
                deleted_at_column="delete_at",
                flush=True,
                commit=True,
                workspace_id=space_id,
                is_delete=False,
            )

        return delete_rows

    async def update_member_role_info(self, member_id: str, update_member_schema: UpdateMemberRoleInfo):
        """
        Update the workspace member role info.
        """

        role = await RoleManager(self.db).get_role_by_id(update_member_schema.role_id)
        if not role:
            raise E.ObjectNotFound()
        if role.role_type == MemberType.OWNER:
            logger.error(f"update_member_role_info error: cannot be modified to the owner {update_member_schema}")
            raise E.RequestError(desc="The group of a member cannot be modified to the owner.")

        if not update_member_schema.role_type:
            update_member_schema.role_type = role.role_type
        else:
            if role.role_type != update_member_schema.role_type:
                logger.error(f"update_member_role_info error: {update_member_schema}")
                raise E.InvalidArguments()

        return await self.dao.update_model(self.db, member_id, update_member_schema, flush=True, commit=True)

    async def get_workspace_by_user_id(self, user_id: str) -> Dict:
        """
        Get all workspaces of the user (personal and team).
        """
        personal_workspace_lst = []
        public_workspace_lst = []

        user = await async_retrieve_object(self.db, user_dao.model, condition=[user_dao.model.id == user_id])
        if not user:
            logger.error(f"get_workspace_by_user_id error: not found user '{user_id}'")
            raise E.ObjectNotFound()

        member_lst = await self._list_workspace_by_user(user_id)

        for member, space, role in member_lst:
            if member:
                if role:  # Attach the role info
                    space.role_id = role.id
                    space.role_type = role.role_type
                    space.role_name = role.name

                if space and space.space_type == WorkspaceType.PERSONAL:
                    # Echo back the personal workspace name
                    space.display = user.display if user.display else space.name

                    # There can be only one personal space
                    if not personal_workspace_lst:
                        personal_workspace_lst.append(space)
                    else:
                        logger.error(f"There can only be one personal space: '{user_id}'")
                else:
                    public_workspace_lst.append(space)

        return {
            "personal_workspace": WorkspaceListSchema(many=True).dump(
                personal_workspace_lst
            ),
            "team_workspace": WorkspaceListSchema(many=True).dump(public_workspace_lst),
        }

    async def update_member_status(self, status: MemberStatus, **kwargs) -> int:
        """
        Update the member status.
        """
        return await self.dao.update_model_by_column(
            self.db,
            {"status": status},
            **kwargs,
            flush=True,
            commit=True
        )

    async def get_member_role_by_user(self, space_id: str, user_id: str):
        """
        Get the team member role.
        """
        role_info = {}
        role_alias = aliased(role_dao.model)
        member_query = await self.dao.select_models(
            self.db,
            join_conditions=[
                JoinConfig(
                    model=role_alias,
                    join_on=and_(
                        self.dao.model.role_id == role_alias.id,
                        role_alias.is_delete == False,
                    ),
                    join_type="inner",
                    fill_result=True,
                ),
            ],
            user_id=user_id,
            workspace_id=space_id,
            is_delete=False,
            status=MemberStatus.activated,  # The member status is activated
        )
        for row in member_query:
            member, role = row
            if role:
                role_info.update({
                    "role_id": role.id,
                    "role_name": role.name,
                    "role_type": role.role_type
                })
        return role_info

    async def update_member_last_active_at(self, space_id: str, role_id: str, user_id: str):
        """
        Update the time the member selected the workspace.
        """

        space_member = await self.dao.select_model_by_column(
            self.db,
            workspace_id=space_id,
            user_id=user_id,
            role_id=role_id)
        if space_member:
            space_member.last_active_at = datetime.now(UTC)
            await self.db.commit()
