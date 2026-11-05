#!/bin/bash
set -euo pipefail

CONF_DIR="${DOCY_CONFIG_DIR:-/data/config}"
SECRETS_FILE="$CONF_DIR/secrets.env"
INI_FILE="$CONF_DIR/settings.ini"
mkdir -p "$CONF_DIR"

# ---- 1. Secrets: persist across restarts, env overrides, auto-generate once ----
SECRET_SPECS="DOCY_SECRET:16 DOCY_API_KEY:32 DOCY_SECRET_KEY:32 DOCY_JWT_SECRET_KEY:64"
[ -f "$SECRETS_FILE" ] && set -a && . "$SECRETS_FILE" && set +a
CHANGED=0
for spec in $SECRET_SPECS; do
    name="${spec%%:*}"
    len="${spec##*:}"
    current="${!name:-}"
    if [ -z "$current" ]; then
        current="$(python3 -c "import secrets; print(secrets.token_hex($len // 2))")"
        export "$name=$current"
        CHANGED=1
    fi
done
if [ "$CHANGED" -eq 1 ]; then
    for spec in $SECRET_SPECS; do
        name="${spec%%:*}"
        echo "$name=${!name}"
    done > "$SECRETS_FILE"
fi

# ---- 2. AI plugin callback auth must match settings.ini ----
# API_KEY / SECRET_KEY are aliases of DOCY_API_KEY / DOCY_SECRET_KEY.
# Pinned values (non-empty) win: they are written into settings.ini
# [Security] via the template; otherwise the generated values are exported.
if [ -n "${API_KEY:-}" ]; then
    export DOCY_API_KEY="$API_KEY"
else
    export API_KEY="$DOCY_API_KEY"
fi
if [ -n "${SECRET_KEY:-}" ]; then
    export DOCY_SECRET_KEY="$SECRET_KEY"
else
    export SECRET_KEY="$DOCY_SECRET_KEY"
fi

# ---- 3. Re-render settings.ini on every boot (non-secret values follow env) ----
export DOCY_STORAGE_DRIVER="${DOCY_STORAGE_DRIVER:-local}"
export DOCY_S3_ENDPOINT_URL="${DOCY_S3_ENDPOINT_URL:-}"
export DOCY_S3_ACCESS_KEY="${DOCY_S3_ACCESS_KEY:-}"
export DOCY_S3_SECRET_KEY="${DOCY_S3_SECRET_KEY:-}"
export DOCY_S3_REGION="${DOCY_S3_REGION:-us-east-1}"
export DOCY_S3_BUCKET="${DOCY_S3_BUCKET:-docy}"
export DOCY_PUBLIC_BASE_URL="${DOCY_PUBLIC_BASE_URL:-http://127.0.0.1:3000}"
export DOCY_CORS_ORIGINS="${DOCY_CORS_ORIGINS:-}"
export DOCY_TIMEZONE="${DOCY_TIMEZONE:-UTC}"
export DOCY_WEBHOOK_ALLOW_HTTP="${DOCY_WEBHOOK_ALLOW_HTTP:-false}"
export DOCY_WEBHOOK_ALLOWED_HOSTS="${DOCY_WEBHOOK_ALLOWED_HOSTS:-}"

python3 - /app/settings.ini.template "$INI_FILE" <<'PYEOF'
import os, sys

tpl, out = sys.argv[1], sys.argv[2]
with open(tpl, encoding="utf-8") as f:
    content = f.read()
for name, value in os.environ.items():
    content = content.replace("{{" + name + "}}", value)
with open(out, "w", encoding="utf-8") as f:
    f.write(content)
PYEOF

# The app instantiates its settings singleton at import time from
# CWD-relative settings.ini, before --conf-file is processed; point the
# default location at the rendered file so both paths see the same config.
ln -sf "$INI_FILE" /app/settings.ini

# ---- 4. exec so signals reach the server directly ----
exec uv run docy run --conf-file "$INI_FILE" --host 0.0.0.0 --port 3000 --no-browser
