import { Ref, ShallowRef } from 'vue';
export interface PdfState {
    pdfDoc: any;
    scale: Ref<number>;
    selectionMode: Ref<boolean>;
    isSelecting: Ref<boolean>;
    isDragging: Ref<boolean>;
    selections: Ref<PdfSelection[] | any[]>;
    currentSelection: Ref<PdfSelection | null>;
    startPos: Ref<PdfPosition>;
    currentPage: Ref<number | null>;
    activeSelectionIndex: Ref<number | null>;
    dragOffset: Ref<PdfPosition>;
    canvasRefs: Ref<Record<number, HTMLCanvasElement>>;
    pages: ShallowRef<any[]>;
    viewerContainer: Ref<HTMLElement | null>;
    renderQuality: number;
    originalCanvasImages: Record<number, HTMLCanvasElement>;
    selectionListContainer: Ref<HTMLElement | null>;
    renderQueue: PdfRenderQueue;
    animationFrameId: number | null;
    copiedSelections: PdfSelection[];
    editingSelectionIndex: Ref<number | null>;
    customText: Ref<string>;
    enableDoubleClickEdit: Ref<boolean>;
    enableContentEditing: Ref<boolean>;
    showContentEditor: Ref<boolean>;
    isImage: Ref<boolean>;
    imageUrl: Ref<string | null>;
    fileInputRef: Ref<HTMLInputElement | null>;
    isLoading: Ref<boolean>;
    maxImageWidth: Ref<number | null>;
    files: Ref<File[]>;
    currentFileIndex: Ref<number>;
    imageFiles: Ref<File[]>;
    pdfFile: Ref<File | null>;
    imagePages: Ref<ImagePages[]>;
    isResizing: Ref<boolean>;
    resizeStartX: Ref<number>;
    resizeStartY: Ref<number>;
    originalSelectionWidth: Ref<number>;
    originalSelectionHeight: Ref<number>;
    resizeDirection: Ref<string | null>;
    originalSelectionOnResize: Ref<PdfSelection | null>;
    hoveredSelectionIndex: Ref<number | null>;
    isHoveringResizeHandle: Ref<boolean>;
    loadingProgress: Ref<number>;
    isInitialRenderComplete: Ref<boolean>;
}
export interface PdfRenderQueue {
    [pageNumber: number]: boolean;
}
export interface PdfPosition {
    x: number;
    y: number;
}
export interface ImagePages {
    imageUrl: string;
    width: number;
    height: number;
    naturalWidth: number;
    naturalHeight: number;
}
export interface PdfPage {
    pageNumber: number;
    viewport: any;
    canvas?: HTMLCanvasElement;
}
export interface PdfSelection {
    page: number;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    canvasCoords: number[];
    pdfCoords: number[];
    textContent: string;
    fontSize: number;
    fullContent: string;
    textStyles: string[];
    lineHeight: number;
    charSpacing: number;
    fontName: string;
    customContent: string;
    isContentEditable: boolean;
    isImageSelection: boolean;
    imageData?: string;
    keepTransparent: boolean;
    lastClickedCoords?: SelectionCoords;
    style?: PdfSelectionStyle;
    checked?: boolean;
    name?: string;
    id?: string;
}
export interface PdfExportData {
    index: number;
    page: number;
    coordinates: number[];
    text: string;
    fullText: string;
    customText: string;
    fontSize: number;
    lineHeight: number;
    charSpacing: number;
    textStyles: string[];
    color: string;
    isImageSelection: boolean;
    imageData?: string;
    metadata: {
        createdAt: string;
        document: string;
        pageCount: number;
    };
    style?: PdfSelectionStyle;
    checked?: boolean;
    name?: string;
    id?: string | number;
}
export interface PdfSelectionStyle {
    font_name: string;
    font_size: number | string;
    text_color: string;
    border_color: string;
    border_style: string;
    border_width: number | string;
    background_color: string;
}
export interface SelectionCoords {
    x: number;
    y: number;
    x1: number;
    y1: number;
    width: number;
    height: number;
    pageNumber: number;
    canvasRect: DOMRect;
}
