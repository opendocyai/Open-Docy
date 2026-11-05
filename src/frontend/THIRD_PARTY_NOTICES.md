# Third-party notices

This repository's own source code is licensed under the MIT License (see
[LICENSE](./LICENSE)). That license does **not** apply to the third-party
components listed below, which keep their own licenses and copyright notices.

The compiled bundle in `lib/docyai-model/` (published as `@docyai/agent-kit`)
contains this project plus the packages below. Some of them are **not open
source**. If you redistribute a build that contains them, you must comply with
their terms and keep their notices.

> This file is a practical inventory, not legal advice. If you add, remove or
> upgrade a dependency, update this file and re-check the upstream license.

## Not open source / no open-source grant

| Component | Version | Terms |
| --- | --- | --- |
| `@file-viewer/ppt` | 0.3.3 | **Flyfish Public Watermarked Runtime License v2.0** — proprietary. Redistribution is allowed only as an integrated, unmodified dependency, and every public rendering must keep the Flyfish watermark. It is **not** MIT and must not be relicensed under this project's MIT grant. Full text: [`third-party/@file-viewer-ppt/`](./third-party/@file-viewer-ppt/). |
| `@splinetool/runtime` | 1.12.98 | No `license` field and no `LICENSE` file are published with the npm package. Treat it as **not covered by MIT** and confirm terms with Spline before redistributing a build that contains it. |

The `@file-viewer/*` packages are Apache-2.0 **except** `@file-viewer/ppt`
above. The PPT renderer (`@file-viewer/renderer-ppt`) is Apache-2.0, but it loads
the proprietary `@file-viewer/ppt` runtime.

## Apache License 2.0

| Component | Version |
| --- | --- |
| `pdfjs-dist` | 6.2.108 |
| `dexie` | 4.4.6 |
| `@file-viewer/core` | 3.0.0 |
| `@file-viewer/docx` | 0.3.28 |
| `@file-viewer/pptx` | 3.0.0 |
| `@file-viewer/preset-all` | 3.0.0 |
| `@file-viewer/vue3` | 3.0.0 |
| `@file-viewer/renderer-*` | 3.0.0 |
| `@file-viewer/capability-*` | 3.0.0 |
| `@file-viewer/eda-*` | 3.0.0 |
| `@file-viewer/geometry-engine` | 3.0.0 |

A copy of the Apache License 2.0 is available at
<https://www.apache.org/licenses/LICENSE-2.0>.

## MIT License

### Canvas and editor

| Component | Version |
| --- | --- |
| `rete` | 2.0.6 |
| `rete-area-plugin` | 2.3.2 |
| `rete-connection-plugin` | 2.0.5 |
| `rete-context-menu-plugin` | 2.0.6 |
| `rete-engine` | 2.1.1 |
| `rete-readonly-plugin` | 2.0.2 |
| `rete-render-utils` | 2.0.3 |
| `rete-structures` | 2.0.3 |
| `rete-vue-plugin` | 2.1.3 |
| `codemirror` and `@codemirror/*` | 6.x |

### 3D and document parsing

| Component | Version | Notes |
| --- | --- | --- |
| `three` | 0.184.0 | MIT. Includes the `examples/jsm` loaders bundled as `3MFLoader`, `AMFLoader`, `ColladaLoader`, `FBXLoader`, `GLTFLoader`, `KMZLoader`, `OBJLoader`, `PCDLoader`, `PLYLoader`, `STLLoader`, `TDSLoader`, `USDLoader`, `VRMLLoader`, `VTKLoader`, `XYZLoader` and related chunks. |
| `jszip` | 3.10.1 | MIT OR GPL-3.0-or-later; this project uses it under the MIT option. |
| `utif` | 3.1.0 | MIT. |
| `rtf.js` | 3.0.9 | MIT. |

### UI, utilities and runtime

| Component | Version | Notes |
| --- | --- | --- |
| `vue` | 3.5.x | Peer dependency, provided by the host. |
| `vue-router` | 5.2.x | Peer dependency, provided by the host. |
| `pinia` | 4.0.x | Peer dependency, provided by the host. |
| `pinia-plugin-persistedstate` | 4.7.x | Peer dependency, provided by the host. |
| `ant-design-vue` | 4.2.x | Peer dependency, provided by the host. |
| `@ant-design/icons-vue` | 7.0.x | Peer dependency, provided by the host. |
| `@vueuse/core` | 14.x | MIT. |
| `@better-scroll/*` | 2.5.x | MIT. |
| `@formkit/auto-animate` | 0.10.0 | MIT. |
| `axios` | 1.19.0 | MIT. |
| `await-to-js` | 3.0.0 | MIT. |
| `crypto-es` | 3.1.3 | MIT. |
| `dayjs` | 1.11.23 | MIT. |
| `file-saver` | 2.0.5 | MIT. |
| `html-to-image` | 1.11.13 | MIT. |
| `js-base64` | 3.9.2 | MIT. |
| `jwt-decode` | 4.0.0 | MIT. |
| `lodash` | 4.18.1 | MIT. |
| `nanoid` | 6.0.1 | MIT. |
| `uuid` | 14.0.1 | MIT. |
| `vue-json-pretty` | 2.6.0 | MIT. |

## Fonts (`third-party/Inter/`)

| Font | File | Terms |
| --- | --- | --- |
| Inter | `src/assets/fonts/inter.otf` | **SIL Open Font License 1.1** — redistributable, including embedded as base64 in the built `style.css`, provided the license and copyright notice travel with it. Full text: [`third-party/Inter/OFL.txt`](./third-party/Inter/OFL.txt), attribution: [`third-party/Inter/NOTICE`](./third-party/Inter/NOTICE). |

**Removed on purpose — do not re-add:** the DIN faces
(`din-regular.otf`, `din-medium.otf`) that used to live in
`src/assets/fonts/`. DIN is a commercial Monotype typeface; it was never
licensed for redistribution, so it must not be committed or shipped in a build.

## Assets

- `public/pdf.worker.min.js` is part of `pdfjs-dist` (Apache-2.0).
- `public/scene.splinecode` is a Spline scene export consumed by
  `@splinetool/runtime`. Spline's terms govern the exported scene and differ by
  plan (free plans require attribution); it is **not** covered by this project's
  MIT grant. Verify the terms or replace the scene before publishing a fork.
- Brand assets (`src/assets/images/logo*.svg`, `logo-icon.svg`,
  `public/logo.svg`, and the "Docy AI" name) identify the upstream product. The
  MIT license covers the code, not the trademarks — see "Trademarks" below.

## Trademarks

The MIT license applies to the source code only. It does **not** grant rights to
the "Docy AI" name, the Docy AI logo, or any product names, logos or brand
assets shipped in this repository. Forks must remove or replace them.

## Full license texts

The complete license texts are distributed with the corresponding npm packages
under `node_modules`, and the build keeps the upstream notice files where it
emits them. When you publish a bundle, include this file, the
root `LICENSE`, and any `LICENSE` / `NOTICE` files emitted next to the bundle.
