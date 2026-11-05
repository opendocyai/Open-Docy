"""Agent package export/import (.docy zip archive).

The package is a self-contained zip that captures an agent at full fidelity:
the raw graph JSON (agent.json), custom node rows with secret values blanked
(custom_nodes.json), document template files and metadata (templates/<index>/),
every other storage file referenced from the graph or addition (files/<index>/)
and the logo/preview images (assets/). Importing rebuilds the agent in the
target user's personal workspace, uploading all files and remapping every
storage key reference.
"""
import asyncio
import copy
import io
import json
import re
import shutil
import tempfile
import zipfile
from datetime import datetime, UTC
from pathlib import Path
from uuid import uuid4

from loguru import logger
from sqlalchemy import update

from docy import const
import docy.exceptions.exception as E
from docy.bases.base_manager import BaseManager
from docy.core.storage_drivers import default_s3_client
from docy.crud import custom_node_dao, template_dao
from docy.forms.agent import AgentUpdateForm
from docy.models.tb_agent import Agent, CustomNode
from docy.models.tb_common import FileUpload
from docy.models.tb_template import DocumentTemplate
from docy.models.tb_workspace import WorkspaceType
from docy.schema.custom_node import CreateCustomComponent, VariableSchema
from docy.services.agent.custom_node import CustomNodeManager
from docy.services.agent.manager import AgentManager
from docy.services.common.manager import CommonManager
from docy.services.template.manager import DocumentTemplateManager
from docy.services.workspace.manager import WorkspaceManager
from docy.utils.enums import DocumentTemplateStatusEnum, FileExtEnum, InnerModelEnum
from docy.utils.sql_query import async_retrieve_object
from docy.utils.topology.graph import GraphProcessor
from docy.utils.topology.graph_validation import verify_graph

LOG = logger.bind(module="agent_package")

FORMAT_VERSION = 1
# Whitelisted category segment: storage keys across the whole system use only
# the audit/default/template prefixes; tightening avoids misclassifying free
# text like default/xxx.pdf as a file key.
_STORAGE_KEY_RE = re.compile(r"^(default|audit|template|knowledge|compliance)/.+\.[A-Za-z0-9]{2,10}$")
_INVALID_FILENAME_CHARS = re.compile(r'[\\/:*?"<>|]')
_SIMPLE_CATEGORY_RE = re.compile(r"^[A-Za-z0-9_\-]+$")


def get_sample_dir() -> Path:
    """Default sample directory: shared by the CLI default export directory and the user init import directory"""
    return Path("sample")


def get_sample_package_path() -> Path:
    """Sample package imported at user init: <sample dir>/sample.docy"""
    return get_sample_dir() / "sample.docy"


def _sanitize_filename(name: str) -> str:
    return _INVALID_FILENAME_CHARS.sub("_", name).strip().strip(".") or "agent"


def _ext_of_key(key: str) -> str:
    suffix = Path(key).suffix
    return suffix if suffix else ".bin"


def _template_upload_name(name: str, ext: str) -> str:
    """Upload name with the declared extension forced (template names may end like "v1.2")."""
    suffix = f".{ext.lower()}"
    return name if name.lower().endswith(suffix) else name + suffix


def _category_of_key(key: str) -> str:
    category = key.split("/", 1)[0]
    return category if _SIMPLE_CATEGORY_RE.match(category) else "default"


async def _download_or_raise(key: str) -> bytes:
    data = await asyncio.to_thread(default_s3_client.download_file_to_stream, key)
    if data is None:
        raise E.RequestError(f"Storage file missing for key: {key}")
    return data


async def _try_download(key: str) -> bytes | None:
    """Probe download; returns None when the key does not point to a real file."""
    try:
        return await asyncio.to_thread(default_s3_client.download_file_to_stream, key)
    except Exception:
        return None


MAX_ZIP_ENTRIES = 10_000
MAX_ZIP_TOTAL_UNCOMPRESSED = 1024 * 1024 * 1024
MAX_ZIP_SINGLE_FILE = 200 * 1024 * 1024
ZIP_RATIO_BOMB_SIZE = 10 * 1024 * 1024
ZIP_MAX_COMPRESSION_RATIO = 100


