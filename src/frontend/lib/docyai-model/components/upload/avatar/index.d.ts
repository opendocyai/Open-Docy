type __VLS_Props = {
    avatar?: string;
    userInfo?: any;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:avatar": (...args: any[]) => void;
    upload: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:avatar"?: ((...args: any[]) => any) | undefined;
    onUpload?: ((...args: any[]) => any) | undefined;
}>, {
    userInfo: any;
    avatar: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
