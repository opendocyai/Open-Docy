"""Resolution helpers for the PyArmor-encrypted AI package downloads.

The packages are produced by the PyArmor build script (`powershell.ps1`) which
writes zips into `docy/dist/` with the naming convention:

    ai-{platform with dots replaced by underscores}-python{version}.zip

e.g. `ai-windows_x86_64-python313.zip`.

The default download server is the company package server
(`https://agent.docyai.com`, path `/reg-api/ai-package/download`); the app
itself serves the same zips from `docy/dist/` at
`/api/v1/common/ai-package/download`.
"""

import platform as _platform
import re
import sys
from pathlib import Path

SUPPORTED_PLATFORMS = (
    "windows.x86_64",
    "linux.x86_64",
    "linux.aarch64",
    "darwin.x86_64",
    "darwin.aarch64",
)

_PYTHON_VERSION_RE = re.compile(r"^\d{2,3}$")

# The build script writes zips into `docy/dist/` (parents[2] == docy package dir).
_DEFAULT_PACKAGE_DIR = Path(__file__).resolve().parents[2] / "dist"

# services/common/ai_package.py -> parents[2] == the docy package directory
DOCY_DIR = Path(__file__).resolve().parents[2]
AI_DIR = DOCY_DIR / "ai"


def ai_plugin_installed() -> bool:
    """True when the encrypted AI plugin package is present in docy/ai/."""
    return (AI_DIR / "lambda_function.py").is_file()


def default_python_version() -> str:
    return f"{sys.version_info.major}{sys.version_info.minor}"


def default_platform() -> str:
    system = _platform.system().lower()
    machine = _platform.machine().lower()
    if system == "windows":
        return "windows.x86_64"
    if system == "darwin":
        return "darwin.aarch64" if machine in ("arm64", "aarch64") else "darwin.x86_64"
    if machine in ("arm64", "aarch64"):
        return "linux.aarch64"
    return "linux.x86_64"


def validate_python_version(python_version: str) -> bool:
    return bool(_PYTHON_VERSION_RE.match(python_version))


def build_zip_name(python_version: str, platform_name: str) -> str:
    platform_safe = platform_name.replace(".", "_")
    return f"ai-{platform_safe}-python{python_version}.zip"


def find_ai_package(python_version: str, platform_name: str) -> Path | None:
    zip_name = build_zip_name(python_version, platform_name)
    package_dir = _DEFAULT_PACKAGE_DIR.resolve()
    zip_path = (package_dir / zip_name).resolve()
    if not zip_path.is_relative_to(package_dir) or not zip_path.is_file():
        return None
    return zip_path
