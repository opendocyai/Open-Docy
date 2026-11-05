"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/7/18
Last Modified: 2025/7/18
Last Editor:
Filename: graph
Description: build a graph from JSON and provide node lookup.
"""

import json
import copy
from collections import defaultdict, deque

from docy import const


class GraphProcessor:
    def __init__(self, json_str:  str | dict):
        self.node_map = {}
        self.config = json.loads(json_str) if isinstance(json_str, str) else json_str
        self.graph = defaultdict(list)
        self.reverse_graph = defaultdict(list)
        self.get_node_map()
        self.build_graph()

    def add_edge(self, u, v):
        """Add a directed edge u->v."""
        self.graph[u].append(v)
        self.reverse_graph[v].append(u)

    def get_node_map(self):
        self.node_map = {}
        nodes = self.config["nodes"]
        for node in nodes:
            self.node_map[node["id"]] = node

    def build_graph(self):
        connections = self.config["connections"]
        # build the graph from the connections
        for connection in connections:
            self.add_edge(connection["source"], connection["target"])

    def find_n_step_predecessors(self, target, n=1, direction=0):
        """
        Find the N-step predecessors of the target node.

        :param target: target node
        :param n: number of steps (must be >= 1)
        :param direction: direction, 0 for predecessors, 1 for successors
        :return: set of predecessor nodes
        """
        if n < 1:
            raise ValueError()
        visited = set()
        queue = deque([(target, 0)])
        predecessors = set()

        while queue:
            node, step = queue.popleft()
            if step == n:
                predecessors.add(node)
                continue

            for neighbor in self.get_predecessors(node, direction):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, step + 1))
        return predecessors

    def find_neighboring_node(self, target, direction, label=None):
        nodes = []
        predecessors = self.find_n_step_predecessors(target, direction=direction)
        for node_id in predecessors:
            node = self.node_map.get(node_id)
            if node:
                if label:
                    if node["label"] == label:
                        nodes.append(node)
                else:
                    nodes.append(node)
        return nodes

    def get_predecessors(self, node, direction):
        """Get the direct predecessor nodes (implementation depends on the actual graph structure)."""
        # Example implementation: assumes a reverse adjacency list has been built.
        graph = self.reverse_graph if direction else self.graph
        return [k for k, v in graph.items() if node in v]

    def find_all_node_predecessors(self, n=1):
        data = {}
        for node_id in self.node_map.keys():
            predecessors = self.find_n_step_predecessors(node_id, n=n)
            data[node_id] = [self.node_map.get(pre) for pre in predecessors]
        return data

    def find_node_in_path(self, target_id: str, forward=0):
        """
        Find all nodes on the path before the specified node.
        """
        predecessors = set()
        visited = set()
        queue = deque([target_id])
        if forward == 0:
            graph_node = self.reverse_graph
        else:
            graph_node = self.graph
        while queue:
            node = queue.popleft()
            for neighbor in graph_node.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    predecessors.add(neighbor)
                    queue.append(neighbor)
        return predecessors | {target_id}

    def filter_node_by_output(self, scope_nodes=None):
        """
        Find the set of node IDs that have output among the given nodes.
        """
        output_nodes = set()
        if not scope_nodes:
            scope_nodes = list(self.node_map.keys())
        for node_id in scope_nodes:
            node = self.node_map.get(node_id)
            if node:
                outputs = node.get("output_values")
                if outputs:
                    output_nodes.add(node_id)
        return output_nodes

    def get_node_by_scope_nodes(self, scope_nodes=None):
        data = []
        for node_id in scope_nodes:
            node = self.node_map.get(node_id)
            if node:
                data.append(node)
        return data

    def get_node_by_node_id(self, node_id):
        return self.node_map.get(node_id)

    
    def get_manual_node(self, node_ids:list):
        nodes = []
        for node_id in node_ids:
            node = self.get_node_by_node_id(node_id)
            node['has_loop'] = False
            for connection in self.config["connections"]:
                if connection["sourceOutput"] == const.LOOP_OUTPUT and connection["source"] == node_id:
                    node['has_loop'] = True
            nodes.append(node)
        return nodes


    def replace_node(self, node_id, node_dict):
        index = None
        for index, node in enumerate(self.config["nodes"]):
            if node_id == node["id"]:
                break
        if index:
            self.config["nodes"][index] = node_dict
        self.get_node_map()
        return self.config

    def get_input_nodes(
            self,
    ) -> list:
        data = []
        for node_id, item in self.node_map.items():
            node = self.node_map.get(node_id)
            if not node:
                continue
            if node["label"] in [const.INPUT_FILE, const.INPUT_FILE_RE]:
                data.append(node)
        return data

    def get_custom_nodes(self, label: str = const.CUSTOM_NODE)->list:
        node_list = []
        for node_id, item in self.node_map.items():
            node = self.node_map.get(node_id)
            if not node:
                continue
            if node["label"] == label:
                node_list.append(node)
        return node_list

    def get_template_nodes(self,)->list:
        nodes = []
        template_files = []
        for node_id, item in self.node_map.items():
            node = self.node_map.get(node_id)
            if not node:
                continue
            if node["label"] in [const.DOC_TEMPLATE_NODE]:
                nodes.append(node)
                template_files.append(node.get("variable").get("template_name"))

        return {'nodes':nodes, 'template_files':template_files}

    def get_knowlage_nodes(self,)->list:
        nodes = []
        store_ids = []
        for node_id, item in self.node_map.items():
            node = self.node_map.get(node_id)
            if not node:
                continue
            if node["label"] in [const.KNOWLEDGENODE]:
                nodes.append(node)
                store_ids.append(node.get("variable",{}).get("knowledge",{}).get("vector_store_id"))
        return {'nodes':nodes, 'store_ids':store_ids}

    def replace_template_nodes(self, transfer_map):
        if transfer_map:
            for node_id, item in self.node_map.items():
                variable = item.get("variable", {})
                input_values = item.get("input_values", {})
                if item['label'] in [const.DOC_TEMPLATE_NODE]:
                    # replace template_name
                    if variable.get('template_name'):
                        variable['template_name'] = transfer_map.get(variable['template_name'], variable['template_name'])
                    if input_values.get("template_name"):
                        input_values["template_name"] = transfer_map.get(input_values["template_name"], input_values["template_name"])
                    self.replace_node(item['id'], item)
        return self.config

    def replace_knowlage_nodes(self, knowledge_map):
        if knowledge_map:
            for node, item in self.node_map.items():
                variable = node.get("variable", {})
                input_values = node.get("input_values", {})
                if item['label'] in [const.KNOWLEDGENODE]:
                    # replace vector_store_id
                    vector_store_id = variable.get('knowledge',{}).get('vector_store_id')
                    if vector_store_id:
                        knowledge = knowledge_map.get(vector_store_id, variable['knowledge'])
                        if knowledge:
                            variable['knowledge'] = knowledge_map.get(vector_store_id, variable['knowledge'])
                            input_values["knowledge"] = knowledge_map.get(vector_store_id, variable['knowledge'])
                    self.replace_node(item['id'], item)
        return self.config

    def valid_input_node(self) -> bool:
        """
        Validate that the key parameters required in the JSON are present.
        """
        input_nodes = self.get_input_nodes()
        for node in input_nodes:
            variable = node.get("variable")
            if not variable:
                return False
            if not variable.get("key") or not variable.get("files"):
                return False
        return True

    def get_nodes_by_class(self, target_class):
        data = {}
        for target in target_class:
            target = target.value
            if target not in data:
                data[target] = []
            for node_id, item in self.node_map.items():
                node = self.node_map.get(node_id)
                if node and node["label"] == target:
                    data[target].append(node)
        return data

    def get_cleaned_temple(self, publish=False) -> dict:
        """
        Remove redundant input/output parameters from the agent template to get a clean JSON template.
        """
        new_template = copy.deepcopy(self.config)
        # iterate over all nodes and remove redundant inputs and parameters
        for node in new_template["nodes"]:
            # 1. remove output_values from all nodes
            # 2. remove the input files from input and manual nodes
            node["output_values"] = {}
            if node["label"] in [const.INTERACTION_NODE, const.INPUT_FILE]:
                variable = node.get("variable", {})
                if variable and "files" in variable.keys():
                    variable["files"] = []
                input_values = node.get("input_values", {})
                if input_values and "files" in input_values.keys():
                    input_values["files"] = []
                    input_values.pop("files_map", None)
            elif node["label"] == const.INPUT_FILE_RE:
                input_values = node.get("input_values", {})
                if input_values and "files" in input_values.keys():
                    input_values["files"] = []
                    input_values.pop("files_map", None)
                variable = node.get("variable", {}).get("upload", [])
                for v in variable:
                    if v and "files" in v.keys():
                        v["files"] = []
            if node["label"] in [const.DATA_EXTRACTOR, const.GROUP_DATA_EXTRACTOR]:
                input_values = node.get("input_values", {})
                if input_values:
                    node["input_values"] = {}
            if publish and node["label"] in [const.NodeEnum.KNOWLEDGE.value, const.NodeEnum.DOCUMENTTEMPLATE.value]:
                variable = node.get("variable")
                if variable:
                    node["variable"] = {}
                input_values = node.get("input_values", {})
                if input_values:
                    node["input_values"] = {}
        return new_template

    def marketing_research_state(self):
        """
        Customized requirement: count which knowledge bases are used by which nodes.
        """
        knowledge_map = {}
        for node in self.config["nodes"]:
            variable = node.get("variable", {})
            label = node.get("label", "")
            if label in [
                "CustomComponentMarketingResearchPOC1",
                "CustomComponentMarketingResearchPOC2",
                "CustomComponentMarketingResearchPOC3",
                "CustomComponentMarketingResearchPOC4",
                "CustomComponentMarketingResearchPOC5"
            ]:
                knowledge_info = variable.get("knowledge_person", {}) or variable.get("knowledge_ppt_template", {})
                knowledge_id = knowledge_info.get("knowledge_id", "")
                if knowledge_id:
                    if knowledge_id not in knowledge_map:
                        knowledge_map[knowledge_id] = [node['id']]
                    else:
                        knowledge_map[knowledge_id].append(node['id'])
        return knowledge_map

    @classmethod
    def diff(cls, before_config: dict | None, after_config: dict) -> dict:
        """Compare two versions of template_json to find the changes. None means a new template."""
        if before_config is None:
            after_config = after_config or {}
            return {
                "nodes": {
                    "added": after_config.get("nodes", []) or [],
                    "removed": [],
                    "updated": [],
                },
                "connections": {
                    "added": after_config.get("connections", []) or [],
                    "removed": [],
                },
            }
        return cls(before_config).get_diff(cls(after_config))

    def get_diff(self, after: "GraphProcessor"):
        """Compare two versions of the JSON to find the changes."""
        before_nodes = self.config.get("nodes", []) or []
        after_nodes = after.config.get("nodes", []) or []
        before_conns = self.config.get("connections", []) or []
        after_conns = after.config.get("connections", []) or []

        return {
            "nodes": self._compare_nodes(before_nodes, after_nodes),
            "connections": self._compare_connections(before_conns, after_conns),
        }

    def _compare_nodes(self, before_nodes: list, after_nodes: list) -> dict:
        before_map = {n["id"]: n for n in before_nodes if "id" in n}
        after_map = {n["id"]: n for n in after_nodes if "id" in n}

        before_ids = set(before_map.keys())
        after_ids = set(after_map.keys())

        added = [after_map[nid] for nid in (after_ids - before_ids)]
        removed = [before_map[nid] for nid in (before_ids - after_ids)]
        updated = []

        for nid in (before_ids & after_ids):
            changes = self._deep_diff(before_map[nid], after_map[nid])
            if changes:
                updated.append({"id": nid, "changes": changes})

        return {"added": added, "removed": removed, "updated": updated}

    def _compare_connections(self, before_conns: list, after_conns: list) -> dict:
        before_map = {c["id"]: c for c in before_conns if "id" in c}
        after_map = {c["id"]: c for c in after_conns if "id" in c}

        before_ids = set(before_map.keys())
        after_ids = set(after_map.keys())

        added = [after_map[cid] for cid in (after_ids - before_ids)]
        removed = [before_map[cid] for cid in (before_ids - after_ids)]

        return {"added": added, "removed": removed}

    def _deep_diff(self, before: dict, after: dict) -> dict:
        """Recursively compare two dicts and return before/after for changed fields."""
        changes = {}
        all_keys = set(before.keys()) | set(after.keys())
        for key in all_keys:
            old_val = before.get(key)
            new_val = after.get(key)
            if isinstance(old_val, dict) and isinstance(new_val, dict):
                nested = self._deep_diff(old_val, new_val)
                if nested:
                    changes[key] = nested
            elif old_val != new_val:
                changes[key] = {"before": old_val, "after": new_val}
        return changes


if __name__ == "__main__":
    false = False
    true = True
    data = {
        "name": "name1",
        "description": "description1",
        "space_id": "space1",
        "run_type": "task",
        "run_info": {
            "run_node": "",
            "code": "code1",
            "task_id": "task_id1",
            "run_id": "run_id1",
            "user_id": "user_id1",
        },
        "template_json": {
            "nodes": [
                {
                    "inputs": {
                        "InputFile-input": {
                            "id": "89d273022130069e",
                            "label": "InputFile-input",
                            "socket": {"name": "default"},
                        }
                    },
                    "outputs": {
                        "InputFile-output": {
                            "id": "1832c3321c130be4",
                            "label": "InputFile-output",
                            "socket": {"name": "default"},
                        }
                    },
                    "controls": {},
                    "label": "InputFile",
                    "id": "c60303b4538973b4",
                    "position": {"x": 73, "y": 147},
                    "title": "Input file",
                    "selected": false,
                    "input_values": {
                        "files": ["audit/ec_log-xcdtyMlPrXyIGwsv.png"],
                        "key": "test_agent",
                    },
                    "variable": {
                        "files": ["audit/ec_log-xcdtyMlPrXyIGwsv.png"],
                        "key": "test_agent",
                    },
                    "width": 346,
                    "height": 281,
                },
                {
                    "inputs": {
                        "DataExtractor-input": {
                            "id": "b6762cbbf16ba2a4",
                            "label": "DataExtractor-input",
                            "socket": {"name": "default"},
                        }
                    },
                    "outputs": {
                        "DataExtractor-output": {
                            "id": "189f2d6b8b0ab6f5",
                            "label": "DataExtractor-output",
                            "socket": {"name": "default"},
                        }
                    },
                    "controls": {},
                    "label": "DataExtractor",
                    "id": "c7f2f277bf131cbc",
                    "title": "Data extractor",
                    "position": {"x": 597, "y": 153},
                    "width": 346,
                    "height": 244,
                    "selected": false,
                },
                {
                    "inputs": {
                        "AuditNode-input": {
                            "id": "8cf0733d4f7034ae",
                            "label": "AuditNode-input",
                            "socket": {"name": "default"},
                        }
                    },
                    "outputs": {
                        "AuditNode-output": {
                            "id": "f98961c8d4dbd10a",
                            "label": "AuditNode-output",
                            "socket": {"name": "default"},
                        }
                    },
                    "controls": {},
                    "label": "AuditNode",
                    "id": "bbe59907b188ee43",
                    "title": "Audit node",
                    "position": {"x": 1016.3235787227557, "y": 247.83752476756598},
                    "width": 346,
                    "height": 359,
                    "selected": false,
                    "input_values": {
                        "mode": "Field-Level",
                        "setting": [{"isCollapse": false}],
                        "full_output_rule": "",
                        "add_to_final_export": false,
                    },
                    "variable": {
                        "mode": "Field-Level",
                        "setting": [{"isCollapse": false}],
                        "full_output_rule": "",
                        "add_to_final_export": false,
                    },
                },
                {
                    "inputs": {
                        "KnowledgeNode-input": {
                            "id": "49efe499b28a43c2",
                            "label": "KnowledgeNode-input",
                            "socket": {"name": "default"},
                        }
                    },
                    "outputs": {},
                    "controls": {},
                    "label": "KnowledgeNode",
                    "id": "af643c1e69d2ac75",
                    "title": "Knowledge node",
                    "position": {"x": 2155.0450236068064, "y": 662.7563948089563},
                    "width": 346,
                    "height": 375,
                    "selected": false,
                },
                {
                    "inputs": {
                        "ConditionalNode-input": {
                            "id": "6467eba9aaf7e072",
                            "label": "ConditionalNode-input",
                            "socket": {"name": "default"},
                        }
                    },
                    "outputs": {
                        "ConditionalNode-output-true": {
                            "id": "2384cac9362c35c0",
                            "label": "ConditionalNode-output-true",
                            "socket": {"name": "default"},
                        },
                        "ConditionalNode-output-false": {
                            "id": "d3d4cc99fc4e6ca5",
                            "label": "ConditionalNode-output-false",
                            "socket": {"name": "default"},
                        },
                    },
                    "controls": {},
                    "label": "ConditionalNode",
                    "id": "7ba8550e2a51a810",
                    "title": "Conditional node",
                    "position": {"x": 1482.4722695237226, "y": 409.26512860033074},
                    "width": 524,
                    "height": 477,
                    "selected": false,
                    "input_values": {
                        "input_value_condition": [
                            {
                                "key": "undefined",
                                "expression": "undefined",
                                "value": "undefined",
                            }
                        ],
                        "output": [
                            {"id": "2384cac9362c35c0", "flag": true},
                            {"id": "d3d4cc99fc4e6ca5", "flag": false},
                        ],
                    },
                    "variable": {
                        "input_value_condition": [
                            {
                                "key": "undefined",
                                "expression": "undefined",
                                "value": "undefined",
                            }
                        ],
                        "output": [
                            {"id": "2384cac9362c35c0", "flag": true},
                            {"id": "d3d4cc99fc4e6ca5", "flag": false},
                        ],
                    },
                },
                {
                    "inputs": {
                        "DataExtractor-input": {
                            "id": "7fbe6bf081b280bf",
                            "label": "DataExtractor-input",
                            "socket": {"name": "default"},
                        }
                    },
                    "outputs": {
                        "DataExtractor-output": {
                            "id": "2837edd2022f9303",
                            "label": "DataExtractor-output",
                            "socket": {"name": "default"},
                        }
                    },
                    "controls": {},
                    "label": "DataExtractor",
                    "id": "50e124f0849cfc22",
                    "title": "Data extractor",
                    "position": {"x": 1857.2697554309138, "y": 1167.2014899794417},
                    "width": 346,
                    "height": 244,
                    "selected": false,
                },
                {
                    "inputs": {
                        "AuditNode-input": {
                            "id": "20de25e4b1fd991e",
                            "label": "AuditNode-input",
                            "socket": {"name": "default"},
                        }
                    },
                    "outputs": {
                        "AuditNode-output": {
                            "id": "75c23c36efbe4d46",
                            "label": "AuditNode-output",
                            "socket": {"name": "default"},
                        }
                    },
                    "controls": {},
                    "label": "AuditNode",
                    "id": "404c6b142141d5be",
                    "title": "Audit node",
                    "position": {"x": 1037.8953506125888, "y": 897.7733301783911},
                    "width": 346,
                    "height": 359,
                    "selected": false,
                    "input_values": {
                        "mode": "Field-Level",
                        "setting": [{"isCollapse": false}],
                        "full_output_rule": "",
                        "add_to_final_export": false,
                    },
                    "variable": {
                        "mode": "Field-Level",
                        "setting": [{"isCollapse": false}],
                        "full_output_rule": "",
                        "add_to_final_export": false,
                    },
                },
                {
                    "inputs": {
                        "DataExtractor-input": {
                            "id": "6ec9ec6b1bbe6da7",
                            "label": "DataExtractor-input",
                            "socket": {"name": "default"},
                        }
                    },
                    "outputs": {
                        "DataExtractor-output": {
                            "id": "df5e727237c3a827",
                            "label": "DataExtractor-output",
                            "socket": {"name": "default"},
                        }
                    },
                    "controls": {},
                    "label": "DataExtractor",
                    "id": "5a93735134e88445",
                    "title": "Data extractor",
                    "position": {"x": 2450.189340112563, "y": 1235.0596660315794},
                    "width": 346,
                    "height": 244,
                    "selected": true,
                },
            ],
            "connections": [
                {
                    "id": "c52eece9cda13682",
                    "source": "c60303b4538973b4",
                    "sourceOutput": "InputFile-output",
                    "target": "c7f2f277bf131cbc",
                    "targetInput": "DataExtractor-input",
                },
                {
                    "id": "aa8b94c65aef0c9d",
                    "source": "c7f2f277bf131cbc",
                    "sourceOutput": "DataExtractor-output",
                    "target": "bbe59907b188ee43",
                    "targetInput": "AuditNode-input",
                },
                {
                    "id": "7a07a6fa402ecc12",
                    "source": "bbe59907b188ee43",
                    "sourceOutput": "AuditNode-output",
                    "target": "7ba8550e2a51a810",
                    "targetInput": "ConditionalNode-input",
                },
                {
                    "id": "be0cff2024d27435",
                    "source": "7ba8550e2a51a810",
                    "sourceOutput": "ConditionalNode-output-true",
                    "target": "af643c1e69d2ac75",
                    "targetInput": "KnowledgeNode-input",
                },
                {
                    "id": "af9be18711770a06",
                    "source": "7ba8550e2a51a810",
                    "sourceOutput": "ConditionalNode-output-false",
                    "target": "50e124f0849cfc22",
                    "targetInput": "DataExtractor-input",
                },
                {
                    "id": "cb21ee491ef36b34",
                    "source": "50e124f0849cfc22",
                    "sourceOutput": "DataExtractor-output",
                    "target": "404c6b142141d5be",
                    "targetInput": "AuditNode-input",
                },
                {
                    "id": "3787406382ffa8ed",
                    "source": "404c6b142141d5be",
                    "sourceOutput": "AuditNode-output",
                    "target": "bbe59907b188ee43",
                    "targetInput": "AuditNode-input",
                },
                {
                    "id": "2582d4d4df6af2ca",
                    "source": "50e124f0849cfc22",
                    "sourceOutput": "DataExtractor-output",
                    "target": "5a93735134e88445",
                    "targetInput": "DataExtractor-input",
                },
            ],
            "viewport": {
                "k": 0.3852842747217793,
                "x": -199.13942108154305,
                "y": 79.87093276977542,
            },
        },
    }
    json_str = json.dumps(data["template_json"])
    graph = GraphProcessor(json_str)

    graph.find_n_step_predecessors("bbe59907b188ee43", n=2)

    all_map = graph.find_all_node_predecessors()
    all_nodes_in_path = graph.find_node_in_path("af643c1e69d2ac75")
    all_nodes_in_path2 = graph.find_node_in_path("af643c1e69d2ac75", 1)
    a = 1
