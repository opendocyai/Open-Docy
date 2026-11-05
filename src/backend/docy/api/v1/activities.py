"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/23
Last Modified: 2025/6/23
Last Editor:
Filename: activities
Description: Create task
"""

import time
import typing
from loguru import logger
from fastapi import (
    APIRouter,
    Depends,
    Body,
    Request,
    BackgroundTasks,
    Path,
    Query,
)
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sse_starlette.sse import EventSourceResponse
from sqlalchemy.orm import Session

from docy.database import api_async_db, api_sync_db
from docy.core.pagination import CommonParams, Pagination
from docy.core._response import pre_response as R
from docy.core._string import split_comma_values
from docy.exceptions import exception as PE
from docy.forms import EventForm
from docy.forms.activity import ShareLinkForm, ActivityInputForm, EmailContentForm, TaskRecordForm
from docy.schema.activity import TaskListSchema, TemporaryTaskSchema, TASK_SCHEMA_SETTING
from docy.models.tb_activity import TaskStatus, AGENTFROM, TaskType
from docy.crud.decorator import require_perm
from docy.services.activity.manager import ActivityManager
from docy.services.auth.utils.security import APIOAuth2PasswordBearer
from docy.core.logstream import LogStream
from docy import const
from docy.crud.decorator import require_api_read, require_api_write, internal_only, TokenData
from docy.services.audit.helper import audit
from docy.schema.audit import ResourceType, Action, Outcome

router = APIRouter(tags=["Activity"], prefix="/activity")
oauth2_scheme = APIOAuth2PasswordBearer(tokenUrl="token")
SSE_LOG_STREAM = "sse_log_stream"


@router.post("/add", dependencies=[Depends(require_api_write)])
async def add_task(
        request: Request,
        name: str = Body(description="task name"),
        agent_id: str = Body(
            description="Agent ID; pass the market ID if a public template was selected from the market"
        ),
        space_id: str = Body(default=None,
                             description="The space_id is the ID of the space where the agent is located"),
        agent_from: typing.Optional[AGENTFROM] = Body(
            default=AGENTFROM.FROM_SPACE, description="Source of the agent template used by this task: 1 = from the template market, 2 = from a space"
        ),
        # new parameters
        visible: bool = Body(
            default=True,
            description="Whether the created task is visible on the frontend page. Tasks created from the frontend default to True; tasks created via SDK default to False, i.e. invisible on the frontend",
        ),
        webhook_push: bool = Body(
            default=True,
            description="Whether to push task events to the user-registered webhook endpoint while the task runs; pushes by default",
        ),
        virtual_space_id: str = Body(
            default=None,
            description="Virtual space ID; required if the current task belongs to a virtual space",
        ),
        virtual_user_id: str = Body(
            default=None,
            description="Virtual space user ID; required if the current task belongs to a virtual space",
        ),
        metadata: dict = Body(
            default=None,
            description="User-customizable metadata for storing custom data",
        ),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    manager = ActivityManager(db=db, request=request)
    task = await manager.create_task(
        name=name,
        agent_id=agent_id,
        agent_from=agent_from,
        space_id=space_id,
        visible=visible,
        webhook_push=webhook_push,
        virtual_space_id=virtual_space_id,
        virtual_user_id=virtual_user_id,
        raw_data=metadata
    )
    # Audit record: task creation; payload contains task name, related agent and space
    await audit(request, db).write_quick(
        chain_id=f"{space_id}--{ResourceType.TASK.value}",
        resource_type=ResourceType.TASK,
        resource_id=task.id,
        action=Action.CREATE,
        outcome=Outcome.SUCCESS,
        payload={"name": name, "agent_id": agent_id, "space_id": space_id},
    )
    return R.format({"task_id": task.id})


@router.get("/{task_id}/input/nodes", dependencies=[Depends(require_api_read)])
async def get_task_input_nodes(
        request: Request,
        task_id: str = Path(description="task ID"),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Find the input nodes of the given task."""
    manager = ActivityManager(request=request, db=db)
    data = await manager.get_task_input_nodes(task_id)
    return R.format(data)


