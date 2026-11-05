# Deployment

How to run Open Docy as a server: headless operation, configuration for a shared instance, the AI worker process, cross-origin frontend builds, and putting it behind a reverse proxy.

This page covers operational setup. For what each setting means, see [Configuration](configuration.md); for error symptoms, see [Troubleshooting](troubleshooting.md).

## Prerequisites

- Python 3.11 – 3.13 and `uv` on the host machine
- A checkout or wheel install of the project, with dependencies installed (`uv sync`)
- The AI plugin installed (`uv run docy install-ai`) — the server refuses to start without it
- An object store for uploaded files — the bundled local storage driver works out of the box; configure `[S3]` in `settings.ini` for local/MinIO/S3 (see [Configuration](configuration.md))

## Run headless

```bash
uv run docy run --host 0.0.0.0 --port 3000 --no-browser
```

`docy` with no arguments is equivalent to `docy run`. Useful options:

| Option | Meaning |
|---|---|
| `--host` / `--port` | Bind address / port (defaults from `settings.ini`; the sample binds `127.0.0.1:3000` — pass `--host 0.0.0.0` to serve other machines) |
| `--conf-file <path>` | Use a different `settings.ini` |
| `--no-browser` | Don't open a browser on startup — required on servers |
| `--log-level`, `--log-dir` | Logging verbosity and directory |
| `--static-dir <dir>` | Serve the frontend from a specific build directory |

Notes:

- If the configured port is occupied, the launcher silently moves to the next free port (3000 → 3001 → …). Check the startup log for the actual port; see [Troubleshooting](troubleshooting.md) to find the leftover instance.
- The health probe is `GET /api/v1/common/health` (returns `{"status":"healthy",...}` when ready) — use it in orchestrators and load-balancer checks.

## Docker Compose

Prefer a container? A complete `linux/amd64` image with the code, dependencies, encrypted AI plugin and prebuilt frontend baked in is published on Docker Hub (`opendocy/open-docy:latest`) — no Python, uv or pnpm needed on the host:

```bash
cp .env.sample .env   # fill in AI keys — only needed for agent tasks
docker compose up -d  # pulls the image automatically
```

Secrets are generated on first boot and persisted in a named volume; AI credentials and the platform auth pair come from `.env` (compose auto-loads it), other settings through `DOCY_*` environment variables. See [Docker deployment](docker-deployment.md) for the full reference — the published image, MinIO/S3 switching and the update flow.

## Configuration for a shared instance

Before exposing the server beyond `localhost`:

1. **Regenerate secrets.** `settings.ini` ships with development defaults — regenerate `secret`, `api_key`, `secret_key`, and especially `jwt_secret_key` for any shared deployment.
2. **Set `public_base_url`.** Links embedded in in-app notifications use `[Server] public_base_url`; set it to the externally reachable address, otherwise links point at `http://127.0.0.1:<port>`.
3. **Storage.** Keep the bundled local driver for a single-node setup, or point `[S3]` at your MinIO/S3 for uploaded files, avatars and exports.
4. **CORS.** Allowed browser origins default to `127.0.0.1` / `localhost` only (explicit allowlist with credentials enabled; methods limited to `GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS`). If a separate frontend origin must call the API from the browser, add `cors_origins` (comma-separated) under `[Server]` in `settings.ini` — or prefer the same-origin setup below. See [Configuration](configuration.md).

Full setting reference: [Configuration](configuration.md).

## Installing the AI plugin

The agent runtime (`src/backend/docy/ai/`) is distributed separately as an encrypted package, built per Python version and platform:

```bash
uv run docy install-ai
```

| Option | Meaning |
|---|---|
| `--server <url>` | Base URL of the package server; defaults to the company package server `https://agent.docyai.com` (path `/reg-api/ai-package/download`) |
| `--python-version <digits>` | Request a specific build, e.g. `313` (defaults to the running interpreter) |
| `--platform <name>` | Request a specific platform build (defaults to the current platform) |
| `--yes` / `-y` | Replace an existing `ai/` without asking |
| `--no-verify` | Skip Ed25519 signature and SHA-256 verification of the downloaded package |

