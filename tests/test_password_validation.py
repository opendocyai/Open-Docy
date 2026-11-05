"""Password validation regression tests: short passwords must produce string
error messages (a tuple return once crashed the 400 handler with TypeError)."""

import pytest
from fastapi.exceptions import RequestValidationError

from docy.core.settings import project_settings as settings
from docy.forms.user import SignUpForm
from docy.services.auth.utils.password import MinimumLengthValidator


def test_get_help_text_returns_string():
    msg = MinimumLengthValidator().get_help_text()
    assert isinstance(msg, str)
    assert "characters" in msg


def test_short_password_errors_join_cleanly(monkeypatch):
    monkeypatch.setattr(settings.security, "password_min_length", 12)
    monkeypatch.setattr("docy.forms.user.decrypt_password", lambda v: v)
    with pytest.raises(RequestValidationError) as excinfo:
        SignUpForm.validate_password("short-pw", info=None)
    errors = excinfo.value.errors()
    assert errors, "expected at least one validation error"
    assert all(isinstance(e, str) for e in errors)
    assert "<br/>".join(errors)  # the 400 handler joins with <br/>; must not raise
