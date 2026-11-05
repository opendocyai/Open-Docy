"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/12
Last Modified: 2025/6/12
Last Editor:
Filename: validators
Description: 
"""
import re
from fastapi import status
from docy.exceptions.exception import ValidateError
from .decorators import deconstructible


@deconstructible
class RegexValidator:
    regex = ""
    message = "Enter a valid value."
    code = status.HTTP_400_BAD_REQUEST
    inverse_match = False
    flags = 0

    def __init__(
            self, regex=None, message=None, code=None, inverse_match=None, flags=None, info=None
    ):
        if regex is not None:
            self.regex = regex
        if message is not None:
            self.message = message
        if code is not None:
            self.code = code
        if inverse_match is not None:
            self.inverse_match = inverse_match
        if flags is not None:
            self.flags = flags
        if info is not None:
            self.info = info or ''
        if self.flags and not isinstance(self.regex, str):
            raise TypeError(
                "If the flags are set, regex must be a regular expression string."
            )
        self.regex = re.compile(self.regex, self.flags)

    def __call__(self, value):
        """
        Validate that the input contains (or does *not* contain, if
        inverse_match is True) a match for the regular expression.
        """
        regex_matches = self.regex.search(str(value))
        invalid_input = regex_matches if self.inverse_match else not regex_matches
        if invalid_input:
            if hasattr(self,'info'):
                desc = f'{self.info.field_name}:{self.message}'
            else:
                desc = self.message
            raise ValidateError(desc=desc, code=self.code)

    def __eq__(self, other):
        return (
                isinstance(other, RegexValidator)
                and self.regex.pattern == other.regex.pattern
                and self.regex.flags == other.regex.flags
                and (self.message == other.message)
                and (self.code == other.code)
                and (self.inverse_match == other.inverse_match)
        )


@deconstructible
class ASCIIUsernameValidator(RegexValidator):
    regex = r"^[\w.@+-]+\Z"
    message = (
        "Enter a valid value. This value may contain only English letters, "
        "numbers, and @/./+/-/_ characters."
    )
    flags = re.ASCII


@deconstructible
class UnicodeUsernameValidator(RegexValidator):
    regex = r"^[\w .@+-]+\Z"
    message = (
        "Enter a valid value. This value may contain only letters, "
        "numbers, and @/./+/-/_ characters."
    )
    flags = 0


if __name__ == "__main__":
    validator = UnicodeUsernameValidator()
    validator("Go to sleep")