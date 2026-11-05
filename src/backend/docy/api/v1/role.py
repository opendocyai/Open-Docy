"""Role routes (ported from the old api/v1/role.py, parameter-level compatible;
Redis parts replaced with cache invalidation).
"""

from typing import List

from fastapi import APIRouter, Depends, Path, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession

from docy.cache.cache_utils import delete_key_from_cache
from docy.const import CommonRedisKey
from docy.core._response import pre_response as R
from docy.database import api_async_db
from docy.exceptions import exception as E
from docy.forms.role import RoleCreateForm, RoleMenuAssign, RoleMenuOut, RoleUpdateForm
from docy.models.tb_workspace import MemberType
from docy.schema.role import RoleOptionListSchema, RoleUpdateSchema
from docy.services.auth.utils.security import APIOAuth2PasswordBearer
from docy.services.menu import MenuManager, RoleMenuManager
from docy.services.workspace import RoleManager

oauth2_scheme = APIOAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(tags=["Roles"], prefix="/sys/role")


@router.post("/option/list", summary="Get the role option list (no pagination)")
async def list_role_not_page(
    request: Request,
    space_id: str,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get the role option list (no pagination)."""
    role_manager = RoleManager(db, request=request)

    role_list = await role_manager.get_role_list(
        __or__={
            'space_id': [space_id, None]
        }
    )
    serialize_role_list = RoleOptionListSchema(many=True).dump(role_list)

    return R.format(data=serialize_role_list)


@router.post("/add", summary="Add role")
async def add_role(
    request: Request,
    form_data: RoleCreateForm,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Add a role."""
    role_manager = RoleManager(db, request=request)

    role, exists = await role_manager.get_or_create_role(
        role_type=MemberType.MEMBER,
        **form_data.model_dump(exclude_none=True)
    )
    if exists:
        raise E.RequestError(desc=f"Role name '{form_data.name}' already exists")

    return R.format()


@router.delete("/{role_id}/del", summary="Delete role")
async def delete_role(
    request: Request,
    role_id: str = Path(..., description="Role ID"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Add a role."""
    delete_rows = await RoleManager(db, request=request).delete_roles([role_id])

    return R.format(data={"delete_rows": delete_rows})


@router.put("/{role_id}/update", summary="Update role")
async def update_role(
        request: Request,
        role_id: str,
        form_data: RoleUpdateForm,
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """**Update role<br>**"""
    role_manager = RoleManager(db, request=request)

    role = await role_manager.get_role_by_id(role_id)
    if not role:
        raise E.RequestError(desc=f"Role ID '{role_id}' not found.")

    if form_data.name is not None:
        if not form_data.name:
            raise E.RequestError(desc=f"The role name cannot be empty")
    if await role_manager.dao.count(
            db,
            is_delete=False,
            id__ne=role.id,
            space_id=form_data.space_id,
            name=form_data.name
    ):
        raise E.RequestError(desc=f"Role name '{form_data.name}' already exists")

    await role_manager.update_role(role_id, RoleUpdateSchema(**form_data.model_dump(exclude_none=True)))

    return R.format()


@router.post("/menus", summary="Assign menus to a role")
async def assign_menus_to_role(
    request: Request,
    form_data: RoleMenuAssign,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    menu_manager, role_menu_manager = MenuManager(db, request=request), RoleMenuManager(db, request=request)
    role_id = form_data.role_id
    # Verify the role exists
    role = await RoleManager(db, request=request).get_role_by_id(role_id)
    if not role:
        raise E.ObjectNotFound(f"Role '{role_id}' not found")

    # Verify all menus exist
    if not await menu_manager.menus_all_exists(form_data.menu_ids):
        raise E.RequestError("Invalid menu ID exists")

    # Idempotent write: clear old bindings first, then insert in batch
    await role_menu_manager.clear_role_menu_bind(role_id)

    if form_data.menu_ids:  # at least 1
        # Also include parent menus (menus/directories)
        parent_menu_ids = await menu_manager.get_menu_parent_ids(form_data.menu_ids)

        # Append default menus (support, settings) and external links
        default_menu_ids = await menu_manager.get_menu_default_ids()

        # Append button-level linked menus (task: create task -> market: save my agent)
        # (deprecated; the handler supports multiple when validating permissions)

        full_menu_ids = set(parent_menu_ids + form_data.menu_ids + default_menu_ids)
        await role_menu_manager.role_menu_bind(role_id, list(full_menu_ids))

    # Return the latest role menu list
    current_menu_ids = await menu_manager.get_menu_list_by_role_id(role_id)

    # Invalidate the permission cache after menu binding changes
    # (the old version used redis expire)
    role_perms_key = CommonRedisKey.get_role_perms_key(role_id)
    await delete_key_from_cache(role_perms_key)

    return R.format(data=RoleMenuOut(role_id=role_id, menu_ids=current_menu_ids).model_dump())


@router.get("/{role_id}/menus", summary="Get role menus")
async def get_menus_to_role(
    request: Request,
    role_id: str,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """**Get role menus** <br>
    Only menus and buttons with display status 1 are returned.
    """
    # Verify the role exists
    role = await RoleManager(db, request=request).get_role_by_id(role_id)
    if not role:
        raise E.ObjectNotFound(f"Role '{role_id}' not found")

    # Return the latest role menu list
    current_menu_ids = await MenuManager(db, request=request).get_menu_list_by_role_id(role_id)
    menus = await MenuManager(db, request=request).get_full_tree(type__in=[1, 2], display=1)  # only fetch menus (1) and buttons (2) with display status 1

    # Recursively mark checked
    def mark_checked(nodes: List[dict]) -> None:
        for node in nodes:
            node["checked"] = node.get("id") in current_menu_ids
            if node.get("children"):
                mark_checked(node.get("children"))

    mark_checked(menus)

    return R.format(data=menus)


@router.get("/{role_id}/perms")
async def get_perms(
    request: Request,
    role_id: str = Path(..., description="role id"),
    user_id: str = Query(None, description="User ID"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    """Get the user role menu button permissions."""
    if not user_id:
        user_id = request.user.id if request.user else None

    perms = await RoleManager(db, request=request).get_role_perms(role_id, user_id)
    return R.format(data=perms)
