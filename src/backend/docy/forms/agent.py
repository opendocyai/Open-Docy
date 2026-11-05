"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/18
Last Modified: 2025/6/18
Last Editor:
Filename: agent
Description: Agent-related validation forms
"""

from enum import Enum
from typing import Optional, List
from pydantic import BaseModel, Field,model_serializer
from docy import const


class ExtractorTYPE(Enum):
    PROFILE_SCAN = "profile_scan"
    AREA = "area"


class AgentCreateForm(BaseModel):
    name: str
    description: Optional[str] = Field(None, max_length=280, description="Short description")
    space_id: str
    agent_id: str | None = None
    template_json: Optional[dict] = None


class AgentUpdateForm(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    space_id: Optional[str] = None
    agent_id: str | None = None
    template_json: Optional[dict] = None
    addition: Optional[dict] = None
    # Not required by clients; only passed when copying from marketplace to a personal agent
    market_record_id: Optional[str] = None
    source_agent_id: Optional[str] = None
    # Whether the agent is editable; when copying an agent, inherits the
    # source agent's edit_able field
    edit_able: Optional[bool] = None


class AgentMarketForm(BaseModel):
    name: str = Field(..., max_length=100, description="Name")
    category: str
    brief_description: Optional[str] = Field(None, max_length=1000, description="Short description")
    description: Optional[str] = Field(None, max_length=2000, description="Description")
    logo: str
    cover_image: Optional[str] = Field(None, description="Carousel main image")
    extra_images: Optional[List[str]] = Field(None, description="Additional images")


class AREAData(BaseModel):
    area_name: str
    page: int
    coordinates: list[float]
    id: str


class KNOWNBaseData(BaseModel):
    rect: list[int]
    page_number: int


class ADDITIONData(BaseModel):
    area: Optional[list[AREAData]] = None
    known_field: Optional[dict] = None


class EXTRACTFile(BaseModel):
    keys: Optional[list[str]] = None
    addition: Optional[ADDITIONData] = None


def get_extract(x):
    return x.value


class DATAEXTRACTORForm(BaseModel):
    extractor_node_id: str
    extractor_type: Optional[ExtractorTYPE] = None
    extractor_files: Optional[EXTRACTFile] = None

    @model_serializer(mode="wrap")
    def serialize(self, handler):
        data = handler(self)
        data["extractor_type"] = self.extractor_type.value
        return data


class EXTRACTORInputForm(BaseModel):
    code: str
    node_id: str
    extractor_files: List[str]
    extractor_type: const.ExtractorType
    control: Optional[dict] = None
