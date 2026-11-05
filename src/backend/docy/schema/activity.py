"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/23
Last Modified: 2025/6/23
Last Editor:
Filename: activity
Description: schemas for tasks
"""
import mimetypes
from datetime import datetime
from marshmallow import fields, post_dump

from docy.schema import EnumMethodField
from docy.schema.agent import AgentListSchema
from docy.utils._time import trans_timestamp_to_utc
from docy.core.storage_drivers import default_s3_client
from docy.schema import BaseModelSchema, GenericObjectSchemaMixin
from docy.models.tb_activity import ActivityTask, TemporaryTask, AGENTFROM

TASK_SCHEMA_SETTING = [
    {
        "set_name": "space_agent_set",
        "schema": "docy.schema.agent.AgentSampleSchema",
        "filed_names": ["agent_id"],
    },
    {
        "set_name": "user_set",
        "schema": "docy.schema.auth.UserSampleSchema",
        "filed_names": ["creator_id"],
    },
]


class BaseTaskSchema(GenericObjectSchemaMixin, BaseModelSchema):
    status = EnumMethodField("status")
    run_time = fields.Method("get_run_time")
    agent = fields.Method("get_agent")
    creator = fields.Method("get_creator")
    generated_files = fields.Method("get_generated_files")

    def get_run_time(self, obj):
        run_time = obj.run_time
        return run_time

    def get_agent(self, obj):
        if obj.agent_from == AGENTFROM.FROM_SPACE:
            agent_map = self.space_agent_set if hasattr(self, "space_agent_set") else {}
        else:
            agent_map = (
                self.market_agent_set if hasattr(self, "market_agent_set") else {}
            )
        if not agent_map or not obj.agent_id:
            return
        agent = agent_map.get(obj.agent_id)
        if agent:
            agent["agent_from"] = (
                "agent" if obj.agent_from == AGENTFROM.FROM_SPACE else "market"
            )
        return agent

    def get_creator(self, obj):
        user_set = self.user_set if hasattr(self, "user_set") else {}
        return user_set.get(obj.creator_id)

    def get_generated_files(self, obj):
        data = []
        ori_task_result = obj.run_result or {}
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
                        datetime.utcnow().isoformat() if status == "Generated" else None
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


class TaskListSchema(BaseTaskSchema):
    class Meta:
        model = ActivityTask
        fields = (
            "id",
            "status",
            "run_time",
            "agent",
            "creator",
            "name",
            "agent_from",
            "error_info",
            "task_space_id",
            "generated_files",
            "created_at",
            "update_at",
        )


class TaskDetailSchema(BaseTaskSchema):
    """
    Query task details
    """

    class Meta:
        model = ActivityTask


class TemporaryTaskSchema(BaseTaskSchema):
    class Meta:
        model = TemporaryTask
