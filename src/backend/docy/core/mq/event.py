"""
Message response event definitions.

All event handlers are registered via @decorater.register("on_xxx").
Event-name to handler-name mapping: "." in the event name is replaced with
"_", and prefixed with "on_". E.g. event="task.log" -> on_task_log.

Ported from src/old_backend/core/mq/event.py, differences:
  - Redis removed (OSE): get_mock_request no longer passes redis_client
  - Billing (add_metric/add_metric_extend), email billing, bot/chatdocy,
    knowledge/policy modules are not migrated yet; their events are stubs

Note: exceptions raised by handlers are caught by the dispatch task in
mq_server and handed to honker for retry; after exceeding the retry limit
they go to the dead-letter table (_honker_dead), never silently dropped.
"""
import asyncio

from loguru import logger

from docy.core.mq import decorater
from docy.database import get_async_db_connector
from docy.models.tb_agent import Agent, AgentStatus
from docy.services.activity.manager import ActivityManager
from docy.services.agent.manager import AgentManager
from docy.services.auth.manager import UserManager
from docy.services.auth.utils.user import get_user_model
from docy.services.workspace.manager import WorkspaceManager
from docy.utils import get_mock_request
from docy.utils.sql_query import async_retrieve_object


LOG = logger.bind(category="mq")


# MQ-related events are defined below
@decorater.register("on_demo")
def on_demo(**kwargs):
    print(f"this is a demo message")


@decorater.register("on_async_demo")
async def on_async_demo(**kwargs):
    print(f"Execute async function")
    await asyncio.sleep(1)
    print(f"Async function finished")


@decorater.register("on_audit_result")
def audit_result(**kwargs): ...


# Log-related events
@decorater.register("on_task_log")
async def task_log(**kwargs):
    """
    Push logs while the task is running
    {
        "event":"task.log",
        "run_type": "task",
        "data":{
            "run_info":{
                "code":"xxx",
                "task_id":"xxx",
                "run_id":"xxx",
                "user_id":"xxx"
            },
            "log_info": "xxxxxxxxxxx"
        }
    }
    """
    data = kwargs.get("data")
    run_type = 1 if data.get("run_type") == "task" else 2
    if data:
        async with get_async_db_connector() as db:
            manager = ActivityManager(
                db=db, task_type=run_type, request=get_mock_request()
            )
            await manager.write_log(**kwargs)


@decorater.register("on_task_finish")
async def task_finish(**kwargs):
    """
    Notified here when a task completes.
    Message format:
    {
        "event":"task.finish",
        "data": {
            "run_info":{
                "run_node":"xxx",
                "code":"xxx",
                "task_id":"xxx",
                "run_id":"xxx",
                "user_id":"xxx"
            },
            "usage":{
                "token_count": 0,
                "input_token_count": 0,
                "cost": 0.0,
            },
            "run_type": "task",
            "result":{
                "status": "succeed/failed/action_required",
                "error":"",
                "json":{
                    "nodes": [
                        {"input_values":{}, "output_values":{
                            "files": ["key"]
                        },...}
                        .....
                    ]
                }  # config file passed to the AI
            }
        }
    }
    """
    data = kwargs.get("data")
    run_info = kwargs["data"]["run_info"]
    run_type = 1 if data.get("run_type") == "task" else 2
    if data:
        async with get_async_db_connector() as db:
            user_model = get_user_model()
            user = await async_retrieve_object(
                db, user_model, condition=[user_model.id == run_info["user_id"]]
            )
            manager = ActivityManager(
                db=db, task_type=run_type, request=get_mock_request(user=user)
            )
            await manager.action_task_result(**data)


@decorater.register("on_extract_email")
async def extract_email(**kwargs):
    """
    Extract parameters from the email
    {
        "event":"extract.email",
        "data":{
            "message_id": "xxx",
            "event_id": "xxx",
            "email_params": email_params,
            "attach_file_map": attach_file_map
            "result": result
        }
    }
    """
    LOG.warning(
        "on_extract_email: run_task_by_email_request is not implemented in this project, "
        "event ignored"
    )


