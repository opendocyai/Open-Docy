"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/8/13
Last Modified: 2025/8/13
Last Editor:
Filename: s3
Description: S3 API calls
"""

import os
import boto3
from typing import Optional
from botocore.exceptions import ClientError
from botocore.config import Config
from loguru import logger
from docy.core.settings import project_settings as settings

LOG = logger.bind(module="s3")



class S3Client:
    driver_type = settings.s3.driver_type
    service_name: str = "s3"
    region: str = settings.s3.aws_default_region

    def __init__(
            self,
            *,
            bucket: Optional[str] = settings.s3.bucket,
            aws_access_key_id: Optional[str] = settings.s3.aws_access_key_id,
            aws_secret_access_key: Optional[str] = settings.s3.aws_secret_access_key,
            aws_session_token: Optional[str] = None,
            endpoint_url: Optional[str] = settings.s3.endpoint_url,
    ):
        self.bucket = bucket
        params = {
                "region_name":self.region,
                "aws_access_key_id": aws_access_key_id,
                "aws_secret_access_key": aws_secret_access_key,
                "aws_session_token": aws_session_token,
                "config": Config(signature_version="s3v4", s3={"addressing_style": "virtual"}),
            }
        if settings.s3.driver_type.lower() == "s3":
            params["aws_session_token"] = aws_session_token
            params["config"] = Config(signature_version="s3v4", s3={"addressing_style": "virtual"})
        else:
            params["endpoint_url"] = endpoint_url
            params["config"] = Config(signature_version="s3v4")
        self.client = boto3.client(
            self.service_name,
            **params,
        )

    def upload_file(self, key, file, delete_key=None):
        """
        Upload a file to S3.
        """
        LOG.info(f"S3Client.upload_file: {key}")
        if delete_key:
            # Delete the old file
            try:
                self.client.delete_object(Bucket=self.bucket, Key=delete_key)
            except ClientError as e:
                # Use logging instead of print
                LOG.error(f"S3Client.upload_file delete_object error: {e}; delete_key: {delete_key}")

        # Upload the new file
        try:
            response = self.client.put_object(
                Bucket=self.bucket,
                Key=key,
                Body=file,
            )
        except ClientError as e:
            LOG.info(f"S3Client.upload_file error: {e}")
            raise e

        LOG.info(f"S3Client.upload_file end: {key}")
        return response

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
            self.client.download_file(
                Bucket=self.bucket, Key=key, Filename=full_filename_path
            )
            return full_filename_path

        except ClientError as e:
            LOG.error(
                f"S3 download failed for key<{key}>: {e.response['Error']['Message']}"
            )
        except Exception as e:
            LOG.error(f"Download file<{path}> key<{key}> error: {str(e)}")

        return None

    def download_file_to_stream(self, key: str) -> Optional[bytes]:
        """
        @param key S3 object key
        @return File content as bytes, or None
        """
        try:
            # Create an in-memory file stream
            from io import BytesIO

            buffer = BytesIO()

            # Download into the in-memory stream
            self.client.download_fileobj(Bucket=self.bucket, Key=key, Fileobj=buffer)

            # Return the bytes content
            return buffer.getvalue()

        except ClientError as e:
            LOG.error(
                f"S3 stream download failed for key<{key}>: {e.response['Error']['Message']}"
            )
        except Exception as e:
            LOG.error(f"download_file_to_stream key<{key}> error: {str(e)}")

        return None

    def delete_file(self, key: str) -> None:
        """
        @param key S3 object key
        """
        try:
            self.client.delete_object(Bucket=self.bucket, Key=key)
        except ClientError as e:
            LOG.warning(f"Delete S3 key<{key}> failed: {e.response['Error']['Code']}")
            LOG.info(str(e))
        except Exception as e:
            LOG.warning(f"delete key<{key}> error.")
            LOG.info(str(e))

    def url(self, key: str, expiration: int = 3600, base_url: str | None = None):
        """
        Create a temporary usable URL for the given key.
        base_url exists only to keep the interface consistent with the local
        driver; it is ignored in s3 mode.
        """
        if key:
            try:
                url = self.client.generate_presigned_url(
                    "get_object",
                    Params={"Bucket": self.bucket, "Key": key},
                    ExpiresIn=expiration,
                )
            except ClientError as e:
                LOG.error(f"S3Client.url error: {e}")
                return None
            return url
        return None

    def generate_upload_url(
            self, key: str, expiration: int = 3600, content_type: str = None,
            base_url: str | None = None
    ) -> str | None:
        """
        @param key S3 object key
        @param expiration URL validity period in seconds, max 7 days (604800s)
        @param base_url only for interface consistency with the local driver;
               ignored in s3 mode
        @return Presigned upload URL, or None
        """
        try:
            # Generate a presigned upload URL
            params = {
                "Bucket": self.bucket,
                "Key": key,
            }
            if content_type:
                params["ContentType"] = content_type
            url = self.client.generate_presigned_url(
                ClientMethod="put_object",
                Params=params,
                ExpiresIn=expiration,
                HttpMethod="PUT",
            )
            return url

        except ClientError as e:
            error_code = e.response["Error"]["Code"]
            LOG.error(
                f"Generate S3 upload URL failed [{error_code}]: {e.response['Error']['Message']}"
            )
        except Exception as e:
            LOG.error(f"Generate upload URL failed: {str(e)}")

        return None


if __name__ == "__main__":
    # Example key: 0aaad893-0459-4820-bcf1-595b70d2180a_HubDoc.ai_email_template
    url = default_s3_client.generate_upload_url('ss.pdf')
    import requests

    with open(
            r"D:\Program Files\WXWork\1688857222680642\Cache\File\2025-08\ss.pdf",
            'rb') as f:
        r = requests.put(url, data=f, headers={"Content-Type": "application/pdf"})
    print(r.status_code, r.text)

    default_s3_client.download_file(".", "ss.pdf")
