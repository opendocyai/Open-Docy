declare const __VLS_export: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    currentMember: {
        type: ObjectConstructor;
        default: {};
    };
    openModal: {
        type: import('vue').PropType<boolean>;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:openModal": (value: boolean | undefined) => any;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    currentMember: {
        type: ObjectConstructor;
        default: {};
    };
    openModal: {
        type: import('vue').PropType<boolean>;
    };
}>> & Readonly<{
    "onUpdate:openModal"?: ((value: boolean | undefined) => any) | undefined;
}>, {
    currentMember: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
