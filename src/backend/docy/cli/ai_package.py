"""`docy install-ai` implementation: download and install the encrypted AI package.

Detects the current Python version and platform, downloads the matching
PyArmor-encrypted zip from the package endpoint, and extracts it into the
docy package `ai/` directory (the zip already contains the ai/ contents at
its root, as produced by `powershell.ps1`).
"""

import base64
import hashlib
import hmac
import json
import shutil
import tempfile
import zipfile
from datetime import datetime
from pathlib import Path

import httpx
import typer
from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey
from rich.console import Console

from docy.services.common.ai_package import (
    SUPPORTED_PLATFORMS,
    build_zip_name,
    default_platform,
    default_python_version,
    validate_python_version,
)

console = Console()

DOWNLOAD_PATH = "/reg-api/ai-package/download"
MANIFEST_PATH = "/reg-api/ai-package/manifest"

# Trusted package-signing keys by key id (kid). Public key of the dedicated
# Ed25519 pair generated for ai-package signing; the private key lives only
# on the package server. New keys are added here BEFORE the server switches
# kid, so key rotation never breaks verification for updated clients.
AI_PACKAGE_TRUSTED_KEYS: dict[str, str] = {
    "docy-ai-pkg-2026": (
        "-----BEGIN PUBLIC KEY-----\n"
        "MCowBQYDK2VwAyEADwquffUGL4CPSTFRNt0Voz704U2p8clATwxsBeNUcTg=\n"
        "-----END PUBLIC KEY-----\n"
    ),
}


class VerificationError(Exception):
    """Package verification failed; carries a user-facing message."""

# cli/ai_package.py -> parents[1] == the docy package directory
DOCY_DIR = Path(__file__).resolve().parents[1]


def default_server_url() -> str:
    return "https://agent.docyai.com"


def _canonical_payload(manifest: dict) -> bytes:
    """Canonical manifest bytes: everything but the "signature" field,
    serialized with sort_keys + compact separators.

    Protocol invariant: the package server (docy_reg app/package_signing.py)
    signs these exact bytes; any drift here breaks verification.
    """
    payload = {k: v for k, v in manifest.items() if k != "signature"}
    return json.dumps(payload, sort_keys=True, separators=(",", ":")).encode("utf-8")


def _verify_manifest_signature(manifest: dict) -> str:
    """Verify the manifest's Ed25519 signature against the pinned public
    keys; returns the key id (kid) on success."""
    kid = manifest.get("kid")
    pem = AI_PACKAGE_TRUSTED_KEYS.get(kid) if isinstance(kid, str) else None
    if pem is None:
        raise VerificationError(
            f"Verification failed: package manifest is signed with an unknown key "
            f"(kid={kid!r}). Refusing to install."
        )
    try:
        signature = base64.b64decode(manifest.get("signature"), validate=True)
        public_key = serialization.load_pem_public_key(pem.encode("ascii"))
        if not isinstance(public_key, Ed25519PublicKey):
            raise VerificationError(
                f"Verification failed: trusted key {kid!r} is not an Ed25519 key. "
                "Refusing to install."
            )
        public_key.verify(signature, _canonical_payload(manifest))
    except (InvalidSignature, ValueError, TypeError) as exc:
        raise VerificationError(
            f"Verification failed: package manifest signature is invalid (kid={kid!r}). "
            "Refusing to install."
        ) from exc
    return kid


def _fetch_verified_digest(base_url: str, zip_name: str) -> dict | None:
    """Fetch the signed package manifest and return the verified entry for
    zip_name ({"sha256", "size", "kid"}).

    Returns None (with a warning printed) when the server provides no
    usable manifest — self-hosted servers and older package servers keep
    the same trust level as today. Raises VerificationError when a signed
    manifest exists but fails verification or omits the requested zip.
    """
    url = f"{base_url}{MANIFEST_PATH}"
    try:
        resp = httpx.get(
            url, follow_redirects=True, timeout=30.0, headers={"Cache-Control": "no-cache"}
        )
    except httpx.HTTPError:
        console.print(
            "[yellow]Package server does not provide a signed manifest; "
            "installing without verification.[/yellow]"
        )
        return None
    if resp.status_code != 200:
        console.print(
            f"[yellow]Package server does not provide a signed manifest "
            f"(HTTP {resp.status_code}); installing without verification.[/yellow]"
        )
        return None
    try:
        manifest = resp.json()
        if not isinstance(manifest, dict):
            raise ValueError("manifest is not a JSON object")
        packages = manifest.get("packages")
        if not isinstance(packages, dict):
            raise ValueError("manifest has no packages map")
        if manifest.get("signature") is None:
            raise ValueError("manifest has no signature")
    except ValueError:
        console.print(
            "[yellow]Package manifest is malformed; installing without verification.[/yellow]"
        )
        return None
    kid = _verify_manifest_signature(manifest)
    entry = packages.get(zip_name)
    if not (
        isinstance(entry, dict)
        and isinstance(entry.get("sha256"), str)
        and isinstance(entry.get("size"), int)
    ):
        raise VerificationError(
            f"Verification failed: {zip_name} is not listed in the signed package "
            "manifest. Refusing to install."
        )
    return {"kid": kid, "sha256": entry["sha256"], "size": entry["size"]}


