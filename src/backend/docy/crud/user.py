# -*- coding: utf-8 -*-
# @Time    : 2025/6/16 17:16
# @Author  : yanjia
# @File    : user.py
# @Desc    : None
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy_crud_plus import CRUDPlus

from docy.models.tb_auth import User


class CRUDUser(CRUDPlus[User]):

    async def get_user_by_id(self, db: AsyncSession, user_id: str) -> User:
        """
        Get a user by id.
        :param user_id:
        :param db:
        :return:
        """
        return await self.select_model_by_column(
            db, User.id == user_id, is_delete=False
        )

    async def get_user_by_email(self, db: AsyncSession, email: str) -> User:
        """
        Get a user by email.
        :param email:
        :param db:
        :return:
        """
        return await self.select_model_by_column(
            db, User.email == email, is_delete=False
        )

    async def get_user_by_filter(self, db: AsyncSession, **kwargs) -> User:
        """
        Get a user by filter conditions.
        :param db:
        :param kwargs:
        :return:
        """
        return await self.select_model_by_column(db, is_delete=False, **kwargs)


user_dao: CRUDUser = CRUDUser(User)
