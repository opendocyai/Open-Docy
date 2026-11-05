# Frequently Asked Questions

## General Questions

**What is Docy AI?**

An AI agent platform for document workflows — design agents on a canvas (file inputs, extraction, audit, generation, human interaction), run them as tasks through a REST API, and receive results via polling or webhook events.

**How do I get started with the API?**

Follow the [Quick Start](quick-start.md): create an API key, register a webhook (optional), create a task bound to an agent, query its input nodes, upload files, start the task, then monitor and collect results.

**Is there a free tier?**

The open-source edition is entirely self-hosted with no billing — you only pay for your own infrastructure and any external LLM provider you configure (see `settings.ini`).

## Technical Questions

**What authentication methods are supported?**

- `X-API-Key` header — API keys created per user (recommended for integrations).
- Bearer JWT tokens from the platform login endpoints (web UI / CLI use).

The commercial platform's OAuth 2.0 client flow (authorization-code login SDK) is not included in the open-source edition. See [Authentication](authentication.md).

**How do webhooks work?**

Register an endpoint via `POST /api/v1/webhook/create`; when a task (with `webhook_push` enabled) emits events, Docy POSTs JSON to your endpoint with an HMAC-SHA256 signature (`X-Webhook-Signature: t=<ts>,v1=<hex>`). Verify the signature, then process the payload. Failed deliveries retry 3 times with 60 s delay. See [Event Push](event-push.md).

**What programming languages are supported?**

The API is plain JSON over HTTP — any language works. This repository ships a Python CLI (`docy agent` / `docy activity` / `docy webhook` / `docy api-key`) and a test webhook receiver (`scripts/webhook_receiver.py`) as reference clients. The commercial Python SDK (`docky_ai_sdk`) is not part of this repo; its methods map 1:1 to the REST endpoints documented here.

**Where do I find the Agent ID / Space ID?**

- Agent ID — shown on the agent orchestration page in the web UI, or via `GET /api/v1/agent/list`.
- Space ID — shown under the space name in the web UI, or via `GET /api/v1/space/`.

**Why did my run request fail validation?**

Run request bodies are dynamic — they must match the task's input nodes. Always call `GET /api/v1/activity/{task_id}/input/nodes` first and build the body keyed by node id, with values matching each node's `label` (`InputFile` vs `GroupInputFile`). See [Running Tasks](task-run.md).

**How do I handle tasks that require human input?**

When a task hits a manual node its status becomes `Action Required`. Query `GET /api/v1/activity/{task_id}/manual/node`, save input via `POST /api/v1/activity/{task_id}/manual-input/save` (text / file / select per the node's `input_type`), then resume with `POST /api/v1/activity/{task_id}/run/after-action`.

**How do I get the files a task produced?**

File keys appear in result payloads and webhook `output_values` (paths like `default/xxx.docx`). Convert with `POST /api/v1/common/pre-download/url` and download the returned URL. See [Files](files.md).

**Is there rate limiting?**

No general request rate limiting — but login attempts **are** throttled: 5 failures within 15 minutes per account and per IP trigger an exponential lockout (`429` + `Retry-After`), reset by a successful login. The commercial platform's plan-based limits do not apply.

**How do I verify a captured webhook request?**

Call `POST /api/v1/webhook/verify-signature` with the original body plus the `X-Webhook-Signature` and `X-Webhook-Secret` headers — it returns a bare boolean. See [Webhooks](webhooks.md#verify-webhook-signature-api).
