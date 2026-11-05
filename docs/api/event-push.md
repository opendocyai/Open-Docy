# Event Push

Receive real-time notifications about task events through webhook callbacks — no polling required.

## How Event Push Works

1. **Register your webhook** with the [Register Webhook API](webhooks.md#register-webhook-api).
2. **Events trigger automatically** — as tasks move through their lifecycle, Docy sends HTTP `POST` requests to your endpoint with the event JSON.
3. **Process events** — verify the signature, then act on the payload (update your database, trigger workflows, notify users).

## Event Types

| Event | When |
|---|---|
| `task_status_changed` | A task's status changes (e.g. run started, finished, errored) |
| `node_finished` | An individual node inside the agent flow finishes |
| `task_finished` | The task completed, payload carries final results |

Whether events are pushed for a task is controlled by the task's `webhook_push` flag (set at creation). There is no HTTP route to toggle it afterwards — only the CLI (`docy activity webhook on-off`) can switch it.

## Event Payload Structure

All events share a consistent envelope:

```json
{
  "event_type": "task_finished",
  "object_id": "593936586879006602",
  "object_type": "user",
  "content": "task finished.",
  "payload": {
    "task_id": "xxxxx",
    "agent_id": "599839976445443078",
    "space_id": "582369977051382790",
    "auth_type": "USER-API-Key",
    "user_id": "593929563099903302",
    "run_id": "613351664936049542",
    "run_source": "activities",
    "run_node": null,
    "virtual_space_id": null,
    "virtual_user_id": null,
    "metadata": {},
    "status": "succeed",
    "error": "",
    "json": {
      "nodes": [
        {
          "label": "GroupInputFile",
          "id": "823d333f2c6ef48e_paper",
          "title": "GroupInputFile",
          "status": "succeed",
          "output_values": {
            "id": "923d388f1c3ef48e_paper",
            "data": [
              { "key": "Deal Details", "files": ["default/task_result-xxxxxx.txt"] }
            ]
          }
        },
        {
          "label": "ContentGeneratorPaper",
          "id": "6a05232075de760b_paper",
          "title": "ContentGeneratorPaper",
          "status": "succeed",
          "output_values": [
            {
              "id": "Content Generator Node",
              "data": [],
              "files": {
                "name": "Paper.docx",
                "status": "Generated",
                "path": ["default/Enhanced_Paper_new-xxx.docx"]
              }
            }
          ]
        }
      ]
    }
  },
  "page": "activities"
}
```

### Payload Field Description

| Field | Description |
|---|---|
| `task_id` | Unique identifier of the task |
| `agent_id` | ID of the agent that executed the task |
| `space_id` | Space the task belongs to |
| `run_id` | Identifier of this specific run |
| `auth_type` | How the task was started (`USER-API-Key`, bearer token, …) |
| `metadata` | Custom metadata passed at task creation |
| `status` | `"succeed"` / `"failed"` |
| `error` | Error message when failed |
| `json.nodes` | Per-node execution records of the agent flow |

### `json.nodes` Field Description

Each node represents one step of the agent flow:

| Field | Description |
|---|---|
| `label` | Node type identifier (e.g. `GroupInputFile`, `ContentGeneratorPaper`) |
| `title` | Display name |
| `status` | Node execution status (`succeed` / `failed`) |
| `output_values` | **The key field** — actual output data of the node: extracted data arrays and generated file references (`files.path` contains file keys like `default/xxx.docx`) |

> In practice, focus on each node's `output_values`: it contains the actual results. File paths found there are converted to download URLs via the [File Download API](files.md#file-download-api).

## Webhook Security — Signature Verification

Each delivery includes a signature so you can verify the request comes from Docy:

```
X-Webhook-Timestamp: 1699000000
X-Webhook-Signature: t=1699000000,v1=3f9ab2c1…
```

### Algorithm

```
signed_payload = f"{timestamp}.{body}"        # body = raw request bytes
signature      = hex( hmac_sha256(secret, signed_payload) )
header         = f"t={timestamp},v1={signature}"
```

Reference implementation (Python):

```python
import hashlib, hmac

def verify(body: bytes, timestamp: str, signature_header: str, secret: str) -> bool:
    try:
        parts = dict(p.split("=", 1) for p in signature_header.split(","))
        ts, received = parts["t"], parts["v1"]
        if int(time.time()) - int(ts) > 300:   # reject stale timestamps
            return False
        expected = hmac.new(
            secret.encode(), f"{ts}.".encode() + body, hashlib.sha256
        ).hexdigest()
        return hmac.compare_digest(expected, received)
    except Exception:
        return False
```

You can also validate captured requests against the server with the [Verify Webhook Signature API](webhooks.md#verify-webhook-signature-api).

## Best Practices

- **Always verify signatures** — protect against spoofed requests.
- **Use a public https endpoint** — deliveries to non-https, private/internal or redirecting endpoints are rejected and responses are capped at 1 MiB (see [Endpoint Validation](webhooks.md#endpoint-validation-ssrf-protection)).
- **Implement idempotency** — handle duplicate event deliveries gracefully (retries can duplicate).
- **Set timeout limits** — deliveries time out after 30 s waiting for your response; keep your endpoint fast.
- **Monitor delivery** — track webhook delivery success rates; failed deliveries are retried 3 times with 60 s backoff.
- **Handle failures** — implement your own retry logic for temporary outages on your side.
- **Keep the secret safe** — never expose it in client-side code; rotate it if leaked.
