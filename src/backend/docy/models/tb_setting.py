# -*- coding: utf-8 -*-
# @Time    : 2025/8/5 14:25
# @Author  : yanjia
# @File    : tb_setting.py
# @Desc    : None

from sqlalchemy import Boolean, Text, String, Index
from sqlalchemy.orm import Mapped, mapped_column

from docy.bases.base_model import Base
from docy.core._string import gen_snowflake_id
from docy.core.fields import JSONDict, JSONList, UTCDateTime

class UserSetting(Base):
    """
    User settings
    """
    __tablename__ = 'user_setting'

    id = mapped_column(String(64), primary_key=True, unique=True, default=lambda: gen_snowflake_id())  # Redefine the id column to keep it first
    user_id = mapped_column(String(64), nullable=False, comment="User id")
    email_notification_setting = mapped_column(JSONDict, nullable=True, comment="Field data", default={})
    profile: Mapped[bool] = mapped_column(Boolean, default=False, comment="Whether enabled")
    description: Mapped[str] = mapped_column(Text, nullable=True, comment="Description")
    background_img: Mapped[str] = mapped_column(String(200), nullable=True, comment="Background image S3 key")
    location: Mapped[str] = mapped_column(String(200), nullable=True, comment="Location")
    website_urls: Mapped[JSONList] = mapped_column(JSONList, default=[], comment="Personal website URLs")
