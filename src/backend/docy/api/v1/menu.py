"""Menu routes (ported from the old api/v1/menu.py, parameter-level compatible)."""

from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession

from docy.core._response import pre_response as R
from docy.crud.decorator import write_check_role_cache
from docy.database import api_async_db
from docy.exceptions import exception as E
from docy.schema.menu import CreateMenuParam, UpdateMenuParam
from docy.services.auth.utils.security import APIOAuth2PasswordBearer
from docy.services.menu import MenuManager
from docy.services.workspace.member import MemberManager

oauth2_scheme = APIOAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(tags=["Menu"], prefix="/sys/menu")


@router.get("/sidebar", summary="Get the user role menu sidebar")
@write_check_role_cache()
async def get_user_sidebar(
    request: Request,
    role_id: str = Query(..., min_length=1, description="Role ID"),
    space_id: str = Query(..., min_length=1, description="Workspace ID"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    menu = await MenuManager(db, request=request).get_sidebar(role_id)

    # Update the member's workspace selection time
    await MemberManager(db, request=request).update_member_last_active_at(space_id, role_id, request.user.id)

    return R.format(data=menu)


@router.get('/tree', summary='Get the user role menu tree')
@write_check_role_cache()
async def get_menu_tree(
    request: Request,  # required, used by the decorator
    role_id: str = Query(..., min_length=1, description="Role ID"),
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    menu = await MenuManager(db, request=request).get_tree(role_id)
    return R.format(data=menu)


@router.get('/{menu_id}', summary='Get menu detail')
async def get_menu(
    request: Request,
    menu_id: str,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    menu = await MenuManager(db, request=request).get_menu_detail(menu_id)
    return R.format(data=menu)


@router.post('/add', summary='Create menu')
async def create_menu(
    request: Request,
    obj: CreateMenuParam,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    await MenuManager(db, request=request).create(obj=obj)
    return R.format()


@router.put('/{menu_id}', summary='Update menu')
async def update_menu(
        request: Request,
        menu_id: str,
        obj: UpdateMenuParam,
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    count = await MenuManager(db, request=request).update(pk=menu_id, obj=obj)
    if count > 0:
        return R.format()
    return E.InternalServerError()


@router.delete('/{menu_id}', summary='Delete menu',)
async def delete_menu(
    request: Request,
    menu_id: str,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(api_async_db),
):
    count = await MenuManager(db, request=request).delete(pk=menu_id)
    if count > 0:
        return R.format()
    return E.InternalServerError()