### Integrity verification

`install-ai` verifies every download when the server supports it: it fetches a signed manifest (`/reg-api/ai-package/manifest`), checks its Ed25519 signature against the vendor public key pinned in the client, then checks the zip's SHA-256 against the manifest entry — all before extracting. A mismatch aborts the install and restores the previous `ai/`; the verified digest is printed for audit.

Servers without a manifest endpoint install with a warning and no verification — this covers self-hosted `--server` setups and older package servers. Pass `--no-verify` to skip the manifest request entirely.

To verify a package by hand, compare the manifest digest against the file: fetch `https://agent.docyai.com/reg-api/ai-package/manifest`, then run `sha256sum ai-*.zip` (Linux) or `certutil -hashfile ai-*.zip SHA256` (Windows).

> The app itself serves the same packages from `docy/dist/` at `GET /api/v1/common/ai-package/download`. To install against your own server instead of the company default, map `/reg-api/ai-package/download` to that app endpoint with a reverse proxy and pass `--server <your host>`.

If `ai/` already exists, `install-ai` asks before backing it up and replacing it. The server hard-blocks at startup when the plugin is missing — see [Troubleshooting](troubleshooting.md#docy-run-refuses-to-start-ai-plugin-not-installed).

## The AI worker process

`docy run` spawns and supervises the AI workers — the background consumers that execute agent runs — as child processes (`DOCY_AI_WORKERS`, default 2, max 16):

- **Crash recovery** is automatic: the supervisor restarts each worker with exponential backoff; tasks are claimed under a lease, so a crashed worker's in-flight task becomes re-claimable once the lease expires — up to 15 minutes.
- **Separate log files**: the worker writes `*_ai_worker.log` variants alongside the server logs; its fault log is `src/backend/docy/storage/logs/ai_worker_fault.log` (see [Configuration → Locations](configuration.md#locations)).
- **Run without it**: start the server with `DOCY_NO_AI_WORKER=1` to skip spawning/supervision — tasks queue up until a worker is started manually with `uv run docy ai-worker`.
- **Stop it**: `uv run docy stop-ai-worker` kills all running AI worker processes (Windows: matched by command line and killed as a process tree; POSIX: `pgrep -f` + `SIGTERM`).

## Frontend: same origin vs cross origin

The frontend calls the backend at `/api` (same origin) by default — **no configuration needed** when both are served by `docy run` or behind a same-origin reverse proxy.

For cross-origin deployments (frontend static hosting separate from the backend), bake the backend base URL into the bundle at build time:

```bash
uv run docy build-web --api-base https://api.example.com
```

The URL is normalized (trailing slashes and a duplicated `/api` suffix are handled). Rebuild and redeploy the static bundle whenever the backend address changes.

## Reverse proxy (nginx)

Same-origin setup: serve the API and the static frontend from one domain.

```nginx
server {
    listen 80;
    server_name docy.example.com;

    # API — long SSE streams need generous timeouts
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_buffering off;                 # SSE log streams
        proxy_read_timeout 3600s;
    }

    # Swagger UI
    location /docs {
        proxy_pass http://127.0.0.1:3000;
    }

    # Static frontend (built with `docy build-web`)
    location / {
        root /srv/docy/static;
        try_files $uri $uri/ /index.html;
    }
}
```

Points to watch:

- Task progress uses SSE (`GET /api/v1/activity/log/view`) — keep `proxy_buffering off` and long read timeouts, or the live log stream stalls.
- When the proxy terminates TLS, `[Server] public_base_url` must use the external `https://` address so notification links match.

## Data locations

Everything lives on local disk — see [Configuration → Locations](configuration.md#locations) for the SQLite database, logs, AI temp directories and frontend build paths. Back up the database and `settings.ini`; the queue state lives in `storage/honker.db` next to the main database.

## Next steps

- [Configuration](configuration.md) — every setting and environment variable
- [Troubleshooting](troubleshooting.md) — startup and runtime error symptoms
- [Architecture](architecture.md) — process model and how the pieces fit together
