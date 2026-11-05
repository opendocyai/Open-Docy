import { isImageFile, genFileId } from "@/utils";
import type { PdfState, PdfSelection } from "@/shared";
import { calculateFontSize } from "@/shared";
import { getCodyAIConfig } from "@/core";
import { message } from "ant-design-vue";

export const separateFilesByType = (files: File[]): [File[], File[]] => {
  const pdfFiles = files.filter((file) => !isImageFile(file.name));
  const imageFiles = files.filter((file) => isImageFile(file.name));
  return [pdfFiles, imageFiles];
};

export const separateUrlsByType = (urls: string[]): [string[], string[]] => {
  const pdfUrls = urls.filter((url) => !isImageFile(url));
  const imageUrls = urls.filter((url) => isImageFile(url));
  return [pdfUrls, imageUrls];
};

export const calculatePageDisplayDimensions = (
  state: PdfState,
  viewport: any,
) => {
  let displayWidth = Math.floor(viewport.width);
  let displayHeight = Math.floor(viewport.height);

  if (
    state.isImage.value &&
    state.maxImageWidth.value &&
    displayWidth > state.maxImageWidth.value
  ) {
    const ratio = state.maxImageWidth.value / displayWidth;
    displayWidth = state.maxImageWidth.value;
    displayHeight = displayHeight * ratio;
  }

  return { displayWidth, displayHeight, ratio: displayWidth / viewport.width };
};

export const saveOriginalCanvas = (
  state: PdfState,
  canvas: HTMLCanvasElement,
  pageNumber: number,
) => {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext("2d");
  if (tempCtx) {
    tempCtx.drawImage(canvas, 0, 0);
    state.originalCanvasImages[pageNumber] = tempCanvas;
  }
};

export const hexToRgba = (color: string, alpha: number): string => {
  if (color.startsWith("hsl")) {
    return color.replace(")", `, ${alpha})`).replace("hsl", "hsla");
  }
  return color;
};

export const drawEditingOverlay = (
  state: PdfState,
  context: CanvasRenderingContext2D,
  area: PdfSelection,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  context.fillStyle = "rgba(255, 255, 255, 0.9)";
  context.fillRect(x + 5, y + 20, width - 10, height - 25);
  context.strokeStyle = area.color;
  context.lineWidth = 2;
  context.strokeRect(x + 5, y + 20, width - 10, height - 25);

  context.fillStyle = "#000";

  const lines = wrapText(context, state.customText.value, width - 20, 12);
  lines.forEach((line, i) => {
    context.fillText(line, x + 10, y + 35 + i * 15);
  });
};

