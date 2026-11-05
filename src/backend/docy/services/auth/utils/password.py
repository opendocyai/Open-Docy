"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: password
Description: 
"""
import re
from typing import (Optional, Union, AnyStr)
from pydantic_core import PydanticCustomError
from docy.core._string import get_random_string
from .hashers import PBKDF2PasswordHasher

UNUSABLE_PASSWORD_PREFIX = "!"  # This will never be a valid encoded hash
UNUSABLE_PASSWORD_SUFFIX_LENGTH = (
    40  # number of random chars to add after UNUSABLE_PASSWORD_PREFIX
)


# Create and store passwords
def set_password(raw_password: str) -> str:
    return make_password(raw_password)


def set_unusable_password() -> str:
    return make_password(None)


def get_hasher():
    """
    Django-style: PBKDF2 is the default algorithm
    """
    return PBKDF2PasswordHasher()


def make_password(password: Optional[AnyStr], salt: Optional[str] = None) -> str:
    if password is None:
        return UNUSABLE_PASSWORD_PREFIX + get_random_string(UNUSABLE_PASSWORD_SUFFIX_LENGTH)
    if not isinstance(password, (bytes, str)):
        raise TypeError(
            "Password must be a string or bytes, got %s." % type(password).__qualname__
        )
    hasher = get_hasher()
    salt = salt or hasher.salt()
    return hasher.encode(password, salt)


def check_password(password: str, encoded: str) -> bool:
    hasher = get_hasher()
    return hasher.verify(password, encoded)


# Password security validation
def validate_number_case(password):
    if not re.match(r'.*\d.*', password):
        raise PydanticCustomError(
            'password_entirely_numeric',
            "This password must contain at least a number."
        )


def validate_lower_case(password):
    if not re.match(r'.*[a-z].*', password):
        raise PydanticCustomError(
            'password_need_lower_case',
            'This password must contain at least a lower case.'
        )


def validate_upper_case(password):
    if not re.match(r'.*[A-Z].*', password):
        raise PydanticCustomError(
            'password_need_upper_case',
            'This password must contain at least a upper case.'
        )


def validate_special_case(password):
    special_chars = list('!@#$%^&*()-_+=~,.?')
    for char in password:
        if char in special_chars:
            return
    raise PydanticCustomError(
        'password_need_special_chars',
        'Password must contain at least one special chars.'
    )


validators = list((
    validate_number_case,
    validate_lower_case,
    validate_upper_case,
    validate_special_case
))


class MinimumLengthValidator:
    """
    Validate that the password is of a minimum length.
    """

    def __init__(self):
        self.min_length = 8
        self.max_length = 128

    def validate(self, password, min_length=8, max_length=128, **kwargs):
        self.min_length = max(min_length, self.min_length)
        self.max_length = min(max_length, self.max_length)
        if len(password) < self.min_length or len(password) > self.max_length:
            raise PydanticCustomError(
                'password_too_short',
                f'Password should contain {self.min_length} to {self.max_length} characters.',
                {'min_length': self.min_length}
            )

    def get_help_text(self):
        return f'Password should contain {self.min_length} to {self.max_length} characters.'


class BasePasswordValidator:
    """
    1. Password length limit: default 8 chars (range: 8-64)
    2. Password complexity: default low (range: high, medium, low)
    Low: contains any 2 of digits, uppercase, lowercase, special chars
    Medium: contains any 3 of digits, uppercase, lowercase, special chars
    High: contains all 4 of digits, uppercase, lowercase, special chars
    """
    required_kinds = None
    full_kinds = 4
    error_messages = 'Password must contain at least one char in %(required_kinds)s of the four kind of chars: ' \
                     'number, upper cases, lower cases and special chars.'
    code = 'unsatisfied_password'

    def validate(self, password, **kwargs):
        fail_times = 0
        for validator in validators:
            try:
                validator(password)
            except PydanticCustomError:
                fail_times += 1
            if fail_times > (self.full_kinds - self.required_kinds):
                raise PydanticCustomError(
                    self.code,
                    self.error_messages,
                    {'required_kinds': self.required_kinds},
                )

    def get_help_text(self):
        return self.error_messages % {'required_kinds': self.required_kinds}


class LowLevelPasswordValidator(BasePasswordValidator):
    required_kinds = 2


class MediumLevelPasswordValidator(BasePasswordValidator):
    required_kinds = 3


class HighLevelPasswordValidator(BasePasswordValidator):
    required_kinds = 4


if __name__ == "__main__":
    print(check_password('zcj$@1021',
                         'pbkdf2_sha256$390000$WiFkZgQTs2ITMMsndWNVpk$K2g3fhfOKwO1asJjUHfDJsT0yordXtvpv2wczICNemg='))
