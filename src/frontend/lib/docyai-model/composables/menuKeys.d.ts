export declare const useMenuKeys: () => {
    selectedKeys: import('vue').ComputedRef<string[]>;
    onMenuClick: ({ key, item: { item } }: any) => Promise<void | import('vue-router').NavigationFailure>;
};
