# -*- coding: utf-8 -*-
# @Time    : 2025/8/5 14:44
# @Author  : yanjia
# @File    : user_setting.py
# @Desc    : None

from sqlalchemy_crud_plus import CRUDPlus
from sqlalchemy.ext.asyncio import AsyncSession

from docy.bases.cruds import CRUDBase
from docy.models.tb_setting import UserSetting
from docy.forms.setting import UserSettingCreateModel, EmailNotificationSetting
from docy.crud.user import user_dao


class CRUDUserSetting(CRUDPlus[UserSetting], CRUDBase):

    async def get_query_set(self, **kwargs):
        sort_columns = kwargs.pop("sort_columns", "created_at")
        sort_orders = kwargs.pop("sort_orders", "desc")

        # Filter by conditions
        if "name" in kwargs:
            if kwargs["name"] is not None:
                kwargs["name__like"] = f'%{kwargs.pop("name")}%'
            else:
                kwargs.pop("name", None)

        # Combine filtering and pagination
        query_set = await self.select_order(
            sort_columns, sort_orders, self.model.is_delete == False, **kwargs
        )
        return query_set

    async def get_or_create_user_setting(self, db: AsyncSession, user_id: str, user_email: str, profile: bool = False) -> UserSetting:
        """
        Get or create the user setting.
        """

        user_setting = await self.select_model_by_column(db, user_id=user_id, is_delete=False)
        if not user_setting:
            user_setting_create_model = UserSettingCreateModel(
                user_id=user_id,
                email_notification_setting=EmailNotificationSetting(
                    team_email=user_email,
                    personal_email=user_email
                ),
                profile=profile
            )
            user_setting = await self.create_model(db, user_setting_create_model, commit=True, flush=True)
        if user_setting and profile:  # attach avatar and display name only when the profile is enabled
            user = await user_dao.select_model(db, user_id)
            if user:
                setattr(user_setting, "display", user.display)
                setattr(user_setting, "avatar", user.avatar)
                setattr(user_setting, "default_color", user.default_color)
            else:
                setattr(user_setting, "display", None)
                setattr(user_setting, "avatar", None)
                setattr(user_setting, "default_color", None)
        return user_setting


user_setting_dao: CRUDUserSetting = CRUDUserSetting(UserSetting)
