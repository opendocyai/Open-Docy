"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/16
Last Modified: 2025/6/16
Last Editor:
Filename: manager
Description: Manager for the agent module
"""

import copy
import json
import time
import typing
import uuid
from datetime import datetime
from loguru import logger
from sqlalchemy import select, or_
from sqlalchemy.exc import SQLAlchemyError

from docy import const
from docy.bases.base_manager import BaseManager
from docy.core._string import gen_snowflake_id
from docy.core.aiexecutor import call_lambda
from docy.core.storage_drivers import default_s3_client

from docy.core.settings import project_settings as settings
from docy.database import get_async_db_connector
from docy.core.sse import sse_manager
from docy.exceptions import exception as PException
from docy.forms import EventForm
from docy.forms.agent import (
    AgentUpdateForm,
    AgentMarketForm,
    DATAEXTRACTORForm,
    EXTRACTORInputForm,
)  # needs handling
from docy.forms.message import InnerMessageCreateForm
from docy.models.tb_activity import ActivityTask, TaskStatus, TaskType, TaskRecord
from docy.models.tb_agent import Agent, AgentStatus
from docy.services.agent.custom_node import CustomNodeManager
from docy.models.tb_workspace import Workspace
from docy.schema.agent import AgentDetailSchema
from docy.services.activity.manager import ActivityManager  # needs handling
from docy.services.audit.helper import audit
from docy.schema.audit import ResourceType, Action, Outcome
from docy.services.auth.utils.user import get_user_model
from docy.services.message.manager import InnerMessageManager
from docy.services.workspace.manager import WorkspaceManager
from docy.services.workspace.member import MemberManager
from docy.cache.cache_utils import get_from_cache, get_from_redis, delete_key_from_cache, save_to_cache
from docy.utils.enums import (
    InnerModelEnum,
    InnerMessageStateEnum,
    CopyAgentFromEnum,
)
from docy.utils.topology.graph import GraphProcessor
from docy.utils.topology.graph_validation import verify_graph
from docy.utils.sql_query import (
    async_retrieve_object,
    list_object_query_set,
    async_list_objects,
    retrieve_object,
    list_objects
)
from docy.services.agent.utils import decode_opt_token, generate_opt_token


async def get_operation_token(
    user,
    agent_id: str,
    code: str,
    generate=False,
    return_whith_invalid_opt_token=False,
) -> str:
    """
    Create the operation code for the given code, or fetch the existing one
    from redis.
    """
    key = f"{agent_id}_opt_token_current"
    token_key = f"{code}_opt_token"
    old_opt_token_dict = await get_from_cache(key) or {}
    old_token = old_opt_token_dict.get("opt_token")
    if not old_token:
        # No one is editing; create the opt token
        token = generate_opt_token(user.id, agent_id)
        old_token = token
    else:
        # If a token exists, someone is editing; return an error response
        # immediately when requested.
        token_dict = decode_opt_token(old_token)
        edit_user_id = token_dict["user_id"]
        if edit_user_id != user.id:
            if return_whith_invalid_opt_token:
                # Look up the user who is editing the agent
                edit_user = None
                async with get_async_db_connector() as db:
                    u_model = get_user_model()
                    edit_user = await async_retrieve_object(
                        db, u_model, o_id=edit_user_id
                    )
                raise PException.AgentLockedException(
                    meta={
                        "edit_user": edit_user.full_name if edit_user else None,
                        "edit_user_id": edit_user_id,
                    },
                )
    # Renew the lock
    await save_to_cache(
        key,
        {"code": code, "opt_token": old_token},
        ex=settings.default.agent_lock_ttl * 60,
    )
    await save_to_cache(
        token_key, {"token": old_token}, ex=2 * 60 * 60
    )  # The code-to-token mapping is kept for 2 hours only
    return old_token


async def get_token_by_code(code: str):
    """
    Get the user's opt token by code; each fetch extends the code's expiry.
    """
    token_key = f"{code}_opt_token"
    token = await get_from_cache(token_key)
    if token:
        # Extend the expiry
        await save_to_cache(token_key, token, ex=5 * 24 * 60 * 60)
        return token["token"]


async def check_operation_token(code, redis_token) -> bool:
    """
    Check the user's operation token.
    """
    # First take the token from redis
    token = await get_token_by_code(code)
    return token == redis_token if all([token, redis_token]) else False


class AgentManager(BaseManager):

    async def pre_add_code(self, code: str = None) -> str:
        """
        Generate a random code that maps to an agent configuration stored in
        redis. If it is never saved, it expires automatically; if it is saved,
        the agent configuration is read from redis and persisted to the
        database.
        """
        request = self.request
        if code:
            info = await self.get_template_by_code(code)
            if not info:
                raise PException.InvalidOperationCode
        else:
            code = f'{request.user.id}-{str(uuid.uuid4()).replace("-", "")}'
            await save_to_cache(code, {}, 60 * 60 * 24)
        return code

    async def get_template_by_code(self, code: str):
        request = self.request
        info = await get_from_cache(code)
        if not info:
            raise PException.InvalidOperationCode
        # If there is run info, attach the running task info to it
        run_info = info.get("run_info", {})
        task_id = run_info.get("task_id")
        run_id = run_info.get("run_id")
        if task_id:
            task_manager = ActivityManager(
                db=self.db, request=self.request, task_type=2
            )
            task = await task_manager.get_task_detail(task_id)
            info["task"] = task
        return info

    async def cancel_task(self, task_id: str, run_id: str):
        """
        Cancel the task (pass the request through so the cancel audit records
        the correct actor).
        """
        task_manager = ActivityManager(db=self.db, request=self.request, task_type=2)
        await task_manager.cancel_task(task_id, run_id)

    async def pre_save_agent(
        self, code: str, agent, no_code=False, create_from_agent=False
    ):
        """
        Save the pre-created agent to redis.
        """
        request = self.request
        info = await get_from_cache(code) or {}
        if info is None:
            raise PException.InvalidOperationCode
        # Merge in the newly changed agent parameters
        new_info = info | agent.dict(exclude_unset=True)
        if "agent_id" in new_info:
            if create_from_agent:
                agent = await async_retrieve_object(
                    self.db, Agent, o_id=new_info["agent_id"]
                )
                new_info["template_json"] = agent.template_json
                agent_id = gen_snowflake_id()
                new_info["agent_id"] = agent_id
                generate_agent_id = True
            else:
                agent_id = new_info["agent_id"]
                generate_agent_id = False
        else:
            agent_id = gen_snowflake_id()
            new_info["agent_id"] = agent_id
            generate_agent_id = True
        if no_code and not generate_agent_id:
            # In this case the json_temple must be taken from the database when
            # creating from a template
            if new_info.get("template_json") is None:
                agent = await async_retrieve_object(self.db, Agent, o_id=agent_id)
                new_info["template_json"] = agent.template_json
                new_info["space_id"] = agent.space_id
                new_info["published"] = agent.published
                new_info["market_record_id"] = agent.market_record_id
        await save_to_cache(code, new_info, 60 * 60 * 24)
        return new_info, agent_id, generate_agent_id

    async def can_edit(self, agent_id: str = None, code: str = None):
        if not any([agent_id, code]):
            raise PException.InvalidArguments
        if agent_id:
            agent = await self.get_agent_by_id(agent_id)
        else:
            info = await self.get_template_by_code(code)
            agent = await self.get_agent_by_id(info["agent_id"])
        if agent.edit_able == False:
            raise PException.AgentCanNotEdit

    async def pre_add_or_update_agent(
        self,
        agent,
        code=None,
        save_as_draft=True,
        create_from_agent=False,
        return_whith_invalid_opt_token=False,
        opera_by: int = 1,
    ):
        no_code = True if not code else False
        code = await self.pre_add_code(code)
        # Save the created info
        agent_dict, agent_id, generate_agent_id = await self.pre_save_agent(
            code, agent, no_code, create_from_agent=create_from_agent
        )
        # If there is no code, the code is newly created, so a token must be
        # generated as well.
        params = {
            "user": self.request.user,
            "agent_id": agent_id,
            "code": code,
            "return_whith_invalid_opt_token": return_whith_invalid_opt_token,
        }
        if no_code:
            params["generate"] = True
        opt_token = await get_operation_token(**params)
        # Perform the save based on the token
        if await check_operation_token(code, opt_token):
            # Look up whether there is a task for the code; if so, replace its
            # JSON.
            await self.update_agent_task(code, agent_dict)
            # Clean up the addition in the cache
            await self.update_addition_for_redis(code)
            # If the user's current operation token is valid, the data can be
            # saved to the database.
            params = {"code": code}
            if not generate_agent_id:
                # Update the agent
                params["agent_id"] = agent_id
            agent_instance = await self.add_or_update_agent(**params, opera_by=opera_by)
            # Whenever the agent is edited, set it back to draft
            agent_instance = await async_retrieve_object(
                self.db, Agent, o_id=agent_instance.id
            )
            if save_as_draft is not None:
                if save_as_draft:
                    agent_instance.status = AgentStatus.draft
                else:
                    agent_instance.status = AgentStatus.active
                self.db.add(agent_instance)
                await self.db.commit()
            # As the last step, the background checks for special nodes and
            # updates them if any.
        return code, agent_dict

    async def update_addition_for_redis(self, code):
        """
        Update the addition field in the cache.
        """
        request = self.request
        info = await get_from_cache(code)
        addition = info.get("addition")
        new_addition = {}
        if addition:
            # A replacement is needed
            template_json = info.get("template_json")
            if template_json:
                node_ids = template_json.get("nodes")
                for node in node_ids:
                    _id = node["id"]
                    if _id in addition:
                        new_addition[_id] = addition[_id]
                info["addition"] = new_addition
                await save_to_cache(code, info, 60 * 60 * 24)


    def get_version_diff(self, before_json, after_json):
        """Compare the JSON of two versions and produce the changes."""
        try:
            before_graph = GraphProcessor(before_json)
            after_graph = GraphProcessor(after_json)
            diff = before_graph.get_diff(after_graph)
        except Exception as e:
            print(e)
        return diff

    async def update_addition_for_db(self, agent_id):
        """
        Update the addition field in the database.
        """
        agent = await self.get_agent_by_id(agent_id)
        if agent.addition and agent.template_json:
            new_addition = {}
            addition = agent.addition
            node_ids = agent.template_json.get("nodes")
            for node in node_ids:
                _id = node["id"]
                if _id in addition:
                    new_addition[_id] = addition[_id]
            agent.addition = new_addition
            self.db.add(agent)
            await self.db.commit()

    async def update_agent_task(self, code: str, update_dict: dict):
        """
        Sync the update to the task.
        """
        # First find the task
        agent_id = update_dict["agent_id"]
        task_manager = ActivityManager(db=self.db, request=self.request, task_type=2)
        task = await task_manager.get_temporary_task_by_name(f"temporary_task_{code}")
        if task:
            await task_manager.update_task_all(task.id, update_dict)

    async def find_node_by_class(
        self, target_class: typing.List, code: str = None, json_str: str = None
    ):
        if not any([code, json_str]):
            return
        if code:
            agent_info = await get_from_cache(code)
            json_info = agent_info.get("template_json")
            if not json_info:
                return
            json_str = json.dumps(json_info)
        else:
            try:
                json.loads(json_str)
            except:
                return
        graph = GraphProcessor(json_str)
        data = graph.get_nodes_by_class(target_class)
        if not data:
            data = None
        return data

    async def final_save_agent(
        self,
        agent_id: str = None,
        code: str = None,
        agent=None,
        preview_image: str = None,
        validate_custom_node_secrets: bool = False,
    ):
        """
        Save the agent when Save is clicked on the page.
        """
        # TODO: validate the parameters before saving

        # Check whether the agent has a Compliance Policy Node that references
        # a Draft version.

        agent = await self.add_or_update_agent(
            agent_id,
            code,
            agent,
            preview_image,
            status=AgentStatus.active,
            check_input=True,
            published_check=True,
            except_input=True,
            validate_custom_node_secrets=validate_custom_node_secrets,
        )

        # Audit record: agent published (personal publish, POST /agent/add-or-update)
        if agent:
            await audit(self.request, self.db).write_quick(
                chain_id=f"{agent.space_id}--{ResourceType.AGENT.value}",
                resource_type=ResourceType.AGENT,
                resource_id=agent.id,
                action=Action.PUBLISH,
                outcome=Outcome.SUCCESS,
                payload={
                    "name": agent.name,
                    "space_id": agent.space_id,
                    "destination": "personal",
                },
            )
        # Check whether it was published and delete it if so.
        # Logic change: only update the agent itself, or sync the update to the
        # marketplace. A new endpoint was added for unpublishing.
        return agent

    async def add_or_update_agent(
        self,
        agent_id: str = None,
        code: str = None,
        agent=None,
        preview_image: str = None,
        status: AgentStatus = None,
        check_input: bool = False,
        published_check: bool = False,
        except_input: bool = True,
        source_agent_id: str = None,  # When copying directly from the market or another user's agent, check custom nodes and look up the source agent's custom_node
        validate_custom_node_secrets: bool = False,
        market_id: str = None,
        opera_by: int = 1,
    ):
        if code:
            info = await get_from_cache(code)
            if not info:
                raise PException.InvalidOperationCode
            agent = AgentUpdateForm(**info)
        else:
            if not agent:
                raise PException.InvalidArguments
            if isinstance(agent, str):
                agent = AgentUpdateForm(**json.loads(agent))

        his_agent = None
        params = {"preview_image": preview_image} if preview_image else {}
        if agent_id:
            # Check whether the agent exists.
            # Verify the user has permission on the agent.
            await self.check_object_permission("agent", agent_id)
            agent_instance = await async_retrieve_object(self.db, Agent, o_id=agent_id)
            if not agent_instance:
                return None
            params |= agent.dict(exclude_unset=True)

            if published_check:
                # Validate the template
                errors = verify_graph(
                    params.get("template_json", {}), "task", except_input=except_input
                )
                if errors:
                    raise PException.InvalidJsonTemplate(errors)

            if check_input:
                self.check_inputnode_before_commit(params.get("template_json", ""))

            his_agent = AgentDetailSchema().dump(agent_instance)

            his_agent.pop("history_version", None)
            history = [
                {
                    "id": gen_snowflake_id(),
                    "time": int(datetime.utcnow().timestamp()),
                    "agent_info": his_agent,
                }
            ]
            params["history_version"] = (
                history + (agent_instance.history_version or [])
            )[:1]
            # Set the agent status to draft when the user edits it
            if status:
                params["status"] = status
            for field, value in params.items():
                try:
                    setattr(agent_instance, field, value)
                except:
                    logger.error(f"Agent has not attr {field}")
            # Validate that custom node secrets are present
            if agent_instance.template_json and validate_custom_node_secrets:
                await self.validate_custom_node_secrets(
                    agent_instance.id, agent_instance.template_json
                )

        else:
            # Create a new agent
            params |= agent.model_dump(exclude_unset=True)
            if params.get("agent_id"):
                params["id"] = params.pop("agent_id")
            params["creator_id"] = self.request.user.id
            # Set the agent status to draft when the user edits it
            if status:
                params["status"] = status

            if published_check:
                # Validate the template
                errors = verify_graph(
                    params.get("template_json", {}), "task", except_input=except_input
                )
                if errors:
                    raise PException.InvalidJsonTemplate(errors)

            if check_input:
                self.check_inputnode_before_commit(params.get("template_json", ""))
            agent_instance = Agent(**params)
            self.db.add(agent_instance)
            await self.db.commit()

            # Audit record: agent created (first DB persistence via /pre/add
            # entering the canvas). Later draft saves / publishes produce
            # update records; only the create is recorded here.
            await audit(self.request, self.db).write_quick(
                chain_id=f"{agent_instance.space_id}--{ResourceType.AGENT.value}",
                resource_type=ResourceType.AGENT,
                resource_id=agent_instance.id,
                action=Action.CREATE,
                outcome=Outcome.SUCCESS,
                payload={
                    "name": agent_instance.name,
                    "space_id": agent_instance.space_id,
                },
            )

            # Check whether the agent contains custom node nodes
            if agent_instance and getattr(agent_instance, "template_json"):
                custom_nodes = GraphProcessor(
                    agent_instance.template_json
                ).get_custom_nodes()
                if custom_nodes:
                    # If present, create or update the node data
                    await CustomNodeManager(self.db).add_custom_nodes(
                        agent_instance.id,
                        custom_nodes,
                        source_agent_id=source_agent_id,
                        market_id=market_id,
                    )

        # Clean up the addition in the agent
        self.db.add(agent_instance)
        await self.db.commit()
        await self.update_addition_for_db(agent_instance.id)
        await self.db.refresh(agent_instance)
        # As the last step, the background checks for special nodes and updates
        # them if any.
        return agent_instance

    async def validate_custom_node_secrets(self, agent_id: str, template_json: dict):
        """
        Validate that custom node secrets are present.
        """
        manager = CustomNodeManager(self.db)
        graph = GraphProcessor(json_str=json.dumps(template_json))
        for node in graph.get_custom_nodes():
            # First look up the custom node in the database
            result = await manager.get_custom_node(node["id"], agent_id)
            if result and result.variables:
                for variable in result.variables:
                    if variable["required"] and not variable.get("value"):
                        raise PException.CustomNodeSecretEmpty

    async def check_exist_agent_counts(self, space_id: str):
        # Users on the free plan can create only one agent per space
        flag = True
        user_model = get_user_model()
        stmt = (
            select(user_model)
            .join(Workspace, Workspace.user_id == user_model.id)
            .where(Workspace.id == space_id)
        )
        result = await self.db.execute(stmt)
        space_owner = result.scalar_one_or_none()
        if not space_owner:
            raise PException.ObjectNotFound(f"space_id({space_id}) not found.")
        if space_owner.is_privileged:
            return flag
        return flag

    def check_inputnode_before_commit(self, temple_json):
        graph = GraphProcessor(json.dumps(temple_json))
        if not temple_json or not len(graph.get_input_nodes()) > 0:
            raise PException.AgentHasNoInput

    async def delete_agent(self, agent_id: str):
        # TODO: check whether any task still uses this template
        # Single delete reuses the bulk method; single=True keeps the audit as DELETE
        return await self.bulk_delete_agent([agent_id], single=True)

    async def bulk_delete_agent(
        self, agent_ids: typing.List[str], single: bool = False
    ):
        # First see which of the given agents have tasks associated
        inner_task_status = [
            TaskStatus.NOT_START,
            TaskStatus.ACTION_REQUIRED,
            TaskStatus.IN_PROGRESS,
            TaskStatus.QUEUED,
            TaskStatus.PAUSE,
        ]
        task_agent_ids = await async_list_objects(
            self.db,
            ActivityTask,
            fields=["agent_id"],
            condition=[
                ActivityTask.agent_id.in_(agent_ids),
                ActivityTask.status.in_(inner_task_status),
            ],
        )
        agent_ids = list(set(agent_ids) - set(task_agent_ids))
        agents = await async_list_objects(
            self.db, Agent, condition=[Agent.id.in_(agent_ids)]
        )
        # In batch mode, collect the deleted agents and write a single
        # BATCH_DELETE audit record after the loop.
        deleted_agents = []
        for agent in agents:
            try:
                await self.check_object_permission("agent", agent.id)
                await agent.async_delete()
                # Audit record: agent single delete (single=True); one DELETE per agent
                if single:
                    await audit(self.request, self.db).write_quick(
                        chain_id=f"{agent.space_id}--{ResourceType.AGENT.value}",
                        resource_type=ResourceType.AGENT,
                        resource_id=agent.id,
                        action=Action.DELETE,
                        outcome=Outcome.SUCCESS,
                        payload={"name": agent.name},
                    )
                else:
                    deleted_agents.append(agent)
            except Exception as e:
                continue
        # Audit record: agent batch delete writes a single record with the
        # deleted agents in the payload.
        if deleted_agents:
            _space_id = deleted_agents[0].space_id or ""
            _names = [a.name for a in deleted_agents]
            _ids = [a.id for a in deleted_agents]
            await audit(self.request, self.db).write_quick(
                chain_id=(
                    f"{_space_id}--{ResourceType.AGENT.value}"
                    if _space_id
                    else ResourceType.AGENT.value
                ),
                resource_type=ResourceType.AGENT,
                resource_id=_space_id or "batch",
                action=Action.BATCH_DELETE,
                outcome=Outcome.SUCCESS,
                payload={"name": _names, "ids": _ids, "count": len(_ids)},
            )
        await self.db.commit()
        agent_lst = []
        task_agents = await async_list_objects(
            self.db, Agent, condition=[Agent.id.in_(task_agent_ids)]
        )
        if task_agents:
            for agent in task_agents:
                agent_lst.append((agent.name, agent.id))
        return agent_lst

    def list_space_agent(
        self,
        space_id: str,
        agent_name: str = None,
        order_by=None,
        status: AgentStatus = None,
        inc_visible: bool = False,
    ):
        condition = [Agent.space_id == space_id]
        if agent_name:
            condition.append(Agent.name.ilike(f"%{agent_name}%"))
        if status:
            condition.append(Agent.status.in_(status))
        if not inc_visible:
            condition.append(or_(Agent.visible == True, Agent.visible.is_(None)))
        return list_object_query_set(
            self.db, Agent, condition=condition, order_by=order_by
        )





    async def get_agent_by_id(self, agent_id: str):
        """
        Get the agent by agent ID.
        """
        return await async_retrieve_object(self.db, Agent, o_id=agent_id)



    async def per_run_agent(self, code, node_name) -> dict:
        # Run the agent temporarily
        # 1. Get the agent info from redis
        info = await get_from_cache(code) or {}
        if not info:
            raise PException.InvalidOperationCode
        agent_id = info.get("agent_id")
        task_manager = ActivityManager(
            db=self.db, request=self.request, bg_task=self.bg_task, task_type=2
        )
        task = await task_manager.get_temporary_task_by_name(f"temporary_task_{code}")
        if not task:
            # Create a temporary task run
            task = await task_manager.create_temporary_task(code, agent_id, 2)
        # Finally update the agent info in redis
        info["run_info"] = {
            "task_id": task.id,
            "agent_id": task.agent_id,
            "space_id": task.task_space_id,
            "auth_type": self.request.scope["auth_type"],
        }  # Save the task ID to redis
        info["run_info"] |= {"user_id": self.request.user.id}
        info["run_info"] |= {"run_source": "agent"}
        # Finally invoke the AI agent through lambda.
        # Pass the code to the AI service.
        info["run_info"]["code"] = code
        # Verify that the node can run
        errors = verify_graph(
            info["template_json"], "step", node_name, except_input=False
        )
        if errors:
            raise PException.InvalidJsonTemplate(errors)
        notice_enough_coin = (
            True if self.request.scope["auth_type"] == const.AT_BEARER_TOKEN else False
        )
        task_info = await task_manager.run_task(
            info, "step", node_name, notice_enough_coin=notice_enough_coin
        )
        if "code" not in task_info:
            task_info["code"] = code
        await save_to_cache(code, info, 60 * 60 * 24)
        # Push the status change message through a background task here
        return task_info

    async def data_extractor_control(
        self, code: str, extractor: DATAEXTRACTORForm, notice_enough_coin: bool = True
    ):
        """
        Asynchronously invoke lambda to perform data extraction.
        {
            "event":"task.status.update",
            "run_type": "step",
            "data": {
                "run_info":{
                                    "run_node":"xxx",
                                    "code":"xxx",
                                    "task_id":"xxx",
                                    "run_id":"xxx",
                                    "user_id":"xxx"
                            },
                            "status": The task status to update
                    }
        }
        """
        agent_dict: dict = await self.get_template_by_code(code)
        json_temple = (agent_dict or {}).get("template_json", None)
        if not json_temple:
            return
        # Find the node in the JSON
        t_node = None
        for node in json_temple["nodes"]:
            if node["id"] == extractor.extractor_node_id:
                t_node = node
                break
        if not t_node:
            raise PException.OperationNotAllow("node not found.")
        run_id = gen_snowflake_id()
        task_id = gen_snowflake_id()  # Keep the same structure as a task for billing
        auth_type = self.request.scope["auth_type"]
        api_key_id = self.request.scope["api_key_id"]
        body = {
            "run_info": {
                "task_id": task_id,
                "code": code,
                "extract_run_id": run_id,
                "user_id": self.request.user.id,
                "run_source": "agent",
                "run_node": extractor.extractor_node_id,
                "extractor_type": extractor.extractor_type.value,
                "extractor_files": extractor.extractor_files.keys,
                "space_id": agent_dict["space_id"],
                "agent_id": agent_dict["agent_id"],
                "auth_type": auth_type,
                "api_key_id": api_key_id,
            },
            "extractor_params": extractor.model_dump(),
            "node": t_node,
        }
        if extractor.extractor_type.value == const.ExtractorType.PROFILE_SCAN.value:
            # If it is a scan and the file differs from the current file, delete
            # the selection.
            addition = await self.get_addition_data(code)
            addition_info = addition.get(extractor.extractor_node_id) or {}
            extractor_files = addition_info.get("extractor_files", [])  # {"keys": []}
            if extractor.extractor_files.keys and set(extractor_files) != set(
                extractor.extractor_files.keys
            ):
                # In this case the parameters must be updated
                addition_params = body["extractor_params"]["extractor_files"][
                    "addition"
                ]
                if addition_params:
                    addition_params["known_field"] = None

        # Create a task record to track usage
        task_manager = ActivityManager(db=self.db, request=self.request, task_type=2)
        # Before running, first check whether billing is allowed
        call_lambda(
            "open-docy:latest",
            {"body": body},
            asynchronous=True,
        )
        # Save the created task to redis
        task_state = {"status": "running"}
        key = f"{run_id}_extractor_state"
        await save_to_cache(key, task_state)
        return {"run_id": run_id}

    async def find_nearby_nodes(
        self, code: str = None, json_dict: dict = None, step: int = 1
    ):
        """
        Find the predecessor nodes of each node in the JSON.
        """
        if not any([code, json_dict]):
            return
        if code:
            # First take the corresponding JSON from redis
            json_dict = await get_from_cache(code)
            if not json_dict:
                return
            json_dict = json_dict["template_json"]
        try:
            json_template = json.dumps(json_dict)
        except:
            return
        graph = GraphProcessor(json_template)
        return graph.find_all_node_predecessors(step)

    async def find_locked_nodes(
        self,
        target_node_id,
        code: str = None,
        json_dict: dict = None,
        locked: bool = True,
    ):
        if not any([code, json_dict]):
            return
        if code:
            # First take the corresponding JSON from redis
            json_dict = await get_from_cache(code)
            if not json_dict:
                return
            json_dict = json_dict["template_json"]
        try:
            json_template = json.dumps(json_dict)
        except:
            return
        graph = GraphProcessor(json_template)
        forward = 0 if locked else 1
        nodes = graph.find_node_in_path(target_node_id, forward=forward)
        if forward:
            # If locking, check whether there is output; locking is allowed
            # only when output exists.
            out_put_nodes = graph.filter_node_by_output(list(nodes))
            nodes -= out_put_nodes
        return graph.get_node_by_scope_nodes(list(nodes or []))

    async def get_neighboring_node(
        self,
        code: str,
        json_dict: dict,
        target_node_id: str,
        direction: int,
        label: str = None,
    ) -> list:
        if not any([code, json_dict]):
            return
        if code:
            # First take the corresponding JSON from redis
            json_dict = await get_from_cache(code)
            if not json_dict:
                return
            json_dict = json_dict["template_json"]
        try:
            json_template = json.dumps(json_dict)
        except:
            return
        graph = GraphProcessor(json_template)
        return graph.find_neighboring_node(target_node_id, direction, label)

    async def action_extractor_finish(self, **kwargs):
        """
        AI finished analyzing the file and returns the result.
        {
            "event":"extractor.finish",
            "data": {
                "run_info":{
                    "run_source":"agent",
                    "run_node":"xxx",
                    "code":"xxx",
                    "extract_run_id":"xxx",
                    "user_id":"xxx",
                    "extractor_type": "xxx"
                },
                "result":{
                    ...
                    The result of the AI data extraction
                    ...
                }
            }
        }
        """
        run_info = kwargs.get("run_info")
        extractor_files = run_info["extractor_files"]
        extract_run_id = run_info.get("extract_run_id")
        status = kwargs.get("status")
        code = run_info["code"]
        node_id = run_info["run_node"]
        payload = copy.deepcopy(kwargs)
        # if status:
        if extract_run_id:
            # Push the result to the frontend
            push_data = copy.deepcopy(payload)
            # Before pushing, convert the files to HTTP requests first
            for _, item in push_data["result"].items():
                item["files_url"] = [
                    default_s3_client.url(f) for f in item.get("files", [])
                ]
                fields = item.get("fields", [])
                for field in fields:
                    field["signature_image_url"] = [
                        default_s3_client.url(f)
                        for f in field.get("signature_image", [])
                    ]

            event = EventForm(
                event_type=const.EXTRACTOR_FINISHED,
                object_id=run_info["user_id"],
                object_type="user",
                payload=push_data,
                page=run_info.get("run_source", None),
            )
            await sse_manager.push_message(event)

            if status:
                # First update the JSON in redis
                await self.update_extractor_node(
                    code,
                    node_id,
                    run_info["extractor_type"],
                    payload["result"],
                    extractor_files,
                )
            # Reset the task record status based on status
            task_record = await async_retrieve_object(
                self.db,
                TaskRecord,
                condition=[TaskRecord.run_id == extract_run_id],
            )
            if task_record:
                task_record.status = (
                    TaskStatus.COMPLETED if status else TaskStatus.ERROR
                )
                await self.db.commit()

    async def update_extractor_node(
        self, code, node_id, extractor_type, result, extractor_files=None
    ):
        # First look up the data in redis by code
        agent_info = await self.get_template_by_code(code)
        json_temple = agent_info["template_json"]
        # Find this node
        graph = GraphProcessor(json.dumps(json_temple))
        node = graph.get_node_by_node_id(node_id)
        if node:
            label = node["label"]
            variable = node.get("variable", {})
            extract_key = None
            if extractor_type == const.ExtractorType.PROFILE_SCAN.value:
                extract_key = const.ExtractorType.AUTO_SCAN.value
            elif extractor_type == const.ExtractorType.AREA.value:
                extract_key = const.ExtractorType.AREA.value
            elif extractor_type == const.ExtractorType.MANUAL_INPUT.value:
                extract_key = const.ExtractorType.MANUAL_INPUT.value
            else:
                return
            if label in [const.DATA_EXTRACTOR, const.GROUP_DATA_EXTRACTOR]:
                # Extract the data values
                key_lst = [
                    const.ExtractorField.FIELD_NAME.value,
                    const.ExtractorField.FIELD_DESCRIPTION.value,
                ]
            elif label == const.EXTRACT_SIGNATURE:
                key_lst = [
                    const.ExtractorField.SIGNER_NAME.value,
                    const.ExtractorField.SIGNER_ROLE.value,
                ]
            else:
                return
            fields_lst = []
            variable.setdefault(extract_key, fields_lst)
            fields = result.get(extract_key, [])
            if fields:
                fields = fields["fields"]
            for field in fields:
                t = {}
                for k in key_lst:
                    t[k] = field.get(k)
                fields_lst.append(t)
            node["variable"] = variable
            json_temple = graph.replace_node(node_id, node)

            # First get the addition
            addition = await self.get_addition_data(code) or {}
            if node_id in addition:
                addition[node_id] |= result
            else:
                addition[node_id] = result
            if extractor_files:
                addition[node_id]["extractor_files"] = extractor_files

            agent = AgentUpdateForm(template_json=json_temple, addition=addition)
            await self.pre_add_or_update_agent(agent, code, save_as_draft=False)

    def format_addition_before_return(self, addition):
        if not addition:
            return
        # Add URLs to the files in the addition
        for node_id, addition_info in addition.items():
            for key, items in addition_info.items():
                # If there are files, replace them with URLs
                if key != "extractor_files" and items.get("files"):
                    items["files_url"] = [
                        default_s3_client.url(f) for f in items["files"]
                    ]
                    fields = items.get("fields", [])
                    for field in fields:
                        if "signature_image" in field:
                            field["signature_image_url"] = [
                                default_s3_client.url(f)
                                for f in field.get("signature_image", [])
                            ]
        new_addition = {}
        for key, v in addition.items():
            if v:
                new_addition[key] = v
        addition = new_addition
        return addition

    async def get_addition_data(self, code):
        """
        Get the data from redis.
        """
        agent_info = await self.get_template_by_code(code)
        addition = agent_info.get("addition")
        if not addition:
            # If absent, take it from the database
            agent = await self.get_agent_by_id(agent_info["agent_id"])
            addition = agent.addition
        return addition

    async def delete_extractor_cache(self, code: str, node_ids: list[str]):
        """
        Delete the cached content from redis.
        """
        request = self.request
        for node_id in node_ids:
            agent_info = await self.get_template_by_code(code)
            addition = agent_info.get("addition", {})
            if not addition:
                # Update the database
                agent = await self.get_agent_by_id(agent_info["agent_id"])
                addition = agent.addition
                if addition and addition.get(node_id):
                    addition = copy.deepcopy(agent.addition)
                    addition[node_id] = {}
                    agent.addition = addition
                    self.db.add(agent)
                    await self.db.commit()
            else:
                # Update redis
                node_addition = addition.get(node_id)
                if node_addition:
                    addition[node_id] = {}
                await save_to_cache(code, agent_info, 60 * 60 * 24)

    async def set_manual_input(self, input_param: EXTRACTORInputForm):
        await self.update_extractor_node(
            input_param.code,
            input_param.node_id,
            input_param.extractor_type,
            input_param.control,
            extractor_files=input_param.extractor_files,
        )

    async def copy_agent_from_market(
        self,
        template_id: str,
        space_id: str,
        from_: int = CopyAgentFromEnum.MARKETPLACE.value,
        name: str = None,
        status: AgentStatus = AgentStatus.draft,
        create_knowledge: bool = False,
    ):
        """
        template_id: agent_id or marketplace template id
        space_id: str
        from_: int 1-> marketplace 2-> user
        """
        n_agent = None
        if from_ == CopyAgentFromEnum.MARKETPLACE.value:
            template = await self.get_market_template_by_id(template_id)
            if template:
                create_agent_form = AgentUpdateForm(
                    name=template.name if not name else name,
                    description=template.brief_description,
                    space_id=space_id,
                    template_json=template.template_json,
                    market_record_id=template.id,
                )
                n_agent = await self.add_or_update_agent(
                    agent=create_agent_form,
                    preview_image=template.preview_image,
                    status=status,
                    source_agent_id=template.source_agent,
                    market_id=template.id,
                )
        else:
            agent = await self.get_agent_by_id(template_id)
            if agent:
                create_agent_form = AgentUpdateForm(
                    name=agent.name if not name else name,
                    description=agent.description,
                    space_id=space_id,
                    template_json=agent.template_json,
                    source_agent_id=agent.id,
                    edit_able=False if agent.edit_able is False else True,
                )
                n_agent = await self.add_or_update_agent(
                    agent=create_agent_form,
                    preview_image=agent.preview_image,
                    status=status,
                    source_agent_id=agent.id,
                )
        # As the last step, the background checks for special nodes and updates
        # them if any.
        if n_agent and create_knowledge:
            await self.create_fake_knowladge_base(n_agent.id)
        if n_agent:
            await self.marketing_research_update(n_agent.id)
        return n_agent

    async def create_fake_knowladge_base(self, agent_id: str):
        """
        When copying an agent that has a knowledge base, create a knowledge base
        in the user's own space and add it to the JSON.
        """
        agent = await self.get_agent_by_id(agent_id)
        template_json = agent.template_json
        if agent:
            # A knowledge base needs to be created
            knowledge_manager = KnowledgeManager(db=self.db, request=self.request)
            graph = GraphProcessor(json_str=json.dumps(template_json))
            knowledge_nodes = graph.get_knowlage_nodes()["nodes"]
            for node in knowledge_nodes:
                variable = node.get("variable", {})
                o_knowledge_id = variable.get("knowledge", {}).get("knowledge_id")
                o_store_id = variable.get("knowledge", {}).get("vector_store_id")
                o_knowledge_id = o_knowledge_id or o_store_id
                if not o_knowledge_id:
                    continue
                o_knowledge_obj = await knowledge_manager.get_knowledge_by_id(
                    o_knowledge_id
                )
                knowledge_obj, _ = await knowledge_manager.fake_create_knowledge(
                    user_id=self.request.user.id,
                    space_id=agent.space_id,
                    name=f"copy_{o_knowledge_obj.name}_{int(time.time())}",
                )
                # Replace the knowledge base ID
                template_json = self.replace_knowledge(
                    graph, node, o_knowledge_obj, knowledge_obj
                )
            agent.template_json = template_json
            self.db.add(agent)
            await self.db.commit()

    async def marketing_research_update(self, agent_id: str):
        """
        For the marketing research agent, update the knowledge base IDs, i.e.
        customize for this requirement.
        Args:
            agent_id (str): ID of the newly created agent
        """
        agent = await self.get_agent_by_id(agent_id)
        template_json = agent.template_json
        if agent:
            # A knowledge base needs to be created
            knowledge_manager = KnowledgeManager(db=self.db, request=self.request)
            graph = GraphProcessor(json_str=json.dumps(template_json))
            knowledge_map = graph.marketing_research_state()
            for knowledge_id, node_ids in knowledge_map.items():
                node = graph.get_node_by_node_id(node_ids[0])
                o_knowledge_obj = await knowledge_manager.get_knowledge_by_id(knowledge_id)
                k_meta = {"use_to":"mr_person"} if node["label"] != "CustomComponentMarketingResearchPOC5" else {"use_to":"mr_ppt"} 
                knowledge_obj, _ = await knowledge_manager.fake_create_knowledge(
                    user_id=self.request.user.id,
                    space_id=agent.space_id,
                    name=f"copy_{o_knowledge_obj.name}_{int(time.time())}",
                    k_meta=k_meta
                )
                for node_id in node_ids:
                    node = graph.get_node_by_node_id(node_id)
                    key = "knowledge_person" if "knowledge_person" in node["variable"] else "knowledge_ppt_template"
                    node["variable"][key] = {
                        "knowledge_id":knowledge_obj.id,
                        "vector_store_id":None,
                    }
                    template_json = graph.replace_node(node["id"], node)
            agent.template_json = template_json
            self.db.add(agent)
            await self.db.commit()
                    
    def replace_knowledge(
        self, graph: GraphProcessor, node: dict, o_knowledge_obj, new_knowledge_obj
    ):
        """
        Replace the knowledge base ID.
        """
        # Replace the knowledge base ID
        knowledge_info = {
            "knowledge_name": new_knowledge_obj.name,
            "vector_store_id": new_knowledge_obj.vector_store_id,
            "knowledge_id": new_knowledge_obj.id,
        }
        o_i_info = node["input_values"].get("knowledge", {})
        o_v_info = node["variable"].get("knowledge", {})
        o_i_info.update(knowledge_info)
        o_v_info.update(knowledge_info)
        return graph.replace_node(node["id"], node)


    async def get_agent_json(self, agent_id: str, user_id: str = None):
        """
        Get the JSON configuration of the agent.
        """
        if not user_id:
            user_id = self.request.user.id
        if not user_id:
            return {}
        # First verify that the current user has permission to view the target
        # agent's JSON. Condition: the user belongs to the agent's space
        # (including being invited to the space).
        space_ids = []
        space_manager = MemberManager(db=self.db, request=self.request)
        spaces = await space_manager.get_workspace_by_user_id(user_id)
        space_ids.extend(s["id"] for s in spaces.get("personal_workspace"))
        space_ids.extend(s["id"] for s in spaces.get("team_workspace"))
        agent = await self.get_agent_by_id(agent_id)
        if agent and agent.space_id in space_ids:
            return agent.template_json
        return {}



    async def release_agent(self, agent_id: str):
        """
        Release the agent's lock.
        """
        await delete_key_from_cache(f"{agent_id}_opt_token_current")

    async def draft_save_agent(self, code: str):
        """
        Save the agent draft: release the edit lock and write an UPDATE audit
        record.

        The frontend calls /api/v1/agent/draft/save after the user finishes
        editing. The agent data is already persisted in the pre/update phase;
        this method:
          1. Gets the edit session info from the cache
          2. Releases the agent edit lock
          3. Writes the audit log (audit is triggered here, not in pre/update)

        Args:
            code: Operation code generated by the frontend edit session
        """
        # Get the edit session info from the cache
        info = await get_from_cache(code)
        if not info:
            return

        agent_id = info.get("agent_id")
        # Release the agent edit lock
        await self.release_agent(agent_id)

        # Look up the agent instance for the audit payload
        agent_instance = await async_retrieve_object(self.db, Agent, o_id=agent_id)
        if not agent_instance:
            return

        # After the publish flow (/agent/add-or-update, /agent/marketplace/publish) completes,
        # the frontend still calls this endpoint to release the edit lock; the agent is already
        # active and the PUBLISH audit record is written, so skip the duplicate UPDATE audit record.
        if agent_instance.status == AgentStatus.active:
            return

        # Audit record: agent draft save.
        payload = {
            "name": agent_instance.name,
            "space_id": agent_instance.space_id,
            "agent_id": agent_id,
            "code": code,
        }
        await audit(self.request, self.db).write_quick(
            chain_id=f"{agent_instance.space_id}--{ResourceType.AGENT.value}",
            resource_type=ResourceType.AGENT,
            resource_id=agent_instance.id,
            action=Action.UPDATE,
            outcome=Outcome.SUCCESS,
            payload=payload,
        )

    async def set_visible(self, agent_id: str, visible: typing.Optional[bool] = None):
        """
        Set whether the agent is visible in the agent list.
        """
        agent = await self.get_agent_by_id(agent_id)
        if agent and visible is not None:
            agent.visible = visible
            self.db.add(agent)
            await self.db.commit()
        return agent

    async def has_draft_version_node(
        self, agent: AgentUpdateForm = None, agent_id: str = None
    ):
        """Check whether the agent has a Compliance Policy Node that references a Draft version."""
        if not any([agent, agent_id]):
            return False
        if agent:
            graph = GraphProcessor(agent.template_json)
        else:
            agent = await self.get_agent_by_id(agent_id)
            graph = GraphProcessor(agent.template_json) if agent else None
        if not graph:
            return False
        policy_version_id_list = []
        policy_node_list = graph.get_custom_nodes(const.COMPLIANCE_POLICY)
        for policy_node in policy_node_list:
            policy_version = policy_node.get("input_values", {}).get(
                "policy_version", ""
            )
            if policy_version:
                policy_version_id_list.append(policy_version)

        policy_version_list = await policy_version_dao.get_policy_version_lists(
            self.db, id__in=policy_version_id_list
        )
        for _version in policy_version_list:
            if not _version.is_locked:  # Anything detected as unlocked is a draft
                return True

        return False





    def get_special_nodes_from_json(self, resource_id: str, resource_type: str):
        """
        Query the JSON and get all special nodes.
        """
        if resource_type == 1:
            agent = retrieve_object(self.db, Agent, o_id=resource_id)
            template_json = agent.template_json
        # elif resource_type == 2:
        #     marketplace = retrieve_object(self.db, Marketplace, o_id=resource_id)
        #     template_json = marketplace.template_json
        else:
            return

        graph = GraphProcessor(json.dumps(template_json))
        special_nodes = graph.get_nodes_by_class(
            [
                const.NodeEnum.CUSTOM_NODE,
                const.NodeEnum.COMPLIANCE_POLICY,
                const.NodeEnum.KNOWLEDGE,
                const.NodeEnum.DOCUMENTTEMPLATE,
            ]
        )
        return special_nodes
