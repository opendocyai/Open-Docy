"""Menu and default role initialization (ported from the legacy scripts/init_menu.py).

Called at service startup, init_menu_and_roles():
- init_menu: insert all menus when the menu table is empty (idempotent)
- bind_owner_role_menu: create/bind the Owner role (all menus)
- bind_member_role_menu: create/bind the Member role (specified permission subset)
- bind_editor_member_role_menu: create/bind the Editor role (disabled by default in the legacy version)

The Knowledge / Document Template / Compliance Policy menus have no matching
features in the open-source edition; they only exist as menu data and do not
affect the business logic, so they are kept as-is.
"""

from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from loguru import logger

from docy.cache.cache_utils import delete_key_from_cache
from docy.const import CommonRedisKey
from docy.models.tb_menu import Menu
from docy.models.tb_role import SysRole
from docy.models.tb_workspace import MemberType

MENU_DATA = [
    # workspace
    {
        "id": "204962910824523000",
        "title": "User’s workspace",
        "name": "User’s workspace",
        "type": 0,
        "sort": 0,
        "parent_id": None,
    },
    ## Activity menu
    {
        "id": "204962910824523320",
        "title": "Activity",
        "name": "Activity",
        "path": "/activity",
        "type": 1,
        "sort": 2,
        "icon": "activity",
        "parent_id": "204962910824523000",
    },
    ### Activity button
    {
        "id": "204962910824523321",
        "title": "View Activity",
        "name": "View Activity",
        "path": "",
        "type": 2,
        "sort": 21,
        "icon": "",
        "parent_id": "204962910824523320",
        "perms": "sys:task:view",
    },
    {
        "id": "204962910824523322",
        "title": "Create Task",
        "name": "Create Task",
        "path": "",
        "type": 2,
        "sort": 22,
        "icon": "",
        "parent_id": "204962910824523320",
        "perms": "sys:task:add",
    },
    {
        "id": "204962910824523323",
        "title": "Bulk Delete",
        "name": "Bulk Delete",
        "path": "",
        "type": 2,
        "sort": 23,
        "icon": "",
        "parent_id": "204962910824523320",
        "perms": "sys:task:bulk:del",
    },
    {
        "id": "204962910824523324",
        "title": "Run",
        "name": "Run",
        "path": "",
        "type": 2,
        "sort": 24,
        "icon": "",
        "parent_id": "204962910824523320",
        "perms": "sys:task:run",
    },
    {
        "id": "204962910824523325",
        "title": "Edit",
        "name": "Edit",
        "path": "",
        "type": 2,
        "sort": 25,
        "icon": "",
        "parent_id": "204962910824523320",
        "perms": "sys:task:edit",
    },
    {
        "id": "204962910824523326",
        "title": "Delete",
        "name": "Delete",
        "path": "",
        "type": 2,
        "sort": 26,
        "icon": "",
        "parent_id": "204962910824523320",
        "perms": "sys:task:del",
    },
    {
        "id": "204962910824523327",
        "title": "Records",
        "name": "Records",
        "path": "",
        "type": 2,
        "sort": 27,
        "icon": "",
        "parent_id": "204962910824523320",
        "perms": "sys:task:record:view",
    },
    {
        "id": "204962910824523328",
        "title": "Cancel",
        "name": "Cancel",
        "path": "",
        "type": 2,
        "sort": 28,
        "icon": "",
        "parent_id": "204962910824523320",
        "perms": "sys:task:cancel",
    },
    {
        "id": "204962910824523329",
        "title": "Manual intervention",
        "name": "Manual intervention",
        "path": "",
        "type": 2,
        "sort": 29,
        "icon": "",
        "parent_id": "204962910824523320",
        "perms": "sys:task:manual",
    },
    ## Agent menu
    {
        "id": "204962910824523330",
        "title": "Agent",
        "name": "Agent",
        "path": "/agent",
        "type": 1,
        "sort": 3,
        "icon": "agent",
        "parent_id": "204962910824523000",
    },
    ### Agent button
    {
        "id": "204962910824523331",
        "title": "View Agent",
        "name": "View Agent",
        "path": "",
        "type": 2,
        "sort": 31,
        "icon": "",
        "parent_id": "204962910824523330",
        "perms": "sys:agent:view",
    },
    {
        "id": "204962910824523333",
        "title": "Create Agent",
        "name": "Create Agent",
        "path": "",
        "type": 2,
        "sort": 32,
        "icon": "",
        "parent_id": "204962910824523330",
        "perms": "sys:agent:add",
    },
    {
        "id": "204962910824523332",
        "title": "Bulk Delete",
        "name": "Bulk Delete",
        "path": "",
        "type": 2,
        "sort": 33,
        "icon": "",
        "parent_id": "204962910824523330",
        "perms": "sys:agent:bulk:del",
    },
    {
        "id": "204962910824523334",
        "title": "Edit",
        "name": "Edit",
        "path": "",
        "type": 2,
        "sort": 34,
        "icon": "",
        "parent_id": "204962910824523330",
        "perms": "sys:agent:edit",
    },
    {
        "id": "204962910824523335",
        "title": "Delete",
        "name": "Delete",
        "path": "",
        "type": 2,
        "sort": 35,
        "icon": "",
        "parent_id": "204962910824523330",
        "perms": "sys:agent:del",
    },
    {
        "id": "204962910824523336",
        "title": "Detail",
        "name": "Delete",
        "path": "",
        "type": 2,
        "sort": 36,
        "icon": "",
        "parent_id": "204962910824523330",
        "perms": "sys:agent:detail",
        "display": 0,
    },
    ## Document Template menu
    {
        "id": "204962910824523350",
        "title": "Document Template",
        "name": "Document Template",
        "path": "/document-template",
        "type": 1,
        "sort": 5,
        "icon": "document-template",
        "parent_id": "204962910824523000",
    },
    ### Document Template button
    {
        "id": "204962910824523351",
        "title": "View Template",
        "name": "View Template",
        "path": "",
        "type": 2,
        "sort": 51,
        "icon": "",
        "parent_id": "204962910824523350",
        "perms": "sys:tpl:view",
    },
    {
        "id": "204962910824523353",
        "title": "Create Template",
        "name": "Create Template",
        "path": "",
        "type": 2,
        "sort": 52,
        "icon": "",
        "parent_id": "204962910824523350",
        "perms": "sys:tpl:add",
    },
    {
        "id": "204962910824523352",
        "title": "Bulk Delete",
        "name": "Bulk Delete",
        "path": "",
        "type": 2,
        "sort": 53,
        "icon": "",
        "parent_id": "204962910824523350",
        "perms": "sys:tpl:bulk:del",
    },
    {
        "id": "204962910824523354",
        "title": "Export",
        "name": "Export",
        "path": "",
        "type": 2,
        "sort": 54,
        "icon": "",
        "parent_id": "204962910824523350",
        "perms": "sys:tpl:export",
    },
    {
        "id": "204962910824523355",
        "title": "Edit",
        "name": "Edit",
        "path": "",
        "type": 2,
        "sort": 55,
        "icon": "",
        "parent_id": "204962910824523350",
        "perms": "sys:tpl:edit",
    },
    {
        "id": "204962910824523356",
        "title": "Delete",
        "name": "Delete",
        "path": "",
        "type": 2,
        "sort": 56,
        "icon": "",
        "parent_id": "204962910824523350",
        "perms": "sys:tpl:del",
    },
    {
        "id": "204962910824523002",
        "title": "Deployment",
        "name": "Deployment",
        "type": 0,
        "sort": 2,
        "parent_id": None,
    },
    ## Usage
    {
        "id": "204962910824523380",
        "title": "Usage",
        "name": "Usage",
        "path": "/usage",
        "type": 1,
        "sort": 8,
        "icon": "usage",
        "parent_id": "204962910824523002",
    },
    {
        "id": "204962910824523381",
        "title": "View Usage",
        "name": "View Usage",
        "type": 2,
        "sort": 71,
        "parent_id": "204962910824523380",
        "perms": "sys:usage:view",
    },
    {
        "id": "204962910824523382",
        "title": "Export",
        "name": "Export",
        "type": 2,
        "sort": 72,
        "parent_id": "204962910824523380",
        "perms": "sys:usage:export",
    },
    # Support
    {
        "id": "204962910824523003",
        "title": "Support",
        "name": "Support",
        "type": 0,
        "sort": 3,
        "parent_id": None,
    },
    ## Support link
    {
        "id": "204962910824523301",
        "title": "Academy",
        "name": "Academy",
        "type": 4,
        "sort": 101,
        "icon": "academy",
        "parent_id": "204962910824523003",
        "link": "https://docyai.com/academy/",
        "perms": "sys:academy:view",
    },
    {
        "id": "204962910824523302",
        "title": "Community",
        "name": "Community",
        "type": 4,
        "sort": 102,
        "icon": "community",
        "parent_id": "204962910824523003",
        "link": "https://discord.com/invite/j2f4uEMF",
        "perms": "sys:community:view",
    },
    {
        "id": "204962910824523303",
        "title": "Support",
        "name": "Support",
        "type": 4,
        "sort": 103,
        "icon": "support",
        "parent_id": "204962910824523003",
        "link": "https://docyai.com/contact-us/",
        "perms": "sys:support:view",
    },
    # Setting
    {
        "id": "204962910824523004",
        "title": "Setting",
        "name": "Setting",
        "type": 0,
        "sort": 4,
        "display": 0,
        "parent_id": None,
    },
    ## Setting
    {
        "id": "204962910824523390",
        "title": "Setting",
        "name": "Setting",
        "path": "/setting",
        "type": 1,
        "sort": 8,
        "icon": "setting",
        "parent_id": "204962910824523004",
    },
    ## Setting view
    {
        "id": "204962910824523391",
        "title": "View Setting",
        "name": "View Setting",
        "path": "",
        "type": 2,
        "sort": 81,
        "parent_id": "204962910824523390",
        "perms": "sys:setting:view",
    },
    {
        "id": "204962910824523392",
        "title": "Edit Setting",
        "name": "Edit Setting",
        "path": "",
        "type": 2,
        "sort": 82,
        "parent_id": "204962910824523390",
        "perms": "sys:setting:edit",
    },
]


