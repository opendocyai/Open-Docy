# -*- coding: utf-8 -*-
# @Time    : 2025/12/5 15:58
# @Author  : yanjia
# @File    : profile.py
# @Desc    : None
from typing import Dict, Optional
from loguru import logger

from docy.bases.base_manager import BaseManager
from docy.exceptions import exception as E
from docy.models.tb_setting import UserSetting
from docy.schema.setting import CreateUserProfileSchema, UpdateUserProfileSchema
from docy.crud import user_dao, user_setting_dao

# from .follow import UserFollowManager



class UserProfileManager(BaseManager):
    """
    User profile settings.
    """

    model = UserSetting
    dao = user_setting_dao

    async def create_user_profile(self, profile_id: str, create_user_profile_schema: CreateUserProfileSchema):
        """
        Create and enable the user profile.
        """
        if create_user_profile_schema.profile is False:
            create_user_profile_schema.profile = True

        return await self.dao.update_model(self.db, profile_id, create_user_profile_schema, commit=True, flush=True)

    async def get_user_profile(self, user_id: str, email: Optional[str] = None) -> UserSetting:
        """
        Get the user profile.
        """
        if not email:  # Backward compatibility: user settings used to need the email info
            user = await user_dao.select_model(self.db, user_id)
            if not user_id:
                raise E.ObjectNotFound
            email = user.email
            if not email:
                raise E.RequestError

        user_profile = await user_setting_dao.get_or_create_user_setting(self.db, user_id, email, profile=True)
        # is_self = self.request.user.id == user_id
        # setattr(user_profile, "is_self", is_self)
        # if not is_self:
        #     # Not the user themselves
        #     is_followed = await UserFollowManager.check_followed_user(self.db, self.request.user.id, user_id)
        #     setattr(user_profile, "is_followed", is_followed)

        # # Attach the follower and followed counts
        # following_info = await UserFollowManager.get_following_info(self.db, user_id)
        # for k, v in following_info.items():
        #     setattr(user_profile, k, v)

        return user_profile

    async def update_user_profile(self, profile_id: str, update_user_profile_schema: UpdateUserProfileSchema):

        return await self.dao.update_model(self.db, profile_id, update_user_profile_schema, commit=True, flush=True)
