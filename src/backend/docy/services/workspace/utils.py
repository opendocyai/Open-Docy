# -*- coding: utf-8 -*-
# @Time    : 2025/6/13 15:49
# @Author  : yanjia
# @File    : utils.py
# @Desc    : None

from docy.core.settings import project_settings as settings


async def send_email(email: str, template_name: str, **kwargs):
    """
    Emails can be sent here.
    """
    # Find the email template
    _t = settings.system.templates.get_template(template_name)
    html_body = _t.render(**kwargs)
    task_id = await email_handle.send_email(to=[email], html=html_body, sub=kwargs.get("sub", None))

    return task_id
