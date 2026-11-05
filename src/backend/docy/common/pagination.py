#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from __future__ import annotations

from math import ceil
from typing import TYPE_CHECKING, Any, Generic, Sequence, TypeVar

from fastapi import Depends, Query
from fastapi_pagination import pagination_ctx
from fastapi_pagination.bases import AbstractPage, AbstractParams, RawParams
from fastapi_pagination.ext.sqlalchemy import apaginate
from fastapi_pagination.links.bases import create_links
from pydantic import BaseModel, Field

if TYPE_CHECKING:
    from sqlalchemy import Select
    from sqlalchemy.ext.asyncio import AsyncSession

T = TypeVar('T')
SchemaT = TypeVar('SchemaT')


class _CustomPageParams(BaseModel, AbstractParams):
    """Custom pagination parameters"""

    pageNumber: int = Query(1, ge=1, description='Page number')
    pageSize: int = Query(20, gt=0, le=500, description='Number of items per page')

    def to_raw_params(self) -> RawParams:
        return RawParams(
            limit=self.pageSize,
            offset=self.pageSize * (self.pageNumber - 1),
        )


class _PageDetails(BaseModel):
    """Pagination details"""

    results: list = Field([], description='Data list of the current page')
    count: int = Field(description='Total number of records')
    page: int = Field(description='Current page number')
    page_size: int = Field(description='Number of items per page')
    pages: int = Field(description='Total number of pages')
    next: str | None = Field(None, description='Next page link')
    previous: str | None = Field(None, description='Previous page link')


class _CustomPage(_PageDetails, AbstractPage[T], Generic[T]):
    """Custom pagination class"""

    __params_type__ = _CustomPageParams

    @classmethod
    def create(
        cls,
        items: list,
        params: _CustomPageParams,
        total: int = 0,
    ) -> _CustomPage[T]:
        page = params.pageNumber
        size = params.pageSize
        total_pages = ceil(total / size)
        links = create_links(
            first={'page': 1, 'size': size},
            last={'page': f'{ceil(total / size)}', 'size': size} if total > 0 else {'page': 1, 'size': size},
            next={'page': f'{page + 1}', 'size': size} if (page + 1) <= total_pages else None,
            prev={'page': f'{page - 1}', 'size': size} if (page - 1) >= 1 else None,
        )

        return cls(
            results=items,
            count=total,
            page=page,
            page_size=size,
            pages=total_pages,
            next=links.next,
            previous=links.prev
        )


class PageData(_PageDetails, Generic[SchemaT]):
    """
    Unified response model including the returned data schema; only for paginated endpoints

    E.g. ::

        @router.get('/test', response_model=ResponseSchemaModel[PageData[GetApiDetail]])
        def test():
            return ResponseSchemaModel[PageData[GetApiDetail]](data=GetApiDetail(...))


        @router.get('/test')
        def test() -> ResponseSchemaModel[PageData[GetApiDetail]]:
            return ResponseSchemaModel[PageData[GetApiDetail]](data=GetApiDetail(...))


        @router.get('/test')
        def test() -> ResponseSchemaModel[PageData[GetApiDetail]]:
            res = CustomResponseCode.HTTP_200
            return ResponseSchemaModel[PageData[GetApiDetail]](code=res.code, msg=res.msg, data=GetApiDetail(...))
    """

    results: Sequence[SchemaT]


async def paging_data(db: AsyncSession, select: Select) -> dict[str, Any]:
    """
    Create paginated data based on SQLAlchemy

    :param db: database session
    :param select: SQL query statement
    :return:
    """
    paginated_data: _CustomPage = await apaginate(db, select)
    page_data = paginated_data.model_dump()
    return page_data


# Pagination dependency injection
DependsPagination = Depends(pagination_ctx(_CustomPage))
