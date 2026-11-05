# Docker Compose Deployment

Run Open Docy in a container without Python, Node, uv or pnpm. The image is **complete**: application code, dependencies, the prebuilt frontend and the encrypted AI plugin are all baked in. You only need Docker.

## What you get

- **Architecture**: `linux/amd64`. The encrypted AI plugin ships a `linux.x86_64` pyarmor runtime, and the image targets the matching platform.
- **LibreOffice**: baked into the image (`libreoffice-writer`/`-impress`/`-calc`) — required by the AI plugin for Word/PPT/XLS → PDF conversion and by DOCX→PDF template conversion.
- **Process model**: one container runs `docy run`; the AI worker is its supervised child process, matching the single-machine architecture of the app.
- **Secrets**: generated automatically on first boot and persisted in a named volume (`secrets.env`), so restarts keep JWT tokens and passwords valid.
- **Configuration**: `settings.ini` re-rendered from `DOCY_*` environment variables on every boot; AI credentials pass through from `.env`.
- **Storage**: the bundled local driver by default (everything in the `docy-data` volume); switchable to MinIO or S3 via environment variables.

## Quick start

The image is published on Docker Hub as `opendocy/open-docy:latest`; the compose file points at it, so `docker compose up -d` pulls it automatically (public repository — no `docker login` needed):

```bash
cp .env.sample .env   # fill in AI keys — only needed for agent tasks
docker compose up -d
```

On first boot the container generates the four required secrets and starts on port 3000:

- Web UI: `http://<host>:3000`
- Health probe: `http://<host>:3000/api/v1/common/health`

Check startup progress with `docker compose logs -f docy`.

