import {defineStore, acceptHMRUpdate} from 'pinia'
export const useRoleStore = defineStore("role", {
	state: () => ({
		role_perms_list: [] as any[]
	}),
	actions: {
		SET_ROLE_PERMS(list: any) {
			this.role_perms_list = list
		},
		HAS_ROLE_PERM(key: any) {
			return this.role_perms_list.includes(key);
		}
	},
	persist: {
		key: 'docy-ai-node_role',
	}
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRoleStore, import.meta.hot));
}
