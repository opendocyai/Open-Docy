type __VLS_Props = {
    list?: any[];
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    onChange: (...args: any[]) => void;
    newConversation: (...args: any[]) => void;
    onCloseList: (...args: any[]) => void;
    onDelete: (...args: any[]) => void;
    onInputEdit: (...args: any[]) => void;
    onNewConversation: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onOnChange?: ((...args: any[]) => any) | undefined;
    onNewConversation?: ((...args: any[]) => any) | undefined;
    onOnCloseList?: ((...args: any[]) => any) | undefined;
    onOnDelete?: ((...args: any[]) => any) | undefined;
    onOnInputEdit?: ((...args: any[]) => any) | undefined;
    onOnNewConversation?: ((...args: any[]) => any) | undefined;
}>, {
    list: any[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
