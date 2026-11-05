# Changelog

Notable changes to the open-source edition (OSE), newest first.

## 2026-11-05

- **Removed** Chroma and the knowledge-base runtime: `ai/vector_store/`, `knowledge_function` / `knowledge_service` / `knowledge_node_utils`, the `file_verify` dispatch and `CHROMA_PERSIST_DIR`. Knowledge is a commercial-edition feature, so none of this was reachable in Open Docy; the locked Knowledge entry stays in the node palette.
- **Changed** dependencies: dropped `chromadb` and `langchain-chroma` and their transitive packages (onnxruntime, kubernetes, grpcio, opentelemetry, among others).
- **Added** startup validation of the `[DEFAULT] secret`: it must encode to 16/24/32 UTF-8 bytes (AES-128/192/256), so a misconfigured key aborts startup with a clear message instead of failing later at sign-up with "Passwords are tampered with during transmission"; an impossible `password_min_length`/`password_max_length` range also aborts startup, while non-recommended `api_key`/`secret_key`/`jwt_secret_key` lengths and an unknown `password_level` only log warnings.
- **Docs** Clarified `docy install-libreoffice` platform behavior in the README and Getting Started: it installs automatically only on Windows (winget); on macOS/Linux it prints the package-manager command and exits 0 without installing anything, with the rationale (no universal package manager, elevated privileges) and a `soffice --version` verification step. The CLI help text and the macOS/Linux output now say that nothing was installed.
- **Removed** `ai/requirements.txt` (dependencies live in `pyproject.toml` / `uv.lock`) and the redundant `ai/.gitignore`; also cleaned the `__pycache__` bytecode left behind by the deleted Chroma/knowledge modules.
- **Changed** dependencies: `pandas` 2.2.3 → 3.0.2 and `rich` 13.x → 14.3.4, taking the higher version between the deleted `ai/requirements.txt` pins and the existing pyproject constraints; `uv.lock` re-resolved. The other 11 differing packages already resolved to equal-or-higher versions.

## 2026-11-04

- **Changed** Translated all Chinese comments in `.gitignore` to English.
- **Changed** ai packaging (`powershell.ps1`) now strips `.gitignore` and `requirements.txt` from the zips; full 15-zip matrix rebuilt and verified (no Chinese, correct structure).
- **Changed** Docker image rebuilt from the refreshed ai package and pushed to `opendocy/open-docy:latest` (digest `sha256:8e24cb511abe237ef19175ee5e3e6b19afdf75622d9ef3fe03ea0893d0a25a8c`, verified against registry + Docker Hub API).

## 2026-11-03