def _safe_extract_zip(zip_bytes: bytes, target_dir: Path) -> None:
    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
        bad = zf.testzip()
        if bad is not None:
            raise E.AgentPackageFormatError(f"Corrupt entry in archive: {bad}")
        infos = zf.infolist()
        if len(infos) > MAX_ZIP_ENTRIES:
            raise E.AgentPackageFormatError(
                f"Archive has too many entries ({len(infos)} > {MAX_ZIP_ENTRIES})."
            )
        total_size = sum(info.file_size for info in infos)
        if total_size > MAX_ZIP_TOTAL_UNCOMPRESSED:
            raise E.AgentPackageFormatError(
                "Archive expands beyond the total uncompressed size limit."
            )
        for info in infos:
            if info.file_size > MAX_ZIP_SINGLE_FILE:
                raise E.AgentPackageFormatError(
                    f"Archive entry too large: {info.filename}."
                )
        archive_size = max(len(zip_bytes), 1)
        if total_size > ZIP_RATIO_BOMB_SIZE and total_size / archive_size > ZIP_MAX_COMPRESSION_RATIO:
            raise E.AgentPackageFormatError(
                "Archive compression ratio is suspicious (possible zip bomb)."
            )
        target_resolved = target_dir.resolve()
        for name in zf.namelist():
            member_path = (target_dir / name).resolve()
            if not member_path.is_relative_to(target_resolved):
                raise E.AgentPackageFormatError(f"Unsafe path in archive: {name}")
        target_dir.mkdir(parents=True, exist_ok=True)
        zf.extractall(target_dir)


def _iter_str_values(value):
    if isinstance(value, dict):
        for item in value.values():
            yield from _iter_str_values(item)
    elif isinstance(value, list):
        for item in value:
            yield from _iter_str_values(item)
    elif isinstance(value, str):
        yield value


def _deep_collect_keys(payload) -> set:
    """Collect strings that look like storage keys from nested dict/list."""
    if not payload:
        return set()
    return {s for s in _iter_str_values(payload) if _STORAGE_KEY_RE.match(s)}


def _deep_remap_keys(value, key_map: dict):
    """In-place replacement of exact storage-key string matches."""
    if not key_map:
        return value
    if isinstance(value, dict):
        for k, item in value.items():
            value[k] = _deep_remap_keys(item, key_map)
    elif isinstance(value, list):
        for i, item in enumerate(value):
            value[i] = _deep_remap_keys(item, key_map)
    elif isinstance(value, str):
        new_key = key_map.get(value)
        if new_key is not None:
            value = new_key
    return value


def _rewrite_template_refs(graph: dict, key_map: dict, id_map: dict) -> None:
    """Rewrite template storage keys and row ids on DocumentTemplateNode nodes.

    Not using GraphProcessor.replace_template_nodes: its internal replace_node
    uses `if index:` which skips the node at list index 0.
    """
    for node in graph.get("nodes", []):
        if node.get("label") != const.DOC_TEMPLATE_NODE:
            continue
        variable = node.get("variable") or {}
        input_values = node.get("input_values") or {}
        for holder in (variable, input_values):
            if holder.get("template_name"):
                holder["template_name"] = key_map.get(
                    holder["template_name"], holder["template_name"]
                )
        if input_values.get("template_id"):
            input_values["template_id"] = id_map.get(
                input_values["template_id"], input_values["template_id"]
            )


def _clean_component_variable_values(graph: dict) -> dict:
    """Blank custom-node component variable values (user-entered secrets)."""
    cleaned = copy.deepcopy(graph)
    for node in cleaned.get("nodes", []):
        for holder in (node.get("input_values") or {},node, ):
            component = holder.get("component")
            if isinstance(component, list):
                for item in component:
                    if isinstance(item, dict) and "value" in item:
                        item["value"] = None
    return cleaned


