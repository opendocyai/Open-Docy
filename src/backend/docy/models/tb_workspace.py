# -*- coding: utf-8 -*-
# @Time    : 2025/6/10 15:51
# @Author  : yanjia
# @File    : tb_workspace.py
# @Desc    : workspace table definitions
import enum
from sqlalchemy import Column, String, Enum, func, Integer

from docy.bases.base_model import Base

from docy.database import get_sync_db_connector
from docy.utils.sql_query import retrieve_object_queryset
from docy.core._string import gen_snowflake_id, get_color
from docy.core.fields import UTCDateTime
from docy import const


class WorkspaceType(enum.StrEnum):
    TEAM = "team"
    PERSONAL = "personal"


class MemberType(enum.StrEnum):
    OWNER = "owner"
    MEMBER = "member"


class MemberStatus(enum.IntEnum):
    """Workspace member status"""
    activated = 1
    pending = 0


class FrontInviteAction(enum.StrEnum):
    ACCEPT = "accept"
    IGNORE = "ignore"

class BudgetType(enum.StrEnum):
    """Budget type"""

    CREDIT = "credit"
    AGENT_TOKEN = "agent_token"


class InviteAction(enum.StrEnum):
    ACCEPT = "accept"  # Accept
    IGNORE = "ignore"   # Ignore
    UNTREATED = "untreated"  # Untreated
    EXPIRED = "expired"  # Expired

    @classmethod
    def to_dict(cls):
        return {member.name: member.value for member in cls}


class WorkspaceAuthType(enum.StrEnum):
    """Quota info"""

    FREE = "free"
    TRIAL = "trial"


class Workspace(Base):
    """
    Workspace table
    """

    __tablename__ = "workspace"
    id = Column(
        String(64), primary_key=True, unique=True, default=lambda: gen_snowflake_id()
    )  # Redefine the id column to keep it first
    name = Column(String(120), nullable=False, comment="Name")
    description = Column(String(500), nullable=True)
    avatar = Column(String(128), nullable=True)
    user_id = Column(String(64), nullable=False)  # Creator id, i.e. the owner
    space_type = Column(
        Enum(WorkspaceType), nullable=True, default=WorkspaceType.PERSONAL
    )  # Workspace type
    default_color = Column(
        String(10), nullable=True, default=get_color
    )  # Default color when creating a workspace
    expire_days = Column(Integer, nullable=True, comment="Expiry days")
    expire_at = Column(UTCDateTime, nullable=True, comment="Expiry time")
    auth_type = Column(
        Enum(WorkspaceAuthType),
        nullable=True,
        default=WorkspaceAuthType.FREE,
        comment="Auth type",
    )

    @property
    def display_name(self) -> str:
        from docy.services.auth.utils.user import get_user_model

        if self.space_type == WorkspaceType.TEAM:
            return self.name
        else:
            with get_sync_db_connector() as db:
                user_model = get_user_model()
                user = retrieve_object_queryset(
                    db, user_model, o_id=self.user_id
                ).scalar()
                return f"{user.display}{const.PRIVATE_WORKSPACE_SUFFIX}"


class WorkspaceMember(Base):
    """Workspace member table"""

    __tablename__ = "workspace_member"

    id = Column(
        String(64), primary_key=True, unique=True, default=lambda: gen_snowflake_id()
    )  # Redefine the id column to keep it first
    workspace_id = Column(String(64), nullable=False)
    user_id = Column(String(64), nullable=True, comment="Member id")
    email = Column(String(64), nullable=False, comment="Member email")
    space_type = Column(
        Enum(WorkspaceType), nullable=True, default=WorkspaceType.PERSONAL
    )  # Workspace type
    role_id = Column(String(64), nullable=False)  # Member role id
    role_type = Column(Enum(MemberType), nullable=False)  # Member role type
    last_active_at = Column(UTCDateTime, nullable=True, comment="Last active time")
    status = Column(Enum(MemberStatus), default=MemberStatus.pending, comment="Member status")