# Docy API Documentation

Reference for integrating with Open Docy through its REST API: create tasks backed by AI agents, run them on files, follow execution through webhook events, and retrieve results.

This documentation mirrors the hosted API reference (`usage-guide.html`) of the commercial Docy AI platform, adapted to the open-source edition. All endpoints documented here exist in this codebase with the same paths and request/response contracts; commercial-only concepts (billing plans, rate limits, OAuth client SDK) are marked accordingly.

## Scope

This reference documents the **external integration API**. UI-internal modules — auth (login/registration), menu, role, template, node, message, bot — exist for the bundled web frontend and are not part of the stable integration surface; they are summarized in [Overview](overview.md#api-scope) but not documented endpoint-by-endpoint.

## Table of Contents

### Getting Started

- [Overview](overview.md) — what Docy AI is, key concepts, base URL, authentication summary, response envelope, error codes
- [Authentication](authentication.md) — API keys, bearer tokens, scopes
- [Quick Start](quick-start.md) — end-to-end workflow: from API key to task results

### Task Management

- [Tasks](tasks.md) — create, list, query details, delete tasks
- [Running Tasks](task-run.md) — query input nodes, start execution, manual nodes (human-in-the-loop), cancel

### Files

- [Files](files.md) — upload files (pre-signed URL), generate download URLs

### Agents

- [Agents](agents.md) — list, retrieve, create/update, delete, and control visibility of agents

### Workspaces

- [Workspaces](workspaces.md) — spaces: list, create, update, delete; member roles

### Events & Callbacks

- [Webhooks](webhooks.md) — register, query, update, rotate secrets, verify signatures
- [Event Push](event-push.md) — event types, payload structure, signature verification, best practices

### Audit

- [Audit](audit.md) — the hash-chained audit trail: query, verify records and chains, export JSON/CSV

### Additional Resources

- [API Change Log](changelog.md)
- [Frequently Asked Questions](faq.md)

## Endpoint Index

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/activity/add` | Create a task |
| GET | `/api/v1/activity/list` | Query tasks (paginated) |
| GET | `/api/v1/activity/{task_id}/detail` | Query task details |
| GET | `/api/v1/activity/{task_id}/input/nodes` | Query task input nodes |
| POST | `/api/v1/activity/{task_id}/run` | Start task execution |
| POST | `/api/v1/activity/run/cancel` | Cancel a running task |
| GET | `/api/v1/activity/{task_id}/manual/node` | Query manual (interaction) node |
| POST | `/api/v1/activity/{task_id}/manual-input/save` | Save manual node input |
| POST | `/api/v1/activity/{task_id}/run/after-action` | Resume execution from a manual node |
| GET | `/api/v1/activity/{task_id}/results-raw` | Raw AI results of a task |
| DELETE | `/api/v1/activity/{task_id}/delete` | Delete a task |
| GET | `/api/v1/space/` | List workspaces of the current user |
| GET | `/api/v1/space/owned-space` | List workspaces owned by the current user |
| GET | `/api/v1/space/{space_id}` | Retrieve a workspace |
| POST | `/api/v1/space/add` | Create a workspace |
| PUT | `/api/v1/space/{space_id}` | Update a workspace |
| DELETE | `/api/v1/space/{space_id}` | Delete a workspace |
| GET | `/api/v1/space/member/list` | List workspace members (paginated) |
| GET | `/api/v1/agent/list` | List agents in a space |
| GET | `/api/v1/agent/{agent_id}/detail` | Retrieve an agent |
| POST | `/api/v1/agent/add-or-update` | Create or update an agent |
| DELETE | `/api/v1/agent/{agent_id}/delete` | Delete an agent |
| DELETE | `/api/v1/agent/bulk-delete` | Delete multiple agents |
| POST | `/api/v1/agent/{agent_id}/visible/set` | Set agent visibility |
| GET | `/api/v1/agent/{agent_id}/json` | Retrieve agent workflow JSON |
| POST | `/api/v1/common/pre-signed/url` | Generate a file upload URL |
| PUT | `/api/v1/common/upload/{key}` | Upload a file (multipart) |
| POST | `/api/v1/common/pre-download/url` | Generate a file download URL |
| GET | `/api/v1/common/files/{key}` | Download a file |
| POST | `/api/v1/webhook/create` | Register a webhook |
| GET | `/api/v1/webhook/user/webhooks` | Query webhooks |
| GET | `/api/v1/webhook/{webhook_id}/retrieve` | Retrieve a webhook |
| POST | `/api/v1/webhook/{webhook_id}/update` | Update a webhook |
| POST | `/api/v1/webhook/{webhook_id}/secret/rotate` | Rotate webhook secret |
| POST | `/api/v1/webhook/verify-signature` | Verify a webhook signature |
| GET | `/api/v1/audit/query` | Query audit logs (paginated) |
| GET | `/api/v1/audit/stats` | Audit statistics for a workspace |
| GET | `/api/v1/audit/filter-event-types` | Distinct audit event types |
| GET | `/api/v1/audit/events/{event_id}` | Single audit record detail |
| GET | `/api/v1/audit/events/{event_id}/verify` | Verify one record's integrity |
| GET | `/api/v1/audit/chains/{chain_id}/verify` | Verify a whole hash chain |
| GET | `/api/v1/audit/export/{chain_id}` | Export one chain (JSON/CSV) |
| GET | `/api/v1/audit/export` | Export by filter (JSON/CSV) |
| POST | `/api/v1/audit/triggers/install` | Install tamper-guard DB triggers |
| GET | `/api/v1/audit/triggers/status` | Check tamper-guard DB triggers |
