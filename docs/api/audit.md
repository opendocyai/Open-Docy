# Audit API

Open Docy keeps a **tamper-evident audit trail**: every audited business operation (agent create/update/delete, task create/delete, workspace changes, member role changes, template changes) is appended to a hash chain. Each record links to its predecessor via `previous_hash`, carries an HMAC signature, and can be verified end-to-end — online through these endpoints, or offline with the bundled standalone verifier script.

The audit endpoints are permissioned through the web UI menu system (`sys:audit:view`, `sys:audit:export`, `sys:audit:verify`). At the route level, the read endpoints below currently do not enforce authentication in the open-source edition (the UI gates access via the role/menu framework).

All endpoints return the standard [response envelope](overview.md#response-envelope).

---

## Query Audit Logs

Multi-condition query with pagination, isolated per workspace.

```
GET /api/v1/audit/query
```

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_id` | string | Yes | Workspace to query (required; results are scoped to this space) |
| `keyword` | string | No | Free-text search (fuzzy match on `actor_id`, `resource_id`, payload) |
| `chain_id` | string | No | Filter by hash-chain ID (e.g. `<space_id>--agent`) |
| `user_id` | string | No | Filter by user ID |
| `actor_id` | string | No | Filter by acting entity ID |
| `resource_type` | string | No | `agent` / `task` / `knowledge` / `policy` / `template` / `space` |
| `resource_id` | string | No | Filter by resource ID |
| `action` | string | No | `create` / `update` / `delete` / `execute` / `invite` |
| `outcome` | string | No | `success` / `failure` |
| `start_time` | string | No | ISO start time, e.g. `2026-08-07T00:00:00` |
| `end_time` | string | No | ISO end time |
| `pageNumber` | integer | No | Page number (1-based) |
| `pageSize` | integer | No | Page size |

### Request Example

```
GET /api/v1/audit/query?space_id=570915088920222209&action=create&pageNumber=1&pageSize=10
```

### Response

`data` is a paginated object — `{ "count": …, "next": …, "previous": …, "results": [ … ] }`. Each record in `results` is enriched with the acting user's info (`actor_name`, `actor_email`, `actor_avatar`) and the workspace name (`space_name`), and carries the chain fields:

| Field | Description |
|---|---|
| `id` | Record ID |
| `chain_id` | Hash-chain ID this record belongs to |
| `seq` | Sequence number within the chain |
| `previous_hash` | Hash of the previous record (chain link) |
| `hash` | This record's hash |
| `event_time` | Event timestamp |
| `actor_id` / `actor_type` | Acting entity (`user` / `api_key` / `system`) |
| `resource_type` / `resource_id` | Affected resource |
| `action` / `outcome` | What happened and its result |
| `payload` | Operation details (free-form) |

---

## Audit Stats

Dashboard numbers for one workspace.

```
GET /api/v1/audit/stats?space_id=<space_id>
```

`space_id` is a required query parameter. Returns aggregated statistics for the space (record counts, breakdowns) in `data`.

---

## Filter Event Types

Filter options present in the audit log (used to populate the UI filter dropdowns).

```
GET /api/v1/audit/filter-event-types
```

Returns in `data` the fixed enum values available for each filter dimension (12 actions, hard-coded, not derived from the database):

```json
{
  "resource_types": ["space", "agent", "task", "knowledge", "policy", "template"],
  "actions": ["create", "update", "execute", "delete", "invite", "publish", "complete", "fail", "action_required", "resume", "cancel", "batch_delete"],
  "outcomes": ["success", "failure"],
  "integrity_statuses": ["success", "warning", "failed"]
}
```

---

## Single Record Detail

Full detail of one audit record, including user info.

```
GET /api/v1/audit/events/{event_id}
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `event_id` | string | Yes | The audit record ID (from `id` in a query result) |

### Error

Unknown IDs return HTTP 200 with the standard envelope carrying `code: 400` and `msg: "Audit log not found"`.

---

## Verify Single Record

Checks one record's integrity in its chain: the `previous_hash` link, the recomputed `hash`, and the HMAC signature.

```
GET /api/v1/audit/events/{event_id}/verify
```

Returns a verification result in `data` (valid/invalid plus the checks performed).

---

## Verify a Chain

Verifies the entire hash chain end-to-end (every link and signature).

```
GET /api/v1/audit/chains/{chain_id}/verify
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `chain_id` | string | Yes | Hash-chain ID, e.g. `<space_id>--agent` |

Returns the chain verification result in `data` (valid flag, per-record results, error details for broken links).

---

## Export Audit Logs

Two export styles, both streamed as a file download (`Content-Disposition: attachment`):

**By chain** — export a single chain, optionally windowed by sequence:

```
GET /api/v1/audit/export/{chain_id}?format=json&from_seq=0&to_seq=100
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `chain_id` | string | Yes (path) | Hash-chain ID |
| `format` | string | No | `json` (default) or `csv` |
| `from_seq` | integer | No | Start sequence (default `0`) |
| `to_seq` | integer | No | End sequence (inclusive) |

**By filter** — export whatever the query endpoint would return (the UI "Export CSV" action):

```
GET /api/v1/audit/export?space_id=<space_id>&format=csv
```

Accepts the same filter parameters as [Query Audit Logs](#query-audit-logs) (`space_id` optional here, unlike the query endpoint where it is required; `keyword`, `chain_id`, `user_id`, `resource_type`, `resource_id`, `action`, `outcome`, `start_time`, `end_time` optional), plus `format` (`csv` default, or `json`).

---

## DB Triggers

Tamper-guard status — operational endpoints for self-hosted deployments.

```
POST /api/v1/audit/triggers/install
```

Installs the SQLite triggers that block `UPDATE`/`DELETE` on the audit table (tamper guard). Returns `{"status": "installed"}`.

```
GET /api/v1/audit/triggers/status
```

Checks whether the tamper-guard triggers are installed.

---

## Offline Verification

To verify the audit trail without the server (e.g. as evidence for an auditor), use the standalone verifier script bundled with the codebase: `src/backend/docy/services/audit/standalone_verifier.py`. It reads an exported JSON file, normalizes event timestamps, and recomputes the chain hashes — the same canonical-JSON hashing the server uses.

## Permissions

In the web UI, audit access is controlled by the Support menu with three permission points: `sys:audit:view` (see logs), `sys:audit:export` (export JSON/CSV), `sys:audit:verify` (run verifications). See [SECURITY.md](../../SECURITY.md) for the overall security model.
