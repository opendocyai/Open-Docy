"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/23
Last Modified: 2025/6/23
Last Editor:
Filename: tb_activity
Description: database tables for project tasks
"""

import enum
import pytz
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Boolean,
    DateTime,
    func,
    event,
    BIGINT,
    Text,
    Enum,
    Index,
)

from docy.bases.base_model import Base
from docy.const import KNOWLEDGENODE
from docy.core.fields import UTCDateTime, JSONList, JSONDict


class TaskType(enum.Enum):
    FOREVER_TASK = 1  # Permanent task created by the user via an agent template
    TEMPORARY_TASK = 2
    EXACT_TASK = 3  # Exact task created via an agent template; a new task is created on every run
    KNOWLEDGE_TAKS = 4
    POLICY_TASK = 5



class AGENTFROM(enum.Enum):
    FROM_MARKET = 1  # Template selected from the marketplace
    FROM_SPACE = 2  # Template selected from the user's space


class EmailType(enum.Enum):
    NORMAL = 1  # Normal email
    MARK = 2  # If this email created a task, add a record marking the session as completed


class TaskStatus(enum.Enum):
    NOT_START = "Not Started"
    QUEUED = "Queued"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"
    PAUSE = "Pause"
    ACTION_REQUIRED = "Action Required"
    ERROR = "Error"
    CANCEL = "CANCELED"


class BaseTaskModel(Base):
    __abstract__ = True
    name = Column(
        String(200),
    )
    agent_id = Column(String(64))
    agent_from = Column(Enum(AGENTFROM))
    status = Column(Enum(TaskStatus), default=TaskStatus.NOT_START)
    last_run_id = Column(
        String(64), nullable=True, default=None
    )  # ID generated per run; combined with task id to filter logs, also used to pause the run
    last_run_at = Column(UTCDateTime, nullable=True, default=None)
    last_run_start_at = Column(UTCDateTime, nullable=True, default=None)
    last_run_end_at = Column(UTCDateTime, nullable=True, default=None)
    last_run_node = Column(String(100), nullable=True, default=None)
    current_run_node = Column(String(500), nullable=True, default=None)  # Enlarged to 500 to avoid overflow
    current_run_path = Column(
        JSONList, nullable=True, default=None
    )  # When the task runs, indicates which routes the current task is executing
    last_run_json_temple = Column(
        JSONDict, nullable=True, default=None
    )  # JSON config used by the last run; never changes after creation
    last_run_logs = Column(Text, default=None, nullable=True)  # Stores logs of the last run
    creator_id = Column(
        String(64),
    )
    run_result = Column(
        JSONDict, nullable=True, default={}
    )  # Final result of the task/AI run: approvals, extracted fields, generated documents
    interim_result = Column(
        JSONDict, nullable=True, default=None
    )  # Intermediate results, e.g. during single-step debugging: fields extracted in this run
    error_info = Column(
        Text, nullable=True, default=None
    )  # Error info when a run fails; reset to None on each new run

    json_temple = Column(
        JSONDict, nullable=True, default=None
    )  # JSON template used by this run; mutates during the run, including echo-back
    input_param = Column(JSONDict, nullable=True, default={})  # Stores input files submitted by the user
    task_space_id = Column(String(64), nullable=True, default=None)
    timestampdiff = Column(
        BIGINT, nullable=True, default=None
    )  # Actual task run time, in seconds

    @property
    def run_time(self):
        now_time = datetime.now(timezone.utc)
        if self.status in [TaskStatus.COMPLETED, TaskStatus.ERROR]:
            # Task completed: convert timestampdiff directly
            return self.format_timedelta(self.timestampdiff or 0)
        elif self.status in [TaskStatus.NOT_START, TaskStatus.CANCEL]:
            # Task not started or canceled: no run time shown
            return
        else:
            # Otherwise, compute
            if not any([self.last_run_start_at, self.last_run_end_at]) or all([self.last_run_start_at, self.last_run_end_at]):
                return self.format_timedelta(self.timestampdiff or 0)
            elif not self.last_run_end_at:
                total_seconds = int(now_time.timestamp() - self.last_run_start_at.timestamp())
                total_seconds += self.timestampdiff or 0
                return self.format_timedelta(total_seconds)
            else:
                return

    @staticmethod
    def format_timedelta(total_seconds):
        days = total_seconds // 86400
        remaining = total_seconds % 86400

        hours = remaining // 3600
        remaining %= 3600

        minutes = remaining // 60
        seconds = remaining % 60

        parts = []
        if days > 0:
            parts.append(f"{days}d")
        if hours > 0:
            parts.append(f"{hours}h")
        if minutes > 0:
            parts.append(f"{minutes}m")
        if seconds > 0 or not parts:
            parts.append(f"{seconds}s")

        return " ".join(parts)


class ActivityTask(BaseTaskModel):
    __tablename__ = "activity_task"
    __table_args__ = (
        Index("idx_activity_task_id", "agent_id"),
        Index("idx_activity_task_last_run_id", "last_run_id"),
        Index("idx_activity_task_space_id", "task_space_id"),
        Index("idx_activity_task_type", "task_type"),
        Index("idx_activity_task_name", "name"),
    )
    task_type = Column(Enum(TaskType), default=TaskType.FOREVER_TASK)
    # Two new identifying fields
    visible = Column(Boolean, default=True)  # Whether visible in the frontend
    webhook_push = Column(Boolean, default=False)  # Whether to push webhook
    # New fields for OAuth API compatibility
    tenant_id = Column(String(64), nullable=True, default=None)
    virtual_space_id = Column(String(64), nullable=True, default=None)
    virtual_user_id = Column(String(64), nullable=True, default=None)
    raw_data = Column(JSONDict, nullable=True, default=None)


class TemporaryTask(BaseTaskModel):
    __tablename__ = "temporary_task"
    __table_args__ = (
        Index("idx_temporary_task_agent_id", "agent_id"),
        Index("idx_temporary_task_last_run_id", "last_run_id"),
        Index("idx_temporary_task_space_id", "task_space_id"),
        Index("idx_temporary_task_type", "task_type"),
        Index("idx_temporary_task_name", "name"),
    )
    task_type = Column(Enum(TaskType), default=TaskType.TEMPORARY_TASK)
    run_node = Column(
        String(100), nullable=True, default=None
    )  # Target node when the user single-step debugs


class TaskRecord(Base):
    """
    Records every created task; used to track completion of tasks per agent
    """

    __tablename__ = "task_record"
    task_id = Column(String(64))
    run_id = Column(String(64))
    agent_id = Column(String(64), nullable=True, default=None)
    space_id = Column(String(64), nullable=True, default=None)
    status = Column(Enum(TaskStatus), default=TaskStatus.NOT_START)
    auth_type = Column(
        String(20), nullable=True, default=None
    )  # Records whether this run was triggered via API or frontend
    api_key_id = Column(String(64), nullable=True, default=None)  # Stores api_key_id if the user's API key is used
    task_type = Column(Enum(TaskType), default=TaskType.FOREVER_TASK)
    # space_owner_id records the user who created the task
    space_owner_id = Column(String(64), nullable=True, default=None)
    timestampdiff = Column(
        BIGINT, nullable=True, default=None
    )  # Actual task run time, in seconds