# Audit menu (ported from the legacy scripts/deploy_audit_menu.sql, idempotent deployment).
# path uses "/audit-logs" (the actual route of the frontend audit log page
# (setting)/audit-logs, same as the legacy SQL; "/audit" is the audit agent
# editor page; do not mix them up).
AUDIT_MENU_DATA = [
    {
        "id": "631780000000000000",
        "title": "Audit Logs",
        "name": "Audit Logs",
        "path": "/audit-logs",
        "type": 1,
        "sort": 9,
        "icon": "audit-logs",
        "parent_id": "204962910824523003",  # Support directory
    },
    {
        "id": "631780000000000001",
        "title": "View Audit Logs",
        "name": "View Audit Logs",
        "path": "",
        "type": 2,
        "sort": 91,
        "icon": "",
        "parent_id": "631780000000000000",
        "perms": "sys:audit:view",
    },
    {
        "id": "631780000000000002",
        "title": "Export CSV",
        "name": "Export CSV",
        "path": "",
        "type": 2,
        "sort": 92,
        "icon": "",
        "parent_id": "631780000000000000",
        "perms": "sys:audit:export",
    },
    {
        "id": "631780000000000003",
        "title": "Verify Again",
        "name": "Verify Again",
        "path": "",
        "type": 2,
        "sort": 93,
        "icon": "",
        "parent_id": "631780000000000000",
        "perms": "sys:audit:verify",
    },
]


