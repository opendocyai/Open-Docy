import type { ApiMap } from '@/shared/types'
import {useApiProxy} from '@/utils';

const prefix: string = '/v1/space'

export const useApiSpace = (name?: string) => {
	const api: ApiMap = {
		get_space_list: () => ({ url: `${prefix}/`, method: 'get' }),
		get_space_detail: (id: string) => ({ url: `${prefix}/${id}`, method: 'get' }),
		add_space: () => ({ url: `${prefix}/add`, method: 'post' }),


		delete_space: (id: string) => ({ method: "delete", url: `${prefix}/${id}` }),
		update_space: (id: string) => ({ method: "put", url: `${prefix}/${id}` }),

		get_owned_space_list: () => ({ method: "get", url: `${prefix}/owned-space` }),


		invite_link: () => ({ method: "get", url: `${prefix}/invite_link` }),
		email_invite: () => ({ method: "post", url: `${prefix}/invite` }),
		team_invite: () => ({ method: "put", url: `${prefix}/invite/action` }),

		members_list: () => ({ method: "get", url: `${prefix}/member/list` }),
		members_leave: (id: string) => ({ method: "get", url: `${prefix}/member/leave/${id}` }),
		members_remove: (id: string) => ({ method: "delete", url: `${prefix}/member/${id}` }),
		members_update: (id: string) => ({ method: "put", url: `${prefix}/member/${id}/update` }),


		budget_list: () => ({ method: "get", url: `${prefix}/budget/list` }),
		budget_save: (id: string) => ({ method: "post", url: `${prefix}/${id}/budget` }),
		budget_remove: (id: string) => ({ method: "delete", url: `${prefix}/budget/${id}/remove` }),

	}

	return useApiProxy(api, name)
}
