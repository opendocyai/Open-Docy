import type { PdfSelection, PdfSelectionStyle } from "@/shared";
import { genFileId } from '@/utils';

export class PdfSelectionImpl implements PdfSelection {
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
  constructor(
    page: number,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    canvasCoords: number[],
    pdfCoords: number[],
    textContent: string = "",
    fontSize: number = 0,
    fullContent: string = "",
    textStyles: string[] = [],
    lineHeight: number = 0,
    charSpacing: number = 0,
    fontName: string = "",
    customContent: string = "",
    isContentEditable: boolean = false,
    isImageSelection: boolean = false,
    imageData: string = "",
    keepTransparent: boolean = false,
    style: PdfSelectionStyle = {
      font_name: "",
      font_size: 12,
      text_color: "",
      border_color: "",
      border_style: "",
      border_width: 0,
      background_color: "",
    },
    checked: boolean = true,
    name: string = `Area-${genFileId()}`,
    id: string = "",
  ) {
    this.page = page;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.canvasCoords = canvasCoords;
    this.pdfCoords = pdfCoords;
    this.textContent = textContent;
    this.fontSize = fontSize;
    this.fullContent = fullContent;
    this.textStyles = textStyles;
    this.lineHeight = lineHeight;
    this.charSpacing = charSpacing;
    this.fontName = fontName;
    this.customContent = customContent;
    this.isContentEditable = isContentEditable;
    this.isImageSelection = isImageSelection;
    this.imageData = imageData;
    this.keepTransparent = keepTransparent;
    this.style = style;
    this.checked = checked;
    this.name = name;
    this.id = id;
  }
}

