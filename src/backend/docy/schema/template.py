"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/17
Last Modified: 2025/6/17
Last Editor:
Filename: template.py
Description: None
"""
from typing import Dict, List

from marshmallow import fields
from pydantic import BaseModel, Field

from docy.schema import BaseModelSchema, EnumMethodField

from docy.core.storage_drivers import default_s3_client
from docy.models.tb_template import DocumentTemplate
from docy.utils.enums import DocumentTemplateFieldTypeEnum, DocumentTemplateStatusEnum


class DocumentTemplateListSchema(BaseModelSchema):

    ext = EnumMethodField("ext")


    class Meta:
        model = DocumentTemplate
        load_instance = True  # deserialize to model instances
        exclude = (
            "is_delete",
            "delete_at",
            "uploader",
            "modifier",
            "field_dict",
        )


class DocumentTemplateDetailSchema(BaseModelSchema):

    ext = EnumMethodField("ext")

    file_download_url = fields.Method("get_file_download_url")
    area_file_download_url = fields.Method("get_area_file_download_url")

    class Meta:
        model = DocumentTemplate
        load_instance = True  # deserialize to model instances
        exclude = (
            "is_delete",
            "delete_at",
            "uploader",
            "modifier",
        )

    def get_file_download_url(self, obj: DocumentTemplate):

        return default_s3_client.url(obj.file_path) if obj and obj.file_path else None

    def get_area_file_download_url(self, obj: DocumentTemplate):

        return default_s3_client.url(obj.area_file_path)if obj and obj.area_file_path else None


class DocumentTemplateCreateSchema(BaseModel):
    """Document template creation model"""

    space_id: str
    name: str
    ext: str
    file_path: str
    uploader: str
    modifier: str
    field_dict: Dict = {}
    status: int = Field(DocumentTemplateStatusEnum.processing.value, description='Status')


class DocumentTemplateDeleteManySchema(BaseModel):

    tpl_ids: List[str]

class DocumentTemplateOptionListSchema(BaseModelSchema):
    """
    Document template option list (serialized)
    """
    custom_field_dict_list = fields.Method("get_custom_field_dict_list")
    file_key = fields.Str(attribute="area_file_path", data_key="file_key")

    class Meta:
        model = DocumentTemplate
        load_instance = True  # deserialize to model instances
        include_fk = True  # Allow foreign key columns in output
        fields = (
            "id",
            "name",
            "space_id",
            "created_at",
            "update_at",
            "custom_field_dict_list",
            "file_key",
            "status",
        )

    def get_custom_field_dict_list(self, obj: DocumentTemplate):
        """Custom field list"""
        new_field_dict_list = []
        final_field_dict_list = []
        if obj.field_dict:
            for filed_type, field_list in obj.field_dict.items():
                if filed_type == DocumentTemplateFieldTypeEnum.area:
                    final_field_dict_list.extend(field_list)
                if filed_type == DocumentTemplateFieldTypeEnum.auto:
                    for auto_field_dict in field_list:
                        auto_field_list = auto_field_dict.get("data", [])
                        page = auto_field_dict["page"]
                        for a_filed_dict in auto_field_list:
                            a_filed_dict["page"] = page
                        final_field_dict_list.extend(auto_field_list)

            for field in final_field_dict_list:
                # Only return selected fields
                if field.get("checked"):
                    new_field_dict_list.append(
                        {
                            "id": field.get("id"),
                            "name": field.get("name"),
                            "value": field.get("value"),
                            "page": field.get("page"),
                            "checked": field.get("checked"),
                        }
                    )

        return new_field_dict_list
