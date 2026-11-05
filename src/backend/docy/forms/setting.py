# -*- coding: utf-8 -*-
# @Time    : 2025/8/5 16:45
# @Author  : yanjia
# @File    : setting.py
# @Desc    : None
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator
from pydantic_core import PydanticCustomError


class EmailNotificationSetting(BaseModel):

    team_email_notification_enable: bool = True
    team_email: EmailStr | None = Field(
        None,
        description="Team notification email",
        max_length=254
    )
    personal_email_notification_enable: bool = True
    personal_email: EmailStr | None = Field(
        None,
        description="Personal notification email",
        max_length=254
    )
    always_send_email_notification_enable: bool = True

    @field_validator("team_email", mode="before")
    def check_team_email(cls, v: str) -> str:
        if len(v) > 254:
            # 1. Custom type 2. Message 3. Placeholder
            raise PydanticCustomError(
                "Team email too short",
                "Please enter a valid email address with no more than 254 characters.",
            )
        return v

    @field_validator("personal_email", mode="before")
    def check_personal_email(cls, v: str) -> str:
        if len(v) > 254:
            # 1. Custom type 2. Message 3. Placeholder
            raise PydanticCustomError(
                "Personal email too short",
                "Please enter a valid email address with no more than 254 characters.",
            )
        return v


class UserSettingCreateModel(BaseModel):

    user_id: str
    email_notification_setting: EmailNotificationSetting
    profile: Optional[bool] = Field(False, description="Whether to enable personal profile")