async def _clear_role_perms_cache(role_id: str) -> None:
    """Invalidate the role permission cache when the binding changes (redis deletion in the legacy version)."""
    role_perms_key = CommonRedisKey.get_role_perms_key(role_id)
    await delete_key_from_cache(role_perms_key)


async def init_menu(db: AsyncSession):

    # Skip when it already exists
    exists = await db.execute(select(Menu).limit(1))
    if exists.first():
        logger.info("Menu already exists, skip initialization")
        return

    for item in MENU_DATA:
        menu = Menu(**item)
        db.add(menu)
    await db.commit()
    logger.info("Menu initialization completed")


async def bind_owner_role_menu(db: AsyncSession):
    # Bind or create the owner role menu

    stmt = (
        select(SysRole)
        .filter_by(role_type=MemberType.OWNER)
        .options(selectinload(SysRole.menus))  # Preload menus
    )
    role = (await db.execute(stmt)).scalar_one_or_none()

    if not role:
        role = SysRole(
            name="Owner", role_type=MemberType.OWNER, sort=1, remark="Team Owner"
        )
        db.add(role)
        await db.flush()  # Get role.id
        await db.refresh(role, attribute_names=["menus"])  # Explicitly refresh the object
    if not role.menus:
        # Bind all menus
        await _clear_role_perms_cache(role.id)
        menus = (await db.execute(select(Menu))).scalars().all()
        role.menus = menus
        await db.commit()
        logger.info("`owner` role menu initialization completed")
    else:
        logger.info("`owner` role menu already configured, skip initialization")


