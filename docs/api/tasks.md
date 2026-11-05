# Tasks

Task lifecycle management: create, list, query details, and delete. All endpoints use the `X-API-Key` header (or bearer token).

---

## Create Task API

Create a new task bound to an agent. The task is **not** started automatically — use the [Start Task](task-run.md#start-task-api) endpoint afterwards.

```
POST /api/v1/activity/add
```

### Request Body

`Content-Type: application/json`

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | A descriptive name for the task |
| `agent_id` | string | Yes | ID of the agent that will execute the task. Find it on the Agent Orchestration page in the web UI, or via `GET /api/v1/agent/list` |
| `agent_from` | integer | No | Source of the agent template: `1` = marketplace, `2` = from a space (default). Marketplace endpoints are disabled in the open-source edition, so `2` is the standard value |
| `visible` | boolean | No | Whether the task shows in the web UI task list (default `true`). Tasks created by integrations typically pass `false` |
| `webhook_push` | boolean | No | Whether to push webhook events while the task runs (default `true`) |
| `space_id` | string | No | Space ID where the task is created. Omitted → current user's personal space |
| `virtual_space_id` | string | No | Your custom workspace/team/tenant ID, stored for your own bookkeeping |
| `virtual_user_id` | string | No | Your custom account/user ID, stored for your own bookkeeping |
| `metadata` | object | No | Free-form key/value pairs (both string values) |

### Request Example

```
POST /api/v1/activity/add
X-API-Key: sk_1234567890abcdef
Content-Type: application/json

{
  "name": "Data Processing Task",
  "agent_id": "agent-data-processor-001",
  "agent_from": 2,
  "visible": false,
  "webhook_push": true,
  "space_id": "570915088920222209",
  "virtual_space_id": "team_12345",
  "virtual_user_id": "user_67890",
  "metadata": { "project": "customer_analysis", "priority": "high" }
}
```

### Responses

**Success (200)**

```json
{ "data": { "task_id": "596109360552221185" }, "msg": "operation success.", "status": "success", "code": 200 }
```

**Error (400)**

```json
{ "data": null, "msg": "Task not found!", "status": "error", "code": 400 }
```

**Error (401)**

```json
{ "data": null, "msg": "Invalid API Key", "status": "error", "code": 401 }
```

### Notes

- Agent IDs must reference existing agents in your account/space.
- Always query the task's input nodes after creation and before running — each agent declares its own input structure.
- Missing required fields produce a 400 validation error (envelope `code: 400`, `status: "validation error."`); the only 422 is a special multipart-boundary guard.

---

## Query Tasks API

List the current user's tasks with filters and pagination.

```
GET /api/v1/activity/list
```

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_id` | string | Yes | Space whose tasks to list |
| `task_name` | string | No | Filter by task name (search) |
| `t_status` | string | No | Filter by status — `Not Started`, `Queued`, `In Progress`, `Completed`, `Pause`, `Action Required`, `Error`, `CANCELED` |
| `virtual_space_id` | string | No | Filter by your custom tenant ID |
| `virtual_user_id` | string | No | Filter by your custom user ID |
| `pageNumber` | integer | No | Page number (1-based) |
| `pageSize` | integer | No | Page size |

### Request Example

```
GET /api/v1/activity/list?space_id=582081878552996822&task_name=Agent%206%20Task&t_status=Completed&pageNumber=1&pageSize=10
X-API-Key: sk_1234567890abcdef
```

### Response

`data` is a paginated object — `{ "count": …, "next": …, "previous": …, "results": [ … ] }` — where each entry in `results` carries the task id, name, status, timestamps, and agent info.

---

## Query Task Details API

Retrieve a task's current status and execution information. Use for polling status updates.

```
GET /api/v1/activity/{task_id}/detail
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `task_id` | string | Yes | The unique identifier of the task |

### Request Example

```
GET /api/v1/activity/task-1234567890abcdef/detail
X-API-Key: sk_1234567890abcdef
```

### Response

`data` contains the full task record — including `status` (see the lifecycle table in [Overview](overview.md)), the current run's `last_run_id`, agent reference, and timestamps.

---

## Delete Task API

Delete a task and its associated data. Only tasks in `Not Started`, `Completed` or `Error` are deleted; tasks in other statuses are kept as-is while the endpoint still returns success.

```
DELETE /api/v1/activity/{task_id}/delete
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `task_id` | string | Yes | The unique identifier of the task |

### Request Example

```
DELETE /api/v1/activity/task-1234567890abcdef/delete
X-API-Key: sk_1234567890abcdef
```

### Response

Success returns the standard envelope with empty `data`.
