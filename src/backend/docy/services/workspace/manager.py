"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: manager
Description: Workspace business logic
"""
import base64
import json
from typing import Dict, List, Optional, Union
from urllib.parse import urlencode, quote, urlparse, parse_qs
from datetime import datetime, timedelta, UTC
from loguru import logger

from docy.bases.base_manager import BaseManager
from docy.core._string import gen_snowflake_id
from docy.const import MESSAGE_DICT
import docy.exceptions.exception as E
from docy.forms.workspace import CreateWorkspaceForm
from docy.models.tb_workspace import (
    Workspace,
    WorkspaceType,
    MemberType,
    InviteAction,
    MemberStatus,
    BudgetType,
)
from docy.utils.enums import InnerModelEnum, InnerMessageStateEnum
from docy.utils.sql_query import async_list_objects, async_retrieve_object
from docy.schema.member import CreateSpaceMemberSchema
from docy.crud import user_dao, workspace_dao, role_dao
from docy.services.message import InnerMessageManager
import docy.const as const
from .constants import TeamspaceRedisKeys
from .member import MemberManager
from .role import RoleManager
from .utils import send_email



class WorkspaceManager(BaseManager):
    """
    Implement the workspace module logic.
    """
    model = Workspace

    async def get_workspace_by_id(self, _id: str, is_delete: bool = False) -> Workspace | None:
        """
        Get the workspace object by ID.
        """


        return await workspace_dao.select_model(self.db, _id, is_delete=is_delete)

    async def get_user_workspace_list(self, user_id: str) -> List[Workspace | None]:
        """
        Get the workspace list of the given user.
        """

        member_manager = MemberManager(self.db)
        members = await member_manager.get_workspaces_by_user(user_id)
        space_ids = [member.workspace_id for member in members]

        return await async_list_objects(self.db, Workspace, condition=[Workspace.id.in_(space_ids)])

    async def get_workspace_detail(self, _id: str) -> Optional[Workspace]:
        """
        Get the workspace details.
        """
        workspace = await self.get_workspace_by_id(_id)
        if not workspace:
            logger.error(f"get_workspace_detail error: space_id '{_id}'")
            raise E.ObjectNotFound
        return workspace

    async def get_workspace(self, **kwargs) -> Workspace:
        """
        Get the workspace object.
        """
        return await workspace_dao.select_model_by_column(self.db, is_delete=False, **kwargs)

    async def get_workspaces(self, _filter: Dict) -> List[Workspace]:
        """
        Get the workspace object list.
        """

        if not _filter.get("is_delete"):
            _filter["is_delete"] = False

        return await workspace_dao.select_models(self.db, **_filter)

    async def get_workspace_lists_by_user(self, user: str) -> List[Workspace]:
        """
        Get the workspaces the user belongs to.
        """
        return await self.get_workspaces({"user_id": user})

    async def create_workspace(self, workspace_create_model: CreateWorkspaceForm) -> Optional[Workspace]:
        """
        Create a workspace.

        example: {
            "name": "",
            "description": "",
            "user_id": "",
            "space_type": ""
        }
        """
        user_id = workspace_create_model.user_id
        if not user_id:
            user_obj = self.request.user if self._request else None
            user_id = user_obj.id
            email = user_obj.email
            workspace_create_model.user_id = user_id
        else:
            user_obj = await user_dao.select_model(self.db, pk=user_id)
            email = user_obj.email

        if not user_id:
            logger.error(f"WorkspaceManager.create_workspace error: user_id=>{user_id}")
            raise E.MissingArguments
        if not email:
            logger.error(f"WorkspaceManager.create_workspace error: email=>{email}")
            raise E.MissingArguments

        # OSE supports personal workspaces only; team workspaces are rejected
        if workspace_create_model.space_type == WorkspaceType.TEAM:
            logger.error("WorkspaceManager.create_workspace error: team workspace creation is not supported")
            raise E.RequestError("Team workspace creation is not supported in Open Docy")

        # A user may have exactly one personal workspace
        if self.request.scope.get("auth_type") != const.AT_AI_API_KEY:
            if await self.check_personal_workspace_exists(user_id):
                logger.error("WorkspaceManager.create_workspace error: personal workspace already exists")
                raise E.RequestError("A personal workspace already exists for this user")

        try:
            db_workspace = await workspace_dao.create_model(self.db, workspace_create_model, flush=True, commit=True)

            # Create the workspace member record
            workspace_member_dict = {
                "workspace_id": db_workspace.id,
                "space_type": workspace_create_model.space_type,
                "email": email,
                "user_id": user_id,
                "status": MemberStatus.activated  # Members are activated by default
            }

            owner_role, _ = await RoleManager(self.db).get_or_create_role(MemberType.OWNER)
            if owner_role:
                workspace_member_dict.update({
                    "role_id": owner_role.id,
                    "role_type": owner_role.role_type,
                })
            await MemberManager(db=self.db).create_workspace_member(workspace_member_dict)

            # Send an in-app message when the workspace type is TEAM

        except Exception as e:
            logger.error(f"WorkspaceManager.create_workspace Exception error: {e}")
            await self.db.rollback()
            raise e

        return db_workspace

    async def create_personal_workspace(self, workspace: Dict) -> Optional[str]:
        """
        Create a personal workspace.

        {
            "name": ""
            "description": "",
            "user_id": ""
        }
        """
        workspace_create_model = CreateWorkspaceForm(
            name=workspace["name"],
            description=workspace["description"],
            user_id=workspace["user_id"],
            space_type=WorkspaceType.PERSONAL,
        )

        workspace = await self.create_workspace(workspace_create_model)

        return workspace.id

    async def update_workspace(self, workspace_id: str,
                               name: str = None,
                               avatar: str = None,
                               description: str = None) -> Optional[Workspace]:
        """
        Update the workspace.
        """
        update_dict = {}
        if name is not None:
            update_dict["name"] = name
        if avatar is not None:
            update_dict["avatar"] = avatar
        if description is not None:
            update_dict["description"] = description

        await workspace_dao.update_model(self.db, workspace_id, update_dict, flush=True, commit=True)

        return await workspace_dao.select_model(self.db, workspace_id)

    async def delete_workspace(self, space_id: str, soft_delete: bool = True):
        """
        Delete a workspace.

        Also remove the member records from the workspace member table.
        """
        delete_rows = 0

        db_workspace = await self.get_workspace_by_id(space_id)
        if db_workspace and db_workspace.space_type == WorkspaceType.TEAM:
            if await MemberManager(db=self.db).get_teamspace_member_count(
                    db_workspace.id, {
                        "is_delete": False,
                        "user_id__is_not": None,
                        "space_type": WorkspaceType.TEAM,
                        "role_type": MemberType.MEMBER,
                    }):
                logger.debug(f"delete_workspace '{space_id}' error: has member")
                raise E.TeamspaceHasMember
            if not soft_delete:
                await self.db.delete(db_workspace)
                await self.db.commit()
                delete_rows += 1
                await MemberManager(db=self.db).delete_workspace_member(db_workspace.id, soft_delete)
            else:
                await self.model.soft_async_delete(db_workspace)
                delete_rows += 1
                # Soft-delete the team space member info (set is_delete=true;
                # delete_at)
                await MemberManager(db=self.db).delete_workspace_member(db_workspace.id, soft_delete)
        elif db_workspace and db_workspace.space_type == WorkspaceType.PERSONAL:
            # OSE: a user's personal workspace cannot be deleted
            raise E.RequestError("Personal workspace cannot be deleted")

        return delete_rows

    async def check_personal_workspace_exists(self, user_id: str) -> bool:
        """Whether the user already has a personal workspace."""
        count = await workspace_dao.count(
            self.db, user_id=user_id, space_type=WorkspaceType.PERSONAL, is_delete=False
        )
        return bool(count)



