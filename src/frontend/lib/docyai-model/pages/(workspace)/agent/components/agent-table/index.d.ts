interface AgentData {
    id: number;
    name: string;
}
type __VLS_Props = {
    agentData?: AgentData[];
    selectedKeys?: any[];
    tableLoading?: boolean;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    deleteSingle: (record: {
        id: any;
    }) => any;
    editAgent: (record: {
        id: any;
    }) => any;
    selectedKeysChange: (keys: any[]) => any;
    "update:selectedKeys": (keys: any[]) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onDeleteSingle?: ((record: {
        id: any;
    }) => any) | undefined;
    onEditAgent?: ((record: {
        id: any;
    }) => any) | undefined;
    onSelectedKeysChange?: ((keys: any[]) => any) | undefined;
    "onUpdate:selectedKeys"?: ((keys: any[]) => any) | undefined;
}>, {
    selectedKeys: any[];
    tableLoading: boolean;
    agentData: AgentData[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
