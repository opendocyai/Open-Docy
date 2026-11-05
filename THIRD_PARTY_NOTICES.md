# Third-Party Notices

Open Docy's own code is licensed under the [MIT License](LICENSE.md). This file lists the **notable** third-party components that Open Docy depends on and whose licenses are not MIT, for transparency. It is not an exhaustive inventory — the dependency tree contains many more permissively licensed packages (MIT, Apache-2.0, BSD); their license texts ship with the installed distributions and, inside the Docker image, with the Debian packages' `/usr/share/doc/*/copyright` files.

The Python dependencies listed below are not bundled in this repository — they are installed from PyPI by the package manager; their license texts belong to the upstream packages and must be included if you redistribute Open Docy together with them (e.g. in a Docker image). One exception: the repository **does** ship a compiled frontend bundle (`src/frontend/lib/docyai-model/`) that vendors third-party components, including components that are **not open source** (the Flyfish watermarked PPT runtime and the Spline runtime). Their terms, notices and full license texts live with the frontend — see [Frontend bundle](#frontend-bundle).

> **Note:** Open Docy previously depended on PyMuPDF (AGPL v3). That dependency has been removed entirely — PDF reading/rendering/search is now backed by `pypdfium2`, form filling/creation by `pypdf`, PDF repair/compression by `pikepdf`, and PDF generation by `reportlab`. No AGPL component remains in the dependency tree.

## LGPL

| Component | License | Notes |
|---|---|---|
| `chardet` | LGPL-2.1-or-later | Encoding detection (Copyright © Mark Pilgrim, Ian Cordasco and contributors) |

LGPL components are used unmodified via normal Python imports (dynamic linking), so the LGPL copyleft does not extend to Open Docy. Full text: [LGPL-2.1](https://www.gnu.org/licenses/lgpl-2.1.txt).

## MPL-2.0

| Component | Notes |
|---|---|
| `certifi` | Mozilla CA bundle (Copyright © Kenneth Reitz) |
| `tqdm` | Progress bars (Copyright © Noam Yorav-Raphael and contributors; some files are MIT) |
| `pikepdf` | PDF repair/compression/flattening (Copyright © pikepdf contributors; wraps qpdf, which is Apache-2.0) |

MPL-2.0 is file-level copyleft — using these packages as dependencies does not impose copyleft on Open Docy. Full text: [MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/).

## Apache-2.0

| Component | Notes |
|---|---|
| `caio` (dependency of `aiofile`) | PyPI metadata lacks a license field; the upstream repository declares Apache-2.0 |
| `mistralai` (dependency of `langchain-mistralai`) | PyPI metadata lacks a license field; the upstream repository declares Apache-2.0 |
| `pypdfium2` | PDF text extraction/rendering/search (Apache-2.0 or BSD-3-Clause; bundles PDFium, which is BSD-3-Clause) |

Full text: [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0.txt).

## MIT

### `camelot-py`

- **License:** MIT
- **Note:** Open Docy uses camelot 2.x with the pure-Python `playa` backend, which does not require Ghostscript. The legacy camelot backend that shells out to Ghostscript (AGPL-licensed) is not used, and Ghostscript is **not bundled** with Open Docy.

## Proprietary

### PyArmor (`pyarmor`)

- **License:** proprietary ("Free To Use But Restricted", see <https://pyarmor.readthedocs.io/en/latest/>)
- **Used by:** build-time obfuscation of the `ai/` plugin, and running the obfuscated plugin at runtime. PyArmor is not open source. PyArmor's license permits distributing obfuscated scripts together with the PyArmor runtime package.

## System dependencies

| Component | License | Notes |
|---|---|---|
| `LibreOffice` (soffice) | MPL-2.0 | External application invoked via the `soffice` CLI for Word/PPT/XLS → PDF conversion (document templates and the AI plugin). Installed with `docy install-libreoffice` or the OS package manager; not a Python dependency. The Docker image redistributes its binaries — the license texts ship inside the image via the Debian packages' `/usr/share/doc/*/copyright` files, and the source is available at <https://git.libreoffice.org/core> (or Debian source packages). |

Full text: [MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/).

## Frontend bundle

The compiled canvas bundle at `src/frontend/lib/docyai-model/` (published as `@docyai/agent-kit`) vendors frontend third-party components — Apache-2.0 (`pdfjs-dist`, `dexie`, `@file-viewer/*`), MIT (`rete`, `three`, `vue`, …), the SIL OFL Inter font, and two components that are **not open source**:

- `@file-viewer/ppt` — proprietary "Flyfish Public Watermarked Runtime License v2.0": redistribution only as an integrated, unmodified dependency, watermark must stay.
- `@splinetool/runtime` — no license grant published with the npm package.

The full inventory, obligations and license full texts are documented in [`src/frontend/THIRD_PARTY_NOTICES.md`](src/frontend/THIRD_PARTY_NOTICES.md) with the texts under [`src/frontend/third-party/`](src/frontend/third-party/). If you redistribute a build (including the Docker image), those notices and texts must travel with it.

## License texts

None of the components above are redistributed by this project's wheel. If you bundle them (Docker image, vendored distribution), include the full license texts:

- [LGPL-2.1](https://www.gnu.org/licenses/lgpl-2.1.txt)
- [MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/)
- [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0.txt)
