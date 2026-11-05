declare const __VLS_defaultModels: {
    visible: boolean;
};
type __VLS_ModelProps = {
    "visible"?: typeof __VLS_defaultModels['visible'];
};
declare var __VLS_12: {}, __VLS_14: {}, __VLS_16: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_12) => any;
} & {
    default?: (props: typeof __VLS_14) => any;
} & {
    footer?: (props: typeof __VLS_16) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_ModelProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:visible": (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_ModelProps> & Readonly<{
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
