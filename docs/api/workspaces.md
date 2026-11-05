# Workspaces

Workspaces (spaces) group agents and tasks and provide access control. Every user gets a **personal space** on first login. The open-source edition supports personal workspaces only — team-space creation is rejected (see [Create Workspace](#create-workspace)), and the member list endpoint remains for existing team memberships.

The workspace endpoints are authenticated with a **bearer token** (they are used by the web UI and CLI; API keys act as a user, so `X-API-Key` requests work the same way). All responses use the standard [response envelope](overview.md#response-envelope).

---

## List Workspaces

Workspaces the current user is a member of.

```
GET /api/v1/space/
```

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_id` | string | No | Target user; defaults to the authenticated user |

### Request Example

```
GET /api/v1/space/
Authorization: Bearer <access_token>
```

### Response

`data` is an object with two keys — `personal_workspace` and `team_workspace` — each an array of workspace objects (id, name, space type, description, timestamps).

---

## List Owned Workspaces

Workspaces owned by the current user.

```
GET /api/v1/space/owned-space
```

`data` is a flat array of workspace objects the user owns.

---

## Workspace Detail

```
GET /api/v1/space/{space_id}
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_id` | string | Yes | The workspace ID |

Returns the workspace object plus the current user's member role in it. Unknown IDs return the error envelope with `code: 400` (`ObjectNotFound`).

---

## Create Workspace

```
POST /api/v1/space/add
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "My Space",
  "description": "Personal workspace",
  "space_type": "personal"
}
```

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Space name (1–64 chars, non-blank) |
| `description` | string | No | Description (max 500 chars) |
| `user_id` | string | No | Owner; defaults to the authenticated user |
| `space_type` | string | No | Space type; only `personal` is supported — `team` (the default) is rejected |

Returns the created workspace in `data`.

> The open-source edition supports personal workspaces only. Team-space creation is rejected with an error, and a user may create at most one personal workspace (normally created automatically at registration).

---

## Update Workspace

```
PUT /api/v1/space/{space_id}
```

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | New name (1–64 chars) |
| `avatar` | string | No | Avatar reference |
| `description` | string | No | Description (max 500 chars) |

Returns the updated workspace.

---

## Delete Workspace

```
DELETE /api/v1/space/{space_id}
```

Deletes a workspace. **Personal spaces cannot be deleted** — the endpoint rejects them with an error (`Personal workspace cannot be deleted`). Only team spaces (legacy data, since team creation is disabled) are deletable, returning `{ "delete_rows": <n> }` in `data`.

---

## List Members

Paginated member list of a workspace.

```
GET /api/v1/space/member/list?space_id=<space_id>&pageNumber=1&pageSize=10
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_id` | string | Yes | Workspace ID |
| `pageNumber` / `pageSize` | integer | No | Pagination |

`data` is a paginated object — `{ "count": …, "results": [ … ] }` — each member entry carrying the user info, role and member type.

---

## Notes

- Space IDs are long numeric strings (e.g. `570915088920222209`) — copy them from the list endpoint or the web UI.
- If `space_id` is omitted when creating a task, the task goes to the current user's personal space — see [Tasks](tasks.md#create-task-api).
- Membership changes (role updates, removals) are recorded in the [audit trail](audit.md) under the space's hash chain.
