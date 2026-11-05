"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: _string
Description:
"""

import hashlib
import os
import socket
import sys
import uuid
import math
import secrets
import datetime
import importlib
import string
import random
from decimal import Decimal
from sonyflake import Sonyflake
from sonyflake.sonyflake import NoPrivateAddress
from typing import (
    Any,
    ByteString,
)


def _create_sonyflake() -> Sonyflake:
    """Create the global ID generator.

    Sonyflake derives its machine id from the low 16 bits of the host's
    private IPv4 address; hosts without one (containers, WSL) raise
    NoPrivateAddress at import time. DOCY_MACHINE_ID overrides the machine
    id explicitly; otherwise a stable hostname hash is used as the fallback.
    """
    start_time = datetime.datetime(2025, 1, 1, tzinfo=datetime.timezone.utc)
    env_value = os.environ.get("DOCY_MACHINE_ID")
    if env_value:
        machine_id = int(env_value)
        if not 0 <= machine_id <= 0xFFFF:
            raise ValueError("DOCY_MACHINE_ID must be an integer between 0 and 65535")
        return Sonyflake(start_time=start_time, machine_id=machine_id)
    try:
        return Sonyflake(start_time=start_time)
    except NoPrivateAddress:
        digest = hashlib.md5(socket.gethostname().encode("utf-8")).digest()
        return Sonyflake(start_time=start_time, machine_id=int.from_bytes(digest[:2], "big"))


SF = _create_sonyflake()
RANDOM = random.SystemRandom()
ASCII_LETTERS = string.ascii_letters
DIGITS = string.digits
CHARACTER_SET = "".join(
    list(set(ASCII_LETTERS + DIGITS + string.printable) - set(string.whitespace))
)
RANDOM_STRING_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
# Default avatar colors for users
COLORS = ("#FFE9BD", "#FFCCCF", "#005BA0", "#C3C3FF", "#83591B", "#A5E9CC")
UUID_CHARS = (
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
)
_PROTECTED_TYPES = (
    type(None),
    int,
    float,
    Decimal,
    datetime.datetime,
    datetime.date,
    datetime.time,
)


def gen_snowflake_id():
    return str(SF.next_id())


# String encryption/decryption
def get_random_strs(num: int = 16) -> str:
    return "".join(random.sample(CHARACTER_SET, num))


def get_random_code(num: int = 6) -> str:
    num: int = min(len(DIGITS), num)
    return "".join(random.sample(DIGITS, num))


def get_color():
    return RANDOM.choice(COLORS)


def gen_short_uuid(base=4):
    res = ""
    if base not in [2, 4]:
        return ""
    if base == 2:
        scope = 16
    else:
        scope = 8
    uid = str(uuid.uuid4()).replace("-", "")
    for i in range(0, scope):
        sub = uid[i * base : (i + 1) * base]
        x = int(sub, 16)
        res += UUID_CHARS[x % 0x3E]
    return res


# Password-related
def is_protected_type(obj):
    """Determine if the object instance is of a protected type.

    Objects of protected types are preserved as-is when passed to
    force_str(strings_only=True).
    """
    return isinstance(obj, _PROTECTED_TYPES)


def get_random_string(length: int, allowed_chars=RANDOM_STRING_CHARS) -> str:
    """
    Return a securely generated random string.

    The bit length of the returned value can be calculated with the formula:
        log_2(len(allowed_chars)^length)

    For example, with default `allowed_chars` (26+26+10), this gives:
      * length: 12, bit length =~ 71 bits
      * length: 22, bit length =~ 131 bits
    """
    return "".join(secrets.choice(allowed_chars) for i in range(length))


def force_bytes(
    s: Any, encoding: str = "utf-8", strings_only: bool = False, errors: str = "strict"
) -> ByteString:
    """
    Similar to smart_bytes, except that lazy instances are resolved to
    strings, rather than kept as lazy objects.

    If strings_only is True, don't convert (some) non-string-like objects.
    """
    if isinstance(s, bytes):
        if encoding == "utf-8":
            return s
        else:
            return s.decode("utf-8", errors).encode(encoding, errors)
    if strings_only and is_protected_type(s):
        return s
    if isinstance(s, memoryview):
        return bytes(s)
    return str(s).encode(encoding, errors)


def mask_hash(hash: str, show: int = 6, char: str = "*") -> str:
    """
    Return the given hash, with only the first ``show`` number shown. The
    rest are masked with ``char`` for security reasons.
    """
    masked = hash[:show]
    masked += char * len(hash[show:])
    return masked


def must_update_salt(salt, expected_entropy):
    # Each character in the salt provides log_2(len(alphabet)) bits of entropy.
    return len(salt) * math.log2(len(RANDOM_STRING_CHARS)) < expected_entropy


def split_comma_values(values: list[str]) -> list[str]:
    """Expand comma-joined entries of a list query parameter.

    FastAPI parses ``?ids=a,b`` (comma-joined) into a single-element list,
    while repeated parameters (``?ids=a&ids=b``) arrive as separate elements.
    This normalizes both forms.
    """
    result: list[str] = []
    for value in values:
        for part in value.split(","):
            part = part.strip()
            if part:
                result.append(part)
    return result


# Import a string path
def cached_import(module_path, class_name):
    # Check whether module is loaded and fully initialized.
    if not (
        (module := sys.modules.get(module_path))
        and (spec := getattr(module, "__spec__", None))
        and getattr(spec, "_initializing", False) is False
    ):
        module = importlib.import_module(module_path)
    return getattr(module, class_name)


def import_string(dotted_path):
    """
    Import a dotted module path and return the attribute/class designated by the
    last name in the path. Raise ImportError if the import failed.
    """
    try:
        module_path, class_name = dotted_path.rsplit(".", 1)
    except ValueError as err:
        raise ImportError("%s doesn't look like a module path" % dotted_path) from err

    try:
        return cached_import(module_path, class_name)
    except AttributeError as err:
        raise ImportError(
            'Module "%s" does not define a "%s" attribute/class'
            % (module_path, class_name)
        ) from err
