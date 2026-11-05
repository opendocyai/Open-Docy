"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/9
Last Modified: 2025/6/9
Last Editor:
Filename: tb_auth
Description: database tables for the user module
"""

from typing import Optional
from sqlalchemy import (
    Column,
    String,
    Boolean,
    Integer,
    BIGINT,
)
from sqlalchemy import func

from docy.core.fields import UTCDateTime, JSONDict
from docy.core._string import gen_snowflake_id
from docy.bases.base_model import AbstractBase, Base


class AbstractUser(AbstractBase):
    __abstract__ = True
    id = Column(String(64), primary_key=True, default=lambda: gen_snowflake_id())
    password = Column(String(128), nullable=False)
    last_login = Column(UTCDateTime, nullable=True, default=None)
    is_superuser = Column(Boolean, default=False)
    username = Column(String(150), unique=True)
    first_name = Column(String(50), nullable=True, server_default=None)
    last_name = Column(String(50), nullable=True, server_default=None)
    email = Column(String(254), nullable=True, default=None)
    designation = Column(String(150), nullable=True, default=None)
    is_staff = Column(Boolean, default=False)  # Designates whether the user can log into this admin site.
    is_active = Column(Boolean, default=True)
    date_joined = Column(UTCDateTime(timezone=True), server_default=func.now())

    def __repr__(self) -> str:
        return f'<User(id={self.id}, username={self.username or ""}, email={self.email or ""})>'

    @property
    def full_name(self) -> str:
        """
        Return the first_name plus the last_name, with a space in between.
        :return:
        """
        return f'{self.first_name or ""} {self.last_name or ""}'.strip()

    def get_short_name(self) -> Optional[str]:
        """Return the short name for the user."""
        return self.first_name


class User(AbstractUser):
    """
    System user; a tenant is created by default after registration.
    Supports different login strategies: email, password, third-party login, etc.
    """

    __tablename__ = "auth_user"
    email = Column(String(150), unique=True)
    display = Column(String(150), nullable=True, default=None)
    country_code = Column(Integer, nullable=True, default=None)
    phone = Column(BIGINT, nullable=True, default=None)
    avatar = Column(String(512), default="")  # Image path
    upn = Column(String(512), default="")  # Query parameter when sending activation emails
    active_code = Column(String(512), default="")  # User activation code
    default_color = Column(String(10), default="#FFE9BD")  # Default color assigned when creating a user

    # New fields
    resource_limit = Column(JSONDict, default={})  # User resource limits
    is_privileged = Column(Boolean, default=False)  # Whether the user is privileged

    @property
    def type(self):
        return "USER"


class Tenant(Base):
    """Tenant table"""
    __tablename__ = "tenant"

    id = Column(String(64), primary_key=True, unique=True, default=gen_snowflake_id)
    user_id = Column(String(64), nullable=False)  # User ID
    virtual_space_id = Column(String(64), nullable=True, default=None)  # Virtual space ID
    virtual_user_id = Column(String(64), nullable=True, default=None)  # Virtual user ID
    latest_access_time = Column(UTCDateTime, nullable=True, default=None)  # Last access time
