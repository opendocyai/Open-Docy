declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    accept: {
        type: StringConstructor;
        default: undefined;
    };
    limit: {
        type: NumberConstructor;
        default: undefined;
    };
    limitSize: {
        type: NumberConstructor;
        default: undefined;
    };
    fileList: {
        type: ArrayConstructor;
        default: () => never[];
    };
    aspectVideo: {
        type: NumberConstructor;
        default: undefined;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("cancel" | "change")[], "cancel" | "change", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    accept: {
        type: StringConstructor;
        default: undefined;
    };
    limit: {
        type: NumberConstructor;
        default: undefined;
    };
    limitSize: {
        type: NumberConstructor;
        default: undefined;
    };
    fileList: {
        type: ArrayConstructor;
        default: () => never[];
    };
    aspectVideo: {
        type: NumberConstructor;
        default: undefined;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onCancel?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    disabled: boolean;
    accept: string;
    multiple: boolean;
    limit: number;
    limitSize: number;
    fileList: unknown[];
    aspectVideo: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
