"""API key business management (aligned one-to-one with the legacy services/api_key/manager.py)."""

import hashlib
import secrets

from docy.bases.base_manager import BaseManager
from docy.models.tb_apikey import APIKey
from docy.utils.sql_query import async_list_objects, async_retrieve_object


def hash_api_key(raw_key: str) -> str:
    return hashlib.sha256(raw_key.encode()).hexdigest()


class ApiKeyManager(BaseManager):

    async def get_api_key(self):
        return await async_list_objects(
            self.db, APIKey, condition=[APIKey.user_id == self.request.user.id]
        )

    async def create_api_key(self, name) -> tuple[APIKey, str]:
        generated_api_key = f"sk-{secrets.token_urlsafe(32)}"
        api_key = APIKey(
            api_key=None,
            api_key_hash=hash_api_key(generated_api_key),
            name=name,
            user_id=self.request.user.id
        )
        self.db.add(api_key)
        await self.db.commit()
        await self.db.refresh(api_key)
        return api_key, generated_api_key

    async def delete_api_key(self, api_key_id):
        api_key = await async_retrieve_object(self.db, APIKey, o_id=api_key_id)
        if api_key is None:
            msg = "API Key not found"
            raise ValueError(msg)
        await self.db.delete(api_key)
        await self.db.commit()

    async def update_api_key(self, api_key_id, name: str):
        api_key = await async_retrieve_object(self.db, APIKey, o_id=api_key_id)
        if api_key is None:
            msg = "API Key not found"
            raise ValueError(msg)

        api_key.name = name
        await self.db.commit()
        await self.db.refresh(api_key)
        return api_key
