"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/13
Last Modified: 2025/6/13
Last Editor:
Filename: template.py
Description: document template API
"""

import asyncio
import os
from pathlib import Path as SPath

from fastapi import (
    APIRouter,
    Depends,
    Request,
    BackgroundTasks,
    Query,
    UploadFile,
    Form,
)
from pydantic import StrictStr
from sqlalchemy.ext.asyncio import AsyncSession

from docy.services.auth.utils.dependencies import oauth2_scheme
from docy.database import api_async_db
from docy.core import pagination as P
from docy.core._response import pre_response as R
from docy.core.settings import TEMP_DIR
from docy.core.storage_drivers import default_s3_client
from docy.exceptions import exception as E
from docy.forms.template import DocumentCreateForm, AreaTemplateFieldListUpdateForm
from docy.schema.template import (
    DocumentTemplateListSchema,
    DocumentTemplateDeleteManySchema,
    DocumentTemplateOptionListSchema,
    DocumentTemplateDetailSchema,
)
from docy.crud.decorator import require_perm
from docy.crud import workspace_dao
from docy.services.template import DocumentTemplateManager
from docy.utils.enums import (
    FileExtEnum,
    DocumentTemplateFieldTypeEnum,
    DocumentTemplateStatusEnum,
    InnerModelEnum,
)
from docy.utils.pdf import PdfHandler
from docy.utils._file import (
    check_file_size,
    get_file_type,
    get_file_name_extension,
)
from docy import const

router = APIRouter(tags=["Document template"], prefix="/dom")


@router.get("/tpl/list")
@require_perm("sys:tpl:view")
async def get_document_template_list(
    request: Request,
    name: StrictStr = Query(None),
    space_id: StrictStr = Query(...),
    commons: P.CommonParams = Depends(P.CommonParams),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get document template list <br>
    Supports pagination: <br>
    **PagNumber: int** the requested page number, default page 1 <br>
    **PageSize: int** records per page, default 10 <br>
    **name: str** fuzzy search on the document name <br>
    **space_id: str** workspace ID <br>
    **status: int** status 1: active 2: processing 3: failed <br>
    **orderBy:str** sort field.sort order, created_at.asc,name.desc <br>
    """

    query_set = await DocumentTemplateManager(
        db, request=request
    ).get_template_page_query_set(
        order_by_list=commons.order_by, name=name, space_id=space_id
    )
    pagination = P.AsyncPagination(
        db, query_set, page=commons.page, page_size=commons.page_size
    )
    serialize_data = DocumentTemplateListSchema().dump(
        await pagination.get_result(), many=True
    )
    return R.format(data=await pagination.get_paginated_data(serialize_data))


