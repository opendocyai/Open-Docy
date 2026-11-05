"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/8/7
Last Modified: 2025/8/7
Last Editor:
Filename: _time
Description: time handling helpers.
"""

from typing import Optional
import pytz
from datetime import datetime
from dateutil.relativedelta import relativedelta
from docy.exceptions import exception as E


def trans_timestamp_to_utc(stamp: str | int = None) -> Optional[str]:
    """
    Convert a timestamp to an ISO UTC time string.

    :int: 10-digit timestamp
    """
    if not stamp:
        return
    try:
        if isinstance(stamp, str):
            stamp = int(stamp[:10])
        dt = datetime.fromtimestamp(stamp, tz=pytz.utc)
        return dt.isoformat(timespec='seconds')
    except (ValueError, TypeError):
        raise ValueError("Invalid time stamp.")


def trans_timestamp_to_utc_time(stamp: str | int = None) -> Optional[datetime]:
    if not stamp:
        return
    try:
        stamp = int(str(stamp)[:10])
        return datetime.fromtimestamp(stamp, tz=pytz.utc)
    except (ValueError, TypeError):
        raise ValueError("Invalid time stamp.")


def check_date_range(date_range, months: int = 1):
    """
    Check whether the date range is valid.

    :dict: dict containing min and max
    """
    if not all([date_range.min, date_range.max]) or date_range.min > date_range.max:
        raise E.InvalidArguments
    if date_range.min + relativedelta(months=months) < date_range.max:
        date_range.max = date_range.min + relativedelta(months=1) + relativedelta(days=1)
    return date_range