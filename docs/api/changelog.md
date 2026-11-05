# API Change Log

Notable changes to the external integration surface in the open-source edition. (The commercial changelog covering OAuth client support and the Python SDK launch is tracked upstream; this log records OSE-relevant changes only.)

## 2026

### October 2026

- **Agent management endpoints documented** — `POST /api/v1/agent/add-or-update` (create/update), `DELETE /api/v1/agent/{agent_id}/delete`, `DELETE /api/v1/agent/bulk-delete`, `POST /api/v1/agent/{agent_id}/visible/set`, and `GET /api/v1/agent/{agent_id}/json` added to the documented integration surface ([Agents](agents.md)); previously only read access (list/detail) was documented. The `/pre/*` editor endpoints remain UI-internal.

### September 2026

- **Task webhook push enabled by default** — `webhook_push` now defaults to `true` when creating a task via `POST /api/v1/activity/add` (integration-created tasks previously defaulted to no push). Switching it later is CLI-only (`docy activity webhook on-off`); there is no HTTP route for it.
- **CLI parity with the API** — added `docy agent` (list/get), `docy activity` (list/get/webhook on-off), `docy webhook` (create/get/list/update/rotate), and `docy api-key` (create/list/delete/update) command groups covering the same operations as the REST endpoints, operating directly on the local database.
- **Webhook test receiver** — `scripts/webhook_receiver.py` added: a local receiver that prints deliveries and validates signatures by calling `POST /api/v1/webhook/verify-signature`.

### September 2026 (audit module)

- **Audit API added** — `GET/POST /api/v1/audit/*` endpoints for the tamper-evident event log: write events, verify chains, publish anchors, export JSON/CSV. Internal to the platform; not part of the external task/webhook integration surface.

### August – September 2026 (OSE port)

- **Initial open-source release** — the full external API surface was ported from the internal codebase with parameter-level compatibility: task management (`/api/v1/activity/*`), webhooks (`/api/v1/webhook/*`), file upload/download (`/api/v1/common/pre-signed/url`, `/upload/{key}`, `/pre-download/url`, `/files/{key}`), workspaces (`/api/v1/space/*`), and agents (`/api/v1/agent/*`).
- Infrastructure replaced: PostgreSQL → SQLite (aiosqlite), Redis → cashews + diskcache, Celery → built-in honker task queue. The webhook delivery task keeps the same semantics: 3 retries with 60 s delay, HMAC-SHA256 signature.
- Disabled in the OSE: marketplace/agent-copy endpoints (`POST /api/v1/agent/market/copy` and marketplace template listing), OAuth client registration, billing/wallet endpoints.