@router.get("/tpl/option/list")
@require_perm("sys:tpl:view")
async def get_document_template_option_list(
    request: Request,
    name: str = Query(None, description="<name, optional>"),
    space_id: str = Query(..., min_length=1, description="Workspace ID"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get document templates under the given workspace<br>
    name:int fuzzy search on the dataset name <br>
    space_id:str workspace ID <br>
    """

    template_option_list = await DocumentTemplateManager(
        db, request=request
    ).get_template_option_list(
        name=name,
        space_id=space_id,
        status=DocumentTemplateStatusEnum.active.value,
        area_file_path__is_not=None,  # filter out already-labeled template files
    )

    serialize_data_list = DocumentTemplateOptionListSchema().dump(
        template_option_list, many=True
    )
    return R.format(data=serialize_data_list)


@router.get("/tpl/export/{tpl_id}")
@require_perm("sys:tpl:export")
async def document_template_export(
    tpl_id: str,
    request: Request,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Export the template document."""

    s3_download_url = await DocumentTemplateManager(
        db, request=request
    ).get_template_s3_download_url(tpl_id)

    return R.format(data={"download_url": s3_download_url})


@router.get("/tpl/{tpl_id}/extract/fields")
async def extract_table_fields(
    request: Request,
    tpl_id: str,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Re-extract PDF table form fields<br>"""
    await DocumentTemplateManager(db, request=request).extract_table_fields(tpl_id)
    return R.format()


@router.get("/tpl/{tpl_id}")
async def get_document_template(
    tpl_id: str,
    request: Request,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get document template detail."""

    template_obj = await DocumentTemplateManager(
        db, request=request
    ).get_template_by_id(tpl_id)
    template_serialize = DocumentTemplateDetailSchema().dump(template_obj)
    return R.format(data=template_serialize)


@router.delete("/tpl")
@require_perm("sys:tpl:bulk:del")
async def batch_delete_document_template(
    _form: DocumentTemplateDeleteManySchema,
    request: Request,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Batch delete document templates."""
    manager = DocumentTemplateManager(db, request=request, bg_task=background_tasks)
    agent_id_lst, market_id_lst, delete_association_lst = (
        await manager.check_special_node_association(
            _form.tpl_ids, const.NodeEnum.DOCUMENTTEMPLATE
        )
    )
    delete_rows = await manager.delete_many_document_template(delete_association_lst)
    return R.format(data={"delete_rows": delete_rows})


@router.delete("/tpl/{tpl_id}")
@require_perm("sys:tpl:del")
async def delete_document_template(
    tpl_id: str,
    request: Request,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Delete a document template."""

    manager = DocumentTemplateManager(db, request=request, bg_task=background_tasks)
    agent_id_lst, market_id_lst, delete_association_lst = (
        await manager.check_special_node_association(
            [tpl_id], const.NodeEnum.DOCUMENTTEMPLATE
        )
    )
    if not delete_association_lst:
        raise E.ObjectCannotDelete
    await manager.delete_document_template(tpl_id)
    return R.format()


@router.post("/tpl/create")
@require_perm("sys:tpl:add")
async def create_document_template(
    request: Request,
    _form: DocumentCreateForm,
    background_tasks: BackgroundTasks,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Create a document template.

    space_id: str workspace ID<br>
    file_key: str document key returned by azure  ex: defalut/defaultAvatar-fwdmktku0s8z6CdI.jpeg
    """
    file_name, file_ext = get_file_name_extension(_form.file_key)
    if not file_name or not file_ext:
        raise E.FileUploadNotSupportError

    document_template_id = await DocumentTemplateManager(
        db, request=request
    ).create_template_record(_form.space_id, file_name, file_ext, _form.file_key)

    return R.format(data={"template_id": document_template_id})


@router.put("/tpl/{tpl_id}")
@require_perm("sys:tpl:edit")
async def update_document_template_field(
    tpl_id: str,
    request: Request,
    field_dict: AreaTemplateFieldListUpdateForm,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Update document template fields."""

    await DocumentTemplateManager(db, request=request).update_document_template_field(
        tpl_id, field_dict.model_dump()
    )
    return R.format()


@router.post("/tpl/upload", deprecated=False)
@require_perm("sys:tpl:upload")
async def upload_document(
    request: Request,
    background_tasks: BackgroundTasks,
    space_id: StrictStr = Form(...),
    file: UploadFile = Depends(check_file_size),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Upload a template file."""
    document_template_id = None

    if not await workspace_dao.select_model(db, space_id):
        raise E.ObjectNotFound

    if file is not None:
        file_type, file_ext = await get_file_type(file=file)
        if not file_type:
            raise E.FileUploadNotSupportError
        # The old version wrote the file to a temp directory; in OSE, template files
        # must be stored in local storage (file_path records the storage key), and the
        # temp file is deleted after extraction
        temp_file_path = SPath(TEMP_DIR) / file.filename
        data = await file.read()
        with open(temp_file_path, "wb") as f:
            f.write(data)
        upload_file_path = str(temp_file_path)

        # Automatically extract fields from PDF tables
        table_field_list = await asyncio.to_thread(
            PdfHandler(upload_file_path).read_tables_by_camelot
        )

        match file_type:  # noqa
            case FileExtEnum.WORD.name:
                file_type = FileExtEnum.WORD
            case FileExtEnum.PDF.name:
                file_type = FileExtEnum.PDF
            case FileExtEnum.EXCEL.name:
                file_type = FileExtEnum.EXCEL
            case _:
                raise E.FileUploadNotSupportError

        # Store the template file, recording file_path as the storage key;
        # generate the key via pre_signed_url and write it to file_upload_history
        # so that /common/files can download it
        from docy.services.common.manager import CommonManager

        pre_signed_res = await CommonManager(db=db, request=request).pre_signed_url(
            file.filename, InnerModelEnum.template, file_type=file.content_type
        )
        file_key = pre_signed_res["key"]
        await asyncio.to_thread(default_s3_client.upload_file, file_key, data)

        document_template_id = await DocumentTemplateManager(
            db, background_tasks, request
        ).create_template_record(
            space_id,
            file.filename,
            file_type,
            file_key,
            {DocumentTemplateFieldTypeEnum.auto: table_field_list},
        )
        await asyncio.to_thread(os.remove, upload_file_path)

    return R.format(data={"template_id": document_template_id})
