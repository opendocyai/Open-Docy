from datetime import datetime
from loguru import logger

from docy.database import api_async_db, api_sync_db, get_async_db_connector, get_sync_db_connector
from docy.tasks import example_task

import typing
from typing import Optional
from fastapi import (
    APIRouter,
    Depends,
    Body,
    Request,
    BackgroundTasks,
    Path,
    Query,
    Response,
    File,  # temporary: package/import test endpoint
    Form,  # temporary: package/import test endpoint
    UploadFile,  # temporary: package/import test endpoint
)

from sqlmodel import select
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession

from docy.core._response import pre_response as R
from docy.core._string import split_comma_values
from docy.models.tb_workspace import WorkspaceType
from docy.crud.decorator import require_perm
from docy.services.agent.manager import AgentManager # TODO
from docy.models.tb_agent import Agent, AgentStatus # MarketplaceAgentActionType, AgentVersion
from docy.forms.agent import (
    AgentCreateForm,
    AgentUpdateForm,
    AgentMarketForm,
    DATAEXTRACTORForm,
    EXTRACTORInputForm,
)  # TODO
from docy.schema import agent as agent_schema # TODO
from docy.utils.sql_query import async_list_objects
from docy.database import api_async_db, api_sync_db
from docy.core.pagination import CommonParams, Pagination
from docy import const
from docy.exceptions import exception as PE
from docy.services.workspace.manager import WorkspaceManager
from docy.services.auth.utils.dependencies import oauth2_scheme


router = APIRouter(tags=["agent"], prefix="/agent")


@router.post("/pre/add")
async def pre_add(
    request: Request,
    response: Response,
    agent: AgentCreateForm,
    opera_by: int = Body(default=1, description="Operator ID"),
    db: AsyncSession = Depends(api_async_db),
    token: str = Depends(oauth2_scheme),
):
    manager = AgentManager(db=db, request=request)
    if not await manager.check_exist_agent_counts(agent.space_id):
        return R.format(
            data={
                "title": "Agent Limit Reached",
                "message": "Upgrade to the Plus plan for unlimited agents.",
            },
            code=100002,
        )
    create_from_agent = True if agent.agent_id else False
    try:
        code, agent_dict = await manager.pre_add_or_update_agent(
            agent,
            create_from_agent=create_from_agent,
            return_whith_invalid_opt_token=True,
            opera_by=opera_by,
        )
    except PE.AgentLockedException as e:
        return R.format(e.meta, code=200000, msg=e.detail)
    return R.format({"code": code, "agent": agent_dict})


@router.post("/pre/update")
async def pre_update(
    request: Request,
    agent: AgentUpdateForm,
    code: Optional[str] = Body(
        None,
        description="The existing code for this operation; if not provided, this is a new operation and a code will be created",
    ),
    save_as_draft: bool = Body(default=True, description="Save the agent as draft"),
    opera_by: int = Body(default=1, description="Operator ID"),
    db: AsyncSession = Depends(api_async_db),
    token: str = Depends(oauth2_scheme),
):
    manager = AgentManager(db=db, request=request)
    await manager.can_edit(agent.agent_id, code)
    try:
        code, agent_dict = await manager.pre_add_or_update_agent(
            agent, code, save_as_draft, return_whith_invalid_opt_token=True, opera_by=opera_by
        )
    except PE.InvalidOperationCode:
        return R.format(
            {
                "message": "Historical operations have expired.",
                "error_code": "history_operation_expired",
            }
        )
    except PE.AgentLockedException as e:
        return R.format(e.meta, code=200000, msg=e.detail)
    return R.format({"code": code, "agent": agent_dict})


@router.post("/pre/run")
async def pre_run(
    request: Request,
    background_tasks: BackgroundTasks,
    code: Optional[str] = Body(
        None,
        description="The existing code for this operation; if not provided, this is a new operation and a code will be created",
        embed=True,
    ),
    run_node_name: str = Body(description=""),
    db: AsyncSession = Depends(api_async_db),
    token: str = Depends(oauth2_scheme),
):
    """Temporarily run a node after adding it, before the agent is created."""
    # First create a temporary task
    manager = AgentManager(db=db, bg_task=background_tasks, request=request)
    try:
        data = await manager.per_run_agent(code, run_node_name)
        if "task_id" not in data:
            return data
    except PE.InvalidOperationCode:
        return R.format(
            {
                "message": "Historical operations have expired.",
                "error_code": "history_operation_expired",
            }
        )
    return R.format(data)


