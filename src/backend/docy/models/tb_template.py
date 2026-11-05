"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/16
Last Modified: 2025/6/16
Last Editor:
Filename: tb_template.py
Description: None
"""

from sqlalchemy import Column, String, Enum, ForeignKey, Integer
from sqlalchemy.orm import relationship

from docy.bases.base_model import Base
from docy.core.fields import JSONDict
from docy.utils.enums import FileExtEnum, DocumentTemplateStatusEnum


class DocumentTemplate(Base):
    """
    Document template table
    """
    __tablename__ = 'document_template'

    name = Column(String(255), nullable=False, comment="Template name")  # Taken from the file name
    ext = Column(Enum(FileExtEnum), nullable=False, comment="Supported template type")
    file_path = Column(String(255), nullable=False, comment="S3 file key")
    area_file_path = Column(String(255), nullable=True, comment="Form area marker / custom area document key")
    field_dict = Column(JSONDict, nullable=True, comment="Field data", default={})
    uploader = Column(String(64), nullable=True, default=None, comment="Uploader")
    modifier = Column(String(64), nullable=True, default=None, comment="Modifier")
    space_id = Column(String(64), ForeignKey('workspace.id'), nullable=False, comment="Workspace id")  # Defines the foreign key
    workspace = relationship("Workspace")  # Establishes the relationship with Workspace
    status = Column(Integer, nullable=True, default=DocumentTemplateStatusEnum.active.value, comment="Document labeling status")
