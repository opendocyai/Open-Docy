# -*- coding: utf-8 -*-
# @Time    : 2025/10/30 17:10
# @Author  : yanjia
# @File    : base.py
# @Desc    : None
from typing import Optional
from datetime import datetime, timezone
from pydantic import BaseModel, Field, field_serializer, ConfigDict


class SchemaBase(BaseModel):
    """Base model config"""

    model_config = ConfigDict(
        use_enum_values=True,
        populate_by_name=True,  # Allow assigning by both alias and original name
        json_encoders={datetime: lambda dt: dt.astimezone(timezone.utc).isoformat()},  # Return UTC time
    )



class SchemaResponseBase(SchemaBase):
    id: str = Field(description='Unique id')

    update_at: Optional[datetime] = Field(None, description='Update time')
    created_at: datetime = Field(..., description='Creation time')

    @field_serializer("update_at")
    def serialize_update_at(self, dt: datetime) -> Optional[str]:
        if dt:
            return dt.astimezone(timezone.utc).isoformat()
        return None

    @field_serializer("created_at")
    def serialize_created_at(self, dt: datetime) -> Optional[str]:
        if dt:
            return dt.astimezone(timezone.utc).isoformat()
        return None

class SchemaBatchDeleteBase(BaseModel):

    ids: list[str] = Field(description="List of ids")