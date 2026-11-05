# -*- coding: utf-8 -*-
# @Time    : 2025/6/10 15:35
# @Author  : yanjia
# @File    : workspace.py
# @Desc    : workspace
from typing import Optional

from fastapi import APIRouter, Depends, Request, BackgroundTasks, Query, Body, Path

from sqlalchemy.ext.asyncio import AsyncSession
from loguru import logger

from docy.database import api_async_db
import docy.core.pagination as P
from docy.common.pagination import DependsPagination, PageData, paging_data
from docy.common.response.response_schema import ResponseModel, ResponseSchemaModel, response_base as R
from docy.exceptions import exception as E
from docy.forms.workspace import (
    CreateWorkspaceForm,
    UpdateWorkspaceForm,
    SendInviteEmailPostForm,
    UpdateMemberRoleInfo,
)
from docy.schema.workspace import (
    WorkspaceCreateSchema,
    WorkspaceDetailSchema,
)
from docy.utils import inner_request
from docy.schema.member import WorkspaceMemberListSchema, MemberListDetailSchema
from docy.schema.workspace import WorkspaceListSchema
from docy.models.tb_workspace import WorkspaceType, InviteAction, MemberType, FrontInviteAction, BudgetType
from docy.services.workspace import (
    WorkspaceManager,
    MemberManager,
)
from docy.services.auth.utils.dependencies import oauth2_scheme
from docy.services.audit.helper import audit
from docy.schema.audit import ResourceType, Action, Outcome

router = APIRouter(tags=["Workspace"], prefix="/space")


@router.get("/")
async def get_workspace_list(
    request: Request,
    user_id: str | None = Query(None, description="user_id"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get the user's workspace list."""

    # Get the requesting user id here
    if not user_id:
        user_id = request.user.id if request.user else None

    if not user_id:
        logger.error(f"get_workspace_list error: required user_id is missing '{user_id}'")
        raise E.RequestError

    data = await MemberManager(db, request=request).get_workspace_by_user_id(user_id)

    return R.format(data=data)

@router.get("/owned-space")
async def get_owned_workspace_list(
    request: Request,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get the list of workspaces the user belongs to."""

    user_id = request.user.id if request.user else None

    if not user_id:
        logger.error(f"get_owned_workspace_list error: required user_id is missing '{user_id}'")
        raise E.RequestError

    data = await WorkspaceManager(db, request=request).get_workspace_lists_by_user(user_id)

    return R.format(data=WorkspaceListSchema(many=True).dump(data))


@router.get("/{space_id}")
async def get_workspace(
    request: Request,
    space_id: str,
    user_id: Optional[str] = Query(None, description=""),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    if not user_id:
        user_id = request.user.id

    """Get workspace detail."""
    workspace = await WorkspaceManager(db, request=request).get_workspace_detail(space_id)
    if not workspace:
        raise E.ObjectNotFound

    # Attach member role info
    role_info = await MemberManager(db, request=request).get_member_role_by_user(space_id, user_id)
    if role_info:
        for k, v in role_info.items():
            setattr(workspace, k, v)
    workspace_serialize = WorkspaceDetailSchema().dump(workspace)
    return R.format(data=workspace_serialize)


@router.put("/{space_id}")
async def update_workspace(
    request: Request,
    space_id: str,
    _form: UpdateWorkspaceForm,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Update a workspace."""

    up_workspace = await WorkspaceManager(db, request=request).update_workspace(
        space_id, **_form.model_dump()
    )

    workspace_serialize = WorkspaceDetailSchema().dump(up_workspace)
    return R.format(data=workspace_serialize)


@router.post("/add")
async def post_workspace(
    space: CreateWorkspaceForm,
    request: Request,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Create a workspace."""
    workspace = await WorkspaceManager(db=db, request=request).create_workspace(space)

    workspace_serialize = WorkspaceCreateSchema().dump(workspace)
    return R.format(data=workspace_serialize)


@router.delete("/{space_id}")
async def delete_workspace(
    space_id: str,
    request: Request,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Delete a workspace."""
    delete_rows = await WorkspaceManager(db, request=request).delete_workspace(space_id)

    return R.format(data={"delete_rows": delete_rows})


@router.get("/member/list", summary="Get the team space member list", dependencies=[DependsPagination])
async def get_members(
    space_id: str = Query(..., description="Team space ID"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
) -> ResponseSchemaModel[PageData[MemberListDetailSchema]]:
    """Get workspace member list</br>
    Supports pagination:</br>
    """

    member_select = await MemberManager.get_member_queryset(workspace_id=space_id)
    page_data = await paging_data(db, member_select)

    return R.success(data=page_data)


@router.put("/member/{member_id}/update", description="Update member role info")
async def update_member(
        request: Request,
        member_id: str,
        form_data: UpdateMemberRoleInfo,
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    member_manager = MemberManager(db, request=request)
    member = await member_manager.get_workspace_member_by_id(member_id)
    space_id = member.workspace_id if member and hasattr(member, "workspace_id") else ""
    update_rows = await member_manager.update_member_role_info(member_id, form_data)

    # Audit record: space member role change; payload contains member_id and role_id
    await audit(request, db).write_quick(
        chain_id=(
            f"{space_id}--{ResourceType.SPACE.value}"
            if space_id
            else ResourceType.SPACE.value
        ),
        resource_type=ResourceType.SPACE,
        resource_id=member_id,
        action=Action.UPDATE,
        outcome=Outcome.SUCCESS,
        request_id=request.headers.get("X-Request-Id"),
        payload={
            "member_id": member_id,
            "role_id": form_data.role_id if form_data else None,
            "updated_fields": ["role_id"],
        },
    )

    return R.format(data={"update_rows": update_rows})


@router.get("/member/leave/{space_id}")
async def leave_teamspace(
    space_id: str,
    request: Request,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Leave the team."""

    teamspace = await WorkspaceManager(db, request=request).get_workspace_by_id(space_id)
    if teamspace.user_id == request.user.id:
        raise E.RequestError("Only team members can operate.")

    await MemberManager(
        db, request=request, bg_task=background_tasks
    ).leave_teamspace(space_id, request.user.id if request.user else None)

    return R.format()


@router.delete("/member/{_id}")
async def remove_member(
    _id: str,
    request: Request,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Remove a member record from the workspace."""
    member_manager = MemberManager(db, request=request, bg_task=background_tasks)

    member = await member_manager.get_workspace_member_by_id(_id)
    space_id = member.workspace_id if member and hasattr(member, "workspace_id") else ""
    await member_manager.delete_workspace_member_by_id(_id)

    # Audit record: workspace member removal
    await audit(request, db).write_quick(
        chain_id=(
            f"{space_id}--{ResourceType.SPACE.value}"
            if space_id
            else ResourceType.SPACE.value
        ),
        resource_type=ResourceType.SPACE,
        resource_id=_id,
        action=Action.DELETE,
        outcome=Outcome.SUCCESS,
        payload={
            "name": member.name if member and hasattr(member, "name") else "",
            "action": "remove_member",
        },
    )

    return R.format()
