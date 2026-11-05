# -*- coding: utf-8 -*-
# @Time    : 2025/7/22 15:40
# @Author  : yanjia
# @File    : message.py
# @Desc    : None
from typing import List
from pydantic import BaseModel, Field, model_validator

from docy.utils.enums import InnerMessageStatusEnum, InnerModelEnum, InnerMessageStateEnum

class InnerMessageCreateForm(BaseModel):

    space_id: str = Field(..., description="Workspace id", min_length=1)
    title: str = Field(..., description="Message title", min_length=1)
    content: str = Field(..., description="Message content", min_length=1)
    broadcast: bool = Field(False, description="Whether to broadcast")
    send_user_id: str | None = Field(None, description="Sender user id")
    send_user_email: str | None = Field(None, description="Sender email")
    receive_user_id: str | None = Field(None, description="Receiver user id")
    receive_user_email: str | None = Field(None, description="Receiver email")
    status: InnerMessageStatusEnum = Field(InnerMessageStatusEnum.unread,
                                            description="Message processing status")
    model: InnerModelEnum = Field(InnerModelEnum.system, description="Owning module")
    state: InnerMessageStateEnum = Field(InnerMessageStateEnum.notice, description="Message state type")
    inner_path: str | None = Field(None, description="Redirect path")
    raw_data: dict = Field({}, description="Raw data")

class InnerMessageDeleteManyForm(BaseModel):

    inner_message_ids: List[str]

class InnerMessageAllReadForm(BaseModel):
    space_id: str = Field(..., description="Workspace id", min_length=1)
    user_id: str = Field(None, description="User id")
    email: str = Field(None, description="User email")