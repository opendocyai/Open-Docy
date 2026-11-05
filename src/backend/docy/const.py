"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/12
Last Modified: 2025/6/12
Last Editor:
Filename: constants
Description: project-wide constants
"""

import enum
# Mapping of project database tables
_TB_IMPORT_REGISTRY = {
      "agent":           ("docy.models.tb_agent",                      "Agent"),
      "marketplace":     ("docy.models.tb_agent",                "Marketplace"),
      "association":     ("docy.models.tb_agent",            "NodeAssociation"),
	  "task":            ("docy.models.tb_activity",            "ActivityTask"),
	  "ttask":           ("docy.models.tb_activity",           "TemporaryTask"),
	  "user":            ("docy.models.tb_auth",                        "User"),
	  "tenant":          ("docy.models.tb_auth",                      "Tenant"),
      "knowledge":       ("docy.models.tb_knowledge",              "Knowledge"),
      "knowledge_task":  ("docy.models.tb_knowledge",          "KnowledgeTask"),
	  "message":         ("docy.models.tb_message",             "InnerMessage"),
	  "payment_method":  ("docy.models.tb_payment",            "PaymentMethod"),
	  "product":         ("docy.models.tb_payment",                  "Product"),
	  "price":           ("docy.models.tb_payment",                    "Price"),
      "subscription":    ("docy.models.tb_payment",         "SubscriptionPlan"),
      "transaction":     ("docy.models.tb_payment",              "Transaction"),
      "wallet":          ("docy.models.tb_payment",                   "Wallet"),
      "wallet_item":     ("docy.models.tb_payment",               "WalletItem"),
	  "wallet_snapshot": ("docy.models.tb_payment",           "WalletSnapshot"),
	  "role":            ("docy.models.tb_role",                     "SysRole"),
	  "setting":         ("docy.models.tb_setting",              "UserSetting"),
      "template":        ("docy.models.tb_template",        "DocumentTemplate"),
	  "webhook":         ("docy.models.tb_webhook",                 "Webhooks"),
      "apikey":          ("docy.models.tb_apikey",                    "APIKey"),
      "space":           ("docy.models.tb_workspace",              "Workspace"),
	  "space_mem":       ("docy.models.tb_workspace",        "WorkspaceMember"),
      "space_inv":       ("docy.models.tb_workspace",        "WorkspaceInvite"),
      "space_bud":       ("docy.models.tb_workspace",        "WorkspaceBudget"),
  }

# Request header variables
HD_USER_ID='USER-ID'
HD_API_KEY="X-API-Key"
HD_AI_API_KEY='AI-API-Key'
HD_AI_SIGNATURE='AI-Signature'

# Constants for the four authorization methods
AT_BEARER_TOKEN = 'BEAR-TOKEN'
AT_BEARER_TOKEN_OAUTH = 'BEAR-TOKEN-OAUTH'
AT_AI_API_KEY = 'AI-API-Key'
AT_USER_API_KEY = 'USER-API-Key'
AT_FAKE = 'AT-FAKE'  # prevents errors in event handling when auth_type is missing


AIAPIKEYID = "618274122962609154"  # fixed API key identifying internal AI calls

LINESPLIT = '\x1e'
G_SEP = '\u241F'   # U+241F
H_SEP = '\x1e'   # U+01E

USER_TOKEN_PREFIX = "USER_ACCESS_TOKEN_"
PRIVATE_WORKSPACE_SUFFIX = "'s Docy AI space"
USER_RESET_DAY_PREFIX = "USER_RESET_DAY"
FREE_PRODUCT_ID = "product_free"
JOB_RESCHEDULE_PREFIX = "JOB_RESCHEDULE_"

# Wallet marker fields
MARK_AGENT = "ag"
MARK_SPACE = "sp"
MARK_USER = "us"
MARK_TASK = "ta"
MARK_MARKETPLACE = "mp"

# Wallet-related constants
SUBSCRIPTION_DESCRIPTION = "{amount} Credits gifted through membership."
SPECIAL_PROMOTION_DESCRIPTION = "{amount} Credits gifted through special promotion."
MEMBER_CREDIT_EXPIRED_DESCRIPTION = "{amount} Credits from membership gift expired."
SPECIAL_CREDIT_EXPIRED_DESCRIPTION = "{amount} Credits from special promotion expired."
CREDIT_DEDUCTION_DESCRIPTION = '{amount} {coin_type} deducted for running the agent "<ag{agent_id}ag>".'
CREDIT_DEDUCTION_DESCRIPTION_KNOWLEDGE_TASK = '{amount} {coin_type} deducted for creating knowledge base.'
CREDIT_DEDUCTION_DESCRIPTION_POLICY_TASK = '{amount} {coin_type} deducted for extracting policy rule.'
TASK_FINISHED_DESCRIPTION = '{amount} {coin_type} deducted for running the task "<ta{task_id}ta>".'
DEBT_DESCRIPTION = "{amount} {coin_type} in debt."
DEBT_AGENT_DESCRIPTION = '{amount} {coin_type} in debt for running the agent "<ag{agent_id}ag>".'
DEBT_TASK_DESCRIPTION = '{amount} {coin_type} in debt for running the task "<ta{task_id}ta>".'
DEBT_KNOWLEDGE_TASK_DESCRIPTION = "{amount} {coin_type} in debt for creating knowledge base."
DEBT_POLICY_TASK_DESCRIPTION = "{amount} {coin_type} in debt for extracting policy rule."
REVENUE_SHARE_DESCRIPTION = "{amount} {coin_type} erned from agent(agent name:<ag{agent_id}ag>) witch published on marketplace."
DEBET_SETTLED_DESCRIPTION = "The {amount} {coin_type} debt has been settled in full."
EXCHANGE_DESCRIPTION = "Exchange {agent_token_count} agent token to {credit_count} credit."
BONUS_DESCRIPTION = "An additional {amount} {coin_type} has been issued to you by the system."


# Event types used in message push notifications
TASK_STATUS_CHANGED = "task_status_changed"
TASK_FINISHED = "task_finished"
NODE_FINISHED = "node_finished"
NODE_CHANGED = "node_changed"
EXTRACTOR_FINISHED = "extractor_finished"
TASK_LOG = "task_log"
TASK_RUN_START = "task_run_start"
AGENT_OPTION_ABORTED = "agent_option_aborted"
AFTER_PURCHASE = "after_purchase"  # added: push a message after a successful purchase
SERVICE_RESTART = "service_close"  # added: push a message after service restart
SERVICE_START = "service_start"  # added: push a message after service startup

# object_type
USER = "user"
TASK = "task"

# blob category
BLOB_CATEGORY_DEFAULT = "default"
BLOB_CATEGORY_KNOWLEDGE = "knowledge"

# Node labels defined by the frontend
DATA_EXTRACTOR = "DataExtractor"
GROUP_DATA_EXTRACTOR = "GroupDataExtractor"
EXTRACT_SIGNATURE = "ExtractSignature"
INPUT_FILE = "InputFile"
INPUT_FILE_RE = 'GroupInputFile'
INTERACTION_NODE = "InteractionNode"
LOOP_OUTPUT="InteractionNode-loop-output"
KNOWLEDGENODE = 'KnowledgeNode'
DOC_TEMPLATE_NODE = 'DocumentTemplateNode'
CUSTOM_NODE = 'CustomComponent'
COMPLIANCE_POLICY = 'CompliancePolicy'
DOCUMENT_TEMPLATE_NODE = 'DocumentTemplateNode'

CUSTOM_NODE_SUPPORT_SOCKETS = [
    "file",
    "field",
    "field-file",
    "boolean",
    "loop",
    "any",
    "group-file"
]

class UsageScene(enum.Enum):
    """
    Scenarios that consume credits.
    """
    TASK_RUN = "task_run"  # consumed when running a task/agent
    MARKETPLACE_INVOCATION = "marketplace_invocation"  # consumed when a user runs a marketplace agent
    # More scenarios to be added
    KNOWLEDGE = "knowledge"  # consumed when creating/updating a knowledge base
    POLICY = "policy"  # consumed when creating/updating a policy


class NodeEnum(enum.Enum):
    """
    All node types defined by the frontend.
    """

    INPUT = "InputFile"
    EXTRACTOR = "DataExtractor"
    SIGNATURE = "ExtractSignature"
    AUDITGLOBAL = "AuditNodeGlobal"
    AUDITFIELD = "AuditNodeField"
    CONDITIONAL = "ConditionalNode"
    INTERACTION = "InteractionNode"
    KNOWLEDGE = "KnowledgeNode"
    DOCUMENTTEMPLATE = "DocumentTemplateNode"
    WEBSEARCH = "WebSearch"
    CONTENTGENERATOR = "ContentGeneratorNode"
    CUSTOM_NODE = 'CustomComponent'
    COMPLIANCE_POLICY = 'CompliancePolicy'
    COMPLIANCE_POLICY_VERSION = 'CompliancePolicyVersion'


class ExtractorType(enum.StrEnum):
    """Data extraction types."""

    PROFILE_SCAN = "profile_scan"
    AREA = "area"
    # Key in the extracted data
    AUTO_SCAN = "auto_scan"
    MANUAL_INPUT = "manual_input"


class ExtractorField(enum.StrEnum):
    FIELD_NAME = "field_name"
    FIELD_DESCRIPTION = "field_description"
    SIGNER_NAME = "signer_name"
    SIGNER_ROLE = "signer_role"


class SSEEventTypeEnum(enum.StrEnum):
    bot_message_push = "message_push"  # bot message push
    knowledge_upload_finished = "knowledge_upload_finished"  # knowledge base upload finished
    knowledge_upload_failed = "knowledge_upload_failed"  # knowledge base upload failed
    knowledge_crawled_finished = "knowledge_crawled_finished"  # knowledge base crawl finished
    knowledge_crawled_failed = "knowledge_crawled_failed"  # knowledge base crawl failed
    template_extract_finished = "template_extract_finished"  # template table extraction finished
    template_extract_failed = "template_extract_failed"  # template table extraction failed
    template_convert_finished = "template_convert_finished"  # template format conversion succeeded
    template_status_changed = "template_status_changed"  # template status changed
    workflow_chat_message = "workflow_chat_message"  # chat message
    workflow_chat_message_error = "workflow_chat_message_error"  # chat error message
    workflow_chat_agent_updated = "workflow_chat_agent_updated"  # agent updated

    policy_rules_extract_finished = "policy_rules_extract_finished"  # knowledge base rule extraction succeeded
    policy_rules_extract_failed = "policy_rules_extract_failed"  # knowledge base rule extraction failed

    # Object types
    object_user = "user"
    object_space = "space"


class MqEventTypeEnum(enum.StrEnum):

    message_reply = "chatdocy.message.reply"  # chat message reply
    message_error = "chatdocy.message.error"  # chat message error
    agent_updated = "chatdocy.agent.updated"  # chat message agent update


class CommonRedisKey:
    bot_message_content_key = "bot_message_content:"
    user_setting_key = "user_setting:"
    role_perms_key = "role_perms:"
    user_check_role = "user_check_role:"
    oauth_session_key = "oauth:session:"
    oauth_authorize_code_key = "oauth:authorize_code:"
    oauth_token_key = "oauth:token:"

    user_setting_key_expired = 60 * 60 * 24  # 1-day expiry
    role_perms_key_expired = 60 * 60 * 24  # 1-day expiry
    oauth_session_key_expired = 60 * 60 * 24  # 1-day expiry
    oauth_authorize_code_key_expired = 10 * 60  # 10-minute expiry
    bot_message_content_key_expired = 60 * 60  # 1h expiry for the workflow chat shard buffer

    @classmethod
    def get_bot_message_content_key(cls, param):
        return f"{cls.bot_message_content_key}{param}"

    @classmethod
    def get_user_setting_key(cls, param):
        return f"{cls.user_setting_key}{param}"

    @classmethod
    def get_role_perms_key(cls, param):
        return f"{cls.role_perms_key}{param}"

    @classmethod
    def get_user_check_role_key(cls, param):
        return f"{cls.user_check_role}{param}"

    @classmethod
    def get_user_auth_session_key(cls, param):
        return f"{cls.oauth_session_key}{param}"

    @classmethod
    def get_oauth_authorize_code_key(cls, param):
        return f"{cls.oauth_authorize_code_key}{param}"

    @classmethod
    def get_oauth_token_key(cls, param):
        return f"{cls.oauth_token_key}{param}"

# notified message
MESSAGE_DICT = {
    "AGENT_PUBLISH": {
        "TITLE": "Agent Published",
        "CONTENT": "<p>Your Agent is now live on the Marketplace. Other users can discover and use your template.</p>",
    },
    "MANUAL_ACTION_REQUIRED": {
        "TITLE": "Manual Action Required",
        "CONTENT": "<p>Your task requires manual input to continue. Please review and provide the necessary details.</p><a href='{task_link}' target='_self'> Review & Continue</a>",
    },
    "TASK_FAILED": {
        "TITLE": "Task Failed",
        "CONTENT": "<p>The AI Agent was unable to complete the task: <strong>{task_title}</strong>.<br/>Reason: {failure_reason}</p><a href='{task_link}' target='_self'> Review Task</a>",
    },
    "TASK_COMPLETED": {
        "TITLE": "Task Completed",
        "CONTENT": "<p>Your AI Agent has successfully completed the task: <strong>{task_title}</strong>.</p><a href='{task_link}' target='_self'> View Results</a>",
    },
    "NEW_MEMBER_JOINED": {
        "TITLE": "New Member Joined",
        "CONTENT": "<p>{fullname} has joined your workspace. Start collaborating on tasks together.</p>",
    },
    "WORKSPACE_CREATED": {
        "TITLE": "Workspace Created",
        "CONTENT": "<p>Your workspace has been created successfully. Invite team members to start collaborating.</p>",
    },
    "IMPORT_COMPLETE": {
        "TITLE": "Import Complete",
        "CONTENT": "<p>Your data has been successfully imported. You can now use the Agent to query the knowledge base.</p>",
    },
     "AGENT_FROZEN": {
        "TITLE": "Your Agents Are Frozen",
        "CONTENT": "<p>You are currently on the Free plan, which allows only 1 active agent. <br/>All agents have been temporarily frozen. <br/>Please choose one agent to unfreeze. Any frozen agents will retain their settings and history.</p>",
    },
}

null = None
