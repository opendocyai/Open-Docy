# Quick Start Guide

This guide walks through the complete external-integration workflow with working examples. Replace `<host>` with your server address (default `http://127.0.0.1:3000`).

## Complete Workflow

```
Create API key → Design agent (web UI) → Register webhook → Create task
→ Query input nodes → Upload files → Start task → Monitor progress
→ Process & save results → Delete task
```

### 1. Authentication & API Key Setup

Create an API key (one-time). See [Authentication](authentication.md).

```bash
uv run docy api-key create --email user@example.com --name "integration"
# → key value shown once; save it
export DOCY_API_KEY=sk_...
```

### 2. Design Your Agent

In the web UI (`http://<host>:<port>`), build an agent in a workspace and publish it. Note its **Agent ID** — shown on the agent orchestration page, next to the agent name. You can list agents through the API to find IDs programmatically:

```bash
curl "http://<host>:<port>/api/v1/agent/list?space_id=<space_id>" \
  -H "X-API-Key: $DOCY_API_KEY"
```

### 3. Register Webhook for Notifications

Register an endpoint to receive task lifecycle events (optional but recommended):

```bash
curl -X POST "http://<host>:<port>/api/v1/webhook/create" \
  -H "X-API-Key: $DOCY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "https://your_domain/webhooks/task-events",
    "description": "Webhook for task status updates"
  }'
```

The response `data.secret` is shown once — store it to verify incoming signatures. See [Event Push](event-push.md).

### 4. Create a Task

```bash
curl -X POST "http://<host>:<port>/api/v1/activity/add" \
  -H "X-API-Key: $DOCY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Data Processing Task",
    "agent_id": "<agent_id>",
    "agent_from": 2,
    "space_id": "<space_id>",
    "visible": false,
    "webhook_push": true,
    "metadata": {"project": "customer_analysis"}
  }'
```

Response:

```json
{ "data": { "task_id": "596109360552221185" }, "msg": "operation success.", "status": "success", "code": 200 }
```

### 5. Query Task Input Nodes

Discover the input structure the agent requires:

```bash
curl "http://<host>:<port>/api/v1/activity/<task_id>/input/nodes" \
  -H "X-API-Key: $DOCY_API_KEY"
```

See [Running Tasks](task-run.md) for the node structure (`InputFile` / `GroupInputFile`).

### 6. Upload Files

Files referenced by input nodes must be uploaded first — see [Files](files.md):

```bash
# 1. Get an upload URL + key
curl -X POST "http://<host>:<port>/api/v1/common/pre-signed/url" \
  -H "X-API-Key: $DOCY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"file_name": "contract.pdf", "category": "default", "file_tag": "application/pdf"}'
# → { "data": { "key": "default/xxx.pdf", "upload_url": "...", "store_type": "..." } }

# 2. Upload the file to the returned URL (multipart form field "file")
curl -X PUT "$UPLOAD_URL" -F "file=@contract.pdf"
```

### 7. Start Task Execution

Build the run body from the input nodes (keyed by **node id**, values from each node's `key` and uploaded file keys):

```bash
curl -X POST "http://<host>:<port>/api/v1/activity/<task_id>/run" \
  -H "X-API-Key: $DOCY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "node_input": {
      "<input_node_id>": {
        "key": "input_task1",
        "files": ["default/14062025104759-PYf5KVXGp.pdf"]
      }
    }
  }'
```

Response:

```json
{ "data": { "task_id": "...", "run_id": "..." }, "msg": "operation success.", "status": "success", "code": 200 }
```

### 8. Monitor Task Progress

Three complementary mechanisms:

- **Poll** `GET /api/v1/activity/<task_id>/detail` for the current status.
- **Receive webhook events** — `task_status_changed`, `node_finished`, `task_finished` (if a webhook is registered and `webhook_push` is on).
- **Stream logs** over SSE — `GET /api/v1/activity/log/view?task_id=<task_id>&token=<jwt>` (JWT passed as a query parameter).

### 9. Process and Save Results

When the task reaches `Completed`:

- `GET /api/v1/activity/<task_id>/results-raw` — raw AI results (node outputs).
- Result files appear as keys like `default/Enhanced_Paper_new-xxx.docx` in the node `output_values` — convert to download URLs with `POST /api/v1/common/pre-download/url` (see [Files](files.md)) and download promptly.

### 10. Cleanup — Delete Task

```bash
curl -X DELETE "http://<host>:<port>/api/v1/activity/<task_id>/delete" \
  -H "X-API-Key: $DOCY_API_KEY"
```

## Next Steps

- [Tasks](tasks.md) — full task lifecycle reference
- [Running Tasks](task-run.md) — input nodes, manual nodes, canceling runs
- [Event Push](event-push.md) — webhook payloads and signature verification
- [FAQ](faq.md)

> **Python SDK:** the commercial platform ships a `docky_ai_sdk` Python package (`DockyServiceFactory`, `add_task`, `run_task`, `upload_file`, …). It is not part of this repository. The open-source edition's CLI (`docy agent` / `docy activity` / `docy webhook` / `docy api-key`) covers the same operations for scripting; the SDK's methods map 1:1 to the REST endpoints documented here (`add_task` → `POST /api/v1/activity/add`, `run_task` → `POST /api/v1/activity/{task_id}/run`, etc.).
