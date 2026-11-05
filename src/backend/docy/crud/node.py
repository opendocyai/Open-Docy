"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/12/11
Last Modified: 2025/12/11
Last Editor:
Filename: node.py
Description: None
"""

from sqlalchemy_crud_plus import CRUDPlus

from docy.models.tb_agent import CustomNode


class CRUDCustomNode(CRUDPlus[CustomNode]):
    pass

custom_node_dao: CRUDCustomNode = CRUDCustomNode(CustomNode)
