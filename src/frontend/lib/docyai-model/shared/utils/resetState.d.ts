import { PdfState } from '..';
export declare const resetState: (state: PdfState, renderQueue: Record<number, boolean>) => void;
export declare const clearAllCanvases: (state: PdfState) => void;
export declare const calculateFontSize: (item: any) => number;
export declare const isValidSelectionData: (item: any) => boolean;
export declare const downloadAsJSON: (data: any, filename: string) => void;
