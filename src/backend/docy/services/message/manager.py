
# -*- coding: utf-8 -*-
# @Time    : 2025/7/22 15:27
# @Author  : yanjia
# @File    : manager.py
# @Desc    : None
from datetime import datetime, UTC
from typing import Optional, Dict, List, Tuple, Any
from loguru import logger

from docy.bases.base_manager import BaseManager
from docy.exceptions import exception as E
from docy.const import SSEEventTypeEnum
from docy.forms import EventForm
from docy.forms.message import InnerMessageCreateForm
from docy.models.tb_message import InnerMessage
from docy.crud import inner_message_dao, user_dao
from docy.utils.enums import InnerMessageStatusEnum, InnerModelEnum, InnerMessageStateEnum



class InnerMessageManager(BaseManager):
    """
    Business logic for in-app messages.
    """

    model = InnerMessage

    async def get_inner_message_by_id(self, _id: str) -> Optional[InnerMessage]:
        return await inner_message_dao.select_model(
            self.db,
            _id
        )

    async def create_inner_message(self, params: InnerMessageCreateForm, global_message: bool = False):
        """
        Create an in-app message.
        """
        # Deferred import to avoid the circular import of
        # docy.core.sse -> honker_db -> mq -> workspace.manager -> this module
        from docy.core.sse import sse_manager
        if global_message or params.broadcast:  # Whether to broadcast
            global_message.broadcast = True
            self.bg_task.add_task(self.create_broadcast_inner_message, params)
        else:
            inner_message = await inner_message_dao.create_model(self.db, params, flush=True, commit=True)

            if params.receive_user_id and params.state:
                # Push the SSE message to the frontend
                push_event = EventForm(
                    event_type=params.state,
                    object_id=params.receive_user_id,
                    object_type=SSEEventTypeEnum.object_user,
                    content=params.content,
                    payload={
                        "receive_user_email": params.receive_user_email,
                        "space_id": params.space_id,
                        "model": params.model,
                    },
                )

                await sse_manager.push_message(push_event, global_message)

    async def get_inner_messages_page_query_set(self, **kwargs):
        kwargs = await inner_message_dao.attach_sort_columns_orders_info(self.model, kwargs)

        return await inner_message_dao.get_query_set(
            **{k: v for k, v in kwargs.items() if v is not None}
        )

    async def delete_inner_message(
        self, inner_message_ids: List[str], soft_delete: bool = True
    ) -> int:
        """Delete in-app messages."""

        delete_rows = await inner_message_dao.delete_model_by_column(
            self.db,
            allow_multiple=True if len(inner_message_ids) > 1 else False,
            logical_deletion=soft_delete,
            deleted_flag_column="is_delete",
            deleted_at_column="delete_at",
            flush=True,
            commit=True,
            id__in=inner_message_ids,
            is_delete=False,
        )

        if delete_rows:
            # TODO operations after deletion
            pass

        return delete_rows

    async def update_inner_message(self, inner_message_id: str, action: InnerMessageStatusEnum) -> int:
        """Update the status."""

        return await inner_message_dao.update_model(
            self.db,
            inner_message_id,
            {"status": action.value},
            flush=True,
            commit=True,
        )

    async def set_all_read_message(self, space_id: str, user_id: str, email: str):
        """Mark all messages as read."""

        return await inner_message_dao.update_model_by_column(
            self.db,
            {"status": InnerMessageStatusEnum.read},
            allow_multiple=True,
            flush=True,
            commit=True,
            space_id=space_id,
            receive_user_id=user_id,
            # receive_user_email=email,
            __or__={"receive_user_email": [email, None, ""]},  # The recipient email may be empty
            status=InnerMessageStatusEnum.unread,
        )

    async def create_broadcast_inner_message(self, params: InnerMessageCreateForm):
        """
        Send a broadcast message.</br>
        """
        from docy.core.sse import sse_manager

        user_list = await user_dao.select_models(self.db, is_delete=False)
        for user in user_list:

            with_user_info_params = params
            with_user_info_params.receive_user_id = user.id
            with_user_info_params.receive_user_email = user.email
            await inner_message_dao.create_model(self.db, params, flush=True, commit=True)

            # Push the SSE message to the frontend
            push_event = EventForm(
                event_type=params.state,
                object_id=params.receive_user_id,
                object_type=SSEEventTypeEnum.object_user,
                content=params.content,
                payload={
                    "receive_user_email": params.receive_user_email,
                    "space_id": params.space_id,
                    "model": params.model,
                },
            )

            await sse_manager.push_message(push_event)

    async def get_message_unread_count(self, user_id: str, space_id: str) -> int:
        """
        Get the number of unread messages for the user in the given workspace.
        :param user_id: str
        :param space_id: str
        :return:
        """
        return await inner_message_dao.count(
            self.db,
            status=InnerMessageStatusEnum.unread,
            receive_user_id=user_id,
            space_id=space_id,
            is_delete=False
        )
