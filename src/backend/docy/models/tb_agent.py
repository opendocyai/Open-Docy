"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/16
Last Modified: 2025/6/16
Last Editor:
Filename: tb_agent
Description: tables for the agent module
"""
import enum

from sqlalchemy import (Column, Date, String, Boolean, Text, Enum, Index, Integer)
from docy.bases.base_model import Base
from docy.core.fields import JSONDict, JSONList
from docy.core._string import gen_snowflake_id


class AgentStatus(enum.Enum):
    draft = 'draft'
    active = 'active'
    private = 'private'
    public = 'public'
    # Newly added status
    frozen = 'frozen'


class Agent(Base):
    """
    Agent template
    """
    __tablename__ = 'agent'
    name = Column(String(100))
    description = Column(Text, nullable=True, default=None)
    logo = Column(String(200))  # Agent logo
    space_id = Column(String(64))
    creator_id = Column(String(64))  # Creator ID
    template_json = Column(JSONDict)  # Template config file in JSON format
    preview_image = Column(String(200), nullable=True, default=None)  # Agent thumbnail
    # New flag: whether the agent is editable
    edit_able = Column(Boolean, default=True)
    history_version = Column(JSONList, nullable=True, default=None)  # Agent history versions
    addition = Column(JSONDict, default={})  # Extra info while editing the agent
    published = Column(Boolean, default=False)  # Whether published to the template marketplace
    market_record_id = Column(String(64), nullable=True, default=None)  # Non-empty means copied from the public marketplace
    status = Column(Enum(AgentStatus), nullable=True, default=AgentStatus.draft)  # Agent status
    # New fields
    visible = Column(Boolean, default=True)  # Whether visible in the frontend
    source_agent_id = Column(String(64), nullable=True, default=None)  # Non-empty means copied from another agent


class CustomNode(Base):
    """
    Node table
    """
    __tablename__ = 'custom_node'
    id = Column(String(64), primary_key=True, default=lambda: gen_snowflake_id())
    node_id = Column(String(64), comment="node id")
    agent_id = Column(String(64), comment="agent id")
    market_id = Column(String(64), comment="marketplace id")
    name = Column(String(64), comment="Component name")
    display_name = Column(String(64), comment="Component display name")
    description = Column(Text, nullable=True, comment="Component description")
    code = Column(Text, nullable=True, comment="Node source code")
    extra = Column(JSONDict, nullable=True, comment="Node input/output data")
    variables = Column(JSONList, nullable=True, comment="Node variables")
    is_extract = Column(Boolean, default=False)


class NodeAssociation(Base):
    """
    Records links between special nodes and agents in agent/marketplace
    """
    __tablename__ = 'node_association'
    id = Column(String(64), primary_key=True, default=lambda: gen_snowflake_id())
    object_id = Column(String(64), comment="agent id")
    object_type = Column(Integer, comment="Associated resource type: agent/marketplace")
    node_id = Column(String(64), comment="Node id in the JSON")
    node_type = Column(String(64), comment="Node type: knowledge, template, custom node, policy, etc.")
    knowledge_id = Column(String(64), nullable=True, default=None, comment="Knowledge node id")
    custom_node_id = Column(String(64), nullable=True, default=None, comment="Custom node id")
    policy_id = Column(String(64), nullable=True, default=None, comment="Policy node id")
    template_id = Column(String(64), nullable=True, default=None, comment="Template node id")
    version = Column(String(64), nullable=True, default=None, comment="Version of the selected node, if any")
