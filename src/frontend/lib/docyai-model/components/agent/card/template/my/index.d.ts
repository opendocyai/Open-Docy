declare const __VLS_export: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    dataList: {
        type: ObjectConstructor;
        default: () => void;
    };
    canSelect: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    selectedMyAgent: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    dataList: {
        type: ObjectConstructor;
        default: () => void;
    };
    canSelect: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onSelectedMyAgent?: ((...args: any[]) => any) | undefined;
}>, {
    dataList: Record<string, any>;
    canSelect: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
