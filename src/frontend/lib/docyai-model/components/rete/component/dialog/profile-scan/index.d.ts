import { PdfSelection, PdfManagerType } from '../../../../../shared';
type __VLS_Props = {
    form: {
        profile_scan: PdfSelection[];
    };
    pdfViewer: PdfManagerType;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    goToPage: (...args: any[]) => void;
    handleListClick: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onGoToPage?: ((...args: any[]) => any) | undefined;
    onHandleListClick?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
