# Running Tasks

Executing a task: discover its input nodes, start it, handle human-in-the-loop manual nodes, and cancel runs.

---

## Query Task Input Nodes API

Returns the input parameter structure required by the task's agent. **Always call this after creating a task and before starting it** — the run request body is entirely determined by these nodes.

```
GET /api/v1/activity/{task_id}/input/nodes
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `task_id` | string | Yes | The unique identifier of the task |

### Request Example

```
GET /api/v1/activity/task-1234567890abcdef/input/nodes
X-API-Key: sk_1234567890abcdef
```

### Success Response (200)

`data` is an array of input node objects:

```json
{
  "code": 200,
  "msg": "operation success.",
  "status": "success",
  "data": [
    {
      "id": "c40abfc51b4c9613",
      "label": "InputFile",
      "title": "Input file",
      "input_values": { "key": "input_task1", "accept": ["pdf", "doc"], "limit_size": "10" },
      "variable": { "key": "input_task1", "files": [], "file_map": {} }
    },
    {
      "id": "809e61b727fa20d3",
      "label": "GroupInputFile",
      "input_values": { "key": "input_task2", "accept": ["pdf", "doc", "docx", "xls"], "limit_size": "50" },
      "variable": { "upload": [{ "key": "input_task2" }], "file_map": {} }
    }
  ]
}
```

### Node Object Structure

| Field | Description |
|---|---|
| `id` | Node ID — used as the request parameter key when starting the task |
| `label` | Node type: `InputFile` (single file) or `GroupInputFile` (multiple files / repeatable group) |
| `title` | Display title |
| `input_values.key` | Parameter key name |
| `input_values.accept` | Accepted file extensions (e.g. `["pdf", "doc"]`) |
| `input_values.limit_size` | File size limit in MB |
| `variable.key` | Matches `input_values.key` |

### Error Responses

```json
{ "data": null, "msg": "Task not found!", "status": "error", "code": 400 }
{ "data": null, "msg": "Invalid API Key", "status": "error", "code": 401 }
```

---

## Start Task API

Starts execution of a previously created task.

```
POST /api/v1/activity/{task_id}/run
```

> **Important:** the request body structure is dynamic — determined by the agent's input nodes from the query above.
>
> Workflow: **Create Task → Query Input Nodes → Upload Files → Build Request Body → Start Task**

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `task_id` | string | Yes | The ID of the task to start |

### Request Body Construction

General rules:

- Each input node becomes one top-level parameter, **keyed by node `id`** (the `data[n].id` value).
- The parameter's structure depends on the node's `label`.
- File values are `file_key`s obtained from the [upload API](files.md#file-upload-api).

All node parameters are wrapped under a `node_input` object (see examples).

### 1. `InputFile` Node (Single File)

```json
{
  "<node_id>": {
    "key": "<variable.key>",
    "files": ["<file_key>"]
  }
}
```

| Field | Type | Description |
|---|---|---|
| `key` | string | The value of `variable.key` from the node query |
| `files` | array | One or more uploaded file keys |

### 2. `GroupInputFile` Node (Multiple Files)

```json
{
  "<node_id>": {
    "upload": [
      { "key": "<variable.key>", "files": ["<file_key>"], "key_order": 0 },
      { "key": "<variable.key>", "files": ["<file_key>"], "key_order": 1 }
    ]
  }
}
```

| Field | Type | Description |
|---|---|---|
| `upload` | array | Group of file entries, one per repeatable group item |
| `upload[n].key` | string | Parameter key name |
| `upload[n].files` | array | Uploaded file keys for this entry |
| `upload[n].key_order` | integer | Order index of the entry within the group |

### Request Examples

**Example 1 — single `InputFile` node:**

```
POST /api/v1/activity/task-1234567890abcdef/run
X-API-Key: sk_1234567890abcdef
Content-Type: application/json

