export declare const useRouterStore: import('pinia').StoreDefinition<"router", {
    breadcrumb: any[];
    permission: any[];
}, {}, {
    SET_BREADCRUMB(list: any[]): void;
    SET_CHILDREN(flatten_array: any): any;
}>;
