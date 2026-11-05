from pathlib import Path
import honker

DB_PATH = Path(__file__).parent / "storage" / "honker.db"
DB_PATH.parent.mkdir(parents=True, exist_ok=True)

db = honker.open(str(DB_PATH))

# Queue options apply only on first construction (first-open wins) and must be set
# before task modules are imported. The default queue lease is raised from 300s to 1h:
# jobs like template extraction take ~30s, but a debugger breakpoint pause can keep a
# handler alive far beyond 300s; an expired lease would let another worker re-claim and
# run the job concurrently. The ai queue keeps a short lease (900s) instead - its
# worker fleet heartbeats the running job (see aiexecutor.py / ai_worker.py).
db.queue("default", visibility_timeout_s=3600)

import docy.tasks  # noqa: E402,F401  # triggers @task / @periodic_task registration; must run only once
import docy.core.mq.mq_server  # noqa: E402,F401  # registers the mq consumer tasks and event handlers
import docy.core.aiexecutor  # noqa: E402,F401  # registers the ai execution task (dedicated queue, long visibility timeout)
import docy.services.webhook.tasks  # noqa: E402,F401  # registers the webhook delivery tasks
import docy.services.template.tasks  # noqa: E402,F401  # registers the document template async tasks (extract table fields / write PDF by area)
