# -*- coding: utf-8 -*-
# @Time    : 2025/7/18 11:38
# @Author  : yanjia
# @File    : tb_message.py
# @Desc    : None


import enum
from sqlalchemy import String, Enum, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship, mapped_column

from docy.bases.base_model import Base
from docy.core._string import gen_snowflake_id
from docy.core.fields import (JSONDict, JSONList)
from docy.utils.enums import InnerMessageStatusEnum, InnerModelEnum, InnerMessageStateEnum


class InnerMessage(Base):
    """
    In-app message table
    """

    __tablename__ = 'inner_message'

    id = mapped_column(String(64), primary_key=True, unique=True, default=lambda: gen_snowflake_id())  # Redefine the id column to keep it first
    title = mapped_column(String(64), nullable=False, comment="Title")
    content = mapped_column(Text(256), nullable=False, comment="Content")
    broadcast = mapped_column(Boolean, nullable=True, default=False, comment="Whether to broadcast")
    send_user_id = mapped_column(String(64), nullable=True, default=None, comment="Sender id")
    send_user_email = mapped_column(String(64), nullable=True, default=None, comment="Sender email")
    receive_user_id = mapped_column(String(64), nullable=True, default=None, comment="Recipient id")
    receive_user_email = mapped_column(String(64), nullable=True, default=None, comment="Recipient email")
    status = mapped_column(Enum(InnerMessageStatusEnum), default=InnerMessageStatusEnum.unread, nullable=True, comment="Message handling status")
    model = mapped_column(Enum(InnerModelEnum), comment="Module the message belongs to")
    state = mapped_column(Enum(InnerMessageStateEnum), default=InnerMessageStateEnum.notice, comment="Message state")
    inner_path = mapped_column(String(128), nullable=True, default=None, comment="Redirect path")
    raw_data = mapped_column(JSONDict, nullable=True, default={})  # Raw message JSON
    space_id = mapped_column(String(64), nullable=False, comment="Workspace id")
