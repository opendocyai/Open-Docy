# -*- coding: utf-8 -*-
# @Time    : 2025/11/10 14:58
# @Author  : yanjia
# @File    : custom_node.py
# @Desc    : None
import ast
import inspect
import traceback
from copy import deepcopy
from typing import Any, Dict, List
from pydantic import BaseModel

from fastapi import HTTPException, status

from loguru import logger

from docy.bases.base_manager import BaseManager
from docy import const
from docy.models.tb_agent import CustomNode
from docy.schema.custom_node import CreateCustomComponent, VariableSchema
from docy.crud import custom_node_dao

LOG = logger.bind(module="custom_node")


class CustomNodeManager(BaseManager):

    model = CustomNode
    dao = custom_node_dao

    async def get_custom_node_by_filter(self, **kwargs) -> CustomNode:
        return await self.dao.select_model_by_column(self.db, is_delete=False, **kwargs)

    async def get_custom_node(self, node_id: str, agent_id: str) -> CustomNode:
        return await self.dao.select_model_by_column(self.db, is_delete=False, node_id=node_id, agent_id=agent_id)

    async def get_custom_node_list_by_filter(self, **kwargs) -> List[CustomNode]:
        return await self.dao.select_models(self.db, is_delete=False, **kwargs)

    @staticmethod
    async def check_syntax(code: str):
        """
        Return (valid or not, error info, AST tree).
        """
        try:
            return ast.parse(code)
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=traceback.format_exc(),
            ) from exc

    @staticmethod
    async def validate_imports_and_extract_class_vars(code_str: str, ast_result) -> Dict[str, Dict[str, Any]]:
        """
        1. Execute the top-level statements in the code string (mainly import
           and class definitions)
        2. Verify that all imports succeed
        3. Extract the variable names and *actual values* defined in each class
        4. Extract the functions defined in the class and the variables inside
           them

        Note: this function executes the imports but never calls any function
        or method.
        """
        # Create a clean namespace
        namespace = {
            "__builtins__": __builtins__,  # Allow the use of builtins
            "__name__": "__main__",
        }

        # Execute the code (only top-level statements; class definitions are
        # lazy and do not run __init__)
        exec(code_str, namespace)

        # Collect the results
        result: Dict[Any, Any] = {}

        defined_class_names = set()
        for node in ast_result.body:
            if isinstance(node, ast.ClassDef):
                defined_class_names.add(node.name)
        if not defined_class_names:  # No classes have been defined
            raise Exception("No classes have been defined")

        # Iterate over the namespace to find all classes
        for name, obj in namespace.items():
            if isinstance(obj, type) and obj and name in defined_class_names:  # Only filter user-defined classes
                class_vars: Dict[Any, Any] = {"class_name": name}
                output = obj.__dict__.get("output", None)
                inputs = obj.__dict__.get("inputs", None)

                # Validate that the `socket` fields of inputs and output are
                # compliant
                for i in inputs:
                    if i.socket not in const.CUSTOM_NODE_SUPPORT_SOCKETS:
                        raise Exception(f"The 'socket' field of '{i.socket}' is not supported. \n"
                                        f"Support value: {const.CUSTOM_NODE_SUPPORT_SOCKETS}")
                    if i.multipleConnections not in [True, False]:
                        raise Exception(f"The 'multipleConnections' field of '{i.name}' is not supported. \n"
                                        f"Support value: [True, False]")
                if output.socket not in const.CUSTOM_NODE_SUPPORT_SOCKETS:
                    raise Exception(f"The 'socket' field of '{output.socket}' is not supported. \n"
                                    f"Support value: {const.CUSTOM_NODE_SUPPORT_SOCKETS}")

                is_match_func_name = False  # Whether the function name matches
                # Iterate over the class __dict__ to get directly defined
                # attributes (excluding methods and dunder methods)
                for attr_name, attr_value in obj.__dict__.items():
                    # Skip special attributes
                    if attr_name.startswith("__") or attr_name.startswith("_"):
                        continue
                    # Parse functions or methods (classmethod/staticmethod)
                    if callable(attr_value) or isinstance(attr_value, (staticmethod, classmethod)):
                        # Check whether it is an async function; async functions
                        # are not supported yet
                        if inspect.iscoroutinefunction(attr_value):
                            raise Exception(f"Asynchronous functions '{attr_name}' are not supported for the time being, use 'def {attr_name}' instead.")
                        # Check that the function name matches the method in
                        # output
                        if output:
                            if attr_name == output.method:
                                is_match_func_name = True
                    else:
                        # Keep plain variables (constants, lists, dicts, etc.)
                        if isinstance(attr_value, List):
                            value_list = []
                            input_name_set = set()
                            for value in attr_value:
                                if isinstance(value, BaseModel):  # Check whether the values in the list are pydantic models
                                    input_name_set.add(value.name)
                                    value_list.append(value.model_dump())
                                else:
                                    value_list.append(value)
                            if len(input_name_set) < len(attr_value):  # Duplicate names exist in inputs
                                raise Exception(f"There is data with duplicate value of 'name' in '{attr_name}': {input_name_set}")
                            class_vars[attr_name] = value_list

                        elif isinstance(attr_value, BaseModel):  # Check whether the field value is a pydantic model
                            class_vars[attr_name] = attr_value.model_dump()
                        else:
                            class_vars[attr_name] = attr_value
                if not is_match_func_name:
                    raise Exception(
                        f"The name of the method defined in 'output' does not match the name of the method defined by 'def': , output.method '{output.method if output else None}'"
                    )
                result = class_vars
                break  # Only take one user-defined class

        return result

    async def delete_custom_nodes(self, custom_node_ids: List[str]):
        # Bulk logical-delete custom nodes
        return await self.dao.delete_model_by_column(
            self.db,
            allow_multiple=True,
            logical_deletion=True,
            deleted_flag_column="is_delete",
            deleted_at_column="delete_at",
            flush=True,
            is_delete=False,
            id__in=custom_node_ids
        )

    async def save_or_update_node(
            self,
            node: CreateCustomComponent,
            required_variables=None,
            code_result_variables=None
    ):
        """
        Save or update the custom node code.
        """
        if code_result_variables is None:
            code_result_variables = []
        required_variable_dict = {r_variable.name: r_variable for r_variable in required_variables}
        update_variables = []
        if code_result_variables:
            for code_variable in code_result_variables:
                if required_variables:
                    for  r_variable in required_variables:
                        if r_variable.name == code_variable.get("name"):
                            code_variable.update(r_variable.model_dump())
                update_variables.append(code_variable)

        custom_node = await self.get_custom_node(node.node_id, node.agent_id)
        if not custom_node:
            node.variables = [VariableSchema(**v) for v in update_variables]
            return await self.dao.create_model(self.db, node, flush=True)
        else:
            exists_variables = custom_node.variables
            if exists_variables:
                if update_variables:
                    for result_variable in update_variables:
                        for exists_variable in exists_variables:
                            if result_variable.get("name") == exists_variable.get("name"):
                                if not required_variables:
                                    result_variable.update(exists_variable)
                                else:
                                    if not required_variable_dict.get(result_variable.get("name")):
                                        result_variable.update(exists_variable)

            node.variables = [VariableSchema(**v) for v in update_variables]
            await self.dao.update_model(
                self.db,
                custom_node.id,
                node,
                flush=True
            )
            return custom_node

    async def add_custom_nodes(
            self,
            agent_id: str,
            custom_nodes: List[Dict],
            source_agent_id: str = None,
            market_id: str = None
    ):
        """
        Add custom nodes.

        Added according to the nodes in template_json.
        """
        for custom_node in custom_nodes:
            custom_node_instance = await self.get_custom_node_by_filter(
                node_id=custom_node["id"],
                agent_id=source_agent_id,
                market_id=None  # Unpublished node
            )  # Find the old custom node
            if custom_node_instance:
                # Handle the value fields in variables separately and set them
                # to empty
                new_variables = []
                if custom_node_instance.variables:
                    for variable in custom_node_instance.variables:
                        new_variable = deepcopy(variable)
                        if new_variable.get("value"):
                            new_variable["value"] = ""
                        new_variables.append(new_variable)

                await self.dao.create_model(self.db,
                    CreateCustomComponent(
                        node_id=custom_node["id"],
                        agent_id=agent_id,
                        code=custom_node_instance.code,
                        description=custom_node_instance.description,
                        display_name=custom_node_instance.display_name,
                        extra=custom_node_instance.extra,
                        is_extract=custom_node_instance.is_extract,
                        name=custom_node_instance.name,
                        variables=new_variables,
                        market_id=market_id
                    ), flush=True
                )