- **Added** SSRF-safe webhook endpoints: `services/webhook/url_validator.py` rejects http (unless enabled), embedded credentials, and hosts resolving to private/loopback/link-local/multicast/reserved addresses (IPv4+IPv6) — enforced on create/update and again at send time; redirects are never followed and responses cap at 1 MiB; opt-in `webhook_allowed_hosts` policy in settings.
- **Added** login throttling (`services/auth/login_throttle.py`): 5 failures/15 min per account and per IP → lockout with exponential backoff (15 min doubling, 24 h cap); 429 + Retry-After via new `LoginThrottled` exception.
- **Added** startup secret guard (`core/security_guard.py`): the server refuses to start while `change-me` placeholder secrets are configured (wired into the CLI and the FastAPI lifespan).
- **Added** agent-package zip limits: max 10 000 entries, 1 GiB total / 200 MiB per file uncompressed, compression-ratio bomb rejection.
- **Changed** API keys are stored as SHA-256 hashes (`api_key_hash` column, new migration); the plaintext is shown once at creation; legacy plaintext rows verify and upgrade on first use.
- **Changed** PBKDF2 iterations 390 000 → 600 000; legacy hashes still verify and are re-hashed to 600k automatically on successful login.
- **Changed** sample `password_min_length` 8 → 12 (handoff-doc parity; the validator's hard floor stays 8).
- **Changed** CORS `allow_headers` from wildcard to an explicit list; diskcache dir created `0700`; settings.ini untracked from git (snapshot parity).
- **Changed** dropped Stripe columns (`stripe_online`/`stripe_sandbox`, new migration) and the stripe lookup path; the frontend is untouched.
- **Changed** dependencies: pypdf ≥6.21.4, cryptography ≥50.0.0, langgraph-checkpoint ≥4.3.1 + langgraph-checkpoint-sqlite ≥3.1.2 (pyproject, `ai/requirements.txt`, `ai-bin/requirements.txt` — the ai plugin needs a re-packaging + smoke test).
- **Changed** renamed legacy identity: `Projectname: open_docy`, neutral author headers, health `service: open-docy`, inert lambda labels, `prefix="open_docy"`, `*_by_pymupdf` → plain names in `utils/pdf.py` (+ callers).
- **Added** pytest suite under `tests/` (webhook SSRF, login throttle, security guard, zip limits, API-key hashing, alembic migrations — 47 tests), ruff config, frontend eslint config, GitHub Actions CI (tests + non-blocking lints + OSV dependency scan), SECURITY.md hardening notes.
- **Changed** README comparison table: REST API keys and webhooks listed under Open Docy (OAuth stays Docy-AI).
- **Changed** documentation sync with the hardening work: webhook endpoint policy + validation (`docs/configuration.md`, `docs/api/webhooks.md`, `docs/api/event-push.md`), login throttling (`docs/api/authentication.md`, `docs/api/faq.md`, `docs/api/overview.md`, README), API-key hashing note, explicit CORS header allowlist, `change-me` startup refusal (README, `docs/getting-started.md`, `docs/docker-deployment.md`), stale `hubre-docs` health example in `docs/getting-started.md`.
- **Removed** the dead `TestItem` model (`models/tb_test.py`) and the `Test` model (`models/tb_auth.py`) with their `test_item` / `test` tables (new migrations; the only imports were unused).
- **Fixed** the Docker config template drifted from the sample: `password_min_length` 8 → 12 and the missing webhook policy keys (`webhook_allow_http` / `webhook_allowed_hosts`, now rendered from `DOCY_WEBHOOK_*` env with safe defaults); the published image was rebuilt and re-pushed.
- **Fixed** signup 500 with short passwords: `MinimumLengthValidator.get_help_text()` returned a tuple (trailing comma), which crashed the 400 handler's `'<br/>'.join(errors)` with `TypeError` — surfaced when `password_min_length` was raised to 12; now returns a string, with regression tests.

## 2026-10-30

- **Changed** dependency security pass after `uv audit` (was 168 known vulnerabilities, 15 CRITICAL / 70 HIGH): upgraded pins (pillow, urllib3, certifi, anyio, brotli, filelock, geopy, setuptools, aiohttp, msgpack, mako, oauthlib, ...) and replaced python-jose with PyJWT 2.15.1 (five `from jose import jwt` call sites migrated; HS256 tokens stay interoperable). `uv audit` now reports 18 remaining, all constrained by pins (chromadb `<2.0.0`, cryptography pyarmor-bound, diskcache / langgraph-checkpoint-sqlite without a published fix).
- **Added** integrity verification to `docy install-ai`: the package server gains a signed manifest endpoint (Ed25519 signature over per-zip SHA-256 digests); the client verifies before extracting, restores the previous `ai/` backup on failure, warns on servers without a manifest, and gains a `--no-verify` flag.
- **Changed** security defaults: `settings.ini.sample` binds `127.0.0.1`, defaults to local storage (MinIO example commented out, no `minioadmin` defaults); password policy corrected to `low | medium | high` (default `medium`, 8 chars).
- **Changed** CORS: removed the static `Access-Control-Allow-Origin: *` + credentials headers from the exception handler; the outermost CORSMiddleware now supplies CORS headers everywhere, with methods restricted to `GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS`.
- **Fixed** startup crash from the new `cors_origins` option: `BaseSection.__getattr__` mutated the class `__annotations__` on a missing key, crashing later section dumps; annotations are now copied, and the key ships in every config.

## 2026-10-28

- **Changed** `docker-compose.yml` points directly at the published image `opendocy/open-docy:latest` (anonymous pulls, no `docker login`); `docker compose up -d` pulls automatically.

## 2026-10-27

- **Fixed** Docker image ballooning to 2.95GB: `.dockerignore` patterns switched to `**/` so `src/frontend/node_modules` (1.1GB) is excluded; image is now 2.03GB.
- **Fixed** `tini exec ... entrypoint.sh: No such file or directory` at container boot: CRLF line endings on Windows broke the shebang; added `.gitattributes` (`*.sh text eol=lf`) plus a Dockerfile CRLF normalization.
- **Changed** Docker env injection uses the standard compose pattern: `environment:` with `${VAR:-}` references (compose auto-loads `.env`); `API_KEY`/`SECRET_KEY` alias `DOCY_API_KEY`/`DOCY_SECRET_KEY` and are written into `settings.ini` when pinned.

## 2026-10-26

- **Changed** the optional MinIO service in `docker-compose.yml` runs Silo (`pgsty/silo`) instead of Bitnami MinIO (official images no longer allow anonymous pulls; Bitnami legacy lacks bucket CORS); verified bucket creation, CORS preflight and presigned uploads.
- **Changed** LibreOffice is now a required dependency (AI plugin Word/PPT/XLS → PDF conversion in addition to DOCX→PDF templates): `utils/file_convert.py` gained cross-platform `_find_soffice_path()`; the Dockerfile bakes in `libreoffice-writer/-impress/-calc` and drops dead weasyprint/cairosvg system libs.

## 2026-10-23

- **Changed** `DatabaseService.run_migrations` falls back to `create_db_and_tables()` when no Alembic version scripts ship, so the OSE snapshot creates tables from the models on first boot.
- **Added** `linux.aarch64` to the ai-package platform matrix (runtime detection in `default_platform()`, build script, registration server).
- **Added** Docker Compose deployment (linux/amd64): `Dockerfile` (python:3.12-slim + system libs + prebuilt frontend + encrypted AI plugin), `docker/entrypoint.sh` (auto-generated persistent secrets + `settings.ini` rendering from `DOCY_*` env), `docker-compose.yml` with named volumes and healthcheck.

## 2026-10-22

- **Changed** default server port from 8003 to 3000 across the OSE (configs, frontend dev proxy, AI worker fallback).

## 2026-10-21

- **Fixed** PyArmor macOS runtime shipped with a broken code signature, killing the ai-worker on Apple Silicon with `SIGKILL (Code Signature Invalid)`: `powershell.ps1` gained a pure-Python `Resign-DarwinRuntime` step that rebuilds the ad-hoc signature without macOS `codesign`; darwin.aarch64 zips now pass code-page verification.
- **Fixed** `docy run` crashed on macOS with `RuntimeError: database is locked`: the server child inherited the parent's SQLite connection via fork; the POSIX child now uses the spawn start method and rebuilds the app inside itself (`run_server_in_child`), preserving CLI overrides; `--log-dir` propagates to the ai-worker fleet via `DOCY_LOG_DIR`.

## 2026-10-20

- **Fixed** `docy install-ai` flattened the PyArmor package tree on POSIX: the zips store backslash separators, so `zipfile.extractall` created files with literal `\` in their names; `_extract_zip` now normalizes `\` to `/` (path-traversal checks preserved).
- **Fixed** `Sonyflake` initialization crashed with `NoPrivateAddress` on hosts without a private IPv4 address (WSL, containers): `DOCY_MACHINE_ID` now overrides the machine id, with a hostname-md5 fallback.
- **Fixed** `docy build-web` crashed with a raw exit-code-127 stack when Node.js is missing: `find_pnpm` checks for a usable `node` first, ignores Windows executables in WSL, and prints platform-specific install instructions.

## 2026-10-19

- **Fixed** silenced benign asyncio proactor noise on Windows: aborted connections (`WinError 10054`) were logged as ERROR; a loop exception handler now drops `ConnectionResetError`/`ConnectionAbortedError` from transport callbacks.
- **Added** audit events merged from the internal codebase: task run results (COMPLETE/FAIL/ACTION_REQUIRED/RESUME) and cancel, agent create/publish, batch deletes (single BATCH_DELETE record with the items in the payload).
- **Fixed** member removal was audited as POLICY DELETE; now recorded as SPACE DELETE ("Member Removed" label).
- **Changed** audit `weekly_trend` compares natural calendar weeks instead of rolling 7-day windows.
- **Fixed** `create_db_and_tables()` created tables from `SQLModel.metadata` only, so a fresh database had no business tables ("no such table: sys_menu"); it now imports every model module and creates from both `Base.metadata` and `SQLModel.metadata`.

## 2026-10-16

- **Changed** `task.log` moved to a dedicated honker log queue consumed with `concurrency=1`, so log lines are processed strictly in send order while other events keep full concurrency.
- **Changed** ai execution parallelized via a worker fleet: `DOCY_AI_WORKERS` (default 2, 1–16) worker processes drain the `ai` queue; the claim lease is 900s with heartbeat renewal (a crashed worker's job becomes re-claimable within ≤15min); each worker is watched and respawned by the server.
- **Fixed** task-log lost updates: handlers read the `ActivityTask` row before acquiring the per-task lock and re-read a stale snapshot from the identity map; `db.expire_all()` inside the lock forces a real re-read, and final logs are accepted when a `TaskRecord` exists for the run.
- **Fixed** task-log race conditions: concurrent `task.log` handlers could drop each other's line (non-atomic read-modify-write); a per-task `asyncio.Lock` now serializes log writes, re-checks `last_run_id` inside the lock, and cleans up old logs *before* enqueueing a re-run.
- **Fixed** startup menu injection: the audit menu path was `/audit` (the editor route); corrected to `/audit-logs` to match the frontend audit page.
- **Changed** user init no longer creates an empty "Demo Agent": it imports the sample package (`sample/sample.docy`) into the new user's personal workspace and sets it active (failures only warn).
- **Changed** `docy install-ai` default download endpoint now points at the docy-reg license server (`/reg-api/ai-package/download`); `--server` still overrides.

## 2026-10-15

- **Changed** `docy agent export` prompts for confirmation before copying the whole agent (private-information check) and asks before overwriting an existing file; migration failures during export/import surface as a red error + exit 1.
- **Fixed** `.docy` package export leaked custom-node variable values; `export_package` now blanks node-level and `input_values` variable values before zipping.
- **Fixed** agent import generated wrong storage keys for template names ending in a version fragment (e.g. "… v1.2" — ".2" misread as the extension); imports now use the declared extension (`template/<name>-<uuid>.pdf`).

## 2026-10-14

- **Added** `docy agent export/import` CLI (.docy packages): full-fidelity export of an agent's raw graph and document templates (custom-node variable values blanked), and import rebuilding the agent in a personal workspace with all storage keys remapped.

## 2026-10-10

- **Fixed** frontend bulk delete joined ids with commas (`?agent_ids=id1,id2`), which FastAPI parsed as a single-element list, so bulk delete silently failed; `split_comma_values()` in `core/_string.py` expands comma-joined values (applied to agent and activity bulk delete).
- **Removed** `ai_package_dir` config (no use case — the zip is fixed to `docy/dist/`).
- **Removed** team-space support: `create_workspace` raises `RequestError` for `space_type==TEAM` (OSE is personal-space only); personal-space limit enforced via `check_personal_workspace_exists`.
- **Removed** dead `[Redirect]`/`[LAMBDA]` config sections; `call_lambda` dropped the `call_method` param.
- **Changed** personal workspaces are now truly not deletable: `delete_workspace` raises `RequestError("Personal workspace cannot be deleted")` (previously a silent no-op).

## 2026-10-09

- **Fixed** `docy run --host/--port/--log-dir` did not take effect: `settings.update()` wrote to disk without refreshing in-memory sections (and rewrote the user's `settings.ini`); CLI overrides now apply in-memory only. Also fixed `log_dir` leaving `access_file` undefined.
- **Changed** audit aligned with the newer internal version: `GET /events/{id}` uses `get_record_detail()`, export `space_id` optional, CSV export Excel-safe, stats on a rolling 7-day window, plus audit instrumentation for task/agent/workspace/template.
## 2026-09-22

- **Added** `docy agent` (list/get) and `docy activity` (list/get/webhook) CLI command groups — direct SQLite access; `--email` locates the creator; `activity webhook --on/--off` toggles webhook push.
- **Added** `scripts/webhook_receiver.py` test receiver; signature verification goes through the server's `/api/v1/webhook/verify-signature` endpoint.
- **Changed** task creation now defaults `webhook_push` to `True`.

## 2026-09-21

- **Added** `docy webhook` and `docy api-key` CLI command groups covering all management endpoints.
- **Changed** id-based CLI commands resolve the record owner themselves — `--user-id`/`--email` no longer needed for get/update/rotate/delete.
- **Fixed** `cli/webhook.py` `_print_rows` built a rich table but never printed it — create/get/list/update tables were never shown.

## 2026-09-18

- **Added** full audit module migration from the internal codebase: 17 endpoints, 12 service modules, hash-chained event log with chain verification, anchors, offline verifier script, CSV/JSON export; triggers adapted to SQLite (`RAISE(ABORT)`); fixed a time-string mismatch (`+00:00` vs `Z`) that caused constant `hash_mismatch`.
- **Added** audit menu initialization (Support → Audit Logs + view/export/verify permissions), idempotent for fresh and existing databases.
- **Added** business audit events: agent create/update/delete, task create/delete, workspace member role update/removal, template create/delete/field update; fixed `remove_member` (500) and agent-delete audit capturing `space_id` before deletion.
- **Changed** PDF readers open from bytes (`fitz.open(stream=…)`) instead of paths — avoids locking source files on Windows.
- **Changed** `core/settings.py` trimmed to the sections actually in use; removed dead settings (PostgreSQL/MySQL/Redis/Email/SES/Stripe/RabbitMQ…).

## 2026-09-17

- **Added** in-app notifications for task completion/failure (replacing dead email code), using `[Server] public_base_url`-derived links.
- **Added** `DOCY_NO_AI_WORKER=1` startup flag and `docy stop-ai-worker` command (cross-platform process matching + tree kill).
- **Changed** template tasks `retries=1` — failures dead-letter instead of retrying (prevents concurrent duplicate execution); default queue visibility 3600s.
- **Fixed** process crash mid-template-task from a raw ctypes handle-diagnostic call (`win_handle_diag`) — removed; root-caused "temp PDF cannot be deleted (WinError 32)" to honker lease re-claim executing the same task concurrently.
- **Fixed** stale `settings.ini` `front_host` usage in notification links.

## 2026-09-16

- **Added** `docy build-web --api-base <url>` — bakes the backend base URL into the frontend bundle at build time.
- **Changed** removed hardcoded backend IPs: `DOCY_API_HOST` env override for the AI plugin, `public_base_url` for storage URLs, CORS origins default to localhost only (`[Server] cors_origins` to extend).

## 2026-09-15

- **Fixed** OpenCV failures on non-ASCII (Chinese) Windows paths — `read_image_unicode`/`write_image_unicode` replace all `imread`/`imwrite` calls.
- **Fixed** AI temp directories are isolated per task (`Cache/runs/<uniq>/`) — fixes cross-task file collisions in concurrent deployments; stale dirs (> 24h) swept on worker startup.
- **Fixed** access logs disappearing entirely after startup — `alembic/env.py` `fileConfig` defaulted to `disable_existing_loggers=True`; fixed with `disable_existing_loggers=False` plus a `setup_uvicorn_logger()` fallback.

## 2026-09-10

- **Fixed** log rotation `WinError 32` on Windows: server and AI worker now write separate log files since loguru rotation renames are blocked by cross-process handles.

## 2026-09-09

- **Added** AI-worker crash self-healing: supervisor respawns with exponential backoff (reset after 60s alive); locks reclaimed via native honker functions at startup.
- **Added** demo agent auto-created in the personal workspace during user init (failures only warn).
- **Fixed** plain `docy run` did not load root `.env` → AI worker `openai.OpenAIError`; `load_dotenv()` added to both entry points.

## 2026-09-08

- **Added** AI plugin distribution: `ai/` obfuscated with pyarmor 9 (self-contained runtime); `GET /api/v1/common/ai-package/download` + `docy install-ai` install the matching package.
- **Added** startup hard-block when the AI plugin is missing (error points to `uv run docy install-ai`), plus `AiPluginNotInstalled` fallback in the executor.
- **Fixed** `call_lambda` silent failure via module-level `_ensure_ai_importable()`.

## 2026-09-07

- **Added** Linux startup following the langflow pattern (`wait_for_server_ready` + fork) and `GET /api/v1/common/health` readiness probe.

## 2026-09-04

- **Added** frontend integration: `docy run` hosts the SPA, `docy build-web` builds it, wheel maps static files to `docy/web/static`.
- **Fixed** wheel `--target` install blocked by pip self-protection (dropped `pip-api`/`pip-requirements-parser` deps).

## 2026-09-03

- **Added** full migration of the `v1/bot` module (9 endpoints, 3 tables with Alembic migration) — Redis buffers replaced by cashews, Lambda calls by the built-in MQ.

## 2026-09-02

- **Changed** Redis → cashews + diskcache migration completed (write-log, cache log handler, log stream).
- **Changed** AI-side PostgreSQL → SQLite/Chroma migration completed (checkpoint store, session store, chromadb fixes).
- **Fixed** Windows temp-PDF `WinError 32` (fitz close).
