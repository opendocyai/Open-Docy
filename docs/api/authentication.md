# Authentication

Open Docy accepts two authentication styles:

1. **API keys** (`X-API-Key` header) — intended for external integrations; recommended for everything in this documentation.
2. **Bearer tokens** (JWT) — issued by the platform's own login endpoints; used by the web UI and CLI.

## API Keys

### Creating an API Key

API keys are created by an authenticated user via the internal API. Use the CLI (easiest):

```bash
uv run docy api-key create --email user@example.com --name "production"
```

The full key value is shown **only once** at creation time. List/retrieve endpoints return masked keys. At rest only the SHA-256 hash of the key is stored (keys are 256-bit random tokens, so a fast hash is appropriate); keys created before this change are upgraded to hashed storage on first use.

Or via the HTTP API with a bearer token:

```bash
# 1. Obtain a bearer token (password grant)
curl -X POST "http://127.0.0.1:3000/api/v1/auth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_way=email&username=user@example.com&password=<password>"

# 2. Create an API key
curl -X POST "http://127.0.0.1:3000/api/v1/api_key/" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "production"}'
```

| Endpoint | Method | Description |
|---|---|---|
| `/api/v1/api_key/` | GET | List the current user's API keys (masked) |
| `/api/v1/api_key/` | POST | Create an API key — body `{"name": "..."}`; returns the unmasked key once |
| `/api/v1/api_key/{api_key_id}` | PUT | Rename — body `{"name": "..."}` |
| `/api/v1/api_key/{api_key_id}` | DELETE | Delete |

These endpoints accept both a bearer token and the `X-API-Key` header.

### Using an API Key

Send it in the `X-API-Key` header:

```bash
curl -X POST "http://127.0.0.1:3000/api/v1/activity/add" \
  -H "X-API-Key: sk_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

Each API key is owned by exactly one user — requests made with it act as that user (their spaces, their agents, their permissions).

## Bearer Tokens

The platform login endpoints (`POST /api/v1/auth/login`, `POST /api/v1/auth/token`, `POST /api/v1/auth/refresh`) issue JWTs. Use `Authorization: Bearer <token>`. Bearer tokens are primarily for the web UI and CLI; external integrations should prefer API keys.

## Self-Hosted Account Management

For users of a self-hosted instance, the platform's own account endpoints (all under `/api/v1/auth/`) handle registration and login. These are UI-internal — the web frontend uses them — and are not part of the stable integration API (see [API Scope](overview.md#api-scope)); prefer API keys for integrations.

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/v1/auth/sign-up` | POST | Register an account (email + password) |
| `/api/v1/auth/login` | POST | Log in — returns a JWT access token |
| `/api/v1/auth/token` | POST | OAuth2 password grant — token for `curl`/scripting |
| `/api/v1/auth/refresh` | POST | Exchange a refresh token for a new access token |
| `/api/v1/auth/logout` | DELETE | Invalidate the session |
| `/api/v1/auth/user/me` | GET | Current user profile |
| `/api/v1/auth/user/update` | POST | Update the current user's profile |
| `/api/v1/auth/user/reset-password` | POST | Change the password |
| `/api/v1/auth/email-exist` | POST | Check whether an email is already registered |

> **Login throttling** — failed logins are tracked per account and per IP: 5 failures within 15 minutes lock the account with exponential backoff (15 min doubling, 24 h cap). Responses are `429` with a `Retry-After` header; a successful login resets both counters.

## Scopes

Some integration endpoints declare scope requirements via `api:read` / `api:write`:

| Scope | Meaning |
|---|---|
| `api:read` | Reading tasks, input nodes, webhooks, files |
| `api:write` | Creating/deleting tasks, running tasks, registering webhooks |

API-key authenticated requests are granted these implicitly on the documented integration endpoints. Requests authenticated with an internal bearer token (password login) are **not** checked against roles/permissions in the open-source edition — the permission check only applies to OAuth-issued tokens.

> **Not in the open-source edition:** the commercial OAuth 2.0 client flow (authorization-code login SDK, `client_id`/`redirect_uri` registration). The OSE keeps the internal scope/permission framework (`api:read`/`api:write`) but ships no OAuth client management UI or SDK.
