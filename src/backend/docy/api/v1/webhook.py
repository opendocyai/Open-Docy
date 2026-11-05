"""Webhook routes (parameter-level compatible with the old api/v1/webhook.py;
the sample endpoint is not migrated).
"""

from typing import Optional

from fastapi import APIRouter, Body, Depends, Path, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession

from docy.core._response import pre_response as R
from docy.crud.decorator import require_api_read, require_api_write
from docy.database import api_async_db
from docy.models.tb_webhook import WebhookStatus
from docy.schema.webhook import WebhookCreateSchema, WebhookDetailSchema
from docy.services.auth.utils.security import APIOAuth2PasswordBearer
from docy.services.webhook.manager import WebhookManager

oauth2_scheme = APIOAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(tags=["Webhook"], prefix="/webhook")


@router.post("/create", dependencies=[Depends(require_api_write)])
async def create_webhook(
        request: Request,
        endpoint: str = Body(description="The endpoint URL provided by the user"),
        description: str = Body(default=None, description="Webhook description"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
):
    """Create a webhook."""
    manager = WebhookManager(db=db, request=request)
    webhook = await manager.create_webhook(endpoint, description=description)
    return R.format(WebhookCreateSchema().dump(webhook))


@router.get("/{webhook_id}/retrieve", dependencies=[Depends(require_api_read)])
async def get_webhook_by_id(
        request: Request,
        webhook_id: str = Path(description="The webhook ID to query"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
):
    """Query a webhook by webhook id."""
    manager = WebhookManager(db=db, request=request)
    await manager.check_object_owner_permission('webhook', webhook_id, owner_field='creator')
    webhook = await manager.get_webhook_by_id(webhook_id)
    return R.format(WebhookDetailSchema().dump(webhook))


@router.get("/user/webhooks", dependencies=[Depends(require_api_read)])
async def list_user_webhooks(
        request: Request,
        status: Optional[WebhookStatus] = Query(
            default=None, description="The webhook status to filter by"
        ),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
):
    """List all webhooks of the current user."""
    manager = WebhookManager(db=db, request=request)
    webhooks = await manager.list_user_webhooks(status)
    return R.format(WebhookDetailSchema().dump(webhooks, many=True))


@router.post("/{webhook_id}/update", dependencies=[Depends(require_api_write)])
async def update_webhook(
        request: Request,
        webhook_id: str = Path(description="The webhook ID to modify"),
        status: Optional[WebhookStatus] = Body(
            default=None, description="The webhook status after modification"
        ),
        endpoint: str = Body(default=None, description="The webhook endpoint after modification"),
        description: str = Body(default=None, description="The webhook description after modification"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
):
    """Update basic info of the given webhook."""
    manager = WebhookManager(db=db, request=request)
    await manager.check_object_owner_permission('webhook', webhook_id, owner_field='creator')
    webhook = await manager.update_webhook(
        webhook_id, status=status, endpoint=endpoint, description=description
    )
    return R.format(WebhookDetailSchema().dump(webhook))


@router.post("/{webhook_id}/secret/rotate", dependencies=[Depends(require_api_write)])
async def rotate_webhook_secret(
        request: Request,
        webhook_id: str = Path(description="The webhook ID to modify"),
        db: AsyncSession = Depends(api_async_db),
        token: str = Depends(oauth2_scheme),
):
    """Rotate the secret of the given webhook."""
    manager = WebhookManager(db=db, request=request)
    await manager.check_object_owner_permission('webhook', webhook_id, owner_field='creator')
    secret: str = await manager.rotate_webhook_secret(webhook_id)
    return R.format({"secret": secret})


@router.post("/verify-signature", dependencies=[Depends(require_api_write)])
async def verify_signature(
        request: Request,
        db: AsyncSession = Depends(api_async_db),
):
    """Simulate pushing a message to the user's webhook."""
    manager = WebhookManager(db=db, request=request)
    return await manager.verify_webhook_event()