@decorater.register("on_node_finalcost")
async def node_finalcost(**kwargs):
    """
    Unified billing for all task runs, including agents and regular tasks
    {
        "cost_type": "email_task",
        "event":"node.finalcost",
        "data":{
            "run_info":{
                "run_node":"xxx",
                "code":"xxx",
                "task_id":"xxx",
                "run_id":"xxx",
                "user_id":"xxx"
                "email": "xxx@qq.com",
                "event_id": "xxx"
            },
            "usage":{
                "token_count": 0,
                "input_token_count": 0,
                "cost": 0.0,
            },
        }
    }
    """
    LOG.warning(
        "on_node_finalcost: billing service (add_metric) is not implemented in this "
        "project, event ignored"
    )


@decorater.register("on_node_finish")
async def node_finish(**kwargs):
    """
    Push data per node
    {
        "event":"node.finish",
        "data": {
            "run_info":{
                "run_node":"xxx",
                "code":"xxx",
                "task_id":"xxx",
                "run_id":"xxx",
                "user_id":"xxx"
            },
            "run_type": "step",
            "result":{
                "status": "succeed/failed/action_required",
                "error":"",
                "json":{
                    "nodes": [
                        {"input_values":{}, "output_values":{
                            "files": ["key"]
                        },...}
                        .....
                    ]
                }  # config file passed to the AI
            }
        }
    }
    """
    event = kwargs["event"]
    run_info = kwargs["data"]["run_info"]
    LOG.info(f"receive message: {event}")
    LOG.info(f"run info: {run_info}")
    data = kwargs.get("data")
    if data:
        async with get_async_db_connector() as db:
            user_model = get_user_model()
            user = await async_retrieve_object(
                db, user_model, condition=[user_model.id == run_info["user_id"]]
            )
            manager = ActivityManager(
                db=db, task_type=2, request=get_mock_request(user=user)
            )
            await manager.action_node_finish(**data)


@decorater.register("on_task_status_update")
async def task_status_update(**kwargs):
    """
    Update the task status
    {
        "event":"task.status.update",
        "run_type": "step",
        "data": {
            "run_info":{
                "run_node":"xxx",
                "code":"xxx",
                "task_id":"xxx",
                "run_id":"xxx",
                "user_id":"xxx"
            },
            "status": the task status to update
        }
    }
    """
    event = kwargs["event"]
    run_info = kwargs["data"]["run_info"]
    LOG.info(f"receive message: {event}")
    LOG.info(f"run info: {run_info}")
    data = kwargs.get("data")
    run_type = 1 if data.get("run_type") == "task" else 2
    if data:
        async with get_async_db_connector() as db:
            user_model = get_user_model()
            user = await async_retrieve_object(
                db, user_model, condition=[user_model.id == run_info["user_id"]]
            )
            manager = ActivityManager(
                db=db, task_type=run_type, request=get_mock_request(user=user)
            )
            await manager.action_update_task_status(**data)


@decorater.register("on_node_start")
async def node_start(**kwargs):
    """
    Report which node starts executing
    {
        "event":"node.start",
        "run_type": "step",
        "notice_mode": "start",
        "data": {
            "run_info":{
                "run_node":"xxx",
                "code":"xxx",
                "task_id":"xxx",
                "run_id":"xxx",
                "user_id":"xxx"
            },
            "current_node":"xxx"
        }
    }
    """
    event = kwargs["event"]
    run_info = kwargs["data"]["run_info"]
    LOG.info(f"receive message: {event}")
    LOG.info(f"run info: {run_info}")
    data = kwargs.get("data")
    run_type = 1 if data.get("run_type") == "task" else 2
    if data:
        data["notice_mode"] = kwargs.get("notice_mode", "start")
        async with get_async_db_connector() as db:
            user_model = get_user_model()
            user = await async_retrieve_object(
                db, user_model, condition=[user_model.id == run_info["user_id"]]
            )
            manager = ActivityManager(
                db=db, task_type=run_type, request=get_mock_request(user=user)
            )
            await manager.action_node_start(**data)


