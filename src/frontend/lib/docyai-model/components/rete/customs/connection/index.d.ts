type __VLS_Props = {
    data: object | any;
    start: object | any;
    end: object | any;
    path: string;
    click: Function;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    click: (e: MouseEvent) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((e: MouseEvent) => any) | undefined;
}>, {
    data: object | any;
    path: string;
    click: Function;
    start: object | any;
    end: object | any;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
