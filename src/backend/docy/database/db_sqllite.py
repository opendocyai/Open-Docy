import os
from pathlib import Path
from loguru import logger
from sqlalchemy import create_engine, event
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine
from docy.bases.dbs import DatabaseSetting

class SQLiteDatabase(DatabaseSetting):
    """
    SQLite database connection.
    """
    DB_NAME = "docy.db"

    @staticmethod
    def get_db_file_path():
        db_path = Path(__file__).parent.parent / "storage" / SQLiteDatabase.DB_NAME
        # Ensure the directory exists
        db_path.parent.mkdir(parents=True, exist_ok=True)
        # Create an empty file if it does not exist
        if not db_path.exists():
            db_path.touch()
        return db_path

    @staticmethod
    def get_db_path(is_sync: bool = False)->str:
        driver = "" if is_sync else "+aiosqlite"
        db_path = SQLiteDatabase.get_db_file_path().as_posix()
        return f"sqlite{driver}:///{db_path}"

    @staticmethod
    def get_connection_args() -> dict:
        """Get connection arguments."""
        args = DatabaseSetting.CONNECT_ARGS.copy()
        # Additional arguments can be added here
        return args

    def create_db_engine(self, is_sync: bool = False, **kwargs):
        """Create the database engine."""
        db_url = self.get_db_path(is_sync)
        connect_args = self.get_connection_args()
        engine_kwargs = {
            "pool_size": self.POOL_SIZE,
            "pool_recycle": self.POOL_RECYCLE,
            "pool_timeout": self.POOL_TIMEOUT,
            "max_overflow": self.MAX_OVERFLOW,
            "connect_args": connect_args,
            "pool_pre_ping": True,
            "echo": os.getenv("SQL_ECHO", "false").lower() == "true",
        }

        if is_sync:
            engine_kwargs["isolation_level"] = "SERIALIZABLE"
            engine_kwargs.update(kwargs)
            logger.bind(category="db").info(f"create sync engine with url: {db_url}")
            return create_engine(db_url, **engine_kwargs)
        else:
            engine_kwargs["future"] = True
            engine_kwargs.update(kwargs)
            logger.bind(category="db").info(f"create async engine with url: {db_url}")
            return create_async_engine(db_url, **engine_kwargs)

    def configure_engine(self, engine):
        """Configure the database engine (sync/async compatible)."""
        # Get the underlying sync engine (for AsyncEngine, use its sync_engine)
        if isinstance(engine, AsyncEngine):
            sync_engine = engine.sync_engine
        else:
            sync_engine = engine

        @event.listens_for(sync_engine, "connect")
        def set_sqlite_pragma(dbapi_connection, connection_record):
            cursor = dbapi_connection.cursor()
            cursor.execute("PRAGMA journal_mode=WAL")
            cursor.execute("PRAGMA foreign_keys=ON")
            cursor.execute("PRAGMA synchronous=NORMAL")
            cursor.execute("PRAGMA cache_size=-10000")
            cursor.execute("PRAGMA busy_timeout=5000")
            cursor.close()

        @event.listens_for(sync_engine, "begin")
        def on_begin(conn):
            pass  # add transaction-level settings here if needed


    

    


