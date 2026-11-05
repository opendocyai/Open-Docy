type __VLS_Props = {
    item: any;
    dataAttrs?: any;
    options?: any;
};
declare const form: import('vue').ModelRef<any, string, any, any>;
type __VLS_ModelProps = {
    'form'?: typeof form['value'];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:form": (value: any) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:form"?: ((value: any) => any) | undefined;
}>, {
    options: any;
    item: any;
    dataAttrs: any;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
