# -*- coding: utf-8 -*-
# @Time    : 2025/8/4 16:35
# @Author  : yanjia
# @File    : tb_menu.py
# @Desc    : None
import enum
from typing import Optional, TYPE_CHECKING

from sqlalchemy import Column, String, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from docy.bases.base_model import Base
from docy.core._string import gen_snowflake_id
from docy.models.tb_role import sys_role_menu

if TYPE_CHECKING:
    from docy.models.tb_role import SysRole


class Menu(Base):
    """
    Menu
    """

    __tablename__ = "sys_menu"
    id = Column(String(64), primary_key=True, unique=True, default=lambda: gen_snowflake_id())
    title: Mapped[str] = mapped_column(String(50), comment="Menu title")
    name: Mapped[str] = mapped_column(String(50), comment="Menu name")
    path: Mapped[str | None] = mapped_column(String(200), comment="Route path")
    sort: Mapped[int] = mapped_column(default=0, comment="Sort order")
    icon: Mapped[str | None] = mapped_column(String(64), default=None, comment="Menu icon")
    type: Mapped[int] = mapped_column(default=0, comment="Menu type (0 directory, 1 menu, 2 button, 3 embedded, 4 external link)")
    component: Mapped[str | None] = mapped_column(String(255), default=None, comment="Component path")
    perms: Mapped[str | None] = mapped_column(String(100), unique=True, default=None, comment="e.g. sys:user:add; unique")
    status: Mapped[int] = mapped_column(default=1, comment="Menu status (0 disabled, 1 enabled)")
    display: Mapped[int] = mapped_column(default=1, comment="Whether to show (0 no, 1 yes)")
    cache: Mapped[int] = mapped_column(default=1, comment="Whether to cache (0 no, 1 yes)")
    link: Mapped[str | None] = mapped_column(String(512), default=None, comment="External link URL")
    remark: Mapped[str | None] = mapped_column(String(512), default=None, comment="Remark")

    # One-to-many parent menus
    parent_id: Mapped[int | None] = mapped_column(
        String(64),
        ForeignKey("sys_menu.id", ondelete="SET NULL"),
        default=None,
        index=True,
        comment="Parent menu ID",
    )
    parent: Mapped[Optional["Menu"]] = relationship("Menu", back_populates="children", remote_side=[id])
    children: Mapped[Optional[list["Menu"]]] = relationship("Menu", back_populates="parent", lazy="selectin")
    # lazy="selectin" makes SQLAlchemy preload all child nodes in one IN query,
    # avoiding N+1 queries and staying compatible with AsyncSession
    # Many-to-many menu-role
    roles: Mapped[list["SysRole"]] = relationship(
        "SysRole",
        secondary=sys_role_menu,
        back_populates="menus",
    )