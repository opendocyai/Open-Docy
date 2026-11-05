declare const __VLS_export: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    agentData: {
        type: ObjectConstructor;
        default: () => void;
    };
    tableLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    deleteSingle: (...args: any[]) => void;
    editAgent: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    agentData: {
        type: ObjectConstructor;
        default: () => void;
    };
    tableLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onDeleteSingle?: ((...args: any[]) => any) | undefined;
    onEditAgent?: ((...args: any[]) => any) | undefined;
}>, {
    tableLoading: boolean;
    agentData: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
