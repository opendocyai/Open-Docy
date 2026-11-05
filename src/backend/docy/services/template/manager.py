"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/17
Last Modified: 2025/6/17
Last Editor:
Filename: manager.py
Description: Document templates
"""
import os
from typing import Dict, List, Optional
from pathlib import Path

from loguru import logger
from sqlalchemy import select

from docy.bases.base_manager import BaseManager
from docy.core.storage_drivers import default_s3_client
from docy.core._string import gen_snowflake_id, gen_short_uuid
from docy.crud.template import template_dao
from docy.exceptions import exception as E
from docy.models.tb_template import DocumentTemplate
from docy.schema.template import DocumentTemplateCreateSchema
from docy.services.template.tasks import (
    extract_template_table_fields,
    write_pdf_from_area,
)
from docy.services.audit.helper import audit
from docy.schema.audit import ResourceType, Action, Outcome
from docy.utils.enums import (
    DocumentTemplateFieldTypeEnum,
    DocumentTemplateStatusEnum,
)

LOG = logger.bind(module="template")


def generate_file_key(file_full_path_name: Path | str, category: str = "default") -> str:
    """
    Generate the upload file key.
    """
    if isinstance(file_full_path_name, str):
        file_full_path_name = Path(file_full_path_name)

    return f"{category}/{file_full_path_name.stem}-{gen_short_uuid(2)}{file_full_path_name.suffix}"


class DocumentTemplateManager(BaseManager):
    """
    Document template management.
    """

    model = DocumentTemplate

    async def get_template_by_id(self, tpl_id: str) -> Optional[DocumentTemplate]:
        """
        Get the document template details.
        """
        return await template_dao.select_model(self.db, pk=tpl_id, is_delete=False)

    async def get_template_list(self, **kwargs) -> List[DocumentTemplate]:
        """Get the document template list."""
        if "name" in kwargs and kwargs["name"]:
            kwargs["name__like"] = f'%{kwargs.pop("name")}%'
        return await template_dao.get_list(self.db, **kwargs)

    async def get_template_page_query_set(
            self, **kwargs
    ) -> List[List[DocumentTemplate]]:
        """Get the request queryset."""

        kwargs = await template_dao.attach_sort_columns_orders_info(self.model, kwargs)

        # Filter conditions
        if "name" in kwargs:
            if kwargs["name"] is not None:
                kwargs["name__like"] = f'%{kwargs.pop("name")}%'
            else:
                kwargs.pop("name", None)

        return await template_dao.get_query_set(**kwargs)

    async def create_template_record(
            self, space_id: str, name: str, ext: str, file_path: str, field_dict=None
    ) -> str:
        """
        Create a document upload record.
        """
        if field_dict is None:
            field_dict = {}

        user_id = self.request.user.id
        create_template_schema = DocumentTemplateCreateSchema(
            space_id=space_id,
            name=name,
            ext=ext,
            file_path=file_path,
            uploader=user_id,
            modifier=user_id,
            field_dict=field_dict,
            status=DocumentTemplateStatusEnum.processing.value
        )
        try:
            document_template_obj = await template_dao.create_model(
                self.db, create_template_schema, flush=True, commit=True
            )
            if not field_dict:
                # The honker task downloads the document, extracts the table
                # data and writes it into the document template.
                # Direct call enqueues (equivalent to the legacy celery .delay);
                # the function body is consumed asynchronously by the honker
                # worker.
                extract_template_table_fields(document_template_obj.id, file_path)

        except Exception as e:
            LOG.error(f"create_template_record error: {e.args}")
            raise E.InternalServerError

        # Audit record: template creation; payload contains the template name
        # and file extension.
        await audit(self.request, self.db).write_quick(
            chain_id=f"{space_id}--{ResourceType.TEMPLATE.value}",
            resource_type=ResourceType.TEMPLATE,
            resource_id=document_template_obj.id,
            action=Action.CREATE,
            outcome=Outcome.SUCCESS,
            payload={"name": name, "ext": str(ext), "space_id": space_id},
        )

        return document_template_obj.id

    async def delete_document_template(
            self, template_id: str, soft_delete: bool = True
    ):
        """
        Delete a document template.
        """
        db_template = await template_dao.select_model(
            self.db, pk=template_id, is_delete=False
        )
        if db_template:
            # Delete the file

            if not soft_delete:
                await self.db.delete(db_template)
                await self.db.commit()
            else:
                await self.model.soft_async_delete(db_template)

            # Audit record.
            await audit(self.request, self.db).write_quick(
                chain_id=f"{db_template.space_id}--{ResourceType.TEMPLATE.value}",
                resource_type=ResourceType.TEMPLATE,
                resource_id=template_id,
                action=Action.DELETE,
                outcome=Outcome.SUCCESS,
                payload={"name": db_template.name},
            )
        else:
            raise E.ObjectNotFound()

        return None

    async def delete_many_document_template(
            self, tpl_ids: List[str], soft_delete: bool = True
    ) -> int:
        """
        Delete multiple records.
        """
        # The s3 files must be deleted

        # Query the space_id and template names before deletion for the audit
        # payload.
        space_id = ""
        template_names = {}
        if tpl_ids:
            first_tpl = await template_dao.select_model(self.db, pk=tpl_ids[0], is_delete=False)
            if first_tpl:
                space_id = first_tpl.space_id
            # Fetch the names of all templates to be deleted in bulk (avoid
            # per-row queries)
            result = await self.db.execute(
                select(DocumentTemplate.id, DocumentTemplate.name).where(
                    DocumentTemplate.id.in_(tpl_ids), DocumentTemplate.is_delete == False
                )
            )
            template_names = dict(result.all())

        delete_rows = await template_dao.delete_model_by_column(
            self.db,
            allow_multiple=True if len(tpl_ids) > 1 else False,
            logical_deletion=soft_delete,
            deleted_flag_column="is_delete",
            deleted_at_column="delete_at",
            commit=True,
            id__in=tpl_ids,
            is_delete=False
        )

        # Audit record: template batch delete writes a single record with the
        # deleted templates in the payload.
        if tpl_ids:
            _names = [template_names.get(tpl_id, "") for tpl_id in tpl_ids]
            await audit(self.request, self.db).write_quick(
                chain_id=(
                    f"{space_id}--{ResourceType.TEMPLATE.value}"
                    if space_id
                    else ResourceType.TEMPLATE.value
                ),
                resource_type=ResourceType.TEMPLATE,
                resource_id=space_id or "batch",
                action=Action.BATCH_DELETE,
                outcome=Outcome.SUCCESS,
                payload={"name": _names, "ids": list(tpl_ids), "count": len(tpl_ids)},
            )

        return delete_rows

    async def update_document_template_field(
            self, tpl_id: str, field_dict: Dict[str, List]
    ):
        """Update the document template fields

        @param field_dict: Dict[str, List]

        {
          "area": [
            {
              "id": "string",
              "name": "string",
              "value": "string",
              "checked": true,
              "name_cell": {
                "x1": 0,
                "y1": 0,
                "x2": 0,
                "y2": 0
              },
              "value_cell": {
                "x1": 0,
                "y1": 0,
                "x2": 0,
                "y2": 0
              },
              "page": 0,
              "style": {
                "font_name": "string",
                "font_size": 0,
                "text_color": "string",
                "border_color": "string",
                "border_width": 0,
                "border_style": "string",
                "background_color": "string"
              }
            }
          ],
          "auto": [
            {
              "id": "string",
              "name": "string",
              "value": "string",
              "checked": true,
              "name_cell": {
                "x1": 0,
                "y1": 0,
                "x2": 0,
                "y2": 0
              },
              "value_cell": {
                "x1": 0,
                "y1": 0,
                "x2": 0,
                "y2": 0
              },
              "page": 0,
              "style": {
                "font_name": "string",
                "font_size": 0,
                "text_color": "string",
                "border_color": "string",
                "border_width": 0,
                "border_style": "string",
                "background_color": "string"
              }
            }
          ]
        }

        """

        document_template_obj = await self.get_template_by_id(tpl_id)
        if not document_template_obj:
            raise E.ObjectNotFound()
        template_update_data = {
            "field_dict": document_template_obj.field_dict,
            "status": DocumentTemplateStatusEnum.processing.value  # The status becomes processing
        }

        # Selection of auto-extracted data
        auto_field_list = field_dict.get(DocumentTemplateFieldTypeEnum.auto)
        if auto_field_list:
            add_field_page_dict = {}
            if document_template_obj.field_dict:
                # The existing auto-scan field list
                raw_auto_field_list = document_template_obj.field_dict.get(DocumentTemplateFieldTypeEnum.auto, [])
                field_id_checked_dict = {}
                for _field in auto_field_list:
                    page = _field["page"]
                    if not _field.get("id"):
                        _field["id"] = gen_snowflake_id()
                        # Add directly
                        if page in add_field_page_dict:
                            add_field_page_dict[page].append(_field)
                        else:
                            add_field_page_dict[page] = [_field]
                    else:
                        field_id_checked_dict[_field.get("id")] = _field
                if raw_auto_field_list:
                    for raw_auto_field in raw_auto_field_list:
                        row_field_data_list = raw_auto_field.get("data", [])
                        for field_data in row_field_data_list:
                            if field_data.get("id") in field_id_checked_dict:
                                # Update when the compared IDs are equal
                                field_data.update(field_id_checked_dict[field_data["id"]])
                        if add_field_page_dict:
                            if raw_auto_field["page"] in add_field_page_dict:
                                raw_auto_field["data"].extend(add_field_page_dict[raw_auto_field["page"]])

                # Update the data
                document_template_obj.field_dict.update({DocumentTemplateFieldTypeEnum.auto: raw_auto_field_list})
                template_update_data["field_dict"].update({DocumentTemplateFieldTypeEnum.auto: raw_auto_field_list})

        # Custom area selection
        area_field_list = field_dict.get(DocumentTemplateFieldTypeEnum.area)
        if area_field_list:
            for area_field_dict in area_field_list:
                if not area_field_dict.get("id"):
                    area_field_dict["id"] = gen_snowflake_id()
            template_update_data["field_dict"].update({DocumentTemplateFieldTypeEnum.area: area_field_list})
        else:  # Erase the area selection
            raw_area_field_list = document_template_obj.field_dict.get(DocumentTemplateFieldTypeEnum.area, [])
            if raw_area_field_list:
                template_update_data["field_dict"].update({DocumentTemplateFieldTypeEnum.area: []})
                if document_template_obj.area_file_path:
                    # Restore the file to the original file
                    template_update_data["area_file_path"] = document_template_obj.file_path

        await template_dao.update_model(self.db, document_template_obj.id, template_update_data, commit=True)

        # Audit record: template field update; payload contains the template
        # name and updated_fields.
        await audit(self.request, self.db).write_quick(
            chain_id=f"{document_template_obj.space_id}--{ResourceType.TEMPLATE.value}",
            resource_type=ResourceType.TEMPLATE,
            resource_id=tpl_id,
            action=Action.UPDATE,
            outcome=Outcome.SUCCESS,
            payload={
                "name": document_template_obj.name,
                "updated_fields": ["field_dict", "status"],
            },
        )

        # Call the honker async task to tag the template (direct call enqueues,
        # equivalent to the legacy celery .delay)
        write_pdf_from_area(document_template_obj.id, template_update_data["field_dict"], self.request.user.id)
        # Uncomment when debugging

    async def update_document_template_key(self, tpl_id: str, file_key: str):
        """Update the document template s3 key."""
        document_template_obj = await self.get_template_by_id(tpl_id)
        if not document_template_obj:
            raise E.ObjectNotFound()

        document_template_obj.file_path = file_key
        await self.db.commit()
        await self.db.refresh(document_template_obj)

        # Follow-up operations

    async def get_template_s3_download_url(self, tpl_id: str) -> Optional[str]:
        """Get the document s3 download URL."""

        document_template = await self.get_template_by_id(tpl_id)
        if not document_template:
            raise E.ObjectNotFound()

        return (
            default_s3_client.url(document_template.file_path)
            if document_template.file_path
            else None
        )

    @staticmethod
    def upload_file(area_file_path: Path | str, delete_raw_file: bool, delete_file_path: str) -> str | None:
        """
        Upload a file.

        @param area_file_path: Path | str
        @param delete_raw_file: bool  Whether to delete the original file
        @param delete_file_path: str Delete the existing key
        """
        try:
            if isinstance(area_file_path, str):
                area_file_path = Path(area_file_path)

            with area_file_path.open("rb") as area_file:
                data = area_file.read()
                file_key = generate_file_key(area_file_path)
                blob = default_s3_client.upload_file(file_key, data, delete_key=delete_file_path)

            if delete_raw_file:
                if blob:
                    os.remove(area_file_path)

            return file_key
        except Exception as e:
            LOG.error(f"DocumentTemplateManager.upload_file failed: {str(e)}")

        return None

    async def extract_table_fields(self, tpl_id: str):
        """
        Extract the PDF table fields.
        """
        document_template = await self.get_template_by_id(tpl_id)
        if not document_template:
            raise E.ObjectNotFound()
        document_template.area_file_path = None
        document_template.status = DocumentTemplateStatusEnum.processing.value
        self.db.add(document_template)
        await self.db.commit()

        # The honker task downloads the document, extracts the table data and
        # writes it into the document template.

        extract_template_table_fields(document_template.id, document_template.file_path, True)

    async def get_template_option_list(self, name: Optional[str] = None, **kwargs):
        """
        Get the unpaginated document template option list.
        """
        filters = {"is_delete": False, **kwargs}
        if name:
            filters["name__like"] = f"%{name}%"  # noqa

        return await template_dao.select_models(self.db, **filters)