@router.get("/agent-input/nodes")
async def get_agent_input_nodes(
        request: Request,
        agent_id: str = Query(description="Agent ID"),
        task_id: str = Query(description="Task ID"),
        db: AsyncSession = Depends(api_async_db),
):
    """Input nodes of the task after switching agent."""
    manager = ActivityManager(request=request, db=db)
    data = await manager.get_agent_input_nodes(task_id, agent_id)
    return R.format(data)


@router.get("/{task_id}/manual/node")
async def get_task_manual_nodes(
        request: Request,
        task_id: str = Path(description="task ID"),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Find the manual nodes under the given task."""
    manager = ActivityManager(request=request, db=db)
    data = await manager.get_task_manual_nodes(task_id)
    return R.format(data)


@router.post("/{task_id}/manual-input/save")
async def save_manual_input(
        request: Request,
        task_id: str = Path(description="task ID"),
        node: dict = Body(
            description="Node details of the manual node, sent by the frontend and replaced in the JSON on the backend", embed=True
        ),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Save manual node input."""
    # todo: need to handle the case of multiple manual nodes
    manager = ActivityManager(request=request, db=db)
    await manager.save_manual_input(task_id, node)
    return R.format()


@router.post("/{task_id}/input/save")
async def save_task_input(
        request: Request,
        task_id: str = Path(description="task ID"),
        task_input: ActivityInputForm = Body(description="Input files required by the task"),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
        oauth2_data: TokenData = Depends(internal_only()),  # internal access only (api-key, Bearer token); cannot be accessed via oauth
):
    """Save task input files."""
    manager = ActivityManager(db=db, request=request)
    await manager.save_task_input(task_id, task_input)
    return R.format()


@router.get("/list")
def list_task(
    request: Request,
    space_id: str = Query(description="The space where the task was created"),
    task_name: str | None = Query(None, description="Search by task name"),
    t_status: TaskStatus | None = Query(None, description="Filter by task status"),
    virtual_space_id: str | None = Query(None, description="Virtual space ID"),
    virtual_user_id: str | None = Query(None, description="Virtual space user ID"),
    commons: CommonParams = Depends(CommonParams),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(api_sync_db),
):
    """Get the task list."""
    manager = ActivityManager(db=db, request=request)
    query_set = manager.list_task(
        space_id=space_id, task_name=task_name, t_status=t_status, commons=commons,
        virtual_space_id=virtual_space_id, virtual_user_id=virtual_user_id
    )
    pagination = Pagination(
        request, query_set, page=commons.page, pagesize=commons.page_size
    )
    query_set = pagination.get_result()
    schema, filed_settings = manager.get_task_schema()
    data = schema(
        instance_ids=[q.id for q in query_set], filed_settings=filed_settings
    ).dump(query_set, many=True)
    return R.format(data=pagination.get_paginated_data(data))


@router.post("/{task_id}/update")
async def update_task(
        request: Request,
        task_id: str = Path(description="The task_id of the task to modify"),
        task_name: str | None = Body(
            default=None, description="The new name for the task", embed=True
        ),
        agent_id: str | None = Body(default=None, description="agent ID"),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
        oauth2_data: TokenData = Depends(internal_only()),  # internal access only (api-key, Bearer token); cannot be accessed via oauth
):
    """Update task info; currently only the task name can be modified."""
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    task = await manager.update_task(task_id, task_name, agent_id=agent_id)
    schema, filed_settings = manager.get_task_schema(detail=True)
    if task:
        data = schema(instance_ids=[task.id], filed_settings=filed_settings).dump(task)
        return R.format(data)
    return R.format()


@router.get("/{task_id}/detail", dependencies=[Depends(require_api_read)])
async def get_task_detail(
        request: Request,
        task_id: str = Path(description="The task_id to query"),
        task_type: int = Query(default=1, alias="tasktype", description="task type"),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Get task details."""
    task_type = TaskType(task_type)
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    task = await manager.get_task_by_id(task_id, task_type=task_type)
    schema, filed_settings = manager.get_task_schema(detail=True)
    if task:
        data = schema(instance_ids=[task.id], filed_settings=filed_settings).dump(task)
        return R.format(data)
    return R.format()


@router.delete("/{task_id}/delete", dependencies=[Depends(require_api_write)])
async def delete_task(
        request: Request,
        task_id: str = Path(description="The ID of the task to delete"),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Delete a single task."""
    manager = ActivityManager(db=db, request=request)
    # Fetch task info for the audit record
    task_info = await manager.get_task_by_id(task_id)
    space_id = (
        task_info.task_space_id
        if task_info and hasattr(task_info, "task_space_id")
        else ""
    )
    task_name = task_info.name if task_info and hasattr(task_info, "name") else None
    await manager.single_delete_task(task_id)

    # Audit record: task deletion; payload contains the task name (queried before deletion)
    await audit(request, db).write_quick(
        chain_id=(
            f"{space_id}--{ResourceType.TASK.value}"
            if space_id
            else ResourceType.TASK.value
        ),
        resource_type=ResourceType.TASK,
        resource_id=task_id,
        action=Action.DELETE,
        outcome=Outcome.SUCCESS,
        payload={"name": task_name},
    )

    return R.format()


@router.delete("/bulk-delete")
async def bulk_delete(
        request: Request,
        task_ids: typing.List[str] = Query(description="Agent IDs to delete, comma-separated"),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    manager = ActivityManager(db=db, request=request)
    # The frontend forwards DELETE via data->query with comma-joined multi-select ids
    # ("id1,id2"), which FastAPI parses as a single-element list; expand to handle both
    # comma-joined and repeated-parameter forms
    await manager.bulk_delete_task(split_comma_values(task_ids))
    return R.format()


@router.post("/{task_id}/run", dependencies=[Depends(require_api_write)])
async def run_task(
        request: Request,
        background_tasks: BackgroundTasks,
        task_id: str = Path(description="The ID of the task to run"),
        task_input: typing.Optional[ActivityInputForm] = Body(
            default=None, description="task input"
        ),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Run a task."""
    try:
        t_start = time.perf_counter()
        notice_enough_coin = True if request.scope["auth_type"] == const.AT_BEARER_TOKEN else False
        manager = ActivityManager(db=db, request=request, bg_task=background_tasks)
        t0 = time.perf_counter()
        await manager.check_object_permission('task', task_id)
        t1 = time.perf_counter()
        body = await manager.before_run_task(task_id, task_input=task_input)
        t2 = time.perf_counter()
        task_info = await manager.run_task(body, "task", notice_enough_coin=notice_enough_coin)
        t3 = time.perf_counter()
        logger.info(
            f"[perf] /run task_id={task_id} total={(t3 - t_start) * 1000:.1f}ms | "
            f"check_perm={(t1 - t0) * 1000:.1f}ms "
            f"before_run_task={(t2 - t1) * 1000:.1f}ms "
            f"run_task={(t3 - t2) * 1000:.1f}ms"
        )
        if 'task_id' not in task_info:
            return task_info
        # Task ran successfully; share links are invalidated

        # Audit record: task execution
        # space_id and task name are obtained from the body returned by before_run_task
        space_id = body.get("run_info", {}).get("space_id", "")
        task_name = body.get("name", "")
        await audit(request, db).write_quick(
            chain_id=f"{space_id}--{ResourceType.TASK.value}",
            resource_type=ResourceType.TASK,
            resource_id=task_id,
            action=Action.EXECUTE,
            outcome=Outcome.SUCCESS,
            payload={"name": task_name, "space_id": space_id},
        )
    except PE.TaskRunwithInvalidAgent:
        return R.format(status="failed", msg=PE.TaskRunwithInvalidAgent.detail)
    return R.format(task_info)


@router.post("/run/cancel")
async def cancel_task(
        request: Request,
        task_id: str = Body(description="The task_id to cancel"),
        run_id: typing.Optional[str] = Body(default=None, description="The run id to cancel"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
):
    """Cancel the current debug run of a task by task_id and run_id."""
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    await manager.cancel_task(task_id, run_id)
    return R.format()


@router.post("/{task_id}/update-status")
async def update_status(
        request: Request,
        task_id: str = Path(description="The ID of the task whose status to change"),
        status: TaskStatus = Body(description="The status to set"),
        error_info: str | None = Body(
            description="Error message to fill in when setting the task status to error"
        ),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
        oauth2_data: TokenData = Depends(internal_only()),  # internal access only (api-key, Bearer token); cannot be accessed via oauth
):
    """Update task status via API."""
    manager = ActivityManager(db=db, request=request)
    await manager.update_task_status(task_id, status, error_info)
    return R.format()


@router.get("/{task_id}/node/before/manual")
async def find_result_before_manual(
        request: Request,
        task_id: str = Path(description="The ID of the task whose status to change"),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
        oauth2_data: TokenData = Depends(internal_only()),  # internal access only (api-key, Bearer token); cannot be accessed via oauth
):
    """Find the nodes before the manual node."""
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    data = await manager.find_result_before_manual(task_id)
    return R.format(data)


@router.post("/{task_id}/run/after-action")
async def run_after_action(
        request: Request,
        task_id: str = Path(description="The ID of the task whose status to change"),
        exict_loop: bool = Body(
            default=False, description="Whether to exit the loop"
        ),
        node: typing.Optional[dict | typing.List[dict]] = Body(
            default=None,
            description="Node details of the manual node, sent by the frontend and replaced in the JSON on the backend",
            embed=True,
        ),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Resume task execution after manual intervention."""
    # todo: need to handle the case of multiple manual nodes
    manager = ActivityManager(db=db, request=request)
    # Replace the nodes before running
    if node:
        if isinstance(node, dict):
            nodes = [node]
        else:
            nodes = node
        for node in nodes:
            await manager.save_manual_input(task_id, node, exict_loop=exict_loop)
    await manager.check_object_permission('task', task_id)
    run_id, task_id = await manager.run_after_action(task_id, exict_loop)
    return R.format({"run_id": run_id, "task_id": task_id})



# Rewritten to implement a SQLite-based log stream
@router.get("/log/view", name=SSE_LOG_STREAM)
async def get_task_log(
        request: Request,
        token: str,
        task_id: str = Query(description="The ID of the task whose status to change"),
        db: AsyncSession = Depends(api_async_db),
):
    """View task run logs, including real-time logs."""
    log_stream = LogStream(task_id, db)
    return EventSourceResponse(
        log_stream.stream_logs(),
    )


@router.get("/state")
async def get_task_state(
        request: Request,
        token: str = Depends(oauth2_scheme),
        space_id: typing.Optional[str] = Query(description="Task statistics for the space to aggregate"),
        db: AsyncSession = Depends(api_async_db),
        oauth2_data: TokenData = Depends(internal_only()),
):
    manager = ActivityManager(db=db, request=request)
    data = await manager.get_task_state(space_id)
    return R.format(data)


@router.post("/share/upload-file/link")
async def generate_file_upload_link(
        request: Request,
        link_params: ShareLinkForm,
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Generate a share link for file upload."""
    manager = ActivityManager(db=db, request=request)
    data = await manager.generate_share_link(link_params.model_dump())
    return R.format(data)


@router.post("/share/link/send-by-email")
async def send_share_link_by_email(
        request: Request,
        background_tasks: BackgroundTasks,
        link_code: str = Body(description="The query parameter in the URL when obtaining the share link"),
        emails: list[str] = Body(description="The recipient email addresses to send the link to"),
        email_content: str = Body(description="The email body content to send"),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Send the share link to the given email addresses."""
    manager = ActivityManager(request=request, db=db, bg_task=background_tasks)
    await manager.send_share_link_by_email(link_code, emails, email_content)
    return R.format()


@router.post("/{task_id}/change/agent")
async def can_change_agent(
        request: Request,
        task_id: str = Path(description="task_id"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Check whether the given task can switch agents:
    tasks with no share link and status Not Start or Complete.
    """
    manager = ActivityManager(db=db, request=request)
    data = await manager.can_change_agent(task_id)
    return R.format(data)


@router.post("/email/received")
async def receive_email(
        request: Request,
        received_params: EmailContentForm = Body(
            description="Create an email sending history record", embed=True
        ),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
):
    """Called when the monitored mailbox receives a new email."""
    manager = ActivityManager(db=db, request=request)
    await manager.receive_email(received_params.model_dump())
    return R.format()


@router.get("/{task_id}/results/audit")
async def get_task_audit_result(
        request: Request,
        task_id: str = Path(description="Task ID"),
        db: AsyncSession = Depends(api_async_db),
):
    """Get task approval results.
    :request: Request object
    :db: database connection
    :token: user token
    """
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    data = await manager.get_task_audit_result(task_id)
    return R.format(data)


@router.get("/{task_id}/results/show-map/audit")
async def get_task_audit_map(
        request: Request,
        task_id: str = Path(description="Task ID"),
        query_key: str = Query(None, description="The key to query"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Get task approval mapping.
    :request: Request object
    :db: database connection
    :token: user token
    """
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    data = await manager.get_task_audit_map(task_id, query_key)
    return R.format(data)


@router.get("/{task_id}/results/extract")
async def get_task_audit_result(
        request: Request,
        task_id: str = Path(description="Task ID"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Get task extraction results.
    :request: Request object
    :db: database connection
    :token: user token
    """
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    data = await manager.get_task_extract_result(task_id)
    return R.format(data)


@router.get("/{task_id}/results/extract-by-group")
async def get_extract_by_group(
        request: Request,
        task_id: str = Path(description="Task ID"),
        key: str = Query(description="The file key to query"),
        group_name: str = Query(description="The group name to query"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Get data by file name and group name."""
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    data = await manager.get_task_extract_result_group(task_id, key, group_name)
    return R.format(data)


@router.get("/{task_id}/results/extract-groups")
async def get_task_extractor_info(
        request: Request,
        task_id: str = Path(description="Task ID"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Get group info of the current task."""
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    data = await manager.get_task_extract_group_info(task_id)
    return R.format(data)


@router.get("/{task_id}/results/show-map/extract")
async def get_task_audit_map(
        request: Request,
        task_id: str = Path(description="Task ID"),
        query_key: str = Query(None, description="The key to query"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Get task approval/extraction mapping.
    :request: Request object
    :db: database connection
    :token: user token
    """
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    data = await manager.get_task_extract_map(task_id, query_key)
    return R.format(data)


@router.get("/{task_id}/results/show-map-group/extract")
async def get_task_extract_by_groups(
        request: Request,
        task_id: str = Path(description="Task ID"),
        query_key: str = Query(None, description="The key to query"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Get all groups mapped by file."""
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    data = await manager.get_task_extract_map_by_group(task_id, query_key)
    return R.format(data)


@router.get("/{task_id}/results/files/generate")
async def get_task_audit_result(
        request: Request,
        task_id: str = Path(description="Task ID"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Get task file generation results.
    :request: Request object
    :db: database connection
    :token: user token
    """
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    data = await manager.get_task_generated_files(task_id)
    return R.format(data)


@router.get("/{task_id}/results/files-generated/download")
async def download_all_generated_files(
        request: Request,
        task_id: str = Path(description="Task ID"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Download all files generated by the task."""
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    zipfile = await manager.download_all_generated_files(task_id)
    filename = f"Activity_Files_{task_id}.zip"
    return StreamingResponse(
        zipfile,
        media_type="application/zip",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "File-Name": f"{filename}",
        },
    )


@router.get("/{task_id}/results/extract-table/download")
async def download_extract_result(
        request: Request,
        task_id: str = Path(description="Task ID"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Download the extraction result table."""
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    buffer = await manager.download_all_extract_result(task_id)
    filename = f"Activity_{task_id}_extract.zip"
    return StreamingResponse(
        buffer,
        media_type="application/zip",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "File-Name": f"{filename}",
        },
    )


@router.get("/{task_id}/results/files/map")
async def get_result_files(
        request: Request,
        task_id: str = Path(description="Task ID"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Get file mapping.
    :request: Request object
    :db: database connection
    :token: user token
    """
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    data = await manager.get_result_files(task_id)
    return R.format(data)


@router.get("/{task_id}/results/all-files/download")
async def download_result_files(
        request: Request,
        task_id: str = Path(description="Task ID"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Get file mapping.
    :request: Request object
    :db: database connection
    :token: user token
    """
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    zipfile = await manager.download_result_files(task_id)
    filename = f"Activity_All_Files_{task_id}.zip"
    return StreamingResponse(
        zipfile,
        media_type="application/zip",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "File-Name": f"{filename}",
        },
    )


@router.get("/{task_id}/results-raw")
async def get_raw_results(
        request: Request,
        task_id: str = Path(description="Task ID"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
        oauth2_data: TokenData = Depends(internal_only()),
):
    """Query the raw AI results of a task.
    :request: the original user request
    :task_id: the task id to query
    :db: database connection instance
    :token: the user's login token
    """
    manager = ActivityManager(db=db, request=request)
    await manager.check_object_permission('task', task_id)
    data = await manager.task_result(task_id)
    return R.format(data)
