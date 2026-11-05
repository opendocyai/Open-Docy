"""Bot message business logic.

The old implementation buffered streaming chunks in Redis lists and
dispatched AI work through AWS Lambda. The OSE replaces Redis with the
local cache (cashews + diskcache) and Lambda with the in-process AI
executor (docy.core.aiexecutor, backed by the honker "ai" queue).
"""

from datetime import datetime, UTC
from typing import List

from loguru import logger

from docy.bases.base_manager import BaseManager
from docy.cache.cache_utils import delete_key_from_cache, get_from_cache, save_to_cache
from docy.const import CommonRedisKey, MqEventTypeEnum, SSEEventTypeEnum
from docy.crud import bot_message_dao, bot_message_log_dao, bot_session_dao
from docy.database import get_async_db_connector
from docy.exceptions import exception as E
from docy.forms import EventForm
from docy.forms.bot import (
    BotChatFileSchema,
    BotMessageCreateForm,
    BotMessageCreateModel,
    BotMessageLogCreateSchema,
    SessionType,
)
from docy.models.tb_bot import BotMessage
from docy.services.bot.manager import BotSessionManager
from docy.utils import DATETIME_STANDARD_FORMAT
from docy.utils.enums import (
    BotMessageKindEnum,
    LambdaFunctionEnum,
    LambdaResponseStatusEnum,
)

LOG = logger.bind(category="bot")


