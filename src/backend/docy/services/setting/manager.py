# -*- coding: utf-8 -*-
# @Time    : 2025/8/5 14:41
# @Author  : yanjia
# @File    : manager.py
# @Desc    : None
import json
from loguru import logger
from typing import Dict, Optional

from docy.bases.base_manager import BaseManager
from docy.const import CommonRedisKey
from docy.exceptions import exception as E
from docy.forms.setting import EmailNotificationSetting
from docy.models.tb_setting import UserSetting
from docy.schema.setting import UserSettingSchema, CreateUserProfileSchema, UpdateUserProfileSchema
from docy.crud import user_dao , user_setting_dao
from docy.cache.cache_utils import get_from_cache, delete_keys_from_cache, save_to_cache


class UserSettingManager(BaseManager):
    """
    User settings.
    """

    model = UserSetting
    dao = user_setting_dao

    async def get_user_setting(self, user_id: str) -> Dict:
        """
        Get the user settings.
        """
        user_setting_key = CommonRedisKey.get_user_setting_key(user_id)

        user_setting_str = await get_from_cache(user_setting_key) if self.request else ""
        if not user_setting_str:
            if self.request.user:
                user_email = self.request.user.email
            else:
                user = await user_dao.select_model(self.db, user_id)
                user_email = user.email
            user_setting = await self.create_user_setting(user_id, user_email)
            await self.db.refresh(
                user_setting, attribute_names=["created_at", "update_at"]
            )
            user_setting_dict = UserSettingSchema().dump(user_setting)
            await save_to_cache(
                user_setting_key,
                json.dumps(user_setting_dict),
                ex=CommonRedisKey.user_setting_key_expired,
            )
        else:
            user_setting_dict = json.loads(user_setting_str)

        return user_setting_dict

    async def set_user_setting(
        self, setting_id: str, user_setting_form: EmailNotificationSetting
    ):
        """
        Update the user settings.
        """

        user_setting = await user_setting_dao.select_model(self.db, setting_id)
        if not user_setting:
            logger.error(f"user setting {setting_id} does not exist")
            raise E.ObjectNotFound("setting not found")

        email_notification_setting = user_setting.email_notification_setting
        email_notification_setting.update(
            user_setting_form.model_dump(exclude_unset=True)
        )
        update_rows = await user_setting_dao.update_model(
            self.db,
            setting_id,
            {"email_notification_setting": email_notification_setting},
            commit=True,
            flush=True,
        )
        if update_rows:
            user_setting_key = CommonRedisKey.get_user_setting_key(user_setting.user_id)
            # Update the redis value and expiry
            if self.request and self.request.app:
                # Update the cache
                await save_to_cache(user_setting_key, json.dumps(
                    {
                        "email_notification_setting": email_notification_setting,
                        "id": setting_id,
                    }
                ), CommonRedisKey.user_setting_key_expired)

    async def create_user_setting(self, user_id: str, user_email: str) -> UserSetting:
        """
        Create the user settings.
        """
        user_setting = await user_setting_dao.get_or_create_user_setting(
            self.db, user_id, user_email
        )
        return user_setting