export const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontSize: number,
): string[] => {
  const lines: string[] = [];
  const words = text.split(" ");
  let currentLine: string = words[0] || "";
  for (let i = 1; i < words.length; i++) {
    const word: any = words[i];
    const width = context.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  return lines;
};

export const drawSelectionMetadata = (
  context: CanvasRenderingContext2D,
  area: PdfSelection,
  x: number,
  y: number,
) => {
  if (area.fontSize) {
    context.fillText(`Size: ${area.fontSize.toFixed(1)}pt`, x + 5, y + 30);
  }
  if (area.lineHeight) {
    context.fillText(
      `Line height: ${area.lineHeight.toFixed(1)}pt`,
      x + 5,
      y + 45,
    );
  }
  if (area.fontName) {
    context.fillText(`Font: ${area.fontName}`, x + 5, y + 60);
  }
  if (area.textStyles.length > 0) {
    context.fillText(`Styles: ${area.textStyles.join(", ")}`, x + 5, y + 75);
  }
};

export const emptyTextContent = () => {
  return {
    textContent: "",
    fontSize: 0,
    fullContent: "",
    textStyles: [],
    lineHeight: 0,
    charSpacing: 0,
    fontName: "",
  };
};

export const calculatePdfCoordinates = (
  state: PdfState,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  viewport: any,
  page: any,
): [number, number, number, number] => {
  const pdfX1 = (x1 / (viewport.width * state.renderQuality)) * page.view[2];
  const pdfY1 = (y1 / (viewport.height * state.renderQuality)) * page.view[3];
  const pdfX2 = (x2 / (viewport.width * state.renderQuality)) * page.view[2];
  const pdfY2 = (y2 / (viewport.height * state.renderQuality)) * page.view[3];
  return [pdfX1, pdfY1, pdfX2, pdfY2];
};

export const updateLineMetrics = (
  itemY: number,
  itemHeight: number,
  lineMetrics: { [key: number]: number },
) => {
  const lineY = Math.round(itemY * 10) / 10;
  if (!lineMetrics[lineY]) {
    lineMetrics[lineY] = itemHeight;
  } else {
    lineMetrics[lineY] = Math.max(lineMetrics[lineY], itemHeight);
  }
};

export const updateCharSpacing = (
  item: any,
  fontSizePt: number,
  charSpacingSum: number,
) => {
  if (item.str.length > 1) {
    const actualWidth = item.width;
    const expectedWidth = item.str.length * fontSizePt;
    charSpacingSum += (actualWidth - expectedWidth) / (item.str.length - 1);
  }
};

export const detectTextStyles = (item: any, textStyles: Set<string>) => {
  if (item.fontName) {
    const fontName = item.fontName.toLowerCase();
    if (fontName.includes("bold") || fontName.includes("black"))
      textStyles.add("bold");
    if (fontName.includes("italic") || fontName.includes("oblique"))
      textStyles.add("italic");
    if (fontName.includes("underline")) textStyles.add("underline");
  }
};

export const isItemWithinBounds = (
  itemX: number,
  itemY: number,
  itemWidth: number,
  itemHeight: number,
  pdfX1: number,
  pdfY1: number,
  pdfX2: number,
  pdfY2: number,
) => {
  return (
    itemX >= pdfX1 &&
    itemX + itemWidth <= pdfX2 &&
    itemY >= pdfY1 &&
    itemY + itemHeight <= pdfY2
  );
};

export const calculateAverageLineHeight = (lineMetrics: {
  [key: number]: number;
}): number => {
  const lineHeights = Object.values(lineMetrics);
  return lineHeights.length > 0
    ? lineHeights.reduce((a, b) => a + b, 0) / lineHeights.length
    : 0;
};

export const getItemMetrics = (
  item: any,
  page: any,
): [number, number, number, number] => {
  const itemX = item.transform[4];
  const itemY = page.view[3] - item.transform[5];
  const itemWidth = item.width || 0;
  const itemHeight = item.ascent - item.descent || 0;
  return [itemX, itemY, itemWidth, itemHeight];
};

export const extractTextMetrics = (
  state: PdfState,
  textContent: any,
  pdfX1: number,
  pdfY1: number,
  pdfX2: number,
  pdfY2: number,
  page: any,
) => {
  let extractedText = "";
  let fullText = "";
  let fontSizeSum = 0;
  let lineHeightSum = 0;
  let charSpacingSum = 0;
  let count = 0;
  const textStyles: Set<string> = new Set();
  const lineMetrics: { [key: number]: number } = {};
  let detectedFontName = "";

  for (const item of textContent.items) {
    if (!item.transform || item.transform.length < 6) continue;

    const [itemX, itemY, itemWidth, itemHeight] = getItemMetrics(item, page);

    if (
      isItemWithinBounds(
        itemX,
        itemY,
        itemWidth,
        itemHeight,
        pdfX1,
        pdfY1,
        pdfX2,
        pdfY2,
      )
    ) {
      extractedText += item.str + (item.hasEOL ? "\n" : " ");

      const fontSizePt = calculateFontSize(item);
      if (fontSizePt > 0.5) {
        fontSizeSum += fontSizePt;
        count++;
      }

      detectedFontName = item.fontName || detectedFontName;
      updateLineMetrics(itemY, itemHeight, lineMetrics);
      updateCharSpacing(item, fontSizePt, charSpacingSum);
      detectTextStyles(item, textStyles);
    }

    if (!state.selectionMode.value) {
      fullText += item.str + (item.hasEOL ? "\n" : " ");
    }
  }

  return {
    textContent: extractedText.replace(/\s+/g, " ").trim(),
    fontSize: Math.round((fontSizeSum / count) * 10) / 10,
    fullContent: fullText.trim(),
    textStyles: Array.from(textStyles),
    lineHeight: calculateAverageLineHeight(lineMetrics),
    charSpacing: Math.round((charSpacingSum / count) * 100) / 100,
    fontName: detectedFontName,
  };
};

export const calculateCanvasCoordinates = (
  state: PdfState,
  pdfX1: number,
  pdfY1: number,
  pdfX2: number,
  pdfY2: number,
  page: any,
  viewport: any,
): [number, number, number, number] => {
  const x1 = (pdfX1 / page.view[2]) * (viewport.width * state.renderQuality);
  const y1 = (pdfY1 / page.view[3]) * (viewport.height * state.renderQuality);
  const x2 = (pdfX2 / page.view[2]) * (viewport.width * state.renderQuality);
  const y2 = (pdfY2 / page.view[3]) * (viewport.height * state.renderQuality);
  return [x1, y1, x2, y2];
};

export const loadImageFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

export const createVirtualImagePage = (
  index: number,
  width: number,
  height: number,
  naturalWidth: number,
  naturalHeight: number,
) => {
  return {
    pageNumber: index + 1,
    getViewport: (options: { scale: number }) => ({
      width: width * (options?.scale || 1),
      height: height * (options?.scale || 1),
      scale: options?.scale || 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
    }),
    render: () => ({ promise: Promise.resolve() }),
    getTextContent: () => Promise.resolve({ items: [] }),
    view: [0, 0, width, height],
    _pageInfo: {
      view: [0, 0, width, height],
    },
    naturalWidth,
    naturalHeight,
  };
};

export const clearAllSelectionsFuc = (
  state: PdfState,
  scheduleRedraw: Function,
) => {
  if (state.selections.value.length > 0) {
    const pagesToRedraw = new Set(state.selections.value.map((s) => s.page));
    state.selections.value = [];
    state.activeSelectionIndex.value = null;
    pagesToRedraw.forEach((pageNumber) => scheduleRedraw(pageNumber));
  }
};

export const clearLastSelectionFuc = (
  state: PdfState,
  scheduleRedraw: Function,
) => {
  if (state.selections.value.length > 0) {
    const lastSelection = state.selections.value.pop();
    if (lastSelection) {
      scheduleRedraw(lastSelection.page);
    }
    state.activeSelectionIndex.value = null;
  }
};

export const isMouseOverResizeHandle = (
  state: PdfState,
  i: number,
  mouseX: number,
  mouseY: number,
): boolean => {
  const selection = state.selections.value[i];
  const handleSize = 15 * state.renderQuality;
  const handleX = selection.x + selection.width - handleSize;
  const handleY = selection.y + selection.height - handleSize;

  return (
    mouseX >= handleX - 5 &&
    mouseX <= handleX + handleSize + 5 &&
    mouseY >= handleY - 5 &&
    mouseY <= handleY + handleSize + 5
  );
};

export const calculateNaturalCoordinates = (
  state: PdfState,
  selection: PdfSelection,
  pageNumber: number,
): any[] => {
  if (!state.isImage.value) {
    return [
      selection.pdfCoords[0],
      selection.pdfCoords[1],
      selection.pdfCoords[2],
      selection.pdfCoords[3],
    ];
  }

  const imagePage = state.imagePages.value[pageNumber - 1];
  if (!imagePage) return [0, 0, 0, 0];

  return [
    (selection.pdfCoords[0] || 0) * imagePage.naturalWidth,
    (selection.pdfCoords[1] || 0) * imagePage.naturalHeight,
    (selection.pdfCoords[2] || 0) * imagePage.naturalWidth,
    (selection.pdfCoords[3] || 0) * imagePage.naturalHeight,
  ];
};

const getApiOrigins = (): Set<string> => {
  const origins = new Set<string>();
  const add = (url?: string) => {
    if (!url || !/^https?:\/\//.test(url)) return;
    try {
      origins.add(new URL(url).origin);
    } catch {
    }
  };
  add(window.location.origin);
  add(import.meta.env.VITE_API_BASEURL);
  add(getCodyAIConfig()?.baseURL);
  return origins;
};

export const toProxyUrl = (url?: string | null): string | undefined => {
  if (!url) return url as undefined;
  if (!/^https?:\/\//.test(url)) return url;
  try {
    const parsed = new URL(url);
    if (getApiOrigins().has(parsed.origin)) {
      return parsed.pathname + parsed.search + parsed.hash;
    }
  } catch {
  }
  return url;
};

export const handleExportFile = async (
  download_url: string | URL | Request,
  file_name?: string,
) => {
  if (!download_url) {
    message.warning("File address not found");
    return;
  }

  try {
    const res = await fetch(download_url);
    if(!res.ok) return
    const blob = await res.blob();

    let finalFileName = file_name;

    if (!finalFileName) {
      const disposition = res.headers.get("Content-Disposition");
      if (disposition && disposition.includes("filename=")) {
        const match = disposition.match(/filename\*?=(?:UTF-8'')?([^;]+)/i);
        if (match && match[1]) {
          finalFileName = decodeURIComponent(match[1].replace(/["']/g, ""));
        }
      }
    }

    if (!finalFileName) {
      const urlObj = new URL(download_url.toString());
      const pathname = urlObj.pathname;
      finalFileName = pathname.substring(pathname.lastIndexOf("/") + 1);
    }

    if (!finalFileName) {
      finalFileName = genFileId();
    }

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = finalFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading file:", error);
    message.error("Error downloading file");
  }
};

export const handleDownloadFile = async (
  download_url: string,
  file_name: string,
) => {
  try {
    if (!download_url) {
      message.warning("File address not found");
      return;
    }

    const res = await fetch(download_url, { mode: "cors" });
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = file_name || genFileId();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error: any) {
    message.error("Error downloading file:", error);
  }
};
