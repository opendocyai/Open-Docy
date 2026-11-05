type __VLS_Props = {
    formType: string;
    data: any;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {
    files_upload_edit: <T>(formType: string, data?: any) => Promise<[Error, undefined] | [null, T]> | {
        data: import('vue').Ref<null, null>;
        error: import('vue').Ref<string, string>;
    };
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    data: any;
    formType: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
