import os
import msgpack
from diskcache import Cache
from cashews import cache
from pathlib import Path
from urllib.parse import quote
from docy.bases.singleton import SingletonMeta


class CacheManager(metaclass=SingletonMeta):
    """Cache manager; SingletonMeta ensures a single global instance.

    Sync methods (in scenarios where async is unavailable) use diskcache directly;
    async methods prefer cashews (its disk backend runs in a thread pool internally
    and does not block the event loop).
    """

    def __init__(self, cache_dir: str = None):
        if not hasattr(self, "_initialized"):
            self._cache_dir = str(self.get_cache_dir(cache_dir))
            self.config_cache()
            self._initialized = True
        else:
            if cache_dir and cache_dir != self._cache_dir:
                self._cache_dir = str(self.get_cache_dir(cache_dir))
                self.config_cache()

    def get_cache_dir(self, cache_dir: str = None) -> str:
        """Get the cache directory."""
        _path = (
            Path(cache_dir)
            if cache_dir
            else Path(__file__).parent.parent / "storage/cache"
        )
        _path.mkdir(parents=True, exist_ok=True)
        # Keep the on-disk cache private: it holds login-throttle state and
        # token caches. No-op on Windows, effective on POSIX.
        os.chmod(_path, 0o700)
        return str(_path)

    def config_cache(self):
        """Configure the cache."""
        self._sync_cache = Cache(self._cache_dir)
        # this cashews version registers the backend alias "disk" (not "diskcache");
        # the directory is passed via the query parameter
        cache.setup(f"disk://?directory={quote(self._cache_dir)}")

    # ---------- sync methods (use diskcache directly) ----------
    def sync_set(self, key, value, ex=None):
        data = msgpack.packb(value)
        self._sync_cache.set(key, data, expire=ex)

    def sync_get(self, key):
        data = self._sync_cache.get(key)
        if data is not None:
            return msgpack.unpackb(data)
        return None

    def sync_delete(self, key):
        self._sync_cache.delete(key)

    def sync_delete_many(self, keys):
        for key in keys:
            self._sync_cache.delete(key)

    # ---------- async methods (use cashews) ----------
    async def async_set(self, key, value, ex=None):
        data = msgpack.packb(value)
        await cache.set(key, data, expire=ex)

    async def async_get(self, key):
        data = await cache.get(key)
        if data is not None:
            return msgpack.unpackb(data)
        return None

    async def async_keys(self, prefix: str) -> list:
        return await cache.keys(f'{prefix}*')

    async def async_delete(self, key: str):
        await cache.delete(key)

    async def async_delete_many(self, keys: list[str]):
        for key in keys:
            await cache.delete(key)
