# -*- coding: utf-8 -*-
# @Time    : 2025/11/21 17:30
# @Author  : yanjia
# @File    : node.py
# @Desc    : None
from typing import Optional

from fastapi import (
    APIRouter,
    Depends,
    Request,
    Path,
    Query,
)
from sqlalchemy.ext.asyncio import AsyncSession

from loguru import logger

from docy.core._response import pre_response as R
from docy.services.agent.custom_node import CustomNodeManager
from docy.exceptions.exception import InvalidOperationCode
from docy.schema.custom_node import (
    CustomComponentRequest,
    CreateCustomComponent,
    ResponseCustomComponent,
    CheckSaveResponseCustomComponent,
)
from docy.database import api_async_db
from docy.cache.cache_utils import get_from_cache

from docy.services.auth.utils.dependencies import oauth2_scheme

router = APIRouter(tags=["Agent Node"], prefix="/node")
LOG = logger.bind(module="node")

# Response code mapping of the old common.response:
#   R.fail(res=CustomErrorCode.VALUE_IS_REQUIRED) -> code=400, msg="Value is required", status="error"
#   R.format(data=..., res=CustomResponseCode.HTTP_400) -> code=400, msg="operation error.", status="success"
#   R.fail() -> code=400, msg="operation error.", status="error"
OPERATION_ERROR_MSG = "operation error."


@router.post("/{node_id}/check_save", summary="Node code check save")
async def custom_node_check_save(
    request: Request,
    raw_code: CustomComponentRequest,
    node_id: str = Path(description="node id"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Node code check save."""
    code_result = {}
    # Variable validation: required variable values must be filled in
    required_variables = []
    if raw_code.variables:
        for variable in raw_code.variables:
            if variable.required:
                if not variable.value:
                    return R.format(msg="Value is required", code=400, status="error")
            else:
                if variable.value is None:  # update None values when the variable value is None
                    required_variables.append(variable)
            if variable.value:
                if variable.value != "*" * len(variable.value): # do not submit if the value is all *
                    required_variables.append(variable)
    try:
        ast_result = await CustomNodeManager.check_syntax(raw_code.code)
        code_result = await CustomNodeManager.validate_imports_and_extract_class_vars(raw_code.code, ast_result)
    except ModuleNotFoundError as exc:
        LOG.error(f"ModuleNotFoundError error: {exc}")
        msg = getattr(exc, "msg", None)
        if msg:
            return R.format(data={"error": msg}, msg=OPERATION_ERROR_MSG, code=400)
        # Old code read exc.msg here (ModuleNotFoundError has no such attribute,
        # causing 500); now return the missing module name instead
        return R.format(data={"error": str(exc)}, msg=OPERATION_ERROR_MSG, code=400)
    except NameError as exc:
        LOG.error(f"NameError error: {exc}")
        args = getattr(exc, "args", None)
        if args:
            return R.format(data={"error": args[0]}, msg=OPERATION_ERROR_MSG, code=400)
    except Exception as exc:
        LOG.error(f"check_syntax error: {exc}")
        detail = getattr(exc, "detail", None)
        if detail:
            return R.format(data={"error": detail}, msg=OPERATION_ERROR_MSG, code=400)
        else:
            if getattr(exc, "args", None):
                return R.format(data={"error": exc.args[0]}, msg=OPERATION_ERROR_MSG, code=400)
        return R.format(data={"error": str(exc)}, msg=OPERATION_ERROR_MSG, code=400)

    if code_result:
        info = await get_from_cache(raw_code.agent_code) or {}
        agent_id = info.get("agent_id")
        if not agent_id:
            LOG.error(f"custom_node_check_save error: invalid operation code '{raw_code.agent_code}'. ")
            raise InvalidOperationCode

        node_result = await CustomNodeManager(db=db, request=request).save_or_update_node(
            node=CreateCustomComponent(
                node_id=node_id,
                agent_id=agent_id,
                name=code_result.get("name", ""),
                display_name=code_result.get("display_name", ""),
                description=code_result.get("description", ""),
                code=raw_code.code,
                extra=code_result,
                is_extract=raw_code.is_extract,
            ),
            required_variables=required_variables,
            code_result_variables=code_result.get("variables", []),
        )
        data = CheckSaveResponseCustomComponent.model_validate(node_result).model_dump()
        return R.format(data=data)
    else:
        LOG.error(f"parse custom node code error: {raw_code.model_dump()}; code_result: {code_result}")
        return R.format(msg=OPERATION_ERROR_MSG, code=400, status="error")


@router.get("/{node_id}/get_code", summary="Get node code data")
async def get_custom_node_code(
    request: Request,
    node_id: str = Path(description="node id"),
    agent_code: str = Query(None, description='agent code'),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get node code data <br>"""
    if agent_code:
        if len(agent_code) > 18:  # if the frontend passes 18+ characters, treat it as an agent code
            info = await get_from_cache(agent_code) or {}
            agent_id = info.get("agent_id")
            if not agent_id:
                LOG.error(
                    f"custom_node_check_save error: invalid operation code '{agent_code}'. "
                )
                raise InvalidOperationCode
        else:
            agent_id = agent_code
    else:
        agent_id = None
    data = await CustomNodeManager(db=db, request=request).get_custom_node(node_id=node_id, agent_id=agent_id)
    # Set the calling permission type
    if data:
        setattr(data, "auth_type", request.scope.get("auth_type"))
        data = ResponseCustomComponent.model_validate(data).model_dump()

    return R.format(data=data)
