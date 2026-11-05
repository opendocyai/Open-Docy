"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/7/16
Last Modified: 2025/7/16
Last Editor:
Filename: tasks.py
Description: Document template honker async tasks (replacing the legacy Celery tasks/template_task.py)

The legacy Celery ran in a separate process and pushed SSE through the InnerApi
HTTP internal API; the new honker worker runs inside the API process and calls
sse_manager/CommonManager directly. Synchronous heavy work
(soffice/fitz/file IO) is uniformly wrapped in asyncio.to_thread to avoid
blocking the event loop.
"""
import asyncio
import gc
import os
import time
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.orm.attributes import flag_modified

from loguru import logger

from docy.const import SSEEventTypeEnum
from docy.core.settings import project_settings as settings, TEMP_DIR
from docy.core.storage_drivers import default_s3_client
from docy.core._string import gen_short_uuid
from docy.core.sse import sse_manager
from docy.database import get_async_db_connector
from docy.forms import EventForm
from docy.honker_db import db
from docy.models.tb_template import DocumentTemplate
from docy.services.common.manager import CommonManager
from docy.utils import get_mock_request
from docy.utils.enums import (
    DocumentTemplateFieldTypeEnum,
    FileExtEnum,
    InnerModelEnum,
    DocumentTemplateStatusEnum,
)
from docy.utils.file_convert import docx_to_pdf
from docy.utils.pdf import PdfHandler

LOG = logger.bind(category="template_task")


@db.task(queue="default", retries=1, retry_delay_s=60, store_result=False)
async def extract_template_table_fields(
        template_id: str,
        file_key: str,
        retry: bool = False,
) -> dict:
    """
    Extract the table fields from the template.
    Re-tag (form fields).
    Upload the tagged file to storage.
    """
    LOG.info(f"Extracting table fields incoming----{template_id}/{file_key}")
    if not retry:
        await asyncio.sleep(2)  # Wait here for the frontend file upload to complete

    source_file_is_docx = False
    content_message = "PDF extract table fields successful..."
    warning_message = "No fields were auto-detected — you can easily mark them manually."
    async with get_async_db_connector() as session:
        document_template = await session.scalar(
            select(DocumentTemplate).where(DocumentTemplate.id == template_id)  # noqa
        )
        if document_template:
            user_id = document_template.uploader
            space_id = document_template.space_id
            push_event = EventForm(
                event_type=SSEEventTypeEnum.template_status_changed,
                object_id=user_id,
                object_type=SSEEventTypeEnum.object_user,
                content=content_message,
                payload={"space_id": space_id, "template_id": template_id, "status": DocumentTemplateStatusEnum.processing.value},
                page=InnerModelEnum.template
            )
            # First push a notification to the frontend about the status change
            await sse_manager.push_message(push_event)
            try:
                # Download the file
                LOG.info(f"Start Downloading file: {file_key}")
                full_filename_path: str = await asyncio.to_thread(
                    default_s3_client.download_file, str(TEMP_DIR), file_key
                )
                if full_filename_path and os.path.exists(full_filename_path):
                    LOG.info(f"Downloading file {full_filename_path} Successful")
                    # Check the file type
                    file_ext = Path(full_filename_path).suffix.replace(".", "").lower()
                    # Only handle doc, docx and pdf
                    if file_ext not in [FileExtEnum.WORD, FileExtEnum.WORDX, FileExtEnum.PDF]:
                        push_event.content = f"File {full_filename_path} has an unsupported file extension"
                        raise Exception(f"File {full_filename_path} has an unsupported file extension")
                    else:
                        if file_ext in [FileExtEnum.WORD, FileExtEnum.WORDX]:  # The word file must be converted to pdf
                            LOG.info(f"Start translate file {full_filename_path} to pdf file ...")
                            source_file_is_docx = True
                            # The word file must be converted to pdf; on failure
                            # the source file is empty.
                            full_filename_path = await asyncio.to_thread(
                                docx_to_pdf, full_filename_path, TEMP_DIR
                            )
                        if not full_filename_path:
                            # File conversion
                            LOG.error(f"File '{file_key}' convert to pdf error ...")
                            push_event.payload.update({"status": DocumentTemplateStatusEnum.failed.value})
                            push_event.content = warning_message
                            document_template.status = DocumentTemplateStatusEnum.failed.value
                            await sse_manager.push_message(push_event)
                            raise
                        else:
                            # When the source is docx it must first be converted
                            # to pdf; send the frontend message right after
                            # conversion.
                            # Uploading must first request a pre_signed_url to
                            # write the DB record.
                            file_content_type = FileExtEnum.get_upload_file_content_type(FileExtEnum.PDF)  # Get the pdf content_type
                            post_data = {
                                "file_name": Path(full_filename_path).name,
                                "category": InnerModelEnum.template,
                                "file_type": file_content_type,
                            }
                            if source_file_is_docx:
                                await asyncio.sleep(1)  # Wait 1s here for the storage upload to fully complete

                                # First upload the converted pdf file to storage
                                pre_signed_res = await CommonManager(
                                    db=session, request=get_mock_request()
                                ).pre_signed_url(
                                    post_data["file_name"],
                                    post_data["category"],
                                    file_type=post_data["file_type"],
                                )
                                if pre_signed_res:
                                    with Path(full_filename_path).open("rb") as f:
                                        _file_key = pre_signed_res.get("key")
                                        data = f.read()
                                        upload_ok = await asyncio.to_thread(
                                            default_s3_client.upload_file, _file_key, data
                                        )
                                        if upload_ok:  # Save
                                            document_template.ext = FileExtEnum.PDF
                                            document_template.file_path = _file_key
                                            await session.commit()
                                    # First send the conversion success message
                                    # to the frontend
                                    push_event.event_type = SSEEventTypeEnum.template_convert_finished
                                    await sse_manager.push_message(push_event)
                                    # Finally restore push_event.event_type
                                    push_event.event_type = SSEEventTypeEnum.template_status_changed
                                else:
                                    LOG.error(f"pre_signed_url error : {post_data}")
                                    raise

                            pdf_handler = PdfHandler(full_filename_path)
                            # First extract the form field data
                            LOG.info("Extracting form area fields")
                            table_field_list = await asyncio.to_thread(
                                pdf_handler.read_form_area
                            )
                            if not table_field_list:
                                # Extract the tables in the pdf file
                                LOG.info("Extracting table fields from 'read_tables_by_camelot'")
                                table_field_list = await asyncio.to_thread(
                                    pdf_handler.read_tables_by_camelot, full_filename_path
                                )
                            if not table_field_list:  # fall back to table extraction
                                LOG.info("Extracting table fields")
                                table_field_list = await asyncio.to_thread(
                                    pdf_handler.read_tables, full_filename_path
                                )
                            if table_field_list:
                                LOG.info(f"Extracting table fields Successful: {len(table_field_list)}")
                                field_dict = document_template.field_dict
                                field_dict.update({DocumentTemplateFieldTypeEnum.auto: table_field_list})
                                document_template.field_dict.update(field_dict)

                                flag_modified(document_template, "field_dict")  # When updating a JSON field, it must be explicitly flagged
                                await session.commit()

                                # Tag the template and upload it
                                tag_full_filename_path = Path(full_filename_path).parent / f"area_tag_{gen_short_uuid(2)}.pdf"
                                await asyncio.to_thread(
                                    pdf_handler.create_pdf_from_area,
                                    full_filename_path,
                                    str(tag_full_filename_path),
                                    table_field_list,
                                    mode=DocumentTemplateFieldTypeEnum.auto,
                                    write_value=False  # Only tag, do not write data
                                )
                                if tag_full_filename_path.exists():
                                    # The pdf file was tagged successfully
                                    post_data.update({"file_name": tag_full_filename_path.name})

                                    # Upload the tagged pdf file to storage
                                    pre_signed_res = await CommonManager(
                                        db=session, request=get_mock_request()
                                    ).pre_signed_url(
                                        post_data["file_name"],
                                        post_data["category"],
                                        file_type=post_data["file_type"],
                                    )
                                    if pre_signed_res:
                                        with Path(tag_full_filename_path).open("rb") as f:
                                            new_file_key = pre_signed_res.get("key")
                                            data = f.read()
                                            upload_ok = await asyncio.to_thread(
                                                default_s3_client.upload_file, new_file_key, data
                                            )
                                            if upload_ok:  # Save new_file_key
                                                document_template.area_file_path = new_file_key
                                                document_template.status = DocumentTemplateStatusEnum.active.value
                                                await session.commit()
                                                # Push the status update
                                                push_event.payload.update({"status": DocumentTemplateStatusEnum.active.value})
                                        # Finally delete the temporary file
                                        await asyncio.to_thread(
                                            _safe_remove, str(tag_full_filename_path)
                                        )
                                LOG.info(f"Extracting tabl fields Done!")
                            else:
                                LOG.error("PDF extract table fields failed...")
                                document_template.status = DocumentTemplateStatusEnum.failed.value
                                push_event.payload.update({"status": DocumentTemplateStatusEnum.failed.value})
                                push_event.content = warning_message
                    # Finally delete the temporary file
                    await asyncio.to_thread(_safe_remove, full_filename_path)
                else:
                    LOG.error(f"Error downloading file {full_filename_path}")
                    document_template.status = DocumentTemplateStatusEnum.failed.value
                    push_event.payload.update({"status": DocumentTemplateStatusEnum.failed.value})
                    push_event.content = warning_message

                await session.commit()
            except Exception as e:
                LOG.error(f"template_extract_table_fields error: {e}")
            finally:
                # Push to the frontend
                await sse_manager.push_message(push_event)
        else:
            LOG.error(f"Document_template not found {template_id}")

    return {"template_id": template_id}


@db.task(queue="default", retries=1, retry_delay_s=60, store_result=False)
async def write_pdf_from_area(
        document_template_id: str,
        field_dict: dict,
        user_id: str,
        external_server: bool = False,
) -> dict:
    """
    Write the data into the PDF form fields.
    """
    output_pdf_file_path = None

    push_event = EventForm(
        event_type=SSEEventTypeEnum.template_status_changed,
        object_id=user_id,
        object_type=SSEEventTypeEnum.object_user,
        content="Document template stats changed...",
        payload={
            "status": DocumentTemplateStatusEnum.processing.value,
            "template_id": document_template_id,
        },
        page=InnerModelEnum.template,
    )
    try:
        await sse_manager.push_message(push_event)
        async with get_async_db_connector() as session:
            document_template_obj = await session.scalar(
                select(DocumentTemplate).where(DocumentTemplate.id == document_template_id)  # noqa
            )
            if not document_template_obj:
                LOG.error(f"Document_template not found {document_template_id}")
                LOG.error(f"Honker task ending: {document_template_id}")
                return {"template_id": document_template_id}
            push_event.payload.update({"space_id": document_template_obj.space_id})

            # Filter the template tags
            field_list = []
            auto_field_list = field_dict.get("auto", [])
            area_field_list = field_dict.get("area", [])
            for field_auto_value_dict in auto_field_list:
                for field_value in field_auto_value_dict["data"]:
                    if field_value.get("name") and field_value.get("checked"):  # Tag only when it has a name and is checked
                        field_value["page"] = field_auto_value_dict["page"]
                        if field_value.get("style") is None:
                            field_value["style"] = {}
                        field_list.append(field_value)
            for field_area_value in area_field_list:
                if field_area_value.get("name"):
                    if field_area_value.get("style") is None:
                        field_area_value["style"] = {}
                    field_list.append(field_area_value)

            # The file stream downloaded from storage
            pdf_stream = await asyncio.to_thread(
                default_s3_client.download_file_to_stream, document_template_obj.file_path
            )
            if not pdf_stream:
                LOG.error(
                    f"PDF write_pdf_from_area download_file_to_stream failed...: {document_template_obj.file_path}")
                LOG.error(f"Honker task ending: {document_template_id}")
                raise
            output_pdf_file_path = Path(TEMP_DIR) / f"area_tag_{gen_short_uuid(2)}.pdf"

            # Whether to call the external service for pdf tagging
            if not external_server:
                is_ok = await asyncio.to_thread(
                    PdfHandler().create_pdf_from_area,
                    None, str(output_pdf_file_path), field_list, pdf_stream, mode=None, write_value=False
                )
                if not is_ok:
                    LOG.error(f"PDF create_pdf_from_area download_file_to_stream failed...")
                    LOG.error(f"Honker task ending: {document_template_id}")
                    raise
            else:
                # --------------------
                # Use the external Node.js service for style modification

                input_file_url = default_s3_client.url(document_template_obj.file_path)
                await asyncio.to_thread(
                    PdfHandler().create_pdf_form_area_by_node_server,
                    input_file_url,
                    field_list
                )
                raise
                #
                # ---------------------

            file_content_type = FileExtEnum.get_upload_file_content_type(FileExtEnum.PDF)  # Get the pdf content_type
            post_data = {
                "file_name": Path(output_pdf_file_path).name,
                "category": InnerModelEnum.template,
                "file_type": file_content_type,
            }
            # First upload the converted pdf file to storage
            pre_signed_res = await CommonManager(
                db=session, request=get_mock_request()
            ).pre_signed_url(
                post_data["file_name"],
                post_data["category"],
                file_type=post_data["file_type"],
            )
            if pre_signed_res:
                with Path(output_pdf_file_path).open("rb") as f:
                    _file_key = pre_signed_res.get("key")
                    data = f.read()
                    upload_ok = await asyncio.to_thread(
                        default_s3_client.upload_file, _file_key, data
                    )
                    if upload_ok:  # Save
                        document_template_obj.area_file_path = _file_key
                        document_template_obj.status = DocumentTemplateStatusEnum.active.value
                        await session.commit()
                        push_event.payload.update({"status": DocumentTemplateStatusEnum.active.value})

    except Exception as e:
        LOG.error(f"honker tasks.template_task.write_pdf_from_area error: {e}...")
        LOG.error(f"Honker task ending: {document_template_id}")
        push_event.payload.update({"status": DocumentTemplateStatusEnum.failed.value})
    finally:
        # Notify the frontend
        await sse_manager.push_message(push_event)
        if output_pdf_file_path:
            await asyncio.to_thread(_safe_remove, str(output_pdf_file_path))

    return {"template_id": document_template_id}


def _safe_remove(file_path: str) -> None:
    """Delete the local temporary file; ignore it when absent.

    On Windows the handle may be briefly held by objects not yet collected or
    by a duplicate task run concurrently (honker visibility timeout reclaim can
    make the same task run again on a second worker, with both handlers landing
    on the same temporary path). Run gc first, then absorb the lock with short
    retries at 1s intervals.
    """
    if not file_path:
        return
    last_error = None
    for _ in range(5):
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
            return
        except OSError as e:
            last_error = e
            gc.collect()
            time.sleep(1)
    LOG.warning(f"remove temporary file {file_path} failed: {last_error}")
