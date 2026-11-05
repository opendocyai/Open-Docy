# @docyai/agent-kit

Visual AI agent orchestration kit for Vue 3: a flow-editor canvas plus ready-made agent nodes (content generation, knowledge, web search, compliance) you can embed in any host app.

## Install

```sh
npm i @docyai/agent-kit
# or
pnpm add @docyai/agent-kit
```

## Usage

```ts
import DocYaiModel, { setCodyAIConfig } from "@docyai/agent-kit";
import "@docyai/agent-kit/style.css";

app.use(DocYaiModel, { baseURL: "/api" });
setCodyAIConfig({ baseURL: "/api" });
```

Slim Rete-only entry (avoids pulling the whole page set into the host bundle):

```ts
import { ReteEditor, useRete } from "@docyai/agent-kit";
```

## Requirements

Peer dependencies (provided by the host project):

- `vue` ^3.4.0, `vue-router` ^5.2.0, `pinia` ^4.0.2, `pinia-plugin-persistedstate` ^4.7.1
- `ant-design-vue` ^4.2.6, `@ant-design/icons-vue` ^7.0.1, `dexie` ^4.4.6

## Tech Stack

- Vue 3 (`<script setup>` SFCs), Vue Router (file-based routes via `vue-router/auto-routes`), Pinia
- Vite 8, UnoCSS, Sass, Rete.js (workflow editor), Ant Design Vue, Dexie (IndexedDB)

## Project Structure

- `src/main.ts` — web/dev entry (creates app, router, pinia, API config)
- `src/index.ts` — library main entry (auto-generated barrel + Vue plugin, registers all components)
- `src/pages/` — file-based routes: `(workspace)` (activities, agents, knowledge base, document templates), `(default)` (login, dashboard, audit), `(setting)`, `(marketplace)`
- `src/components/` — shared components (`pdf`, `chat`, `upload`, `task`, `base`, …)
- `src/api/` — backend endpoint tables by domain (`apiAuth`, `apiBot`, `apiActivity`, `apiAgent`, `apiKnowledge`, …), each entry is `{ method, url }`
- `src/shared/` — pure types and utilities (PDF, SSE, Rete helpers, IndexedDB, file helpers)
- `src/utils/`, `src/composables/`, `src/stores/` — app-level utils, composables (SSE, IndexedDB, export-as-image, …), Pinia stores
- `src/router/` — `createDocYaiRouter()` / `getDocYaiRoutes()` plus auth middleware wiring
- `src/core/` — runtime API config (`setCodyAIConfig({ baseURL, token })`)
- `scripts/` — component/index codegen, `dist` copy, lib obfuscation helpers

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server (proxies `/api` to `API_TARGET`) |
| `pnpm typecheck` | `vue-tsc -b` type check |
| `pnpm build` | Type check + web build (`dist-web`) |
| `pnpm build:lib` | Type check + library build (`dist`, `index.js` + `style.css` + `d.ts`) |
| `pnpm build:lib:rete` | Slim Rete-only build (`dist-rete/rete.js`) |
| `pnpm build:lib:local` | Full local build pipeline: lib + rete + obfuscate + copy into `lib/docyai-model` |
| `pnpm gen` | Regenerate the component barrel and library index (do not edit generated files by hand) |

## Environment

`.env` ships with the repository and works as-is:

```sh
VITE_API_BASEURL=/api                  # API base path used by the app
VITE_API_TARGET=http://127.0.0.1:3000  # dev-server proxy target for /api (API_TARGET is accepted as a non-VITE_ alias, so it never reaches the browser bundle)
#VITE_API_TOKEN=                       # optional bearer token for the demo entry
```

Point `VITE_API_TARGET` at your own backend for cross-machine debugging or public deployment.

## License

The source code in this repository is released under the [MIT License](./LICENSE).

`lib/docyai-model/` is a compiled bundle and is **not** covered by that grant.
It contains third-party components under their own licenses, some of which are
**not open source** — for example the watermarked PPT runtime `@file-viewer/ppt`
(Flyfish Public Watermarked Runtime License) and `@splinetool/runtime` (no
license grant published with the package). See
[THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) before redistributing a
build.

### What is *not* part of the MIT grant

| Item | Why | Where |
| --- | --- | --- |
| The compiled canvas bundle | The MIT grant covers source code, not this bundle. | `lib/docyai-model/` |
| `@file-viewer/ppt` runtime | Proprietary "Flyfish Public Watermarked Runtime License"; watermark must stay. | bundled in `lib/docyai-model/`, text in `third-party/@file-viewer-ppt/` |
| `@splinetool/runtime` + `public/scene.splinecode` | No license grant published with the package; Spline terms govern the scene export. | `src/components/spline-viewer/`, `public/` |
| "Docy AI" name, logo and brand assets | Trademarks are never granted by a code license. | `src/assets/images/logo*`, `public/logo.svg` |
| Fonts | Inter is SIL OFL 1.1 (redistributable with its license); the commercial **DIN** faces were removed for this reason. | `third-party/Inter/` |
