# Troubleshooting

Common problems, their causes, and fixes. Error messages quoted here were reproduced against the current codebase.

## Startup

### `docy run` refuses to start: "AI plugin not installed"

The server hard-blocks at startup when the AI plugin is missing (`src/backend/docy/ai/lambda_function.py` does not exist), because every task depends on it.

```bash
uv run docy install-ai
```

If `ai/` already exists, `install-ai` asks before replacing it (it backs the old copy up). The package is built per Python version and platform and downloads from the company package server by default (`https://agent.docyai.com`, path `/reg-api/ai-package/download`); `--server` overrides the base URL.

### AI worker crashes on startup with `ModuleNotFoundError: No module named 'pyarmor_runtime_006932'`

Seen on Linux/macOS when an older `install-ai` extracted a package built with backslash entry names: the extraction produces a flat tree of files whose names contain literal `\` (e.g. `bot\handler.py` as one filename), so the bundled PyArmor runtime is not importable.

Fix: upgrade to the current codebase and reinstall — `uv run docy install-ai --yes` backs up the broken `ai/` and extracts the package correctly.

### AI worker crashes on startup with `openai.OpenAIError` (missing API key)

The AI worker exits when no model API key is configured. Check:

1. `OPENAI_API_KEY` is set in the `.env` file in the repository root (or exported in the environment).
2. You started the server from the repository root — the `.env` is discovered relative to the process working directory / module path.

See [Configuration → environment variables](configuration.md#environment-variables-env) for the full list of keys and which features they unlock.

### "Address already in use" / the server comes up on a different port

The launcher probes the configured port and silently moves to the next free one (3000 → 3001 → …) when it is occupied — usually a leftover instance. Find it and stop it:

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <pid> /T /F

# POSIX
lsof -i :3000
kill <pid>
```

### `ModuleNotFoundError` in a script that imports `docy.*` directly

Cold-import scripts must import `docy.honker_db` (or `docy.core.aiexecutor`) **before** `docy.ai`-related modules, otherwise the pyarmor runtime fails with a confusing missing-module error:

```python
import docy.honker_db   # noqa: F401  — required first
import docy.ai...
```

## Runtime

### Task stays in "processing" / "In Progress" forever

The built-in queue gives a task a claim lease (`visibility_timeout_s`); if the task exceeds it, another worker may claim and re-execute it — this shows up as duplicate execution or files that cannot be deleted (two processes holding the same file open). Template tasks additionally have `retries=1`, so a failed task goes straight to the dead-letter state instead of retrying.

Check the evidence in `src/backend/docy/storage/honker.db`: the task row in `_honker_live` has `attempts` and `claim_expires_at` (2 attempts ~300 s apart is the signature of a lease re-claim); dead-lettered tasks land in `_honker_dead` with `attempts` and `last_error`. To resume a dead-lettered task, re-trigger it from the UI or API.

When the AI worker crashes, its queue lock is reclaimed at the next worker startup (locks are owned by `pid:<pid>`), so tasks recover within seconds of the worker coming back — no TTL wait.

### `WinError 32` / "being used by another process" when deleting files

A file is held open by another process — usually either a reader that did not release its handle, or a concurrent task execution (see above). The template task cleanup already retries with GC + delays; if you hit it in your own code, close PDF documents explicitly (or open from bytes, e.g. `PdfReader(io.BytesIO(data))` / `pypdfium2.PdfDocument(data)`, instead of opening by path, which can keep the source file locked on Windows) and never share temporary paths across tasks.

### OpenCV fails on Chinese/non-ASCII file paths (`imread`/`imwrite`)

OpenCV's `imread`/`imwrite` go through `fopen`, which fails on non-ASCII paths on Windows. The codebase provides `read_image_unicode` / `write_image_unicode` in `ai/utils/some_utils.py` (byte read + `imdecode`, `imencode` + `tofile`) — use them for any new code touching image files.

### Webhook creation fails: "A user can only create one webhook record"

Each user has at most one webhook record. To change the endpoint or description use `update`, to change the HMAC secret use `rotate`:

```bash
uv run docy webhook update --webhook-id <id> --endpoint https://new.host/hook
uv run docy webhook rotate --webhook-id <id>
```

### API returns 401 `{"code":401,"msg":"Not authenticated",...}`

Endpoints require either a bearer token (web UI session) or an `X-API-Key` header (created with `docy api-key create` — the full key is displayed only once). Note the uniform error envelope: `{"data": null, "msg": "...", "status": "...", "code": <int>}` — `data` carries the payload on success, `msg`/`code` describe failures.

### Cross-origin requests from a browser app fail (CORS)

Allowed origins default to `127.0.0.1` / `localhost` only. To open the API to other origins, add a comma-separated `cors_origins` under the `[Server]` section of `settings.ini`, or deploy the frontend on the same origin (the default setup).

### CLI reports "User not found (email=…)" / "Agent not found" / "Activity not found"

The management CLI looks records up in the local SQLite database (`src/backend/docy/storage/docy.db`). Check that:

- the email belongs to a registered user (table `auth_user`),
- you are using the same database the server uses (the CLI runs migrations itself, but points at the same file),
- IDs are copied in full — the CLI tables may visually truncate long numeric IDs; copy them from the database rather than from a scrolled terminal.

## Where to look next

- **Logs**: see [Configuration → Locations](configuration.md#locations) — server and AI-worker logs are separate files; the worker's fault log (`ai_worker_fault.log`) records crashes the supervisor swallowed.
- **Swagger UI**: `http://127.0.0.1:3000/docs` shows every route and its schema.
- **Health probe**: `GET /api/v1/common/health` returns `{"status":"healthy",...}` when the server is up.

Still stuck? Open an issue with: the exact command / request, the OS + Python version, and the last ~50 lines of the relevant log file.
