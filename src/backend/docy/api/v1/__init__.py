from .agent import router as agent_router
from  .auth import router as auth_router
from .common import router as common_router, SSE_STREAM
from .workspace import router as workspace_router
from .activities import router as activities_router
from .message import router as message_router
from .webhook import router as webhook_router
from .api_key import router as api_key_router
from .role import router as role_router
from .menu import router as menu_router
from .template import router as template_router
from .node import router as agent_node_router
from .bot import router as bot_router
from .audit import router as audit_router

# The sse_log_stream route lives in the activities module (not migrated yet,
# router not registered); define the constant here for register_special_path
# in api/router.py. Switch back to importing from .activities once migration
# completes.
SSE_LOG_STREAM = "sse_log_stream"

__all__ = [
    "agent_router",
    "auth_router",
    "common_router",
    "SSE_STREAM",
    "SSE_LOG_STREAM",
    "workspace_router",
    "activities_router",
    "message_router",
    "webhook_router",
    "api_key_router",
    "role_router",
    "menu_router",
    "template_router",
    "agent_node_router",
    "bot_router",
    "audit_router",
]