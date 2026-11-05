# Webhooks

Register endpoints to receive task event notifications. See [Event Push](event-push.md) for the event payloads and signature scheme.

---

## Register Webhook API

```
POST /api/v1/webhook/create
```

### Request Body

`Content-Type: application/json`

| Field | Type | Required | Description |
|---|---|---|---|
| `endpoint` | string | Yes | URL to receive event POSTs |
| `description` | string | No | Description of the webhook |

### Endpoint Validation (SSRF Protection)

Endpoints are validated at registration/update and again before every delivery:

- the scheme must be `https` (`http` only when `webhook_allow_http = true` or the host is listed in `webhook_allowed_hosts` in `settings.ini`),
- URLs must not embed credentials (`https://user:pass@host`),
- the resolved host must be a public address — private, loopback, link-local, multicast and reserved ranges (IPv4 and IPv6) are rejected,
- deliveries never follow redirects (a 3xx response fails the delivery) and responses are capped at 1 MiB.

Rejected endpoints fail with `400` and a message like `"Webhook endpoint must not target a private or reserved address."`

### Request Example

```
POST /api/v1/webhook/create
X-API-Key: sk_1234567890abcdef
Content-Type: application/json

{
  "endpoint": "https://your_domain/webhooks/task-events",
  "description": "Webhook for receiving task status updates"
}
```

### Success Response (200)

```json
{
  "data": {
    "id": "613345899178891888",
    "endpoint": "https://your_domain/webhooks/task-events",
    "description": "Webhook for receiving task status updates",
    "status": "ACTIVE",
    "secret": "whsec_…"
  },
  "msg": "operation success.",
  "status": "success",
  "code": 200
}
```

> The `secret` is returned **only at creation** — store it to verify incoming signatures.

### Error Responses

```json
{ "data": null, "msg": "Field required.", "status": "validation error.", "code": 400 }
{ "data": null, "msg": "Webhook endpoint must not target a private or reserved address.", "status": "error", "code": 400 }
{ "data": null, "msg": "Invalid API Key", "status": "error", "code": 401 }
```

---

## Query Webhooks API

List the current user's webhooks.

```
GET /api/v1/webhook/user/webhooks
```

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | string | No | Filter by status: `ACTIVE` or `INACTIVE` |

### Request Example

```
GET /api/v1/webhook/user/webhooks?status=ACTIVE
X-API-Key: sk_1234567890abcdef
```

### Success Response (200)

```json
{
  "data": [
    {
      "id": "613345899178891888",
      "endpoint": "https://your_domain.com/webhooks/task-events",
      "description": null,
      "status": "ACTIVE"
    }
  ],
  "msg": "operation success.",
  "status": "success",
  "code": 200
}
```

A single webhook can also be retrieved by id:

```
GET /api/v1/webhook/{webhook_id}/retrieve
```

---

## Update Webhook API

```
POST /api/v1/webhook/{webhook_id}/update
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `webhook_id` | string | Yes | The webhook to update |

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `endpoint` | string | No | New endpoint URL |
| `description` | string | No | New description |
| `status` | string | No | New status: `ACTIVE` or `INACTIVE` (deactivate to pause deliveries) |

### Request Example

```
POST /api/v1/webhook/webhook_123456/update
X-API-Key: sk_1234567890abcdef
Content-Type: application/json

{
  "endpoint": "https://your_domain.com/webhooks/task-events",
  "description": "Updated webhook for receiving task status updates",
  "status": "ACTIVE"
}
```

### Success Response (200)

```json
{
  "code": 200,
  "msg": "operation success.",
  "status": "success",
  "data": {
    "id": "webhook_123456",
    "endpoint": "https://your_domain.com/webhooks/task-events",
    "description": "Updated webhook for receiving task status updates",
    "status": "ACTIVE"
  }
}
```

---

## Rotate Webhook Secret API

Rotate the signing secret of a webhook for enhanced security. The old secret stops validating immediately.

```
POST /api/v1/webhook/{webhook_id}/secret/rotate
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `webhook_id` | string | Yes | The webhook whose secret to rotate |

### Request Example

```
POST /api/v1/webhook/webhook_123456/secret/rotate
X-API-Key: sk_1234567890abcdef
```

### Success Response (200)

The new secret is returned **once**:

```json
{ "data": { "secret": "whsec_…" }, "msg": "operation success.", "status": "success", "code": 200 }
```

---

## Verify Webhook Signature API

Verify a webhook signature against a webhook's secret — useful for testing your delivery pipeline or checking a captured request.

```
POST /api/v1/webhook/verify-signature
```

### Request Headers

| Header | Required | Description |
|---|---|---|
| `X-API-Key` | Yes | Your API key |
| `X-Webhook-Secret` | Yes | The webhook secret (or the secret to test against) |
| `X-Webhook-Signature` | Yes | Signature header from a delivery, format `t=<timestamp>,v1=<hex hmac>` |

### Request Example

```
POST /api/v1/webhook/verify-signature
X-API-Key: sk_1234567890abcdef
X-Webhook-Signature: t=1699000000,v1=abc123def456...
X-Webhook-Secret: whsec_...
Content-Type: application/json

{ "event_type": "task_finished", "data": { "task_id": "task_123456", "status": "completed" } }
```

### Success Response (200)

Returns a bare boolean — `true` when the signature is valid, `false` otherwise. (This endpoint deliberately returns a raw value, not the usual envelope.)

For the signature algorithm, see [Event Push — Signature Verification](event-push.md#signature-verification).

> **Testing tip:** the repository ships `scripts/webhook_receiver.py` — a small local receiver that prints headers + payload and validates signatures by calling this endpoint. Start it with `--secret` set and point a webhook at it to test deliveries end-to-end.
