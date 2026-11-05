import os
import time
import fsspec
from typing import Optional
from pathlib import Path
from urllib.parse import quote
from genro_storage import StorageManager
from loguru import logger

from docy.core.settings import project_settings as settings

logger = logger.bind(module="local_storage")

base_path = Path(__file__).parent.parent.parent
default_storage_path = base_path / "storage/local"
default_storage_path.mkdir(parents=True, exist_ok=True)

BUCKET_NAME = "local_storage"

# Upload/download API paths of this service; keep in sync with the routes
# in api/v1/common.py
UPLOAD_ROUTE = "/api/v1/common/upload"
DOWNLOAD_ROUTE = "/api/v1/common/files"



class LocalStorage(object):
    """Local storage driver"""
    driver_type = settings.s3.driver_type
    service_name = "local"
    config = [
        {"name": BUCKET_NAME, 'protocol': 'local', 'base_path':default_storage_path.as_posix()}
    ]
    def __init__(self):
        self.client = StorageManager()
        self.client.configure(self.config)
    
    def upload_file(self, key, file, delete_key=None):
        logger.info(f"upload local file to {key}")
        if delete_key:
            try:
                node = self.client.node(f"{BUCKET_NAME}:{delete_key}")
                node.delete()
            except Exception as e:
                logger.error(f"delete local file {delete_key} failed: {e}")
        try:
            node = self.client.node(f"{BUCKET_NAME}:{key}")
            with node.open("wb") as f:
                f.write(file)
        except Exception as e:
            logger.error(f"upload local file to {key} failed: {e}")
            raise e
        # Same contract as S3Client.upload_file: return a truthy value on success
        # for callers to check with if upload_ok
        return {"key": key}

    def download_file(self, path: str, key: str) -> str | None:
        try:
            altsep = os.path.altsep  # Path separator /
            sep = (
                altsep if altsep is not None else os.sep
            )  # Use os.sep as the default path separator
            file_name = os.path.basename(key)
            full_filename_path = (
                f"{path}{file_name}"
                if path.endswith(sep)
                else f"{path}{sep}{file_name}"
            )
            local_fs = fsspec.filesystem("file")
            # node.path resolves incorrectly in some genro_storage versions;
            # join the storage root with the source path directly
            src_path = (default_storage_path / key).as_posix()
            local_fs.put_file(src_path, full_filename_path)
            return full_filename_path
        except Exception as e:
            logger.error(f"download local file {key} failed: {e}")
            raise e

    def download_file_to_stream(self, key: str)-> Optional[bytes]:
        try:
            node = self.client.node(f"{BUCKET_NAME}:{key}")
            with node.open("rb") as f:
                return f.read()
        except Exception as e:
            logger.error(f"download local file {key} failed: {e}")
            raise e

    def delete_file(self, key: str) -> None:
        """
        @param key S3 object key
        """
        try:
            node = self.client.node(f"{BUCKET_NAME}:{key}")
            node.delete()
        except Exception as e:
            logger.warning(f"delete key<{key}> error.")
            logger.info(str(e))

    def url(self, key: str, expiration: int = 3600, base_url: str | None = None):
        """Generate a download URL for the file, pointing at this service's
        static file download endpoint.

        @param key storage key (including the directory prefix)
        @param base_url service address; defaults to the configured host/port
        """
        base = base_url or self._default_base_url()
        return f"{base}{DOWNLOAD_ROUTE}/{quote(key, safe='/')}"

    def generate_upload_url(self, key: str, expiration: int = 3600, content_type: str = None, base_url: str | None = None):
        """Generate an upload URL for the file, pointing at this service's
        upload endpoint; clients upload via POST multipart/form-data with
        the file in the "file" field.

        @param key storage key (including the directory prefix)
        @param expiration URL validity period in seconds
        @param content_type file MIME type (local mode records it only; the
               client sets it at upload time)
        @param base_url service address; defaults to the configured host/port
        """
        base = base_url or self._default_base_url()
        expires = int(time.time()) + int(expiration)
        return f"{base}{UPLOAD_ROUTE}/{quote(key, safe='/')}?expires={expires}"

    @staticmethod
    def _default_base_url() -> str:
        return settings.server.base_url

