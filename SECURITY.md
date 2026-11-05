# Security Policy

## Reporting a Vulnerability

Please report security vulnerabilities **privately** — do not open a public issue. Contact the maintainers at:

> `jacob@docyai.com` 

Once the repository is public on GitHub, prefer **GitHub private vulnerability reporting** (Security → Advisories), which also enables coordinated disclosure.

Include:

- a description of the vulnerability and its impact,
- steps to reproduce (or a proof of concept),
- the affected version (see [Supported Versions](#supported-versions)).

We will acknowledge receipt within 5 working days and aim to publish a fix (and advisory, if warranted) within 90 days. You will be credited unless you ask not to be.

## Supported Versions

| Version | Supported |
|---|---|
| 0.0.1 (current) | Yes |

Only the latest release receives security fixes.

## Security Model

Open Docy is a self-hosted server. The relevant surfaces and their protections:

- **API authentication** — every integration endpoint accepts a user-scoped API key (`X-API-Key` header) or a JWT bearer token (`Authorization: Bearer`). API keys are created by authenticated users and shown in full only once; at rest only their SHA-256 hash is stored (a fast hash is appropriate here: keys are 256-bit random tokens, not passwords). Legacy plaintext rows are upgraded in place on first use. See [Authentication](docs/api/authentication.md).
- **Login throttling** — failed logins are tracked per account and per IP (5 failures per 15 minutes → temporary lockout with exponential backoff, capped at 24 hours); a successful login resets both counters. `Retry-After` is sent with 429 responses.
- **Webhook endpoint SSRF protection** — webhook endpoints are validated on create/update and again at send time: https-only by default, no embedded credentials, and the resolved host must not be a private, loopback, link-local, multicast or reserved address (IPv4 and IPv6). Redirects are never followed and responses are capped at 1 MiB. An opt-in `webhook_allowed_hosts` list can allow internal targets explicitly.
- **Webhook signatures** — outbound webhook deliveries are HMAC-SHA256 signed (`X-Webhook-Signature: t=<ts>,v1=<hmac>`); receivers can verify them via `POST /api/v1/webhook/verify-signature`. See [Event Push](docs/api/event-push.md).
- **Audit trail integrity** — business operations are appended to a hash-chained, HMAC-signed audit log; SQLite triggers block `UPDATE`/`DELETE` on the audit table, and chains can be verified online or offline. See [Audit API](docs/api/audit.md).
- **Secrets** — all secrets (JWT signing key, internal keys, object-storage credentials, AI provider keys) come from `settings.ini` and the environment (`.env`), never from code. The server refuses to start when the `change-me` placeholder secrets are still configured. See [Configuration](docs/configuration.md).
- **CORS** — browser origins are restricted to `127.0.0.1`/`localhost` by default; other origins must be explicitly listed via `cors_origins` in `settings.ini`.

## Known Considerations

- **Development defaults** — `settings.ini.sample` ships with `change-me` placeholder secrets and binds `127.0.0.1`. The server refuses to start until the placeholders are replaced; for shared deployments also bind a controlled interface (see [Deployment](docs/deployment.md)).
- **`.env` contains AI provider credentials** — keep it out of version control and restrict file permissions.
- **Login throttling only** — the open-source edition rate-limits logins (per account and per IP) but applies no general request rate limits; put a rate-limiting reverse proxy in front of public deployments (see [Deployment](docs/deployment.md#reverse-proxy-nginx)).
- **The `ai/` runtime is a binary plugin** — distributed as an encrypted (pyarmor) package; it is not part of the MIT-licensed source. `chromadb` is a dependency of that plugin only (embedded mode, no server); the open core never imports it.
- **`minimatch` 3.1.5 (npm)** — a dev-only transitive dependency of `javascript-obfuscator` (build tooling); it never ships in the built frontend.
- **Password hashing** — PBKDF2-SHA256 with 600,000 iterations and per-user salts; hashes created by older versions (390,000 iterations) still verify and are re-hashed to 600,000 automatically on successful login.
- **Agent package archives** — zip extraction enforces entry-count, total-size, single-file-size and compression-ratio limits on top of path-traversal checks. The on-disk cache directory is created with `0700` permissions (POSIX).

If you find a gap in this model, please report it as described above.
