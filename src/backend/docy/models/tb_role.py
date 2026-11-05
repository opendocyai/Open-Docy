# -*- coding: utf-8 -*-
# @Time    : 2025/8/4 19:12
# @Author  : yanjia
# @File    : tb_role.py
# @Desc    : None
from typing import TYPE_CHECKING, Optional
from sqlalchemy import String, Enum, Integer, Column, ForeignKey, Table, JSON, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from docy.bases.base_model import Base
from docy.core._string import gen_snowflake_id
from docy.models.tb_workspace import MemberType

if TYPE_CHECKING:
    from docy.models.tb_menu import Menu

sys_role_menu = Table(
    'sys_role_menu',
    Base.metadata,
    Column("id", String(64), primary_key=True, unique=True, default=lambda: gen_snowflake_id()),
    Column("role_id", String(64), ForeignKey("sys_role.id"), nullable=False, comment="Role id"),
    Column("menu_id", String(64), ForeignKey("sys_menu.id"), nullable=False, comment="Menu id"),
)


class SysRole(Base):
    """Workspace role table"""

    __tablename__ = "sys_role"

    id = mapped_column(
        String(64), primary_key=True, unique=True, default=lambda: gen_snowflake_id()
    )  # Redefine the id column to keep it first
    space_id: Mapped[Optional[str]] = mapped_column(String(64), nullable=True, default=None, comment="Workspace id")
    name = mapped_column(String(64), nullable=False, comment="Role name")
    remark: Mapped[str | None] = mapped_column(String(512), default=None, comment="Remark")
    status: Mapped[int] = mapped_column(default=1, comment="Role status (0 disabled, 1 enabled)")
    role_type = mapped_column(
        Enum(MemberType), nullable=False, default=MemberType.OWNER, comment="Role type"
    )
    sort: Mapped[int] = mapped_column(Integer, default=10, comment="Sort order")

    # Many-to-many role-menu
    menus: Mapped[list["Menu"]] = relationship(
        "Menu",
        secondary=sys_role_menu,
        back_populates='roles',
    )


# Circular import with tb_menu (tb_menu needs sys_role_menu from this module),
# so import tb_menu at the end: it only registers the Menu class so that
# relationship("Menu") can resolve it during mapper configuration
import docy.models.tb_menu  # noqa: E402,F401
