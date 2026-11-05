# Files

All files used by tasks (inputs) or produced by them (results) are referenced by **file keys** — object paths like `default/xxx.pdf` or `audit/xxx.png`. Upload files before starting a task; convert result keys to download URLs when done.

> **Storage drivers.** Where file bytes actually go depends on `driver_type` in the `[S3]` settings section:
>
> - **`local`** — files are stored on the docy server itself. The pre-signed APIs return URLs pointing at the server's own `/api/v1/common/upload/{key}` and `/api/v1/common/files/{key}` endpoints, which carry the file data.
> - **`s3` / `minio`** — files are stored in the object store. The pre-signed APIs return presigned S3/MinIO URLs and clients exchange data **directly with the object store**, bypassing the docy server; the two server-side endpoints above are not involved. The `store_type` field in the upload response tells you which mode is active.

---

## File Upload API

Uploading happens in two steps: request a pre-signed upload URL (plus the resulting file key), then upload the file content to that URL.

### Step 1: Request an Upload URL

```
POST /api/v1/common/pre-signed/url
```

#### Request Body

`Content-Type: application/json`

| Field | Type | Required | Description |
|---|---|---|---|
| `file_name` | string | Yes | File name |
| `category` | string | No | Storage directory name, e.g. `default` |
| `file_tag` | string | No | MIME type, e.g. `application/pdf`, `image/webp` |
| `file_size` | integer | No | File size in bytes (optional) |
| `file_metadata` | object | No | Custom file metadata |

#### Request Example

```
POST /api/v1/common/pre-signed/url
X-API-Key: sk_1234567890abcdef
Content-Type: application/json

{ "file_name": "contract.pdf", "category": "default", "file_tag": "application/pdf" }
```

#### Response Example

```json
{ "data": { "key": "default/xxx.pdf", "upload_url": "http://<host>:<port>/api/v1/common/upload/default/xxx.pdf?expires=…", "store_type": "local" }, "msg": "operation success.", "status": "success", "code": 200 }
```

With `driver_type = s3` or `minio`, `upload_url` is a presigned PUT URL of the object store itself (e.g. `https://<bucket>.s3.<region>.amazonaws.com/<key>?X-Amz-…`) and `store_type` is `"s3"`.

### Step 2: Upload the File

`PUT` the file to the returned `upload_url`.

With the `local` driver the URL is the server's upload endpoint — send the file as `multipart/form-data` with the field name `file`:

```
PUT /api/v1/common/upload/{key}
```

```bash
curl -X PUT "http://<host>:<port>/api/v1/common/upload/default/xxx.pdf" \
  -F "file=@contract.pdf"
```

The URL expires at the `expires` query timestamp (the server rejects expired uploads).

With the `s3` / `minio` drivers, `PUT` the raw file bytes to the presigned URL directly — no multipart wrapper, no docy endpoints involved:

```bash
curl -X PUT "<presigned upload_url>" --data-binary @contract.pdf
```

Response (local driver):

```json
{ "data": { "key": "default/xxx.pdf", "file_name": "contract.pdf" }, "msg": "operation success.", "status": "success", "code": 200 }
```

In Python with `requests` (local driver):

```python
files = {"file": ("contract.pdf", open("contract.pdf", "rb"))}
requests.put(upload_url, files=files)
```

Use the returned `key` in task run bodies (see [Running Tasks](task-run.md)).

---

## File Download API

### Generate a Download URL

Result files are referenced by key in task results / webhook payloads (paths starting with `default/`, `audit/`, …). Convert them to download URLs:

```
POST /api/v1/common/pre-download/url
```

#### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `file_key` | string | Yes | File path from the results/webhook `output_values`, e.g. `default/Enhanced_Paper_new-xxx.docx` |
| `check_key` | boolean | No | Whether to validate the key exists (default `true`) |

#### Request Example

```
POST /api/v1/common/pre-download/url
X-API-Key: sk_1234567890abcdef
Content-Type: application/json

{ "file_key": "default/Enhanced_Paper_new-xxx.docx" }
```

#### Success Response (200)

```json
{
  "data": {
    "url": "http://<host>:<port>/api/v1/common/files/default/Enhanced_Paper_new-xxx.docx",
    "file_name": "Enhanced_Paper_new-xxx.docx",
    "file_key": "default/Enhanced_Paper_new-xxx.docx",
    "file_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "file_size": 104094.0,
    "file_tag": [],
    "file_metadata": {}
  },
  "msg": "operation success.",
  "status": "success",
  "code": 200
}
```

#### Error Responses

```json
{ "data": null, "msg": "Field required.", "status": "validation error.", "code": 400 }
{ "data": null, "msg": "Invalid API Key", "status": "error", "code": 401 }
```

With `driver_type = s3` or `minio`, `url` is a presigned GET URL pointing **directly at the object store** (valid ~1 hour) — the docy server is not in the download path.

### Download the File

`GET` the returned URL.

With the `local` driver the URL is the server's static file endpoint:

```
GET /api/v1/common/files/{key}
```

```bash
curl -O "http://<host>:<port>/api/v1/common/files/default/Enhanced_Paper_new-xxx.docx"
```

With the `s3` / `minio` drivers, `GET` the presigned URL directly:

```bash
curl -O "<presigned download_url>"
```

> Download result files promptly — storage cleanup policies may remove old task files.
