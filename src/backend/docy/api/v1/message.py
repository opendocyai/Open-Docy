# -*- coding: utf-8 -*-
# @Time    : 2025/7/22 13:48
# @Author  : yanjia
# @File    : message.py
# @Desc    : internal messages

from typing import Optional

from loguru import logger
from fastapi import (
    APIRouter,
    Depends,
    Request,
    BackgroundTasks,
    Query,
    UploadFile,
    Body,
)
from sqlalchemy.ext.asyncio import AsyncSession

from docy.services.auth.utils.dependencies import oauth2_scheme
from docy.core._response import pre_response as R
from docy.core import pagination as P
from docy.database import api_async_db
from docy.exceptions import exception as E
from docy.forms.message import (
    InnerMessageCreateForm,
    InnerMessageDeleteManyForm,
    InnerMessageAllReadForm
)
from docy.schema.message import InnerMessageSchema
from docy.services.message.manager import InnerMessageManager
from docy.utils.enums import InnerMessageStatusEnum

router = APIRouter(tags=["Inner Message"], prefix="/inner/message")

@router.get("/list")
async def get_inner_message_list(
        request: Request,
        space_id: str = Query(..., min_length=1),
        user_id: str = Query(None),
        email: str = Query(None),
        token: str = Depends(oauth2_scheme),
        commons: P.CommonParams = Depends(P.CommonParams),
        db: AsyncSession = Depends(api_async_db),
):
    request_user = request.user if request else None
    if not user_id:
        user_id = request_user.id if request_user else None
    if not email:
        email = request_user.email if request_user else None

    query_set = await InnerMessageManager(
        db, request=request
    ).get_inner_messages_page_query_set(
        space_id=space_id,
        order_by_list=commons.order_by,
        __or__={
            "receive_user_id": user_id,
            "receive_user_email": email,
        }
    )
    # Fetch data with pagination
    pagination = P.AsyncPagination(
        db, query_set, page=commons.page, page_size=commons.page_size
    )
    serialize_data = InnerMessageSchema().dump(await pagination.get_result(), many=True)

    return R.format(data=await pagination.get_paginated_data(serialize_data))


@router.post("/push")
async def create_inner_message(
        request: Request,
        background_tasks: BackgroundTasks,
        params: InnerMessageCreateForm = Body(...),
        db: AsyncSession = Depends(api_async_db),
):
    """Send an internal message</br>"""

    global_message = params.broadcast if params.broadcast else False

    inner_message = await InnerMessageManager(
        db=db,
        bg_task=background_tasks,
        request=request,
    ).create_inner_message(params, global_message)

    return R.format(data={"id": inner_message.id if inner_message else ""})


@router.get("/{message_id}")
async def get_inner_message_detail(
        message_id: str,
        request: Request,
        background_tasks: BackgroundTasks,
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Get detail info by id."""
    manager = InnerMessageManager(
        db, bg_task=background_tasks, request=request
    )
    await manager.check_object_owner_permission('message', message_id, owner_field='receive_user_id')
    inner_message = await manager.get_inner_message_by_id(message_id)

    return R.format(data=InnerMessageSchema().dump(inner_message))


@router.put("/{message_id}")
async def update_inner_message(
        request: Request,
        message_id: str,
        action: InnerMessageStatusEnum,
        background_tasks: BackgroundTasks,
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Update/handle the internal message."""
    manager = InnerMessageManager(
        db, bg_task=background_tasks, request=request
    )
    await manager.check_object_owner_permission('message', message_id, owner_field='receive_user_id')
    update_rows = await manager.update_inner_message(message_id, action)

    return R.format({"update_rows": update_rows})


@router.delete("/{inner_message_id}")
async def delete_inner_message(
        inner_message_id: str,
        request: Request,
        background_tasks: BackgroundTasks,
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Delete a session <br>"""

    manager = InnerMessageManager(
        db,
        bg_task=background_tasks,
        request=request
    )
    await manager.check_object_owner_permission('message', inner_message_id, owner_field='receive_user_id')
    delete_rows = await manager.delete_inner_message([inner_message_id])

    return R.format(data={"delete_rows": delete_rows})


@router.delete("/batch_delete")
async def batch_delete_session(
        request: Request,
        _form: InnerMessageDeleteManyForm,
        background_tasks: BackgroundTasks,
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Batch delete sessions <br>"""

    delete_rows = await InnerMessageManager(
        db,
        request=request).delete_inner_message(_form.inner_message_ids)

    return R.format(data={"delete_rows": delete_rows})


@router.post("/set_all_read")
async def batch_read_message(
        request: Request,
        _form: InnerMessageAllReadForm,
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Mark all as read in one click</br>"""

    if not _form.user_id:
        _form.user_id = request.user.id
    if not _form.email:
        _form.email = request.user.email
    update_rows = await InnerMessageManager(db, request=request).set_all_read_message(
        _form.space_id, _form.user_id, _form.email)

    return R.format(data={"update_rows": update_rows})

@router.get("/clear")
async def clear_current_message(
    request: Request,
    db: AsyncSession = Depends(api_async_db),
):
    """Clear current internal messages</br>"""
    pass

@router.get("/count/unread", summary="Get unread message count")
async def get_message_unread_count(
        request: Request,
        space_id: str = Query(..., description="Workspace space ID"),
        user_id: Optional[str] = Query(None, description="User ID"),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """**Get unread message count** <br>"""
    if not user_id:
        user_id = request.user.id if request.user else None
    unread_count = await InnerMessageManager(db=db, request=request).get_message_unread_count(user_id=user_id, space_id=space_id)

    return R.format(data={"unread_count": unread_count})