@router.get("/pre/run/state")
async def get_run_state(
    request: Request,
    token: str = Depends(oauth2_scheme),
):
    """Query the current temporary run results."""
    return R.format()


@router.post("/pre/data-extractor/control")
async def data_extractor_control(
    request: Request,
    code: str,
    extractor: Optional[DATAEXTRACTORForm] = None,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Call AI to analyze the interface files."""
    notice_enough_coin = (
        True if request.scope["auth_type"] == const.AT_BEARER_TOKEN else False
    )
    manager = AgentManager(
        request=request,
        db=db,
    )
    task_info = await manager.data_extractor_control(
        code, extractor, notice_enough_coin=notice_enough_coin
    )
    if "run_id" not in task_info:
        return task_info
    return R.format(task_info)


@router.get("/pre/code/{code_str}/data-extractor/addition")
async def get_addition_data(
    request: Request,
    code_str: str,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get additional node info by code during data extraction."""
    manager = AgentManager(
        request=request,
        db=db,
    )
    data = await manager.get_addition_data(code_str)
    data = manager.format_addition_before_return(data)
    return R.format(data)


@router.get("/node-class/finder")
async def find_node_class(
    request: Request,
    target_class: typing.List[const.NodeEnum] = Body(description="The label of the node to find"),
    code: str = Body(default=None, description="Temporary code stored in redis"),
    json_str: str = Body(
        default=None, description="Find nodes of the given type directly via a JSON string"
    ),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Find nodes of a given type by code or JSON."""
    manager = AgentManager(request=request, db=db)
    data = await manager.find_node_by_class(target_class, code, json_str)
    return R.format(data)


@router.delete("/pre/code/{code_str}/delete-data-extractor")
async def delete_data_extractor(
    request: Request,
    code_str: str,
    node_ids: list[str] = Query(...),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Clear the cache while the user edits the agent."""
    manager = AgentManager(
        request=request,
        db=db,
    )
    data = await manager.delete_extractor_cache(code_str, node_ids)
    return R.format(data)


@router.post("/pre/data-extractor/manual-input/set")
async def set_manual_input(
    request: Request,
    input_param: EXTRACTORInputForm = Body(description="Fields manually selected by the user"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Save the manually selected results set on the UI."""
    manager = AgentManager(
        request=request,
        db=db,
    )
    await manager.set_manual_input(input_param)
    return R.format()


@router.get("/code/{code_str}/template")
async def get_template_by_code(
    request: Request,
    code_str: str = Path(description="code"),
    db: AsyncSession = Depends(api_async_db),
    token: str = Depends(oauth2_scheme),
):
    """Get the saved agent info by code, mainly the JSON config template."""
    manager = AgentManager(
        request=request,
        db=db,
    )
    try:
        data = await manager.get_template_by_code(code_str)
    except PE.InvalidOperationCode:
        return R.format(
            {
                "message": "Historical operations have expired.",
                "error_code": "history_operation_expired",
            }
        )
    return R.format(data)


@router.post("/find-nearby-nodes")
async def find_nearby_nodes(
    request: Request,
    step: Optional[int] = Body(
        1, description="Search step size, default 1, i.e. the direct predecessors of the current node"
    ),
    code: Optional[str] = Body(None, description="The code in the agent operation"),
    agent_json: Optional[dict] = Body(None, description="The JSON in which to find nearby nodes"),
    token: str = Depends(oauth2_scheme),
):
    """Find the set of predecessor nodes within step n in the JSON nodes."""
    manager = AgentManager(
        request=request,
    )
    data = await manager.find_nearby_nodes(code, agent_json, step)
    return R.format(data)


@router.post("/lock/find-nodes")
async def find_locked_nodes(
    request: Request,
    locked: bool = Body(
        description="When locking, find all nodes to lock (locked=true); when unlocking, find all nodes to unlock (locked=false)"
    ),
    target_node_id: str = Body(description="The node ID to lock/unlock"),
    code: Optional[str] = Body(None, description="The code in the agent operation"),
    agent_json: Optional[dict] = Body(None, description="The JSON in which to find nearby nodes"),
    token: str = Depends(oauth2_scheme),
):
    """When the user clicks a node on the UI, also find all nodes that need to be locked/unlocked."""
    manager = AgentManager(
        request=request,
    )
    data = await manager.find_locked_nodes(target_node_id, code, agent_json, locked)
    return R.format(data)


@router.get("/find/neighboring/node")
async def find_neighboring_node(
    request: Request,
    label: Optional[str] = Body(
        default=None, description="Used for filtering, e.g. pass the label of the InputFile component to find only InputFile components"
    ),
    direction: int = Body(description="0 = find predecessor nodes, 1 = find successor nodes"),
    target_node_id: str = Body(description="The node ID to lock/unlock"),
    code: Optional[str] = Body(None, description="The code in the agent operation"),
    agent_json: Optional[dict] = Body(None, description="The JSON in which to find nearby nodes"),
    token: str = Depends(oauth2_scheme),
):
    """Find the predecessor or successor nodes of the given node."""
    manager = AgentManager(
        request=request,
    )
    data = await manager.get_neighboring_node(
        code, agent_json, target_node_id, direction, label
    )
    return R.format(data)


@router.post("/task/run/cancel")
async def cancel_task(
    request: Request,
    task_id: str = Body(description="The task_id to cancel"),
    run_id: str = Body(description="The run id to cancel"),
    db: AsyncSession = Depends(api_async_db),
    token: str = Depends(oauth2_scheme),
):
    """Cancel the current debug run of a task by task_id and run_id."""
    # Check whether the task exists
    manager = AgentManager(db=db, request=request)
    await manager.check_object_permission("ttask", task_id)
    await manager.cancel_task(task_id, run_id)
    return R.format()


@router.post("/add-or-update")
async def add_or_update_agent(
    request: Request,
    agent_id: Optional[str] = Body(
        None,
        description="Agent id (optional); not needed when saving a new agent, required when editing and saving an existing agent",
    ),
    code: Optional[str] = Body(
        None, description="A code generated after the user finishes editing; the agent can be found by this code"
    ),
    agent: Optional[AgentUpdateForm] = Body(
        None,
        description="Either code or agent; code takes priority. The agent config saved in the cache can be found by code; if no code is passed, creation or update parameters must be provided",
    ),
    preview_image: str | None = Body(None, description="Key of the preview image generated for the agent"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """The agent is actually created only when all nodes have been added and debugged
    and the user clicks the publish button in the top-right corner of the UI;
    likewise, modifying an existing agent takes effect only when publish is clicked.
    # todo: need to verify the user's current permissions
    """
    manager = AgentManager(db=db, request=request)
    # Check the agent before actually saving it
    agent = await manager.final_save_agent(
        agent_id,
        code,
        agent,
        preview_image,
        validate_custom_node_secrets=True,
    )
    # Release the lock after success
    if agent_id:
        await manager.release_agent(agent_id)
    return R.format(agent)


@router.post("/draft/save")
async def draft_save_agent(
    request: Request,
    code: Optional[str] = Body(
        None,
        description="A code generated after the user finishes editing; the agent can be found by this code",
        embed=True,
    ),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Save the agent draft."""
    manager = AgentManager(db=db, request=request)
    await manager.draft_save_agent(code)
    return R.format()


@router.delete("/{agent_id}/delete")
async def delete_agent(
    request: Request,
    agent_id: str = Path(description="The agent ID to delete"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Delete an agent."""
    manager = AgentManager(db, request=request)
    agent_locked = await manager.delete_agent(agent_id)

    return R.format({"agent_locked": agent_locked})


@router.delete("/bulk-delete")
async def bulk_delete_agent(
    request: Request,
    agent_ids: typing.List[str] = Query(description="Agent IDs to delete, comma-separated"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    manager = AgentManager(db, request=request)
    # The frontend forwards DELETE via data->query with comma-joined multi-select ids
    # ("id1,id2"), which FastAPI parses as a single-element list; expand to handle both
    # comma-joined and repeated-parameter forms
    agent_locked = await manager.bulk_delete_agent(split_comma_values(agent_ids))

    return R.format({"agent_locked": agent_locked})


@router.get("/list")
def agent_list(
    request: Request,
    token: str = Depends(oauth2_scheme),
    space_id: str = Query(description="Agents under the current space"),
    sample: Optional[bool] = Query(default=False, description="Whether to show only simple info"),
    agent_name: Optional[str] = Query(None, description="Search by agent name"),
    exp_draft: Optional[bool] = Query(False, description="Whether to exclude drafts"),
    inc_visible: Optional[bool] = Query(False, description="Whether to include invisible agents"),
    commons: CommonParams = Depends(CommonParams),
    db: Session = Depends(api_sync_db),
):
    """List the agents under the current space."""
    manager = AgentManager(db, request=request)
    status = (
        [AgentStatus.private, AgentStatus.public, AgentStatus.active]
        if exp_draft
        else None
    )
    query_set = manager.list_space_agent(
        space_id,
        agent_name,
        commons.get_order_by_express(Agent),
        status=status,
        inc_visible=inc_visible,
    )
    schema = (
        agent_schema.AgentListSchema if not sample else agent_schema.AgentSampleSchema
    )
    if commons.paginated:
        pagination = Pagination(
            request, query_set, page=commons.page, pagesize=commons.page_size
        )
        if sample:
            data = agent_schema.AgentSampleSchema().dump(
                pagination.get_result(), many=True
            )
        else:
            data = schema(
                instance_ids=[q.id for q in query_set],
                filed_settings=[
                    {
                        "set_name": "user_set",
                        "schema": "docy.schema.auth.UserSampleSchema",
                        "filed_names": ["creator_id"],
                    }
                ],
            ).dump(pagination.get_result(), many=True)
        data = pagination.get_paginated_data(data)
    else:
        if sample:
            data = agent_schema.AgentSampleSchema().dump(query_set, many=True)
        else:
            data = agent_schema.AgentListSchema(
                instance_ids=[q.id for q in query_set],
                filed_settings=[
                    {
                        "set_name": "user_set",
                        "schema": "docy.schema.auth.UserSchema",
                        "filed_names": ["creator_id"],
                    }
                ],
            ).dump(query_set, many=True)
    return R.format(data=data)


@router.get("/{agent_id}/detail")
async def get_agent_detail(
    request: Request,
    agent_id: str = Path(description="agent id"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get agent details."""
    manager = AgentManager(db, request=request)
    agent_instance = await manager.get_agent_by_id(agent_id)
    if not agent_instance:
        logger.error(f"get_agent_detail error: {agent_id} not found")
        raise PE.ObjectNotFound
    await manager.check_object_permission("agent", agent_id)
    setattr(agent_instance, "from_my_market", False)
    return R.format(agent_schema.AgentSpecifiedDetailSchema().dump(agent_instance))


@router.post("/{agent_id}/visible/set")
async def set_visible(
    request: Request,
    agent_id: str = Path(description="agent id"),
    visible: Optional[bool] = Body(None, description="Whether visible on the frontend UI", embed=True),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Set whether the agent is visible in the agent list."""
    manager = AgentManager(db, request=request)
    agent_instance = await manager.set_visible(agent_id, visible)
    return R.format(data=agent_schema.AgentSpecifiedDetailSchema().dump(agent_instance))


@router.get("/{agent_id}/json")
async def get_agent_json(
    request: Request,
    agent_id: str = Path(description="agent id"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get the agent's JSON config."""
    manager = AgentManager(db, request=request)
    await manager.check_object_permission("agent", agent_id)
    agent_json = await manager.get_agent_json(agent_id)
    return R.format(agent_json)


# Temporary test endpoints: agent .docy package export/import
# (calls AgentPackageManager directly; remove after verification)

@router.get("/{agent_id}/package/export")
async def package_export(
    agent_id: str,
    request: Request,
    db: AsyncSession = Depends(api_async_db),
    token: str = Depends(oauth2_scheme),
):
    """Export an agent as a .docy package (temporary test endpoint)."""
    from io import BytesIO

    from fastapi.responses import StreamingResponse

    from docy.services.agent.agent_package import AgentPackageManager

    zip_bytes, file_name = await AgentPackageManager(db).export_package(agent_id)
    return StreamingResponse(
        BytesIO(zip_bytes),
        media_type="application/zip",
        headers={"Content-Disposition": f'attachment; filename="{file_name}"'},
    )


@router.post("/package/import")
async def package_import(
    request: Request,
    file: UploadFile = File(...),
    name: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    db: AsyncSession = Depends(api_async_db),
    token: str = Depends(oauth2_scheme),
):
    """Import a .docy package into the user's personal space
    (temporary test endpoint; defaults to the current logged-in user, or specify via email).
    """
    from docy.models import User
    from docy.services.agent.agent_package import AgentPackageManager
    from docy.utils import get_mock_request
    from docy.utils.sql_query import async_retrieve_object

    user = request.user
    if email:
        user = await async_retrieve_object(db, User, condition=[User.email == email])
        if not user:
            raise PE.ObjectNotFound(f"User not found (email={email})")
    manager = AgentPackageManager(db, request=get_mock_request(user=user))
    file_bytes = await file.read()
    result = await manager.import_package(file_bytes, name=name)
    return R.format(result)
