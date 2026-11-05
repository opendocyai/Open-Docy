# -*- coding: utf-8 -*-
# @Time    : 2025/6/13 15:50
# @Author  : yanjia
# @File    : constants.py
# @Desc    : Constants
from enum import Enum


class TeamspaceRedisKeys(Enum):

    INVITE_LINK_KEY = "teamspace_invite_link:"
    INVITE_LINK_EXPIRE = 86400  # 1 day