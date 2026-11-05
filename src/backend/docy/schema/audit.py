"""Pydantic data models for audit."""

from __future__ import annotations

import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


# Event type display_label mapping table
# Maps (action, resource_type) combinations to UI-readable event type labels
EVENT_TYPE_LABELS: dict[tuple[str, str], str] = {
    ("create", "knowledge"): "Document Created",
    ("update", "knowledge"): "Document Updated",
    ("delete", "knowledge"): "Document Deleted",
    ("create", "agent"): "Agent Created",
    ("update", "agent"): "Agent Updated",
    ("delete", "agent"): "Agent Deleted",
    ("execute", "agent"): "Agent Executed",
    ("publish", "agent"): "Agent Published",
    ("batch_delete", "agent"): "Agent Batch Deleted",
    ("create", "task"): "Task Created",
    ("update", "task"): "Task Updated",
    ("delete", "task"): "Task Deleted",
    ("execute", "task"): "Task Executed",
    ("complete", "task"): "Task Completed",
    ("fail", "task"): "Task Failed",
    ("action_required", "task"): "Manual Action Required",
    ("resume", "task"): "Task Resumed",
    ("cancel", "task"): "Task Canceled",
    ("batch_delete", "task"): "Task Batch Deleted",
    ("create", "space"): "Workspace Created",
    ("update", "space"): "Workspace Updated",
    ("delete", "space"): "Member Removed",
    ("invite", "space"): "User Invited",
    ("create", "policy"): "Permission Created",
    ("update", "policy"): "Permission Changed",
    ("delete", "policy"): "Permission Removed",
    ("create", "template"): "Template Created",
    ("update", "template"): "Template Updated",
    ("delete", "template"): "Template Deleted",
    ("batch_delete", "template"): "Template Batch Deleted",
}


class ActorType(str, Enum):
    """Actor type"""

    USER = "user"
    API_KEY = "api_key"
    SYSTEM = "system"


class ResourceType(str, Enum):
    """Resource type"""

    SPACE = "space"
    AGENT = "agent"
    TASK = "task"
    KNOWLEDGE = "knowledge"
    POLICY = "policy"
    TEMPLATE = "template"


class Action(str, Enum):
    """Action"""

    CREATE = "create"
    UPDATE = "update"
    EXECUTE = "execute"
    DELETE = "delete"
    INVITE = "invite"
    PUBLISH = "publish"
    COMPLETE = "complete"
    FAIL = "fail"
    ACTION_REQUIRED = "action_required"
    RESUME = "resume"
    CANCEL = "cancel"
    BATCH_DELETE = "batch_delete"


class Outcome(str, Enum):
    """Audit log outcome"""

    SUCCESS = "success"
    FAILURE = "failure"


# Request models
class AuditEventCreate(BaseModel):
    """Audit event from the business layer (before write)."""

    chain_id: str = Field(..., max_length=64)
    actor_id: str = Field(..., max_length=64)
    actor_type: ActorType
    resource_type: ResourceType
    resource_id: str = Field(..., max_length=64)
    action: Action
    outcome: Outcome
    source_ip: str | None = None
    request_id: str | None = None
    payload: dict[str, Any]


# Response models - base


class AuditRecordResponse(BaseModel):
    """API response: a single audit record (base version, without user info)."""

    id: int
    chain_id: str
    seq: int
    previous_hash: str
    hash: str
    event_time: datetime.datetime
    user_id: str
    actor_id: str
    actor_type: str
    resource_type: str
    resource_id: str
    action: str
    outcome: str
    payload: dict[str, Any]
    payload_hash: str

    model_config = ConfigDict(from_attributes=True)


class AuditRecordDetailResponse(BaseModel):
    """API response: a single audit record (enhanced, with user and workspace info)."""

    id: str
    chain_id: str
    seq: int
    event_time: datetime.datetime
    # Actor info
    actor_id: str
    actor_name: str | None = None  # User.display
    actor_email: str | None = None  # User.email
    actor_avatar: str | None = None  # User.avatar
    actor_type: str
    # Resource info
    resource_type: str
    resource_id: str
    space_id: str | None = None  # space_id extracted from chain_id
    space_name: str | None = None  # Workspace.name
    # Action details
    action: str
    action_label: str | None = None  # UI display label, e.g. "Document Updated"
    action_description: str | None = (
        None  # Description, e.g. "John Smith updated the document 'Contract_2026.pdf'"
    )
    outcome: str
    source_ip: str | None = None
    payload: dict[str, Any]
    payload_hash: str
    # Hash chain
    hash: str
    previous_hash: str
    signature: str | None = None

    model_config = ConfigDict(from_attributes=True)


# Response models - stats dashboard


class AuditStatsResponse(BaseModel):
    """Audit stats dashboard data."""

    total_events: int  # Total events
    users_active_7d: int  # Active users in the last 7 days
    integrity_status: str  # "verified" | "warning"
    weekly_trend: float | None = None  # Week-over-week change: this week (since Monday 00:00) vs the full previous natural week, e.g. 12.4 means up 12.4%, None when the previous week has no events


# Response models - chain verification


class ChainVerificationResult(BaseModel):
    """Chain verification result."""

    chain_id: str
    total_records: int
    valid: bool
    errors: list[dict] = []
    verified_at: datetime.datetime


class SingleRecordVerificationResult(BaseModel):
    """Single record verification result."""

    event_id: str
    chain_id: str
    seq: int
    valid: bool
    errors: list[dict] = []
    verified_at: datetime.datetime


# Response models - Event Timeline


class AuditTimelineEvent(BaseModel):
    """A single event in the timeline."""

    event_id: str
    event_time: datetime.datetime
    action: str
    action_label: str | None = None
    actor_name: str | None = None
    resource_type: str
    resource_id: str
    outcome: str


class AuditTimelineResponse(BaseModel):
    """Event timeline for the same resource."""

    resource_type: str
    resource_id: str
    events: list[AuditTimelineEvent]


# Response models - filter dropdown options


class FilterUserOption(BaseModel):
    """User filter dropdown option."""

    user_id: str
    display_name: str
    email: str | None = None
    avatar: str | None = None


class AuditFilterOptionsResponse(BaseModel):
    """Filter options response."""

    resource_types: list[str]  # ["knowledge", "agent", "task", ...]
    actions: list[str]  # ["create", "update", "delete", ...]
    outcomes: list[str]  # ["success", "failure"]
    integrity_statuses: list[str]  # ["success", "warning", "failed"]


class FilterEventTypeOption(BaseModel):
    """Event type filter dropdown option (deprecated, kept for compatibility)."""

    action: str
    resource_type: str
    display_label: str  # UI display label, e.g. "Document Updated"
