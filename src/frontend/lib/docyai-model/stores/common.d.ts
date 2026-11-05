export declare const useCommonStore: import('pinia').StoreDefinition<"common", {
    currentSelectedAgent: {};
    isShowRobotDrawer: boolean;
    isChatting: boolean;
    chatKeyword: string;
    isShowStyleDrawer: boolean;
    notificationCount: number;
    askBtnTips: boolean;
}, {}, {
    SET_CURRENT_SELECTED_AGENT(info: Object): void;
    SET_IS_SHOW_ROBOT_DRAWER(info: boolean): void;
    SET_IS_CHATTING(info: boolean): void;
    SET_CHAT_KEYWORD(info: string): void;
    SET_IS_SHOW_STYLE_DRAWER(info: boolean): void;
    SET_NOTIFICATION_COUNT(info: number): void;
    SET_ASK_BTN_TIPS(info: boolean): void;
}>;
