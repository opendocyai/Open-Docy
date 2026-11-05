"""Tree structure building helpers (ported from the legacy utils/tree.py)."""

from typing import Any, Sequence

from docy.utils.enums import BuildTreeType
from docy.utils.serializers import RowData, select_list_serialize


def get_tree_nodes(row: Sequence[RowData], excludes: list[str] = None) -> list[dict[str, Any]]:
    """
    Get all tree structure nodes.

    :param row: raw data row sequence
    :param excludes: fields to exclude
    :return:
    """
    tree_nodes = select_list_serialize(row, excludes)
    tree_nodes.sort(key=lambda x: x['sort'])
    return tree_nodes


def traversal_to_tree(nodes: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """
    Build the tree structure with the traversal algorithm.

    :param nodes: tree node list
    :return:
    """
    tree: list[dict[str, Any]] = []
    node_dict = {node['id']: node for node in nodes}

    for node in nodes:
        parent_id = node['parent_id']
        if parent_id is None:
            tree.append(node)
        else:
            parent_node = node_dict.get(parent_id)
            if parent_node is not None:
                if 'children' not in parent_node:
                    parent_node['children'] = []
                if node not in parent_node['children']:
                    parent_node['children'].append(node)
            else:
                if node not in tree:
                    tree.append(node)

    return tree


def recursive_to_tree(nodes: list[dict[str, Any]], *, parent_id: int | None = None) -> list[dict[str, Any]]:
    """
    Build the tree structure with the recursive algorithm (has a larger performance impact).

    :param nodes: tree node list
    :param parent_id: parent node ID; None means the root node by default
    :return:
    """
    tree: list[dict[str, Any]] = []
    for node in nodes:
        if node['parent_id'] == parent_id:
            child_nodes = recursive_to_tree(nodes, parent_id=node['id'])
            if child_nodes:
                node['children'] = child_nodes
            tree.append(node)
    return tree


def get_tree_data(
    row: Sequence[RowData], build_type: BuildTreeType = BuildTreeType.traversal, *, parent_id: int | None = None
) -> list[dict[str, Any]]:
    """
    Get the tree structure data.

    :param row: raw data row sequence
    :param build_type: algorithm used to build the tree; traversal by default
    :param parent_id: parent node ID, only used by the recursive algorithm
    :return:
    """
    nodes = get_tree_nodes(row, excludes=["delete_at", "is_delete", "created_at", "update_at", "component", "cache"])
    match build_type:
        case BuildTreeType.traversal:
            tree = traversal_to_tree(nodes)
        case BuildTreeType.recursive:
            tree = recursive_to_tree(nodes, parent_id=parent_id)
        case _:
            raise ValueError(f'Invalid algorithm type: {build_type}')
    return tree


def get_menu_tree_data(row: Sequence[RowData]) -> list[dict[str, Any]]:
    """
    Get the menu tree structure data.

    :param row: raw data row sequence
    :return:
    """
    meta_keys = {'title', 'icon', 'link', 'cache', 'display', 'status'}
    exclude_keys = {'component', 'delete_at', 'is_delete', 'created_at', 'update_at'}

    menu_nodes = [
        {
            **{k: v for k, v in node.items() if k not in meta_keys and k not in exclude_keys},
            'meta': {
                'title': node['title'],
                'icon': node['icon'],
                'iframeSrc': node['link'] if node['type'] == 3 else '',
                'link': node['link'] if node['type'] == 4 else '',
                'keepAlive': node['cache'],
                'hideInMenu': not bool(node['display']),
                'menuVisibleWithForbidden': not bool(node['status']),
            },
        }
        for node in get_tree_nodes(row)
    ]

    return traversal_to_tree(menu_nodes)
