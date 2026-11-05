"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/18
Last Modified: 2025/6/18
Last Editor:
Filename: template.py
Description: Document templates
"""
from typing import Dict, List

from pydantic import BaseModel, Field, ValidationError, field_validator
from docy.utils.enums import DocumentTemplateFieldTypeEnum

class CellForm(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float

class FieldStyleForm(BaseModel):
    font_name: str = Field(None, description="Font")
    font_size: int = Field(None, description="Font size")
    text_color: str | tuple | None = Field(None, description="Text color")
    border_color: str | tuple | None = Field(None, description="Border color")
    border_width: int = Field(None, description="Border width")
    border_style: str = Field(None, description="Border style")
    background_color: str | tuple | None = Field(None, description="Background color")


class AreaTemplateFieldUpdateForm(BaseModel):
    id: str | None = Field(default=None, description="Field id")
    name: str = Field(description="Form field name")
    value: str = Field(default=None, description="Form field value")
    checked: bool = Field(description="Whether checked")
    name_cell: CellForm = Field(None, description="Name cell coordinates")
    value_cell: CellForm = Field(description="Value cell coordinates")
    page: int = Field(description="Page number")
    style: FieldStyleForm | None = Field(None, description="Field style")


class AutoTemplateFieldForm(BaseModel):

    id: str = Field(description='Field id')
    checked: bool = Field(description='Whether checked')
    name: str | None = Field(None, description='Name')


class AreaTemplateFieldListUpdateForm(BaseModel):
    area: List[AreaTemplateFieldUpdateForm] = Field(None, description="Custom area field list")
    auto: List[AreaTemplateFieldUpdateForm] = Field(None, description="Auto-detected field list")


class DocumentCreateForm(BaseModel):
    """Document template create form."""
    space_id: str = Field(..., description='Workspace id', min_length=1)
    file_key: str = Field(..., max_length=255, description='Document key in blob')
