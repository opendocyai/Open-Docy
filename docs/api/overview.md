# Overview

## What is Docy AI?

Docy AI is an AI agent platform for document-heavy workflows. You design agents on a visual canvas — file inputs, extraction nodes, content generators, policy audits, human interaction points — and then invoke them programmatically: create a task, feed it files, and receive structured results.

### Task Automation

A **task** is one execution of an agent. Tasks accept file inputs, run the agent's node graph asynchronously, and expose results (extracted fields, generated documents, audit mappings) through the API and webhook events.

### Intelligent Agents

An **agent** is the reusable workflow definition. Each agent declares its own input nodes — the API drives them generically: query the task's input nodes to discover the required structure, then supply matching values.

### Real-time Monitoring

Task progress can be followed three ways: polling the detail endpoint, receiving **webhook events** (`task_status_changed`, `node_finished`, `task_finished`), or streaming logs over SSE (`GET /api/v1/activity/log/view`).

### Easy Integration

The full external surface is a plain JSON REST API authenticated with API keys, plus HMAC-signed webhook callbacks. The open-source edition also ships a Typer CLI (`docy agent` / `docy activity` / `docy webhook` / `docy api-key`) covering the same operations for scripting and administration.

## Key Concepts

### Agents

Agents are built in the web UI from nodes (e.g. `InputFile`, `GroupInputFile`, `ContentGeneratorPaper`, `InteractionNode`). Each agent belongs to a workspace (space). The API references agents by `agent_id` when creating tasks and also exposes agent management — create, update, delete, visibility — see [Agents](agents.md). An agent's input nodes define exactly what a task run expects.

### Tasks

A task binds an agent to a name, a space, and optional metadata. Creating a task does **not** start it — after creation you query its input nodes, upload files, then call the run endpoint. A task can be run multiple times; each run has a `run_id`.

Task lifecycle:

| Status | Meaning |
|---|---|
| `Not Started` | Created, never run |
| `Queued` | Run requested, waiting for a worker |
| `In Progress` | Executing |
| `Pause` | Paused mid-run |
| `Action Required` | Waiting at a manual (interaction) node for human input |
| `Completed` | Finished successfully |
| `Error` | Failed |
| `CANCELED` | Canceled via the cancel endpoint |

### Workspaces

Workspaces (spaces) group agents and tasks and provide access control. Every user has a personal space (created automatically at registration); team-space creation is not supported in the open-source edition. If `space_id` is omitted when creating a task, the task is created in the current user's personal space.

### Webhooks

Webhooks receive task lifecycle events as signed HTTP POST callbacks. Each user can register exactly one webhook endpoint. Delivery: `POST` with `X-Webhook-Timestamp` and `X-Webhook-Signature: t=<ts>,v1=<hmac-sha256>` headers; failed deliveries are retried 3 times with 60 s delay. See [Event Push](event-push.md).

## API Scope

This reference documents the **external integration API** — the stable surface for driving Docy programmatically:

- **Tasks & runs** — `activity/*` (create, query, run, cancel, manual nodes, results)
- **Agents** — `agent/*` (list, detail, create/update, delete, visibility, workflow JSON)
- **Workspaces** — `space/*` (list, detail, create, update, delete, members)
- **Files** — `common/pre-signed/url`, `common/upload`, `common/pre-download/url`, `common/files`
- **Webhooks & event push** — `webhook/*`
- **API keys** — `api_key/*` (bearer-token authenticated)
- **Audit** — `audit/*` (hash-chained trail: query, verify, export)

UI-internal modules exist for the bundled web frontend and are **not** part of the stable integration surface; their endpoints are not documented here and may change without an API version bump: `auth/*` (login/registration — summarized in [Authentication](authentication.md)), `menu/*`, `role/*`, `template/*`, `node/*`, `message/*`, `bot/*`.

## Base URL

Open Docy is self-hosted. All endpoints are served under:

```
http://<host>:<port>/api/v1
```

The default is `http://127.0.0.1:3000/api/v1` (configured by `http_server_host` / `http_server_port` in `settings.ini`).

## Authentication

Every request must be authenticated with one of:

- **API key** — `X-API-Key: <key>` header, for external integrations. Created and managed under `GET/POST /api/v1/api_key/` (see [Authentication](authentication.md)).
- **Bearer token** — JWT issued by `POST /api/v1/auth/token` (password grant), used by the web UI and the CLI.

A subset of endpoints additionally requires scopes (`api:read`, `api:write`) — API-key requests are granted these implicitly for the documented integration endpoints. See [Authentication](authentication.md) for details.

## Response Envelope

All endpoints return a uniform JSON envelope:

```json
{
  "data": { ... },
  "msg": "operation success.",
  "status": "success",
  "code": 200
}
```

| Field | Description |
|---|---|
| `data` | Payload — object, array, or `null` on error |
| `msg` | Human-readable result message |
| `status` | `"success"` on success; on error one of `"error"`, `"http exception."`, `"validation error."`, `"operation failed."`, `"server error."` |
| `code` | HTTP status code (envelope-level; note some error paths return HTTP 200 with a non-200 `code`) |

## Error Responses

Errors use the same envelope with `status: "error"`:

```json
{ "data": null, "msg": "Invalid API Key", "status": "error", "code": 401 }
```

Common codes:

| Code | Meaning |
|---|---|
| 400 | Bad request — includes request-body validation errors (`status: "validation error."`) and not-found errors from many endpoints (see the per-endpoint docs for the actual envelope code) |
| 401 | Unauthorized — missing or invalid API key / token |
| 403 | Forbidden — insufficient permissions |
| 422 | Only a special multipart-boundary guard; normal FastAPI request-body validation returns 400 |
| 500 | Internal server error |

> The commercial platform's plan-based rate limits (`X-RateLimit-*` headers) do **not** apply to the open-source edition — there is no general request rate limiting. Login attempts, however, are throttled (5 failures per 15 minutes per account and per IP → `429` + `Retry-After`, exponential lockout).
