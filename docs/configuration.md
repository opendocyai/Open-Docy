# Configuration

Open Docy is configured through two layers:

1. **`settings.ini`** — server, security and storage settings. The default file sits in the project root; pass a different one with `docy run --conf-file <path>`.
2. **`.env`** — AI model credentials and model routing, loaded from the repository root at startup.

The repository ships `settings.ini.sample` and `.env.sample` as templates. Copy them to
`settings.ini` / `.env` and replace the `change-me` placeholders with your own values before
the first start (the sections below describe every option).

## `settings.ini`

```ini
[DEFAULT]
log_dir =                  # empty = logs go to the per-user cache dir (see "Locations")
tmp_dir = temp             # directory for temporary files
secret = change-me         # AES key for password encryption; replace with a random 16-char string (24/32 also accepted)
timezone = UTC
agent_lock_ttl = 10        # seconds; agent lock TTL
webhook_allow_http = false # webhook endpoint policy: https-only by default; true allows http targets
webhook_allowed_hosts =    # comma-separated exact hostnames allowed to target private/internal addresses and use http (empty = disabled)

[Security]
api_key = change-me        # internal API key; replace with a random 32-char string
secret_key = change-me     # internal secret; replace with a random 32-char string
password_level = medium    # low | medium | high (default: medium)
password_min_length = 12   # OSE default; the validator's hard floor is 8
password_max_length = 128
jwt_secret_key = change-me # JWT signing key; replace with a random 64-char string — change this in production
algorithm = HS256
access_token_expire_minutes = 1500
refresh_token_expire_minutes = 1440
verification_code_expire_minutes = 30
oauth_access_token_expire_minutes = 1440
oauth_refresh_token_expire_minutes = 43200

[S3]
driver_type = local                # local | minio | s3 — see Notes
endpoint_url =                     # required for minio; empty otherwise
aws_access_key_id =                # required for minio/s3; empty for local
aws_secret_access_key =            # required for minio/s3; empty for local
aws_default_region = us-east-1
bucket = docy
# MinIO example (commented out — never ship the minioadmin defaults):
#driver_type = minio
#endpoint_url = http://127.0.0.1:9000
#aws_access_key_id = change-me
#aws_secret_access_key = change-me

[Server]
http_server_host = 127.0.0.1      # loopback by default; use --host 0.0.0.0 to serve other machines
http_server_port = 3000
public_base_url = http://127.0.0.1:3000   # used in links (e.g. in-app notifications)
# Cross-origin frontend deployments: add allowed browser origins (comma-separated).
# Example: cors_origins = http://192.168.1.100:5173
cors_origins =
```

Notes:

- **Do not commit a `settings.ini` with production secrets.** The sample values in `settings.ini.sample` are placeholders (`change-me`); before the first start, copy the file to `settings.ini` and replace `secret`, `api_key`, `secret_key` and `jwt_secret_key` with your own random strings. The server **refuses to start** while any of these placeholders remain unchanged, or when the `secret` length is not a valid AES key size.
- `secret` is the AES key used to encrypt passwords between frontend and backend (handed to the browser by `GET /auth/secret-key`). AES keys must be 16, 24 or 32 bytes when UTF-8 encoded; the server verifies this at startup and refuses to start otherwise. Use a random 16-char string — a wrong length used to start fine and then fail only at sign-up/login with "Passwords are tampered with during transmission".
- Recommended key lengths: `secret` is 16 chars, `api_key` and `secret_key` are 32 chars, `jwt_secret_key` is 64 chars. Only `secret` has a hard length requirement; shorter values for the other three still work, but the server logs a startup warning because they weaken security. Generate them with a password manager or `openssl rand -hex 8` / `openssl rand -hex 16` / `openssl rand -hex 32` respectively.
- `password_min_length` / `password_max_length` are clamped by the validator to 8–128; the server refuses to start if the configured values leave no valid range (for example `password_min_length = 130`). An unrecognised `password_level` (not `low`, `medium` or `high`) logs a warning because the validator falls back to the `low` policy.
- `[Server] public_base_url` is used for links embedded in in-app notifications; set it to the externally reachable address if users access the server remotely.
- `[S3]` configures the storage driver for uploaded files (files, avatars, exports). `driver_type` is `local`, `minio` or `s3`:
  - `local` — bundled local storage (files go to the server's `storage/local` directory); **this is the default in `settings.ini.sample`** — zero external services. The other `[S3]` options can be left empty.
  - `s3` — AWS S3; `endpoint_url` can be left empty (the AWS default endpoint is used).
  - `minio` — MinIO or any other S3-compatible endpoint; `endpoint_url` must point at your MinIO server and the credentials must be your own (the commented example in the sample uses placeholders).
- **Webhook endpoint policy** — outbound webhook targets must be `https` and resolve to public addresses only: private, loopback, link-local, multicast and reserved ranges (IPv4 and IPv6) are rejected at registration and again at send time; redirects are never followed and responses cap at 1 MiB. To allow http or internal targets, set `webhook_allow_http = true` and/or list exact hostnames in `webhook_allowed_hosts`. See [Webhooks](api/webhooks.md).
- **CORS** — allowed browser origins default to `http://127.0.0.1:<port>` and `http://localhost:<port>` only; same-origin deployments need nothing. For a separate frontend origin, add it to `cors_origins` (comma-separated) under `[Server]`. The allowlist is explicit (never a wildcard), so credentials are enabled; allowed methods are `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`, and allowed headers are an explicit list (`Content-Type`, `Authorization`, `Accept`, `X-Requested-With`, `X-Webhook-Signature`, `X-Webhook-Secret`, `X-Webhook-Timestamp`).

## Environment variables (`.env`)

The AI plugin reads credentials and model routing from the environment (a `.env` file in the repository root is loaded at startup). Everything below the AI models is **optional unless marked required** — an unset optional feature is silently disabled and the affected AI capability returns a clear English error instead of crashing.

| Variable | Meaning |
|---|---|
| `OPENAI_API_KEY` | **Required** for the default model `openai:gpt-5`; used by OpenAI, OpenRouter and embedding providers |
| `MODEL_DEFAULT` | Main chat model, format `provider:model` (default `openai:gpt-5`) |
| `MODEL_FALLBACK` | Optional second model, same format; automatically used after the main model fails and retries are exhausted. Requires the matching provider key, otherwise it is disabled with a startup notice |
| `EMBEDDING_PROVIDER` | Optional `openai` or `openrouter`. Unset = the RAG fallback for field extraction is disabled |
| `MISTRAL_API_KEY` | For `mistralai:<model>` |
| `OPENROUTER_API_KEY` | For `openrouter:<vendor>/<model>` — routes any vendor (e.g. `openrouter:anthropic/claude-sonnet-4`, `openrouter:google/gemini-2.5-pro`) |
| `ANTHROPIC_API_KEY` / `ANTHROPIC_AUTH_TOKEN` | For Anthropic-direct integrations |
| `TAVILY_API_KEY` | WebSearch / text-extraction nodes; unset = those features are disabled |
| `LANGSMITH_API_KEY` | Optional LangSmith tracing (commented out in `.env.sample`) |
| `API_KEY` / `SECRET_KEY` | Platform auth used by the AI plugin to call back into the API — set them to the same values as `settings.ini` `[Security]` `api_key` / `secret_key` |
| `DOCY_NO_AI_WORKER` | `1` = don't spawn or supervise the AI workers at startup (tasks queue up until one is started manually with `docy ai-worker`) |
| `DOCY_AI_WORKERS` | Number of AI worker processes (default `2`, max `16`) |
| `DATA_DIR` / `AI_DATA_DIR` | Legacy data-directory overrides from the commercial edition; unset in OSE |

Two variables are supported but not listed in `.env.sample` (add them only when needed):

| Variable | Meaning |
|---|---|
| `OPENROUTER_BASE_URL` | OpenRouter endpoint (default `https://openrouter.ai/api/v1`) |
| `DOCY_API_HOST` | Base URL the AI plugin uses to call back into the API (auto-injected at startup with the real port — you rarely need this) |

Model format examples:

```ini
MODEL_DEFAULT=openai:gpt-5
MODEL_FALLBACK=openrouter:openai/gpt-4.1
EMBEDDING_PROVIDER=openai
```

## Frontend build configuration

The frontend calls the backend at `/api` (same origin) by default — no configuration needed when both are served by `docy run`.

For **cross-origin deployments** (frontend static hosting separate from the backend), bake the backend base URL into the bundle at build time:

```bash
uv run docy build-web --api-base http://192.168.1.100:3000
```

The URL is normalized (trailing slashes and a duplicated `/api` suffix are handled). For the dev-server variant, the proxy target comes from `API_TARGET` (legacy name `VITE_API_TARGET`) in the frontend `.env`; `VITE_API_BASEURL` is the API path prefix, not the proxy variable.

## Locations

| What | Where |
|---|---|
| SQLite database | `src/backend/docy/storage/docy.db` (created by the startup migrations; WAL mode) |
| Server logs | `%LOCALAPPDATA%\docy\docy\Cache\docy.log` (Windows) / `~/.cache/docy/` (POSIX) when `log_dir` is empty; `docy_access.log`, `docy_error.log`, plus `*_ai_worker.log` variants for the AI worker process |
| AI worker fault log | `src/backend/docy/storage/logs/ai_worker_fault.log` |
| Per-task AI temp files | isolated directory per task under the cache (`Cache/runs/<uniq>/`), cleaned at task end; stale dirs (> 24 h) are swept on worker startup |
| Frontend build (source checkout) | `src/frontend/dist-web` |
| Frontend build (wheel install) | `docy/web/static` |
