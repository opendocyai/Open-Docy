import {defineStore, acceptHMRUpdate} from 'pinia'

export const useRouterStore = defineStore('router',{
	state: () => ({
		breadcrumb: [] as any[],
		permission: [] as any[]
	}),
	actions: {
		SET_BREADCRUMB(list: any[]) {
			this.breadcrumb = list
		},
		SET_CHILDREN(flatten_array: any) {
			const uniqueBreadcrumbs: any = [];
			const paths = new Set();
			for (const breadcrumb of flatten_array) {
				if (!paths.has(breadcrumb.path)) {
					paths.add(breadcrumb.path);
					uniqueBreadcrumbs.push(breadcrumb);
				}
			}
			return uniqueBreadcrumbs;
		},

	},
	persist: {
		key: 'docy-ai-node_router',
	},
})



if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRouterStore, import.meta.hot));
}