@decorater.register("on_bot_message_reply")
async def bot_message_reply(**kwargs):
    """
    Bot message reply
    {
        "event":"bot.message.reply",
        "data": {
            "function": "chat",
            "user_id": "572606762872478209",
            "session_id": "572606873836984833",
            "message_id": "574677263325338113",
            "inputTranscript": "What can you help me with",
            "status": "completed",    # completed/in_progress
            "outputTranscript": "I can help you...",
            "query_time": "2025-07-14 03:41:42",
            "respond_time": "2025-07-14 03:41:50",
            "timeSpent": 7
        }
    }
    """
    from docy.services.bot.message import BotMessageManager

    event = kwargs["event"]
    LOG.info(f"bot_message_reply receive message: {event}")
    await BotMessageManager().on_bot_message_reply(kwargs["data"])


@decorater.register("on_chatdocy_message_reply")
async def chatdocy_message_reply(**kwargs):
    """
    Chat workflow message reply

    { "event": "chatdocy.message.reply",
      "data": {
        "run_info": { ... }, "timestamp": "2026-08-14T10:24:35.912722+00:00",
        "kind": "text",                  // or "thinking" or "tool"
        "outputTranscript": "Let me first take a look at the cur",   // incremental snippet, concatenated by the frontend
        "is_finished": false
      } }

    """
    from docy.services.bot.message import BotMessageManager

    event = kwargs["event"]
    LOG.info(f"chatdocy_message_reply receive message: {event}")

    await BotMessageManager().handle_chat_message_reply(event, kwargs.get("data", {}))


@decorater.register("on_chatdocy_message_error")
async def chatdocy_message_error(**kwargs):
    """
    Chat workflow message error
    """
    from docy.services.bot.message import BotMessageManager

    event = kwargs["event"]
    LOG.info(f"chatdocy_message_error receive message: {event}")

    await BotMessageManager().handle_chat_message_reply(event, kwargs.get("data", {}))


@decorater.register("on_chatdocy_agent_updated")
async def chatdocy_agent_updated(**kwargs):
    """
    Chat workflow agent update
    """
    from docy.services.bot.message import BotMessageManager

    event = kwargs["event"]
    LOG.info(f"chatdocy_agent_updated receive message: {event}")

    await BotMessageManager().handle_chat_message_reply(event, kwargs.get("data", {}))


@decorater.register("on_extractor_finish")
async def extractor_finish(**kwargs):
    """
    Extractor node task finished
    {
        "event":"extractor.finish",
        "data": {
            "run_info":{
                "run_source":"agent",
                "run_node":"xxx",
                "code":"xxx",
                "extract_run_id":"xxx",
                "user_id":"xxx"
                "extractor_type": "xxx"
            },
            "result":{
                ...
                AI extraction result goes here
                ...
            }
        }
    }
    """
    event = kwargs["event"]
    run_info = kwargs["data"]["run_info"]
    LOG.info(f"receive message: {event}")
    LOG.info(f"run info: {run_info}")
    data = kwargs.get("data")
    async with get_async_db_connector() as db:
        user_model = get_user_model()
        user = await async_retrieve_object(
            db, user_model, condition=[user_model.id == run_info["user_id"]]
        )
        manager = AgentManager(db=db, request=get_mock_request(user=user))
        await manager.action_extractor_finish(**data)


