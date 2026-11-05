"""Bot serialization schemas (marshmallow) and response models (pydantic)."""

from datetime import datetime
from typing import Any, List, Optional

from pydantic import BaseModel, Field

from . import BaseModelSchema
from docy.models.tb_bot import BotMessage, BotSession


class BotSessionSchema(BaseModelSchema):

    class Meta:
        model = BotSession
        exclude = ("message", "is_delete", "delete_at", "session")


class BotMessageSchema(BaseModelSchema):

    class Meta:
        model = BotMessage
        include_fk = True  # Allow foreign key columns as input
        fields = ("id", "content", "response", "query_time", "session_id")


class BotMessageLogSchema(BaseModel):

    response: str = Field(..., description="response")
    respond_time: datetime = Field(..., description="Response time")
    kind: str = Field(..., description="Type: text, thinking, tool, error")
    extra: Optional[Any] = Field(None, description="Extra data (raw tool JSON)")


class BotMessageLogResponseSchema(BaseModel):
    """Bot message log response data"""

    content: str
    response: Optional[str] = None
    query_time: Optional[datetime] = None
    session_id: Optional[str] = None
    attachments: Optional[List[dict]] = Field(
        default_factory=list, description="Files sent with this message [{name, key}]"
    )
    results: List[BotMessageLogSchema] = []


class BotSessionResponseSchema(BaseModel):

    session: str = Field(..., description="session id")
    title: str = Field(..., description="session name")
    session_type: str = Field(
        ...,
        description="session type",
        examples=["chat", "workflow_chat"],
    )
    agent_id: Optional[str] = Field(None, description="agent id")
