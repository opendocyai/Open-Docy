# -*- coding: utf-8 -*-
# @Time    : 2025/10/17 17:13
# @Author  : yanjia
# @File    : schema.py
# @Desc    : None

from datetime import datetime, timezone

from pydantic import BaseModel, ConfigDict


class SchemaBase(BaseModel):
    """Base model configuration"""

    model_config = ConfigDict(
        use_enum_values=True,
        populate_by_name=True,  # Allow assigning by both alias and original name
        # Return UTC time
        json_encoders={datetime: lambda dt: dt.astimezone(timezone.utc).isoformat()},
    )
