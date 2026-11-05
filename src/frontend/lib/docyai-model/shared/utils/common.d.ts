import { PdfState, PdfSelection } from '..';
export declare const separateFilesByType: (files: File[]) => [File[], File[]];
export declare const separateUrlsByType: (urls: string[]) => [string[], string[]];
export declare const calculatePageDisplayDimensions: (state: PdfState, viewport: any) => {
    displayWidth: number;
    displayHeight: number;
    ratio: number;
};
export declare const saveOriginalCanvas: (state: PdfState, canvas: HTMLCanvasElement, pageNumber: number) => void;
export declare const hexToRgba: (color: string, alpha: number) => string;
export declare const drawEditingOverlay: (state: PdfState, context: CanvasRenderingContext2D, area: PdfSelection, x: number, y: number, width: number, height: number) => void;
export declare const wrapText: (context: CanvasRenderingContext2D, text: string, maxWidth: number, fontSize: number) => string[];
export declare const drawSelectionMetadata: (context: CanvasRenderingContext2D, area: PdfSelection, x: number, y: number) => void;
export declare const emptyTextContent: () => {
    textContent: string;
    fontSize: number;
    fullContent: string;
    textStyles: never[];
    lineHeight: number;
    charSpacing: number;
    fontName: string;
};
export declare const calculatePdfCoordinates: (state: PdfState, x1: number, y1: number, x2: number, y2: number, viewport: any, page: any) => [number, number, number, number];
export declare const updateLineMetrics: (itemY: number, itemHeight: number, lineMetrics: {
    [key: number]: number;
}) => void;
export declare const updateCharSpacing: (item: any, fontSizePt: number, charSpacingSum: number) => void;
export declare const detectTextStyles: (item: any, textStyles: Set<string>) => void;
export declare const isItemWithinBounds: (itemX: number, itemY: number, itemWidth: number, itemHeight: number, pdfX1: number, pdfY1: number, pdfX2: number, pdfY2: number) => boolean;
export declare const calculateAverageLineHeight: (lineMetrics: {
    [key: number]: number;
}) => number;
export declare const getItemMetrics: (item: any, page: any) => [number, number, number, number];
export declare const extractTextMetrics: (state: PdfState, textContent: any, pdfX1: number, pdfY1: number, pdfX2: number, pdfY2: number, page: any) => {
    textContent: string;
    fontSize: number;
    fullContent: string;
    textStyles: string[];
    lineHeight: number;
    charSpacing: number;
    fontName: string;
};
export declare const calculateCanvasCoordinates: (state: PdfState, pdfX1: number, pdfY1: number, pdfX2: number, pdfY2: number, page: any, viewport: any) => [number, number, number, number];
export declare const loadImageFile: (file: File) => Promise<HTMLImageElement>;
export declare const createVirtualImagePage: (index: number, width: number, height: number, naturalWidth: number, naturalHeight: number) => {
    pageNumber: number;
    getViewport: (options: {
        scale: number;
    }) => {
        width: number;
        height: number;
        scale: number;
        rotation: number;
        offsetX: number;
        offsetY: number;
    };
    render: () => {
        promise: Promise<void>;
    };
    getTextContent: () => Promise<{
        items: never[];
    }>;
    view: number[];
    _pageInfo: {
        view: number[];
    };
    naturalWidth: number;
    naturalHeight: number;
};
export declare const clearAllSelectionsFuc: (state: PdfState, scheduleRedraw: Function) => void;
export declare const clearLastSelectionFuc: (state: PdfState, scheduleRedraw: Function) => void;
export declare const isMouseOverResizeHandle: (state: PdfState, i: number, mouseX: number, mouseY: number) => boolean;
export declare const calculateNaturalCoordinates: (state: PdfState, selection: PdfSelection, pageNumber: number) => any[];
export declare const toProxyUrl: (url?: string | null) => string | undefined;
export declare const handleExportFile: (download_url: string | URL | Request, file_name?: string) => Promise<void>;
export declare const handleDownloadFile: (download_url: string, file_name: string) => Promise<void>;
