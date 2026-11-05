"""Webhook business management (aligned one-to-one with the legacy services/webhook/manager.py)."""

import asyncio
from typing import Dict, Optional

from loguru import logger

from docy.bases.base_manager import BaseManager
from docy.core._string import gen_snowflake_id
from docy.exceptions import exception as PE
from docy.models.tb_webhook import Webhooks
from docy.services.webhook.tasks import deliver_webhook
from docy.services.webhook.url_validator import validate_webhook_url, webhook_url_policy
from docy.services.webhook.utils import WebhookValidator
from docy.utils.sql_query import async_list_objects, async_retrieve_object

LOG = logger.bind(category="webhook")


async def _validate_endpoint(endpoint: str) -> None:
    allow_http, allowed_hosts = webhook_url_policy()
    await asyncio.to_thread(
        validate_webhook_url,
        endpoint,
        allow_http=allow_http,
        allowed_hosts=allowed_hosts,
    )


class WebhookManager(BaseManager):

    async def create_webhook(
        self, endpoint: str, creator: str = None, description: str = None
    ):
        await _validate_endpoint(endpoint)
        webhook_id = gen_snowflake_id()
        if not creator:
            creator = self.request.user.id
        user_webhooks = await self.list_user_webhooks(creator=creator)
        if len(user_webhooks) > 0:
            msg = "A user can only create one webhook record. If you want to modify the webhook description, " \
                  "call the update method. If you want to change the webhook secret key, call the rotate method."
            raise PE.OperationNotAllow(msg)
        webhook = Webhooks(
            id=webhook_id,
            endpoint=endpoint,
            creator=creator,
            description=description,
        )
        self.db.add(webhook)
        await self.db.commit()
        await self.db.refresh(webhook)
        return webhook

    async def get_webhook_by_id(self, webhook_id):
        webhook = await async_retrieve_object(
            self.db,
            Webhooks,
            o_id=webhook_id,
            condition=[Webhooks.creator == self.request.user.id],
        )
        if not webhook:
            raise PE.ObjectNotFound("webhook not found.")
        return webhook

    async def list_user_webhooks(self, status=None, creator=None):
        if not creator:
            creator = self.request.user.id
        condition = [Webhooks.is_delete == False,
                     Webhooks.creator == creator]
        if status:
            condition.append(Webhooks.status == status)
        webhooks = await async_list_objects(self.db, Webhooks, condition=condition)
        return webhooks

    async def update_webhook(self, webhook_id, **kwargs):
        webhook = await self.get_webhook_by_id(webhook_id)
        if not webhook:
            raise PE.ObjectNotFound("webhook not found.")
        endpoint = kwargs.get("endpoint")
        if endpoint:
            await _validate_endpoint(endpoint)
        for k, v in kwargs.items():
            if hasattr(Webhooks, k) and v is not None:
                setattr(webhook, k, v)
        await self.db.commit()
        await self.db.refresh(webhook)
        return webhook

    async def rotate_webhook_secret(self, webhook_id: str) -> Optional[str]:
        """Rotate the webhook signing secret."""
        webhook: Webhooks = await self.get_webhook_by_id(webhook_id)
        if not webhook:
            return None

        new_secret = webhook.rotate_secret()
        await self.db.commit()

        return new_secret

    async def request_webhook_event(self, payload: Dict):
        try:
            # Get the user's webhook
            webhook: Webhooks = await async_retrieve_object(self.db, Webhooks,
                                                            condition=[Webhooks.creator == self.request.user.id])
            if not webhook:
                raise ValueError("user's webhook not found.")
            self.send_webhook_event(webhook.endpoint, webhook.signature, payload)
        except Exception as e:
            LOG.error(f"Send webhook to user<{self.request.user.id}> error:{e}.")

    def send_webhook_event(self, webhook_url: str, secret: str, payload: Dict, retry_count: int = 3):
        """
        Send a webhook event to the user (honker async delivery; retry_count is
        kept for interface compatibility, the actual retry count is controlled
        by @task(retries=3)).
        """
        deliver_webhook(webhook_url, secret, payload)

    async def verify_webhook_event(self):
        signature_header = self.request.headers.get("X-Webhook-Signature")
        webhook_secret = self.request.headers.get("X-Webhook-Secret")
        body_bytes = await self.request.body()
        flag = WebhookValidator.verify_signature(
            body_bytes, signature_header, webhook_secret
        )
        return flag
