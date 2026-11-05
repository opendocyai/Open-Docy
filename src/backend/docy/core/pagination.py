"""
Paginate queries
"""
import enum
import math

from typing import Dict, Generic, List, Optional, TypeVar, Tuple, Callable, Any
from collections import OrderedDict
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm.query import Query
from starlette.requests import Request

from docy.core.settings import project_settings as settings
from docy.exceptions import exception as PException


class OrderByType(enum.StrEnum):
    DESC = "desc"
    ASC = "asc"


T = TypeVar("T")


class Pagination:
    def __init__(
            self,
            request: Request,
            query_set: Query,
            page: int,
            pagesize: int,
            allow_empty_first_page: bool = True,
    ):
        self.allow_empty_first_page = allow_empty_first_page
        self.request = request
        self.query_set = query_set
        self.pagesize = self.trans_number(pagesize)
        self.page = self.validate_number(page)

    @property
    def count(self):
        return self.query_set.count()

    @property
    def total_pages(self):
        count = self.count
        pages = count // self.pagesize
        if count % self.pagesize:
            pages += 1
        return pages

    def has_next(self):
        return self.page < self.total_pages

    def has_previous(self):
        return self.page > 1

    def trans_number(self, number):
        try:
            if isinstance(number, float) and not number.is_integer():
                raise ValueError
            number = int(number)
        except (TypeError, ValueError):
            raise PException.PageNotAnInteger
        return number

    def validate_number(self, number):
        number = self.trans_number(number)
        if number < 1:
            raise PException.EmptyPage
        if number > self.total_pages:
            if number == 1 and self.allow_empty_first_page:
                pass
            else:
                raise PException.EmptyPage("That page contains no results")
        return number

    def get_next_link(self):
        if not self.has_next():
            return None
        page_number = self.validate_number(self.page + 1)
        return str(
            self.request.url.include_query_params(
                **{
                    settings.system.PAGE_QUERY_PARAM: page_number,
                    settings.system.PAGE_SIZE_QUERY_PARAM: self.pagesize,
                }
            )
        )

    def get_previous_link(self):
        if not self.has_previous():
            return None
        page_number = self.validate_number(self.page - 1)
        if page_number == 1:
            return str(
                self.request.url.remove_query_params(
                    [
                        settings.system.PAGE_QUERY_PARAM,
                        settings.system.PAGE_SIZE_QUERY_PARAM,
                    ]
                )
            )
        return str(
            self.request.url.include_query_params(
                **{
                    settings.system.PAGE_QUERY_PARAM: page_number,
                    settings.system.PAGE_SIZE_QUERY_PARAM: self.pagesize,
                }
            )
        )

    def get_paginated_data(self, data: List) -> Dict:
        result = OrderedDict(
            [
                ("count", self.count),
                ("next", self.get_next_link()),
                ("previous", self.get_previous_link()),
                ("results", data),
            ]
        )
        return result

    def get_result(self):
        skip = 0 if self.page == 1 else self.pagesize * (self.page - 1)
        return self.query_set.offset(skip).limit(self.pagesize)


class CommonParams:
    def __init__(self,  request: Request, page: int=None, page_size: int=None):
        self.paginated: bool = self._get_paginated(request)
        self.page: int = int(self._get_page(request)) if page is None else page
        self.page_size: int = int(self._get_page_size(request)) if page_size is None else page_size
        self.order_by: List[Tuple[str, str]] | None = self._get_order_by(request)

    def _get_page(self, request: Request) -> int:
        return request.query_params.get(settings.system.PAGE_QUERY_PARAM, 1)

    def _get_page_size(self, request: Request) -> int:
        return request.query_params.get(
            settings.system.PAGE_SIZE_QUERY_PARAM, settings.system.PAGE_SIZE
        )

    def _get_paginated(self, request: Request) -> bool:
        paginated = request.query_params.get(
            settings.system.PAGINATION_ENABLED, True
        )
        if paginated is None:
            return True
        else:
            try:
                return paginated.lower() in ('true', '1') if isinstance(paginated, str) else bool(int(paginated))
            except:
                return True

    def _get_order_by(self, request: Request) -> list[tuple[str, ...]] | None:
        order_by = request.query_params.getlist(settings.system.ORDER_BY_PARAM)
        if order_by:
            return [
                tuple(o.split("."))
                for o in order_by
                if len(o.split(".")) == 2
            ]
        return None

    def get_order_by_express(self, model: Generic[T]) -> list[Any] | None:
        order_by_exps = []
        for field, dis in self.order_by or []:
            if hasattr(model, field):
                f_func: Callable[..., Any] = getattr(getattr(model, field), dis)
                order_by_exps.append(f_func())
        if order_by_exps:
            return order_by_exps
        return None


class AsyncPagination(Generic[T]):  # Used to return paginated results of any type T
    def __init__(
            self,
            session: AsyncSession,
            query: select,
            page: int = 1,
            page_size: int = 10,
    ) -> None:
        self.session = session
        self.query = query
        self.page = max(page, 1)  # Ensure page is at least 1
        self.page_size = max(page_size, 1)  # Ensure page_size is at least 1

    async def get_total(self) -> int:
        """Get the total record count matching the query"""
        try:
            # Get the main table in the query
            # Main table of the query: self.query.froms

            count_query = select(func.count()).select_from(self.query.subquery())
            result = await self.session.execute(count_query)
            total = result.scalar_one() or 0
            return total
        except Exception as e:
            print(f"Error counting total records: {e}")
            return 0

    async def get_result(self, scalars=True) -> List[T]:
        """Get the records of the current page"""
        try:
            offset = (self.page - 1) * self.page_size
            paginated_query = self.query.limit(self.page_size).offset(offset)
            result = await self.session.execute(paginated_query)

            items = result.scalars().all() if scalars else result.all()
            return items
        except Exception as e:
            print(f"Error fetching paginated items: {e}")
            return []

    async def get_prev_page(self) -> Optional[int]:
        """Get the previous page number"""
        if self.page > 1:
            return self.page - 1
        return None

    async def get_pages(self, total: int) -> Optional[int]:
        """Get the total number of pages"""
        if self.page_size > 1:
            return math.ceil(total / self.page_size)
        return None

    async def get_next_page(self, total: int) -> Optional[int]:
        """Get the next page number"""
        total_pages = (total + self.page_size - 1) // self.page_size
        if self.page < total_pages:
            return self.page + 1
        return None

    async def get_paginated_data(self, items=None, scalars=True) -> dict:
        """Get the paginated data"""
        try:
            total = await self.get_total()
            if total == 0:
                return {
                    "results": [],
                    "count": 0,
                    "page": self.page,
                    "page_size": self.page_size,
                    "previous": None,
                    "next": None,
                    "pages": 0
                }
            if not items:
                items = await self.get_result(scalars=scalars)
            prev_page = await self.get_prev_page()
            next_page = await self.get_next_page(total)
            pages = await self.get_pages(total)

            return {
                "results": items,
                "count": total,
                "page": self.page,
                "page_size": self.page_size,
                "previous": prev_page,
                "next": next_page,
                "pages": pages
            }
        except Exception as e:
            print(f"Error getting paginated data: {e}")
            return {
                "results": [],
                "count": 0,
                "page": self.page,
                "page_size": self.page_size,
                "previous": None,
                "next": None,
                "pages": 0
            }
