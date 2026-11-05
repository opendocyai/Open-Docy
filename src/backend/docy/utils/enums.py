# -*- coding: utf-8 -*-
# @Time    : 2025/6/30 14:31
# @Author  : yanjia
# @File    : enums.py
# @Desc    : None
import enum


class FileExtEnum(enum.StrEnum):
    WORD = "doc"
    WORDX = "docx"
    PDF = "pdf"
    EXCEL = "xls"
    EXCELX = "xlsx"
    CSV = "csv"
    TXT = "txt"
    JSON = "json"
    PPT = "ppt"
    PPTX = "pptx"

    @classmethod
    def to_dict(cls):
        return {member.name: member.value for member in cls}

    @classmethod
    def get_upload_file_content_type(cls, file_ext):
        return upload_file_content_type.get(file_ext)


class ScrapResponseCodeEnum(enum.IntEnum):
    """
    scrapy crawler return value enum

     1: success
    -1: max depth limit error
    -2: max task count limit error
    -3: page open error
    -4: page permission crawl error
    -5: error saving the crawled file (no data on home page)/file too large
    """
    success = 1
    err_max_depth = -1
    err_max_tasks = -2
    err_open_pages = -3
    err_permission_pages = -4
    err_save_files = -5
    err_close_pages = -6


class SessionStatusEnum(enum.IntEnum):
    active = 1  # active
    inactive = 2  # inactive

class DocumentTemplateFieldTypeEnum(enum.StrEnum):

    area = "area"
    auto = "auto"

class DocumentTemplateStatusEnum(enum.IntEnum):

    active = 1
    processing = 2
    failed = 3


class ColorEnum(enum.StrEnum):

    rgb = "rbg"
    hex = "hex"

class BuildTreeType(enum.StrEnum):
    """Tree build type."""

    traversal = 'traversal'
    recursive = 'recursive'

class StatusType(enum.IntEnum):
    """Status type."""

    disable = 0
    enable = 1

class PdfBorderStyleEnum(enum.StrEnum):

    PDF_BORDER_STYLE_SOLID = "S"  # solid
    PDF_BORDER_STYLE_DASHED = "D"  # dashed
    PDF_BORDER_STYLE_BEVELED = "B" # beveled?

class LambdaFunctionEnum(enum.StrEnum):

    chat = "chat"
    check = "check"
    file_verify = "file_verify"
    policy_rules = "policy_rules"

class LambdaOperationEnum(enum.StrEnum):

    create = "create"
    delete = "delete"
    edit = "edit"

class LambdaResponseStatusEnum(enum.StrEnum):

    completed = "completed"  # completed
    in_progress = "in_progress"  # in progress
    failed = "failed" # failed

class BotMessageKindEnum(enum.StrEnum):
    """Kind of the workflow chat message response."""

    thinking = "thinking"
    text = "text"
    tool = "tool"
    workflow = "workflow"  # used by agent update events
    error = "error"  # used by message error events

class InnerMessageStatusEnum(enum.StrEnum):
    """Message processing status."""

    unread = "unread"  # unread
    read = "read"  # read

class InnerModelEnum(enum.StrEnum):
    """Module."""

    system = "system"
    email = "email"
    task = "task"
    agent = "agent"
    template = "template"
    space = "space"
    knowledge = "knowledge"

class InnerMessageStateEnum(enum.StrEnum):
    """Message status."""

    notice = "notice"
    finished = "finished"
    failed = "failed"
    in_progress = "in_progress"
    timeout = "timeout"

class MenuType(enum.IntEnum):
    """Menu type.
    Directory (type=0) has no permissions.
    Menu (type=1) has page-level permissions, e.g. sys:user:view.
    Button (type=2) has operation-level permissions, e.g. sys:user:add, sys:user:edit.
    """

    directory = 0  # directory
    menu = 1
    button = 2
    embedded = 3
    link = 4  # link

upload_file_content_type = {
    FileExtEnum.PDF: "application/pdf",
    FileExtEnum.CSV: "text/csv",
    FileExtEnum.TXT: "text/plain",
    FileExtEnum.JSON: "application/json",
    FileExtEnum.WORD: "application/vnd.msword",
    FileExtEnum.WORDX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    FileExtEnum.EXCEL: "application/vnd.ms-excel",
    FileExtEnum.EXCELX: "application/vnd.openxmlformats-officedocument.spreadsheetml.excel",
    FileExtEnum.PPT: "application/vnd.ms-powerpoint",
    FileExtEnum.PPTX: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
}

class CopyAgentFromEnum(enum.IntEnum):
    """
    Source of the copied agent.
    """
    MARKETPLACE = 1
    USER = 2

class CopyAgentStatusEnum(enum.StrEnum):
    """
    Source of the copied agent.
    """
    draft = "draft"
    frozen = "frozen"
    active = "active"


class OAuthScope(enum.StrEnum):
    """
    OAuth2 authorization scopes.
    """
    OPENID = "openid"
    PROFILE = "profile"
    EMAIL = "email"
    API = "api"
    API_READ = "api.read"
    API_WRITE = "api.write"
    ADMIN = "admin"
    WEBHOOK = "webhook"

class OauthGrantType(enum.StrEnum):
    """
    OAuth2 authorization grant types.
    """
    AUTHORIZATION_CODE = "authorization_code"
    PASSWORD = "password"
    REFRESH_TOKEN = "refresh_token"

    @classmethod
    def grant_type_list(cls):
        return [cls.AUTHORIZATION_CODE.value, cls.PASSWORD.value, cls.REFRESH_TOKEN.value]

class OauthTokenTypeHint(enum.StrEnum):
    """
    OAuth2 token validation type hint.
    """
    ACCESS_TOKEN = "access"
    REFRESH_TOKEN = "refresh"

class OAuth2Policy(enum.StrEnum):
    """OAuth2 default access policy."""
    STRICT = "strict"           # reject when no scope is required
    PERMISSIVE = "permissive"   # allow when no scope is required
    CHECK_SCOPE = "check_scope" # check the basic scope when no scope is required


class OAuthPrompt(enum.StrEnum):
    """OAuth2 authorize prompt parameter.

    Controls the user interaction on the authorization page:
    - none: silent authorization; error out directly when not logged in (backend/iframe scenarios)
    - login: force re-authentication (account switching scenario)
    - consent: force re-confirmation of authorization (permission change scenario)
    - select_account: show the account picker (multi-account scenario)
    """
    NONE = "none"
    LOGIN = "login"
    CONSENT = "consent"
    SELECT_ACCOUNT = "select_account"

    @classmethod
    def values(cls):
        return [cls.NONE, cls.LOGIN, cls.CONSENT, cls.SELECT_ACCOUNT]


class OAuthReturnType(enum.StrEnum):
    """OAuth2 authorize endpoint return type.

    - json: return JSON data; the frontend handles UI and redirects itself (SPA mode, default)
    - redirect: return an HTTP 302 redirect; the server controls the redirect
        (traditional OAuth mode)
    """
    JSON = "json"
    REDIRECT = "redirect"