{
  "node_input": {
    "c40abfc51b4c9613": {
      "key": "input_task1",
      "files": ["default/14062025104759-PYf5KVXGp.pdf"]
    }
  }
}
```

**Example 2 — single `GroupInputFile` node:**

```json
{
  "node_input": {
    "809e61b727fa20d3": {
      "upload": [
        { "key": "input_task2", "files": ["default/14062025104759-PYf5KVXGp.pdf"], "key_order": 0 },
        { "key": "input_task2", "files": ["default/14062025104760-YPf5KVXGp.pdf"], "key_order": 1 }
      ]
    }
  }
}
```

**Example 3 — mixed node types:**

```json
{
  "node_input": {
    "c40abfc51b4c9613": {
      "key": "input_task1",
      "files": ["default/14062025104759-PYf5KVXGp.pdf"]
    },
    "809e61b727fa20d3": {
      "upload": [
        { "key": "input_task2", "files": ["default/14062025104760-YPf5KVXGp.pdf"], "key_order": 0 }
      ]
    }
  }
}
```

### Success Response (200)

```json
{ "data": { "task_id": "...", "run_id": "..." }, "msg": "operation success.", "status": "success", "code": 200 }
```

---

## Cancel Task API

Cancel a running task (optionally one specific run).

```
POST /api/v1/activity/run/cancel
```

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `task_id` | string | Yes | The task to cancel |
| `run_id` | string | No | Cancel only this run; omit to cancel the task's current run |

```json
{ "task_id": "task-1234567890abcdef", "run_id": "613351664936049542" }
```

---

## Query Raw Task Results

Get the raw AI execution results of a task — the per-node output data (extracted fields, generated files, audit mappings).

```
GET /api/v1/activity/{task_id}/results-raw
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `task_id` | string | Yes | The unique identifier of the task |

### Response

`data` is the task's raw `run_result` object — typically `{ "audit": [...], "extract": [...], "generate": [...] }`, one key per agent node family. File references inside it are `file_key`s (paths like `default/xxx.docx`) — convert them to download URLs with the [File Download API](files.md#file-download-api).

Requires permission on the task (API-key requests must own the task's space).

---

## Continue from Manual Node

Agents may contain manual interaction nodes (`label: "InteractionNode"`). When the run reaches one, the task pauses with status `Action Required`, and your integration must supply the requested input to resume it.

### Step 1: Query Manual Node

Get the manual node(s) waiting for input.

```
GET /api/v1/activity/{task_id}/manual/node
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `task_id` | string | Yes | The ID of the task |

### Response Example

```json
{
  "data": [
    {
      "label": "InteractionNode",
      "id": "mrpoc4revise4dd98",
      "title": "Interaction node",
      "input_values": { "input_type": "Text", "key": "1", "files": [], "input_description": "Description of the input", "test_text": "", "option": [], "output": [] },
      "variable": { "input_type": "Text", "key": "1", "input_description": "Description of the input", "test_text": "", "option": [], "output": [], "files": [], "value": {} },
      "status": "action_required",
      "error": "action_required",
      "has_loop": true
    }
  ],
  "msg": "operation success.",
  "status": "success",
  "code": 200
}
```

Key fields:

- `variable.input_type` — one of `Text`, `File upload`, `Select`
- `variable.option` — preset options for `Select` nodes
- `has_loop` — `true` when the node sits inside a loop; you may set `variable.exit_loop = true` to break out of it
- `status` / `error` — `"action_required"` while waiting

### Step 2: Save Node Input

Fill in data according to the node type, then save.

```
POST /api/v1/activity/{task_id}/manual-input/save
```

#### Fill Rules

**1. Text type** — set `variable.test_text`:

```json
{ "node": { "...": "...", "variable": { "input_type": "Text", "test_text": "Your text content here" } } }
```

**2. File upload type** — set `variable.files` to uploaded file keys:

```json
{ "node": { "...": "...", "variable": { "input_type": "File upload", "files": ["file_key_1", "file_key_2"] } } }
```

Files are uploaded the same way as regular input files (see [Files](files.md#file-upload-api)).

**3. Select type** — pick one option from `variable.option` and set `variable.value`:

```json
{ "node": { "...": "...", "variable": { "input_type": "Select", "value": { "value": "09fe611076505fb2f4db55701eebc9ef", "label": "Option A" } } } }
```

(`value.value` = the option's `uid`, `value.label` = the option's `value`.)

**4. Exit loop** (`has_loop = true`) — add `variable.exit_loop = true` to break the loop.

### Step 3: Continue Task Execution

```
POST /api/v1/activity/{task_id}/run/after-action
```

**Method 1 — without parameters** (input already saved in Step 2):

```
POST /api/v1/activity/task-1234567890abcdef/run/after-action
X-API-Key: sk_1234567890abcdef
```

**Method 2 — pass node parameters directly** (skips the save step):

```json
{ "node": [ { "…": "node1 object as above" }, { "…": "node2 object" } ] }
```

Response contains the new `run_id` and `task_id`:

```json
{ "data": { "run_id": "...", "task_id": "..." }, "msg": "operation success.", "status": "success", "code": 200 }
```

> Optional `exict_loop` boolean body field exits the loop (same effect as `variable.exit_loop = true`).
