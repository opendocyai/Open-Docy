"""API key routes (parameter-level compatible with the old api/v1/api_key.py)."""

from fastapi import APIRouter, Body, Depends, Path, Request
from sqlalchemy.ext.asyncio import AsyncSession

from docy.core._response import pre_response as R
from docy.database import api_async_db
from docy.schema.api_key import ApiKeyRead, UnmaskedApiKeyRead
from docy.services.api_key.manager import ApiKeyManager
from docy.services.auth.utils.security import APIOAuth2PasswordBearer

oauth2_scheme = APIOAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(tags=["APIKey"], prefix="/api_key")


@router.get("/")
async def get_api_key(
        request: Request,
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Get the user's api_key."""
    manager = ApiKeyManager(db=db, request=request)
    qs = await manager.get_api_key()
    data = ApiKeyRead(instance_ids=[ApiKeyRead.Meta.model.id], filed_names=["user_id"], many=True).dump(qs)
    return R.format(
        {"total_count": len(data), "user_id": request.user.id, "api_keys": data}
    )


@router.post("/")
async def create_api_key(
        request: Request,
        name: str = Body(description="api name", embed=True),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    """Create an api_key for the user."""
    manager = ApiKeyManager(db=db, request=request)
    api_key_row, plaintext = await manager.create_api_key(name)
    data = UnmaskedApiKeyRead().dump(api_key_row)
    # The key is only ever shown once, in this response; at rest only the hash is stored.
    data["api_key"] = plaintext
    return R.format(data)


@router.delete("/{api_key_id}")
async def delete_api_key(
        request: Request,
        api_key_id: str = Path(description="api key id"),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    manager = ApiKeyManager(db=db, request=request)
    await manager.check_object_owner_permission('apikey', api_key_id)
    await manager.delete_api_key(api_key_id)
    return R.format()


@router.put("/{api_key_id}")
async def update_api_key(
        request: Request,
        api_key_id: str = Path(description="api key id"),
        name: str = Body(max_length=100, description="api name", embed=True),
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(api_async_db),
):
    manager = ApiKeyManager(db=db, request=request)
    await manager.check_object_owner_permission('apikey', api_key_id)
    await manager.update_api_key(api_key_id, name)
    return R.format()
