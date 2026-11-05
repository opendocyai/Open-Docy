"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: base_manager
Description: base class of all service managers.
"""

from typing import Optional, List
from sqlalchemy import and_
from sqlalchemy.orm import Session, aliased
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy_crud_plus import JoinConfig
from fastapi import BackgroundTasks
from docy import const
from docy.models.tb_workspace import MemberStatus
from docy.utils.sql_query import get_model_by_type, async_retrieve_object, async_list_objects
import docy.exceptions.exception as PException


class BaseManager:
    """
    Base class of all manager classes.
    """

    def __init__(
        self,
        db: Optional[Session | AsyncSession] = None,
        bg_task: Optional[BackgroundTasks] = None,
        request=None,
    ):
        super().__init__()
        self._db = db
        self._bg_task = bg_task
        self._request = request

    @property
    def db(self):
        assert self._db, "SQL connection instance not exist."
        return self._db

    @property
    def bg_task(self):
        assert self._bg_task, "Background task instance not exist."
        return self._bg_task

    @property
    def request(self):
        assert self._request, "Request instance not exist."
        return self._request

    @property
    def auth_type(self):
        return self.request.scope["auth_type"]

    async def check_object_permission(
        self, resource_type: str, id_param: str, request=None
    ):
        """
        Check object permission, restricting the object operations needed by UI and API key calls.
        1. find the resource
        2. find the space the resource belongs to
        3. find the owner of the space
        4. verify that the owner id matches request.user.id
        """
        request = request or self.request
        assert request, "Request instance not exist."
        auth_type = request.scope["auth_type"]
        r_model = get_model_by_type(resource_type)
        s_model = get_model_by_type("space")
        space_field = (
            "space_id" if resource_type not in ["task", "ttask"] else "task_space_id"
        )
        if auth_type in [const.AT_USER_API_KEY]:
            # for API calls, strictly require the caller to be the creator of the resource's space
            # 1. find the resource
            # 2. find the space the resource belongs to
            # 3. find the owner of the space
            # 4. verify that the owner id matches request.user.id
            record = await async_retrieve_object(self.db, r_model, o_id=id_param)
            if not record:
                raise PException.ObjectNotFound()
            try:
                space_id = getattr(record, space_field)
            except:
                space_id = None
            if not space_id:
                raise PException.ObjectNotFound("space not found.")
            space = await async_retrieve_object(self.db, s_model, o_id=space_id)
            if not space:
                raise PException.ObjectNotFound("space not found.")
            if space.user_id != self.request.user.id:
                raise PException.NoPermission()
            return record
            pass
        elif auth_type in [const.AT_BEARER_TOKEN_OAUTH, const.AT_BEARER_TOKEN]:
            # for this auth type, require the caller to be a member of the resource's space
            # 1. find the resource
            # 2. find the space the resource belongs to
            # 3. get the member list of the space
            # 4. check whether the current user is in the member list
            record = await async_retrieve_object(self.db, r_model, o_id=id_param)
            if not record:
                raise PException.ObjectNotFound()
            try:
                space_id = getattr(record, space_field)
            except:
                space_id = None
            if not space_id:
                raise PException.ObjectNotFound("space not found.")
            space = await async_retrieve_object(self.db, s_model, o_id=space_id)
            if not space:
                raise PException.ObjectNotFound("space not found.")
            try:
                await self.check_user_match_with_space(space_id)
            except PException.UserSpaceNotMatch:
                raise PException.NoPermission
        else:
            # this branch is called with the AI API key; internal calls only, no modification here
            pass

    async def check_object_owner_permission(
        self,
        resource_type: str,
        id_param: str,
        request=None,
        owner_field: str = "user_id",
    ):
        """
        Check object permission, restricting the object operations needed by UI and API key calls.
        """
        request = request or self.request
        assert request, "Request instance not exist."
        model = get_model_by_type(resource_type)
        record = await async_retrieve_object(self.db, model, o_id=id_param)
        if not record:
            raise PException.ObjectNotFound()
        if getattr(record, owner_field) != self.request.user.id:
            raise PException.ObjectOwnerNotMatch
        return record

    async def check_user_match_with_space(self, space_id: str, user_id: str = None):
        """
        Verify that the user is in the space's member list.
        """
        if not user_id:
            user_id = self.request.user.id
        mem_lst = await self._list_workspace_by_user(user_id)
        spaceid_lst = [space.id for _, space, _ in mem_lst]
        if space_id not in spaceid_lst:
            raise PException.UserSpaceNotMatch

    async def _list_workspace_by_user(self, user_id: str):
        from docy.crud import (
            member_dao,
            workspace_dao,
            role_dao,
        )  # why does this cause a circular import??

        space_alias = aliased(workspace_dao.model)
        role_alias = aliased(role_dao.model)
        return await member_dao.select_models_order(
            self.db,
            sort_columns=["created_at"],
            sort_orders=["desc"],
            join_conditions=[
                JoinConfig(
                    model=space_alias,
                    join_on=and_(
                        member_dao.model.workspace_id == space_alias.id,
                        space_alias.is_delete == False,
                    ),
                    join_type="inner",
                    fill_result=True,
                ),
                JoinConfig(
                    model=role_alias,
                    join_on=and_(
                        member_dao.model.role_id == role_alias.id,
                        role_alias.is_delete == False,
                    ),
                    join_type="inner",
                    fill_result=True,
                ),
            ],
            user_id=user_id,
            is_delete=False,
            status=MemberStatus.activated,  # member status is activated
        )

    async def check_special_node_association(
        self, id_params: list[str], node_type: const.NodeEnum
    ):
        """
        Before deleting related resources, check for associations; if any exist, they cannot be deleted.

        Args:
            id_params: list of node IDs to check
            node_type: node type

        Returns:
            agent_id_lst: list of associated agent IDs
            market_id_lst: list of associated marketplace IDs
            delete_association_lst: list of node IDs that can be deleted
        """
        # initialize return values
        agent_id_lst = []
        market_id_lst = []
        delete_association_lst = []

        # supported node types
        SUPPORTED_NODE_TYPES = {
            const.NodeEnum.DOCUMENTTEMPLATE,
            const.NodeEnum.KNOWLEDGE,
            const.NodeEnum.CUSTOM_NODE,
            const.NodeEnum.COMPLIANCE_POLICY,
            const.NodeEnum.COMPLIANCE_POLICY_VERSION,
        }

        if node_type not in SUPPORTED_NODE_TYPES:
            return agent_id_lst, market_id_lst, delete_association_lst

        # get the models
        association_model = get_model_by_type("association")
        agent_model = get_model_by_type("agent")
        # OSE has no marketplace module; skip the market association check when
        # the model is missing (agent associations only)
        try:
            market_model = get_model_by_type("marketplace")
        except (AttributeError, ImportError):
            market_model = None

        # node type to field mapping
        field_mapping = {
            const.NodeEnum.KNOWLEDGE: association_model.knowledge_id,
            const.NodeEnum.CUSTOM_NODE: association_model.custom_node_id,
            const.NodeEnum.COMPLIANCE_POLICY: association_model.policy_id,
            const.NodeEnum.COMPLIANCE_POLICY_VERSION: association_model.version,
            const.NodeEnum.DOCUMENTTEMPLATE: association_model.template_id,
        }

        target_field = field_mapping.get(node_type)
        if not target_field:
            return agent_id_lst, market_id_lst, delete_association_lst

        # build query conditions
        if  node_type == const.NodeEnum.COMPLIANCE_POLICY_VERSION:
            node_type = const.NodeEnum.COMPLIANCE_POLICY
        conditions = [
            association_model.node_type == node_type.value,
            target_field.in_(id_params)
        ]

        # helper: get the association list
        async def get_associations_by_object_type(object_type: int):
            return await async_list_objects(
                self.db,
                association_model,
                fields=["object_id", target_field.name],
                condition=conditions + [association_model.object_type == object_type],
            )

        # get agent and marketplace associations
        agent_associations = await get_associations_by_object_type(1)
        market_associations = (
            await get_associations_by_object_type(2) if market_model else []
        )

        # extract the associated object_id lists
        agent_associated_ids = [item[0] for item in agent_associations]
        market_associated_ids = [item[0] for item in market_associations]

        # helper: get valid (not deleted) ID lists
        async def get_valid_ids(model, id_list: List[str]) -> List[str]:
            if not id_list:
                return []
            return await async_list_objects(
                self.db,
                model,
                fields=["id"],
                condition=[
                    model.is_delete == False,
                    model.id.in_(id_list)
                ],
            )

        # get valid agent and marketplace IDs
        agent_id_lst = await get_valid_ids(agent_model, agent_associated_ids)
        market_id_lst = (
            await get_valid_ids(market_model, market_associated_ids)
            if market_model
            else []
        )

        # build the set of node IDs that cannot be deleted
        cannot_delete_set = set()

        # handle agent associations
        valid_agent_ids_set = set(agent_id_lst)
        for item in agent_associations:
            if item[0] in valid_agent_ids_set:
                cannot_delete_set.add(item[-1])

        # handle marketplace associations
        valid_market_ids_set = set(market_id_lst)
        for item in market_associations:
            if item[0] in valid_market_ids_set:
                cannot_delete_set.add(item[-1])

        # compute the deletable IDs
        delete_association_lst = list(set(id_params) - cannot_delete_set)
        
        return agent_id_lst, market_id_lst, delete_association_lst
