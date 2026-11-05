"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/12
Last Modified: 2025/6/12
Last Editor:
Filename: tb_common
Description: common database tables
"""
from typing import Optional
from sqlalchemy import (Column, String, Boolean, Integer, BIGINT, Text, ForeignKey, Table, JSON, Float)
from sqlalchemy.orm import relationship
from sqlalchemy import func

from docy.bases.base_model import Base
from docy.core.fields import JSONList, JSONDict


class FileUpload(Base):
    """
    Records of user file uploads
    """
    __tablename__ = 'file_upload_history'
    file_name = Column(String(200), nullable=False, )
    file_key = Column(String(512), nullable=False)
    file_type = Column(String(120), nullable=True, default=None)
    file_size = Column(Float, nullable=True, default=None)
    file_tag = Column(JSONList, nullable=True, default=[])
    file_metadata = Column(JSONDict, nullable=True, default={})
