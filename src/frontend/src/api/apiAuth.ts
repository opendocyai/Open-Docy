import type { ApiMap } from '@/shared/types'
import {useApiProxy} from '@/utils';

const prefix: string = '/v1/auth'

export const useApiAuth = (name?: string) => {
	const api: ApiMap = {
		secret_key: () => ({ url: `${prefix}/secret-key`, method: 'get' }),
		refresh: () => ({ url: `${prefix}/refresh`, method: 'post' }),
		login: () => ({ url: `${prefix}/login`, method: 'post' }),
		me_info: () => ({ url: `${prefix}/user/me`, method: 'get' }),

		email_exist: () => ({ url: `${prefix}/email-exist`, method: 'post' }),
		workspace_invitation: () => ({ url: `${prefix}/workspace/invitation/validate`, method: 'get' }),
		google_authorization: () => ({ method: 'get', url: `${prefix}/user/google/authorization` }),
		send_email: () => ({ method: 'post', url: `${prefix}/email/send` }),


		aesKey: () => ({ method: "get", url: `${prefix}/aesKey` }),

		logout: () => ({ method: "delete", url: `${prefix}/logout` }),
		sign_up: () => ({ method: "post", url: `${prefix}/sign-up` }),
		has_password: () => ({ method: "get", url: `${prefix}/user/has-password` }),
		update_info: () => ({ method: "post", url: `${prefix}/user/update` }),
		verify_email: (id: string) => ({ method: "get", url: `${prefix}/verify_email/${id}` }),
		reset_password: () => ({ method: "post", url: `${prefix}/user/reset-password` }),
		reset_password_link_invalid: () => ({ method: "get", url: `${prefix}/password/link/check` }),

	}

	return useApiProxy(api, name)
}
