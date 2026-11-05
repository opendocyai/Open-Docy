"""Zip extraction limit tests for _safe_extract_zip (handoff doc P0-4c)."""

import io
import zipfile

import pytest

import docy.services.agent.agent_package as agent_package
from docy.exceptions.exception import AgentPackageFormatError
from docy.services.agent.agent_package import _safe_extract_zip


def _make_zip(entries: dict[str, bytes], compress=zipfile.ZIP_STORED) -> bytes:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", compress) as zf:
        for name, data in entries.items():
            zf.writestr(name, data)
    return buf.getvalue()


def test_valid_zip_extracts(tmp_path):
    _safe_extract_zip(_make_zip({"a.txt": b"hello", "sub/b.txt": b"world"}), tmp_path)
    assert (tmp_path / "a.txt").read_bytes() == b"hello"
    assert (tmp_path / "sub" / "b.txt").read_bytes() == b"world"


def test_rejects_traversal_entry(tmp_path):
    data = _make_zip({"../evil.txt": b"x"})
    with pytest.raises(AgentPackageFormatError):
        _safe_extract_zip(data, tmp_path)
    assert not (tmp_path.parent / "evil.txt").exists()


def test_rejects_too_many_entries(tmp_path, monkeypatch):
    monkeypatch.setattr(agent_package, "MAX_ZIP_ENTRIES", 5)
    data = _make_zip({f"f{i}.txt": b"x" for i in range(6)})
    with pytest.raises(AgentPackageFormatError):
        _safe_extract_zip(data, tmp_path)


def test_rejects_oversized_single_file(tmp_path, monkeypatch):
    monkeypatch.setattr(agent_package, "MAX_ZIP_SINGLE_FILE", 10)
    data = _make_zip({"big.txt": b"x" * 11})
    with pytest.raises(AgentPackageFormatError):
        _safe_extract_zip(data, tmp_path)


def test_rejects_oversized_total(tmp_path, monkeypatch):
    monkeypatch.setattr(agent_package, "MAX_ZIP_TOTAL_UNCOMPRESSED", 20)
    data = _make_zip({f"f{i}.txt": b"x" * 10 for i in range(3)})
    with pytest.raises(AgentPackageFormatError):
        _safe_extract_zip(data, tmp_path)


def test_rejects_compression_ratio_bomb(tmp_path, monkeypatch):
    monkeypatch.setattr(agent_package, "ZIP_RATIO_BOMB_SIZE", 1024)
    monkeypatch.setattr(agent_package, "ZIP_MAX_COMPRESSION_RATIO", 10)
    data = _make_zip({"bomb.txt": b"\0" * (100 * 1024)}, compress=zipfile.ZIP_DEFLATED)
    assert len(data) < 10 * 1024
    with pytest.raises(AgentPackageFormatError):
        _safe_extract_zip(data, tmp_path)


def test_rejects_corrupt_crc(tmp_path):
    data = bytearray(_make_zip({"a.txt": b"hello"}))
    pos = data.index(b"hello")
    data[pos] ^= 0xFF
    with pytest.raises(AgentPackageFormatError):
        _safe_extract_zip(bytes(data), tmp_path)
