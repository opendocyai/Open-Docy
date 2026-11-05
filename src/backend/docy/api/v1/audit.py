"""Audit routes (migrated from old backend api/v1/audit.py).

The require_perm permission decorator from the old version has no matching
permission framework in OSE and was not migrated (most old routes already
had the decorator commented out).
"""

from typing import List, Optional

from fastapi import APIRouter, Body, Depends, Path, Query, Request
from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import StreamingResponse

from docy.common.pagination import DependsPagination, PageData, paging_data
from docy.common.response.response_code import CustomErrorCode
from docy.common.response.response_schema import (
    ResponseModel,
    ResponseSchemaModel,
    response_base as R,
)
from docy.database import api_async_db
from docy.schema.audit import (
    AuditEventCreate,
    AuditRecordDetailResponse,
    AuditRecordResponse,
    AuditStatsResponse,
    AuditFilterOptionsResponse,
    ChainVerificationResult,
    SingleRecordVerificationResult,
    AuditTimelineResponse,
    FilterUserOption,
)
from docy.services.audit.anchor_service import AnchorService
from docy.services.audit.chain_verifier import ChainVerifier
from docy.services.audit.db_guard import install_triggers, check_triggers
from docy.services.audit.export_service import AuditExportService
from docy.services.audit.health_monitor import AuditHealthMonitor, HealthReport
from docy.services.audit.manager import AuditWriter
from docy.services.audit.query_service import AuditQueryService
from docy.services.audit.stats_service import AuditStatsService
from docy.services.auth.utils.dependencies import oauth2_scheme

router = APIRouter(prefix="/audit", tags=["Audit"])
LOG = logger.bind(category="audit")


# Stats dashboard
@router.get("/stats", summary="Audit statistics dashboard")
async def get_audit_stats(
    request: Request,
    space_id: str = Query(..., description="Workspace ID (required)"),
    db: AsyncSession = Depends(api_async_db),
) -> ResponseModel:
    """Get audit statistics dashboard data (isolated by space)."""
    try:
        service = AuditStatsService(db=db)
        stats = await service.get_stats(space_id)
        return R.success(data=stats)
    except Exception as e:
        logger.error(f"get_audit_stats error: {e}")
        return R.fail()


# Filter dropdown options
@router.get("/filter-event-types", summary="Get the list of event type filters in the audit log")
async def get_filter_event_types(
    request: Request,
    db: AsyncSession = Depends(api_async_db),
) -> ResponseModel:
    """Get the deduplicated list of event types appearing in audit logs (for UI dropdown filtering)."""
    try:
        service = AuditWriter(db=db)
        event_types = await service.get_event_types()
        return R.success(data=event_types)
    except Exception as e:
        logger.error(f"get_filter_event_types error: {e}")
        return R.fail()


# Query audit logs
@router.get(
    "/query",
    summary="Query audit logs",
    dependencies=[DependsPagination],
)
async def query_audit_logs(
    request: Request,
    space_id: str = Query(..., description="Workspace ID (required)"),
    keyword: str | None = Query(
        None, description="Generic text search (fuzzy match on actor_id, resource_id, payload)"
    ),
    chain_id: str | None = Query(None, description="Chain ID"),
    user_id: str | None = Query(None, description="User ID"),
    actor_id: str | None = Query(None, description="Actor ID"),
    resource_type: str | None = Query(
        None, description="Resource type: agent/task/knowledge/policy/template"
    ),
    resource_id: str | None = Query(None, description="Resource ID"),
    action: str | None = Query(
        None, description="Action: create/update/delete/execute/invite"
    ),
    outcome: str | None = Query(None, description="Outcome: success/failure"),
    start_time: str | None = Query(
        None, description="Start time (ISO format, e.g. 2026-08-07T00:00:00)"
    ),
    end_time: str | None = Query(None, description="End time (ISO format)"),
    db: AsyncSession = Depends(api_async_db),
) -> ResponseSchemaModel[PageData[AuditRecordDetailResponse]]:
    """Query audit logs with multiple conditions and pagination (isolated by space).

    New features:
      - keyword: generic text search
      - outcome: outcome filtering
      - results automatically include user info (display, email, avatar) and workspace name
    """
    try:
        service = AuditQueryService(db=db)
        stmt = service.build_query(
            keyword=keyword,
            chain_id=chain_id,
            space_id=space_id,
            user_id=user_id,
            actor_id=actor_id,
            resource_type=resource_type,
            resource_id=resource_id,
            action=action,
            outcome=outcome,
            start_time=start_time,
            end_time=end_time,
        )
        page_data = await paging_data(db, stmt)

        # Enrich with user info and workspace name
        if page_data.get("results"):
            enriched = await service.enrich_records(page_data["results"])
            page_data["results"] = enriched

        return R.success(data=page_data)
    except Exception as e:
        logger.error(f"query_audit_logs error: {e}")
        return R.fail()


