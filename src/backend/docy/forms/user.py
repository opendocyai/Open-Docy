"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/11
Last Modified: 2025/6/11
Last Editor:
Filename: user
Description: User-related forms
"""

from typing import Any, Optional, Annotated, Union
from typing_extensions import Doc
from fastapi import (
    Form,
)
from fastapi.exceptions import RequestValidationError
from pydantic_core import PydanticCustomError
from pydantic import (
    BaseModel,
    field_validator,
    EmailStr,
    ValidationInfo,
    model_validator,
    Field,
    constr
)

from docy.core.aes import decrypt_with_b64_before_aes
from docy.core._string import import_string
from docy.core.settings import project_settings as settings
from docy.services.auth.utils.user import EmailEvevt
from docy.services.auth.utils.validators import UnicodeUsernameValidator


def decrypt_password(value):
    """
    Decrypt the password sent from the frontend
    """
    errors = ["Passwords are tampered with during transmission."]
    try:
        return decrypt_with_b64_before_aes(value)
    except Exception as e:
        raise RequestValidationError(errors)


class EmailForm(BaseModel):
    email: EmailStr


class SignUpForm(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str

    @field_validator("password", mode="before")
    @staticmethod
    def validate_password(value: Any, info: ValidationInfo) -> str:
        # Validate password complexity
        errors = []
        value = decrypt_password(value)
        validators = settings.security.password_validators
        for validator in validators:
            cls = import_string(validator["NAME"])()
            try:
                cls.validate(
                    value,
                    min_length=settings.security.password_min_length,
                    max_length=settings.security.password_max_length,
                )
            except PydanticCustomError:
                errors.append(cls.get_help_text())
        if errors:
            raise RequestValidationError(errors)
        return value

    @field_validator('first_name', 'last_name')
    @staticmethod
    def validate_name_length(value: Any, info: ValidationInfo):
        if len(value) > 50:
            raise ValueError(f"{info.field_name.replace('_', ' ')} cannot exceed 50 characters")
        return value


class CustomOAuth2PasswordRequestForm:
    def __init__(
            self,
            *,
            grant_way: Annotated[
                str,
                Form(pattern="email"),
                Doc(
                    """
                        This field specified which way use to authority.
                        default is email.
                        """
                ),
            ] = "email",
            grant_type: Annotated[
                Union[str, None],
                Form(pattern="password"),
                Doc(
                    """
                        The OAuth2 spec says it is required and MUST be the fixed string
                        "password". Nevertheless, this dependency class is permissive and
                        allows not passing it. If you want to enforce it, use instead the
                        `OAuth2PasswordRequestFormStrict` dependency.
                        """
                ),
            ] = None,
            username: Annotated[
                str,
                Form(),
                Doc(
                    """
                        `username` string. The OAuth2 spec requires the exact field name
                        `username`.
                        """
                ),
            ],
            password: Annotated[
                str,
                Form(),
                Doc(
                    """
                        `password` string. The OAuth2 spec requires the exact field name
                        `password".
                        """
                ),
            ],
            scope: Annotated[
                str,
                Form(),
                Doc(
                    """
                        A single string with actually several scopes separated by spaces. Each
                        scope is also a string.
    
                        For example, a single string with:
    
                        ```python
                        "items:read items:write users:read profile openid"
                        ````
    
                        would represent the scopes:
    
                        * `items:read`
                        * `items:write`
                        * `users:read`
                        * `profile`
                        * `openid`
                        """
                ),
            ] = "",
            client_id: Annotated[
                Union[str, None],
                Form(),
                Doc(
                    """
                        If there's a `client_id`, it can be sent as part of the form fields.
                        But the OAuth2 specification recommends sending the `client_id` and
                        `client_secret` (if any) using HTTP Basic auth.
                        """
                ),
            ] = None,
            client_secret: Annotated[
                Union[str, None],
                Form(),
                Doc(
                    """
                        If there's a `client_password` (and a `client_id`), they can be sent
                        as part of the form fields. But the OAuth2 specification recommends
                        sending the `client_id` and `client_secret` (if any) using HTTP Basic
                        auth.
                        """
                ),
            ] = None,
    ):
        self.grant_way = grant_way
        self.grant_type = grant_type
        self.username = username
        self.password = decrypt_password(password)
        self.scopes = scope.split()
        self.client_id = client_id
        self.client_secret = client_secret


class RefreshForm(BaseModel):
    refresh_token: str


class EmailSend(BaseModel):
    event: str
    email: EmailStr

    @field_validator("event", mode="before")
    @staticmethod
    def validate_event(value: Any, info: ValidationInfo) -> str:
        if value not in [EmailEvevt.active_user.value, EmailEvevt.find_password.value]:
            raise RequestValidationError(["Unsupported event type"])
        return value


class UpdateForm(BaseModel):
    first_name: Optional[str] = Field(None, max_length=256)
    last_name: Optional[str] = Field(None, max_length=256)
    avatar: Optional[str] = Field(None, max_length=512)

    @field_validator("first_name", *["last_name"])
    @staticmethod
    def validate_display(value: Any, info: ValidationInfo) -> str:
        if len(value) > 50:
            raise ValueError(f"{info.field_name.replace('_', ' ')} cannot exceed 50 characters")
        validator = UnicodeUsernameValidator(info=info)
        validator(value)
        return value


class FindPasswordForm(BaseModel):
    email: EmailStr
    password: str
    password_confirm: str

    @model_validator(mode="after")
    def validate_password(
            self,
    ):
        errors = []
        if self.password != self.password_confirm:
            errors.append("The passwords entered do not match.")
        self.password = decrypt_password(self.password)
        self.password_confirm = self.password
        validators = settings.security.password_validators
        for validator in validators:
            cls = import_string(validator["NAME"])()
            try:
                cls.validate(
                    self.password,
                    min_length=settings.security.password_min_length,
                    max_length=settings.security.password_max_length,
                )
            except PydanticCustomError:
                errors.append(cls.get_help_text())
        if errors:
            raise RequestValidationError(errors)
        return self
