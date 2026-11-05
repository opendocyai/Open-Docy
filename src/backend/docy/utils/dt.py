# -*- coding: utf-8 -*-
# @Time    : 2025/7/17 10:23
# @Author  : yanjia
# @File    : dt.py
# @Desc    : None
from datetime import date, datetime, timedelta, UTC
from typing import List

DATE_STANDARD_FORMAT = "%Y-%m-%d"
DATETIME_STANDARD_FORMAT = "%Y-%m-%d %H:%M:%S"
DATETIME_SIMPLE_FORMAT = "%Y%m%d%H:%M:%S"

def get_current_time() -> datetime:
    """Get the current time."""
    return datetime.now()


def get_current_utc_time() -> datetime:
    """Get the current UTC time."""
    return datetime.now(UTC)


def list_dates_between(start: date | str, end: date | str, fmt=DATE_STANDARD_FORMAT) -> List[str]:
    """
    List all dates between the two given dates.
    """
    s = datetime.strptime(start, fmt) if isinstance(start, str) else start
    e = datetime.strptime(end, fmt) if isinstance(end, str) else end
    step = timedelta(days=1)

    dates = []
    while s <= e:
        dates.append(s.strftime(fmt))
        s += step

    return dates
