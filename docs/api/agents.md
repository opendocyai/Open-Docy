# Agents

Query and manage agents (the workflow definitions tasks are created from). Agents are designed and published in the web UI; the API exposes read access plus management operations — create, update, delete, and visibility control — for integrations.

> The `/pre/*` endpoints (pre-save editor cache: `pre/add`, `pre/update`, `pre/run`, data-extractor helpers), the node-graph helper endpoints (`node-class/finder`, `find-nearby-nodes`, `lock/find-nodes`, `find/neighboring/node`), `code/{code_str}/template`, `draft/save` (editor-session save), and `task/run/cancel` (debug-run cancel) serve the web UI's agent builder. They are UI-internal and not part of the stable integration surface.

---

## List Agents

```
GET /api/v1/agent/list
```

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_id` | string | Yes | Space whose agents to list |
| `agent_name` | string | No | Filter by agent name (search) |
| `sample` | boolean | No | Return simplified records only (default `false`) |
| `exp_draft` | boolean | No | Exclude drafts (default `false`) |
| `inc_visible` | boolean | No | Include non-visible agents (default `false`) |
| `pageNumber` / `pageSize` | integer | No | Pagination |

### Request Example

```
GET /api/v1/agent/list?space_id=570915088920222209
X-API-Key: sk_1234567890abcdef
```

The response `data` contains the paginated agent list; each agent record carries its `id` (use as `agent_id` when creating tasks), name, description, and status.

---

## Retrieve Agent

```
GET /api/v1/agent/{agent_id}/detail
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agent_id` | string | Yes | The unique identifier of the agent |

### Request Example

```
GET /api/v1/agent/agent-data-processor-001/detail
X-API-Key: sk_1234567890abcdef
```

The response `data` contains the full agent record: name, description, node graph definition, and input node configuration.

---

## Create or Update Agent

```
POST /api/v1/agent/add-or-update
```

Creates a new agent when `agent_id` is omitted; updates the existing agent when `agent_id` is provided. Both paths publish the agent with status `active`.

### Request Body

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agent_id` | string | No | ID of the agent to update. Omit to create a new agent. |
| `code` | string | No | Editor-session code (web UI builder workflow). Takes priority over `agent` when provided — integrations should pass `agent` instead. |
| `agent` | object | Yes* | The agent definition. Required unless `code` is provided. |
| `preview_image` | string | No | Key of a preview image for the agent. |

The `agent` object:

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes for creation | Agent name |
| `description` | string | No | Short description |
| `space_id` | string | Yes for creation | Workspace the agent belongs to |
| `template_json` | object | Yes for creation | Workflow node-graph definition (the format produced by the web UI agent editor). Must be a valid graph containing at least one input node. |
| `addition` | object | No | Extra data attached to the agent |

On update, only the fields present in `agent` are changed; omitted fields keep their current values. Requires permission on the agent: API-key requests must be made by the owner of the agent's space.

### Request Examples

Create:

```
POST /api/v1/agent/add-or-update
X-API-Key: sk_1234567890abcdef
Content-Type: application/json

{
  "agent": {
    "name": "Invoice Extractor",
    "description": "Extracts invoice fields from PDF uploads",
    "space_id": "570915088920222209",
    "template_json": {}
  }
}
```

Update (rename only):

```
POST /api/v1/agent/add-or-update
X-API-Key: sk_1234567890abcdef
Content-Type: application/json

{
  "agent_id": "agent-data-processor-001",
  "agent": {
    "name": "Invoice Extractor v2"
  }
}
```

The response `data` contains the full agent record: `id`, `name`, `description`, `space_id`, `status` (`active`), `visible`, `template_json`, `creator_id`, and timestamps.

---

## Delete Agent

```
DELETE /api/v1/agent/{agent_id}/delete
```

Deletes an agent. Agents referenced by an active task (status Not Started, Queued, In Progress, Action Required, or Pause) are protected — they are not deleted and are listed in `data.agent_locked` instead.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agent_id` | string | Yes | ID of the agent to delete (path parameter) |

Request example:

```
DELETE /api/v1/agent/agent-data-processor-001/delete
X-API-Key: sk_1234567890abcdef
```

Response `data`:

```json
{ "agent_locked": [] }
```

`agent_locked` lists the agents that could not be deleted because active tasks reference them, as `[name, id]` pairs. An empty list means the agent was deleted. Agents the authenticated user lacks permission on are also skipped, without error.

---

## Bulk Delete Agents

```
DELETE /api/v1/agent/bulk-delete?agent_ids=<id1>,<id2>
```

Deletes multiple agents in one call, with the same task-reference protection as single delete.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agent_ids` | string[] | Yes | IDs of the agents to delete — comma-separated (`?agent_ids=id1,id2`) or repeated (`?agent_ids=id1&agent_ids=id2`) |

Request example:

```
DELETE /api/v1/agent/bulk-delete?agent_ids=agent-001,agent-002
X-API-Key: sk_1234567890abcdef
```

Response `data` has the same shape as single delete: `{"agent_locked": []}`.

---

## Set Agent Visibility

```
POST /api/v1/agent/{agent_id}/visible/set
```

Controls whether the agent appears in agent lists. Invisible agents are excluded from [List Agents](#list-agents) unless `inc_visible=true`.

### Request Body

| Parameter | Type | Required | Description |
|---|---|---|---|
| `visible` | boolean | Yes | `true` to show the agent in lists, `false` to hide it |

Request example:

```
POST /api/v1/agent/agent-001/visible/set
X-API-Key: sk_1234567890abcdef
Content-Type: application/json

{ "visible": false }
```

The response `data` is the full agent record (same schema as [Retrieve Agent](#retrieve-agent)).

---

## Retrieve Agent Workflow JSON

```
GET /api/v1/agent/{agent_id}/json
```

Returns the agent's raw node-graph configuration (`template_json`) — useful for backing up or duplicating a workflow definition.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agent_id` | string | Yes | ID of the agent (path parameter) |

The response `data` is the workflow JSON object. Requires permission on the agent (same rules as [Retrieve Agent](#retrieve-agent)).

---

## Copy Agent

The commercial platform exposes `POST /api/v1/agent/market/copy` to copy an agent from the marketplace or another user's space into your own.

> **Not available in the open-source edition** — this endpoint is currently disabled (the marketplace module is stripped from the OSE). Use the web UI's agent editor to duplicate agents, or list/retrieve agents with the endpoints above.
