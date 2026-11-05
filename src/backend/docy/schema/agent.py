"""Agent schemas.

The original schema.agent module was removed during migration; this file is a minimal rebuild:
- Agent schemas are derived automatically from the existing Agent model;
- Marketplace / AgentVersion models were trimmed; related schemas are placeholders only.
"""

from typing import Optional

from marshmallow import Schema, fields, post_dump
from pydantic import Field

from docy import const
from docy.database import get_sync_db_connector
from docy.schema import EnumMethodField
from docy.models.tb_agent import Agent, AgentStatus
from docy.models.tb_activity import TaskRecord, TaskStatus, TaskType
from docy.core.storage_drivers import default_s3_client
from . import BaseModelSchema, GenericObjectSchemaMixin
from .base import SchemaBase


class AgentDetailSchema(BaseModelSchema):
    class Meta:
        model = Agent


class AgentSpecifiedDetailSchema(GenericObjectSchemaMixin, AgentDetailSchema):
    status = EnumMethodField("status")
    creator = fields.Method("get_creator")
    preview_image = fields.Method("get_preview_image")
    visibility = fields.Method("get_visibility")
    from_my_market = fields.Boolean(attribute="from_my_market")  # Whether from my marketplace

    class Meta:
        model = Agent
        exclude = ("history_version", "addition", "delete_at", "is_delete", "visible")

    def get_creator(self, obj):
        user_set = self.user_set if hasattr(self, "user_set") else {}
        return user_set.get(obj.creator_id)

    def get_preview_image(self, obj):
        if obj.preview_image:
            return default_s3_client.url(obj.preview_image)

    def get_visibility(self, obj):
        if obj.status == AgentStatus.draft:
            return '-'
        else:
            if obj.published is True:
                return "Public"
            else:
                return "Personal"


class AgentListSchema(GenericObjectSchemaMixin, AgentDetailSchema):
    """
    Return agent details
    """
    status = EnumMethodField("status")
    creator = fields.Method("get_creator")
    preview_image = fields.Method("get_preview_image")
    visibility = fields.Method("get_visibility")

    class Meta:
        model = Agent
        fields = (
            'id', 'name', 'description', 'status', 'creator', 'visibility', "preview_image", "published", 'update_at',
            'market_record_id')

    def get_creator(self, obj):
        user_set = self.user_set if hasattr(self, "user_set") else {}
        return user_set.get(obj.creator_id)

    def get_preview_image(self, obj):
        if obj and obj.preview_image:
            return default_s3_client.url(obj.preview_image)

    def get_visibility(self, obj):
        if obj.status == AgentStatus.draft:
            return '-'
        else:
            if obj.published == True:
                return "Public"
            else:
                return "Personal"

    @post_dump(pass_collection=True)
    def format_data(self, data, many, **kwargs):
        # Collect completion stats for each agent
        agent_ids = [d["id"] for d in data] if many else [data["id"]]
        with get_sync_db_connector() as session:
            task_map = {}
            task_recods = session.query(TaskRecord).filter(
                TaskRecord.task_type == TaskType.FOREVER_TASK,
                TaskRecord.auth_type == const.AT_BEARER_TOKEN,
                TaskRecord.agent_id.in_(agent_ids)
            )
            for record in task_recods:
                a_id = record.agent_id
                if a_id not in task_map:
                    task_map[a_id] = ([], [], [])
                task_item = task_map[a_id]
                if record.status == TaskStatus.COMPLETED:
                    task_item[0].append(record.id)
                elif record.status == TaskStatus.QUEUED:
                    task_item[1].append(record.id)
                else:
                    task_item[-1].append(record.id)
            if not many:
                self.completion_rate(data, task_map)
            else:
                for item in data:
                    self.completion_rate(item, task_map)

        return data

    def completion_rate(self, item, task_map):
        """
        Compute the completion rate of tasks associated with the agent
        """
        state = {"complete_count": 0, "queued_count": 0, "completion_rate": 0}
        task_item = task_map.get(item["id"], ([], [], []))
        total = len(task_item[0] + task_item[1] + task_item[-1])
        if total:
            state |= {
                "complete_count": len(task_item[0]),
                "queued_count": len(task_item[1]),
                "completion_rate": (
                    int(round(float(len(task_item[0]) / total), 2) * 100) if total != 0 else 0
                ),
            }
        item["state"] = state


class AgentSampleSchema(BaseModelSchema):
    """
    Return basic agent info only
    """

    class Meta:
        model = Agent
        fields = ('id', 'name', 'description')


# The models below (Marketplace / AgentVersion) were removed in the OSE trim;
# related APIs are not migrated yet, so these placeholders keep the module importable
class AgentVersionSchema(GenericObjectSchemaMixin, Schema):
    id = fields.Str()
    agent_id = fields.Str()
    operator_id = fields.Str()
    created_at = fields.DateTime()


class MarketAgentSchema(GenericObjectSchemaMixin, Schema):
    id = fields.Str()
    name = fields.Str()
    description = fields.Str()
    logo = fields.Str()
    category = fields.Str()


class MarketAgentListSchema(MarketAgentSchema):
    pass


class MarketAgentCopySourceSchema(SchemaBase):
    agent_id: str = Field(..., description="ID of the agent to copy")
    from_: str = Field(..., alias="from", description="Source: marketplace / space")


class MarketAgentCopyTargetSchema(SchemaBase):
    space_id: Optional[str] = Field(None, description="Target space id")
    agent_name: Optional[str] = Field(None, description="Name of the copied agent")
    status: Optional[str] = Field(None, description="Status of the copied agent")
    visible: Optional[bool] = Field(None, description="Whether visible")
