"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/17
Last Modified: 2025/6/17
Last Editor:
Filename: _file.py
Description: None
"""
import re
from typing import Tuple

from fastapi import File, UploadFile

from docy.exceptions.exception import MissingArguments, FileUploadNotFoundError
from docy.utils.enums import FileExtEnum


MAX_FILE_SIZE = 1024 * 1024 * 200  # 200 MB

async def get_file_type(file: UploadFile) -> Tuple[str, str]:
    """
    Get the file type.
    """
    # get the MIME type of the file
    file_content_type = file.content_type
    # simple file type detection
    if 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' in file_content_type or \
            'application/vnd.ms-excel' in file_content_type:
        file_type = "EXCEL", "xlsx"
    elif 'application/msword' in file_content_type or \
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' in file_content_type:
        file_type = "WORD", "docx"
    elif 'application/pdf' in file_content_type:
        file_type = "PDF", "pdf"
    elif 'text/csv' in file_content_type:
        file_type = "CSV", "csv"
    elif 'application/json' in file_content_type:
        file_type = "JSON", "json"
    elif 'text/plain' in file_content_type:
        file_type = "TXT", 'txt'
    elif ('application/mspowerpoint' in file_content_type or 'application/vnd.ms-powerpoint' in file_content_type
          or 'application/vnd.openxmlformats-officedocument.presentationml.presentation' in file_content_type):
        file_type = "PPT", 'pptx'
    else:
        file_type = "", ""
    return file_type


async def check_file_size(file: UploadFile = File(None)):
    if not file or not file.size:
        return file
    file.size = len(file.file.read())
    if file.size > MAX_FILE_SIZE:
        raise MissingArguments("File size exceeds limit")
    file.file.seek(0)  # Reset file pointer after reading
    return file

def get_file_name_extension(file_key: str) -> Tuple[str | None, str | None]:
    """Get the file name and extension.
    file_key: str document key returned by Azure, e.g. defalut/defaultAvatar-fwdmktku0s8z6CdI.jpeg
    """
    file_name, file_extension, file_ext = None, None, None
    file_ext = file_key.split(".")[-1] if len(file_key.split(".")) > 0 else None

    # regex
    match = re.search(fr"/(?P<file_name>.*?)-(\w+).{file_ext}", file_key)
    if match:
        file_name = match.group("file_name")

    match file_ext:  # noqa
        case FileExtEnum.WORD.value:
            file_extension = FileExtEnum.WORD
        case FileExtEnum.WORDX.value:
            file_extension = FileExtEnum.WORDX
        case FileExtEnum.PDF.value:
            file_extension = FileExtEnum.PDF
        case FileExtEnum.EXCEL.name:
            file_extension = FileExtEnum.EXCEL
        case FileExtEnum.EXCELX.value:
            file_extension = FileExtEnum.EXCELX
        case FileExtEnum.CSV.value:
            file_extension = FileExtEnum.CSV
        case FileExtEnum.JSON.value:
            file_extension = FileExtEnum.JSON
        case FileExtEnum.TXT.value:
            file_extension = FileExtEnum.TXT
        case FileExtEnum.PPT.value:
            file_extension = FileExtEnum.PPT
        case FileExtEnum.PPTX.value:
            file_extension = FileExtEnum.PPTX
        case _:
            return file_name, file_extension

    return file_name, file_extension


def sanitize_filename(filename):
    """Remove dangerous characters to prevent path traversal attacks."""
    keepchars = (" ", ".", "_", "-", ",")
    return "".join(c for c in filename if c.isalnum() or c in keepchars).strip()
