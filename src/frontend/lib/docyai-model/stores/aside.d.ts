export declare const useAsideStore: import('pinia').StoreDefinition<"aside", {
    collapsed: boolean;
    width: number;
    aside_menu: any[];
    user_workspace_list: any;
    marketplace_list: any;
    deployment_list: any;
    support_list: any;
    setting_list: any;
}, {}, {
    SET_IS_OPEN(flag: boolean): void;
    SET_ASIDE_WIDTH(num: number): void;
    SET_ASIDE_MENU(list: any[]): void;
    CLEAR_ASIDE_MENU(): void;
}>;