class BotMessageManager(BaseManager):
    """
    Bot assistant.
    """

    model = BotMessage

    async def create_message(self, param: BotMessageCreateForm):
        """
        Generate and send a message.
        """
        template_json = {}

        session_id = param.session_id
        if not session_id:
            raise E.MissingArguments("missing 'session_id'")
        else:
            bot_session = await BotSessionManager(self.db).get_session_by_id(session_id)

        if not bot_session:
            raise E.MissingArguments("session not found")
        # If space_id is not given, use the session's space_id
        if not param.space_id:
            param.space_id = bot_session.space_id
        agent_code = param.code
        if agent_code:
            agent_info = await get_from_cache(agent_code)
            if agent_info:
                if not param.agent_id:
                    param.agent_id = agent_info.get("agent_id")
                template_json = agent_info.get("template_json", {})

        content = param.content
        if not content:
            raise E.MissingArguments("missing 'content'")

        bot_message_schema = BotMessageCreateModel(
            content=content,
            user_id=param.user_id,
            session_id=bot_session.id,
            session=bot_session,
            query_time=datetime.now(UTC),
            attachments=[
                {"name": att.name, "key": att.key} for att in (param.attachments or [])
            ],
        )

        bot_message = await bot_message_dao.create_model(
            self.db, bot_message_schema, flush=True, commit=True
        )
        # Update the bot session title and last use time
        bot_session_update_data = dict()
        bot_session_update_data["last_use_time"] = datetime.now(UTC)
        # Replace the title when it is the default title or empty
        if (
            bot_session.title == bot_session.default_bot_session_title
            or not bot_session.title
        ):
            title = " ".join(content.split(" ")[:10])  # noqa: take the first 5 words as the title
            if len(title) > 50:
                title = content[:10]
            bot_session_update_data["title"] = title
        # Cumulative session attachments: merge the newly uploaded ones this
        # turn for full AI use + persistence
        cumulative_attachments = self._merge_session_attachments(
            bot_session, param.attachments
        )
        bot_session_update_data["attachments"] = cumulative_attachments
        await bot_session_dao.update_model(
            self.db, bot_session.id, bot_session_update_data, flush=True, commit=True
        )

        # Call the AI (OSE: executed asynchronously by the ai_worker process
        # via the honker "ai" queue).
        # Deferred import to avoid the circular import of
        # aiexecutor -> honker_db -> mq_server -> event
        from docy.core.aiexecutor import call_lambda

        if bot_session.session_type == SessionType.chat:  # Compatible with the legacy chat
            func_params = {
                "function": bot_session.session_type,
                "user_id": bot_message.user_id,
                "session_id": bot_message.session_id,
                "message_id": bot_message.id,
                "space_id": bot_session.space_id,
                "inputTranscript": content,
            }
        else:
            func_params = {
                "function": bot_session.session_type,
                "run_info": {
                    "session_id": bot_session.id,
                    "agent_id": param.agent_id,
                    "user_id": param.user_id,
                    "space_id": param.space_id,
                    "message_id": bot_message.id,
                    "code": param.code,
                    "query_time": bot_message.query_time.strftime(
                        DATETIME_STANDARD_FORMAT
                    ),
                },
                "inputTranscript": content,
                "template_json": template_json,
                "attachments": cumulative_attachments,
            }
        call_lambda(
            "open-docy-bot:latest",
            func_params=func_params,
            asynchronous=True,
        )

    @staticmethod
    def _merge_session_attachments(
        bot_session, new_attachments: List[BotChatFileSchema]
    ) -> list:
        """
        Merge the newly uploaded attachments this turn into the cumulative
        session list and return [{name, key, uploaded_this_turn}].
        - Historical items have uploaded_this_turn=False
        - Newly uploaded items this turn have uploaded_this_turn=True and are
          deduped by key
        """
        cumulative = []
        seen_keys = set()

        for item in bot_session.attachments or []:
            key = item.get("key") or item.get("file_key") or ""
            if not key or key in seen_keys:
                continue
            seen_keys.add(key)
            cumulative.append(
                {"name": item.get("name", ""), "key": key, "uploaded_this_turn": False}
            )

        for att in new_attachments or []:
            key = getattr(att, "key", None) or getattr(att, "file_key", None)
            if not key or key in seen_keys:
                continue
            seen_keys.add(key)
            cumulative.append(
                {"name": att.name, "key": key, "uploaded_this_turn": True}
            )
        return cumulative

    async def get_messages_by_session_id(self, session_id):
        """
        Get messages by session_id.
        """

        return await bot_message_dao.select_models(
            self.db, self.model.session_id == session_id
        )

    async def on_bot_message_reply(self, param: dict):
        """Handle chat session message replies."""

        from docy.core.sse import sse_manager

        LOG.info(f"on_bot_message_reply coming... {datetime.now()}")
        try:
            if param.get("function") == LambdaFunctionEnum.chat.value:
                status, is_finished = param.get("status"), param.get("is_finished")
                if (
                    status and status == LambdaResponseStatusEnum.completed.value
                ):  # The message is already complete
                    response_message = param.get("outputTranscript")
                    message_id = param.get("message_id")
                    user_id = param.get("user_id")
                    session_id = param.get("session_id")
                    space_id = param.get("space_id")

                    bot_message_cache_key = CommonRedisKey.get_bot_message_content_key(
                        message_id
                    )
                    if not is_finished:  # The message is not finished yet
                        chunks = await get_from_cache(bot_message_cache_key) or []
                        chunks.append(response_message)
                        await save_to_cache(
                            bot_message_cache_key,
                            chunks,
                            ex=CommonRedisKey.bot_message_content_key_expired,
                        )
                        LOG.info(f"message reply success, finished: {is_finished}")
                    else:
                        cache_chunks = (
                            await get_from_cache(bot_message_cache_key) or []
                        )
                        await delete_key_from_cache(bot_message_cache_key)
                        cache_chunks.append(response_message)
                        message_update_schema = {
                            "response": " ".join(
                                [
                                    (
                                        message.decode()
                                        if isinstance(message, bytes)
                                        else message
                                    )
                                    for message in cache_chunks
                                ]
                            ),
                            "bot_org_json": param,
                            "respond_time": (
                                datetime.strptime(
                                    param.get("respond_time"), DATETIME_STANDARD_FORMAT
                                )
                                if param.get("respond_time")
                                else None
                            ),
                            "timespent": param.get("timeSpent"),
                            "query_time": (
                                datetime.strptime(
                                    param.get("query_time"), DATETIME_STANDARD_FORMAT
                                )
                                if param.get("query_time")
                                else None
                            ),
                        }
                        async with get_async_db_connector() as db:
                            update_rows = await bot_message_dao.update_model_by_column(
                                db,
                                message_update_schema,
                                commit=True,
                                id=message_id,
                                session_id=session_id,
                                user_id=user_id,
                            )
                            if update_rows:
                                bot_message = await bot_message_dao.select_model(
                                    db, pk=message_id, load_strategies=["session"]
                                )
                                if bot_message:
                                    # Update the bot_session last use time
                                    if param.get("query_time"):
                                        await bot_session_dao.update_model(
                                            db,
                                            bot_message.session_id,
                                            {
                                                "last_use_time": datetime.strptime(
                                                    param.get("query_time"),
                                                    DATETIME_STANDARD_FORMAT,
                                                )
                                            },
                                            flush=True,
                                            commit=True,
                                        )
                    # Push the message to the frontend via SSE
                    event = EventForm(
                        event_type=SSEEventTypeEnum.bot_message_push,
                        object_id=user_id,
                        object_type=SSEEventTypeEnum.object_user,
                        content=response_message,
                        payload={
                            "message_id": message_id,
                            "user_id": user_id,
                            "session_id": session_id,
                            "space_id": space_id,
                            "is_finished": is_finished,
                        },
                    )
                    await sse_manager.push_message(event)
                    LOG.info(f"on_bot_message_reply: event={event.model_dump_json()}")
                    LOG.info(f"on_bot_message_reply leaving...")
                else:
                    LOG.error(f"message reply error: {param}")
        except Exception as e:
            LOG.error(f"message reply error: {e}")
        finally:
            LOG.info(f"on_bot_message_reply finally...")

    async def get_messages_page_query_set(self, **kwargs):
        kwargs = await bot_message_dao.attach_sort_columns_orders_info(
            self.model, kwargs
        )

        return await bot_message_dao.get_query_set(
            **{k: v for k, v in kwargs.items() if v is not None}
        )

    @staticmethod
    async def on_chat_message_reply(param: dict):
        """
        Handle workflow chat message replies.
        example:
        {
          "data": {
            "run_info": { ... },
            "timestamp": "2026-08-14T10:24:35.912722+00:00",
            "kind": "text",                  // or "thinking" or "tool"
            "outputTranscript": "Let me take a look at the current document",   // incremental chunk, joined by the frontend
            "is_finished": false,
            "tool": { ... }                  // carried when kind == "tool"
          }
        }
        """
        from docy.core.sse import sse_manager

        LOG.info(f"on_chat_message_reply: {datetime.now(UTC)}")

        try:
            is_finished = param.get("is_finished", False)
            response_message = param.get("outputTranscript")
            run_info = param.get("run_info", {})
            kind = param.get("kind", BotMessageKindEnum.text.value)
            response_time = param.get("timestamp", "")

            user_id = run_info.get("user_id", "")
            session_id = run_info.get("session_id", "")
            space_id = run_info.get("space_id", "")
            query_time = run_info.get("query_time", "")
            message_id = run_info.get("message_id", "")

            # One cache LIST per message_id; each element is a structured chunk
            # whose type is stored with the data
            cache_key = CommonRedisKey.get_bot_message_content_key(
                f"{message_id}:chunks"
            )

            # 1) Write each chunk to the cache in structured form first
            if response_message is not None or kind == BotMessageKindEnum.tool.value:
                chunk = {
                    "kind": kind,
                    "content": response_message,
                    "extra": (
                        param.get("tool")
                        if kind == BotMessageKindEnum.tool.value
                        else None
                    ),
                    "timestamp": response_time,
                }
                chunks = await get_from_cache(cache_key) or []
                chunks.append(chunk)
                await save_to_cache(
                    cache_key,
                    chunks,
                    ex=CommonRedisKey.bot_message_content_key_expired,
                )

            # 2) Push the message to the frontend via SSE (tool events carry
            # the tool data as well)
            event = EventForm(
                event_type=SSEEventTypeEnum.workflow_chat_message,
                object_id=user_id,
                object_type=SSEEventTypeEnum.object_user,
                content=response_message,
                payload={
                    "message_id": message_id,
                    "user_id": user_id,
                    "session_id": session_id,
                    "space_id": space_id,
                    "is_finished": is_finished,
                    "type": SSEEventTypeEnum.workflow_chat_message,
                    "kind": kind,  # Message kind
                    "extra": (
                        param.get("tool", {})
                        if kind == BotMessageKindEnum.tool.value
                        else {}
                    ),
                },
            )
            await sse_manager.push_message(event)
            LOG.info(f"on_chat_message_reply: event={event.model_dump_json()}")

            # 3) Once finished, read all chunks back from the cache and write
            # them to the table grouped by kind
            if is_finished:
                await BotMessageManager._flush_message_log(
                    cache_key,
                    user_id,
                    session_id,
                    space_id,
                    message_id,
                    query_time,
                    response_time,
                )

            LOG.info(f"on_chat_message_reply leaving... finished: {is_finished}")
        except Exception as e:
            LOG.error(f"on_chat_message_reply error: {e}")
        finally:
            LOG.info(f"on_chat_message_reply finally...")

    @staticmethod
    async def _flush_message_log(
        cache_key: str,
        user_id: str,
        session_id: str,
        space_id: str,
        message_id: str,
        query_time: str,
        fallback_time: str,
    ):
        """
        Read all chunks back from the cache, segment them by "merging
        consecutive same-kind chunks, keeping each tool separate", and write
        them to bot_message_log.

        - kind=tool: one record per tool, never merged with other chunks
        - kind=text/thinking: consecutive same-kind chunks are merged into one
          record; interrupted when a tool or other kind appears
        """
        chunks = await get_from_cache(cache_key) or []

        # Segmentation: each tool becomes its own segment; the rest are merged
        # by consecutive same kind
        segments = []  # [{kind, texts, last_time, extra}]
        for item in chunks:
            k = item.get("kind", BotMessageKindEnum.text.value)
            content = item.get("content")
            last_time = item.get("timestamp") or fallback_time
            extra = item.get("extra")  # For kind=tool this is the tool data {"name", "detail"}

            if k == BotMessageKindEnum.tool.value:
                # One record per tool, carrying its tool data
                segments.append(
                    {
                        "kind": k,
                        "texts": [content] if content is not None else [],
                        "last_time": last_time,
                        "extra": extra,
                    }
                )
                continue

            if segments and segments[-1]["kind"] == k:
                # Merge consecutive same-kind chunks (text/thinking) into one
                # record
                seg = segments[-1]
                if content is not None:
                    seg["texts"].append(content)
                seg["last_time"] = last_time
            else:
                segments.append(
                    {
                        "kind": k,
                        "texts": [content] if content is not None else [],
                        "last_time": last_time,
                        "extra": extra,
                    }
                )

        LOG.info(
            f"_flush_message_log message_id={message_id} "
            f"segments=[{','.join(seg['kind'] for seg in segments)}]"
        )

        for seg in segments:
            k = seg["kind"]
            texts = seg["texts"]
            if not texts:
                if k != BotMessageKindEnum.tool.value:
                    continue  # Skip empty non-tool segments; no empty rows are written
                response = ""  # Tool rows are written even without text, as a marker of the tool call
            else:
                response = " ".join(texts)

            # Only tool segments carry extra (tool data); other segments stay
            # empty
            extra = seg.get("extra", {})

            message_log_schema = BotMessageLogCreateSchema(
                user_id=user_id,
                space_id=space_id,
                respond_time=(
                    datetime.fromisoformat(seg["last_time"])
                    if seg["last_time"]
                    else None
                ),
                message_id=message_id,
                session_id=session_id,
                kind=k,
                response=response,
                extra=extra,
            )
            async with get_async_db_connector() as db:
                await bot_message_log_dao.create_model(
                    db,
                    message_log_schema,
                    flush=True,
                    commit=True,
                )

        # Clear the buffer and update the bot_session last_use_time (only once)
        await delete_key_from_cache(cache_key)
        if query_time:
            async with get_async_db_connector() as db:
                bot_message = await bot_message_dao.select_model(
                    db, pk=message_id, load_strategies=["session"]
                )
                if bot_message:
                    await bot_session_dao.update_model(
                        db,
                        bot_message.session_id,
                        {
                            "last_use_time": datetime.strptime(
                                str(query_time), DATETIME_STANDARD_FORMAT
                            )
                        },
                        flush=True,
                        commit=True,
                    )

    @staticmethod
    async def on_chat_message_reply_error(param: dict):
        """
        Handle chat message reply errors.
        """
        from docy.core.sse import sse_manager

        LOG.info(f"on_chat_message_reply_error: {datetime.now(UTC)}")

        run_info = param.get("run_info", {})
        response_time = param.get("timestamp", "")
        error_message = param.get("error", "")

        user_id = run_info.get("user_id", "")
        session_id = run_info.get("session_id", "")
        space_id = run_info.get("space_id", "")
        message_id = run_info.get("message_id", "")

        if user_id:
            # Push the message to the frontend via SSE
            event = EventForm(
                event_type=SSEEventTypeEnum.workflow_chat_message,
                object_id=user_id,
                object_type=SSEEventTypeEnum.object_user,
                content=error_message,
                payload={
                    "message_id": message_id,
                    "user_id": user_id,
                    "session_id": session_id,
                    "space_id": space_id,
                    "type": SSEEventTypeEnum.workflow_chat_message_error,
                    "response_time": response_time,
                    "kind": BotMessageKindEnum.error.value,  # Message kind
                },
            )
            await sse_manager.push_message(event)
            LOG.info(f"on_chat_message_reply_error: event={event.model_dump_json()}")
            LOG.info("on_chat_message_reply_error leaving... finished.")
        else:
            LOG.error(f"on_chat_message_reply_error error: {run_info}")

    @staticmethod
    async def on_chat_message_reply_update(param: dict):
        """
        Handle chat message updates.
        """
        from docy.core.sse import sse_manager

        LOG.info(f"on_chat_message_reply_update: {datetime.now(UTC)}")

        run_info = param.get("run_info", {})
        response_time = param.get("timestamp", "")

        user_id = run_info.get("user_id", "")
        session_id = run_info.get("session_id", "")
        space_id = run_info.get("space_id", "")
        message_id = run_info.get("message_id", "")

        if user_id:
            # Push the message to the frontend via SSE
            event = EventForm(
                event_type=SSEEventTypeEnum.workflow_chat_message,
                object_id=user_id,
                object_type=SSEEventTypeEnum.object_user,
                content="",
                payload={
                    "message_id": message_id,
                    "user_id": user_id,
                    "session_id": session_id,
                    "space_id": space_id,
                    "type": SSEEventTypeEnum.workflow_chat_agent_updated,
                    "response_time": response_time,
                    "kind": "workflow",  # Message kind
                },
            )
            await sse_manager.push_message(event)
            LOG.info(
                f"on_chat_message_reply_update: event={event.model_dump_json()}"
            )
            LOG.info("on_chat_message_reply_update leaving... finished.")
        else:
            LOG.error(f"on_chat_message_reply_update error: {run_info}")

    async def handle_chat_message_reply(self, event: MqEventTypeEnum, params: dict):
        """
        Session message replies.
        """

        if event == MqEventTypeEnum.message_reply.value:
            await self.on_chat_message_reply(params)
        if event == MqEventTypeEnum.message_error.value:
            await self.on_chat_message_reply_error(params)
        if event == MqEventTypeEnum.agent_updated.value:
            await self.on_chat_message_reply_update(params)
