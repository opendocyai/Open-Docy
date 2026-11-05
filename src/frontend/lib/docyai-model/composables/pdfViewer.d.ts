import { PdfManagerType, PdfManager } from '../shared';
export declare const usePdfViewer: (isIndependent?: boolean) => {
    pdfViewerInstance: (initialScale?: number) => PdfManagerType;
    pdfManager: import('vue').ShallowRef<PdfManager | null, PdfManager | null>;
    scale: import('vue').Ref<number, number>;
};
