from .s3 import S3Client
from .local_storage import LocalStorage
from docy.core.settings import ProjectSettings as settings

def get_storage_client():
    if settings.s3.driver_type.lower() == "local":
        return LocalStorage()
    else:
        return S3Client()

default_s3_client = get_storage_client()