# -*- coding: utf-8 -*-
# @Time    : 2025/6/19 10:20
# @Author  : yanjia
# @File    : file_convert.py
# @Desc    : None
"""
Provides common helper functions.
"""
import os
import shutil
import subprocess
from pathlib import Path
from typing import Optional

from loguru import logger

LOG = logger.bind(module="file_convert")

LIBREOFFICE_MISSING_MSG = (
    "LibreOffice (soffice) not found. "
    "Install it by running `docy install-libreoffice`, "
    "or manually from https://www.libreoffice.org/download/download-libreoffice/. "
    "If it is installed in a custom location, add its program directory to PATH."
)


def _find_soffice_path() -> Optional[str]:
    p = shutil.which("soffice")
    if p:
        return p
    # Windows/macOS default installs are not on PATH; a bare which() misses them.
    candidates = [
        "/usr/bin/soffice",
        "/usr/local/bin/soffice",
        "/Applications/LibreOffice.app/Contents/MacOS/soffice",
        r"C:\Program Files\LibreOffice\program\soffice.exe",
        r"C:\Program Files (x86)\LibreOffice\program\soffice.exe",
    ]
    for candidate in candidates:
        if os.path.exists(candidate):
            return candidate
    return None


def docx_to_pdf(input_file_path: str, out_put_file_path: str) -> str:
    """Convert a Word document to PDF.

    Uses LibreOffice for the conversion.
    Make sure the LibreOffice client is installed on the server.
    https://www.libreoffice.org/download/download-libreoffice/

    The source file is deleted after the conversion.
    """
    output_full_filename_path = ""
    try:
        soffice_path = _find_soffice_path()
        if soffice_path is None:
            LOG.error(LIBREOFFICE_MISSING_MSG)
            raise RuntimeError(LIBREOFFICE_MISSING_MSG)

        input_file_name_without_ext = Path(input_file_path).stem  # get the file name without extension
        output_full_filename_path = Path(out_put_file_path, f"{input_file_name_without_ext}.pdf")  # build the full output PDF file name
        # build the soffice command
        command = [
            soffice_path,
            '--headless',
            '--convert-to',
            'pdf:writer_pdf_Export',
            input_file_path,
            '--outdir',
            out_put_file_path,
        ]
        # run the command and capture stdout and stderr
        result = subprocess.run(command, capture_output=True, text=True, check=True)

        # print stdout and stderr
        print(f"\nStandard Output: {result.stdout}")
        print(f"\nStandard Error: {result.stderr}")
        print(f"Successfully converted {input_file_path} to {out_put_file_path}")

        if not Path(output_full_filename_path).exists():
            raise RuntimeError(
                f"LibreOffice conversion failed: output file "
                f"{output_full_filename_path} was not created. "
                f"stdout={result.stdout} stderr={result.stderr}"
            )

        # delete the source file
        if Path(input_file_path).exists():
            os.remove(input_file_path)

    except subprocess.CalledProcessError as e:
        print(f"An error occurred while converting {input_file_path} to {out_put_file_path}")
        print("Command:", " ".join(e.cmd))
        print("Return Code:", e.returncode)
        print("Output:", e.output)
        print("Error:", e.stderr)
        LOG.error(
            f"docx_to_pdf failed: cmd={' '.join(e.cmd)} rc={e.returncode} "
            f"stdout={e.stdout} stderr={e.stderr}"
        )
        output_full_filename_path = ""

    return str(output_full_filename_path)
