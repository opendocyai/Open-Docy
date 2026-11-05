"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: fields
Description:
"""

import pytz
from sqlalchemy.types import JSON, DateTime, TypeDecorator
from docy.exceptions import exception as PE


class JSONList(TypeDecorator):
    """A custom JSON type that defaults to a list."""

    impl = JSON

    def __init__(self, *args, **kwargs):
        # Get the nullable argument from kwargs and store it as an instance attribute
        self._nullable = kwargs.pop("nullable", False)
        super().__init__(*args, **kwargs)

    def process_bind_param(self, value, dialect):
        """Ensure the data is a list type; called before storing in the database."""
        if value is None:
            if not self._nullable:
                return []
            return None
        # Backward compat with old data: wrap a string into a list
        if isinstance(value, str):
            return [value]
        if not isinstance(value, list):
            raise PE.InvalidParameters("'JSONList' expected a list.")
        return value

    def process_result_value(self, value, dialect):
        # Post-processing after reading from the database: return [] when not nullable
        if value is None:
            return [] if not self._nullable else None
        # Backward compat with old data: wrap a string into a list
        if isinstance(value, str):
            return [value]
        return value


class JSONDict(JSONList):
    """A custom JSON type that defaults to a dict."""

    impl = JSON
    cache_ok = True

    def process_bind_param(self, value, dialect):
        """Ensure the data is a dict type; called before storing in the database."""
        if value is None:
            if not self._nullable:
                return {}
            return None
        if not isinstance(value, dict):
            raise PE.InvalidParameters("'JSONDict' expected a dict.")
        return value

    def process_result_value(self, value, dialect):
        # Post-processing after reading from the database: return {} when not nullable
        if value is None:
            return {} if not self._nullable else None
        return value


class UTCDateTime(TypeDecorator):
    """
    A DateTime type that stores UTC in the database and returns UTC-aware datetime objects.
    """

    impl = DateTime
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        if value.tzinfo is None:
            value = pytz.UTC.localize(value)
        return value.astimezone(pytz.UTC).replace(tzinfo=None)

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        return pytz.UTC.localize(value)
