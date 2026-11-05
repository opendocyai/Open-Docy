# -*- coding: utf-8 -*-
from typing import Optional

from fastapi import (
    APIRouter,
    Body,
    BackgroundTasks,
    Depends,
    Query,
    Request,
)
from sqlalchemy.ext.asyncio import AsyncSession

from loguru import logger

from docy.common.pagination import DependsPagination, PageData, paging_data
from docy.common.response.response_schema import ResponseModel, ResponseSchemaModel
from docy.core._response import pre_response as R
from docy.crud import bot_message_log_dao
from docy.database import api_async_db
from docy.forms.bot import (
    BotMessageCreateForm,
    BotSessionCreateForm,
    BotSessionCreateModel,
    BotSessionDeleteManyForm,
    BotSessionUpdateForm,
)
from docy.schema.bot import (
    BotMessageLogResponseSchema,
    BotSessionResponseSchema,
    BotSessionSchema,
)
from docy.services.auth.utils.dependencies import oauth2_scheme
from docy.services.bot import BotMessageManager, BotSessionManager

router = APIRouter(tags=["Bot"], prefix="/bot")
LOG = logger.bind(category="bot")


@router.get("/session")
async def get_user_session(
    request: Request,
    space_id: str = Query(..., description="Workspace ID"),
    agent_id: Optional[str] = Query(None, description="agent id"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get the user's latest bot session."""

    user_bot_session_list = await BotSessionManager(
        db, request=request
    ).get_latest_session_by_user_id(request.user.id, space_id, agent_id)
    if not user_bot_session_list:
        return R.format()
    else:
        bot_session_serialize = BotSessionSchema().dump(user_bot_session_list[0])
        return R.format(data=bot_session_serialize)


@router.get("/session/list")
async def get_session_list(
    request: Request,
    user_id: str = Query(None, description="User ID"),
    space_id: str = Query(..., description="Workspace ID", min_length=1),
    agent_id: Optional[str] = Query(None, description="agent id"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get session list <br>"""
    if not user_id:
        user_id = request.user.id

    boot_session_list = await BotSessionManager(db, request=request).get_session_list(
        user_id, space_id=space_id, agent_id=agent_id
    )

    return R.format(data=boot_session_list)


@router.post("/session/create")
async def create_session(
    request: Request,
    background_tasks: BackgroundTasks,
    _form: BotSessionCreateForm = Body(..., description="Session creation parameters"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
) -> ResponseSchemaModel[BotSessionResponseSchema]:
    """Create a session <br>"""
    if not _form.user_id:
        _form.user_id = request.user.id

    boot_session = await BotSessionManager(
        db, bg_task=background_tasks, request=request
    ).create_session(
        BotSessionCreateModel(
            title=_form.title,
            session=token,
            space_id=_form.space_id,
            user_id=_form.user_id,
            session_type=_form.session_type,
            agent_id=_form.agent_id,
        )
    )

    return R.format(
        data={
            "session": boot_session.id,
            "title": boot_session.title,
            "session_type": boot_session.session_type,
            "agent_id": boot_session.agent_id,
        }
    )


@router.delete("/session/batch_delete")
async def batch_delete_session(
    request: Request,
    _form: BotSessionDeleteManyForm,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Batch delete sessions <br>"""

    delete_rows = await BotSessionManager(db, request=request).delete_session(
        _form.bot_session_ids
    )

    return R.format(data={"delete_rows": delete_rows})


@router.get("/session/{session_id}")
async def get_session(
    session_id: str,
    request: Request,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get a session by session_id <br>"""

    boot_session = await BotSessionManager(
        db, bg_task=background_tasks, request=request
    ).get_session_by_id(session_id)

    return R.format(data=BotSessionSchema().dump(boot_session))


@router.delete("/session/{session_id}")
async def delete_session(
    session_id: str,
    request: Request,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Delete a session <br>"""

    delete_rows = await BotSessionManager(
        db, bg_task=background_tasks, request=request
    ).delete_session([session_id])

    return R.format(data={"delete_rows": delete_rows})


@router.put("/session/{session_id}")
async def update_session(
    request: Request,
    background_tasks: BackgroundTasks,
    session_id: str,
    _form: BotSessionUpdateForm,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Update a session <br>"""

    update_rows = await BotSessionManager(
        db, bg_task=background_tasks, request=request
    ).update_session(session_id, _form)

    return R.format(data={"update_rows": update_rows})


@router.post("/message/send")
async def create_message(
    request: Request,
    _form: BotMessageCreateForm = Body(..., description="Message body"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
) -> ResponseModel:
    """Send a message <br>"""

    LOG.info(f"on chat message: {_form.model_dump()}")
    if not _form.user_id:
        _form.user_id = request.user.id

    await BotMessageManager(db, request=request).create_message(_form)

    return R.format()


@router.get("/messages", summary="Get message list", dependencies=[DependsPagination])
async def get_messages_list(
    request: Request,
    session_id: str = Query(..., description="session_id"),
    db: AsyncSession = Depends(api_async_db),
) -> ResponseSchemaModel[PageData[BotMessageLogResponseSchema]]:
    """Get message list."""
    query_set = await BotMessageManager(
        db, request=request
    ).get_messages_page_query_set(
        session_id=session_id,
        order_by_list=[("query_time", "desc")],
    )
    page_data = await paging_data(db, query_set)
    # Write message_log
    if page_data["results"]:
        message_ids = [item.id for item in page_data["results"]]
        message_log_dict = await bot_message_log_dao.get_message_log_dict(
            db, message_ids
        )
        for item in page_data["results"]:
            item.results = message_log_dict.get(item.id, [])

    return R.format(data=page_data)
