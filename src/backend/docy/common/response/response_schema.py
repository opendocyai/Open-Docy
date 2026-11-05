# -*- coding: utf-8 -*-
# @Time    : 2025/9/19 14:02
# @Author  : yanjia
# @File    : response_schema.py
# @Desc    : None
from typing import Any, Generic, TypeVar

from fastapi import Response
from pydantic import BaseModel, Field

from .serializers import MsgSpecJSONResponse
from .response_code import CustomResponse, CustomResponseCode

SchemaT = TypeVar('SchemaT')


class ResponseModel(BaseModel):
    """
    Generic unified response model without the returned data schema

    Example::

        @router.get('/test', response_model=ResponseModel)
        def test():
            return ResponseModel(data={'test': 'test'})


        @router.get('/test')
        def test() -> ResponseModel:
            return ResponseModel(data={'test': 'test'})


        @router.get('/test')
        def test() -> ResponseModel:
            res = CustomResponseCode.HTTP_200
            return ResponseModel(code=res.code, msg=res.msg, data={'test': 'test'}, status="success")
    """

    code: int = Field(CustomResponseCode.HTTP_200.code, description='Response status code')
    msg: str = Field(CustomResponseCode.HTTP_200.msg, description='Response message')
    data: Any | None = Field(None, description='Response data')
    status: str = Field(..., description='Response status; success: succeeded; error: failed')


class ResponseSchemaModel(ResponseModel, Generic[SchemaT]):
    """
    Generic unified response model including the returned data schema;
    only for non-paginated endpoints

    Example::

        @router.get('/test', response_model=ResponseSchemaModel[GetApiDetail])
        def test():
            return ResponseSchemaModel[GetApiDetail](data=GetApiDetail(...))


        @router.get('/test')
        def test() -> ResponseSchemaModel[GetApiDetail]:
            return ResponseSchemaModel[GetApiDetail](data=GetApiDetail(...))


        @router.get('/test')
        def test() -> ResponseSchemaModel[GetApiDetail]:
            res = CustomResponseCode.HTTP_200
            return ResponseSchemaModel[GetApiDetail](code=res.code, msg=res.msg, data=GetApiDetail(...))
    """

    data: SchemaT


class ResponseBase:
    """Unified response methods"""

    @staticmethod
    def __response(
        *,
        res: CustomResponseCode | CustomResponse = None,
        data: Any | None = None,
        status: str = "success"
    ) -> ResponseModel | ResponseSchemaModel:
        """
        Generic response method

        :param res: response message
        :param data: response data
        :return:
        """
        return ResponseModel(code=res.code, msg=res.msg, data=data, status=status)

    def success(
        self,
        *,
        res: CustomResponseCode | CustomResponse = CustomResponseCode.HTTP_200,
        data: Any | None = None,
    ) -> ResponseModel | ResponseSchemaModel:
        """
        Success response

        :param res: response message
        :param data: response data
        :return:
        """
        return self.__response(res=res, data=data)

    def fail(
        self,
        *,
        res: CustomResponseCode | CustomResponse = CustomResponseCode.HTTP_400,
        data: Any = None,
    ) -> ResponseModel | ResponseSchemaModel:
        """
        Failure response

        :param res: response message
        :param data: response data
        :return:
        """
        return self.__response(res=res, data=data, status="error")


    def format(
        self,
        *,
        res: CustomResponseCode | CustomResponse = CustomResponseCode.HTTP_200,
        data: Any | None = None,
    ) -> ResponseModel | ResponseSchemaModel:
        """
        Success response

        :param res: response message
        :param data: response data
        :return:
        """
        return self.__response(res=res, data=data)

    @staticmethod
    def fast_success(
        *,
        res: CustomResponseCode | CustomResponse = CustomResponseCode.HTTP_200,
        data: Any | None = None,
    ) -> Response:
        """
        Created to speed up endpoint responses: significantly faster when
        serializing large JSON, but loses pydantic parsing and validation.

        .. warning::

            With this return method you must not specify the response_model
            endpoint parameter or the arrow return type.

        :param res: response message
        :param data: response data
        :return:
        """
        return MsgSpecJSONResponse({'code': res.code, 'msg': res.msg, 'data': data})


response_base: ResponseBase = ResponseBase()
