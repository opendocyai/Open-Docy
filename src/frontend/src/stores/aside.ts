import {defineStore, acceptHMRUpdate} from 'pinia'
export const useAsideStore = defineStore('aside', {
  state: () => ({
	  collapsed: false,
	  width: 296,
	  aside_menu: [] as any[],
	  user_workspace_list: {} as any,
	  marketplace_list: {} as any,
	  deployment_list: {} as any,
	  support_list: {} as any,
	  setting_list: {} as any,
  }),
	actions: {
		SET_IS_OPEN(flag: boolean) {
			this.collapsed = flag;
			this.SET_ASIDE_WIDTH(flag ? 72 : 296)
		},
		SET_ASIDE_WIDTH(num: number) {
			this.width = num;
		},
		SET_ASIDE_MENU(list: any[]) {
			this.aside_menu = list;
			list.map((item) => {
				if (item.name == 'User’s workspace') {
					this.user_workspace_list = item
				} else if (item.name == "Marketplace") {
					this.marketplace_list = item
				} else if (item.name == "Deployment") {
					this.deployment_list = item
				} else if (item.name == "Support") {
					this.support_list = item
				} else if (item.name == "Setting") {
					this.setting_list = item
				}
			})
			console.log('UserWorkspacelist', this.user_workspace_list);
		},
		CLEAR_ASIDE_MENU() {
			this.aside_menu = [];
			this.user_workspace_list = {}
			this.marketplace_list = {}
			this.deployment_list = {}
			this.support_list = {}
			this.setting_list = {}
		}
	},
	persist: {
		key: 'docy-ai-node_aside',
	}
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAsideStore, import.meta.hot));
}
