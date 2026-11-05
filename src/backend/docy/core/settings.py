"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/9
Last Modified: 2025/6/9
Last Editor:
Filename: settings
Description:
"""

import os
import threading
import typing
from typing import Optional, Dict, Type, TypeVar
from configparser import ConfigParser
from pathlib import Path
from starlette.templating import Jinja2Templates

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent.parent
TEMPLATES_PATH = Path(__file__).parent.parent / "template"

__all__ = ["project_settings", "BaseSettings", "BaseSection", "TEMP_DIR"]


class SectionMetaClass(type):

    def __new__(mcs, name, bases, attrs):
        """
        Check for unsupported annotation types
        """
        _super_new = super().__new__
        _supported_types = {
            str: "str",
            int: "int",
            float: "float",
            bool: "bool",
            list: "list",
            bytes: "bytes",
        }
        # Add annotations for classes that have none
        if not hasattr(mcs, "__annotations__"):
            setattr(mcs, "__annotations__", {})

        attrs["_supported_types"] = _supported_types
        for attr, val in mcs.__annotations__.items():
            if val not in _supported_types:
                _types = ", ".join(map(lambda t: t.__name__, _supported_types))
                raise AttributeError(
                    f"The type '{val}' for '{attr}' is not supported by settings. "
                    f"Supported types are {_types}."
                )

        return _super_new(mcs, name, bases, attrs)


class BaseSection(object, metaclass=SectionMetaClass):
    """
    The section name in the config file must match the class name,
    e.g.:
    [Mariadb]
    host=127.0.0.1

    class Mariadb:
        pass

    Note: defined options (attribute names) must not start with an underscore
    """

    _parser = None
    _allow_undefined = True  # Whether undefined attributes are allowed

    def __init__(self, allow_undefined=None):
        """
        allow_undefined: whether to allow reading undefined options
        (if present, they default to strings)
        """
        self._section_name = self.__class__.__name__
        if allow_undefined is not None:
            self._allow_undefined = allow_undefined

    def __getattr__(self, key):
        """
        Get the configured value via the annotated type
        """
        # Copy, not the class annotations dict: mutating __annotations__ would
        # leak transient undefined options into every other section read.
        options = dict(self.__annotations__)
        option_keys = options.keys()
        section_name = self.__class__.__name__
        if key not in option_keys:
            if self._allow_undefined:
                # build undefined option
                options[key] = str
            else:
                raise AttributeError(
                    "No option '%s' defined in section %s." % (key, section_name)
                )
        for option, a_type in options.items():
            if key == option:
                try:
                    value = self._parser.get(section_name, option)
                except Exception as e:
                    raise e
                # type changing
                type_name = self._supported_types.get(a_type)
                try:
                    # try to get the self defined method
                    return object.__getattribute__(self, "to_" + type_name).__call__(
                        value
                    )
                except AttributeError:
                    pass
                except TypeError:
                    raise TypeError(
                        f'The value "{value}" for option {option} is invalid.'
                    )

                if value is None:
                    return value
                # default action
                return a_type.__call__(value)
        return super().__getattribute__(key)

    def __repr__(self):
        return "<%s section object>" % self.__class__.__name__

    def __dict__(self):
        dirs = dict()
        for key, value in self.__annotations__.items():
            dirs[key] = getattr(self, key)
        return dirs

    def add_supported_type(self, _type, type_name):
        assert isinstance(type_name, str)
        self._supported_types.update({_type: type_name})

    @staticmethod
    def to_bool(value: str):
        if value in ("true", "True"):
            return True
        elif value in ("false", "False"):
            return False
        raise TypeError


T = TypeVar("T", bound="BaseSettings")


class BaseSettings:
    _instance: Optional["BaseSettings"] = None
    _lock: threading.Lock = threading.Lock()
    path: Optional[Path] = None
    file_name: str = "settings.ini"

    def __new__(cls: Type[T], *args, **kwargs) -> T:
        project_env = os.environ.get("env")
        cls.path = Path(BASE_DIR) / cls.file_name
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance.__init_settings(*args, **kwargs)
        return cls._instance

    def __init__(self, path:str=None) -> None:
        """
        If log_dir is given, update the config file path and reload the config
        """
        if path:
            log_path = Path(path)
            if log_path.exists():
                # Update the config file path with the new log_dir
                self.reload(new_path=log_path)

    def __init_settings(self, *args, **kwargs) -> None:
        if self.path is None:
            raise AttributeError("Class attribute 'path' must be set")
        if not self.path.exists():
            raise FileNotFoundError(f"Config file not found: {self.path}")

        parser = ConfigParser()
        parser.read(self.path, encoding="utf-8")

        for name, attr in vars(type(self)).items():
            if not name.startswith("_") and isinstance(attr, BaseSection):
                setattr(attr, "_parser", parser)

    def reload(
            self, new_path: Optional[Path] = None
    ) -> None:
        """Reload configuration with thread safety"""
        with self._lock:
            if new_path:
                self.path = new_path
                self.file_name = new_path.name
            self.__init_settings()

    def update(self, section: str, name: str, value: any):
        """
        Update the config file; create the section automatically if it doesn't exist.
        """
        parser = ConfigParser()
        parser.read(self.path, encoding="utf-8")

        # Create the section if it doesn't exist
        if not parser.has_section(section):
            parser.add_section(section)

        # Set the option (value converted to string)
        parser.set(section, name, str(value))

        with open(self.path, "w", encoding="utf-8") as f:
            parser.write(f)

    def __dir__(self):
        dirs = super().__dir__()
        dirs = [
            item
            for item in dirs
            if not item.startswith("_") and isinstance(getattr(self, item), BaseSection)
        ]
        return dirs

    def __iter__(self):
        dirs = self.__dir__()
        for item in dirs:
            yield getattr(self, item).__dict__()

    def __repr__(self):
        return "<%s settings object>" % self.__class__.__name__


class DEFAULT(BaseSection):
    log_dir: str
    tmp_dir: str
    secret: str
    timezone: str
    agent_lock_ttl: int


class Security(BaseSection):
    api_key: str
    secret_key: str
    password_level: str
    password_min_length: int
    password_max_length: int
    jwt_secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    refresh_token_expire_minutes: int
    oauth_access_token_expire_minutes: int
    oauth_refresh_token_expire_minutes: int
    verification_code_expire_minutes: int

    @property
    def password_validators(self):

        # min length validator
        validators = [{"NAME": "docy.services.auth.utils.password.MinimumLengthValidator"}]
        # password policy validators
        if self.password_level == "medium":
            validators.append(
                {"NAME": "docy.services.auth.utils.password.MediumLevelPasswordValidator"}
            )
        elif self.password_level == "high":
            validators.append(
                {"NAME": "docy.services.auth.utils.password.HighLevelPasswordValidator"}
            )
        else:
            validators.append(
                {"NAME": "docy.services.auth.utils.password.LowLevelPasswordValidator"}
            )
        return validators


class SysSetting:
    # Common settings
    SECRET_KEY = None
    ALGORITHM = None
    ACCESS_TOKEN_EXPIRE_MINUTES = None
    REFRESH_TOKEN_EXPIRE_MINUTES = None
    OAUTH_ACCESS_TOKEN_EXPIRE_MINUTES = None
    OAUTH_REFRESH_TOKEN_EXPIRE_MINUTES = None
    PAGE_SIZE = 10
    PAGE_QUERY_PARAM = "pageNumber"
    PAGE_SIZE_QUERY_PARAM = "pageSize"
    PAGINATION_ENABLED = "paginated"
    ORDER_BY_PARAM = "orderBy"
    TEMPLATES = Jinja2Templates(directory=TEMPLATES_PATH)
    AUTHENTICATION_BACKENDS = [
        "docy.services.auth.backend.DefaultBackend",
        # "docy.services.auth.backend.GoogleBackend",
    ]
    RAM_AUTHENTICATION_BACKENDS = ["docy.services.auth.backend.DefaultBackend"]
    LOG_DIR = None
    TMP_DIR = None

    @property
    def templates(self):
        return SysSetting.TEMPLATES


class S3(BaseSection):
    driver_type: str
    endpoint_url: str
    aws_access_key_id: str
    aws_secret_access_key: str
    aws_default_region: str
    bucket: str


class Server(BaseSection):
    http_server_host: str
    http_server_port: int
    # Publicly reachable base URL (file download/upload URLs etc.);
    # defaults to http://127.0.0.1:<port> when unset
    public_base_url: str

    @property
    def base_url(self) -> str:
        # The public base URL prefers the configured public_base_url
        # (settings.ini [Server] section) and falls back to the loopback
        # address when unset — single-machine/same-domain deployments work
        # out of the box; for remote access the deployer must set
        # public_base_url to an address reachable by clients.
        try:
            base = (self.public_base_url or "").strip().rstrip("/")
        except Exception:
            base = ""
        return base or f"http://127.0.0.1:{self.http_server_port}"


class ProjectSettings(BaseSettings):
    """
    Project settings
    """

    path = Path(BASE_DIR).joinpath("settings.ini")

    system: SysSetting = SysSetting()
    default: DEFAULT = DEFAULT()
    security: Security = Security()
    s3: S3 = S3()
    server: Server = Server()

    def __init__(self):
        self.system.LOG_DIR = self.create_dirs(self.default.log_dir, "logs")
        self.system.TMP_DIR = self.create_dirs(self.default.tmp_dir, "temp")
        self.system.SECRET_KEY = self.security.jwt_secret_key
        self.system.ALGORITHM = self.security.algorithm
        self.system.ACCESS_TOKEN_EXPIRE_MINUTES = self.security.access_token_expire_minutes
        self.system.REFRESH_TOKEN_EXPIRE_MINUTES = self.security.refresh_token_expire_minutes
        self.system.OAUTH_ACCESS_TOKEN_EXPIRE_MINUTES = self.security.oauth_access_token_expire_minutes
        self.system.OAUTH_REFRESH_TOKEN_EXPIRE_MINUTES = self.security.oauth_refresh_token_expire_minutes

    @staticmethod
    def create_dirs(path, default: str):
        dir_path = BASE_DIR / Path(path) if path else BASE_DIR / default
        if not dir_path.exists():
            os.makedirs(str(dir_path), exist_ok=True)
        return str(dir_path)


project_settings = ProjectSettings()
TEMP_DIR = BASE_DIR / project_settings.system.TMP_DIR if project_settings.system.TMP_DIR else BASE_DIR / "temp"