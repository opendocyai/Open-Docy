# -*- coding: utf-8 -*-
# @Time    : 2025/6/19 15:58
# @Author  : yanjia
# @File    : invite.py
# @Desc    : None
from datetime import datetime, UTC

from loguru import logger
from docy.const import MESSAGE_DICT
from docy.exceptions import exception as E
from docy.forms.message import InnerMessageCreateForm
from docy.bases.base_manager import BaseManager
from docy.models.tb_workspace import (
    WorkspaceInvite,
    InviteAction,
    FrontInviteAction,
    MemberStatus,
)
from docy.crud import invite_dao, user_dao
from docy.services.workspace import WorkspaceManager, MemberManager
from docy.services.message import InnerMessageManager
from docy.utils.enums import InnerModelEnum, InnerMessageStateEnum
from .constants import TeamspaceRedisKeys



class InviteManager(BaseManager):
    """
    Invitation handling.
    """

    model = WorkspaceInvite

    async def action_invite(
        self, invite_id: str, action: FrontInviteAction, invite_code: str = None
    ):
        """
        Accept/reject an invitation.
        :param invite_id: Invitation ID
        :param action: Operation
        :param invite_code: Invitation code

        """
        now = datetime.now(UTC)
        invite_redis_key = None

        if invite_id:
            invite_instance = await invite_dao.select_model(self.db, invite_id)
        else:
            if not invite_code:
                LOG.error(f"action_invite error: invite_code is empty")
                raise E.InvalidArguments
            invite_redis_key = (
                f"{TeamspaceRedisKeys.INVITE_LINK_KEY.value}{invite_code}"
            )
            # Get the invitation record invite_id via invite_code
            invite_params = await WorkspaceManager(
                self.db, request=self.request
            ).get_params_by_invite_code(invite_code)
            if not invite_params:
                logger.error(
                    f"action_invite error: don't get invite_params from invite code: '{invite_code}'"
                )
                raise E.InviteActionAlreadyHandle
            invite_instance = await invite_dao.select_model(
                self.db, invite_params.get("invite_id")
            )

        if not invite_instance:
            logger.error(
                f"invite instance not font:  invite_id->{invite_id} invite_code->{invite_code} action->{action}"
            )
            raise E.ObjectNotFound("Invite not found")
        space_id, email = invite_instance.workspace_id, invite_instance.email

        # Check whether the invitee exists in the system
        invited_user = await user_dao.select_model_by_column(self.db, email=email, is_delete=False)
        if not invited_user:
            logger.error(f"invite email not in system: {email}")
            raise E.PleaseRegisterEmail(desc=f"It looks like {email} doesn't have a Docy account yet. Please sign up to join this team space.")

        # Check whether the operator is the invitee
        if self.request.user and self.request.user.is_authenticated:
            logger.info(f"Operator accepting or ignoring the invitation: {self.request.user.id}")
            if self.request.user.email != invite_instance.email:
                LOG.error(
                    f"No permission to perform the operation: action email -> {self.request.user.email}"
                    f"invite email->{invite_instance.email}"
                )
                raise E.InviteActionNotAllow

        if invite_instance.action == InviteAction.EXPIRED.value:  # This invitation has expired
            logger.error(
                f"invite instance is expired:  invite_id->{invite_instance.id} action->{action}"
            )
            raise E.InviteExpiredError

        if invite_instance.action in [
            InviteAction.ACCEPT.value,
            InviteAction.IGNORE.value,
        ]:
            logger.debug(
                f"invite instance is handle:  invite_id->{invite_instance.id} action->{action}"
            )
            raise E.InviteActionAlreadyHandle

        if now > invite_instance.expire_at:  # The invitation time has expired
            invite_instance.action = InviteAction.EXPIRED
            await self.db.commit()
            await self.db.refresh(invite_instance)
            logger.error(
                f"invite is expired:  invite_id->{invite_id}, invite_code->{invite_code}, action->{action}"
            )
            raise E.InviteExpiredError

        teamspace = await WorkspaceManager(self.db).get_workspace_by_id(space_id)
        # The operations above did not obtain space_id and email
        if not space_id and not email and not teamspace:
            logger.error(
                f"action_invite error:  invite_id->{invite_id}, invite_code->{invite_code}, action->{action}"
            )
            raise E.InternalServerError

        if action == InviteAction.IGNORE.value:  # Ignore the invitation
            invite_instance.action = InviteAction.IGNORE
            logger.debug(
                f"ignore invite:  invite_id->{invite_id}, invite_code->{invite_code}, action->{action}"
            )
            if self.request.app.redis_client:
                if invite_redis_key:
                    await self.request.app.redis_client.expire(invite_redis_key, 1)

        if action == InviteAction.ACCEPT.value:  # Accept the invitation
            invite_instance.action = InviteAction.ACCEPT
            self.db.add(invite_instance)

            member_manager = MemberManager(self.db, request=self.request)
            exists_member = await member_manager.get_space_member(
                workspace_id=space_id,
                email=email,
                status=MemberStatus.pending
            )
            if exists_member:  # If present, update the member status
                exists_member.status = MemberStatus.activated
                self.db.add(exists_member)
            else:  # If absent, error out, because the space member was already created at invitation time
                logger.error(f"InviteManager.action_invite exists_member error: email '{email}', space_id '{space_id}'")
                raise E.RequestError(desc="Teamspace member not found")

            # Update the invitation status
            await self.db.commit()

            # Set the redis data for invite_code to expire
            if self.request.app.redis_client:
                if invite_redis_key:
                    await self.request.app.redis_client.expire(invite_redis_key, 1)

            # Update the other redundant invitations of this email in this space
            update_rows = await InviteManager(self.db).clear_other_untreated_invites(
                space_id, email
            )
            logger.debug(f"update untreated_invites rows: {update_rows}")

    async def clear_other_untreated_invites(
        self, space_id: str, email: str, action: InviteAction = InviteAction.UNTREATED
    ):
        """
        Clear the other untreated invitation links: change their status to
        expired.
        """

        update_rows = await invite_dao.update_model_by_column(
            self.db,
            {"action": InviteAction.EXPIRED},
            allow_multiple=True,
            commit=True,
            ** {"workspace_id": space_id, "email": email, "action": action},
        )
        return update_rows
