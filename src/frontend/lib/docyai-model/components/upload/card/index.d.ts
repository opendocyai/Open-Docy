declare const __VLS_export: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    type: {
        type: StringConstructor;
        default: string;
    };
    page: {
        type: StringConstructor;
        default: string;
    };
    node: {
        type: ObjectConstructor;
        default: () => {};
    };
    updateFilesForNode: {
        type: FunctionConstructor;
        required: true;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    type: {
        type: StringConstructor;
        default: string;
    };
    page: {
        type: StringConstructor;
        default: string;
    };
    node: {
        type: ObjectConstructor;
        default: () => {};
    };
    updateFilesForNode: {
        type: FunctionConstructor;
        required: true;
    };
}>> & Readonly<{}>, {
    type: string;
    page: string;
    node: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
