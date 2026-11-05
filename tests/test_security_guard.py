"""Startup security-guard tests.

Covers the original placeholder refusal (handoff doc P0-4b), the AES secret
length validation and the password length range check.
"""

import pytest

from docy.core.security_guard import assert_secrets_not_default
from docy.core.settings import project_settings

_KEYS = (
    ("DEFAULT", "secret"),
    ("Security", "api_key"),
    ("Security", "secret_key"),
    ("Security", "jwt_secret_key"),
    ("Security", "password_min_length"),
    ("Security", "password_max_length"),
    ("Security", "password_level"),
)


def _set_secret(section: str, key: str, value):
    setattr(getattr(project_settings, section.lower()), key, value)


def _clear_secret(section: str, key: str):
    """Hide an option from both the instance override and the parsed file."""
    obj = getattr(project_settings, section.lower())
    try:
        delattr(obj, key)
    except AttributeError:
        pass
    obj._parser.remove_option(section, key)


@pytest.fixture(autouse=True)
def _isolated_settings():
    original = {}
    for section, key in _KEYS:
        obj = getattr(project_settings, section.lower())
        try:
            original[(section, key)] = getattr(obj, key)
        except Exception:
            original[(section, key)] = None
    # Deterministic baseline: the repository's settings.ini is untracked and CI
    # copies settings.ini.sample, whose placeholders would otherwise fail.
    _set_secret("DEFAULT", "secret", "a" * 16)
    _set_secret("Security", "api_key", "a" * 32)
    _set_secret("Security", "secret_key", "a" * 32)
    _set_secret("Security", "jwt_secret_key", "a" * 64)
    _set_secret("Security", "password_min_length", 8)
    _set_secret("Security", "password_max_length", 128)
    _set_secret("Security", "password_level", "medium")
    yield
    for (section, key), value in original.items():
        obj = getattr(project_settings, section.lower())
        try:
            delattr(obj, key)
        except AttributeError:
            pass
        if value is not None:
            setattr(obj, key, value)


@pytest.mark.parametrize("value", ["change-me", "Change-Me", "changethis", ""])
def test_placeholder_secret_raises(value):
    _set_secret("Security", "jwt_secret_key", value)
    with pytest.raises(RuntimeError):
        assert_secrets_not_default()


def test_real_secrets_pass():
    _set_secret("DEFAULT", "secret", "kd/Ba+}rU^~gNO1E")
    _set_secret("Security", "api_key", "kR7y3Wf9L4N1r8M2tE5V6XaO9Y5u7B")
    _set_secret("Security", "secret_key", "lE5v3U0J2bL4m8Q6R7P6y7WqD8O1nY")
    _set_secret("Security", "jwt_secret_key", "a" * 64)
    assert_secrets_not_default()


def test_missing_optional_key_is_tolerated():
    _clear_secret("Security", "api_key")
    _set_secret("Security", "jwt_secret_key", "a" * 64)
    assert_secrets_not_default()


@pytest.mark.parametrize("length", [15, 17, 25, 33])
def test_invalid_secret_length_raises(length):
    _set_secret("DEFAULT", "secret", "a" * length)
    with pytest.raises(RuntimeError, match=r"\[DEFAULT\] secret"):
        assert_secrets_not_default()


@pytest.mark.parametrize("length", [16, 24, 32])
def test_valid_aes_key_length_passes(length):
    _set_secret("DEFAULT", "secret", "a" * length)
    assert_secrets_not_default()


def test_secret_length_is_measured_in_utf8_bytes():
    # 16 characters but 48 UTF-8 bytes is not a valid AES key size.
    _set_secret("DEFAULT", "secret", "密" * 16)
    with pytest.raises(RuntimeError, match="UTF-8"):
        assert_secrets_not_default()


def test_impossible_password_range_raises():
    _set_secret("Security", "password_min_length", 130)
    _set_secret("Security", "password_max_length", 128)
    with pytest.raises(RuntimeError, match="password_min_length"):
        assert_secrets_not_default()


@pytest.mark.parametrize("min_length,max_length", [(8, 128), (12, 64), (5, 200)])
def test_workable_password_range_passes(min_length, max_length):
    _set_secret("Security", "password_min_length", min_length)
    _set_secret("Security", "password_max_length", max_length)
    assert_secrets_not_default()


def test_short_optional_secrets_only_warn():
    _set_secret("Security", "api_key", "a" * 10)
    _set_secret("Security", "secret_key", "a" * 10)
    _set_secret("Security", "jwt_secret_key", "a" * 10)
    assert_secrets_not_default()


def test_unknown_password_level_only_warns():
    _set_secret("Security", "password_level", "hihg")
    assert_secrets_not_default()
