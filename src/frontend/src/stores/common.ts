import {defineStore, acceptHMRUpdate} from 'pinia'
export const useCommonStore = defineStore("common", {
	state: () => ({
		currentSelectedAgent: {},
		isShowRobotDrawer: false,
		isChatting: false,
		chatKeyword: '',
		isShowStyleDrawer: false,
		notificationCount: 0,
		askBtnTips: true,
	}),
	actions: {
		SET_CURRENT_SELECTED_AGENT(info: Object) {
			this.currentSelectedAgent = info;
		},
		SET_IS_SHOW_ROBOT_DRAWER(info: boolean) {
			this.isShowRobotDrawer = info;
		},
		SET_IS_CHATTING(info: boolean) {
			this.isChatting = info;
		},
		SET_CHAT_KEYWORD(info: string) {
			this.chatKeyword = info;
		},
		SET_IS_SHOW_STYLE_DRAWER(info: boolean) {
			this.isShowStyleDrawer = info;
		},
		SET_NOTIFICATION_COUNT(info: number) {
			this.notificationCount = info;
		},
		SET_ASK_BTN_TIPS(info: boolean) {
			this.askBtnTips = info;
		}
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
}
