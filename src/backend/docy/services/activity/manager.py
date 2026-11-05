"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/20
Last Modified: 2025/6/20
Last Editor:
Filename: manager
Description:
"""

import re
import time
import json
import aiohttp
import typing
import asyncio
import mimetypes
import zipfile
from io import BytesIO
from pathlib import Path
from datetime import datetime, timedelta, timezone, UTC

import copy
import base64
import pandas as pd
from loguru import logger
from sqlalchemy import select, and_, case, func, or_, desc
from collections import OrderedDict

from docy.bases.base_manager import BaseManager
from docy import const as constants
from docy.core._string import gen_snowflake_id, gen_short_uuid
from docy.core.sse import sse_manager
from docy.core.aiexecutor import call_lambda
from docy.core.pagination import CommonParams
from docy.exceptions import exception as PE
from docy.models.tb_activity import (
    TaskType,
    ActivityTask,
    TemporaryTask,
    TaskStatus,
    AGENTFROM,
    TaskRecord,
)
from docy.models.tb_agent import Agent, AgentStatus  # Marketplace, needs handling
from docy.models.tb_workspace import WorkspaceMember, Workspace

from docy.core.storage_drivers import default_s3_client
from docy.forms import EventForm
from docy.forms.agent import AgentUpdateForm
from docy.forms.message import InnerMessageCreateForm
from docy.forms.activity import ActivityInputForm, InputForm
from docy.utils.dt import get_current_utc_time
from docy.utils.enums import InnerModelEnum, InnerMessageStateEnum
from docy.services.activity.activity_log.log_handler import task_log_handler
from docy.services.audit.helper import audit
from docy.schema.audit import ResourceType, Action, Outcome
from docy.cache.cache_utils import save_to_cache
from docy.utils.sql_query import (
    retrieve_object_queryset,
    async_retrieve_object,
    async_list_objects,
    async_retrieve_object_queryset,
)
from docy.utils.topology.graph import GraphProcessor
from docy.utils.topology.graph_validation import verify_graph
from docy.utils._time import trans_timestamp_to_utc
from docy.schema.activity import (
    TaskListSchema,
    TemporaryTaskSchema,
    TASK_SCHEMA_SETTING,
    TaskDetailSchema,
)
from docy.schema.common import FileSchema
from docy.services.auth.utils.user import get_user_model
from docy.services.message import InnerMessageManager
from docy.services.common.manager import CommonManager
from docy.services.setting.manager import UserSettingManager
from docy.services.webhook.manager import WebhookManager
from docy.models.tb_workspace import WorkspaceType
from docy.core._response import pre_response as R
from docy.core.pagination import AsyncPagination
from docy.core.settings import project_settings as settings
from docy import const
from docy.services.workspace.manager import WorkspaceManager

RED_HEADER_COLOR = "#FF0B1A"
YELLOW_HEADER_COLOR = "#F2A026"
RED_FIELD_COLOR = "#FF0B1A26"
YELLOW_FIELD_COLOR = "#FEF6EA"
TIME_FORMAT = "%b %d"

# Fields maintained automatically by the task system: changes to them are not written to the
# audit log (the run lifecycle is already expressed by EXECUTE/COMPLETE/FAIL/ACTION_REQUIRED/
# CANCEL events), avoiding duplicate "Task Updated" records.
TASK_SYSTEM_UPDATE_FIELDS = {
    "json_temple",
    "run_result",
    "timestampdiff",
    "error_info",
    "last_run_id",
    "last_run_start_at",
    "last_run_end_at",
    "last_run_node",
    "current_run_node",
    "current_run_path",
    "status",
}


class ActivityManager(BaseManager):

    def __init__(self, task_type=1, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.default_task_type = TaskType(task_type)

    @staticmethod
    def get_model(_type: TaskType):
        return {
            TaskType.FOREVER_TASK: ActivityTask,
            TaskType.TEMPORARY_TASK: TemporaryTask,
        }.get(_type)

    def get_task_schema(self, task_type=None, detail=False):
        task_type = TaskType(task_type) if task_type else self.default_task_type
        if task_type == TaskType.FOREVER_TASK:
            if detail:
                schema = TaskDetailSchema
            else:
                schema = TaskListSchema
        else:
            schema = TemporaryTaskSchema
        return schema, TASK_SCHEMA_SETTING

    async def create_task(
        self,
        name: str,
        agent_id: str,
        agent_from: AGENTFROM,
        space_id: str = None,
        task_type: TaskType = TaskType.FOREVER_TASK,
        visible: bool = True,
        webhook_push: bool = True,
        **kwargs,
    ):
        """
        Create a task for the user.
        """
        # If agent_from is FROM_MARKET, the agent is copied first and the task is
        # then created from it; this path no longer exists in practice.
        from docy.services.agent.manager import AgentManager

        await self.check_object_permission("agent", agent_id)
        agent_manager = AgentManager(db=self.db, request=self.request)
        if agent_from == AGENTFROM.FROM_MARKET:
            agent_instance = await agent_manager.copy_agent_from_market(
                agent_id, space_id
            )
            agent_id = agent_instance.id
            agent_from = AGENTFROM.FROM_SPACE

        # Look up the agent instance
        agent_instance = await agent_manager.get_agent_by_id(agent_id)
        if not agent_instance:
            raise PE.ObjectNotFound(desc=f"agent({agent_id}) not found")

        # If space_id is not given, default to the agent's own space_id.
        if not space_id:
            space_id = agent_instance.space_id

        # Verify that the user is in the member list of the space
        await self.check_user_match_with_space(space_id)

        model = self.get_model(task_type)
        params = {
            "name": name,
            "agent_id": agent_id,
            "agent_from": agent_from,
            "creator_id": self.request.user.id,
            "task_space_id": space_id if space_id else agent_instance.space_id,
        }
        if agent_from == AGENTFROM.FROM_SPACE and task_type == TaskType.FOREVER_TASK:
            params["visible"] = visible
            params["webhook_push"] = webhook_push

        # Update the virtual tenant info
        v_space_id, v_user_id, metadata = (
            kwargs.get("virtual_space_id"),
            kwargs.get("virtual_user_id"),
            kwargs.get("raw_data", {}),
        )
        if v_space_id and v_user_id:
            params["virtual_space_id"] = v_space_id
            params["virtual_user_id"] = v_user_id

        task = model(**params)
        self.db.add(task)
        await self.db.commit()
        await self.db.flush(task)
        return task

    async def create_temporary_task(self, code: str, agent_id: str, agent_from: int):
        # Build the parameters
        name = f"temporary_task_{code}"
        agent = await async_retrieve_object(self.db, Agent, o_id=agent_id)
        if agent:
            task = await self.create_task(
                name,
                agent_id,
                AGENTFROM(agent_from),
                task_type=TaskType(2),
                space_id=agent.space_id,
            )
            return task

    def list_task(
        self,
        space_id: str = None,
        task_name: str | None = None,
        t_status: TaskStatus | None = None,
        user_id: str = None,
        commons: CommonParams = None,
        task_type: int = None,
        **kwargs,
    ):
        if not task_type:
            task_type = self.default_task_type
        model = self.get_model(task_type)
        condition = []
        if hasattr(model, "visible"):
            condition.append(model.visible.isnot(False))
        if space_id:
            condition.append(model.task_space_id == space_id)
        if user_id:
            condition.append(model.creator_id == user_id)
        if task_name:
            condition.append(model.name.ilike(f"%{task_name}%"))
        if t_status:
            condition.append(model.status == t_status)
        if kwargs.get("virtual_space_id"):
            condition.append(model.virtual_space_id == kwargs.get("virtual_space_id"))
        if kwargs.get("virtual_user_id"):
            condition.append(model.virtual_user_id == kwargs.get("virtual_user_id"))
        return retrieve_object_queryset(
            self.db,
            model,
            condition=condition,
            order_by=commons.get_order_by_express(model),
        )

    async def update_task(
        self,
        task_id,
        task_name=None,
        update_dict: dict = None,
        task_type=None,
        agent_id: str = None,
    ):
        """
        Update the task name.
        """
        if not task_type:
            task_type = self.default_task_type
        model = self.get_model(task_type)
        task = await async_retrieve_object(self.db, model, o_id=task_id)
        if task:
            # Record the pre-change field values to filter out no-op updates.
            _old_values = {}
            if task_name:
                _old_values["name"] = task.name
            if agent_id:
                _old_values["agent_id"] = task.agent_id
            if update_dict:
                for _k in update_dict:
                    _old_values[_k] = getattr(task, _k, None)
            if task_name:
                task.name = task_name
            if agent_id:
                # Check that the agent and task are in the same space
                agent = await async_retrieve_object(self.db, Agent, o_id=agent_id)
                if agent and agent.space_id == task.task_space_id:
                    task.agent_id = agent_id
                else:
                    raise PE.TaskInvalidAgentError
            if update_dict:
                for k, v in update_dict.items():
                    try:
                        setattr(task, k, v)
                    except:
                        pass
            self.db.add(task)
            await self.db.commit()
            await self.db.flush(task)

            # -- Audit record: task updated --
            # Only record user-visible fields that actually changed, ignore system-maintained
            # fields, and avoid duplicate "Task Updated" records from frontend re-saves or MQ updates.
            _updated_fields = [
                _f
                for _f, _old in _old_values.items()
                if getattr(task, _f, None) != _old
                and _f not in TASK_SYSTEM_UPDATE_FIELDS
            ]
            if not _updated_fields:
                return task
            await audit(self.request, self.db).write_quick(
                chain_id=f"{task.task_space_id}--{ResourceType.TASK.value}",
                resource_type=ResourceType.TASK,
                resource_id=task_id,
                action=Action.UPDATE,
                outcome=Outcome.SUCCESS,
                payload={"name": task.name, "updated_fields": _updated_fields},
            )
            return task
        raise PE.ObjectNotFound("Task not found!")

    async def get_task_state(self, space_id):
        """
        Count the completion status of the tasks.
        """
        basefilter = [
            ActivityTask.is_delete == False,
            ActivityTask.visible.isnot(False),
        ]
        if space_id:
            basefilter.append(ActivityTask.task_space_id == space_id)
        basefilter = and_(*basefilter)
        res = await self.db.execute(
            select(
                func.count(
                    case(
                        (
                            and_(
                                basefilter, ActivityTask.status == TaskStatus.COMPLETED
                            ),
                            1,
                        ),
                        else_=None,
                    )
                ).label("complete_count"),
                func.count(
                    case(
                        (basefilter, 1),
                        else_=None,
                    )
                ).label("all_count"),
            ).filter(basefilter)
        )
        res = res.one()
        return {
            "completed_task": res[0],
            "completed_rate": round(float(res[0] / res[1]), 2) if res[0] != 0 else 0,
        }

    async def get_task_by_id(self, task_id, task_type=None, run_id=None):
        """
        Get the task details by task ID.
        """
        if not task_type:
            task_type = self.default_task_type
        model = self.get_model(task_type)
        condition = [model.last_run_id == run_id] if run_id else []
        task = await async_retrieve_object(
            self.db, model, condition=condition, o_id=task_id
        )
        if task:
            return task
        raise PE.ObjectNotFound("Task not found!")

    async def get_task_detail(self, task_id, task_type=None, run_id=None):
        schema, _ = self.get_task_schema(detail=True)
        task = await self.get_task_by_id(task_id, run_id=run_id)
        return schema().dump(task)

    async def get_temporary_task_by_name(self, name):
        """
        Get the temporary task created by the user by task name.
        """
        model = self.get_model(TaskType(2))
        return await async_retrieve_object(
            self.db, model, condition=[model.name == name]
        )

    async def update_task_all(self, task_id: str, update_dict: dict):
        model = self.get_model(self.default_task_type)
        task = await async_retrieve_object(self.db, model, o_id=task_id)
        for key, val in update_dict.items():
            try:
                setattr(task, key, val)
            except:
                pass
        self.db.add(task)
        await self.db.commit()

    def valid_template_input(self, task_input, input_nodes) -> bool:
        """
        Verify that the key parameters defined in the agent are present.
        """
        for node in input_nodes:
            if node["id"] not in task_input:
                return False
            if node["label"] == const.INPUT_FILE:
                input_dict = task_input[node["id"]]
                if str(
                    node.get("variable", {}).get("required_type")
                ) != "optional" and not all(
                    [input_dict.get("files"), input_dict.get("key")]
                ):
                    return False
            else:
                input_dict = task_input[node["id"]]
                for item in input_dict["upload"]:
                    for node_item in node.get("variable", {}).get("upload"):
                        if item.get("key") == node_item.get("key"):
                            if str(
                                node_item.get("required_type")
                            ) != "optional" and not all(
                                [item.get("files"), item.get("key")]
                            ):
                                return False
        return True

    async def before_run_task(self, task_id, after_action=False, task_input=None):
        """
        Prepare the parameters for the task run here.
        """
        t_start = time.perf_counter()
        file_dl_ms = 0.0
        file_dl_count = 0
        data = {}
        task = await self.get_task_by_id(task_id)
        t1 = time.perf_counter()
        data["name"] = task.name
        # Validate the agent
        agent_id = task.agent_id
        agent = await async_retrieve_object(self.db, Agent, o_id=agent_id)
        t2 = time.perf_counter()
        if not agent:
            raise PE.TaskRunwithInvalidAgent
        # Get the JSON template of the agent.
        # Save the inputs before running the task.
        if task_input:
            await self.save_task_input(task_id, task_input)
        t3 = time.perf_counter()

        run_id = None
        if not after_action:
            if task.agent_from == AGENTFROM.FROM_SPACE:
                agent = await async_retrieve_object(self.db, Agent, o_id=task.agent_id)
            # Replace the inputs
            template_json = GraphProcessor(
                json.dumps(agent.template_json)
            ).get_cleaned_temple()
            graph = GraphProcessor(json_str=json.dumps(template_json))
            input_nodes = graph.get_input_nodes()
            # Validate that the JSON has input files, error out otherwise.
            if not self.valid_template_input(task.input_param, input_nodes):
                raise PE.RunTaskError
            # No error means all files needed by the task are present; now
            # replace the inputs.
            manager = CommonManager(db=self.db)
            for node in input_nodes:
                node_id = node["id"]
                node_info = task.input_param.get(node_id)
                if not node_info:
                    if node["label"] == const.INPUT_FILE:
                        node["variable"]["files"] = []
                        node["input_values"]["files"] = []
                    else:
                        node["variable"]["upload"] = []
                        node["input_values"]["upload"] = []
                else:
                    node["variable"] = node_info
                    node["input_values"] |= node_info

                new_files = {}
                new_files_list = []
                if "upload" in node["input_values"]:
                    for item in node["input_values"]["upload"]:
                        new_files_list.extend(item["files"])
                else:
                    new_files_list = node["input_values"]["files"]
                for file in new_files_list:
                    _t_dl = time.perf_counter()
                    instance = await manager.pre_download_file(file)
                    file_dl_ms += (time.perf_counter() - _t_dl) * 1000
                    file_dl_count += 1
                    if instance:
                        file = FileSchema().dump(instance)
                        new_files[file["file_key"]] = file
                node["input_values"]["files_map"] = new_files
                graph.replace_node(node_id, node)
            data["template_json"] = graph.config
        else:
            # Take the previous task configuration and continue running.
            # TODO: check whether the current node needs a manually added file;
            # if so, take the node file from the input.
            data["template_json"] = task.json_temple
            # Pass the current manual node in the parameters
            data["Interaction_node"] = task.current_run_node
            run_id = task.last_run_id
        data["run_info"] = {
            "task_id": task.id,
            "agent_id": agent_id,
            "space_id": task.task_space_id,
            "auth_type": self.request.scope["auth_type"],
            "api_key_id": self.request.scope["api_key_id"],
        }
        data["run_info"] |= {"user_id": self.request.user.id, "run_id": run_id}
        data["run_info"] |= {"run_source": "activities"}
        # Add more parameters here later if needed.
        # Validate before running:
        # first validate that custom node secrets are present.
        t4 = time.perf_counter()
        errors = verify_graph(data["template_json"], "task", except_input=False)
        t5 = time.perf_counter()
        if errors:
            raise PE.InvalidJsonTemplate(errors)
        logger.info(
            f"[perf] before_run_task task_id={task_id} total={(t5 - t_start) * 1000:.1f}ms | "
            f"get_task={(t1 - t_start) * 1000:.1f}ms agent={(t2 - t1) * 1000:.1f}ms "
            f"save_input={(t3 - t2) * 1000:.1f}ms graph={(t4 - t3) * 1000:.1f}ms "
            f"(files={file_dl_count} file_dl={file_dl_ms:.1f}ms) "
            f"verify_graph={(t5 - t4) * 1000:.1f}ms"
        )
        return data

    async def run_task(
        self, body, run_type, run_node: str = None, notice_enough_coin: bool = True
    ):
        """
        Run the task via lambda.
        """
        t_start = time.perf_counter()
        task_id = body["run_info"]["task_id"]
        # run_type == 'step' means the task is run while debugging the agent in
        # the editor; run_type == 'task' means the user is running the whole task.
        body["run_type"] = run_type
        body["run_info"]["run_node"] = run_node
        # Generate a unique ID for this run
        run_id = gen_snowflake_id()
        body["run_info"]["run_id"] = run_id
        # Fill in the other run info here first
        await self.fill_task_after_run_task(body)
        t1 = time.perf_counter()
        # Create the task record
        task_type = (
            TaskType.FOREVER_TASK if run_type == "task" else TaskType.TEMPORARY_TASK
        )
        # Validate the agent status before running:
        # for a task run, the agent status must not be inactive;
        # for a temporary run, it must not be inactive either.
        agent_instance = await async_retrieve_object(
            self.db, Agent, o_id=body["run_info"]["agent_id"]
        )
        if agent_instance:
            if agent_instance.status == AgentStatus.frozen:
                raise PE.InvalidAgentStatus(
                    f"Agent is in '{agent_instance.status.value}' status and cannot be run."
                )
            if (
                task_type == TaskType.FOREVER_TASK
                and agent_instance.status == AgentStatus.draft
            ):
                raise PE.InvalidAgentStatus(
                    f"Agent is in '{agent_instance.status.value}' status and cannot be run."
                )
        t2 = time.perf_counter()
        # Before running, first check whether the task can be billed.
        # Set the task status to queued first; the AI marks it running once it
        # starts. Pushing the notice here would leave the frontend without it.
        send_notice = False if run_type == "step" else True
        await self.update_task_status(
            task_id,
            TaskStatus.IN_PROGRESS,
            send_notice=send_notice,
            run_info=body["run_info"],
        )
        t3 = time.perf_counter()
        # Clear the previous run's logs before enqueueing the new run: late logs
        # of the old run are dropped by the in-lock run_id guard, and the AI
        # cannot emit new-run logs before the enqueue, so nothing written after
        # this cleanup is stale.
        await task_log_handler.cleanup_task_logger(task_id, self.db)
        # Call the AI interface here to run the task
        call_lambda(
            "open-docy:latest",
            {"body": body},
            asynchronous=True,
        )
        t4 = time.perf_counter()
        # After the task runs, delete the previously shared file upload links;
        # the links expire once the task starts.
        # Add the event push here to notify the frontend that the task started
        self.bg_task.add_task(
            self.push_task_start,
            body["run_info"]["user_id"],
            body["run_info"]["run_source"],
            task_id,
            run_id,
        )
        t5 = time.perf_counter()
        logger.info(
            f"[perf] run_task task_id={task_id} total={(t5 - t_start) * 1000:.1f}ms | "
            f"fill={(t1 - t_start) * 1000:.1f}ms "
            f"agent_check={(t2 - t1) * 1000:.1f}ms "
            f"update_status={(t3 - t2) * 1000:.1f}ms "
            f"call_lambda_enqueue={(t4 - t3) * 1000:.1f}ms "
            f"bg_add={(t5 - t4) * 1000:.1f}ms"
        )
        return {"run_id": run_id, "task_id": task_id}

    # OSE removed RabbitMQ (task logs now go through the self-hosted core/mq).
    # The notify_task_log method had no call sites and contained hardcoded
    # credentials, so it was kept only as a commented-out reference.

    async def push_task_start(self, user_id, run_source, task_id, run_id):
        """
        Push a message when the task starts running.
        """
        payload = {"task_id": task_id, "run_id": run_id}
        event = EventForm(
            event_type=const.TASK_RUN_START,
            object_id=user_id,
            object_type="user",
            payload=payload,
            page=run_source,
        )
        await sse_manager.push_message(event)


    async def fill_task_after_run_task(
        self,
        body: dict,
        after_action: bool = False,
    ):
        task_id = body["run_info"]["task_id"]
        task = await self.get_task_by_id(task_id)
        if task:
            current_time = datetime.now(UTC)
            task.last_run_start_at = current_time
            task.last_run_end_at = None
            if not after_action:
                temple_json = body["template_json"]
                if body["run_type"] == "step":
                    task.run_node = body["run_info"]["run_node"]
                # The following are all common fields
                task.last_run_id = body["run_info"]["run_id"]
                task.last_run_at = current_time
                task.last_run_json_temple = temple_json
                task.json_temple = temple_json
                task.error_info = None
                task.current_run_path = None
                task.timestampdiff = None
            self.db.add(task)
            await self.db.commit()

    async def update_task_status(
        self,
        task_id: str,
        status: TaskStatus,
        task_type: TaskType = None,
        error_info: str = None,
        send_notice=True,
        check_status: bool = True,
        run_info: dict = None,
    ):
        if not task_type:
            task_type = self.default_task_type
        task = await self.get_task_by_id(task_id, task_type)
        if task:
            pre_status = task.status
            # Check whether the current status can be changed
            task.status = status
            await self.update_task_record_status(task_id, task.last_run_id, status)
            if status == TaskStatus.ERROR and error_info:
                # Fill in the error info as well
                task.error_info = error_info
            self.db.add(task)
            await self.db.commit()

            if send_notice:
                # Notify the frontend that the task status changed
                payload = {
                    "task_id": task_id,
                    "pre_status": pre_status.value,
                    "changed_status": status.value,
                }
                if status == TaskStatus.ERROR and error_info:
                    payload["error_info"] = error_info
                run_info = {}
                if run_info:
                    payload["run_info"] = run_info
                event = EventForm(
                    event_type=constants.TASK_STATUS_CHANGED,
                    payload=payload,
                    page=run_info.get("run_source", None),
                )
                await sse_manager.push_message(event, global_message=True)

                # Send a message to the webhook
                if hasattr(task, "webhook_push") and task.webhook_push:
                    # Push a message to the user via webhook
                    webhook_manager = WebhookManager(db=self.db, request=self.request)
                    await webhook_manager.request_webhook_event(event.model_dump())

    async def update_task_record_status(self, task_id, run_id, status):
        condition = [TaskRecord.task_id == task_id]
        if run_id:
            condition.append(TaskRecord.run_id == run_id)
        task_record = await async_retrieve_object(
            self.db,
            TaskRecord,
            condition=condition,
        )
        if task_record:
            task_record.status = status
            self.db.add(task_record)
            await self.db.commit()

    async def update_task_record(self, run_id, update_dict: dict):
        task_record = await async_retrieve_object(
            self.db,
            TaskRecord,
            condition=[TaskRecord.run_id == run_id],
        )
        if task_record and update_dict:
            for k, v in update_dict.items():
                try:
                    setattr(task_record, k, v)
                except:
                    pass
            self.db.add(task_record)
            await self.db.commit()

    def status_can_changed(self, before_status: TaskStatus, change_status: TaskStatus):
        """
        Status transition map:
        NOT_START [can only be set after cancel is clicked]
        QUEUED  [NOT_START, ERROR, COMPLETED]
        IN_PROGRESS [QUEUED, ACTION_REQUIRED,]
        COMPLETED [ACTION_REQUIRED, IN_PROGRESS]
        ACTION_REQUIRED [IN_PROGRESS, QUEUED]
        ERROR [QUEUED, IN_PROGRESS, ACTION_REQUIRED]
        """
        error_msg = f"Can not change task status form {before_status.value} to {change_status.value}."
        if change_status == TaskStatus.QUEUED and before_status not in [
            TaskStatus.NOT_START,
            TaskStatus.ERROR,
            TaskStatus.COMPLETED,
        ]:
            raise PE.UpdateTaskStatusFailed(error_msg)
        if change_status == TaskStatus.IN_PROGRESS and before_status not in [
            TaskStatus.QUEUED,
            TaskStatus.ACTION_REQUIRED,
        ]:
            raise PE.UpdateTaskStatusFailed(error_msg)
        if change_status == TaskStatus.COMPLETED and before_status not in [
            TaskStatus.IN_PROGRESS,
            TaskStatus.ACTION_REQUIRED,
        ]:
            raise PE.UpdateTaskStatusFailed(error_msg)
        if change_status == TaskStatus.ACTION_REQUIRED and before_status not in [
            TaskStatus.IN_PROGRESS,
            TaskStatus.QUEUED,
        ]:
            raise PE.UpdateTaskStatusFailed(error_msg)
        if change_status == TaskStatus.ERROR and before_status not in [
            TaskStatus.QUEUED,
            TaskStatus.IN_PROGRESS,
            TaskStatus.ACTION_REQUIRED,
        ]:
            raise PE.UpdateTaskStatusFailed(error_msg)

    async def single_delete_task(self, task_id, task_type=None):
        if not task_type:
            task_type = self.default_task_type
        model = self.get_model(task_type)
        await self.check_object_permission("task", task_id)
        task = await async_retrieve_object(self.db, model, o_id=task_id)
        if task:
            await self.delete_task([task])

    async def bulk_delete_task(self, task_ids, task_type=None):
        if not task_type:
            task_type = self.default_task_type
        model = self.get_model(task_type)
        tasks = await async_list_objects(
            self.db, model, condition=[model.id.in_(task_ids)]
        )
        deleted = await self.delete_task(tasks)
        # Audit record: task batch delete writes a single record with the
        # deleted tasks in the payload. Single delete is audited in the API
        # layer; only the batch is recorded here.
        if deleted:
            _names = [t.name for t in deleted]
            _ids = [t.id for t in deleted]
            _space_ids = {getattr(t, "task_space_id", "") for t in deleted}
            _space_id = next((s for s in _space_ids if s), "")
            await audit(self.request, self.db).write_quick(
                chain_id=(
                    f"{_space_id}--{ResourceType.TASK.value}"
                    if _space_id
                    else ResourceType.TASK.value
                ),
                resource_type=ResourceType.TASK,
                resource_id=_space_id or "batch",
                action=Action.BATCH_DELETE,
                outcome=Outcome.SUCCESS,
                payload={"name": _names, "ids": _ids, "count": len(_ids)},
            )
        return deleted

    async def delete_task(self, tasks) -> list:
        """Delete the given tasks and return those actually deleted (tasks in other statuses are kept)."""
        deleted = []
        for task in tasks:
            if task.status in [
                TaskStatus.NOT_START,
                TaskStatus.COMPLETED,
                TaskStatus.ERROR,
            ]:
                await task.async_delete()
                deleted.append(task)
        return deleted

    # The following are MQ-related functions
    async def action_task_result(self, **kwargs):
        """
        Task-related handlers.
        """
        run_info = kwargs.get("run_info")
        result = kwargs.get("result")
        task_id = run_info["task_id"]
        run_id = run_info["run_id"]
        user_id = run_info["user_id"]
        space_id = run_info["space_id"]
        usage = kwargs.get("usage", {})
        model = self.get_model(self.default_task_type)
        task_by_id = await async_retrieve_object(self.db, model, o_id=task_id)
        task = await async_retrieve_object(
            self.db, model, condition=[model.id == task_id, model.last_run_id == run_id]
        )
        content = ""
        payload = copy.deepcopy(run_info)
        notified = True  # Whether to remind the user via in-app message; default yes, but not when the task is invisible, since the reminder could not be seen on the page
        if hasattr(task, "visible") and task.visible is False:
            notified = False
        if result and task:
            space = await async_retrieve_object(self.db, Workspace, o_id=space_id)
            failed = True if result["status"] == "failed" else False
            now_time = datetime.now(UTC)
            manual_nodes = []
            if failed:
                # This run failed.
                # 1. Set the task status to failed first.
                content = "task run failed."
                await self.update_task_status(
                    task_id, TaskStatus.ERROR, check_status=False, run_info=run_info
                )
                # 2. Then update the task info.
                # The run failed; compute the run duration.
                ttimestampdiff = int(
                    now_time.timestamp() - task.last_run_start_at.timestamp()
                )
                update_dict = {
                    "last_run_id": None,
                    "last_run_end_at": now_time,
                    "last_run_node": None,
                    "current_run_node": None,
                    "error_info": result.get("error"),
                    "timestampdiff": (
                        (task.timestampdiff + ttimestampdiff)
                        if task.timestampdiff
                        else ttimestampdiff
                    ),
                }
                await self.update_task(task_id, update_dict=update_dict)
                await self.update_task_record(
                    run_id, {"timestampdiff": update_dict["timestampdiff"]}
                )

                # Audit record: the task run failed (MQ callback; the actor is
                # the user who triggered the run). The failed status and
                # duration are already committed; the payload carries the error.
                _fail_space_id = space_id or getattr(task, "task_space_id", "") or ""
                await audit(self.request, self.db).write_quick(
                    chain_id=(
                        f"{_fail_space_id}--{ResourceType.TASK.value}"
                        if _fail_space_id
                        else ResourceType.TASK.value
                    ),
                    resource_type=ResourceType.TASK,
                    resource_id=task_id,
                    action=Action.FAIL,
                    outcome=Outcome.FAILURE,
                    payload={
                        "name": task.name,
                        "space_id": _fail_space_id,
                        "run_id": run_id,
                        "error": result.get("error"),
                    },
                )

                # The run failed; no quota deduction needed.

                # Notify the user of the failure (the original email notification
                # was removed; an in-app message is sent instead).
                if notified:
                    await InnerMessageManager(
                        db=self.db, bg_task=None, request=self.request
                    ).create_inner_message(
                        InnerMessageCreateForm(
                            space_id=space_id,
                            title=const.MESSAGE_DICT["TASK_FAILED"]["TITLE"],
                            content=const.MESSAGE_DICT["TASK_FAILED"][
                                "CONTENT"
                            ].format(
                                task_title=task.name,
                                failure_reason=result.get("error") or "Unknown",
                                task_link=f"{settings.server.base_url}/activity",
                            ),
                            receive_user_id=self.request.user.id,
                            receive_user_email=self.request.user.email,
                            model=InnerModelEnum.agent,
                            state=InnerMessageStateEnum.notice,
                        )
                    )
            else:
                action_required = (
                    True if result["status"] == "action_required" else False
                )
                # The call succeeded
                update_dict = {}
                manual_nodes = (
                    task.current_run_node.split(const.G_SEP)
                    if task.current_run_node
                    else []
                )
                if action_required:
                    update_dict["last_run_end_at"] = now_time
                    ttimestampdiff = int(
                        now_time.timestamp() - task.last_run_start_at.timestamp()
                    )
                    update_dict["timestampdiff"] = (
                        (task.timestampdiff + ttimestampdiff)
                        if task.timestampdiff
                        else ttimestampdiff
                    )
                    # Manual intervention required
                    content = "action required."
                    await self.update_task_status(
                        task_id,
                        TaskStatus.ACTION_REQUIRED,
                        check_status=False,
                        run_info=run_info,
                    )
                    # Manual intervention required; send an in-app message to
                    # notify the user.
                    actual_link = f"{settings.server.base_url}/activity/manual-intervention?task_id={task_id}"

                    # In-app message
                    if notified:
                        await InnerMessageManager(
                            db=self.db, bg_task=None, request=self.request
                        ).create_inner_message(
                            InnerMessageCreateForm(
                                space_id=space_id,
                                title=const.MESSAGE_DICT["MANUAL_ACTION_REQUIRED"][
                                    "TITLE"
                                ],
                                content=const.MESSAGE_DICT["MANUAL_ACTION_REQUIRED"][
                                    "CONTENT"
                                ].format(task_link=actual_link),
                                receive_user_id=self.request.user.id,
                                receive_user_email=self.request.user.email,
                                model=InnerModelEnum.agent,
                                state=InnerMessageStateEnum.notice,
                            )
                        )

                    # Audit record: the task run reached a manual node and is
                    # waiting for human action; manual_nodes is the list of
                    # manual node ids the run is paused at.
                    _ar_space_id = space_id or getattr(task, "task_space_id", "") or ""
                    await audit(self.request, self.db).write_quick(
                        chain_id=(
                            f"{_ar_space_id}--{ResourceType.TASK.value}"
                            if _ar_space_id
                            else ResourceType.TASK.value
                        ),
                        resource_type=ResourceType.TASK,
                        resource_id=task_id,
                        action=Action.ACTION_REQUIRED,
                        outcome=Outcome.SUCCESS,
                        payload={
                            "name": task.name,
                            "space_id": _ar_space_id,
                            "run_id": run_id,
                            "manual_nodes": manual_nodes,
                        },
                    )
                else:
                    # Update the task info, save the JSON, and push a message to
                    # the frontend.
                    # Delete the previously created share link
                    content = "task finished."
                    await self.update_task_status(
                        task_id,
                        TaskStatus.COMPLETED,
                        check_status=False,
                        run_info=run_info,
                    )
                    addition = kwargs.get("addition")
                    if addition:
                        update_dict["run_result"] = addition
                    update_dict["last_run_end_at"] = now_time
                    update_dict["last_run_node"] = None
                    update_dict["current_run_node"] = None
                    update_dict["current_run_path"] = None
                    ttimestampdiff = int(
                        now_time.timestamp() - task.last_run_start_at.timestamp()
                    )
                    update_dict["timestampdiff"] = (
                        (task.timestampdiff + ttimestampdiff)
                        if task.timestampdiff
                        else ttimestampdiff
                    )
                    # Notify the user that the task run finished (the original
                    # email notification was removed; an in-app message is sent).
                    if notified:
                        await InnerMessageManager(
                            db=self.db, bg_task=None, request=self.request
                        ).create_inner_message(
                            InnerMessageCreateForm(
                                space_id=space_id,
                                title=const.MESSAGE_DICT["TASK_COMPLETED"]["TITLE"],
                                content=const.MESSAGE_DICT["TASK_COMPLETED"][
                                    "CONTENT"
                                ].format(
                                    task_title=task.name,
                                    task_link=(
                                        f"{settings.server.base_url}/activity/audit-extract-generate"
                                        f"?task_id={task_id}&task_name={task.name}&activatedTab=0"
                                    ),
                                ),
                                receive_user_id=self.request.user.id,
                                receive_user_email=self.request.user.email,
                                model=InnerModelEnum.agent,
                                state=InnerMessageStateEnum.notice,
                            )
                        )
                    # The run succeeded; deduct the quota.

                    # Audit record: the task run completed (the status is
                    # already committed).
                    _done_space_id = space_id or getattr(task, "task_space_id", "") or ""
                    await audit(self.request, self.db).write_quick(
                        chain_id=(
                            f"{_done_space_id}--{ResourceType.TASK.value}"
                            if _done_space_id
                            else ResourceType.TASK.value
                        ),
                        resource_type=ResourceType.TASK,
                        resource_id=task_id,
                        action=Action.COMPLETE,
                        outcome=Outcome.SUCCESS,
                        payload={
                            "name": task.name,
                            "space_id": _done_space_id,
                            "run_id": run_id,
                        },
                    )

                # The run succeeded; the quota is deducted via an HTTP request.
                # Replace the JSON of the pushed nodes
                json_temple = copy.deepcopy(task.json_temple)
                nodes = json_temple.get("nodes")
                if nodes:
                    # Build a map of the new nodes for fast lookup
                    new_nodes_map = {
                        new_node["id"]: new_node
                        for new_node in result["json"].get("nodes", [])
                    }
                    manual_nodes_set = set(
                        manual_nodes
                    )  # Make manual_nodes a hashable set to speed up `in` checks

                    for idx, node in enumerate(nodes):
                        node_id = node["id"]
                        # 1. Prefer replacing with the new node
                        base_node = new_nodes_map.get(node_id, node)

                        # 2. For manual nodes, clear the input fields
                        if node_id in manual_nodes_set:
                            # A deep copy is required before modifying the node
                            # to avoid affecting the data source.
                            base_node = copy.deepcopy(base_node)
                            # Reset the variable-related fields
                            var = base_node.setdefault("variable", {})
                            var.update({"files": [], "test_text": "", "value": {}})
                            # Reset the input_values-related fields
                            inv = base_node.setdefault("input_values", {})
                            inv.update(
                                {
                                    "files": [],
                                    "test_text": "",
                                    "value": {},
                                    "files_map": {},
                                }
                            )

                        # 3. Write the node back to the node array
                        nodes[idx] = base_node

                update_dict["json_temple"] = json_temple
                await self.update_task(task_id, update_dict=update_dict)
                await self.update_task_record(
                    run_id, {"timestampdiff": update_dict["timestampdiff"]}
                )

            if hasattr(task, "tenant_id"):
                # Carry the virtual tenant info
                payload |= {
                    "virtual_space_id": task.virtual_space_id,
                    "virtual_user_id": task.virtual_user_id,
                    "metadata": task.raw_data,
                }
            # Push a message to the frontend
            payload |= result
            content = content if content else None
            event = EventForm(
                event_type=const.TASK_FINISHED,
                object_id=user_id,
                object_type="user",
                content=content,
                payload=payload,
                page=run_info.get("run_source", None),
            )
            await sse_manager.push_message(event)

            # Send a message to the webhook
            if hasattr(task, "webhook_push") and task.webhook_push:
                # Push a message to the user via webhook
                webhook_manager = WebhookManager(db=self.db, request=self.request)
                await webhook_manager.request_webhook_event(event.model_dump())


    async def action_node_finish(self, **kwargs):
        """
        Push progress to the frontend when each node finishes running.
        """
        from docy.services.agent.manager import AgentManager

        run_info = kwargs.get("run_info")
        result = kwargs.get("result")
        task_id = run_info["task_id"]
        node = result["json"]["nodes"][0]
        run_node = run_info["run_node"]
        model = self.get_model(self.default_task_type)
        task = await async_retrieve_object(
            self.db,
            model,
            condition=[model.id == task_id, model.last_run_id == run_info["run_id"]],
        )

        content = ""
        if result and task:
            payload = copy.deepcopy(run_info)
            node_json = result["json"]  # This is the JSON of the running node

            # Push a message to the frontend
            payload |= result
            content = content if content else None
            user_id = run_info["user_id"]
            event = EventForm(
                event_type=const.NODE_FINISHED,
                object_id=user_id,
                object_type="user",
                content=content,
                payload=payload,
                page=run_info.get("run_source", None),
            )
            await sse_manager.push_message(event)

            failed = True if result["status"] == "failed" else False
            if failed:
                # The run failed, so this entire run has failed
                content = "task run failed."
                await self.update_task_status(
                    task_id, TaskStatus.ERROR, check_status=False, run_info=run_info
                )
                update_dict = {
                    "last_run_id": None,
                    "last_run_end_at": datetime.utcnow(),
                    "error_info": result.get("error"),
                    "last_run_node": None,
                    "current_run_node": None,
                }
                await self.update_task(task_id, update_dict=update_dict)
            else:
                action_required = (
                    True if result["status"] == "action_required" else False
                )
                update_dict = {}
                if action_required:
                    # Manual intervention required
                    content = "action required."
                    await self.update_task_status(
                        task_id,
                        TaskStatus.ACTION_REQUIRED,
                        check_status=False,
                        run_info=run_info,
                    )
                else:
                    # A single node ran successfully
                    if run_node == node["id"]:
                        # The current node is the last node of this run; update
                        # the task info.
                        content = "task finished."
                        await self.update_task_status(
                            task_id,
                            TaskStatus.COMPLETED,
                            check_status=False,
                            run_info=run_info,
                        )
                        addition = result.get("addition")
                        if addition:
                            update_dict["run_result"] = addition
                        update_dict["last_run_end_at"] = datetime.utcnow()
                        update_dict["last_run_node"] = None
                        update_dict["current_run_node"] = None
            # Replace the JSON of the pushed nodes
            json_temple = copy.deepcopy(task.json_temple)
            for idx, node in enumerate(json_temple["nodes"] or []):
                current_node = payload["json"]["nodes"][0]
                if node["id"] == current_node["id"]:
                    # Replace the node
                    try:
                        json_temple["nodes"][idx] = payload["json"]["nodes"][0]
                    except:
                        pass
                    break
            update_dict["json_temple"] = json_temple

            # Send a message to the webhook
            if hasattr(task, "webhook_push") and task.webhook_push:
                # Push a message to the user via webhook
                webhook_manager = WebhookManager(db=self.db, request=self.request)
                await webhook_manager.request_webhook_event(event.model_dump())

            # If the task was created by an agent, the data in redis and the
            # agent must be updated too.
            agent_code = run_info.get("code")
            if agent_code:
                agent_manager = AgentManager(request=self.request, db=self.db)
                agent = AgentUpdateForm(template_json=json_temple)
                await agent_manager.pre_add_or_update_agent(
                    agent, agent_code, save_as_draft=False
                )
            await self.update_task(task_id, update_dict=update_dict)

    async def action_update_task_status(self, **kwargs):
        """
        Called by the AI to update the task status.
        """
        run_info = kwargs.get("run_info")
        task_id = run_info["task_id"]
        model = self.get_model(self.default_task_type)
        task = await async_retrieve_object(
            self.db,
            model,
            condition=[model.id == task_id, model.last_run_id == run_info["run_id"]],
        )
        try:
            status = TaskStatus(kwargs.get("status"))
        except:
            status = None
        if task and status and status != TaskStatus.QUEUED:
            await self.update_task_status(task_id, status=status, run_info=run_info)

    async def action_node_start(self, **kwargs):
        """
        Tell the backend which node is currently running.
        """
        run_info = kwargs.get("run_info")
        notice_mode = kwargs.get("notice_mode", "start")
        task_id = run_info["task_id"]
        model = self.get_model(self.default_task_type)
        task = await async_retrieve_object(
            self.db,
            model,
            condition=[model.id == task_id, model.last_run_id == run_info["run_id"]],
        )
        if task:
            act_last_node = task.current_run_node
            act_current_node = kwargs.get("current_node")
            saved_current_node = (
                const.G_SEP.join(act_current_node)
                if isinstance(act_current_node, list)
                else act_current_node
            )
            if notice_mode == "start":
                await self.update_task(
                    task_id,
                    update_dict={
                        "last_run_node": act_last_node,
                        "current_run_node": saved_current_node,
                    },
                )
            # After the update, notify the frontend of the current running node.
            # If it is a start, look up the related nodes.
            # If it is an end, remove the related paths.
            c_paths = await self.get_run_path(
                task.json_temple,
                act_current_node,
                task.current_run_path or [],
                notice_mode,
            )
            # Update the paths
            task.current_run_path = c_paths
            self.db.add(task)
            await self.db.commit()

            # Push a message to the frontend
            payload = copy.deepcopy(run_info)
            user_id = run_info["user_id"]
            payload |= {
                "last_run_node": act_last_node,
                "current_run_node": act_current_node,
                "run_paths": c_paths,
                "notice_mode": notice_mode,
            }
            event = EventForm(
                event_type=const.NODE_CHANGED,
                object_id=user_id,
                object_type="user",
                payload=payload,
                page=run_info.get("run_source", None),
            )
            await sse_manager.push_message(event)

    async def get_run_path(
        self, json_temple, current_node, old_paths: list, notice_mode="start"
    ):
        final_paths = []
        if old_paths:
            old_paths = [tuple(path) for path in old_paths]

        graph = GraphProcessor(json.dumps(json_temple))

        # Support current_node being a string or a list
        if isinstance(current_node, list):
            # When current_node is a list (e.g. multiple manual review nodes in
            # parallel)
            target_paths = []
            for node_id in current_node:
                predecessors = list(graph.find_n_step_predecessors(node_id))
                target_paths.extend([(n, node_id) for n in predecessors])
        else:
            # Original logic: current_node is a string
            predecessors = list(graph.find_n_step_predecessors(current_node))
            target_paths = [(n, current_node) for n in predecessors]

        if notice_mode == "start":
            final_paths = copy.deepcopy(old_paths)
            for path in target_paths:
                if path not in old_paths:
                    final_paths.append(path)
        else:
            delete_paths = []
            for path in target_paths:
                if path in old_paths:
                    delete_paths.append(path)
            final_paths = list(set(old_paths) - set(delete_paths))

        # Convert tuples back to lists so the result is serializable
        return [list(path) for path in final_paths]

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
        extractor_type = run_info.get("extractor_type")
        extract_run_id = run_info.get("extract_run_id")
        if extract_run_id:
            # Push the result to the frontend
            payload = copy.deepcopy(run_info)
            payload["result"] = kwargs.get("result")
            event = EventForm(
                event_type=const.NODE_CHANGED,
                object_id=run_info["user_id"],
                object_type="user",
                payload=payload,
                page=run_info.get("run_source", None),
            )
            await sse_manager.push_message(event)

            key = f"{extract_run_id}_extractor_state"
            # TODO: save the result to redis and the database.
            # Update the task status
            task_state = {"status": "finished", "result": kwargs.get("result")}
            await save_to_cache(key, task_state)

    async def cancel_task(self, task_id: str, run_id: str):
        model = self.get_model(self.default_task_type)
        condition = []
        if run_id:
            condition = [model.last_run_id == run_id]
        task = await async_retrieve_object(
            self.db, model, o_id=task_id, condition=condition
        )
        if task:
            # First change the status of the current task record to cancelled
            await self.update_task_record_status(task_id, run_id, TaskStatus.NOT_START)
            # Reset the task
            await self.reset_task(task_id)
            # Update the task status
            await self.update_task_status(task_id, TaskStatus.NOT_START)
            # Audit record: the task run was cancelled; the payload carries
            # the task name and run_id.
            _cancel_space_id = getattr(task, "task_space_id", "") or ""
            await audit(self.request, self.db).write_quick(
                chain_id=(
                    f"{_cancel_space_id}--{ResourceType.TASK.value}"
                    if _cancel_space_id
                    else ResourceType.TASK.value
                ),
                resource_type=ResourceType.TASK,
                resource_id=task_id,
                action=Action.CANCEL,
                outcome=Outcome.SUCCESS,
                payload={
                    "name": task.name,
                    "space_id": _cancel_space_id,
                    "run_id": run_id,
                },
            )

    async def reset_task(self, task_id: str):
        """
        Reset the task-related info.
        """
        model = self.get_model(self.default_task_type)
        task = await async_retrieve_object(
            self.db,
            model,
            o_id=task_id,
        )
        if task:
            task.last_run_id = None
            task.last_run_start_at = None
            task.last_run_end_at = None
            task.current_run_path = None
            task.error_info = None
            self.db.add(task)
            await self.db.commit()

    async def run_task_continue(self, body, run_type, run_node=None):
        task_id = body["run_info"]["task_id"]
        run_id = body["run_info"]["run_id"]
        body["run_type"] = (
            run_type  # run_type == 'step' means the task is run while debugging the agent in the editor; run_type == 'task' means the user is running the whole task
        )
        body["run_node"] = run_node
        body["run_id"] = run_id
        body["run_after_action"] = True
        await self.fill_task_after_run_task(body, after_action=True)
        # Check whether the manual nodes have a type selected
        try:
            self.check_select_interaction_node(
                body["Interaction_node"], body["template_json"]
            )
        except Exception as e:
            raise e
        # Change the status to IN_PROGRESS right after the call
        send_notice = False if run_type == "step" else True
        await self.update_task_status(
            task_id,
            TaskStatus.IN_PROGRESS,
            send_notice=send_notice,
            run_info=body["run_info"],
        )
        # Call the AI to continue running
        call_lambda(
            "open-docy:latest",
            {"body": body},
            asynchronous=True,
        )
        return run_id, task_id

    def check_select_interaction_node(self, interaction_node_ids, temple_json):
        """
        Check whether the manual nodes in the JSON have a selection type.
        """
        graph = GraphProcessor(json.dumps(temple_json))
        interaction_nodes = graph.get_manual_node(
            interaction_node_ids.split(const.G_SEP)
        )
        # Iterate over the manual nodes and check the nodes that need a selection
        for node in interaction_nodes:
            variable = node.get("variable", {})
            input_type = variable.get("input_type", "")
            if input_type.lower() == "select":
                value = variable.get("value", {})
                if not value.get("value"):
                    msg = f"The interaction node #{node['uid']} must have a selection specified. Please choose an option and retry."
                    raise PE.OperationFailed(msg)

    async def run_after_action(self, task_id, exict_loop=False):
        model = self.get_model(self.default_task_type)
        task = await async_retrieve_object(self.db, model, o_id=task_id)
        if task:
            # TODO: check whether the nodes requiring manual action meet the
            # conditions to continue running.
            body = await self.before_run_task(task_id, after_action=True)
            if not task.current_run_node:
                raise PE.InternalServerError
            body["exict_loop"] = exict_loop
            result = await self.run_task_continue(body, "task", task.current_run_node)

            # Audit record: the task resumed after manual action (the actor is
            # the current requesting user).
            _resume_run_id = body.get("run_info", {}).get("run_id") or (
                result[0] if result else None
            )
            _resume_space_id = (
                body.get("run_info", {}).get("space_id")
                or getattr(task, "task_space_id", "")
                or ""
            )
            await audit(self.request, self.db).write_quick(
                chain_id=(
                    f"{_resume_space_id}--{ResourceType.TASK.value}"
                    if _resume_space_id
                    else ResourceType.TASK.value
                ),
                resource_type=ResourceType.TASK,
                resource_id=task_id,
                action=Action.RESUME,
                outcome=Outcome.SUCCESS,
                payload={
                    "name": task.name,
                    "space_id": _resume_space_id,
                    "run_id": _resume_run_id,
                },
            )
            return result
        raise PE.ObjectNotFound("Task not found.")

    async def find_result_before_manual(self, task_id):
        # todo: this needs to change; with multiple manual nodes, the result of
        # the previous node must be returned for each one.
        model = self.get_model(self.default_task_type)
        task = await async_retrieve_object(self.db, model, o_id=task_id)
        interaction_nodes = (
            task.current_run_node.split(const.G_SEP) if task.current_run_node else []
        )
        if task and task.status == TaskStatus.ACTION_REQUIRED and interaction_nodes:
            graph = GraphProcessor(json.dumps(task.json_temple))
            # If there is more than one node, return a mapping per node. Needs
            # optimization: when two nodes point to the same predecessor, it
            # need not be added twice.
            nodes = []
            for inter_node in interaction_nodes:
                node_id = graph.find_n_step_predecessors(inter_node)
                if node_id:
                    node = graph.get_node_by_node_id(list(node_id)[0])
                    output_values = node.get("output_values")
                    if "files" in output_values:
                        path = output_values.get("files", {}).get("path")
                        if path:
                            output_values["files"]["path"] = [
                                default_s3_client.url(f) for f in path
                            ]
                    node["output_values"] = output_values
                    for inter_map in nodes:
                        if inter_map["predecessor"] == node:
                            inter_map["interaction_node_id"].append(inter_node)
                            break
                    else:
                        nodes.append(
                            {"interaction_node_id": [inter_node], "predecessor": node}
                        )
            return nodes

    async def log_stream_watched(self, task_id):
        model = self.get_model(self.default_task_type)
        task = await async_retrieve_object(self.db, model, o_id=task_id)
        if task and task.status == TaskStatus.IN_PROGRESS:
            # This means the user logs need to be watched
            return True
        return False

    async def write_log(self, **kwargs):
        """
        Receive AI logs and persist them for the running task.
        """
        # 1. Push the log to the frontend via SSE.
        # 2. Persist it to the local cache and the task's log column.
        data = kwargs.get("data")
        run_info = data.get("run_info")
        task_id = run_info["task_id"]
        run_id = run_info["run_id"]
        log_content = data.get("log_info", "")
        model = self.get_model(self.default_task_type)
        task = await async_retrieve_object(
            self.db, model, o_id=task_id, condition=[model.last_run_id == run_id]
        )
        if not task:
            return
        event_form = EventForm(
            event_type=const.TASK_LOG,
            object_id=task_id,
            object_type=const.TASK,
            content=log_content,
        )
        await sse_manager.push_message(event_form, global_message=False)

        # Persist the log line (same timestamp format as the legacy version) into
        # the local cache and ActivityTask.last_run_logs; Redis is replaced by the
        # OSE cache (cashews + diskcache).
        await task_log_handler.write_log(
            task_id,
            self.db,
            f"{datetime.utcnow().isoformat(timespec='seconds')} - {log_content}",
            run_id=run_id,
            model=model,
        )



    async def get_task_input_nodes(self, task_id: str) -> list:
        model = self.get_model(self.default_task_type)
        await self.check_object_permission("task", task_id)
        task = await async_retrieve_object(db=self.db, model=model, o_id=task_id)
        # The task JSON cannot be used directly because it is only pulled from
        # the agent or market at run time.
        if not task:
            raise PE.ObjectNotFound("Task not found!")
        # First find the corresponding agent
        agent = None
        if task.agent_from == AGENTFROM.FROM_SPACE:
            # This one was created from an agent
            agent = await async_retrieve_object(
                db=self.db, model=Agent, o_id=task.agent_id
            )
        if not agent:
            return []
        graph = GraphProcessor(json.dumps(agent.template_json))
        input_nodes = graph.get_input_nodes()
        for node in input_nodes:
            node_id = node["id"]
            node_info = task.input_param.get(node_id)
            if not node_info:
                if node["label"] == const.INPUT_FILE:
                    node["variable"]["files"] = []
                else:
                    for item in node["variable"].get("upload", []):
                        item["files"] = []
            else:
                node["variable"] = node_info
            graph.replace_node(node_id, node)
        manager = CommonManager(db=self.db)
        input_nodes = graph.get_input_nodes()
        for node in input_nodes:
            new_files = {}
            variable = node.get("variable") or []
            if node["label"] == const.INPUT_FILE:
                for file in variable.get("files", []):
                    instance = await manager.pre_download_file(file)
                    if instance:
                        file = FileSchema().dump(instance)
                        new_files[file["file_key"]] = file
            else:
                for item in node["variable"].get("upload", []):
                    for file in item.get("files", []):
                        instance = await manager.pre_download_file(file)
                        if instance:
                            file = FileSchema().dump(instance)
                            new_files[file["file_key"]] = file
            variable["file_map"] = new_files
        return input_nodes

    async def get_agent_input_nodes(self, task_id: str, agent_id: str):
        model = self.get_model(self.default_task_type)
        await self.check_object_permission("agent", agent_id)
        task = await async_retrieve_object(db=self.db, model=model, o_id=task_id)
        agent = await async_retrieve_object(db=self.db, model=Agent, o_id=agent_id)
        if not all([task, agent]):
            return []
        graph = GraphProcessor(json.dumps(agent.template_json))
        input_nodes = graph.get_input_nodes()
        for node in input_nodes:
            node_id = node["id"]
            node_info = task.input_param.get(node_id)
            if not node_info:
                if node["label"] == const.INPUT_FILE:
                    node["variable"]["files"] = []
                else:
                    for item in node["variable"].get("upload", []):
                        item["files"] = []
            else:
                node["variable"] = node_info
            graph.replace_node(node_id, node)
        manager = CommonManager(db=self.db)
        input_nodes = graph.get_input_nodes()
        for node in input_nodes:
            new_files = {}
            variable = node.get("variable") or {}
            if node["label"] == const.INPUT_FILE:
                for file in variable.get("files", []):
                    instance = await manager.pre_download_file(file)
                    if instance:
                        file = FileSchema().dump(instance)
                        new_files[file["file_key"]] = file
            else:
                for item in node["variable"].get("upload", []):
                    for file in item.get("files", []):
                        instance = await manager.pre_download_file(file)
                        if instance:
                            file = FileSchema().dump(instance)
                            new_files[file["file_key"]] = file
            variable["file_map"] = new_files
        return input_nodes

    async def get_task_manual_nodes(self, task_id: str) -> list:
        model = self.get_model(self.default_task_type)
        await self.check_object_permission("task", task_id)
        task = await async_retrieve_object(db=self.db, model=model, o_id=task_id)
        if task.status != TaskStatus.ACTION_REQUIRED:
            return []
        graph = GraphProcessor(json.dumps(task.json_temple))
        nodes = graph.get_manual_node(
            task.current_run_node.split(const.G_SEP) if task.current_run_node else []
        )
        return nodes

    async def save_task_input(self, task_id: str, task_input: ActivityInputForm):
        model = self.get_model(self.default_task_type)
        await self.check_object_permission("task", task_id)
        task = await async_retrieve_object(db=self.db, model=model, o_id=task_id)
        if task:
            ori_task_input = copy.deepcopy(task.input_param or {})
            task.input_param = ori_task_input | (
                task_input.model_dump()["node_input"] or {}
            )
            self.db.add(task)
            await self.db.commit()

    async def save_manual_input(
        self, task_id: str, node: dict, exict_loop: bool = False
    ):
        model = self.get_model(self.default_task_type)
        await self.check_object_permission("task", task_id)
        task = await async_retrieve_object(db=self.db, model=model, o_id=task_id)
        if task:
            node_id = node["id"]
            variable = node.get("variable", {})
            if variable.get("exict_loop") is not None:
                exict_loop = variable.get("exict_loop")
            else:
                exict_loop = exict_loop
            node["variable"]["exict_loop"] = exict_loop
            if variable.get("input_type") == "File upload":
                input_values = node["input_values"]
                new_files = {}
                manager = CommonManager(db=self.db)
                files = input_values.get("files", [])
                for file in files:
                    instance = await manager.pre_download_file(file)
                    if instance:
                        file = FileSchema().dump(instance)
                        new_files[file["file_key"]] = file
                if files:
                    node["input_values"]["files_map"] = new_files
            json_temple = copy.deepcopy(task.json_temple)
            for idx, node_o in enumerate(json_temple["nodes"]):
                if node_o["id"] == node_id:
                    json_temple["nodes"][idx] = node
            task.json_temple = json_temple
            self.db.add(task)
            await self.db.commit()

    async def can_change_agent(self, task_id: str) -> dict:
        data = {"can_change": True}
        model = self.get_model(self.default_task_type)
        task = await async_retrieve_object(db=self.db, model=model, o_id=task_id)
        if task.status not in [TaskStatus.NOT_START, TaskStatus.COMPLETED]:
            data["can_change"] = False
            return data
        # Then check whether this task has a share link
        return data




    async def task_result(self, task_id) -> dict:
        res = {}
        task = await self.get_task_by_id(task_id)
        if task:
            res = task.run_result or {}
        return res

        # Get the task execution result

    async def get_task_audit_result(self, task_id: str):
        data = []
        ori_task_result = await self.task_result(task_id)
        if ori_task_result:
            all_file_map = await self.get_result_files(task_id)
            for node in ori_task_result.get("audit", []):
                for file_audit in node.get("data", []):
                    msg = []
                    is_passed = file_audit.get("pass", False)
                    file_key = file_audit["key"]
                    t = {"title": file_key}
                    ori_files = all_file_map.get(file_key)
                    files_show = file_audit.get("files_show")
                    for value in file_audit.get("values_extra", []):
                        v_msg = f'{value["field_name"]}: {value["message"]}'.strip()
                        if not (v_msg.endswith(".") or v_msg.endswith("。")):
                            v_msg += "."
                        msg.append(v_msg)
                    t["is_passed"] = is_passed
                    t_m = ""
                    if str(is_passed).lower() in ["true", "review"]:
                        t_m = "Review: Meets requirements."
                    elif str(is_passed).lower() in ["false", "rejected"]:
                        t_m = "Rejected: Does not meet requirements."
                    elif str(is_passed).lower() == "decision":
                        t_m = "Decision: Non-compliant."
                    t["msg"] = "\n".join(
                        [
                            t_m,
                        ]
                        + msg
                    )
                    t["files"] = ori_files if ori_files else None
                    t["preview"] = True if files_show else False
                    data.append(t)
        return data

    async def get_task_audit_map(self, task_id: str, query_key: str):
        data = []
        ori_task_result = await self.task_result(task_id)
        if ori_task_result:
            for node in ori_task_result.get("audit", []):
                for file_audit in node.get("data", []):
                    values = []
                    t = {"title": file_audit["key"], "values": []}
                    file_map = dict(
                        [
                            (i, default_s3_client.url(s))
                            for i, s in enumerate(file_audit.get("files_show", []))
                        ]
                    )
                    for value in file_audit.get("values_extra", []):
                        f = {}
                        f |= value
                        f["field_page"] = file_map.get(
                            (f.get("field_page_number") or f.get("page_number"))
                        )
                        values.append(f)
                    t["values"] = values
                    t["is_passed"] = file_audit.get("pass", "Rejected")
                    t["files"] = file_map if file_map else None
                    data.append(t)
            if query_key:
                for item in data:
                    if item["title"] == query_key:
                        return [item]
        return data

    def get_audit_map(self, ori_task_result):
        data = {}
        for node in ori_task_result.get("audit", []):
            for file_audit in node.get("data", []):
                for value in file_audit.get("values_extra", []):
                    key = (
                        value["field_name"],
                        file_audit["key"].split("#")[0].rstrip(),
                    )
                    if key in data:
                        data[key].append(value)
                    else:
                        data[key] = [value]
        return data

    async def download_all_extract_result(self, task_id):
        """
        Download all AI results.
        """
        all_data = []
        ordinary_data: dict = await self.get_task_extract_result(task_id)
        all_data.append(("ordinary", f"ordinary_extract_{task_id}.xlsx", ordinary_data))
        grouped_data_info: OrderedDict = await self.get_task_extract_group_info(task_id)
        # Get the data of the different sheets
        for key in grouped_data_info.keys():
            item = {}
            for sheet in grouped_data_info[key]:
                for sheet in sheet.keys():
                    item[sheet] = await self.get_task_extract_result_group(
                        task_id, key, sheet
                    )
            all_data.append(("group", f"group_extract_{key}_{task_id}.xlsx", item))
        zip_buffer = BytesIO()
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zipf:
            for line in all_data:
                excel_buffer = BytesIO()
                if line[0] == "ordinary":
                    file_data = line[-1]
                    if len(file_data["headers"]) < 2 or not file_data["datas"]:
                        # Fewer than 2 headers means no parameters were extracted
                        # from the ordinary file
                        continue
                    df = self.download_extract_result(file_data)
                    with pd.ExcelWriter(excel_buffer, engine="openpyxl") as writer:
                        df.to_excel(writer, index=False)
                else:
                    with pd.ExcelWriter(excel_buffer, engine="openpyxl") as writer:
                        for sheet in list(line[-1].keys()):
                            file_data = line[-1][sheet]
                            if (
                                not file_data
                                or len(file_data["headers"]) == 0
                                or not file_data["datas"]
                            ):
                                # An empty header for a sheet means no data was
                                # extracted for that sheet
                                continue
                            df = self.download_extract_result(file_data)

                            df.to_excel(
                                writer,
                                sheet_name=self.clean_sheet_name(sheet),
                                index=False,
                            )
                excel_buffer.seek(0)
                zipf.writestr(line[1], excel_buffer.read())
        zip_buffer.seek(0)
        return zip_buffer

    @staticmethod
    def clean_sheet_name(name, replacement="_"):
        """
        Clean illegal characters from Excel sheet names.
        :param name: Original sheet name
        :param replacement: Replacement for the illegal characters
        :return: A legal sheet name
        """
        if not name or not isinstance(name, str):
            return "Sheet1"

        # Define the regex pattern of illegal characters
        illegal_chars = r"[\\/?*\[\]:]"

        # Replace the illegal characters
        cleaned = re.sub(illegal_chars, replacement, name)

        # Handle the other restrictions
        cleaned = cleaned.strip()[:31]  # Strip leading/trailing spaces and truncate
        cleaned = cleaned.lstrip("'").rstrip("'")  # Strip leading/trailing single quotes

        # Make sure the name does not start with 'History'
        if cleaned.lower().startswith("history"):
            cleaned = f"Sheet_{cleaned}"

        # Make sure it is not empty
        if not cleaned:
            cleaned = "Sheet1"

        return cleaned

    def download_extract_result(self, data):
        """Download the AI results."""
        current_data = []
        headers = [h["label"] for h in data["headers"]]
        for items in data["datas"]:
            line = []
            for cell in items:
                try:
                    if not cell:
                        line.append("")
                    elif cell["type"] == "text":
                        line.append(cell["value"])
                    elif cell["type"] == "files":
                        line.append("\n".join(cell["value"]))
                    else:
                        line.append("")
                except Exception as e:
                    raise e
            current_data.append(line)
        df = pd.DataFrame(current_data)
        df.columns = headers
        return df

    async def get_task_extract_group_info(self, task_id):
        """
        Get the grouped info of the task review results.
        """
        res = OrderedDict()
        ori_task_result = await self.task_result(task_id)
        # First take all grouped results out of the result
        for node in ori_task_result.get("extract", []):
            for extractor in node.get("data", []):
                key = extractor["key"]
                for field in extractor["values"]:
                    if not field.get("have_subfield"):
                        continue
                    sheet_name = field["field_name"]
                    # Extract the field
                    if field["field_value"]:
                        if key not in res:
                            res[key] = []
                        res[key].append(
                            OrderedDict(
                                {
                                    sheet_name: {
                                        "header": field["subfield"],
                                        "data": field["field_value"],
                                    }
                                }
                            )
                        )

                        # res[key] = OrderedDict(
                        #     {
                        #         sheet_name: {
                        #             "header": field["subfield"],
                        #             "data": field["field_value"],
                        #         }
                        #     }
                        # )
        return res

    async def get_task_extract_result_group(
        self, task_id: str, key: str, group_name: str
    ):
        datas = []
        data = await self.get_task_extract_group_info(task_id)
        if not data:
            return
        for item in data.get(key, []):
            for k, data in item.items():
                if k == group_name:
                    headers = [
                        {
                            "type": "text",
                            "label": h["field_name"],
                            "color": "",
                        }
                        for h in data.get("header", [])
                    ]
                    # Organize the data
                    for line_data in data.get("data", []):
                        line = []
                        for value in line_data:
                            line.append(self.format_value(value))
                        datas.append(line)
                    if any([headers, datas]):
                        return {"headers": headers, "datas": datas}

    def format_value(self, val, cell_color=""):
        """
        Organize the table values.
        """
        res = {"color": cell_color}
        v_type = val.get("type")
        field_value = val["field_value"]
        if v_type == "file" and field_value:
            # Handle as files
            field_value = [default_s3_client.url(f) for f in field_value]
            r_type = "files"
        else:
            r_type = "text"
            if isinstance(field_value, list):
                # Lists hold URLs by default
                field_value = ",".join([str(f) for f in field_value])
            elif isinstance(field_value, str):
                pass
            else:
                if cell_color:
                    field_value = ""
                else:
                    return
        res |= {"value": field_value, "type": r_type}
        return res

    async def get_task_extract_result(self, task_id):
        """
        Get the data extraction results.
        """
        headers = []
        columns = []
        columns_index_map = {}
        lower_keys = []
        datas = []
        res = {"headers": headers, "datas": datas}
        # 1. Prepare the review mapping data.
        # 2. Iterate over all data extraction fields.
        ori_task_result = await self.task_result(task_id)
        if ori_task_result:
            audit_map = self.get_audit_map(ori_task_result)
            all_file_map = await self.get_result_files(task_id)
            values_map = {}
            headers_keys = set()
            for node in ori_task_result.get("extract", []):
                for extractor in node.get("data", []):
                    key = extractor["key"]
                    files_show = extractor.get("files_show")
                    h = {
                        "type": "text",
                        "label": key,
                        "color": "",
                        "files": all_file_map.get(key),
                        "preview": bool(files_show),
                    }
                    for field in extractor["values"]:
                        if field.get("have_subfield"):
                            continue
                        if key not in headers_keys:
                            headers_keys.add(key)
                            headers.append(h)
                        group_key = field["group_key"]
                        group_name = field["field_name"]
                        values_map[(key, group_key)] = field
                        columns_index_keys = list(columns_index_map.keys())
                        if len(lower_keys) != len(columns_index_map) or not lower_keys:
                            lower_keys = [i.lower().strip() for i in columns_index_keys]
                        try:
                            idx = lower_keys.index(group_name.lower().strip())
                        except:
                            idx = -1
                        if idx == -1:
                            columns_index_map[group_name] = len(columns)
                            columns.append((group_name, {key: group_key}))
                        else:
                            columns[idx][1][key] = group_key
            # Prepare the data
            cell_color = ""
            for idx, column in enumerate(columns):
                line = [{"type": "text", "value": column[0], "color": None}]
                for header in headers:
                    cell_color = ""
                    h_label = header["label"]
                    gk = column[1].get(h_label)
                    value = values_map.get((header["label"], gk))
                    if value:
                        audit_res_lst = audit_map.get(
                            (value["field_name"], h_label.split("#")[0].rstrip()), []
                        )
                        header["color"] = None
                        for audit_res in audit_res_lst:
                            # There is a review result; colorize it
                            is_passed = str(audit_res["pass"]).lower()
                            if is_passed in ["false", "rejected"]:
                                cell_color = RED_FIELD_COLOR
                            elif is_passed == "decision":
                                cell_color = YELLOW_FIELD_COLOR
                            if header["color"] == RED_HEADER_COLOR:
                                cell_color = RED_HEADER_COLOR
                            if (
                                header["color"] == YELLOW_HEADER_COLOR
                                and cell_color == RED_FIELD_COLOR
                            ):
                                cell_color = RED_FIELD_COLOR
                            header["color"] = cell_color
                        line.append(self.format_value(value, cell_color))
                    else:
                        line.append(None)
                datas.append(line)
        res["headers"] = [
            {
                "type": "text",
                "label": "Key Info",
                "color": "",
                "files": [],
                "preview": False,
            }
        ] + headers
        return res

    async def get_task_extract_map(self, task_id, query_key):
        """
        Get the task data extraction mapping.
        """
        data = []
        ori_task_result = await self.task_result(task_id)
        if ori_task_result:
            for node in ori_task_result.get("extract", []):
                for extractor in node.get("data", []):
                    key = extractor["key"]
                    files = await self.get_all_mapped_files(task_id, key)
                    item = {"title": key, "values": [], "file_shows": files}
                    values = []
                    file_map = dict(
                        [
                            (i, default_s3_client.url(s))
                            for i, s in enumerate(extractor.get("files_show", []))
                        ]
                    )
                    for value in extractor.get("values", []):
                        if value.get("have_subfield"):
                            continue
                        f = {}
                        f |= value
                        if "page_number" in value:
                            f["field_page"] = file_map.get(f["page_number"])
                        else:
                            f["field_page"] = None
                        values.append(f)
                    if values:
                        item["values"] = values
                    data.append(item)
            if query_key:
                for item in data:
                    if item["title"] == query_key:
                        return [item]
        return data

    async def get_task_extract_map_by_group(self, task_id, query_key):
        """
        Get the file and value mapping extracted by group.
        """
        datas = []
        data = await self.get_task_extract_group_info(task_id)
        files = await self.get_all_mapped_files(task_id, query_key)
        data = data.get(query_key, {})
        for item in data:
            for group, values in item.items():
                line = []
                datas.append({"group": group, "field": line, "file_shows": files})
                transe_list = list(zip(*values["data"]))
                for idx, h in enumerate(values["header"]):
                    all_val = []
                    for v in transe_list[idx]:
                        if "file_path" in v:
                            v["field_page"] = default_s3_client.url(v["file_path"])
                        all_val.append(v)
                    line.append([h["field_name"], all_val])
        return datas

    async def get_all_mapped_files(self, task_id, query_key):
        """
        Get the mapping of all AI-generated images.
        """
        ori_task_result = await self.task_result(task_id)
        # First take all grouped results out of the result
        for node in ori_task_result.get("extract", []):
            for extractor in node.get("data", []):
                key = extractor["key"]
                if key == query_key:
                    return [default_s3_client.url(f) for f in extractor["files_show"]]

    async def get_task_generated_files(self, task_id):
        """
        Get the documents generated by the task.
        """
        data = []
        ori_task_result = await self.task_result(task_id)
        if ori_task_result:
            for node in ori_task_result.get("generate", []):
                file = node.get("files", {})
                if not file:
                    continue
                file_name = file["name"]
                status = file["status"]
                content_type, encoding = mimetypes.guess_type(file_name)
                path = (
                    default_s3_client.url(file["path"][0])
                    if status == "Generated"
                    else None
                )
                time_stamp = trans_timestamp_to_utc(file.get("time_stamp"))
                generate_date = (
                    time_stamp
                    if time_stamp
                    else (
                        datetime.now(timezone.utc).isoformat()
                        if status == "Generated"
                        else None
                    )
                )
                data.append(
                    {
                        "name": file_name,
                        "status": status,
                        "generate_date": generate_date,
                        "content_type": content_type,
                        "url": path,
                    }
                )
        return data

    async def download_and_add_to_zip(
        self,
        zipf: zipfile.ZipFile,
        url: str,
        zip_path: Path,
        session: aiohttp.ClientSession,
    ):
        try:
            async with session.get(url) as response:
                response.raise_for_status()
                content = await response.read()
                zipf.writestr(str(zip_path), content)
        except Exception as e:
            logger.error(f"Download file error: {url},\n error: {str(e)}")

    async def download_all_generated_files(self, task_id):
        files = await self.get_task_generated_files(task_id)
        zip_buffer = BytesIO()
        async with aiohttp.ClientSession() as session:
            with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zipf:
                tasks = []
                for file_info in files:
                    if file_info["url"]:
                        zip_path = Path(file_info["name"])
                        task = self.download_and_add_to_zip(
                            zipf, file_info["url"], zip_path, session
                        )
                        tasks.append(task)
                await asyncio.gather(*tasks, return_exceptions=True)
        zip_buffer.seek(0)
        return zip_buffer

    async def download_result_files(self, task_id):
        all_files = []
        files = await self.get_result_files(task_id)
        set([all_files.extend(f) for f in files.values()])
        all_files = dict(all_files)
        zip_buffer = BytesIO()
        async with aiohttp.ClientSession() as session:
            with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zipf:
                tasks = []
                for file_key, url in all_files.items():
                    zip_path = Path(Path(file_key).name)
                    task = self.download_and_add_to_zip(zipf, url, zip_path, session)
                    tasks.append(task)
                await asyncio.gather(*tasks, return_exceptions=True)
        zip_buffer.seek(0)
        return zip_buffer

    async def get_result_files(self, task_id):
        """
        Get the file mapping.
        """
        files = []
        ori_task_result: dict = await self.task_result(task_id)
        if ori_task_result:
            all_files = ori_task_result.get("audit", []) + ori_task_result.get(
                "extract", []
            )
            for node in all_files:
                files += [
                    (
                        f["key"],
                        [(k, default_s3_client.url(k)) for k in f.get("files", [])],
                    )
                    for f in node.get("data", [])
                ]
        return dict(files)

    # Find the task creation records, i.e. the task and agent run records
    async def get_request_count(
        self,
        space_id: str,
        start_date: datetime,
        end_date: datetime,
        group_by: str,
        commons=None,
        user_id: str = None,
    ):
        """
        Get the number of user requests.
        """
        if not user_id:
            user_id = self.request.user.id
        if not group_by:
            return await self.get_request_count_not_group_by(
                space_id=space_id,
                start=start_date,
                end=end_date,
                user_id=user_id,
            )
        elif group_by == "agent":
            # Query per date
            return await self.get_request_count_by_agent(
                space_id=space_id,
                start=start_date,
                end=end_date,
                user_id=user_id,
                commons=commons,
            )
        else:
            return

    async def get_request_count_not_group_by(
        self, space_id: str, start: datetime, end: datetime, user_id: str
    ):
        """
        Get the number of user requests without grouping by agent.
        """
        condition = [
            # TaskRecord.space_id == space_id,
            TaskRecord.created_at >= start,
            TaskRecord.created_at <= end,
            TaskRecord.auth_type != const.AT_USER_API_KEY,
        ]
        if space_id:
            condition.append(TaskRecord.space_id == space_id)
        stmt = (
            select(
                func.date(TaskRecord.created_at).label("date"),
                func.count(TaskRecord.id).label("request_count"),
                # Workspace,
                # Agent,
            )
            .join(Workspace, TaskRecord.space_id == Workspace.id)
            .join(Agent, TaskRecord.agent_id == Agent.id)
            .where(*condition)
            .group_by(
                func.date(TaskRecord.created_at),
                # TaskRecord.agent_id,
            )
            .order_by("date")
        )
        result = await self.db.execute(stmt)
        records = result.fetchall()
        # tmp_dict = self.get_tmp_dict(records)
        tmp_dict = {i[0].strftime(TIME_FORMAT): int(i[-1]) for i in records}
        data = await self.complete_data(tmp_dict, start, end)
        return R.format(data)

    def get_tmp_dict(self, records):
        tmp_dict = {}
        for item in records:
            space_id = item[2].id
            space_name = item[2].display_name
            agent_id = item[3].id
            agent_name = item[3].name
            date = item[0].strftime(TIME_FORMAT)
            if space_id not in tmp_dict:
                space_group = {(agent_id, agent_name): []}
                tmp_dict[(space_id, space_name)] = space_group
            else:
                space_group = tmp_dict[(space_id, space_name)]
            if (agent_id, agent_name) not in space_group:
                space_group[(agent_id, agent_name)] = [item]
            else:
                space_group[(agent_id, agent_name)].append(item)

        return tmp_dict

    async def get_request_count_by_agent(
        self, space_id: str, start: datetime, end: datetime, user_id: str, commons
    ):
        """
        Get the number of user requests, grouped by agent.
        """
        sub_condition = [
            TaskRecord.space_id == space_id,
            TaskRecord.created_at >= start,
            TaskRecord.created_at <= end,
            TaskRecord.auth_type != const.AT_USER_API_KEY,
        ]
        stmt = (
            select(
                TaskRecord.agent_id,
                func.count(func.distinct(func.date(TaskRecord.created_at))).label(
                    "call_days"
                ),  # Number of calling days
            )
            .where(*sub_condition)
            .group_by(TaskRecord.agent_id)
            .order_by(desc("call_days"))
        )
        pagination = AsyncPagination(
            self.db, stmt, page=commons.page, page_size=commons.page_size
        )
        data = await pagination.get_result()
        data = await pagination.get_paginated_data(data)
        condition = [
            TaskRecord.agent_id.in_(data["results"]),
            TaskRecord.space_id == space_id,
            TaskRecord.created_at >= start,
            TaskRecord.created_at <= end,
        ]
        stmt = (
            select(
                TaskRecord.agent_id,
                Agent.name,  # Add agent_name
                func.date(TaskRecord.created_at).label("date"),
                func.count(TaskRecord.id).label("daily_runs"),
            )
            .join(Agent, TaskRecord.agent_id == Agent.id)
            .where(*condition)
        )
        stmt = stmt.group_by(
            TaskRecord.agent_id, func.date(TaskRecord.created_at)
        ).order_by(TaskRecord.agent_id, func.date(TaskRecord.created_at))
        result = await self.db.execute(stmt)
        records = result.fetchall()
        res = []
        old_agent_id = None
        old_agent_name = None
        tmp_dict = {}
        for item in records:
            agent_id = item[0]
            agent_name = item[1]
            if old_agent_id and old_agent_id != agent_id:
                # First fill in the previous agent
                res.append(
                    await self.complete_agent_data(
                        old_agent_id, old_agent_name, tmp_dict, start, end
                    )
                )
                tmp_dict = {}
                tmp_dict[agent_id, item[2].strftime(TIME_FORMAT)] = item
                old_agent_id = agent_id
                old_agent_name = agent_name
            else:
                tmp_dict[(agent_id, item[2].strftime(TIME_FORMAT))] = item
                old_agent_id = agent_id
                old_agent_name = agent_name
        # The last agent still needs to be processed
        res.append(
            await self.complete_agent_data(agent_id, agent_name, tmp_dict, start, end)
        )
        data["results"] = res
        return R.format(data)

    async def complete_agent_data(
        self, agent_id, agent_name, tmp_dict: dict, start: datetime, end: datetime
    ):
        """
        Fill in the agent data, padding missing dates with 0.
        """
        data = []
        while start <= end:
            i_date = start.strftime(TIME_FORMAT)
            item = tmp_dict.get((agent_id, i_date), None)
            if item:
                data.append(
                    {
                        "date": i_date,
                        "date_str": start.date().isoformat(),
                        "daily_count": item[-1],
                        "agent_id": agent_id,
                        "agent_name": agent_name,
                    }
                )
            else:
                data.append(
                    {
                        "date": i_date,
                        "date_str": start.date().isoformat(),
                        "daily_count": 0,
                        "agent_id": agent_id,
                        "agent_name": agent_name,
                    }
                )
            start += timedelta(days=1)
        return {
            "agent_id": agent_id,
            "agent_name": agent_name,
            "total": float(sum([i[-1] for i in tmp_dict.values()])),
            "bar_data": data,
        }

    async def complete_api_key_data(
        self, apikey_id, apikey_name, tmp_dict: dict, start: datetime, end: datetime
    ):
        """
        Fill in the API key data.
        """
        data = []
        while start <= end:
            i_date = start.strftime(TIME_FORMAT)
            item = tmp_dict.get((apikey_id, i_date), None)
            if item:
                data.append(
                    {
                        "date": i_date,
                        "date_str": start.date().isoformat(),
                        "daily_count": item[-1],
                        "api_key_id": apikey_id,
                        "api_key_name": apikey_name,
                    }
                )
            else:
                data.append(
                    {
                        "date": i_date,
                        "date_str": start.date().isoformat(),
                        "daily_count": 0,
                        "api_key_id": apikey_id,
                        "api_key_name": apikey_name,
                    }
                )
            start += timedelta(days=1)
        return {
            "api_key_id": apikey_id,
            "api_key_name": apikey_name,
            "total": float(sum([i[-1] for i in tmp_dict.values()])),
            "bar_data": data,
        }

    async def complete_data(self, tmp_dict, start, end):
        """
        Fill in the data, padding missing dates with 0.
        """
        data = []
        while start <= end:
            i_date = start.strftime(TIME_FORMAT)
            data.append({"date": i_date, "daily_count": tmp_dict.get(i_date, 0)})
            start += timedelta(days=1)

        return {"total": sum(tmp_dict.values()), "bar_data": data}

    async def get_api_key_request_count(
        self,
        space_id: str,
        start_date: datetime,
        end_date: datetime,
        group_by: str,
        commons=None,
        user_id: str = None,
    ):
        """
        Get the number of user requests.
        """
        if not user_id:
            user_id = self.request.user.id
        if not group_by:
            return await self.get_api_key_request_count_not_group_by(
                space_id=space_id,
                start=start_date,
                end=end_date,
                user_id=user_id,
            )
        elif group_by == "agent":
            # Query per date
            return await self.get_api_key_request_count_by_agent(
                space_id=space_id,
                start=start_date,
                end=end_date,
                user_id=user_id,
                commons=commons,
            )
        elif group_by == "api_key":
            # Query per date
            return await self.get_api_key_request_count_by_key(
                space_id=space_id,
                start=start_date,
                end=end_date,
                user_id=user_id,
                commons=commons,
            )
        else:
            return

    async def get_api_key_request_count_not_group_by(
        self, space_id: str, start: datetime, end: datetime, user_id: str
    ):
        """
        Get the number of user requests without grouping by agent.
        """
        api_keys = await async_list_objects(
            self.db,
            APIKey,
            fields=["id"],
            condition=[APIKey.user_id == self.request.user.id],
        )
        condition = [
            # TaskRecord.space_id == space_id,
            TaskRecord.created_at >= start,
            TaskRecord.created_at <= end,
            TaskRecord.api_key_id.in_(api_keys),
            TaskRecord.auth_type == const.AT_USER_API_KEY,
        ]
        if space_id:
            condition.append(TaskRecord.space_id == space_id)
        stmt = (
            select(
                func.date(TaskRecord.created_at).label("date"),
                func.count(TaskRecord.id).label("request_count"),
                # Workspace,
                # Agent,
            )
            .join(Workspace, TaskRecord.space_id == Workspace.id)
            .join(Agent, TaskRecord.agent_id == Agent.id)
            .where(*condition)
            .group_by(
                func.date(TaskRecord.created_at),
                # TaskRecord.agent_id,
            )
            .order_by("date")
        )
        result = await self.db.execute(stmt)
        records = result.fetchall()
        # tmp_dict = self.get_tmp_dict(records)
        tmp_dict = {i[0].strftime(TIME_FORMAT): int(i[-1]) for i in records}
        data = await self.complete_data(tmp_dict, start, end)
        return R.format(data)

    async def get_api_key_request_count_by_agent(
        self, space_id: str, start: datetime, end: datetime, user_id: str, commons
    ):
        """
        Get the number of user requests, grouped by agent.
        """
        api_keys = await async_list_objects(
            self.db,
            APIKey,
            fields=["id"],
            condition=[APIKey.user_id == self.request.user.id],
        )
        sub_condition = [
            TaskRecord.space_id == space_id,
            TaskRecord.created_at >= start,
            TaskRecord.created_at <= end,
            TaskRecord.api_key_id.in_(api_keys),
            TaskRecord.auth_type == const.AT_USER_API_KEY,
        ]
        stmt = (
            select(
                TaskRecord.agent_id,
                func.count(func.distinct(func.date(TaskRecord.created_at))).label(
                    "call_days"
                ),  # Number of calling days
            )
            .where(*sub_condition)
            .group_by(TaskRecord.agent_id)
            .order_by(desc("call_days"))
        )
        pagination = AsyncPagination(
            self.db, stmt, page=commons.page, page_size=commons.page_size
        )
        data = await pagination.get_result()
        data = await pagination.get_paginated_data(data)
        condition = [
            TaskRecord.agent_id.in_(data["results"]),
            TaskRecord.space_id == space_id,
            TaskRecord.created_at >= start,
            TaskRecord.created_at <= end,
        ]
        stmt = (
            select(
                TaskRecord.agent_id,
                Agent.name,  # Add agent_name
                func.date(TaskRecord.created_at).label("date"),
                func.count(TaskRecord.id).label("daily_runs"),
            )
            .join(Agent, TaskRecord.agent_id == Agent.id)
            .where(*condition)
        )
        stmt = stmt.group_by(
            TaskRecord.agent_id, func.date(TaskRecord.created_at)
        ).order_by(TaskRecord.agent_id, func.date(TaskRecord.created_at))
        result = await self.db.execute(stmt)
        records = result.fetchall()
        res = []
        old_agent_id = None
        old_agent_name = None
        tmp_dict = {}
        for item in records:
            agent_id = item[0]
            agent_name = item[1]
            if old_agent_id and old_agent_id != agent_id:
                # First fill in the previous agent
                res.append(
                    await self.complete_agent_data(
                        old_agent_id, old_agent_name, tmp_dict, start, end
                    )
                )
                tmp_dict = {}
                tmp_dict[agent_id, item[2].strftime(TIME_FORMAT)] = item
                old_agent_id = agent_id
                old_agent_name = agent_name
            else:
                tmp_dict[(agent_id, item[2].strftime(TIME_FORMAT))] = item
                old_agent_id = agent_id
                old_agent_name = agent_name
        # The last agent still needs to be processed
        res.append(
            await self.complete_agent_data(agent_id, agent_name, tmp_dict, start, end)
        )
        data["results"] = res
        return R.format(data)

    async def get_api_key_request_count_by_key(
        self, space_id: str, start: datetime, end: datetime, user_id: str, commons
    ):
        """
        Get the number of user requests, grouped by agent.
        """
        api_keys = await async_list_objects(
            self.db,
            APIKey,
            fields=["id"],
            condition=[APIKey.user_id == self.request.user.id],
        )
        sub_condition = [
            TaskRecord.space_id == space_id,
            TaskRecord.created_at >= start,
            TaskRecord.created_at <= end,
            TaskRecord.api_key_id.in_(api_keys),
            TaskRecord.auth_type == const.AT_USER_API_KEY,
        ]
        stmt = (
            select(
                TaskRecord.api_key_id,
                func.count(func.distinct(func.date(TaskRecord.created_at))).label(
                    "call_days"
                ),  # Number of calling days
            )
            .where(*sub_condition)
            .group_by(TaskRecord.api_key_id)
            .order_by(desc("call_days"))
        )
        pagination = AsyncPagination(
            self.db, stmt, page=commons.page, page_size=commons.page_size
        )
        data = await pagination.get_result()
        data = await pagination.get_paginated_data(data)
        condition = [
            TaskRecord.api_key_id.in_(data["results"]),
            TaskRecord.space_id == space_id,
            TaskRecord.created_at >= start,
            TaskRecord.created_at <= end,
            TaskRecord.auth_type == const.AT_USER_API_KEY,
        ]
        stmt = (
            select(
                TaskRecord.api_key_id,
                APIKey.name,  # Add agent_name
                func.date(TaskRecord.created_at).label("date"),
                func.count(TaskRecord.id).label("daily_runs"),
            )
            .join(APIKey, TaskRecord.api_key_id == APIKey.id)
            .where(*condition)
        )
        stmt = stmt.group_by(
            TaskRecord.api_key_id, func.date(TaskRecord.created_at)
        ).order_by(TaskRecord.api_key_id, func.date(TaskRecord.created_at))
        result = await self.db.execute(stmt)
        records = result.fetchall()
        res = []
        old_agent_id = None
        old_agent_name = None
        tmp_dict = {}
        for item in records:
            agent_id = item[0]
            agent_name = item[1]
            if old_agent_id and old_agent_id != agent_id:
                # First fill in the previous agent
                res.append(
                    await self.complete_api_key_data(
                        old_agent_id, old_agent_name, tmp_dict, start, end
                    )
                )
                tmp_dict = {}
                tmp_dict[agent_id, item[2].strftime(TIME_FORMAT)] = item
                old_agent_id = agent_id
                old_agent_name = agent_name
            else:
                tmp_dict[(agent_id, item[2].strftime(TIME_FORMAT))] = item
                old_agent_id = agent_id
                old_agent_name = agent_name
        # The last agent still needs to be processed
        res.append(
            await self.complete_api_key_data(agent_id, agent_name, tmp_dict, start, end)
        )
        data["results"] = res
        return R.format(data)