# Single record detail
@router.get("/events/{event_id}", summary="Get single audit record detail")
async def get_audit_event_detail(
    request: Request,
    event_id: str,
    db: AsyncSession = Depends(api_async_db),
) -> ResponseModel:
    """Get the full detail of a single audit record, including user info.

    Used by the Audit Event Details panel on the right side of the UI.
    """
    try:
        service = AuditQueryService(db=db)
        record_detail = await service.get_record_detail(event_id)

        if not record_detail:
            return R.fail(res=CustomErrorCode.AUDIT_LOG_NOT_FOUND)
        return R.success(data=record_detail)
    except Exception as e:
        logger.error(f"get_audit_event_detail error: {e}")
        return R.fail()


# Single record verification
@router.get("/events/{event_id}/verify", summary="Verify the integrity of a single audit record")
async def verify_single_event(
    request: Request,
    event_id: str,
    db: AsyncSession = Depends(api_async_db),
) -> ResponseModel:
    """Verify the integrity of a single audit record in the hash chain.

    Checks:
      1. whether previous_hash equals the hash of the previous record
      2. whether the current hash matches the compute_chain_hash result
      3. whether the HMAC signature is valid
    """
    try:
        verifier = ChainVerifier(db=db)
        result = await verifier.verify_single_record(event_id)
        return R.success(data=result)
    except ValueError as e:
        return R.fail()
    except Exception as e:
        logger.error(f"verify_single_event error: {e}")
        return R.fail()


# Audit operations: health check and capacity planning
@router.get("/health", deprecated=True)
async def audit_health(
    request: Request,
    db: AsyncSession = Depends(api_async_db),
) -> ResponseModel:
    """Audit system health check."""
    report = await AuditHealthMonitor(
        db=db,
        request=request,
    ).check()
    return R.success(
        data={
            "healthy": report.healthy,
            "total_chains": report.total_chains,
            "total_records": report.total_records,
            "chains_with_errors": report.chains_with_errors,
            "details": report.details,
            "checked_at": report.checked_at,
        }
    )


# Anchor management
@router.post("/chains/publish-anchors", deprecated=True)
async def publish_all_anchors(
    request: Request,
    db: AsyncSession = Depends(api_async_db),
):
    """Publish anchors for all chains (called by scheduled tasks)."""
    service = AnchorService(db=db)
    results = await service.publish_all_chains()
    return R.success(data={"results": results})


@router.post("/chains/{chain_id}/publish", deprecated=True)
async def publish_anchor(
    request: Request,
    chain_id: str,
    db: AsyncSession = Depends(api_async_db),
):
    """Publish an anchor for the given chain."""
    service = AnchorService(db=db)
    result = await service.publish(chain_id)
    return R.success(data=result)


@router.get("/chains/{chain_id}/anchors", deprecated=True)
async def list_anchors(
    request: Request,
    chain_id: str,
    db: AsyncSession = Depends(api_async_db),
):
    """List all anchors of the given chain."""
    service = AnchorService(db=db)
    anchors = await service.list_anchors(chain_id)
    return R.success(data=anchors)


@router.post("/chains/{chain_id}/verify-anchor", deprecated=True)
async def verify_anchor(
    request: Request,
    chain_id: str,
    published_hash: str = Body(..., description="Externally published anchor hash"),
    db: AsyncSession = Depends(api_async_db),
):
    """Compare the current chain hash with the externally published anchor hash."""
    service = AnchorService(db=db)
    result = await service.verify_against_anchor(chain_id, published_hash)
    return R.success(data=result)


# Install/check database tamper-proof triggers
@router.post("/triggers/install")
async def install_db_triggers(
    request: Request, db: AsyncSession = Depends(api_async_db)
):
    """Install tamper-proof triggers for the audit_log table."""
    await install_triggers(db)
    return R.success(data={"status": "installed"})


