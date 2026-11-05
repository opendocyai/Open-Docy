from fastapi import APIRouter
from .v1 import (
    agent_router,
    auth_router,
    common_router,
    workspace_router,
    activities_router,
    message_router,
    webhook_router,
    api_key_router,
    role_router,
    menu_router,
    template_router,
    agent_node_router,
    bot_router,
    audit_router,
    SSE_STREAM,
    SSE_LOG_STREAM,
)

router = APIRouter(prefix="/api/v1")
router.include_router(agent_router)
router.include_router(auth_router)
router.include_router(common_router)
router.include_router(workspace_router)
router.include_router(activities_router)
router.include_router(message_router)
router.include_router(webhook_router)
router.include_router(api_key_router)
router.include_router(role_router)
router.include_router(menu_router)
router.include_router(template_router)
router.include_router(agent_node_router)
router.include_router(bot_router)
router.include_router(audit_router)


def _iter_routes(routes):
    """Expand lazily-included nested routes, yielding (name, path) tuples.

    In FastAPI >= 0.140 include_router is lazy, so router.routes holds
    _IncludedRouter proxy objects that must be expanded recursively;
    older versions iterate real routes directly.
    """
    try:
        from fastapi.routing import _IncludedRouter, _EffectiveRouteContext
    except ImportError:  # older FastAPI versions
        for route in routes:
            yield getattr(route, "name", None), getattr(route, "path", "")
        return

    for route in routes:
        if isinstance(route, _IncludedRouter):
            yield from _iter_routes(route.effective_candidates())
        elif isinstance(route, _EffectiveRouteContext):
            yield (
                getattr(route.original_route, "name", None),
                route.path or getattr(route.original_route, "path", ""),
            )
        else:
            yield getattr(route, "name", None), getattr(route, "path", "")


def register_special_path(app):
    path_map = {}
    for name, path in _iter_routes(router.routes):
        if name in [SSE_STREAM, SSE_LOG_STREAM]:
            path_list = path_map.setdefault("sse", [])
            path_list.append(path)
    setattr(app, "special_pats", path_map)
