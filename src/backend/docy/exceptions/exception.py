"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: exception
Description:
"""

from starlette import status

from docy.bases.exception import ProjectBaseException


class InvalidParameters(ProjectBaseException):
    detail: str = "Incorrect parameter(s). Please check."
    code: int = status.HTTP_403_FORBIDDEN


class ImproperlyConfigured(ProjectBaseException):
    detail: str = "No authentication backends have been defined."
    code: int = status.HTTP_403_FORBIDDEN


class AuthenticateError(ProjectBaseException):
    detail: str = "Authenticate error."
    code: int = status.HTTP_401_UNAUTHORIZED


class LoginError(ProjectBaseException):
    detail: str = "Username or password is incorrect."
    code: str = status.HTTP_400_BAD_REQUEST


class LoginThrottled(ProjectBaseException):
    detail: str = "Too many failed login attempts. Please try again later."
    code: int = status.HTTP_429_TOO_MANY_REQUESTS


class UserNotActive(ProjectBaseException):
    detail: str = (
        "Your account is not yet activated. Please check your inbox for the activation email and click the link to activate your account first"
    )
    code: int = status.HTTP_400_BAD_REQUEST


class ObjectOwnerNotMatch(ProjectBaseException):
    detail: str = "This resource does not belong to you."
    code: int = status.HTTP_403_FORBIDDEN


class NoPermission(ProjectBaseException):
    detail: str = "No permission to access this resource."
    code: int = status.HTTP_403_FORBIDDEN


class UserSpaceNotMatch(ProjectBaseException):
    detail: str = "User not match with space."
    code: int = status.HTTP_403_FORBIDDEN


class RefreshTokenError(ProjectBaseException):
    detail: str = "Refresh token expired. Need re-login."
    code: int = status.HTTP_401_UNAUTHORIZED


class ObjectNotFound(ProjectBaseException):
    detail: str = "Object not found."
    code: int = status.HTTP_400_BAD_REQUEST


class TeamspaceNotFound(ProjectBaseException):
    detail: str = "Teamspace not found."
    code: int = status.HTTP_400_BAD_REQUEST


class TeamspaceMemberNotFound(ProjectBaseException):
    detail: str = "Teamspace member not found."
    code: int = status.HTTP_400_BAD_REQUEST


class OldPasswordNotMatch(ProjectBaseException):
    detail: str = (
        "The current password you entered does not match the one in the database."
    )
    code: int = status.HTTP_400_BAD_REQUEST


class InvalidRefreshToken(ProjectBaseException):
    detail: str = "Invalid refresh token."
    code: int = status.HTTP_401_UNAUTHORIZED


class InvalidAccessToken(ProjectBaseException):
    detail: str = "Invalid access token."
    code: int = status.HTTP_401_UNAUTHORIZED


class VerifyEmailError(ProjectBaseException):
    detail = "Email verification failed."
    code = status.HTTP_404_NOT_FOUND


class UserHasBeActive(ProjectBaseException):
    detail = "The user has already been activated."
    code = status.HTTP_403_FORBIDDEN


class ValidationCodeError(ProjectBaseException):
    detail = "Incorrect verification code."
    code = status.HTTP_400_BAD_REQUEST


class SendEmailError(ProjectBaseException):
    detail = "Send email failed"
    code = status.HTTP_500_INTERNAL_SERVER_ERROR


class ValidateError(ProjectBaseException):
    detail = "Validate failed."
    code = status.HTTP_400_BAD_REQUEST


class RequestNeed(ProjectBaseException):
    detail = "Need request."


class APIInvalidError(ProjectBaseException):
    detail = "Invalid API Key"
    code = status.HTTP_401_UNAUTHORIZED


class SignatureInvalidError(ProjectBaseException):
    detail = "Invalid Signature"
    code = status.HTTP_403_FORBIDDEN


# subscription related
class InvalidCustomerID(ProjectBaseException):
    detail: str = "Invalid Customer ID. Contact us for help."
    code: int = status.HTTP_404_NOT_FOUND


class UnsupportedOperation(ProjectBaseException):
    detail: str = "Unsupported operation."
    code: int = status.HTTP_403_FORBIDDEN


class OperationFailed(ProjectBaseException):
    detail: str = "Operation failed."
    code: int = status.HTTP_403_FORBIDDEN


class SubscriptionNotFound(ProjectBaseException):
    detail: str = "Subscription not found."
    code: int = status.HTTP_403_FORBIDDEN


class InvalidSubscriptionWithPrivilege(ProjectBaseException):
    detail = "This is a special account; no subscription is required."
    code = status.HTTP_403_FORBIDDEN


class AzureUploadFileError(ProjectBaseException):
    detail = "Fail to upload file to blob."
    code = status.HTTP_400_BAD_REQUEST


class AzureSASGenerateError(ProjectBaseException):
    detail = "Fail to generate file upload url."
    code = status.HTTP_400_BAD_REQUEST


class RequestError(ProjectBaseException):
    detail = "Request error."
    code: int = status.HTTP_400_BAD_REQUEST


class UserNotLoginError:
    detail: str = "User not login."
    code: int = status.HTTP_400_BAD_REQUEST


class InternalServerError(ProjectBaseException):
    detail = "Internal server error."
    code = status.HTTP_500_INTERNAL_SERVER_ERROR


class MissingArguments(ProjectBaseException):
    detail = "Missing arguments."
    code = status.HTTP_400_BAD_REQUEST


class InvalidArguments(ProjectBaseException):
    detail = "Invalid arguments."
    code = status.HTTP_400_BAD_REQUEST


class FileUploadNotSupportError(ProjectBaseException):
    detail = "Not support file upload."
    code = status.HTTP_400_BAD_REQUEST


class FileUploadNotFoundError(ProjectBaseException):
    detail = "Upload file not found."
    code = status.HTTP_400_BAD_REQUEST


class InvalidOperationCode(ProjectBaseException):
    detail = "Invalid operation code."
    code = status.HTTP_400_BAD_REQUEST


class OperationNotAllow(ProjectBaseException):
    detail = "Operation not permitted."
    code: int = status.HTTP_400_BAD_REQUEST


class InviteExpiredError(ProjectBaseException):
    detail = "Invite expired."
    code = status.HTTP_400_BAD_REQUEST


class InvalidAgentError(ProjectBaseException):
    detail = "Can not find agent config by code."
    code = status.HTTP_400_BAD_REQUEST


class InvalidAgentStatus(ProjectBaseException):
    detail = "Invalid agent status."
    code = status.HTTP_400_BAD_REQUEST


class AgentCountExceeded(ProjectBaseException):
    detail = "Free subscription users can create only one agent per space."
    code = status.HTTP_403_FORBIDDEN


class UpdateTaskStatusFailed(ProjectBaseException):
    detail = "Invalid status."
    code = status.HTTP_403_FORBIDDEN


class CrawlDataUnSupportedFileUploadError(ProjectBaseException):
    detail = "Updating website data only supports uploading CSV format files."
    code = status.HTTP_400_BAD_REQUEST


class BotFileUploadError(ProjectBaseException):
    detail = "Un support file upload."
    code = status.HTTP_400_BAD_REQUEST


class ActivityShareLinkInvalid(ProjectBaseException):
    detail = "Shared link has expired."
    code = status.HTTP_403_FORBIDDEN


class RunTaskError(ProjectBaseException):
    detail = "The input file is missing. Please check"
    code = status.HTTP_403_FORBIDDEN


class AgentHasNoInput(ProjectBaseException):
    detail = "Your agent is missing input nodes. Please add input nodes before saving."
    code = status.HTTP_400_BAD_REQUEST


class TaskRunwithInvalidAgent(ProjectBaseException):
    detail = "Cannot run this task because the associated Agent has been deleted."
    code = status.HTTP_400_BAD_REQUEST


class InvalidJsonTemplate(ProjectBaseException):
    detail = "Invalid template config."
    code = status.HTTP_400_BAD_REQUEST


class AgentPackageFormatError(ProjectBaseException):
    detail = "Invalid agent package format."
    code = status.HTTP_400_BAD_REQUEST


class EmailInviteError(ProjectBaseException):
    detail = "Invitation error."
    code = status.HTTP_400_BAD_REQUEST


class InviteActionNotAllow(ProjectBaseException):
    detail = "No permission to perform the operation"
    code = status.HTTP_400_BAD_REQUEST


class InviteActionAlreadyHandle(ProjectBaseException):
    detail = "Invitation has been processed"
    code = status.HTTP_400_BAD_REQUEST


class TeamspaceHasMember(ProjectBaseException):
    detail = "There are still members in the team space that cannot be deleted."
    code = status.HTTP_400_BAD_REQUEST

class ObjectCannotDelete(ProjectBaseException):
    detail = "This item can't be deleted because it's currently being used by an agent. Please unlink it from the agent and try again."
    code = status.HTTP_400_BAD_REQUEST

class TaskInvalidAgentError(ProjectBaseException):
    detail = "The specified agent is invalid."
    code = status.HTTP_400_BAD_REQUEST


class LocalLambdaCallError(ProjectBaseException):
    detail = "Local - Lambda called error."
    code = status.HTTP_400_BAD_REQUEST


class AiPluginNotInstalled(ProjectBaseException):
    detail = (
        "AI plugin is not installed. Run `uv run docy install-ai` in the "
        "virtual environment to install it, then restart the server."
    )
    code = status.HTTP_400_BAD_REQUEST


class EmptyPage(ProjectBaseException):
    detail = "That page number is less than 1"
    code = status.HTTP_400_BAD_REQUEST


class PageNotAnInteger(ProjectBaseException):
    detail = "That page number is not an integer"
    code = status.HTTP_400_BAD_REQUEST


class AgentCanNotEdit(ProjectBaseException):
    detail = "This agent can not be edited."
    code = status.HTTP_400_BAD_REQUEST


class QuotaLimit(ProjectBaseException):
    detail = "Resources have reached the quota limit."
    code = status.HTTP_400_BAD_REQUEST


class PleaseRegisterEmail(ProjectBaseException):
    detail = "Your email address has not been registered in the system. Please register first."
    code = status.HTTP_400_BAD_REQUEST


# payment related errors
class InvalidPromotionCode(ProjectBaseException):
    detail: str = "Invalid promotion code."
    code: int = status.HTTP_400_BAD_REQUEST


class ExistSubscription(ProjectBaseException):
    detail: str = (
        "The specified subscription already exists. Please do not subscribe again."
    )
    code: int = status.HTTP_400_BAD_REQUEST


class SubscriptionNotUpgrade(ProjectBaseException):
    detail: str = "The subscription can not upgrade."
    code: int = status.HTTP_400_BAD_REQUEST


class PaymentFeatureNotOpen(ProjectBaseException):
    detail: str = "The feature payment not opened."
    code: int = status.HTTP_400_BAD_REQUEST


class InsufficientAgentToken(ProjectBaseException):
    detail: str = "Insufficient agent token."
    code: int = status.HTTP_400_BAD_REQUEST


class TaskCanNotRun(ProjectBaseException):
    detail: str = "Task can not run."
    code: int = status.HTTP_400_BAD_REQUEST


class InsufficientBudget(ProjectBaseException):
    detail: str = "Insufficient budget."
    code: int = status.HTTP_400_BAD_REQUEST


class MemberExistsWorkspace(ProjectBaseException):
    detail: str = "The member already exists in the workspace"
    code: int = status.HTTP_400_BAD_REQUEST


# oauth
class OauthUserError(ProjectBaseException):
    detail: str = "Oauth user not found."
    code: int = status.HTTP_400_BAD_REQUEST


class OauthClientError(ProjectBaseException):
    detail: str = "Oauth client not found."
    code: int = status.HTTP_400_BAD_REQUEST


class OauthClientRedirectUriError(ProjectBaseException):
    detail: str = "Oauth client redirect uri not match."
    code: int = status.HTTP_400_BAD_REQUEST


class OauthClientScopeError(ProjectBaseException):
    detail: str = "Oauth client scope not match."
    code: int = status.HTTP_400_BAD_REQUEST


class OauthGrantTypeError(ProjectBaseException):
    detail: str = "Oauth grant type not support."
    code: int = status.HTTP_400_BAD_REQUEST


class OauthGrantCodeExpiredError(ProjectBaseException):
    detail: str = "Oauth grant code expired."
    code: int = status.HTTP_400_BAD_REQUEST


class OauthGrantCodeError(ProjectBaseException):
    detail: str = "Oauth grant code error."
    code: int = status.HTTP_400_BAD_REQUEST


class OauthGrantRequestParamError(ProjectBaseException):
    detail: str = "Oauth grant invalid request."
    code: int = status.HTTP_400_BAD_REQUEST


class OauthGrantRefreshTokenError:
    detail: str = "Oauth grant refresh token error."
    code: int = status.HTTP_400_BAD_REQUEST


class OauthInvalidClientId:
    detail: str = "Oauth invalid client id."
    code: int = status.HTTP_400_BAD_REQUEST


class OauthClientNameExistError:
    detail: str = "Oauth client name exist."
    code: int = status.HTTP_400_BAD_REQUEST


class CustomNodeSecretEmpty(ProjectBaseException):
    detail: str = "Custom node secrets is empty."
    code: int = status.HTTP_400_BAD_REQUEST


class AgentLockedException(ProjectBaseException):
    detail: str = "Agent is locked."
    code: int = status.HTTP_403_FORBIDDEN


class PolicyVersionNotFound(ProjectBaseException):
    detail: str = "Policy version not found."
    code: int = status.HTTP_400_BAD_REQUEST


class PolicyAgentNodeHasDraftVersion(ProjectBaseException):
    detail: str = (
        "Cannot publish this agent because the selected policy rule is still in Draft status."
    )
    code: int = status.HTTP_400_BAD_REQUEST


class PolicyVersionNotRelation(ProjectBaseException):
    detail: str = "Policy version not relation."
    code: int = status.HTTP_400_BAD_REQUEST
