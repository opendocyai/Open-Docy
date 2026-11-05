class StatusCode {
	static readonly OK = 200;

	static readonly CREATED = 201;

	static readonly ACCEPTED = 202;

	static readonly NO_CONTENT = 204;

	static readonly MULTIPLE_CHOICES = 300;

	static readonly BAD_REQUEST = 400;

	static readonly UNAUTHORIZED = 401;

	static readonly FORBIDDEN = 403;

	static readonly NOT_FOUND = 404;

	static readonly CONFLICT = 409;

	static readonly UNPROCESSABLE_ENTITY = 422;

	static readonly TOO_MANY_REQUESTS = 429;

	static readonly INTERNAL_SERVER_ERROR = 500;

	static readonly BAD_GATEWAY = 502;

	static readonly SERVICE_UNAVAILABLE = 503;

	static readonly UNKNOWN_ERROR = 100003;

	static readonly UNKNOWN_ERROR_200000 = 200000;

	public isSuccess(code?: number): boolean {
		return !code || code >= StatusCode.OK && code < StatusCode.MULTIPLE_CHOICES;
	}

	public isClientError(code?: number): boolean {
		return !!code && code >= StatusCode.BAD_REQUEST && code < StatusCode.INTERNAL_SERVER_ERROR;
	}

	public isServerError(code?: number): boolean {
		return !!code && code >= StatusCode.INTERNAL_SERVER_ERROR;
	}

}

export const statusCode = new StatusCode();

export const CODE_OK = StatusCode.OK;
export const CODE_CREATED = StatusCode.CREATED;
export const CODE_ACCEPTED = StatusCode.ACCEPTED;
export const CODE_NO_CONTENT = StatusCode.NO_CONTENT;
export const CODE_MULTIPLE_CHOICES = StatusCode.MULTIPLE_CHOICES;
export const CODE_BAD_REQUEST = StatusCode.BAD_REQUEST;
export const CODE_UNAUTHORIZED = StatusCode.UNAUTHORIZED;
export const CODE_FORBIDDEN = StatusCode.FORBIDDEN;
export const CODE_NOT_FOUND = StatusCode.NOT_FOUND;
export const CODE_CONFLICT = StatusCode.CONFLICT;
export const CODE_UNPROCESSABLE_ENTITY = StatusCode.UNPROCESSABLE_ENTITY;
export const CODE_TOO_MANY_REQUESTS = StatusCode.TOO_MANY_REQUESTS;
export const CODE_INTERNAL_SERVER_ERROR = StatusCode.INTERNAL_SERVER_ERROR;
export const CODE_BAD_GATEWAY = StatusCode.BAD_GATEWAY;
export const CODE_SERVICE_UNAVAILABLE = StatusCode.SERVICE_UNAVAILABLE;
export const CODE_UNKNOWN_ERROR = StatusCode.UNKNOWN_ERROR;
export const CODE_UNKNOWN_ERROR_200000 = StatusCode.UNKNOWN_ERROR_200000;

export const isSuccess = statusCode.isSuccess.bind(statusCode);
export const isClientError = statusCode.isClientError.bind(statusCode);
export const isServerError = statusCode.isServerError.bind(statusCode);

export default statusCode;
