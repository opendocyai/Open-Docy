# -*- coding: utf-8 -*-
# @Time    : 2025/8/5 15:16
# @Author  : yanjia
# @File    : setting.py
# @Desc    : None
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, field_serializer

from docy.schema import BaseModelSchema
from docy.core.storage_drivers import default_s3_client
from docy.models.tb_setting import UserSetting


class UserSettingSchema(BaseModelSchema):

    class Meta:
        model = UserSetting
        exclude = ("is_delete", "delete_at", "profile", "description", "background_img", "location", "website_urls")

class UserProfileSchema(BaseModel):

    id: str
    user_id: str
    display: Optional[str]
    avatar: Optional[str]
    default_color: Optional[str]
    profile: bool
    description: Optional[str]
    background_img: Optional[str]
    location: Optional[str]
    website_urls: Optional[List[str]]
    is_self: bool
    follower: Optional[int] = Field(0, description="Number of followers")
    followed: Optional[int] = Field(0, description="Number of users followed")
    is_followed: bool = Field(False, description="Whether this user is followed; false if it is yourself")

    @field_serializer("avatar")
    def serialize_avatar(self, avatar: str) -> Optional[str]:
        if avatar:
            return default_s3_client.url(avatar)
        return None

    @field_serializer("background_img")
    def serialize_background(self, background_img: str) -> Optional[str]:
        if background_img:
            return default_s3_client.url(background_img)
        return None

class UpdateUserProfileSchema(BaseModel):
    description: Optional[str] = Field(None, max_length=2000, description="Personal description")
    background_img: Optional[str] = Field(None, max_length=200, description="Background image")
    location: Optional[str] = Field(None, max_length=64, description='Location info')
    website_urls: Optional[List[str]] = Field([], description='Personal website list')


class CreateUserProfileSchema(UpdateUserProfileSchema):
    profile: bool = Field(True, description="Whether the profile is enabled")

class CreateFollowSchema(BaseModel):

    follower_id: str
    followed_id: str
    followed_at: datetime