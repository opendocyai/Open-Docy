"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/13
Last Modified: 2025/6/13
Last Editor:
Filename: common
Description:
"""

import json
import time
import asyncio
import typing
from datetime import datetime, timezone

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import (
    APIRouter,
    Depends,
    Body,
    Request,
    BackgroundTasks,
    HTTPException,
    status,
    Header,
    Path,
    Query,
    File,
    Form,
    UploadFile,
)
from fastapi.responses import FileResponse
from sse_starlette.sse import EventSourceResponse
from sse_starlette.event import ServerSentEvent, ensure_bytes

from docy.const import SSEEventTypeEnum

from docy.database import api_async_db
from docy.core.settings import project_settings as settings
from docy.core._response import pre_response as R
from docy.core._string import gen_short_uuid
from docy.core.sse import sse_manager
from docy.core.storage_drivers import default_s3_client
from docy.forms import EventForm, FileUploadForm
from docy.services.common.manager import CommonManager
from docy.services.common.ai_package import (
    SUPPORTED_PLATFORMS,
    build_zip_name,
    default_platform,
    default_python_version,
    find_ai_package,
    validate_python_version,
)
from docy.services.auth.utils.security import generate_signature
from docy.schema.common import FileSchema
from docy.services.auth.utils.dependencies import oauth2_scheme

router = APIRouter(tags=["common"], prefix="/common")
SSE_STREAM = "sse_stream"


@router.post("/pre-signed/url")
async def pre_signed_url(
    request: Request, file: FileUploadForm, db: AsyncSession = Depends(api_async_db)
):
    """Generate the link for the user to upload files.
    file_name: file name
    category: upload directory name, optional, defaults to default
    file_size: file size, optional
    file_tag: file MIME type, e.g. image/webp, application/pdf, etc.
    file_metadata: custom additional file info,

    Returns {"url": ..., "key": ...}; after getting the url, the client uploads the
    file via POST multipart/form-data with the file in the file field.
    """
    manager = CommonManager(db=db, request=request)
    data = await manager.pre_signed_url(
        file.file_name,
        file.category,
        file.file_type,
        file.file_size,
        file.file_tag,
        file.file_metadata,
    )
    return R.format(data)


@router.put("/upload/{key:path}")
async def upload_file(
    request: Request,
    key: str,
    file: UploadFile = File(...),
    expires: int | None = Query(default=None, description="Expiration timestamp of the upload URL"),
):
    """Upload a file.

    In local storage mode, the link returned by pre-signed/url points here;
    the client uploads via POST multipart/form-data with the file in the file field:

        files = {"file": ("file name", file content or file object)}
        requests.post(url, files=files)
    """
    if expires and time.time() > expires:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Upload url expired."
        )
    data = await file.read()
    if not data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Empty file body."
        )
    await asyncio.to_thread(default_s3_client.upload_file, key, data)
    return R.format({"key": key, "file_name": file.filename})


@router.get("/files/{key:path}")
async def download_file(
    request: Request,
    key: str,
    db: AsyncSession = Depends(api_async_db),
):
    """Static file download.

    Files are stored in the local storage directory defined by the local_storage
    module; key is the object key returned at upload time (e.g. default/xxx.png).
    """
    manager = CommonManager(db=db, request=request)
    full_path, file_name = await manager.download_file(key)
    return FileResponse(full_path, filename=file_name)


@router.post("/pre-download/url")
async def pre_download_url(
    request: Request,
    file_key: str = Body(embed=True),
    check_key: typing.Optional[bool] = Body(
        default=True, description="Whether to check that the key exists among the files"
    ),
    db: AsyncSession = Depends(api_async_db),
):
    """Generate file info."""
    manager = CommonManager(db=db, request=request)
    instance = await manager.pre_download_file(file_key)
    if not instance and not check_key:
        instance = await manager.fake_download_file(file_key)
    return R.format(FileSchema().dump(instance))


@router.get("/sse/stream", name=SSE_STREAM)
async def sse_notice(
    request: Request,
    token: str,
):
    """SSE connection."""
    event_form = EventForm(
        event_type="message",
        object_id=request.user.id,
        object_type=SSEEventTypeEnum.object_user,
    )
    listeners = sse_manager.create_connection(event_form)

    async def event_stream():
        # Send a heartbeat immediately so the browser gets 200 right away
        yield ensure_bytes(
            ServerSentEvent(comment=f"ping - {datetime.now(timezone.utc)}", sep="\r\n"),
            sep="\r\n",
        )
        await asyncio.sleep(0)  # yield control

        # The honker version of generate_events cleans up listeners via a stop flag
        # internally, so no extra handling is needed on disconnect
        async for event in sse_manager.generate_events(listeners):
            if await request.is_disconnected():
                break
            yield event

    return EventSourceResponse(
        event_stream(),
        headers={
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )


@router.post("/sse/push")
async def push_message(
    request: Request,
    broadcast: bool = Body(default=False, description="Whether"),
    token: str = Depends(oauth2_scheme),
    content: str | None = Body(default=None),
    payload: typing.Dict | None = Body(default=None),
):
    event = EventForm(
        event_type="notice",
        object_id=request.user.id,
        object_type=SSEEventTypeEnum.object_user,
        content=content,
        payload=payload,
    )
    await sse_manager.push_message(event, global_message=broadcast)
    return R.format()


@router.post("/sse/inner/push")
async def inner_push_message(
    request: Request,
    event: EventForm,
    broadcast: bool = Body(default=False, description="Whether"),
):
    await sse_manager.push_message(event, global_message=broadcast)
    return R.format()


@router.get("/health")
async def health_check():
    """Health check endpoint (no auth); used e.g. by `docy run` on Linux
    to detect server readiness."""
    return {"status": "healthy", "service": "open-docy"}


@router.get("/nodes/suported")
def get_supported_nodes():
    _supported_nodes = [
        {
            "label": "Input file",
            "factory": "InputFile",
            "icon": "input-file",
            "json": {},
        },
        {
            "label": "Data extractor",
            "factory": "DataExtractor",
            "icon": "data-extractor",
            "json": {},
        },
        {
            "label": "Extract signature",
            "factory": "ExtractSignature",
            "icon": "extract-signature",
            "json": {},
        },
        {
            "label": "Audit node – global",
            "factory": "AuditNodeGlobal",
            "icon": "audit-node",
            "json": {},
        },
        {
            "label": "Audit node – field",
            "factory": "AuditNodeField",
            "icon": "audit-node",
            "json": {},
        },
        {
            "label": "Conditional node",
            "factory": "ConditionalNode",
            "icon": "conditional-node",
            "json": {},
        },
        {
            "label": "Interaction node",
            "factory": "InteractionNode",
            "icon": "interaction-node",
            "json": {},
        },
        {
            "label": "Knowledge node",
            "factory": "KnowledgeNode",
            "icon": "knowledge-node",
            "json": {},
            "locked": True,
        },
        {
            "label": "Document template node",
            "factory": "DocumentTemplateNode",
            "icon": "document-template-node",
            "json": {},
        },
        {
            "label": "Web search",
            "factory": "WebSearch",
            "icon": "web-search",
            "json": {},
        },
        {
            "label": "Content generator node",
            "factory": "ContentGeneratorNode",
            "icon": "content-generator-node",
            "json": {},
        },
        {
            "label": "Compliance policy node",
            "factory": "CompliancePolicy",
            "icon": "compliance-policy",
            "json": {},
            "locked": True,
        },
        {
            "label": "Custom component",
            "factory": "CustomComponent",
            "icon": "custom-component",
            "json": {},
        },
    ]
    _supported_group_nodes = [
        {
            "label": "Input file (Repeatable)",
            "factory": "GroupInputFile",
            "icon": "input-file",
            "json": {},
        },
        {
            "label": "Data extractor (Batch)",
            "factory": "GroupDataExtractor",
            "icon": "data-extractor",
            "json": {},
        },
    ]
    return R.format({"nodes": _supported_nodes, "group_nodes": _supported_group_nodes})


@router.get("/ai-package/download")
async def download_ai_package(
    python_version: str | None = Query(
        default=None, description="Python version digits, e.g. 313"
    ),
    platform_name: str | None = Query(
        default=None,
        alias="platform",
        description="Target platform, e.g. windows.x86_64",
    ),
):
    """Download the PyArmor-encrypted AI package (mock endpoint).

    Both query params are optional and default to the server runtime;
    the zip is served from the local package directory (`docy/dist/`).
    In production these packages will be hosted on the company download
    server instead.
    """
    python_version = python_version or default_python_version()
    platform_name = platform_name or default_platform()
    if not validate_python_version(python_version):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid python_version, expected digits like 313.",
        )
    if platform_name not in SUPPORTED_PLATFORMS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported platform, choose from: {', '.join(SUPPORTED_PLATFORMS)}",
        )
    zip_path = find_ai_package(python_version, platform_name)
    if zip_path is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No package found for platform={platform_name} python_version={python_version}.",
        )
    zip_name = build_zip_name(python_version, platform_name)
    return FileResponse(zip_path, filename=zip_name)

