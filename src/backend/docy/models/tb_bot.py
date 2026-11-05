"""Bot (AI assistant) tables: bot_session / bot_message / bot_message_log."""

from sqlalchemy import JSON, Boolean, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import true

from docy.bases.base_model import Base
from docy.core.fields import UTCDateTime
from docy.utils.enums import SessionStatusEnum


class BotSession(Base):
    """
    Bot session
    """

    __tablename__ = "bot_session"

    default_bot_session_title = "new bot session"

    session = Column(String(256), comment="Token after user login")
    title = Column(String(64), default=default_bot_session_title, comment="Title")
    status = Column(Integer, default=SessionStatusEnum.active.value, comment="Status")
    user_id = Column(String(64), ForeignKey("auth_user.id"))
    last_use_time = Column(
        UTCDateTime, nullable=True, default=None, comment="Last used time"
    )
    message = relationship("BotMessage", back_populates="session", cascade="all, delete")
    space_id = Column(String(64), comment="Workspace id")
    session_type = Column(String(64), default="workflow_chat", comment="Session type")
    attachments = Column(
        JSON,
        nullable=True,
        default=None,
        comment="Cumulative attachment list of the session [{name, key, uploaded_this_turn}]",
    )
    agent_id = Column(String(64), nullable=True, default=None, comment="Associated agent id")


class BotMessage(Base):
    """
    Bot session message
    """

    __tablename__ = "bot_message"

    content = Column(Text(1024), comment="User question message")
    response = Column(Text(1024), nullable=True, default=None, comment="Response message")
    user_id = Column(String(64), nullable=True, default=None)
    query_time = Column(UTCDateTime, nullable=True, default=None, comment="Query time")
    timespent = Column(Integer, nullable=True, default=None, comment="Time spent")
    respond_time = Column(UTCDateTime, nullable=True, default=None, comment="Response time")
    session_id = Column(String(64), ForeignKey("bot_session.id"))
    session = relationship("BotSession", back_populates="message")
    bot_org_json = Column(JSON, nullable=True, default=None)  # Keeps the raw bot reply
    attachments = Column(
        JSON,
        nullable=True,
        default=None,
        comment="Files sent with this message [{name, key}]",
    )

    # Reserved fields
    is_valid = Column(Boolean, default=True)  # Reserved field
    run_id = Column(String(128), nullable=True, default=None)  # Reserved field
    like = Column(Boolean, nullable=True, default=None)
    feedback = Column(Text(1024), nullable=True, default=None)
    is_harmful = Column(Boolean, nullable=True, default=None)
    is_true = Column(Boolean, nullable=True, default=None)
    is_helpful = Column(Boolean, nullable=True, default=None)
    is_progress = Column(Boolean, server_default=true())


class BotMessageLog(Base):
    """
    Detailed message log
    """

    __tablename__ = "bot_message_log"

    content = Column(Text, nullable=True, default=None, comment="Input message content")
    response = Column(Text, comment="Returned message content")
    user_id = Column(String(64), nullable=True, default=None)
    space_id = Column(String(64), nullable=True, default=None)
    timespent = Column(Integer, nullable=True, default=None, comment="Time spent (s)")
    respond_time = Column(UTCDateTime, comment="Response time")
    message_id = Column(String(64), nullable=False, comment="message id")
    session_id = Column(String(64), nullable=False, comment="session id")
    kind = Column(String(64), nullable=True, default=None, comment="Message kind")
    extra = Column(JSON, nullable=True, default=None)  # Extra data