async def bind_member_role_menu(db: AsyncSession):
    """
    Bind or create the member role menu.

    For now give the `member` role the specified menu set.
    """
    perms = [
        # task view perm
        "sys:task:view",
        # tpl view perm
        "sys:tpl:view",
        # marketplace
        "sys:market:view",
        # setting all perm
        "sys:setting:view",
        "sys:setting:edit",
    ]

    stmt = (
        select(SysRole)
        .where(
            and_(
                SysRole.role_type == MemberType.MEMBER,
                SysRole.name == "Member",
                SysRole.space_id == None,
            )
        )
        .options(selectinload(SysRole.menus))  # Preload menus
    )
    role = (await db.execute(stmt)).scalar_one_or_none()

    if not role:
        role = SysRole(
            name="Member", role_type=MemberType.MEMBER, sort=2, remark="Team Member"
        )
        db.add(role)
        await db.flush()  # Get role.id
        await db.refresh(role, attribute_names=["menus"])  # Explicitly refresh the object
    if not role.menus:
        # Bind the custom menus
        await _clear_role_perms_cache(role.id)
        menus = (
            (
                await db.execute(
                    select(Menu)
                    .where(Menu.perms.in_(perms))
                    .options(
                        selectinload(
                            Menu.parent, recursion_depth=2
                        )  # Explicit loading, recursing up 2 levels
                    )
                )
            )
            .scalars()
            .all()
        )

        full_menu_set = set()
        for menu in menus:
            full_menu_set.add(menu)
            if menu.parent_id:
                full_menu_set.add(menu.parent)
                if menu.parent.parent_id:
                    full_menu_set.add(menu.parent.parent)

        role.menus = list(full_menu_set)
        await db.commit()
        logger.info("`member` role menu initialization completed")
    else:
        logger.info("`member` role menu already configured, skip initialization")