@router.get("/triggers/status")
async def check_db_triggers(request: Request, db: AsyncSession = Depends(api_async_db)):
    """Check the trigger status of the audit_log table."""
    status = await check_triggers(db)
    return R.success(data=status)


# Write audit events
@router.post("/events", response_model=AuditRecordResponse, deprecated=True)
async def create_audit_event(
    request: Request,
    event: AuditEventCreate,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Write a single audit event record."""
    try:
        writer = AuditWriter(request=request, db=db)
        record = await writer.write(event)
        return record
    except Exception as e:
        logger.error(f"create_audit_event error: {e}")
        return R.fail()


@router.post("/events/batch", deprecated=True)
async def create_audit_events_batch(
    request: Request,
    events: list[AuditEventCreate] = Body(
        ..., description="List of audit events (must belong to the same chain)"
    ),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Write audit events in batch.

    Requirement: events in the same batch must belong to the same chain_id.
    """
    if not events:
        return R.success(data={"succeeded": 0, "failed": 0, "total": 0})

    writer = AuditWriter(request=request, db=db)
    results = await writer.write_batch(events)
    succeeded = sum(1 for r in results if r is not None)
    failed = sum(1 for r in results if r is None)
    return R.success(
        data={
            "succeeded": succeeded,
            "failed": failed,
            "total": len(events),
        }
    )


# Verify chain integrity
@router.get("/chains/{chain_id}/verify")
async def verify_chain(
    request: Request,
    chain_id: str,
    db: AsyncSession = Depends(api_async_db),
):
    """Verify the integrity of the given audit chain."""
    verifier = ChainVerifier(db=db)
    result = await verifier.verify_chain(chain_id)
    return R.success(data=result)


# Export audit logs of a single chain
@router.get("/export/{chain_id}")
async def export_chain(
    request: Request,
    chain_id: str,
    format_: str = Query("json", pattern="^(json|csv)$", alias="format"),
    from_seq: int = Query(0, ge=0),
    to_seq: int | None = Query(None),
    db: AsyncSession = Depends(api_async_db),
):
    """Stream-export audit logs by chain_id (kept for backward compatibility)."""
    exporter = AuditExportService(db)
    return StreamingResponse(
        exporter.stream(chain_id, format_, from_seq, to_seq),
        media_type="application/json" if format_ == "json" else "text/csv",
        headers={
            "Content-Disposition": f'attachment; filename="audit_{chain_id}.{format_}"'
        },
    )


@router.get("/export", summary="Export audit logs by filter criteria")
async def export_by_filter(
    request: Request,
    space_id: str = Query(None, description="Workspace ID (required)"),
    keyword: str | None = Query(None, description="Generic text search"),
    chain_id: str | None = Query(None, description="Chain ID"),
    user_id: str | None = Query(None, description="User ID"),
    resource_type: str | None = Query(None, description="Resource type"),
    resource_id: str | None = Query(None, description="Resource ID"),
    action: str | None = Query(None, description="Action"),
    outcome: str | None = Query(None, description="Outcome"),
    start_time: str | None = Query(None, description="Start time"),
    end_time: str | None = Query(None, description="End time"),
    format_: str = Query("csv", pattern="^(json|csv)$", alias="format"),
    db: AsyncSession = Depends(api_async_db),
):
    """Export audit logs by filter criteria (isolated by space).

    Difference from /export/{chain_id}:
      - /export/{chain_id} exports a single chain
      - /export exports by arbitrary filter criteria, for the UI "Export CSV" feature
    """
    try:
        # Build query conditions
        query_service = AuditQueryService(db=db)
        stmt = query_service.build_query(
            keyword=keyword,
            chain_id=chain_id,
            space_id=space_id,
            user_id=user_id,
            resource_type=resource_type,
            resource_id=resource_id,
            action=action,
            outcome=outcome,
            start_time=start_time,
            end_time=end_time,
        )

        # Stream export
        exporter = AuditExportService(db)
        filename = f"audit_export.{format_}"
        return StreamingResponse(
            exporter.stream_by_filter(stmt, format_),
            media_type="application/json" if format_ == "json" else "text/csv",
            headers={"Content-Disposition": f'attachment; filename="{filename}"'},
        )
    except Exception as e:
        logger.error(f"export_by_filter error: {e}")
        return R.fail()
