from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class DatabaseSetting:
    """
    Provides some common parameters.
    """
    POOL_SIZE = 3           # SQLite prefers a small connection pool
    POOL_RECYCLE = 3600     # connection recycle time (seconds)
    POOL_TIMEOUT = 60       # connection acquisition timeout (seconds)
    MAX_OVERFLOW = 10       # max overflow connections

    CONNECT_ARGS = {}
