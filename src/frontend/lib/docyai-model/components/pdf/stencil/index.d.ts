import { PdfManagerType } from '../../../shared';
type __VLS_Props = {
    src: string | FileList | File[];
    pdfViewer?: PdfManagerType;
    scale?: number;
    showSidebar?: boolean;
    showToolbar?: boolean;
    btnOffset?: {
        x: number;
        y: number;
    };
    isShowBtn?: boolean;
    isShowZoomBtn?: boolean;
    showLeftSide?: boolean;
};
declare var __VLS_1: {}, __VLS_3: {}, __VLS_11: {
    page: any;
}, __VLS_13: {}, __VLS_15: {}, __VLS_17: {};
type __VLS_Slots = {} & {
    toolbar?: (props: typeof __VLS_1) => any;
} & {
    'left-side'?: (props: typeof __VLS_3) => any;
} & {
    'canvas-btn'?: (props: typeof __VLS_11) => any;
} & {
    sidebar?: (props: typeof __VLS_13) => any;
} & {
    'sidebar-footer'?: (props: typeof __VLS_15) => any;
} & {
    'right-side'?: (props: typeof __VLS_17) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    showStyleEditor: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onShowStyleEditor?: ((...args: any[]) => any) | undefined;
}>, {
    src: string | FileList | File[];
    scale: number;
    pdfViewer: PdfManagerType;
    showSidebar: boolean;
    showToolbar: boolean;
    btnOffset: {
        x: number;
        y: number;
    };
    isShowBtn: boolean;
    isShowZoomBtn: boolean;
    showLeftSide: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