def _extract_zip(zip_path: Path, target_dir: Path) -> None:
    with zipfile.ZipFile(zip_path) as zf:
        bad = zf.testzip()
        if bad is not None:
            raise ValueError(f"Corrupt entry in archive: {bad}")
        target_resolved = target_dir.resolve()
        console.print(f"Extracting {zip_path.name} -> ai/ ...")
        target_dir.mkdir(parents=True, exist_ok=True)
        for info in zf.infolist():
            # Windows-built archives store backslash separators; normalize so
            # POSIX extraction creates real directories instead of flat files
            # whose names contain literal "\".
            name = info.filename.replace("\\", "/")
            member_path = (target_dir / name).resolve()
            if not member_path.is_relative_to(target_resolved):
                raise ValueError(f"Unsafe path in archive: {name}")
            if info.is_dir() or name.endswith("/"):
                member_path.mkdir(parents=True, exist_ok=True)
                continue
            member_path.parent.mkdir(parents=True, exist_ok=True)
            with zf.open(info) as src, member_path.open("wb") as dst:
                shutil.copyfileobj(src, dst)


def install_ai(
    server: str | None = None,
    python_version: str | None = None,
    platform_name: str | None = None,
    assume_yes: bool = False,
    no_verify: bool = False,
) -> None:
    """Download the encrypted AI package for the current environment and
    install it into the docy package `ai/` directory.

    When the server provides a signed manifest, the download is verified
    (Ed25519 signature + SHA-256) before extraction; a verification
    failure restores the previous ai/ and exits non-zero.
    """
    python_version = python_version or default_python_version()
    platform_name = platform_name or default_platform()
    if not validate_python_version(python_version):
        console.print(
            f"[red]Invalid python_version '{python_version}'; expected digits like 313.[/red]"
        )
        raise typer.Exit(1)
    if platform_name not in SUPPORTED_PLATFORMS:
        console.print(
            f"[red]Unsupported platform '{platform_name}'; "
            f"supported: {', '.join(SUPPORTED_PLATFORMS)}[/red]"
        )
        raise typer.Exit(1)

    base_url = (server or default_server_url()).rstrip("/")
    zip_name = build_zip_name(python_version, platform_name)
    url = f"{base_url}{DOWNLOAD_PATH}?python_version={python_version}&platform={platform_name}"

    verified_entry: dict | None = None
    if no_verify:
        console.print("[yellow]Verification disabled (--no-verify).[/yellow]")
    else:
        # Fetched before the backup prompt so manifest-level failures leave
        # the existing ai/ untouched.
        try:
            verified_entry = _fetch_verified_digest(base_url, zip_name)
        except VerificationError as exc:
            console.print(f"[red]{exc}[/red]")
            raise typer.Exit(1)

    target_dir = DOCY_DIR / "ai"
    backup_dir: Path | None = None

    if target_dir.exists():
        backup_dir = DOCY_DIR / f"ai.backup-{datetime.now():%Y%m%d-%H%M%S}"
        if not assume_yes:
            confirmed = typer.confirm(
                f"Existing ai/ found; back it up to {backup_dir.name} and replace it?",
                default=False,
            )
            if not confirmed:
                console.print("Aborted; nothing was changed.")
                raise typer.Exit(1)
        console.print(f"[yellow]Backing up existing ai/ -> {backup_dir.name}[/yellow]")
        target_dir.rename(backup_dir)

    tmp_dir = Path(tempfile.mkdtemp(prefix="install-ai-", dir=str(DOCY_DIR)))
    try:
        console.print(f"Downloading [bold]{zip_name}[/bold] from {base_url} ...")
        digest = hashlib.sha256()
        bytes_written = 0
        with httpx.stream("GET", url, follow_redirects=True, timeout=300.0) as resp:
            if resp.status_code != 200:
                console.print(f"[red]Download failed: HTTP {resp.status_code}[/red]")
                raise typer.Exit(1)
            zip_path = tmp_dir / zip_name
            with zip_path.open("wb") as f:
                for chunk in resp.iter_bytes(chunk_size=1024 * 1024):
                    if verified_entry is not None:
                        digest.update(chunk)
                    bytes_written += len(chunk)
                    f.write(chunk)
        if verified_entry is not None:
            if bytes_written != verified_entry["size"]:
                raise VerificationError(
                    f"Verification failed: size mismatch for {zip_name}: "
                    f"expected {verified_entry['size']}, got {bytes_written} bytes."
                )
            actual_sha256 = digest.hexdigest()
            if not hmac.compare_digest(actual_sha256, verified_entry["sha256"]):
                raise VerificationError(
                    f"Verification failed: SHA-256 mismatch for {zip_name}: "
                    f"expected {verified_entry['sha256']}, got {actual_sha256}."
                )
        _extract_zip(zip_path, target_dir)
    except VerificationError as exc:
        # restore the previous ai/ before exiting non-zero
        console.print(f"[red]{exc}[/red]")
        shutil.rmtree(target_dir, ignore_errors=True)
        if backup_dir is not None and backup_dir.exists():
            backup_dir.rename(target_dir)
        raise typer.Exit(1)
    except Exception:
        # restore the previous ai/ on any failure
        shutil.rmtree(target_dir, ignore_errors=True)
        if backup_dir is not None and backup_dir.exists():
            backup_dir.rename(target_dir)
        raise
    finally:
        shutil.rmtree(tmp_dir, ignore_errors=True)

    if verified_entry is not None:
        console.print(
            f"[bold green]Verified: signed by docy (kid={verified_entry['kid']}), "
            f"sha256={verified_entry['sha256']}[/bold green]"
        )
        console.print(f"[bold green]AI package installed to {target_dir}[/bold green]")
    else:
        console.print(f"[yellow]AI package installed to {target_dir} (UNVERIFIED)[/yellow]")
