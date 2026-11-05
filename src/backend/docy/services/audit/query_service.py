"""Audit log query service.

Enhancements:
  1. Generic text search (keyword fuzzy-matches actor_id, resource_id, payload)
  2. Query results are enriched with user info (display, email, avatar)
  3. Query results are enriched with the workspace name
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from loguru import logger
from sqlalchemy import and_, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from docy.bases.base_manager import BaseManager
from docy.core.aws_s3 import default_s3_client
from docy.models.tb_audit import AuditLog
from docy.models.tb_auth import User
from docy.models.tb_workspace import Workspace
from docy.schema.audit import EVENT_TYPE_LABELS
from docy.services.audit.hash_service import GENESIS_HASH


def _parse_time(value: str) -> datetime:
    """Convert an ISO time string to a UTC naive datetime (DATETIME compatible)."""
    value = value.strip().rstrip("Z")
    # Try the standard ISO format first
    try:
        dt = datetime.fromisoformat(value)
    except ValueError:
        dt = datetime.strptime(value, "%Y-%m-%dT%H:%M:%S")
    # Convert to UTC naive
    if dt.tzinfo is not None:
        dt = dt.astimezone(timezone.utc).replace(tzinfo=None)
    return dt


class AuditQueryService(BaseManager):
    """Multi-condition audit log queries."""

    def build_query(
        self,
        *,
        keyword: str | None = None,
        chain_id: str | None = None,
        space_id: str | None = None,
        user_id: str | None = None,
        actor_id: str | None = None,
        resource_type: str | None = None,
        resource_id: str | None = None,
        action: str | None = None,
        outcome: str | None = None,
        start_time: str | None = None,
        end_time: str | None = None,
    ):
        """
        Build the query and return the unexecuted stmt for the pagination layer.

        Supports:
          - keyword: generic text search, fuzzy-matches actor_id, resource_id, payload
          - chain_id: exact match
          - space_id: prefix match (chain_id format: {space_id}--{resource_type})
          - user_id / actor_id / resource_type / resource_id / action / outcome:
            exact match
          - start_time / end_time: time range filter
        """
        conditions = []

        # Generic text search
        if keyword:
            conditions.append(
                or_(
                    AuditLog.actor_id.like(f"%{keyword}%"),
                    AuditLog.resource_id.like(f"%{keyword}%"),
                    AuditLog.payload["name"].as_string().like(f"%{keyword}%"),
                )
            )

        if chain_id:
            conditions.append(AuditLog.chain_id == chain_id)

        if space_id:
            conditions.append(AuditLog.space_id == space_id)

        if user_id:
            conditions.append(AuditLog.user_id == user_id)
        if actor_id:
            conditions.append(AuditLog.actor_id == actor_id)
        if resource_type:
            conditions.append(AuditLog.resource_type == resource_type)
        if resource_id:
            conditions.append(AuditLog.resource_id == resource_id)
        if action:
            conditions.append(AuditLog.action == action)
        if outcome:
            conditions.append(AuditLog.outcome == outcome)

        if start_time:
            conditions.append(AuditLog.event_time >= _parse_time(start_time))
        if end_time:
            conditions.append(AuditLog.event_time <= _parse_time(end_time))

        return (
            select(AuditLog)
            .where(and_(*conditions))
            .order_by(AuditLog.event_time.desc())
        )

    # Result enrichment

    async def enrich_records(self, records: list[AuditLog]) -> list[dict[str, Any]]:
        """
        Batch-enrich records with user info and workspace names.

        Uses a batch preload strategy to avoid N+1 queries:
          1. Collect all actor_ids and the space_ids from chain_ids
          2. Batch-query the User and Workspace tables
          3. Assemble the enriched list of dicts
        """
        if not records:
            return []

        # Collect IDs to look up
        actor_ids: set[str] = set()
        space_ids: set[str] = set()
        for r in records:
            actor_ids.add(r.actor_id)
            if r.space_id:
                space_ids.add(r.space_id)

        # Batch-fetch user info
        users_map = await self._batch_get_users(actor_ids)
        # Batch-fetch workspace info
        workspaces_map = await self._batch_get_workspaces(space_ids)

        # Batch-generate avatar URLs
        avatar_keys = set()
        for user_data in users_map.values():
            avatar = user_data.get("avatar")
            if avatar:
                avatar_keys.add(avatar)
        avatar_urls_map = self._batch_get_avatar_urls(avatar_keys)

        # Assemble results
        enriched = []
        for r in records:
            user = users_map.get(r.actor_id)
            workspace = workspaces_map.get(r.space_id) if r.space_id else None

            # Get the event type display label
            action_label = EVENT_TYPE_LABELS.get(
                (r.action, r.resource_type),
                f"{r.action.title()} {r.resource_type.title()}",
            )

            # Build the action description
            actor_display = user.get("display") if user else None
            action_description = self._build_action_description(
                action=r.action,
                resource_type=r.resource_type,
                actor_name=actor_display,
                payload=r.payload,
            )

            enriched.append(
                {
                    "id": r.id,
                    "chain_id": r.chain_id,
                    "seq": r.seq,
                    "event_time": r.event_time,
                    "actor_id": r.actor_id,
                    "actor_name": actor_display,
                    "actor_email": user.get("email") if user else None,
                    "actor_avatar": avatar_urls_map.get(user.get("avatar")) if user else None,
                    "actor_type": r.actor_type,
                    "resource_type": r.resource_type,
                    "resource_id": r.resource_id,
                    "space_id": r.space_id,
                    "space_name": workspace.get("name") if workspace else None,
                    "action": r.action,
                    "action_label": action_label,
                    "action_description": action_description,
                    "outcome": r.outcome,
                    "source_ip": r.source_ip,
                    "payload": r.payload,
                    "payload_hash": r.payload_hash,
                    "hash": r.hash,
                    "previous_hash": (
                        "" if r.previous_hash == GENESIS_HASH else r.previous_hash
                    ),
                    "signature": r.signature,
                }
            )

        return enriched

    async def get_record_by_id(self, event_id: str) -> AuditLog | None:
        """Query a single audit record by ID."""
        stmt = select(AuditLog).where(AuditLog.id == event_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_record_detail(self, event_id: str) -> dict[str, Any] | None:
        """
        Query a single audit record's details, including user info and the
        workspace name.

        Returns:
            the enriched dict, or None if the record does not exist
        """
        record = await self.get_record_by_id(event_id)
        if not record:
            return None

        enriched = await self.enrich_records([record])
        return enriched[0] if enriched else None

    async def _batch_get_users(self, user_ids: set[str]) -> dict[str, dict[str, Any]]:
        """Batch-query user info, returning {user_id: {display, email, avatar}}."""
        if not user_ids:
            return {}

        stmt = select(User).where(User.id.in_(user_ids))
        result = await self.db.execute(stmt)
        users = result.scalars().all()

        return {
            u.id: {
                "display": u.display,
                "email": u.email,
                "avatar": u.avatar,
            }
            for u in users
        }

    async def _batch_get_workspaces(
        self, workspace_ids: set[str]
    ) -> dict[str, dict[str, Any]]:
        """Batch-query workspace info, returning {workspace_id: {name}}."""
        if not workspace_ids:
            return {}

        stmt = select(Workspace).where(Workspace.id.in_(workspace_ids))
        result = await self.db.execute(stmt)
        workspaces = result.scalars().all()

        return {ws.id: {"name": ws.name} for ws in workspaces}

    @staticmethod
    def _batch_get_avatar_urls(avatar_keys: set[str]) -> dict[str, str]:
        """
        Batch-generate S3 presigned URLs for avatars.

        Args:
            avatar_keys: set of avatar keys

        Returns:
            {avatar_key: presigned_url}
        """
        if not avatar_keys:
            return {}

        url_map = {}
        for key in avatar_keys:
            url = default_s3_client.url(key)
            if url:
                url_map[key] = url
        return url_map

    @staticmethod
    def _build_action_description(
        action: str,
        resource_type: str,
        actor_name: str | None,
        payload: dict,
    ) -> str:
        """
        Build a human-readable description from the action type, resource type,
        actor name, and payload.

        Examples:
          - "John Smith updated the document 'Contract_2026.pdf'"
          - "Agent 'Document Analyzer' was executed successfully by Lisa Chen."
        """
        name = payload.get("name", "")
        actor = actor_name or "Unknown"

        # Handle a list of file names (may contain multiple files)
        if isinstance(name, list):
            if len(name) == 0:
                name = ""
            elif len(name) == 1:
                name = name[0]
            else:
                # Multiple files: show the first two names and the total
                name = f"{name[0]}, {name[1]} and {len(name) - 2} more"

        # Resource type mapping
        resource_labels = {
            "knowledge": "document",
            "agent": "agent",
            "task": "task",
            "space": "workspace",
            "policy": "permission",
            "template": "template",
        }
        resource_label = resource_labels.get(resource_type, resource_type)

        # Verb mapping
        action_verbs = {
            "create": "created",
            "update": "updated",
            "delete": "deleted",
            "execute": "executed",
            "invite": "invited",
            "publish": "published",
            "complete": "completed",
            "fail": "failed",
            "resume": "resumed",
            "cancel": "canceled",
            "batch_delete": "deleted",
        }
        verb = action_verbs.get(action, action)

        # Agent publish: distinguish the destination
        if resource_type == "agent" and action == "publish":
            if payload.get("destination") == "marketplace":
                return f'{actor} published the agent "{name}" to personally & Marketplace.'
            return f'{actor} published the agent "{name}" to personally.'

        # Task run-result descriptions
        if resource_type == "task" and action == "complete":
            return f'The task "{name}" completed successfully.'

        if resource_type == "task" and action == "fail":
            error = payload.get("error") or ""
            if error:
                return f'The task "{name}" failed: {error}.'
            return f'The task "{name}" failed.'

        if resource_type == "task" and action == "action_required":
            nodes = payload.get("manual_nodes") or []
            if nodes:
                return (
                    f'The task "{name}" requires manual action on '
                    f'node(s): {", ".join(str(n) for n in nodes)}.'
                )
            return f'The task "{name}" is waiting for manual action.'

        if resource_type == "task" and action == "resume":
            return f'{actor} resumed the task "{name}" after manual action.'

        # Workspace member operations
        if resource_type == "space" and payload.get("action") == "remove_member":
            member_name = payload.get("name", "")
            if member_name:
                return f'{actor} removed the member "{member_name}" from the workspace.'
            return f"{actor} removed a member from the workspace."

        if (
            resource_type == "space"
            and action == "update"
            and payload.get("member_id")
            and payload.get("updated_fields") == ["role_id"]
        ):
            role_id = payload.get("role_id")
            return (
                f'{actor} updated the role of member "{payload.get("member_id")}" '
                f'to role_id "{role_id}".'
            )

        # Build the description based on the action type
        if action == "execute":
            if name:
                return f'{actor} executed the {resource_label} "{name}" successfully.'
            return f"{actor} executed a {resource_label} successfully."

        if action == "invite":
            return f"{actor} invited a new member to the workspace."

        if name:
            return f'{actor} {verb} the {resource_label} "{name}".'

        return f"{actor} {verb} a {resource_label}."
