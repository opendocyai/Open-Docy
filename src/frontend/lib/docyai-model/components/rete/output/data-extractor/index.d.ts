type __VLS_Props = {
    data: object | any;
    formType: string;
};
declare const __VLS_defaultModels: {
    current: number;
    pageSize: number;
    total: number;
};
type __VLS_ModelProps = {
    "current"?: typeof __VLS_defaultModels['current'];
    "pageSize"?: typeof __VLS_defaultModels['pageSize'];
    "total"?: typeof __VLS_defaultModels['total'];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:current": (value: number) => any;
    "update:pageSize": (value: number) => any;
    "update:total": (value: number) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:current"?: ((value: number) => any) | undefined;
    "onUpdate:pageSize"?: ((value: number) => any) | undefined;
    "onUpdate:total"?: ((value: number) => any) | undefined;
}>, {
    data: object | any;
    formType: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