class AgentPackageManager(BaseManager):
    """Export/import agent packages (.docy zip archives)."""

    async def export_package(self, agent_id: str) -> tuple[bytes, str]:
        agent = await async_retrieve_object(self.db, Agent, o_id=agent_id)
        if not agent:
            raise E.ObjectNotFound(f"Agent not found (id={agent_id})")

        graph_data = _clean_component_variable_values(agent.template_json or {})
        graph = GraphProcessor(graph_data)
        warnings: list[str] = []

        # 1. Templates: collect rows and file bytes, fail-fast on any miss.
        template_keys: set[str] = set()
        template_entries: list[dict] = []
        seen_template_ids: set[str] = set()
        for node in graph.get_template_nodes()["nodes"]:
            template_id = (node.get("input_values") or {}).get("template_id")
            if not template_id:
                template_name = (node.get("variable") or {}).get("template_name")
                row = (
                    await template_dao.select_model_by_column(
                        self.db, is_delete=False, area_file_path=template_name
                    )
                    if template_name
                    else None
                )
                if not row and template_name:
                    row = await template_dao.select_model_by_column(
                        self.db, is_delete=False, file_path=template_name
                    )
            else:
                row = await template_dao.select_model_by_column(
                    self.db, is_delete=False, id=template_id
                )
            if not row:
                raise E.RequestError(
                    f"Template row not found (template_id={template_id})"
                )
            if row.id in seen_template_ids:
                continue
            seen_template_ids.add(row.id)
            original_bytes = await _download_or_raise(row.file_path)
            area_bytes = None
            if row.area_file_path and row.area_file_path != row.file_path:
                area_bytes = await _download_or_raise(row.area_file_path)
            template_keys.add(row.file_path)
            if row.area_file_path:
                template_keys.add(row.area_file_path)
            index = len(template_entries)
            ext = _ext_of_key(row.file_path)
            template_entries.append(
                {
                    "index": index,
                    "meta": {
                        "index": index,
                        "template_id": row.id,
                        "name": row.name,
                        "ext": row.ext.value if hasattr(row.ext, "value") else str(row.ext),
                        "field_dict": copy.deepcopy(row.field_dict or {}),
                        "original_file": f"original{ext}",
                        "area_file": f"area{ext}" if area_bytes is not None else None,
                        "original_key": row.file_path,
                        "area_key": row.area_file_path,
                    },
                    "original_bytes": original_bytes,
                    "area_bytes": area_bytes,
                }
            )

        # 2. Custom nodes: blank variable values (secrets must not leak).
        custom_nodes: list[dict] = []
        node_manager = CustomNodeManager(self.db)
        for node in graph.get_custom_nodes():
            row = await node_manager.get_custom_node(node["id"], agent_id)
            if not row:
                warnings.append(f"Custom node {node['id']} has no saved code; skipped")
                continue
            custom_nodes.append(
                {
                    "node_id": row.node_id,
                    "name": row.name,
                    "display_name": row.display_name,
                    "description": row.description,
                    "code": row.code,
                    "extra": copy.deepcopy(row.extra or {}),
                    "is_extract": bool(row.is_extract),
                    "variables": [
                        {
                            "name": v.get("name"),
                            "value": None,
                            "required": bool(v.get("required", False)),
                        }
                        for v in (row.variables or [])
                    ],
                }
            )

        # 3. Logo / preview images.
        assets: dict[str, tuple[str, bytes]] = {}
        for asset_name, key in (("logo", agent.logo), ("preview", agent.preview_image)):
            if not key:
                continue
            data = await _try_download(key)
            if data is None:
                warnings.append(f"{asset_name} file missing in storage: {key}")
                continue
            assets[asset_name] = (f"assets/{asset_name}{_ext_of_key(key)}", data)

        # 4. Generic file resources: every storage key referenced anywhere in
        #    the full graph or addition, excluding template keys (they are
        #    packed under templates/ and must not be remapped by file_map).
        candidates = _deep_collect_keys(graph_data)
        candidates.update(_deep_collect_keys(agent.addition))
        candidates.difference_update(template_keys)
        file_entries: list[dict] = []
        for index, key in enumerate(sorted(candidates)):
            data = await _try_download(key)
            if data is None:
                warnings.append(f"Referenced file missing in storage: {key}")
                continue
            name = _sanitize_filename(Path(key).name)
            file_entries.append(
                {
                    "key": key,
                    "file": f"files/{index}/{name}",
                    "name": name,
                    "data": data,
                }
            )

        manifest = {
            "format_version": FORMAT_VERSION,
            "exported_at": datetime.now(UTC).isoformat(),
            "source_agent_id": agent.id,
            "name": agent.name or "",
            "description": agent.description,
            "addition": copy.deepcopy(agent.addition or {}),
            "edit_able": bool(agent.edit_able),
            "logo_asset": assets.get("logo", (None, None))[0],
            "preview_asset": assets.get("preview", (None, None))[0],
            "custom_node_count": len(custom_nodes),
            "template_count": len(template_entries),
            "files": [
                {"key": e["key"], "file": e["file"], "name": e["name"]}
                for e in file_entries
            ],
            "warnings": warnings,
        }

        buffer = io.BytesIO()
        with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.writestr("agent.json", json.dumps(graph_data, ensure_ascii=False))
            zf.writestr("manifest.json", json.dumps(manifest, ensure_ascii=False))
            if custom_nodes:
                zf.writestr(
                    "custom_nodes.json", json.dumps(custom_nodes, ensure_ascii=False)
                )
            for entry in template_entries:
                prefix = f"templates/{entry['index']}/"
                zf.writestr(
                    prefix + "meta.json", json.dumps(entry["meta"], ensure_ascii=False)
                )
                zf.writestr(
                    prefix + entry["meta"]["original_file"], entry["original_bytes"]
                )
                if entry["area_bytes"] is not None:
                    zf.writestr(
                        prefix + entry["meta"]["area_file"], entry["area_bytes"]
                    )
            for entry in file_entries:
                zf.writestr(entry["file"], entry["data"])
            for asset_name, (zip_path, data) in assets.items():
                zf.writestr(zip_path, data)
        buffer.seek(0)

        file_name = f"{_sanitize_filename(agent.name or 'agent')}.docy"
        return buffer.getvalue(), file_name

    async def import_package(self, file_bytes: bytes, name: str | None = None) -> dict:
        extract_dir = Path(tempfile.gettempdir()) / f"agent_pkg_{uuid4().hex}"
        tracker: dict = {
            "storage_keys": [],
            "fileupload_ids": [],
            "template_ids": [],
            "custom_node_ids": [],
            "agent_id": None,
        }
        try:
            return await self._import_package(file_bytes, name, extract_dir, tracker)
        except Exception:
            await self._rollback(tracker)
            raise
        finally:
            shutil.rmtree(extract_dir, ignore_errors=True)

    async def _import_package(
        self, file_bytes: bytes, name: str | None, extract_dir: Path, tracker: dict
    ) -> dict:
        _safe_extract_zip(file_bytes, extract_dir)

        def _read_json(rel_path: str):
            path = extract_dir / rel_path
            if not path.exists():
                return None
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)

        manifest = _read_json("manifest.json")
        if not manifest:
            raise E.AgentPackageFormatError("manifest.json missing")
        if manifest.get("format_version") != FORMAT_VERSION:
            raise E.AgentPackageFormatError(
                f"Unsupported format_version: {manifest.get('format_version')}"
            )
        if not manifest.get("name"):
            raise E.AgentPackageFormatError("manifest.json: name is required")

        graph_data = _read_json("agent.json")
        if (
            not graph_data
            or "nodes" not in graph_data
            or "connections" not in graph_data
        ):
            raise E.AgentPackageFormatError("agent.json missing or not a graph")
        try:
            GraphProcessor(graph_data)
        except Exception as exc:
            raise E.AgentPackageFormatError(f"agent.json is not a valid graph: {exc}")

        custom_nodes = _read_json("custom_nodes.json") or []
        for entry in custom_nodes:
            if not entry.get("node_id") or not entry.get("code"):
                raise E.AgentPackageFormatError(
                    "custom_nodes.json: entry requires node_id and code"
                )

        template_metas: list[dict] = []
        templates_dir = extract_dir / "templates"
        if templates_dir.exists():
            for meta_path in sorted(templates_dir.glob("*/meta.json")):
                meta = json.loads(meta_path.read_text(encoding="utf-8"))
                index = meta_path.parent.name
                for field in ("original_file", "area_file"):
                    if meta.get(field) and Path(meta[field]).name != meta[field]:
                        raise E.AgentPackageFormatError(
                            f"templates/{index}/meta.json: unsafe {field}"
                        )
                if not (meta_path.parent / meta["original_file"]).exists():
                    raise E.AgentPackageFormatError(
                        f"templates/{index}: original file missing in package"
                    )
                meta["index"] = index
                template_metas.append(meta)

        extract_resolved = extract_dir.resolve()

        def _safe_package_path(rel_path: str) -> Path:
            path = (extract_dir / rel_path).resolve()
            if not path.is_relative_to(extract_resolved) or not path.is_file():
                raise E.AgentPackageFormatError(
                    f"File missing in package: {rel_path}"
                )
            return path

        for entry in manifest.get("files") or []:
            _safe_package_path(entry["file"])
        for asset_name in ("logo", "preview"):
            asset_path = manifest.get(f"{asset_name}_asset")
            if asset_path:
                _safe_package_path(asset_path)

        space = await WorkspaceManager(
            self.db, request=self.request
        ).get_workspace(
            user_id=self.request.user.id, space_type=WorkspaceType.PERSONAL
        )
        if not space:
            raise E.ObjectNotFound("Personal workspace not found")

        common = CommonManager(self.db, request=self.request)

        async def _upload(file_name: str, category: str, data: bytes) -> str:
            info = await common.pre_signed_url(file_name, category)
            new_key = info["key"]
            await asyncio.to_thread(default_s3_client.upload_file, new_key, data)
            tracker["storage_keys"].append(new_key)
            row = await async_retrieve_object(
                self.db, FileUpload, condition=[FileUpload.file_key == new_key]
            )
            if row:
                tracker["fileupload_ids"].append(row.id)
            return new_key

        # Upload phase: all files first, no agent/template rows created yet.
        key_map: dict = {}
        for meta in template_metas:
            prefix = extract_dir / "templates" / meta["index"]
            original_bytes = (prefix / meta["original_file"]).read_bytes()
            new_original_key = await _upload(
                _template_upload_name(meta["name"], meta["ext"]),
                InnerModelEnum.template.value,
                original_bytes,
            )
            if meta.get("original_key"):
                key_map[meta["original_key"]] = new_original_key
            new_area_key = None
            if meta.get("area_file"):
                area_bytes = (prefix / meta["area_file"]).read_bytes()
                new_area_key = await _upload(
                    _template_upload_name(meta["name"], meta["ext"]),
                    InnerModelEnum.template.value,
                    area_bytes,
                )
                if meta.get("area_key"):
                    key_map[meta["area_key"]] = new_area_key
            meta["_new_original_key"] = new_original_key
            meta["_new_area_key"] = new_area_key

        file_map: dict = {}
        for entry in manifest.get("files") or []:
            data = _safe_package_path(entry["file"]).read_bytes()
            upload_name = entry.get("name") or Path(entry["key"]).name
            new_key = await _upload(
                upload_name, _category_of_key(entry["key"]), data
            )
            file_map[entry["key"]] = new_key

        new_logo_key = None
        new_preview_key = None
        if manifest.get("logo_asset"):
            asset_bytes = _safe_package_path(manifest["logo_asset"]).read_bytes()
            new_logo_key = await _upload(
                f"logo{Path(manifest['logo_asset']).suffix}",
                InnerModelEnum.agent.value,
                asset_bytes,
            )
        if manifest.get("preview_asset"):
            asset_bytes = _safe_package_path(manifest["preview_asset"]).read_bytes()
            new_preview_key = await _upload(
                f"preview{Path(manifest['preview_asset']).suffix}",
                InnerModelEnum.agent.value,
                asset_bytes,
            )

        # Template rows (files are all uploaded by now).
        template_manager = DocumentTemplateManager(self.db, request=self.request)
        id_map: dict = {}
        for meta in template_metas:
            template_id = await template_manager.create_template_record(
                space.id,
                meta["name"],
                FileExtEnum(meta["ext"]),
                meta["_new_original_key"],
                meta.get("field_dict") or {},
            )
            tracker["template_ids"].append(template_id)
            update_data = {"status": DocumentTemplateStatusEnum.active.value}
            if meta["_new_area_key"]:
                update_data["area_file_path"] = meta["_new_area_key"]
            await template_dao.update_model(
                self.db, template_id, update_data, commit=True
            )
            if meta.get("template_id"):
                id_map[meta["template_id"]] = template_id

        # JSON reference updates: file_map first, then template key_map.
        addition = copy.deepcopy(manifest.get("addition") or {})
        _deep_remap_keys(graph_data, file_map)
        _deep_remap_keys(graph_data, key_map)
        _deep_remap_keys(addition, file_map)
        _deep_remap_keys(addition, key_map)
        _rewrite_template_refs(graph_data, key_map, id_map)

        errors = verify_graph(graph_data, "task", except_input=True)
        if errors:
            raise E.AgentPackageFormatError(
                f"Graph validation failed after import: {errors}"
            )

        form = AgentUpdateForm(
            name=name or manifest["name"],
            description=manifest.get("description"),
            space_id=space.id,
            template_json=graph_data,
            addition=addition,
            edit_able=bool(manifest.get("edit_able", True)),
        )
        agent = await AgentManager(
            self.db, request=self.request
        ).add_or_update_agent(agent_id=None, agent=form)
        tracker["agent_id"] = agent.id

        # Custom node rows.
        for entry in custom_nodes:
            node = await custom_node_dao.create_model(
                self.db,
                CreateCustomComponent(
                    node_id=entry["node_id"],
                    agent_id=agent.id,
                    code=entry["code"],
                    name=entry.get("name") or "CustomComponent",
                    display_name=entry.get("display_name"),
                    description=entry.get("description"),
                    extra=entry.get("extra") or {},
                    is_extract=bool(entry.get("is_extract", False)),
                    variables=[
                        VariableSchema(
                            name=v.get("name"),
                            value=None,
                            required=bool(v.get("required", False)),
                        )
                        for v in (entry.get("variables") or [])
                    ],
                    market_id=None,
                ),
                flush=True,
            )
            tracker["custom_node_ids"].append(node.id)
        await self.db.commit()

        # Write back logo/preview storage keys.
        if new_logo_key or new_preview_key:
            if new_logo_key:
                agent.logo = new_logo_key
            if new_preview_key:
                agent.preview_image = new_preview_key
            self.db.add(agent)
            await self.db.commit()

        return {
            "agent_id": agent.id,
            "name": agent.name,
            "template_count": len(template_metas),
            "custom_node_count": len(custom_nodes),
            "file_count": len(manifest.get("files") or []),
            "warnings": manifest.get("warnings") or [],
        }

    async def _rollback(self, tracker: dict) -> None:
        """Best-effort cleanup matching how far the import got."""
        try:
            await self.db.rollback()
        except Exception:
            pass
        for key in tracker["storage_keys"]:
            try:
                await asyncio.to_thread(default_s3_client.delete_file, key)
            except Exception as exc:
                LOG.warning(f"rollback: delete storage key {key} failed: {exc}")
        try:
            now = datetime.now(UTC)
            if tracker["fileupload_ids"]:
                await self.db.execute(
                    update(FileUpload)
                    .where(FileUpload.id.in_(tracker["fileupload_ids"]))
                    .values(is_delete=True, delete_at=now)
                )
            for model, ids in (
                (DocumentTemplate, tracker["template_ids"]),
                (CustomNode, tracker["custom_node_ids"]),
                (Agent, [tracker["agent_id"]] if tracker["agent_id"] else []),
            ):
                if ids:
                    await self.db.execute(
                        update(model)
                        .where(model.id.in_(ids))
                        .values(is_delete=True, delete_at=now)
                    )
            await self.db.commit()
        except Exception as exc:
            LOG.warning(f"rollback: logical delete failed: {exc}")
