"""API key model: per-user keys for authenticating API requests."""

from typing import Optional

from sqlalchemy import Boolean, Column, Integer, String

from docy.bases.base_model import Base
from docy.core.fields import UTCDateTime


class APIKey(Base):
    """
    api key
    """

    __tablename__ = "api_key"
    name: str = Column(String(100))
    last_used_at: Optional[UTCDateTime] = Column(UTCDateTime, nullable=True, default=None)
    total_uses: int = Column(Integer, default=0)
    is_active: bool = Column(Boolean, default=True)
    api_key: str = Column(String(200), index=True, unique=True)
    api_key_hash: Optional[str] = Column(String(64), nullable=True, index=True)
    user_id: str = Column(String(64))
