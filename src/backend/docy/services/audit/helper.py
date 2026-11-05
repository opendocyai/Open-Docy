"""Audit write helper — for use by business code.

Automatically writes audit records around key business operations to simplify
integration code.

Usage examples:
    from docy.services.audit.helper import audit

    # Agent created
    await audit(request, db).write(
        chain_id=agent.space_id,
        actor_id=request.user.id,
        actor_type=ActorType.USER,
        resource_type=ResourceType.AGENT,
        resource_id=agent.id,
        action=Action.CREATE,
        outcome=Outcome.SUCCESS,
        payload={"name": agent.name, "description": agent.description},
    )

    # Workspace permission changed
    await audit(request, db).write(
        chain_id=space_id,
        actor_id=request.user.id,
        actor_type=ActorType.USER,
        resource_type=ResourceType.POLICY,
        resource_id=member_id,
        action=Action.UPDATE,
        outcome=Outcome.SUCCESS,
        source_ip=request.client.host if request.client else None,
        payload={"role_changed": {"from": "viewer", "to": "editor"}},
    )
"""

from __future__ import annotations

import uuid
from typing import Optional

from fastapi import Request
from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession

from docy.schema.audit import (
    Action,
    ActorType,
    AuditEventCreate,
    Outcome,
    ResourceType,
)
from docy.services.audit.manager import AuditWriter


class AuditHelper:
    """Audit write shortcut — main entry point for business code."""

    def __init__(self, request: Request, db: AsyncSession):
        self._request = request
        self._db = db

    def _get_client_ip(self) -> Optional[str]:
        client = getattr(self._request, "client", None)
        return client.host if client else None

    def write(
        self,
        *,
        chain_id: str,
        actor_id: Optional[str] = None,
        actor_type: ActorType = ActorType.USER,
        resource_type: ResourceType,
        resource_id: str,
        action: Action,
        outcome: Outcome = Outcome.SUCCESS,
        source_ip: Optional[str] = None,
        request_id: Optional[str] = None,
        payload: Optional[dict] = None,
    ) -> AuditWriter:
        """
        Build the audit event and return the writer.

        Business code calls .write() and then awaits writer.write(event) to
        complete the write. This method can also be awaited directly (chaining
        after the returned writer).

        Note: returns the writer object; business code must await
        writer.write(event).
        """
        event = AuditEventCreate(
            chain_id=chain_id,
            actor_id=actor_id or self._request.user.id,
            actor_type=actor_type,
            resource_type=resource_type,
            resource_id=resource_id,
            action=action,
            outcome=outcome,
            source_ip=source_ip or self._get_client_ip(),
            request_id=request_id or str(uuid.uuid4()),
            payload=payload or {},
        )
        writer = AuditWriter(request=self._request, db=self._db)
        # Set the writer's event attribute directly
        writer._event = event
        return writer

    async def write_quick(
        self,
        *,
        chain_id: str,
        actor_id: Optional[str] = None,
        actor_type: ActorType = ActorType.USER,
        resource_type: ResourceType,
        resource_id: str,
        action: Action,
        outcome: Outcome = Outcome.SUCCESS,
        source_ip: Optional[str] = None,
        request_id: Optional[str] = None,
        payload: Optional[dict] = None,
    ):
        """Write one audit record (single step). Log failures without raising."""
        try:
            event = AuditEventCreate(
                chain_id=chain_id,
                actor_id=actor_id or self._request.user.id,
                actor_type=actor_type,
                resource_type=resource_type,
                resource_id=resource_id,
                action=action,
                outcome=outcome,
                source_ip=source_ip or self._get_client_ip(),
                request_id=request_id or str(uuid.uuid4()),
                payload=payload or {},
            )
            writer = AuditWriter(request=self._request, db=self._db)
            return await writer.write(event)
        except Exception as e:
            logger.error(f"write_quick error: {e}")
            logger.exception(
                f"audit_write_failed",
                f"resource_type={resource_type.value}",
                f"resource_id={resource_id}",
                f"action={action.value}",
            )
            return None


def audit(request: Request, db: AsyncSession) -> AuditHelper:
    """Create an AuditHelper instance."""
    return AuditHelper(request, db)
