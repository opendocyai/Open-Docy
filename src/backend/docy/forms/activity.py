from enum import Enum
from docy.models.tb_activity import TaskType
from typing import Optional, List, Dict, Any, Union
from pydantic import BaseModel, model_serializer, field_validator


class FileForm(BaseModel):
    node_id: str


class InputForm(BaseModel):
    key: str
    files: List[str]


class BatchInputMetaForm(BaseModel):
    key: str
    files: List[str]
    key_order: int


class BatchInputForm(BaseModel):
    upload: List[BatchInputMetaForm]


class ActivityInputForm(BaseModel):
    node_input: Optional[Dict[str, Union[BatchInputForm, InputForm]]] = None


class ShareLinkForm(BaseModel):
    task_id: str
    shared_email: Optional[str] = None
    page: str
    upload_files: Optional[List[FileForm]] = None


class AttachmentForm(BaseModel):
    file_name: str
    key: str
    content_type: str


class EmailContentForm(BaseModel):
    message_id: str
    email: str
    subject: str = None
    content: str = None
    attachment: List[AttachmentForm] = None
    received_time: int = None
    event_id: Optional[str] = None

class TaskRecordForm(BaseModel):
    task_id: Optional[str] = None
    run_id: Optional[str] = None
    agent_id: Optional[str] = None
    space_id: Optional[str] = None
    auth_type: Optional[str] = None
    api_key_id: Optional[str] = None
    task_type: Optional[TaskType] = None
