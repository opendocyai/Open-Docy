"""Bot request forms and internal create models."""

from datetime import datetime
from typing import Any, List, Optional

from pydantic import BaseModel, Field


class SessionType:

    chat = "chat"
    workflow_chat = "workflow_chat"


class BotChatFileSchema(BaseModel):

    name: str = Field(..., description="File name")
    key: str = Field(..., description="s3 key")


class BotSessionDeleteManyForm(BaseModel):

    bot_session_ids: List[str]


class BotSessionUpdateForm(BaseModel):

    title: str


class BotMessageCreateForm(BaseModel):
    """
    Send a message
    """

    user_id: str = Field(None, description="User id")
    content: str = Field(..., min_length=1, max_length=1500, description="Message content")
    session_id: str = Field(..., min_length=1, description="session id")
    attachments: List[BotChatFileSchema] = Field([], description="Files/images")
    agent_id: Optional[str] = Field(None, description="agent id")
    space_id: Optional[str] = Field(None, description="space id")
    code: Optional[str] = Field(None, description="agent code")


class BotSessionCreateForm(BaseModel):

    user_id: str = None
    space_id: str
    title: str = None
    session_type: Optional[str] = Field(
        default="chat", description="Session type: chat/workflow_chat"
    )
    agent_id: Optional[str] = Field(None, description="agent id")


class BotSessionCreateModel(BaseModel):
    """
    Create a session
    """

    title: Optional[str] = None
    session: Optional[str] = None
    user_id: str
    space_id: str
    session_type: Optional[str] = SessionType.chat
    agent_id: Optional[str] = None


class BotMessageCreateModel(BaseModel):
    """Create a message."""

    content: str
    user_id: str
    query_time: datetime
    session_id: str
    session: Any
    attachments: Optional[List[dict]] = None


class BotMessageLogCreateSchema(BaseModel):
    """
    Message log
    """

    content: Optional[str] = None
    response: str
    user_id: Optional[str] = None
    space_id: Optional[str] = None
    timespent: Optional[int] = None
    respond_time: Optional[datetime] = None
    message_id: str
    session_id: str
    kind: Optional[str] = None
    extra: Optional[list | dict] = None
