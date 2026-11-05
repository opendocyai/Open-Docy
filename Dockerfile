# Build:  docker build -t open-docy:latest .
#
# The image is linux/amd64 — the encrypted AI plugin ships a linux.x86_64
# runtime (see docs/docker-deployment.md).

FROM python:3.12-slim

# Debian mirror: deb.debian.org is unreliable from China networks; switch to
# Aliyun (replace with mirrors.tuna.tsinghua.edu.cn / mirrors.ustc.edu.cn if preferred).
RUN sed -i 's|deb.debian.org|mirrors.aliyun.com|g' /etc/apt/sources.list.d/debian.sources 2>/dev/null || true; \
    sed -i 's|deb.debian.org|mirrors.aliyun.com|g' /etc/apt/sources.list 2>/dev/null || true

# System libraries: CJK fonts (reportlab + PDFium form rendering), libffi for the
# cffi-based PDF stack (pypdfium2/pikepdf), LibreOffice for Word/PPT/XLS->PDF
# conversion, healthcheck tooling, and tini as PID 1 so docker stop reaches it.
RUN apt-get update && apt-get install -y --no-install-recommends \
    fonts-noto-cjk libffi8 \
    libreoffice-writer libreoffice-impress libreoffice-calc \
    curl tini ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# uv from the official image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app

# Dependencies first so this layer stays cached across source changes.
# The hatchling build also reads these metadata files.
COPY pyproject.toml uv.lock build_hooks.py README.md LICENSE.md THIRD_PARTY_NOTICES.md ./
RUN uv sync --frozen --no-install-project

# Application source; src/backend/docy/ai is excluded via .dockerignore.
COPY src ./src

# Encrypted AI plugin for linux.x86_64. Prepare once by extracting
# ai-linux_x86_64-python312.zip into docker/context/ai/
# (see docs/docker-deployment.md). The working-tree ai/ is the Windows build.
COPY docker/context/ai ./src/backend/docy/ai

# Sample agent package imported for new users (user.init event).
COPY sample/sample.docy ./sample/

# Install the project itself (editable; dependencies are already cached).
RUN uv sync --frozen

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY docker/settings.ini.template /app/settings.ini.template
# Normalize CRLF (Windows checkouts) so the shebang line resolves.
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh && chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/usr/bin/tini", "--", "/usr/local/bin/entrypoint.sh"]
