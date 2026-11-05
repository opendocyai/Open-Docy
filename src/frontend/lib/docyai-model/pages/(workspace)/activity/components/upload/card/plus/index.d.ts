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
    node_item: {
        type: ObjectConstructor;
        default: () => {};
    };
    index: {
        type: NumberConstructor;
        default: () => number;
    };
    updateFilesForNode: {
        type: FunctionConstructor;
        required: true;
    };
    onChoosingFileChange: {
        type: FunctionConstructor;
        required: true;
    };
    isGrouped: {
        type: BooleanConstructor;
        default: boolean;
    };
    isOrigin: {
        type: BooleanConstructor;
        default: boolean;
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
    node_item: {
        type: ObjectConstructor;
        default: () => {};
    };
    index: {
        type: NumberConstructor;
        default: () => number;
    };
    updateFilesForNode: {
        type: FunctionConstructor;
        required: true;
    };
    onChoosingFileChange: {
        type: FunctionConstructor;
        required: true;
    };
    isGrouped: {
        type: BooleanConstructor;
        default: boolean;
    };
    isOrigin: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    type: string;
    page: string;
    node: Record<string, any>;
    index: number;
    node_item: Record<string, any>;
    isGrouped: boolean;
    isOrigin: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
