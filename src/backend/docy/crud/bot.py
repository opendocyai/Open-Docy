"""Bot session / message / message-log data access."""

from datetime import datetime
from typing import Dict, List, Optional

from sqlalchemy import Select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy_crud_plus import CRUDPlus

from docy.bases.cruds import CRUDBase
from docy.models.tb_bot import BotMessage, BotMessageLog, BotSession
from docy.utils.enums import SessionStatusEnum


class CRUDBotSession(CRUDPlus[BotSession], CRUDBase):

    async def custom_session_query_order(
        self,
        session: AsyncSession,
        start_time: datetime,
        end_time: datetime,
        user_id: str,
        space_id: str,
        status: SessionStatusEnum = SessionStatusEnum.active,
        is_deleted: bool = False,
        sort_columns="last_use_time",
        sort_orders="desc",
        agent_id: Optional[str] = None,
    ):
        return await self.select_models_order(
            session,
            sort_columns,
            sort_orders,
            self.model.last_use_time >= start_time,
            self.model.last_use_time < end_time,
            self.model.user_id == user_id,
            self.model.space_id == space_id,
            self.model.status == status,
            self.model.is_delete == is_deleted,
            self.model.agent_id == agent_id,
        )


class CRUDBotMessage(CRUDPlus[BotMessage], CRUDBase):

    async def get_query_set(self, **kwargs) -> Select:
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


class CRUDBotMessageLog(CRUDPlus[BotMessageLog], CRUDBase):

    async def get_message_log_dict(
        self, db: AsyncSession, message_ids: List[str]
    ) -> Dict:
        message_log_dict = {}
        if not message_ids:
            return message_log_dict
        result = await self.select_models_order(
            db,
            ["respond_time", "id"],
            ["asc", "asc"],
            message_id__in=message_ids,
            is_delete=False,
        )
        for row in result:
            message_log = {
                "response": row.response,
                "respond_time": row.respond_time,
                "kind": row.kind,
                "extra": row.extra,
            }
            if row.message_id in message_log_dict:
                message_log_dict[row.message_id].append(message_log)
            else:
                message_log_dict[row.message_id] = [message_log]
        return message_log_dict


bot_session_dao: CRUDBotSession = CRUDBotSession(BotSession)
bot_message_dao: CRUDBotMessage = CRUDBotMessage(BotMessage)
bot_message_log_dao: CRUDBotMessageLog = CRUDBotMessageLog(BotMessageLog)
