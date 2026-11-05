"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/13
Last Modified: 2025/6/13
Last Editor:
Filename: manager
Description:
"""

from typing import Optional, List, Dict
from pathlib import Path

from fastapi import HTTPException, status

from docy.bases.base_manager import BaseManager
from docy.models.tb_common import FileUpload
from docy.schema.common import FileSchema
from docy.core.storage_drivers import default_s3_client
from docy.core._string import gen_short_uuid
from docy.core.storage_drivers.local_storage import default_storage_path
from docy.utils.sql_query import async_retrieve_object


class CommonManager(BaseManager):

    async def pre_signed_url(
            self,
            file_name: str,
            category: str,
            /,
            file_type: str = None,
            file_size: float = None,
            file_tag: Optional[List] = None,
            file_metadata: Optional[Dict] = None,
    ):
        file_path = Path(file_name)
        key = f"{category}/{file_path.stem}-{gen_short_uuid(2)}{file_path.suffix}"
        upload_history = FileUpload(
            file_name=file_name,
            file_key=key,
            file_type=file_type,
            file_size=file_size,
            file_tag=file_tag,
            file_metadata=file_metadata,
        )
        self.db.add(upload_history)
        await self.db.commit()
        # upload_url = blob.generate_upload_url(key)
        upload_url = default_s3_client.generate_upload_url(key, content_type=file_type)
        return {"key": key, "upload_url": upload_url, "store_type": default_s3_client.service_name}

    async def pre_download_file(self, file_key):
        return await async_retrieve_object(self.db, FileUpload, condition=[FileUpload.file_key == file_key])

    async def fake_download_file(self, file_key):
        data = {
            "file_name": Path(file_key).name,
            "file_key": file_key,
        }
        schema = FileSchema()
        validated_data = schema.load(data)
        file_upload_instance = FileUpload(**validated_data)
        return file_upload_instance

    async def download_file(self, file_key):
        """
        """
        history = await self.pre_download_file(file_key)
        base = default_storage_path.resolve()
        full_path = (base / file_key).resolve()
        if not full_path.is_relative_to(base) or not full_path.is_file():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="File not found."
            )
        if not history:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="File not found."
            )
        return full_path, history.file_name