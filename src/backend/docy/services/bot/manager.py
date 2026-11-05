"""Bot session business logic."""

import datetime
from typing import Any, Dict, List, Optional, Sequence, Tuple

import pytz
from loguru import logger
from sqlalchemy import Row
from sqlalchemy.sql import func, select

from docy.bases.base_manager import BaseManager
from docy.core.settings import project_settings as settings
from docy.crud import bot_session_dao, workspace_dao
from docy.exceptions import exception as E
from docy.forms.bot import BotSessionCreateModel, BotSessionUpdateForm
from docy.models.tb_bot import BotSession
from docy.schema.bot import BotSessionSchema
from docy.utils.enums import SessionStatusEnum

LOG = logger.bind(category="bot")


class BotSessionManager(BaseManager):
    """
    Business logic for bot sessions.
    """

    model = BotSession

    async def get_session_by_id(self, _id: str) -> Optional[BotSession]:
        return await bot_session_dao.select_model(self.db, _id)

    async def get_latest_session_by_user_id(
        self, user_id: str, space_id: str, agent_id: Optional[str] = None
    ) -> Sequence[Row[tuple[BotSession, ...] | Any] | BotSession]:
        return await bot_session_dao.select_models_order(
            self.db,
            "update_at",
            "desc",
            self.model.user_id == user_id,
            self.model.space_id == space_id,
            self.model.agent_id == agent_id,
            limit=1,
            is_delete=False,
        )

    async def create_session(
        self, create_session_model: BotSessionCreateModel
    ) -> Optional[BotSession]:
        """
        Create a session.
        """
        if await workspace_dao.select_model(self.db, create_session_model.space_id) is None:
            raise E.ObjectNotFound("space not found")

        bot_session = await bot_session_dao.create_model(
            self.db, create_session_model, flush=True
        )
        return bot_session

    async def delete_session(
        self, bot_session_ids: List[str], soft_delete: bool = True
    ) -> int:
        """Delete sessions by session ID."""

        delete_rows = await bot_session_dao.delete_model_by_column(
            self.db,
            allow_multiple=True if len(bot_session_ids) > 1 else False,
            logical_deletion=soft_delete,
            deleted_flag_column="is_delete",
            deleted_at_column="delete_at",
            flush=True,
            commit=True,
            id__in=bot_session_ids,
            is_delete=False,
        )

        if delete_rows:
            # TODO operations after deletion
            pass

        return delete_rows

    async def update_session(
        self, session_id: str, _update_form: BotSessionUpdateForm
    ) -> int:
        """Update a session."""

        update_rows = await bot_session_dao.update_model(
            self.db, session_id, _update_form, flush=True
        )
        return update_rows

    async def get_session_list(
        self, user_id: str, space_id: str, agent_id: Optional[str] = None
    ) -> List:
        """
        Get the session list.
        :param user_id: str
        :param space_id: str
        :param agent_id: str
        :return:
        """
        session_list = []

        month_map = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December",
        }
        default_timezone = pytz.timezone(settings.default.timezone)

        now_time = datetime.datetime.now()
        time_start = datetime.datetime(
            year=now_time.year,
            month=now_time.month,
            day=now_time.day,
            tzinfo=default_timezone,
        )
        time_today_end = time_start + datetime.timedelta(days=1)
        # today sessions
        today_sessions = await bot_session_dao.custom_session_query_order(
            self.db, time_start, time_today_end, user_id, space_id, agent_id=agent_id
        )

        if today_sessions:
            session_list.append(
                ("Today", BotSessionSchema().dump(today_sessions, many=True))
            )

        # Yesterday
        yesterday_start = time_start - datetime.timedelta(days=1)
        yesterday_threads = await bot_session_dao.custom_session_query_order(
            self.db, yesterday_start, time_start, user_id, space_id, agent_id=agent_id
        )
        if yesterday_threads:
            session_list.append(
                ("Yesterday", BotSessionSchema().dump(yesterday_threads, many=True))
            )

        # pre30days
        pre_30_days = time_start - datetime.timedelta(days=30)
        pre30day_threads = await bot_session_dao.custom_session_query_order(
            self.db, pre_30_days, yesterday_start, user_id, space_id, agent_id=agent_id
        )
        if pre30day_threads:
            session_list.append(
                (
                    "Previous 30 Days",
                    BotSessionSchema().dump(pre30day_threads, many=True),
                )
            )

        if time_today_end.month > 1:
            # Last month
            last_month = datetime.datetime(
                year=time_today_end.year,
                month=time_today_end.month - 1,
                day=1,
                tzinfo=default_timezone,
            )
            last_month_treads = await bot_session_dao.custom_session_query_order(
                self.db, last_month, pre_30_days, user_id, space_id, agent_id=agent_id
            )
            if last_month_treads:
                session_list.append(
                    (
                        month_map[time_today_end.month - 1],
                        BotSessionSchema().dump(last_month_treads, many=True),
                    )
                )
            for i in range(1, time_today_end.month - 1):
                month_start = datetime.datetime(
                    year=time_today_end.year, month=i, day=1, tzinfo=default_timezone
                )
                month_end = datetime.datetime(
                    year=time_today_end.year,
                    month=i + 1,
                    day=1,
                    tzinfo=default_timezone,
                )
                month_treads = await bot_session_dao.custom_session_query_order(
                    self.db,
                    month_start,
                    month_end,
                    user_id,
                    space_id,
                    agent_id=agent_id,
                )
                if month_treads:
                    session_list.append(
                        (month_map[i], BotSessionSchema().dump(month_treads, many=True))
                    )

        all_years = sorted(
            [
                i[0]
                for i in await self.db.execute(
                    select(
                        func.extract("year", bot_session_dao.model.created_at).label(
                            "year"
                        )
                    ).distinct()
                )
            ],
            reverse=True,
        )
        for year in all_years[1:]:
            year_start = datetime.datetime(
                year=year, month=1, day=1, tzinfo=default_timezone
            )
            year_end = datetime.datetime(
                year=year + 1, month=1, day=1, tzinfo=default_timezone
            )
            month_treads = await bot_session_dao.custom_session_query_order(
                self.db,
                year_start,
                year_end,
                user_id,
                space_id,
                agent_id=agent_id,
            )
            if month_treads:
                session_list.append(
                    (str(year), BotSessionSchema().dump(month_treads, many=True))
                )

        return session_list
