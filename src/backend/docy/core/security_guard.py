"""Refuse to start with an unusable security configuration.

Checks the [DEFAULT] secret and the [Security] api_key / secret_key /
jwt_secret_key values against the change-me placeholders shipped in
settings.ini.sample. Missing optional secrets are tolerated; a missing
[DEFAULT] secret is fatal because password transport depends on it.

The [DEFAULT] secret is the AES key used to encrypt passwords between the
frontend and the backend, so its UTF-8 byte length must be 16, 24 or 32
(the only key sizes AES accepts). A wrong length used to start the server
fine and then failed at sign-up/login with "Passwords are tampered with
during transmission" — it now aborts startup instead. The password length
range is validated for the same reason: an impossible range rejects every
password only at request time.

The documented lengths of api_key / secret_key / jwt_secret_key and the
password_level value are recommendations: shorter values still work, but
they weaken security, so they are logged as warnings instead of blocking
startup (existing configurations keep booting).
"""

from configparser import NoOptionError, NoSectionError

from loguru import logger

from docy.core.settings import project_settings

_PLACEHOLDER_MARKERS = ("change-me", "changeme", "changethis", "your-secret", "placeholder")

_SECRET_KEYS = (
    ("DEFAULT", "secret"),
    ("Security", "api_key"),
    ("Security", "secret_key"),
    ("Security", "jwt_secret_key"),
)

# AES only accepts these key sizes. The configured value is UTF-8 encoded
# before AES.new(), so the check must use the encoded byte length.
_AES_KEY_BYTES = (16, 24, 32)

# Recommended minimum lengths from settings.ini.sample / docs/configuration.md.
# Longer values are accepted; only shorter values are reported.
_RECOMMENDED_LENGTHS = (
    ("Security", "api_key", 32),
    ("Security", "secret_key", 32),
    ("Security", "jwt_secret_key", 64),
)

_PASSWORD_LEVELS = ("low", "medium", "high")
_PASSWORD_MIN_FLOOR = 8
_PASSWORD_MAX_CEILING = 128


def _read(section: str, key: str) -> str | None:
    """Return a configured value as text, or None when the option is absent."""
    try:
        return str(getattr(getattr(project_settings, section.lower()), key))
    except (NoOptionError, NoSectionError, AttributeError):
        return None


def _validate_password_range(errors: list[str]) -> None:
    """Reject a password length range that can never accept a password."""
    try:
        min_length = project_settings.security.password_min_length
        max_length = project_settings.security.password_max_length
    except (NoOptionError, NoSectionError, AttributeError):
        return  # missing values keep the previous tolerant behaviour
    except (TypeError, ValueError):
        errors.append(
            "[Security] password_min_length and password_max_length must be integers"
        )
        return
    # MinimumLengthValidator clamps the configured range to 8..128.
    effective_min = max(int(min_length), _PASSWORD_MIN_FLOOR)
    effective_max = min(int(max_length), _PASSWORD_MAX_CEILING)
    if effective_min > effective_max:
        errors.append(
            "[Security] password_min_length/password_max_length leave no valid "
            f"password length (effective range {effective_min}-{effective_max} after "
            f"clamping to {_PASSWORD_MIN_FLOOR}-{_PASSWORD_MAX_CEILING})"
        )


def assert_secrets_not_default() -> None:
    """Raise RuntimeError if the security settings would fail at request time.

    Placeholder secrets, an invalid AES secret length and an impossible
    password length range are fatal. Deviations from the recommended lengths
    and an unrecognised password_level only produce warnings.
    """
    errors: list[str] = []

    offending: list[str] = []
    for section, key in _SECRET_KEYS:
        value = _read(section, key)
        if value is None:
            continue
        if not value.strip() or value.strip().lower() in _PLACEHOLDER_MARKERS:
            offending.append(f"[{section}] {key}")
    if offending:
        errors.append(
            "placeholder secrets are still configured; set real values for: "
            + ", ".join(offending)
        )

    secret = _read("DEFAULT", "secret")
    if secret is None:
        errors.append("[DEFAULT] secret is missing")
    elif (
        secret.strip()
        and secret.strip().lower() not in _PLACEHOLDER_MARKERS
        and len(secret.encode("utf-8")) not in _AES_KEY_BYTES
    ):
        secret_bytes = len(secret.encode("utf-8"))
        errors.append(
            "[DEFAULT] secret must be 16, 24 or 32 bytes when UTF-8 encoded "
            f"(got {secret_bytes} bytes for {len(secret)} characters); generate a "
            '16-character key with: python -c "import secrets; '
            'print(secrets.token_hex(8))"'
        )

    _validate_password_range(errors)

    # Non-fatal deviations: surface them without blocking startup.
    for section, key, recommended in _RECOMMENDED_LENGTHS:
        value = _read(section, key)
        if value is not None and value.strip() and len(value) < recommended:
            logger.warning(
                f"[{section}] {key} is {len(value)} characters; the documented length "
                f"is {recommended}. Shorter values weaken security."
            )

    level = _read("Security", "password_level")
    if level is not None and level.strip() and level.strip() not in _PASSWORD_LEVELS:
        logger.warning(
            f"[Security] password_level={level!r} is not one of low|medium|high; "
            "the server falls back to the low policy."
        )

    if errors:
        raise RuntimeError(
            "Refusing to start with an invalid security configuration:\n  - "
            + "\n  - ".join(errors)
            + "\nFix the values in settings.ini (see settings.ini.sample)."
        )