@decorater.register("on_user_init")
async def do_user_init(**kwargs):
    """
    Initialize a user after creation:
      1. Create user settings
      2. Create a personal workspace
      3. Import the sample agent into the personal workspace
         (default sample dir sample/sample.docy)
      4. Send the activation email (when the message contains active_link)

      {
        "event":"user.init",
        "data": {
            "google_login": True,
            "user_id": xxxx,
            "random_name": xxx,
            "email": xxx,
            "active_link": xxxx,
            "user_name": xxxx
        }
    }
    """
    data = kwargs.get("data") or {}
    user_id = data.get("user_id")
    if not user_id:
        LOG.error(f"user.init event missing user_id: {data}")
        return
    async with get_async_db_connector() as db:
        user_model = get_user_model()
        user = await async_retrieve_object(
            db, user_model, condition=[user_model.id == user_id]
        )
        request = get_mock_request(user=user)
        manager = UserManager(db=db, request=request)
        ws_manager = WorkspaceManager(db=db, request=request)
        # 1. Create user settings
        await manager.creaate_user_settings(user_id)
        # 2. Create a personal workspace
        space_id = await ws_manager.create_personal_workspace(
            {
                "user_id": user_id,
                "name": data.get("random_name") or data.get("user_name") or "personal",
                "description": "personal workspace",
            }
        )
        # 3. Import the sample agent into the personal workspace
        #    (from the default sample dir sample/sample.docy)
        if user:
            try:
                from docy.services.agent.agent_package import (
                    AgentPackageManager,
                    get_sample_package_path,
                )

                sample_path = get_sample_package_path()
                if not sample_path.is_file():
                    LOG.warning(f"user.init sample package not found, skip import: {sample_path}")
                else:
                    package_manager = AgentPackageManager(db=db, request=request)
                    file_bytes = await asyncio.to_thread(sample_path.read_bytes)
                    result = await package_manager.import_package(file_bytes)
                    agent = await async_retrieve_object(
                        db, Agent, o_id=result["agent_id"]
                    )
                    if agent:
                        agent.status = AgentStatus.active
                        db.add(agent)
                        await db.commit()
                    LOG.info(
                        f"user.init sample agent import done: user_id={user_id}, "
                        f"agent_id={result.get('agent_id')}"
                    )
            except Exception as e:
                LOG.warning(f"user.init failed to import sample agent: user_id={user_id}, {e}")
        else:
            LOG.warning(f"user.init user not found, skip sample agent import: user_id={user_id}")
    # 4. Send the activation email (blocking call, run in a thread pool)
    LOG.info(f"user.init done: user_id={user_id}")


@decorater.register("on_knowledge_created")
async def on_knowledge_created(**kwargs):
    """
    Receive the Lambda result asynchronously after knowledge-base file validation
    MQ message format:
    {
        "event": "knowledge.created",
        "data": {
            "knowledge_id": "xxx",
            "knowledge_task_id": "xxx",
            "user_id": "xxx",
            "space_id": "xxx",
            "page_model": "xxx",
            "run_id": "xxx",
            "result": {
                "status": "completed/failed",
                "is_pass": true/false,
                "vector_store_id": "xxx",
                "file_ids": ["xxx"],
                "result": {},
                "price": {}
            }
        }
    }
    """
    LOG.warning(
        "on_knowledge_created: KnowledgeManager is not implemented in this project, "
        "event ignored"
    )


@decorater.register("on_policy_rules_extract")
async def on_policy_rules_extract(**kwargs):
    """
    Push the AI rule-extraction result via MQ after the async Lambda call completes
    MQ message format:
    {
        "event": "policy.rules.extract",
        "data": {
            "policy_id": "xxx",
            "version_id": "xxx",
            "user_id": "xxx",
            "run_id": "xxx",
            "result": {
                "rules": [...],
                "status": "success/failed",
            },
            "page_model": "policy",
            "log_id": "log_id"
        }
    }
    """
    LOG.warning(
        "on_policy_rules_extract: PolicyManager is not implemented in this project, "
        "event ignored"
    )


if __name__ == "__main__":
    pass