> Run agent tasks requires an LLM provider key — pass `OPENAI_API_KEY` (and friends) through `.env` or the environment, see [Configuration](#configuration).

## Configuration

Create a `.env` file next to `docker-compose.yml` (start from `.env.sample`). Compose auto-loads `.env` and injects the values through the `${VAR}` references in the service's `environment:` section — no compose-file edits needed. Leaving it absent is fine for a plain start — only agent tasks need the AI provider keys.

### Secrets (generated once, then persisted)

| Variable | Length | Meaning |
|---|---|---|
| `DOCY_SECRET` | 16 | AES encryption key |
| `DOCY_API_KEY` | 32 | Internal API key (also exported as `API_KEY` for AI plugin callbacks) |
| `DOCY_SECRET_KEY` | 32 | Internal secret (also exported as `SECRET_KEY`) |
| `DOCY_JWT_SECRET_KEY` | 64 | JWT signing key |

They are generated with `secrets.token_hex` on first boot and written to `secrets.env` inside the `docy-config` volume. To pin the platform auth pair, set `API_KEY` / `SECRET_KEY` in `.env` — they are aliases of `DOCY_API_KEY` / `DOCY_SECRET_KEY`: any non-empty value is written into `settings.ini` `[Security]` `api_key` / `secret_key`, so the AI plugin callbacks authenticate against it. **Leave the values empty to keep the auto-generated ones** — `.env.sample` ships `change-me` placeholders, which count as non-empty and would be pinned as-is; blank them out if you don't intend to pin (the server refuses to start with `change-me` secrets, so pinning the placeholders as-is would prevent boot). `DOCY_SECRET` and `DOCY_JWT_SECRET_KEY` stay auto-generated; note that once a secret has been persisted in `secrets.env`, later `docker run -e` values cannot override it (the persisted file is loaded after the process environment).

### Non-secret settings (re-rendered on every boot)

These are not in the compose `environment:` list — the entrypoint applies the defaults below. Set them with `docker run -e` or by appending entries to `environment:` (see the MinIO comment block in `docker-compose.yml`).

| Variable | Default | Meaning |
|---|---|---|
| `DOCY_STORAGE_DRIVER` | `local` | `local` / `minio` / `s3` |
| `DOCY_S3_ENDPOINT_URL` | *(empty)* | Required for `minio`; must be reachable from **browsers** too — presigned upload/download URLs open client-side (see [Storage](#storage)) |
| `DOCY_S3_ACCESS_KEY` / `DOCY_S3_SECRET_KEY` | *(empty)* | S3/MinIO credentials |
| `DOCY_S3_REGION` | `us-east-1` | |
| `DOCY_S3_BUCKET` | `docy` | |
| `DOCY_PUBLIC_BASE_URL` | `http://127.0.0.1:3000` | Externally reachable address, used in notification links |
| `DOCY_CORS_ORIGINS` | *(empty)* | Comma-separated extra browser origins for cross-origin frontends (loopback origins are always allowed) |
| `DOCY_TIMEZONE` | `UTC` | |
| `DOCY_WEBHOOK_ALLOW_HTTP` | `false` | Webhook endpoint policy: `true` allows http targets (https-only by default) |
| `DOCY_WEBHOOK_ALLOWED_HOSTS` | *(empty)* | Comma-separated exact hostnames allowed to target private/internal addresses and use http |

### AI credentials (passed through as-is)

`OPENAI_API_KEY` (required for tasks), `MODEL_DEFAULT`, `MODEL_FALLBACK`, `EMBEDDING_PROVIDER`, `MISTRAL_API_KEY`, `OPENROUTER_API_KEY`, `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `TAVILY_API_KEY`, `LANGSMITH_API_KEY` — see [Configuration](configuration.md) for the full list.

## Building the image

Building is a project-side step (users pull the finished image). Two preparation steps are required:

1. **AI plugin**: extract the encrypted `linux.x86_64` build into the build context. The zip is produced by the internal PyArmor build script:

   ```bash
   # one-time: ai-linux_x86_64-python312.zip -> docker/context/ai/
   python -m zipfile -e src/backend/docy/dist/ai-linux_x86_64-python312.zip docker/context/ai/
   ```

   `docker/context/` is gitignored — the encrypted plugin is not committed.

2. **Frontend**: `src/frontend/dist-web/` must exist in the build context (`uv run docy build-web`). It is not committed either.

Then build:

```bash
docker build -t open-docy:latest .
```

The image is `linux/amd64`; building it on an x86_64 host runs at native speed.

The project publishes to Docker Hub (`opendocy/open-docy:latest`). To publish to your own registry:

```bash
docker tag open-docy:latest <your-registry>/open-docy:latest
docker push <your-registry>/open-docy:latest
```

and point the `image:` field of `docker-compose.yml` at the registry path.

## Storage

**Default (`local`)** — uploads, exports, the database, queue and AI state live under the `docy-data` volume (`/app/src/backend/docy/storage`). Back up that volume together with the `docy-config` volume.

**Switch to MinIO** — uncomment the `minio` and `createbuckets` services in `docker-compose.yml` and append the storage entries to the `docy` service's `environment:` section (as in the comment block), fill in the endpoint, then `docker compose up -d`:

```yaml
    environment:
      ...
      DOCY_STORAGE_DRIVER: minio
      DOCY_S3_ENDPOINT_URL: http://<server-host>:9000   # LAN address or domain
      DOCY_S3_ACCESS_KEY: minioadmin
      DOCY_S3_SECRET_KEY: minioadmin
      DOCY_S3_BUCKET: docy
```

`DOCY_S3_ENDPOINT_URL` must be reachable from **browsers too**, not just from the container: presigned upload/download URLs are opened client-side, so a container-internal name like `http://minio:9000` does not work.

The `minio` service runs **Silo** (`pgsty/silo`), a community-maintained MinIO fork — the official MinIO images no longer allow anonymous pulls, and the Bitnami legacy build lacks bucket CORS. On first boot the `createbuckets` one-shot creates the `docy` bucket and sets its CORS rules (browser uploads to presigned URLs are cross-origin), so there is nothing to configure by hand. Files already stored under the `local` driver stay on the volume and are not moved automatically — migrate them with `mc mirror` if needed.

**S3** — same variables pointed at your bucket.

> Keep volumes on a local disk (or block storage). The SQLite database does not tolerate NFS-style file locking.

## Updating

```bash
docker compose pull && docker compose up -d
```

Secrets and data live in the volumes, so updates never lose them.

## Limitations

- **amd64 only** — the image targets `linux/amd64` and arm64 images are not built or supported (the encrypted plugin does ship `linux.aarch64` builds, but no arm64 image is published).
- The AI plugin is already installed inside the image — do not run `docy install-ai` in the container.
- `settings.ini` inside the container is re-rendered from environment variables on every boot; configure through `.env` and the `DOCY_*` variables, not the file.
