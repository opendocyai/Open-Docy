"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/8/27
Last Modified: 2025/8/27
Last Editor:
Filename: graph_validation
Description: 
"""
import math
import functools
from typing import Dict
from collections import defaultdict, deque
from loguru import logger

LOG = logger.bind(category="graph_validation")


# find the nodes on the same path as run_node
def find_connected_path(nodes, node_id):
    # build a uniq_id -> node map first for easy lookup
    id_map = {n["uniq_id"]: n for n in nodes}

    visited = set()
    stack = [node_id]
    while stack:
        curr = stack.pop()
        if curr not in visited and curr in id_map:
            visited.add(curr)
            # predecessor nodes
            for prev in id_map[curr]["previous"]:
                if prev not in visited:
                    stack.append(prev)
    return sorted(visited)


def sort_nodes_by_flow(edges, node_ids):
    """
    edges: [{'source': '...', 'target': '...'}, ...]
    node_ids: list of node IDs to sort by their order relationship
    return: sorted node_ids (a new list)
    """
    # 1) build the graph
    adj = defaultdict(set)
    indeg = defaultdict(int)
    all_nodes = set()
    for e in edges:
        s, t = e.get('source'), e.get('target')
        if not s or not t or s == t:
            continue
        if t not in adj[s]:
            adj[s].add(t)
            indeg[t] += 1
        all_nodes.add(s)
        all_nodes.add(t)

    # 2) try a topological sort on the whole graph (Kahn)
    q = deque([n for n in all_nodes if indeg.get(n, 0) == 0])
    topo = []
    indeg_copy = dict(indeg)  # copy to avoid mutating the original indeg
    while q:
        n = q.popleft()
        topo.append(n)
        for m in adj.get(n, []):
            indeg_copy[m] = indeg_copy.get(m, 0) - 1
            if indeg_copy[m] == 0:
                q.append(m)

    # 3) no cycle: sort node_ids by topological order
    #    (keep the original order within the same rank)
    orig_index = {nid: i for i, nid in enumerate(node_ids)}
    if len(topo) == len(all_nodes):
        rank = {n: i for i, n in enumerate(topo)}
        return sorted(node_ids, key=lambda x: (rank.get(x, math.inf), orig_index[x]))

    # 4) cycle exists: stable sort by "reachability"
    #    (A comes before B iff A->...->B is reachable)
    def reachable(a, b):
        if a == b:
            return True
        seen = set()
        stack = [a]
        while stack:
            x = stack.pop()
            for y in adj.get(x, []):
                if y == b:
                    return True
                if y not in seen:
                    seen.add(y)
                    stack.append(y)
        return False

    def cmp(a, b):
        if reachable(a, b) and not reachable(b, a):
            return -1  # a comes before b
        if reachable(b, a) and not reachable(a, b):
            return 1  # b comes before a
        # incomparable or mutually reachable (same strongly connected component):
        # keep the input relative order
        return -1 if orig_index[a] < orig_index[b] else (1 if orig_index[a] > orig_index[b] else 0)

    return sorted(node_ids, key=functools.cmp_to_key(cmp))


def process_graph_json(graph_json: Dict, run_node: str, run_type: str) -> Dict:
    final_graph_nodes = []
    nodes = graph_json.get("nodes", [])
    connections = graph_json.get("connections", [])
    for node in nodes:
        # check if this is a condition node
        variable = node.get("variable", {})
        condition_output = variable.get("output", [])
        if len(condition_output) > 0:
            type = "CONDITION"
        else:
            type = "STEP"
        # find the true and false next nodes of the condition node
        true_next = [output.get("id", "") for output in condition_output if
                     output.get("flag", False) is True or output.get("flag", False) == "true"]
        false_next = [output.get("id", "") for output in condition_output if
                      output.get("flag", False) is False or output.get("flag", False) == "false"]

        # find the upstream and downstream nodes from the connections
        id = node.get("id", "")
        previous = []
        nexts = []
        for connection in connections:
            if connection.get("source", "") == id:
                nexts.append(connection.get("target", ""))
            if connection.get("target", "") == id:
                previous.append(connection.get("source", ""))

        # check if the node is locked; locked nodes do not run
        lock = node.get("lock", False)
        if lock is True or lock == "true" or lock == "True":
            lock = True
        else:
            lock = False

        # assemble
        graph_nodes = {
            "lock": lock,
            "input_values": node.get("input_values", {}),
            "output_values": node.get("output_values", {}),
            "uniq_id": node.get("id", ""),
            "uid": node.get("uid", ""),
            "type": type,
            "label": node.get("label", ""),
            "name": node.get("title", ""),
            "description": "",
            "tool": "",
            "previous": previous,
            "nexts": nexts,
            "true_next": true_next,
            "false_next": false_next,
            "value": variable,
        }
        final_graph_nodes.append(graph_nodes)

    # find the nodes on the same path as run_node
    if run_type == "step":
        run_node_path = find_connected_path(final_graph_nodes, run_node)
        final_graph_nodes = [node for node in final_graph_nodes if node.get("uniq_id") in run_node_path]
        # rebuild previous/nexts from the nodes on the unified path
        for f_id in range(len(final_graph_nodes)):
            final_graph_node = final_graph_nodes[f_id]
            previous = final_graph_node.get("previous", [])
            nexts = final_graph_node.get("nexts", [])
            previous = [p for p in previous if p in run_node_path]
            nexts = [n for n in nexts if n in run_node_path]
            final_graph_nodes[f_id]["previous"] = previous
            final_graph_nodes[f_id]["nexts"] = nexts
        # sort all nodes in order
        final_graph_nodes_ids = [node.get("uniq_id", "") for node in final_graph_nodes]
        connections_flite_cycle = [c for c in connections if "loop" not in c.get("sourceOutput", "")]
        sorted_node_ids = sort_nodes_by_flow(connections_flite_cycle, final_graph_nodes_ids)
        final_graph_nodes_sorted = []
        for s_id in sorted_node_ids:
            for f_node in final_graph_nodes:
                if f_node.get("uniq_id", "") == s_id:
                    final_graph_nodes_sorted.append(f_node)
                    break
        # check whether the unique path contains a condition node
        condition_nodes_in_path = [id for id in range(len(final_graph_nodes_sorted)) if
                                   final_graph_nodes_sorted[id].get("type") == "CONDITION"]
        if len(condition_nodes_in_path) > 0:
            # if so, take the last one
            condition_node_id = condition_nodes_in_path[-1]
            if condition_node_id + 1 < len(final_graph_nodes_sorted):
                final_graph_nodes_sorted = final_graph_nodes_sorted[condition_node_id + 1:]
        return final_graph_nodes_sorted
    else:
        return final_graph_nodes


def init_component(current_node, except_input):
    uniq_id = current_node['uniq_id']
    name = current_node['name']
    uid = current_node.get("uid", "")
    previous_uniq_id = current_node['previous']
    value = current_node['value']

    def format_error(msg):
        return f'{name} #{uid} - {msg}'

    print(f"verify_graph uniq_id: {uniq_id}, name: {name}")
    error = f""
    if "data extractor" in name.lower():
        if len(previous_uniq_id) == 0:
            error = format_error(f"No input data.")
        else:
            extracted_fields = value.get("auto_scan", []) + value.get("area", []) + value.get("manual_input", [])
            if len(extracted_fields) > 0:  # if there are variables
                extracted_fields_filtered = [f for f in extracted_fields if f.get("field_name", "")]
                if len(extracted_fields_filtered) == 0:
                    error = format_error(f"Field name not entered.")
            else:
                error = format_error(f"No variables to extract.")
    elif "extract sign" in name.lower():
        if len(previous_uniq_id) == 0:
            error = format_error(f"No input data.")
        else:
            extracted_fields = value.get("auto_scan", []) + value.get("area", []) + value.get("manual_input", [])
            if len(extracted_fields) > 0:  # if there are variables
                extracted_fields_filtered = [f for f in extracted_fields if
                                             f.get("signer_role", "") or f.get("signer_name", "")]
                if len(extracted_fields_filtered) == 0:
                    error = format_error(f"Signer role and Signer name not entered.")
            else:
                error = format_error(f"No variables to extract.")
    elif "input file" in name.lower() and not except_input:
        file_path = []
        key = []
        if 'upload' in value:
            file_items = value['upload']
            for item in file_items:
                if str(item.get("required_type", "optional")).lower() != "optional":
                    i_key = item.get('key')
                    if i_key:
                        key.append(i_key)
                    i_file = item.get("files")
                    if i_file:
                        file_path.append(1)
        else:
            if str(value.get("required_type", "optional")).lower() != "optional":
                i_file = value.get("files")
                if i_file:
                    file_path.append(1)
                i_key = value.get('key')
                if i_key:
                    key.append(i_key)

        if len(file_path) != len(key):
            error = format_error(f"File path or key not entered.")

    elif "audit node" in name.lower():
        mode = value.get("mode")
        settings = value.get("setting", [])
        full_output_rules = value.get("full_output_rule", "")
        if len(previous_uniq_id) == 0:
            error = format_error(f"No input data.")
        else:
            if mode and mode.lower().replace(" ", "") == "field-level":
                if len(settings) == 0:
                    error = format_error(f"No variables to audit.")
                else:
                    settings_filtered = [s for s in settings if s.get("field_name", [])]
                    if len(settings_filtered) == 0:
                        error = format_error(f"Field not entered.")
            else:
                if len(full_output_rules) == 0:
                    error = format_error(f"Custom rules not entered.")
    elif "web search" in name.lower():
        extracted_fields = value
        if len(extracted_fields) > 0:  # if there are variables
            url = extracted_fields.get("url", "")
            input_value = extracted_fields.get("input_value", [])
            if url is None or url == "":
                error = format_error(f"URL not entered.")
            else:
                if len(input_value) == 0:
                    error = format_error(f"Input value not entered.")
                else:
                    input_value_filtered = [i for i in input_value if i.get("field_name", "")]
                    if len(input_value_filtered) == 0:
                        error = format_error(f"Input value not entered.")
        else:
            error = format_error(f"No variables to extract.")
    elif "content generator" in name.lower():
        variable = value
        if len(previous_uniq_id) == 0:
            error = format_error(f"No input data.")
        else:
            if len(variable) > 0:  # if there are variables
                if variable.get("input_value", []):
                    pass
                else:
                    error = format_error(f"No input value.")
            else:
                error = format_error(f"No variables.")
    elif "interaction node" in name.lower():
        pass
    elif "document template" in name.lower():
        variable = value
        if len(previous_uniq_id) == 0:
            error = format_error(f"No input data.")
        else:
            template_name = variable.get("template_name", "")
            field_mapping = variable.get("field_mapping", [])
            if len(template_name) == 0:
                error = format_error(f"Template name not entered.")
            elif len(field_mapping) == 0:
                error = format_error(f"Field mapping not entered.")
            else:
                field_mapping_filtered = [f for f in field_mapping if
                                          f.get("template_field", "") and f.get("extractor_field", "")]
                if len(field_mapping_filtered) == 0:
                    error = format_error(f"Template field or Extractor field not entered.")
    elif "knowledge" in name.lower():
        extracted_fields = value
        if len(extracted_fields) > 0 and len(extracted_fields.get("knowledge", {})) > 0 and len(
                extracted_fields.get("input_value", {})) > 0:  # if there are variables
            input_value = extracted_fields.get("input_value", [])
            input_value_filtered = [i for i in input_value if i.get("field_name", "")]
            if len(input_value_filtered) == 0:
                error = format_error(f"Field name not entered.")
        else:
            error = format_error(f"No variables to extract.")
    elif "conditional node" in name.lower():
        input_value_condition = value.get("input_value_condition", [])
        if len(previous_uniq_id) == 0:
            error = format_error(f"No input data.")
        else:
            if len(input_value_condition) > 0:
                input_value_condition_filtered = [i for i in input_value_condition if i.get("key", "")]
                if len(input_value_condition_filtered) == 0:
                    error = format_error(f"Field not entered.")
            else:
                error = format_error(f"No variables to condition.")
    elif "compliance policy" in name.lower():
        # validation for the newly added policy node
        policy_id = value.get('policy_id')
        policy_version = value.get('policy_version')
        if not all([policy_id, policy_version]):
            error = format_error(f"Compliance policy ID or version not entered.")
    result = {
        "error": error,
        "id": uid,
        "name": name,
    }
    LOG.info(f'varify result:{result}')
    return result


def verify_graph(template, run_type, run_node=None, except_input=True):
    graphs = process_graph_json(template, run_node, run_type)
    verify_result = []
    for graph in graphs:
        verify_result.append(init_component(graph, except_input))
    errors = [e['error'] for e in verify_result if e['error']]
    msg = ''
    if errors:
        msg = "Validation failed. Please fix the following nodes before saving or running:<br/>"
        msg += '<br/>'.join(errors)
    return msg


if __name__ == "__main__":
    test_data = {}
    verify_result = verify_graph(test_data.get("body", {}))
    print(f"verify_result: {verify_result}")  # list[dict]
