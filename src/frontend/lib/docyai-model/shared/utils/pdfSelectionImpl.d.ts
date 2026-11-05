import { PdfSelection, PdfSelectionStyle } from '..';
export declare class PdfSelectionImpl implements PdfSelection {
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
    keepTransparent: boolean;
    isImageSelection: boolean;
    imageData?: string;
    style?: PdfSelectionStyle;
    checked?: boolean;
    name?: string;
    id?: string;
    constructor(page: number, x: number, y: number, width: number, height: number, color: string, canvasCoords: number[], pdfCoords: number[], textContent?: string, fontSize?: number, fullContent?: string, textStyles?: string[], lineHeight?: number, charSpacing?: number, fontName?: string, customContent?: string, isContentEditable?: boolean, isImageSelection?: boolean, imageData?: string, keepTransparent?: boolean, style?: PdfSelectionStyle, checked?: boolean, name?: string, id?: string);
}
