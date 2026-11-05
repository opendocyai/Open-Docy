"""Menu parameter schemas (ported from the old schema/menu.py)."""

from typing import Optional

from pydantic import Field

from docy.schema.base import SchemaBase
from docy.utils.enums import MenuType, StatusType


class MenuSchemaBase(SchemaBase):
    """Menu base model"""

    title: str = Field(description='Menu title')
    name: str = Field(description='Menu name')
    path: str | None = Field(None, description='Route path')
    parent_id: str | None = Field(None, description='Parent menu ID')
    sort: int = Field(0, ge=0, description='Sort order')
    icon: str | None = Field(None, description='Icon')
    type: MenuType = Field(description='Menu type (0 directory, 1 menu, 2 button, 3 embedded, 4 external link)')
    component: str | None = Field(None, description='Component path')
    perms: str | None = Field(None, description='Permission code')
    status: StatusType = Field(description='Status (0 disabled, 1 enabled)')
    display: StatusType = Field(description='Whether to show (0 no, 1 yes)')
    cache: StatusType = Field(description='Whether to cache (0 no, 1 yes)')
    link: str | None = Field(None, description='External link URL')
    remark: str | None = Field(None, description='Remark')


class CreateMenuParam(MenuSchemaBase):
    """Create menu parameters"""
    status: Optional[StatusType] = Field(StatusType.enable, description='Status (0 disabled, 1 enabled)')
    display: Optional[StatusType] = Field(StatusType.enable, description='Whether to show (0 no, 1 yes)')
    cache: Optional[StatusType] = Field(StatusType.enable, description='Whether to cache (0 no, 1 yes)')


class UpdateMenuParam(MenuSchemaBase):
    """Update menu parameters"""
    title: Optional[str] = Field(None, description='Menu title')
    name: Optional[str] = Field(None, description='Menu name')
    sort: Optional[int] = Field(None, ge=0, description="Sort order")
    type: Optional[MenuType] = Field(None, description="Menu type (0 directory, 1 menu, 2 button, 3 embedded, 4 external link)")
    status: Optional[StatusType] = Field(None, description='Status (0 disabled, 1 enabled)')
    display: Optional[StatusType] = Field(None, description='Whether to show (0 no, 1 yes)')
    cache: Optional[StatusType] = Field(None, description='Whether to cache (0 no, 1 yes)')
