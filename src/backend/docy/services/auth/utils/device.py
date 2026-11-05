# -*- coding: utf-8 -*-
# @Time    : 2026/5/26
# @Author  : yanjia
# @File    : device.py
# @Desc    : OAuth browser device utility functions
import secrets

from fastapi import Request, Response

BROWSER_ID_COOKIE_KEY = "oauth_bid"  # persistent cookie key
BROWSER_ID_COOKIE_MAX_AGE = 30 * 24 * 3600  # 1 month


def get_or_create_browser_id(request: Request, response: Response) -> str:
    """Get or generate a unique browser ID from the cookie (httponly, tamper-resistant)"""
    browser_id = request.cookies.get(BROWSER_ID_COOKIE_KEY)
    if not browser_id:
        browser_id = secrets.token_urlsafe(32)
        response.set_cookie(
            key=BROWSER_ID_COOKIE_KEY,
            value=browser_id,
            max_age=BROWSER_ID_COOKIE_MAX_AGE,
            path="/",
            httponly=True,
            samesite="lax",
        )
    return browser_id
