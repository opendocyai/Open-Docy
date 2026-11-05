"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/9
Last Modified: 2025/6/9
Last Editor:
Filename: __init__.py
Description: Validation forms for view function parameters
"""
import json
from typing import Optional, Any, ClassVar, List
from datetime import datetime, timezone
from fastapi import Depends

from pydantic import BaseModel, Field, field_validator


class LockForm(BaseModel):
    # The following two fields form the lock name
    resource_type: str
    resource_id: str

    # The following fields are stored in redis
    lock_user_id: str  # User who acquired the lock
    lock_user_name: str  # Name of the user who acquired the lock


class EventForm(BaseModel):
    event_type: str  # Event type
    object_id: Optional[str] = None  # Object id
    object_type: Optional[str] = None  # Object type, e.g. user, space
    content: Optional[str] = None  # Event content to send
    payload: Optional[str | dict] = None  # Extra event info, stored as a JSON string
    page: Optional[str] = None  # Tells the frontend which page listens

    @field_validator('payload')
    def validate(cls, value: Any) -> [str | None]:
        if value is not None:
            if isinstance(value, str):
                try:
                    json.loads(value)
                    return value
                except json.JSONDecodeError as e:
                    raise ValueError(f'Invalid JSON payload: {e}')
        return value


def get_date_range(field_name: str):
    return Depends(DateTimeRange(field_name)())


def min(self):
    return getattr(self, self.field_names[0], None)


def max(self):
    return getattr(self, self.field_names[-1], None)


def validator_func(value, field):
    """
    Convert input times to UTC
    """
    if isinstance(value, datetime):
        if value.tzinfo is None:
            raise ValueError(f"Field '{field}' must include timezone information")
        return value.astimezone(timezone.utc).replace(tzinfo=None)
    return value


class TimeRangeField:
    suffixes = ["after", "before"]


class DateTimeRange:
    widget = TimeRangeField

    def __init__(self, field_name, widget=None):
        fields = [datetime, datetime]
        if widget:
            self.widget = widget
        self.field_names = self.rename(field_name)
        self.annotations = zip(self.rename(field_name), fields)

    def rename(self, field_name):
        return [f'{field_name}_{i}' for i in self.widget.suffixes]

    def __call__(self, *args, **kwargs):
        field_names = []
        annotations = {'field_names': ClassVar[List[str]]}
        for name, _t in self.annotations:
            field_names.append(name)
            annotations[name] = Optional[_t]

        namespace = {
            '__annotations__': annotations,
            'field_names': field_names
        }

        for name in field_names:
            namespace[name] = Field(default=None)

        DateTimeRangeForm = type('DateTimeRangeForm', (BaseModel,), namespace)

        # Add min and max properties
        @property
        def min(self):
            return getattr(self, field_names[0], None)

        @min.setter
        def min(self, value):
            setattr(self, field_names[0], value)

        @property
        def max(self):
            return getattr(self, field_names[-1], None)

        @max.setter
        def max(self, value):
            setattr(self, field_names[-1], value)

        DateTimeRangeForm.min = min
        DateTimeRangeForm.max = max

        # Bind validators
        for name in field_names:
            @field_validator(name, mode="after", check_fields=False)
            def validator(cls, value, field=name):
                return validator_func(value, field)

            setattr(DateTimeRangeForm, f"{name}_validator", validator)

        return DateTimeRangeForm


class FileUploadForm(BaseModel):
    """Form for generating file upload links."""
    file_name: str  # File name
    category: Optional[str] = "default"  # Upload directory name, defaults to "default"
    file_type: Optional[str] = None  # File type
    file_size: Optional[int] = None  # File size
    file_tag: Optional[str] = None  # File MIME type, e.g. application/pdf
    file_metadata: Optional[dict] = None  # Custom extra file info
