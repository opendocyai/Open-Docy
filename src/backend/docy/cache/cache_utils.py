from .cache_manager import CacheManager

def save_to_cache_sync(key, value, ex=None):
    CacheManager().sync_set(key, value, ex)

def get_from_cache_sync(key):
    return CacheManager().sync_get(key)

def delete_key_sync(key: str):
    CacheManager().sync_delete(key)

def delete_keys_sync(keys: list[str]):
    CacheManager().sync_delete_many(keys)

# ---------- async functions ----------
async def save_to_cache(key, value, ex=None):
    await CacheManager().async_set(key, value, ex)

async def get_from_cache(key):
    return await CacheManager().async_get(key)

async def get_keys_by_prefix(prefix) -> list:
    return await CacheManager().async_keys(prefix)

async def delete_key_from_cache(key: str):
    await CacheManager().async_delete(key)

async def delete_keys_from_cache(keys: list[str]):
    await CacheManager().async_delete_many(keys)


async def get_from_redis(redis_client, key):
    """Legacy-compatible cache read entry; always goes through CacheManager."""
    return await get_from_cache(key)