async def bind_editor_member_role_menu(db: AsyncSession):
    """
    Bind or create the editor role menu.

    For now give the `member` role the specified menu set.
    """
    perms = [
        # task all perm
        "sys:task:view",
        "sys:task:add",
        "sys:task:del",
        "sys:task:bulk:del",
        "sys:task:edit",
        "sys:task:run",
        # tpl all perm
        "sys:tpl:export",
        "sys:tpl:add",
        "sys:tpl:edit",
        "sys:tpl:del",
        "sys:tpl:bulk:del",
        "sys:tpl:view",
        # setting all perm
        "sys:setting:view",
        "sys:setting:edit",
    ]

    stmt = (
        select(SysRole)
        .where(
            and_(
                SysRole.role_type == MemberType.MEMBER,
                SysRole.name == "Editor",
                SysRole.space_id == None,
            )
        )
        .options(selectinload(SysRole.menus))  # Preload menus
    )
    role = (await db.execute(stmt)).scalar_one_or_none()

    if not role:
        role = SysRole(
            name="Editor", role_type=MemberType.MEMBER, sort=3, remark="Team Editor"
        )
        db.add(role)
        await db.flush()  # Get role.id
        await db.refresh(role, attribute_names=["menus"])  # Explicitly refresh the object
    if not role.menus:
        # Bind the custom menus
        await _clear_role_perms_cache(role.id)
        menus = (
            (
                await db.execute(
                    select(Menu)
                    .where(Menu.perms.in_(perms))
                    .options(
                        selectinload(
                            Menu.parent, recursion_depth=2
                        )  # Explicit loading, recursing up 2 levels
                    )
                )
            )
            .scalars()
            .all()
        )

        full_menu_set = set()
        for menu in menus:
            full_menu_set.add(menu)
            if menu.parent_id:
                full_menu_set.add(menu.parent)
                if menu.parent.parent_id:
                    full_menu_set.add(menu.parent.parent)

        role.menus = list(full_menu_set)
        await db.commit()
        logger.info("`editor` role menu initialization completed")
    else:
        logger.info("`editor` role menu already configured, skip initialization")


async def init_audit_menu(db: AsyncSession):
    """Deploy the audit menu (following the legacy scripts/deploy_audit_menu.sql, idempotent).

    - Insert the Audit Logs menu + 3 buttons into sys_menu (perms: sys:audit:view/export/verify)
    - Bind to the owner role (only appends missing items, existing bindings are untouched)
    """
    audit_ids = [m["id"] for m in AUDIT_MENU_DATA]
    existing_ids = set(
        (await db.execute(select(Menu.id).where(Menu.id.in_(audit_ids))))
        .scalars()
        .all()
    )
    missing = [m for m in AUDIT_MENU_DATA if m["id"] not in existing_ids]
    if missing:
        for item in missing:
            db.add(Menu(**item))
        await db.commit()
        logger.info(f"Audit menu initialization completed, {len(missing)} items added")
    else:
        logger.info("Audit menu already exists, skip initialization")

    # Bind the owner role (append missing items)
    stmt = (
        select(SysRole)
        .filter_by(role_type=MemberType.OWNER)
        .options(selectinload(SysRole.menus))
    )
    role = (await db.execute(stmt)).scalar_one_or_none()
    if not role:
        # The owner role does not exist yet (created by bind_owner_role_menu);
        # bind on the next startup.
        return

    bound_ids = {menu.id for menu in role.menus}
    missing_ids = set(audit_ids) - bound_ids
    if not missing_ids:
        logger.info("Owner role already bound to the audit menu, skip")
        return

    await _clear_role_perms_cache(role.id)
    menus = (await db.execute(select(Menu).where(Menu.id.in_(missing_ids)))).scalars().all()
    role.menus = list(role.menus) + list(menus)
    await db.commit()
    logger.info(f"Owner role bound {len(menus)} audit menu items")


async def init_menu_and_roles(db: AsyncSession):
    """
    Initialize menus and default roles (idempotent, safe to call repeatedly):
    - Insert all menus when the menu table is empty
    - Bind all menus to the owner role
    - Bind the specified permission subset to the member role
    - The editor role is not enabled yet (same as the legacy main)
    """
    await init_menu(db)
    await init_audit_menu(db)
    await bind_owner_role_menu(db)
    await bind_member_role_menu(db)
