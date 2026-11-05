# Contributing to Open Docy

Thanks for your interest in contributing! This project is the open-source edition of a previously internal commercial product. A few conventions matter more than usual here, because a large part of the working tree was ported from the internal codebase and API compatibility is a hard requirement.

## How to contribute

1. **Discuss first** — open an issue describing the bug or feature. Redesigns and API changes must be discussed and approved before implementation.
2. **Implement** — follow the conventions below; create new files rather than modifying existing ones wherever possible.
3. **Open a PR** — go through the checklist below. There is no CI; maintainers verify manually.

### PR checklist

- [ ] `uv run python -m compileall src/backend/docy` passes
- [ ] `uv run docy run` boots and the health probe returns 200 (`GET /api/v1/common/health`)
- [ ] Any schema change has an Alembic migration under `alembic/versions/` (never `create_all`)
- [ ] New examples in documentation were actually run
- [ ] Documentation updated together with the code (API changes → `docs/api/`, behavior changes → `docs/`, notable changes → `CHANGELOG.md`)

## Ground Rules

- **Never delete, overwrite, or rename existing files** without explicit discussion. Prefer creating new files over modifying existing ones; place them in the appropriate module (`services/`, `api/v1/`…) following the existing naming (`snake_case.py`) and import structure.
- **API compatibility** — when changing an endpoint that exists in the internal version (`src/old_backend/` is the reference), preserve the full contract unless explicitly agreed otherwise: same input parameters (new optional fields are allowed; required fields cannot be removed or renamed), identical response schema including error messages/codes, same side effects. Breaking changes require a new API version (e.g. `/api/v2/`).
- **Discussions first** — complete redesigns must be explicitly discussed and approved before implementation.

## Development Setup

```bash
uv sync                      # install dependencies
uv run docy install-ai       # install the AI plugin (required for the server to start)
uv run docy run              # start server (runs migrations, serves UI, spawns AI worker)
uv run python -m compileall src/backend/docy   # quick syntax check
```

There is no test suite, lint, or format tooling — the style below is enforced by convention only. If you add tests, use pytest + pytest-asyncio under `tests/` and run them with `uv run pytest`.

See [docs/architecture.md](docs/architecture.md) for the component overview and [docs/getting-started.md](docs/getting-started.md) for the user-facing flow.

## Architecture & Layering

New feature flow: **route → service → crud**.

| Directory | Responsibility |
|---|---|
| `api/v1/` | HTTP routes only — thin layer, no business logic |
| `services/` | Business logic per domain (auth, agent, workspace, activity, webhook, …) |
| `crud/` | Database access |
| `models/` | SQLModel table definitions (`tb_*.py`) |
| `schema/` | Request/response Pydantic models |
| `core/` | Settings, task queue, SSE, storage drivers, shared utils |
| `common/` | Uniform response envelope and pagination helpers |
| `exceptions/` | Custom exceptions + handlers |

Reuse existing utilities in `core/` and `common/` before writing new ones — no parallel implementations.

## Code Style

- PEP 8: 4-space indent, lines ≤ 100 chars, two blank lines between top-level definitions.
- Double-quoted strings; snake_case functions/vars, PascalCase classes, UPPER_SNAKE constants.
- Type hints on all public functions/methods.
- Import grouping (as in `main.py`): stdlib → third-party → `docy.*`, one blank line between groups.
- Comments/docstrings in English. Don't mass-rewrite existing Chinese comments; convert only in code you touch. Don't add legacy Chinese header blocks to new files.

## Database & Migrations

- Any model/table-schema change **requires** an Alembic migration under `alembic/versions/`. Never call `create_all` in app code.
- Fully async: aiosqlite + async sessions; no sync engines in the request path.

## Error Handling & Responses

- Wrap responses with the uniform envelope from `common/response` — never return ad-hoc dicts from routes.
- Raise custom exceptions from `exceptions/exception.py`; register handlers in `exceptions/handler.py`.

## Async Rules

- The request path is async end-to-end. No blocking calls (`requests`, sync file IO) — use `httpx`/`aiohttp`/`aiofile`.
- Keep heavy sync work (e.g. `pandas`) out of hot request paths.

## Security

- Never hardcode secrets/tokens/API keys. Always read from settings/environment.

## The `ai/` Directory

`ai/` contains the langgraph agent runtime and is shipped as a pyarmor-obfuscated plugin — do not break it, and follow its documented event protocol. Any process importing `docy.ai` must first import `docy.honker_db` (or `docy.core.aiexecutor`), otherwise the pyarmor runtime fails. Cold-import scripts and smoke tests must follow this order.

## Verification

Before reporting a change as done: run `compileall` and start the server (`uv run docy run`) to confirm it boots, and verify the changed endpoints against the internal-codebase request/response samples where applicable.

## Documentation

Documentation lives next to the code and is part of every change:

- `README.md` — the front door: what the project is, quick start, docs index. Keep it short; details belong in `docs/`.
- `docs/getting-started.md`, `docs/configuration.md`, `docs/troubleshooting.md`, `docs/architecture.md` — guides and reference.
- `docs/api/` — the REST reference; every endpoint documented there must exist in the codebase with the same contract.
- `CHANGELOG.md` — append a dated entry for notable changes (adds, behavior changes, fixes worth knowing).

Rules:

- **Docs change with the code.** API changes update `docs/api/`; new options update `docs/configuration.md` or `docs/getting-started.md`; recurring support questions go into `docs/troubleshooting.md`.
- **Every example must be run before it is documented.** Copy-paste the commands and requests exactly as written.
- **Language**: documentation and code comments are in English (matching the hosted API docs).

Found a documentation error or missing example? A doc-only PR is welcome and appreciated.
