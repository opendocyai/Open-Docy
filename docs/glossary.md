# Glossary

Terms used across the documentation and the web UI.

| Term | Meaning |
|---|---|
| **Task** (a.k.a. *activity*) | One execution of an agent: a named job that accepts file inputs, runs the agent's node graph, and exposes results. Created via `POST /api/v1/activity/add` — see [Tasks](api/tasks.md). |
| **Agent** | The reusable workflow definition, composed on a visual canvas from nodes. Referenced by `agent_id` when creating tasks — see [Agents](api/agents.md). |
| **Agent OS** | The layer that builds, runs and governs AI agents: a canvas builder to compose them, a runtime that executes them step by step, and a record of what each did and why. Open Docy is the open-source, self-hosted edition of the Docy AI Agent OS. |
| **Workspace** (a.k.a. *space*) | A container grouping agents, tasks and members, with access control. OSE supports personal workspaces only — team-space creation is rejected — see [Workspaces](api/workspaces.md). |
| **Input node** | A node on an agent's canvas that declares an input a task run requires (e.g. `InputFile`, `GroupInputFile`). Query a task's input nodes before running it — see [Running Tasks](api/task-run.md). |
| **Manual node** (*InteractionNode*, HITL) | A node that pauses a run and waits for human input (text, file, or select). The task status becomes `Action Required` until input is saved and the run resumed — see [Running Tasks](api/task-run.md). |
| **Run** (`run_id`) | A single execution attempt of a task. A task can be run multiple times; each run has its own ID and log stream. |
| **Rule** | A per-field check inside audit nodes — equals, contains, greater or less than, before, after. Each rule result shows found, expected and reason, linked to where the value came from. |
| **Webhook** | A registered HTTP endpoint that receives signed task lifecycle events. One endpoint per user — see [Webhooks](api/webhooks.md). |
| **Event push** | The outbound delivery of task events (`task_status_changed`, `node_finished`, `task_finished`) as HMAC-signed POSTs, with automatic retries — see [Event Push](api/event-push.md). |
| **API key** | A user-scoped credential for the REST API, sent in the `X-API-Key` header. Created via `docy api-key create`; shown in full only once — see [Authentication](api/authentication.md). |
| **SSE log stream** | Server-Sent Events stream (`GET /api/v1/activity/log/view`) that pushes a task's execution logs live to the browser. |
| **Audit trail** | The tamper-evident log of business operations: records are hash-chained and HMAC-signed, and chains can be verified online or offline — see [Audit](api/audit.md). |
| **Hash chain** (`chain_id`) | The linked sequence of audit records for one scope (e.g. `<space_id>--agent`). Each record links to its predecessor via `previous_hash`. |
| **AI worker** | The background process that consumes queued tasks and executes agent runs. Spawned and supervised by `docy run`; managed with `docy ai-worker` / `docy stop-ai-worker` / `DOCY_NO_AI_WORKER` — see [Deployment](deployment.md#the-ai-worker-process). |
| **Honker queue** | The built-in lightweight task queue (replacing RabbitMQ/Celery) that tasks and webhook deliveries run on. State lives in `storage/honker.db`. |
| **AI plugin** | The encrypted (pyarmor-obfuscated) agent runtime installed under `src/backend/docy/ai/` via `docy install-ai`. Not open source — see the [README](../README.md#what-this-project-is-not). |
| **Template** | A reusable document-processing definition (field extraction, table extraction, report generation) used by document-automation tasks. Managed in the web UI; its API is UI-internal. |
| **Node** | A building block on an agent's canvas (file input, data extraction, audit rules, conditionals, web search, content generation, document templates, interaction…). The Docy AI platform has 15 node types; Open Docy ships 12 — the knowledge, compliance-policy and custom-component nodes belong to the commercial edition. |
| **Batch / loop** | Repeatable inputs and batch nodes let one agent run process a folder of documents, grouped the way they are uploaded; loops repeat a subgraph per input group. |
| **Edition** | Open Docy (free, self-hosted, personal space, 12 node types, runs on your own server) vs Docy AI (commercial, cloud or on-premise: team spaces and roles, REST API/OAuth/webhooks, knowledge and policy nodes, agents drafted by chat, pre-built agent library) — see the [README](../README.md#open-docy-vs-docy-ai). |
