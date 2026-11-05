import type {
  PdfState,
  PdfSelection,
  PdfSelectionStyle,
  SelectionCoords,
  PdfExportData,
} from "@/shared";
import {
  resetState,
  separateUrlsByType,
  separateFilesByType,
  createVirtualImagePage,
  loadImageFile,
  calculatePageDisplayDimensions,
  hexToRgba,
  emptyTextContent,
  calculatePdfCoordinates,
  PdfSelectionImpl,
  isMouseOverResizeHandle,
  clearLastSelectionFuc,
  clearAllSelectionsFuc,
  calculateCanvasCoordinates,
  downloadAsJSON,
  isValidSelectionData,
  calculateNaturalCoordinates,
  extractTextMetrics,
  saveOriginalCanvas,
  drawEditingOverlay,
  drawSelectionMetadata,
} from "@/shared";
import { isDataURL, isImageFile, pdfjsLib } from "@/utils";
import { markRaw, nextTick, ref, type Ref } from "vue";

type PdfBinary = Uint8Array | ArrayBuffer;

export class PdfMethods {
  public state: PdfState;
  public renderQueue: Record<number, boolean> = {};
  public animationFrameId: number | null = null;
  private loadCompleteListeners: Array<() => void> = [];
  private debounceTimeout: number | null = null;

  constructor(state: PdfState) {
    this.state = state;
  }

  public onLoadComplete(callback: () => void) {
    this.loadCompleteListeners.push(callback);
  }

  public offLoadComplete(callback: () => void) {
    this.loadCompleteListeners = this.loadCompleteListeners.filter(
      (cb) => cb !== callback,
    );
  }

  private notifyLoadComplete() {
    this.state.isInitialRenderComplete.value = true;
    this.loadCompleteListeners.forEach((callback) => callback());
  }

  private checkAllPagesRendered() {
    if (this.state.isImage.value) {
      const allRendered = this.state.imagePages.value.every((_, index) => {
        return this.state.canvasRefs.value[index] !== undefined;
      });

      if (allRendered) {
        this.notifyLoadComplete();
      }
    } else {
      const allRendered = this.state.pages.value.every((_, index) => {
        return this.state.canvasRefs.value[index + 1] !== undefined;
      });

      if (allRendered) {
        this.notifyLoadComplete();
      }
    }
    console.log("Render complete=checkAllPagesRendered==========================");
  }

  public async loadSource(
    source: string | File | string[] | FileList | File[] | PdfBinary,
  ) {
    try {
      console.log(source, "source");
      console.log("Render start--loadSource===========");
      resetState(this.state, this.renderQueue);
      this.state.isInitialRenderComplete.value = false;
      this.state.loadingProgress.value = 0;
      if (typeof source === "string") {
        await this.handleStringSource(source);
      } else if (source instanceof File) {
        await this.handleFilesUpload([source]);
      } else if (source instanceof Uint8Array) {
        await this.loadDataPdf(source);
      } else if (source instanceof ArrayBuffer) {
        await this.loadDataPdf(new Uint8Array(source));
      } else if (Array.isArray(source)) {
        if (source.every((file) => file instanceof File)) {
          await this.handleFilesUpload(source);
        } else if (source.every((file) => typeof file === "string")) {
          await this.handleMultipleUrlSources(source as string[]);
        } else if (source instanceof FileList) {
          await this.handleFilesUpload(Array.from(source));
        } else if (source instanceof Uint8Array) {
          await this.loadDataPdf(source);
        } else if (source instanceof ArrayBuffer) {
          await this.loadDataPdf(new Uint8Array(source));
        }
      }

      this.state.loadingProgress.value = 100;
      this.notifyLoadComplete();
      console.log("Render complete--loadSource===========");
    } catch (error) {
      console.error("Error loading source:", error);
      throw error;
    }
  }

  private async handleMultipleUrlSources(urls: string[]) {
    this.state.isLoading.value = true;

    console.log(this.state.isLoading.value, "11111this.state.isLoading.value");

    try {
      resetState(this.state, this.renderQueue);

      const [pdfUrls, imageUrls] = separateUrlsByType(urls);

      console.log("pdfUrls", pdfUrls);
      console.log("imageUrls", imageUrls);

      if (pdfUrls.length > 0) {
        if (pdfUrls.length > 1) {
          console.warn(
            "Only one PDF can be loaded at a time. Using first PDF.",
          );
        }
        await this.loadPdf(pdfUrls[0] as string);
      }

      if (imageUrls.length > 0) {
        this.state.isImage.value = true;
        await this.loadMultipleImages(imageUrls);
      }
    } finally {
      this.state.isLoading.value = false;

      console.log(this.state.isLoading.value, "222222.isLoading.value");
    }
  }

  private async handleStringSource(source: string) {
    if (isDataURL(source)) {
      await this.handleDataURL(source);
    } else if (isImageFile(source)) {
      await this.loadImage(source);
    } else {
      await this.loadPdf(source);
    }
  }

  private async handleDataURL(dataURL: string) {
    if (
      dataURL.startsWith("data:application/pdf") ||
      dataURL.includes("application/pdf")
    ) {
      await this.loadPdf(dataURL);
    } else if (dataURL.startsWith("data:image/")) {
      await this.loadImage(dataURL);
    } else {
      throw new Error("Unsupported data URL type");
    }
  }

  private async handleFilesUpload(files: FileList | File[]) {
    this.state.isLoading.value = true;
    try {
      const filesArray = files instanceof FileList ? Array.from(files) : files;
      if (filesArray.length === 0) return;

      resetState(this.state, this.renderQueue);
      const [pdfFiles, imageFiles] = separateFilesByType(filesArray);

      console.log("pdfFiles", pdfFiles);
      console.log("imageFiles", imageFiles);

      if (pdfFiles.length > 0) {
        await this.handlePdfFiles(pdfFiles);
      }

      if (imageFiles.length > 0) {
        await this.handleImageFiles(imageFiles);
      }
    } finally {
      this.state.isLoading.value = false;
    }
  }

  private async handlePdfFiles(pdfFiles: File[]) {
    if (pdfFiles.length > 1) {
      console.warn("Only one PDF can be loaded at a time. Using first PDF.");
    }
    await this.loadPdf(URL.createObjectURL(pdfFiles[0] as File));
  }

  private async handleImageFiles(imageFiles: File[]) {
    this.state.isImage.value = true;
    this.state.imageFiles.value = imageFiles;
    await this.renderImagePages();
  }

  private loadImageToCanvas(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  private async loadMultipleImages(imageUrls: string[]) {
    try {
      this.state.imageFiles.value = [];
      this.state.imagePages.value = [];

      this.state.isLoading.value = true;

      let imageLoadPromises: any[] = [];
      for (const url of imageUrls) {
        console.log(url, "url-----url");
        const img = await this.loadImageToCanvas(url);
        console.log(img, "img-----img");
        imageLoadPromises.push({
          imageUrl: url,
          width: img.width,
          height: img.height,
          naturalWidth: img.width,
          naturalHeight: img.height,
        });
      }

      this.state.imagePages.value = await Promise.all(imageLoadPromises);

      this.state.pages.value = this.state.imagePages.value.map((img, index) =>
        createVirtualImagePage(
          index,
          img.width,
          img.height,
          img.width,
          img.height,
        ),
      );

      await nextTick();

      const renderQueue = this.state.pages.value.map(
        (page) => () => this.renderPage(page),
      );

      for (const render of renderQueue) {
        await render();
        await nextTick();
      }
    } catch (error) {
      console.error("Failed to load multiple images:", error);
      throw error;
    } finally {
      this.state.isLoading.value = false;
    }
  }

  private async renderImagePages(): Promise<void> {
    this.state.pages.value = [];
    this.state.imagePages.value = [];

    try {
      const imageLoadPromises = this.state.imageFiles.value.map(
        async (file) => {
          const img = await loadImageFile(file);
          return {
            imageUrl: URL.createObjectURL(file),
            width: img.width,
            height: img.height,
            naturalWidth: img.width,
            naturalHeight: img.height,
          };
        },
      );

      this.state.imagePages.value = await Promise.all(imageLoadPromises);

      this.state.pages.value = this.state.imagePages.value.map((img, index) =>
        createVirtualImagePage(
          index,
          img.width,
          img.height,
          img.naturalWidth,
          img.naturalHeight,
        ),
      );

      await nextTick();

      const renderQueue = this.state.pages.value.map(
        (page) => () => this.renderPage(page),
      );

      for (const render of renderQueue) {
        await render();
        await nextTick();
      }
    } catch (error) {
      console.error("Failed to render image page:", error);
      this.state.imagePages.value.forEach((img) => {
        URL.revokeObjectURL(img.imageUrl);
      });
      throw error;
    }
  }

  private async loadImage(src: string) {
    this.state.isImage.value = true;
    await this.loadMultipleImages([src]);
  }

  private async loadDataPdf(data: PdfBinary) {
    try {
      const loadingTask = pdfjsLib.getDocument({
        data,
        disableAutoFetch: true,
        disableStream: true,
        disableFontFace: false,
        useSystemFonts: true,
        verbosity: 0,
        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
        cMapPacked: true,
        standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/standard_fonts/`,
      });
      this.state.pdfDoc = await loadingTask.promise;
      await this.preloadAllPages();
    } catch (err) {
      console.error("PDF loading error:", err);
      await this.fallbackLoadDataPdf(data);
    }
  }

  private async fallbackLoadDataPdf(data: PdfBinary) {
    try {
      const loadingTask = pdfjsLib.getDocument({
        data,
        disableAutoFetch: true,
        disableStream: true,
        disableFontFace: true,
        useSystemFonts: true,
        verbosity: 0,
        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
        cMapPacked: true,
        standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/standard_fonts/`,
      });

      this.state.pdfDoc = await loadingTask.promise;
      await this.preloadAllPages();
    } catch (err) {
      console.error("Fallback PDF load method also failed:", err);
      throw err;
    }
  }
  private async loadPdf(src: string) {
    try {
      const loadingTask = pdfjsLib.getDocument({
        url: src,
        disableAutoFetch: true,
        disableStream: true,
        disableFontFace: false,
        useSystemFonts: true,
        verbosity: 0,
      });
      this.state.pdfDoc = await loadingTask.promise;
      await this.preloadAllPages();
    } catch (err) {
      console.error("PDF loading error:", err);
      await this.fallbackLoadPdf(src);
    }
  }

  private async fallbackLoadPdf(src: string): Promise<void> {
    try {
      const loadingTask = pdfjsLib.getDocument({
        url: src,
        disableAutoFetch: true,
        disableStream: true,
        disableFontFace: true,
        useSystemFonts: true,
        verbosity: 0,
      });

      this.state.pdfDoc = await loadingTask.promise;
      await this.preloadAllPages();
    } catch (err) {
      console.error("Fallback PDF load method also failed:", err);
      throw err;
    }
  }

  private async preloadAllPages() {
    const pagePromises = [];
    for (let i = 1; i <= this.state.pdfDoc.numPages; i++) {
      pagePromises.push(this.loadPage(i));
    }
    await Promise.all(pagePromises);
  }

  private async loadPage(pageNumber: number) {
    const page = await this.state.pdfDoc.getPage(pageNumber);

    const rawPage = markRaw(page);

    this.state.pages.value[pageNumber - 1] = rawPage;
    await this.renderPage(rawPage);
  }

  private async renderPage(page: any): Promise<void> {
    const pageNumber = page.pageNumber;
    await nextTick();

    const canvas = this.state.canvasRefs.value[pageNumber];
    if (!canvas) return;

    const scale = this.state.scale.value;
    const viewport = page.getViewport({ scale });

    const { displayWidth, displayHeight } = calculatePageDisplayDimensions(
      this.state,
      viewport,
    );

    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    canvas.width = Math.floor(displayWidth * this.state.renderQuality);
    canvas.height = Math.floor(displayHeight * this.state.renderQuality);

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    try {
      context.save();
      context.scale(this.state.renderQuality, this.state.renderQuality);
      context.fillStyle = "rgb(255, 255, 255)";
      context.fillRect(0, 0, displayWidth, displayHeight);

      if (this.state.isImage.value) {
        await this.renderImagePage(
          pageNumber,
          context,
          displayWidth,
          displayHeight,
          scale,
        );
      } else {
        await this.renderPdfPage(
          page,
          context,
          displayWidth,
          displayHeight,
          scale,
        );
      }

      saveOriginalCanvas(this.state, canvas, pageNumber);
    } catch (error) {
      console.error(`Error rendering page ${pageNumber}:`, error);
    } finally {
      context.restore();
      this.checkAllPagesRendered();
      this.scheduleRedraw(pageNumber);
    }
  }

  private async renderImagePage(
    pageNumber: number,
    context: CanvasRenderingContext2D,
    displayWidth: number,
    displayHeight: number,
    scale: number,
  ) {
    const imagePage = this.state.imagePages.value[pageNumber - 1];
    if (!imagePage) return;

    const img = new Image();
    img.src = imagePage.imageUrl;

    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });

    const canvasRatio = displayWidth / displayHeight;
    const imgRatio = imagePage.naturalWidth / imagePage.naturalHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawHeight = displayHeight;
      drawWidth =
        (imagePage.naturalWidth * displayHeight) / imagePage.naturalHeight;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = displayWidth;
      drawHeight =
        (imagePage.naturalHeight * displayWidth) / imagePage.naturalWidth;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    }

    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  private async renderPdfPage(
    page: any,
    context: CanvasRenderingContext2D,
    displayWidth: number,
    displayHeight: number,
    scale: number,
  ) {
    const rawPage = (page as any).__v_raw || page;

    if (!rawPage) {
      console.error("Invalid page object");
      return;
    }

    const viewport = rawPage.getViewport({
      scale: scale,
    });

    try {
      context.fillStyle = "rgb(255, 255, 255)";
      context.fillRect(0, 0, displayWidth, displayHeight);

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        intent: "display",
      };
      await new Promise<void>((resolve) => {
        const renderTask = rawPage.render(renderContext);

        renderTask.promise
          .then(() => resolve())
          .catch((error: any) => {
            console.error("PDF rendering failed:", error);
            context.fillStyle = "rgb(255, 255, 255)";
            context.fillRect(0, 0, displayWidth, displayHeight);
            resolve();
          });
      });
    } catch (error) {
      console.error("PDF page rendering error:", error);
      context.fillStyle = "rgb(255, 255, 255)";
      context.fillRect(0, 0, displayWidth, displayHeight);
    }
  }

  private async fallbackRenderPdfPage(
    page: any,
    context: CanvasRenderingContext2D,
    viewport: any,
  ): Promise<void> {
    return new Promise((resolve) => {
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        intent: "display",
      };

      const timeout = setTimeout(() => {
        console.warn("PDF rendering timed out");
        resolve();
      }, 5000);

      page
        .render(renderContext)
        .promise.then(() => {
          clearTimeout(timeout);
          resolve();
        })
        .catch(() => {
          clearTimeout(timeout);
          resolve();
        });
    });
  }

  public scheduleRedraw(pageNumber: number) {
    this.renderQueue[pageNumber] = true;
    if (this.animationFrameId === null) {
      this.animationFrameId = requestAnimationFrame(async () => {
        await this.processRenderQueue();
        this.animationFrameId = null;
      });
    }
  }

  private async processRenderQueue() {
    for (const pageNumber in this.renderQueue) {
      if (this.renderQueue[pageNumber]) {
        await this.redrawPage(parseInt(pageNumber));
        this.renderQueue[pageNumber] = false;
      }
    }
  }

  public async redrawPage(pageNumber: number) {
    try {
      const canvas = this.state.canvasRefs.value[pageNumber];
      if (!canvas) {
        console.warn(`Canvas for page ${pageNumber} not found during redraw`);
        return;
      }

      const context = canvas.getContext("2d");
      if (!context) {
        console.warn(`Unable to get 2D context for page ${pageNumber}`);
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      const originalCanvas = this.state.originalCanvasImages[pageNumber];
      if (originalCanvas) {
        context.drawImage(originalCanvas, 0, 0);
      } else {
        const page = this.state.pages.value[pageNumber - 1];
        if (page) {
          await this.renderPage(page);
          return;
        }
      }

      this.drawSelections(context, pageNumber);
    } catch (error) {
      console.error(`Error redrawing page ${pageNumber}:`, error);
    }
  }

  private drawSelections(
    context: CanvasRenderingContext2D,
    pageNumber: number,
  ) {
    context.save();
    context.scale(this.state.renderQuality, this.state.renderQuality);

    this.state.selections.value
      .filter((area) => area.page === pageNumber)
      .forEach((area) => {
        const globalIndex = this.state.selections.value.findIndex(
          (s) => s === area,
        );
        this.drawSelectionBox(context, area, globalIndex);
      });

    if (
      this.state.isSelecting.value &&
      this.state.currentSelection.value &&
      this.state.currentSelection.value.page === pageNumber
    ) {
      this.drawSelectionBox(
        context,
        this.state.currentSelection.value,
        this.state.selections.value.length,
      );
    }

    context.restore();
  }

  private drawSelectionBox(
    context: CanvasRenderingContext2D,
    area: PdfSelection,
    index: number,
  ) {
    const x = area.x / this.state.renderQuality;
    const y = area.y / this.state.renderQuality;
    const width = area.width / this.state.renderQuality;
    const height = area.height / this.state.renderQuality;

    const isActive = this.state.activeSelectionIndex.value === index;
    const isEditing = this.state.editingSelectionIndex.value === index;

    context.fillStyle = hexToRgba(
      area.color,
      isActive || isEditing ? 0.3 : 0.2,
    );
    context.fillRect(x, y, width, height);

    context.strokeStyle = area.color;
    context.lineWidth = isActive || isEditing ? 3 : 2;
    context.setLineDash(isActive || isEditing ? [] : [5, 5]);
    context.strokeRect(x, y, width, height);
    context.setLineDash([]);

    if (isActive) {
      this.resizeCanvas(context, area, width, height, x, y);
    }

    if (!(area.isImageSelection && area.keepTransparent)) {
      this.drawSelectionContent(
        context,
        area,
        index,
        x,
        y,
        width,
        height,
        isEditing,
      );
    }
  }

  public resizeCanvas(
    context: CanvasRenderingContext2D,
    area: PdfSelection,
    width: number,
    height: number,
    x: number,
    y: number,
  ) {
    const handleSize = 10;
    const handleX = x + width - handleSize;
    const handleY = y + height - handleSize;

    context.fillStyle = area.color;
    context.fillRect(handleX, handleY, handleSize, handleSize);

    context.strokeStyle = "white";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(handleX + 2, handleY + handleSize - 2);
    context.lineTo(handleX + handleSize - 2, handleY + 2);
    context.moveTo(handleX + handleSize / 2, handleY + handleSize - 2);
    context.lineTo(handleX + handleSize - 2, handleY + handleSize / 2);
    context.stroke();
  }

  private drawSelectionContent(
    context: CanvasRenderingContext2D,
    area: PdfSelection,
    index: number,
    x: number,
    y: number,
    width: number,
    height: number,
    isEditing: boolean,
  ) {
    const displayText = area.customContent || area.textContent;
    if (displayText && this.state.showContentEditor.value) {
      context.fillStyle = area.color;
      context.font = "bold 12px Arial";

      const shortText =
        displayText.length > 20
          ? displayText.substring(0, 20) + "..."
          : displayText;

      context.fillText(`${index + 1}: ${shortText}`, x + 5, y + 15);

      if (isEditing && this.state.showContentEditor.value) {
        drawEditingOverlay(this.state, context, area, x, y, width, height);
      } else {
        drawSelectionMetadata(context, area, x, y);
      }
    }
  }

  private async getTextContent(
    pageNumber: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) {
    const page = this.state.pages.value[pageNumber - 1];
    if (!page) return emptyTextContent();

    try {
      const textContent = await page.getTextContent();
      const viewport = page.getViewport({ scale: this.state.scale.value });

      const [pdfX1, pdfY1, pdfX2, pdfY2] = calculatePdfCoordinates(
        this.state,
        x1,
        y1,
        x2,
        y2,
        viewport,
        page,
      );
      return extractTextMetrics(
        this.state,
        textContent,
        pdfX1,
        pdfY1,
        pdfX2,
        pdfY2,
        page,
      );
    } catch (error) {
      console.error("Text extraction error:", error);
      return emptyTextContent();
    }
  }

  private cancelSelection() {
    this.state.isSelecting.value = false;
    this.state.isDragging.value = false;
    if (this.state.currentPage.value) {
      this.scheduleRedraw(this.state.currentPage.value);
    }
    this.state.currentPage.value = null;
    this.state.currentSelection.value = null;
    this.state.activeSelectionIndex.value = null;
  }

  public toggleSelectionMode() {
    this.state.selectionMode.value = !this.state.selectionMode.value;
    if (!this.state.selectionMode.value) {
      this.cancelSelection();
    }
  }

  public setSelectionMode(enabled: boolean) {
    this.state.selectionMode.value = enabled;
    if (!this.state.selectionMode.value) {
      this.cancelSelection();
    }
  }

  public findSelectionAtPosition(
    pageNumber: number,
    x: number,
    y: number,
  ): number | null {
    for (let i = 0; i < this.state.selections.value.length; i++) {
      const sel: any = this.state.selections.value[i];
      if (
        sel.page === pageNumber &&
        x >= sel.x &&
        x <= sel.x + sel.width &&
        y >= sel.y &&
        y <= sel.y + sel.height
      ) {
        return i;
      }
    }
    return null;
  }

  public isMouseOverResizeHandle(
    pageNumber: number,
    mouseX: number,
    mouseY: number,
  ): boolean {
    return isMouseOverResizeHandle(this.state, pageNumber, mouseX, mouseY);
  }

  public startEditingSelection(index: number) {
    if (!this.state.showContentEditor.value) return;

    if (index >= 0 && index < this.state.selections.value.length) {
      this.state.editingSelectionIndex.value = index;
      this.state.customText.value =
        this.state.selections.value[index]?.customContent ||
        this.state.selections.value[index]?.textContent ||
        "";
      this.scheduleRedraw(this.state.selections.value[index]?.page || 1);
    }
  }

  public cancelEditingSelection() {
    if (this.state.editingSelectionIndex.value !== null) {
      const page =
        this.state.selections.value[this.state.editingSelectionIndex.value]
          ?.page || 1;
      this.state.editingSelectionIndex.value = null;
      this.state.customText.value = "";
      this.scheduleRedraw(page);
    }
  }

  public finishEditingSelection() {
    if (!this.state.enableContentEditing.value) {
      console.warn("Content editing is disabled");
      return;
    }

    if (this.state.editingSelectionIndex.value !== null) {
      const index = this.state.editingSelectionIndex.value;
      if (index >= 0 && index < this.state.selections.value.length) {
        this.state.selections.value[index].customContent =
          this.state.customText.value;
        this.scheduleRedraw(this.state.selections.value[index].page);
      }
      this.state.editingSelectionIndex.value = null;
      this.state.customText.value = "";
    }
  }

  private updatePdfCoordinates(index: number) {
    const selection: PdfSelection | any = this.state.selections.value[index];
    const pageNumber = selection.page;

    const topLeft = this.getPdfCoordinates(
      selection.x,
      selection.y,
      pageNumber,
    );
    const bottomRight = this.getPdfCoordinates(
      selection.x + selection.width,
      selection.y + selection.height,
      pageNumber,
    );

    this.state.selections.value[index].pdfCoords = [
      topLeft.pdfX,
      topLeft.pdfY,
      bottomRight.pdfX,
      bottomRight.pdfY,
    ];
  }

  public async createSelectionFromCurrent(
    pageNumber: number,
  ): Promise<PdfSelection> {
    if (!this.state.currentSelection.value)
      throw new Error("No current selection");

    const canvas = this.state.canvasRefs.value[pageNumber];
    if (!canvas) throw new Error("Canvas not found");

    const { clampedX, clampedY, clampedWidth, clampedHeight } =
      this.clampSelectionCoordinates(this.state.currentSelection.value, canvas);

    if (this.state.isImage.value) {
      return this.createImageSelection(
        pageNumber,
        clampedX,
        clampedY,
        clampedWidth,
        clampedHeight,
        canvas,
      );
    }

    return this.createTextSelection(
      pageNumber,
      clampedX,
      clampedY,
      clampedWidth,
      clampedHeight,
    );
  }

  private createImageSelection(
    pageNumber: number,
    x: number,
    y: number,
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
  ): PdfSelection {
    const imagePage = this.state.imagePages.value[pageNumber - 1];
    if (!imagePage) {
      throw new Error("Image page not found");
    }

    const canvasRect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / canvasRect.width;
    const scaleY = canvas.height / canvasRect.height;

    const canvasX = x / scaleX;
    const canvasY = y / scaleY;
    const canvasWidth = width / scaleX;
    const canvasHeight = height / scaleY;

    const displayWidth = canvasRect.width;
    const displayHeight = canvasRect.height;
    const imgRatio = imagePage.naturalWidth / imagePage.naturalHeight;

    let imgDisplayWidth, imgDisplayHeight, imgOffsetX, imgOffsetY;

    if (displayWidth / displayHeight > imgRatio) {
      imgDisplayHeight = displayHeight;
      imgDisplayWidth = imgRatio * displayHeight;
      imgOffsetX = (displayWidth - imgDisplayWidth) / 2;
      imgOffsetY = 0;
    } else {
      imgDisplayWidth = displayWidth;
      imgDisplayHeight = displayWidth / imgRatio;
      imgOffsetX = 0;
      imgOffsetY = (displayHeight - imgDisplayHeight) / 2;
    }

    const naturalX =
      ((canvasX - imgOffsetX) / imgDisplayWidth) * imagePage.naturalWidth;
    const naturalY =
      ((canvasY - imgOffsetY) / imgDisplayHeight) * imagePage.naturalHeight;
    const naturalWidth =
      (canvasWidth / imgDisplayWidth) * imagePage.naturalWidth;
    const naturalHeight =
      (canvasHeight / imgDisplayHeight) * imagePage.naturalHeight;

    return new PdfSelectionImpl(
      pageNumber,
      x,
      y,
      width,
      height,
      this.state.currentSelection.value?.color || this.getRandomColor(),
      [x, y, x + width, y + height],
      [
        naturalX / imagePage.naturalWidth,
        naturalY / imagePage.naturalHeight,
        (naturalX + naturalWidth) / imagePage.naturalWidth,
        (naturalY + naturalHeight) / imagePage.naturalHeight,
      ],
      "",
      0,
      "",
      [],
      0,
      0,
      "",
      "",
      false,
      true,
      "",
      true,
    );
  }

  public setSelectionStyle(pageNumber: number, style: PdfSelectionStyle) {
    if (this.state.activeSelectionIndex.value !== null) {
      const selection =
        this.state.selections.value[this.state.activeSelectionIndex.value];
      if (selection.page !== pageNumber) return;
      selection.style = style;
    } else if (this.state.selections.value.length) {
      const selection =
        this.state.selections.value[this.state.selections.value.length - 1];
      if (selection.page !== pageNumber) return;
      selection.style = style;
    }
  }

  public setPdfSelection(pageNumber: number, options: object) {
    if (this.state.activeSelectionIndex.value !== null) {
      const selection =
        this.state.selections.value[this.state.activeSelectionIndex.value];
      if (selection.page !== pageNumber) return;
      this.state.selections.value[this.state.activeSelectionIndex.value] =
        Object.assign(selection, options);
    }
  }

  private async createTextSelection(
    pageNumber: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ): Promise<PdfSelection> {
    const topLeft = this.getPdfCoordinates(x, y, pageNumber);
    const bottomRight = this.getPdfCoordinates(
      x + width,
      y + height,
      pageNumber,
    );

    const textContent = await this.getTextContent(
      pageNumber,
      x,
      y,
      x + width,
      y + height,
    );

    return new PdfSelectionImpl(
      pageNumber,
      x,
      y,
      width,
      height,
      this.state.currentSelection.value?.color || this.getRandomColor(),
      [x, y, x + width, y + height],
      [topLeft.pdfX, topLeft.pdfY, bottomRight.pdfX, bottomRight.pdfY],
      textContent.textContent,
      textContent.fontSize,
      textContent.fullContent,
      textContent.textStyles,
      textContent.lineHeight,
      textContent.charSpacing,
      textContent.fontName,
      "",
      this.state.enableContentEditing.value,
      false,
    );
  }

  private clampSelectionCoordinates(
    selection: PdfSelection,
    canvas: HTMLCanvasElement,
  ) {
    const clampedX = Math.max(0, Math.min(selection.x, canvas.width));
    const clampedY = Math.max(0, Math.min(selection.y, canvas.height));
    const clampedWidth = Math.min(selection.width, canvas.width - clampedX);
    const clampedHeight = Math.min(selection.height, canvas.height - clampedY);
    return { clampedX, clampedY, clampedWidth, clampedHeight };
  }

  public getPdfCoordinates(
    canvasX: number,
    canvasY: number,
    pageNumber: number,
  ) {
    if (this.state.isImage.value) {
      const imagePage = this.state.imagePages.value[pageNumber - 1];
      if (!imagePage) return { pdfX: 0, pdfY: 0 };

      const canvas = this.state.canvasRefs.value[pageNumber];
      if (!canvas) return { pdfX: 0, pdfY: 0 };

      const canvasRect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / canvasRect.width;
      const scaleY = canvas.height / canvasRect.height;

      const displayX = canvasX / scaleX;
      const displayY = canvasY / scaleY;

      const displayWidth = canvasRect.width;
      const displayHeight = canvasRect.height;
      const imgRatio = imagePage.naturalWidth / imagePage.naturalHeight;

      let imgDisplayWidth, imgDisplayHeight, imgOffsetX, imgOffsetY;

      if (displayWidth / displayHeight > imgRatio) {
        imgDisplayHeight = displayHeight;
        imgDisplayWidth = imgRatio * displayHeight;
        imgOffsetX = (displayWidth - imgDisplayWidth) / 2;
        imgOffsetY = 0;
      } else {
        imgDisplayWidth = displayWidth;
        imgDisplayHeight = displayWidth / imgRatio;
        imgOffsetX = 0;
        imgOffsetY = (displayHeight - imgDisplayHeight) / 2;
      }

      const pdfX = Math.max(0, (displayX - imgOffsetX) / imgDisplayWidth);
      const pdfY = Math.max(0, (displayY - imgOffsetY) / imgDisplayHeight);

      return {
        pdfX: Math.min(1, pdfX) * imagePage.naturalWidth,
        pdfY: Math.min(1, pdfY) * imagePage.naturalHeight,
      };
    } else {
      const page = this.state.pages.value[pageNumber - 1];
      if (!page) return { pdfX: 0, pdfY: 0 };

      const viewport = page.getViewport({ scale: this.state.scale.value });
      const canvas = this.state.canvasRefs.value[pageNumber];
      if (!canvas) return { pdfX: 0, pdfY: 0 };

      const pdfX =
        (canvasX / (viewport.width * this.state.renderQuality)) * page.view[2];
      const pdfY =
        (canvasY / (viewport.height * this.state.renderQuality)) * page.view[3];

      return { pdfX, pdfY };
    }
  }

  private scrollToSelectionPosition(selection: PdfSelection) {
    const canvas = this.state.canvasRefs.value[selection.page];
    if (!canvas || !this.state.viewerContainer.value) return;

    const selectionTop = selection.y / this.state.renderQuality;
    const pageTop = this.getPageOffsetTop(selection.page);
    const targetScroll =
      pageTop +
      selectionTop -
      this.state.viewerContainer.value.clientHeight / 3;
    this.state.viewerContainer.value.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }

  private getPageOffsetTop(pageNumber: number): number {
    let offsetTop = 0;
    for (let i = 1; i < pageNumber; i++) {
      const canvas = this.state.canvasRefs.value[i];
      if (canvas) {
        offsetTop += canvas.offsetHeight + 20;
      }
    }
    return offsetTop;
  }

  public scrollToSelection(index: number, scrollPage: boolean = true) {
    if (index < 0 || index >= this.state.selections.value.length) return;

    const selection: any = this.state.selections.value[index];
    this.state.activeSelectionIndex.value = index;
    this.scheduleRedraw(selection.page);

    if (scrollPage) {
      this.scrollToSelectionPosition(selection);
    }

    this.scrollSelectionIntoListView(index);
  }

  public checkAndStartResize(
    pageNumber: number,
    mouseX: number,
    mouseY: number,
  ): boolean {
    for (let i = 0; i < this.state.selections.value.length; i++) {
      const selection = this.state.selections.value[i];
      if (selection.page !== pageNumber) continue;
      if (isMouseOverResizeHandle(this.state, i, mouseX, mouseY)) {
        this.state.isResizing.value = true;
        this.state.resizeStartX.value = mouseX;
        this.state.resizeStartY.value = mouseY;
        this.state.activeSelectionIndex.value = i;

        this.state.originalSelectionWidth.value = selection.width;
        this.state.originalSelectionHeight.value = selection.height;
        this.state.originalSelectionOnResize.value = { ...selection };

        this.scrollToSelection(i, false);
        return true;
      }
    }
    return false;
  }

  public updateHoverState(pageNumber: number, mouseX: number, mouseY: number) {
    this.state.hoveredSelectionIndex.value = null;
    this.state.isHoveringResizeHandle.value = false;

    for (let i = 0; i < this.state.selections.value.length; i++) {
      const selection = this.state.selections.value[i];
      if (selection.page !== pageNumber) continue;

      const isInsideSelection =
        mouseX >= selection.x &&
        mouseX <= selection.x + selection.width &&
        mouseY >= selection.y &&
        mouseY <= selection.y + selection.height;

      if (isInsideSelection) {
        this.state.hoveredSelectionIndex.value = i;
        this.state.isHoveringResizeHandle.value = isMouseOverResizeHandle(
          this.state,
          i,
          mouseX,
          mouseY,
        );
        break;
      }
    }
  }

  public removeSelection(index: number) {
    if (index < 0 || index >= this.state.selections.value.length) return;

    const selection = this.state.selections.value[index];
    this.state.selections.value.splice(index, 1);

    this.updateActiveSelectionIndexAfterRemoval(index);
    this.scheduleRedraw(selection.page);
  }

  public initPdfViewer(container: HTMLElement) {
    this.state.viewerContainer.value = container;
  }

  public setSelectionListContainer(container: HTMLElement | null) {
    this.state.selectionListContainer.value = container;
  }

  private updateActiveSelectionIndexAfterRemoval(index: number) {
    if (this.state.activeSelectionIndex.value === index) {
      this.state.activeSelectionIndex.value = null;
    } else if (
      this.state.activeSelectionIndex.value !== null &&
      this.state.activeSelectionIndex.value > index
    ) {
      this.state.activeSelectionIndex.value -= 1;
    }
  }

  public triggerFileSelect() {
    this.state.fileInputRef.value?.click();
  }

  public toggleContentEditor() {
    this.state.showContentEditor.value = !this.state.showContentEditor.value;
    if (
      !this.state.showContentEditor.value &&
      this.state.editingSelectionIndex.value !== null
    ) {
      this.cancelEditingSelection();
    }
  }

  public toggleDoubleClickEdit() {
    this.state.enableDoubleClickEdit.value =
      !this.state.enableDoubleClickEdit.value;
  }

  public toggleContentEditing() {
    this.state.enableContentEditing.value =
      !this.state.enableContentEditing.value;
    if (
      !this.state.enableContentEditing.value &&
      this.state.editingSelectionIndex.value !== null
    ) {
      this.cancelEditingSelection();
    }
  }

  private scrollSelectionIntoListView(index: number) {
    if (this.state.selectionListContainer.value) {
      const listItem = this.state.selectionListContainer.value.querySelector(
        `[data-selection-index="${index}"]`,
      );
      if (listItem) {
        listItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }

  private getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 80%, 60%)`;
  }

  public getCurrentSelectionCoords(): Ref<SelectionCoords | null> {
    if (this.state.activeSelectionIndex.value == null) return ref(null);

    const activeSelection =
      this.state.selections.value[this.state.activeSelectionIndex.value];
    return this.calculateSelectionCoordinates(activeSelection);
  }

  private calculateSelectionCoordinates(
    selection: PdfSelection,
  ): Ref<SelectionCoords | null> {
    const pageNumber = selection.page;
    const canvas = this.state.canvasRefs.value[pageNumber];
    if (!canvas) return ref(null);

    const canvasRect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / canvasRect.width;
    const scaleY = canvas.height / canvasRect.height;

    const left = selection.x / scaleX;
    const top = selection.y / scaleY;
    const width = selection.width / scaleX;
    const height = selection.height / scaleY;

    return ref({
      x: left,
      y: top,
      x1: left + width,
      y1: top + height,
      width,
      height,
      pageNumber,
      canvasRect,
    });
  }

  public clearLastSelection() {
    clearLastSelectionFuc(this.state, this.scheduleRedraw.bind(this));
  }

  public clearAllSelections() {
    clearAllSelectionsFuc(this.state, this.scheduleRedraw.bind(this));
  }

  public async copySelectedSelectionsToClipboard(): Promise<boolean> {
    try {
      if (this.state.activeSelectionIndex.value === null) {
        return this.copyAllSelectionsToClipboard();
      }

      const selectedSelections = [
        this.state.selections.value[this.state.activeSelectionIndex.value],
      ];
      return this.copySelectionsToClipboard(selectedSelections);
    } catch (error) {
      console.error("Failed to copy selections:", error);
      return false;
    }
  }

  public async copyAllSelectionsToClipboard(): Promise<boolean> {
    try {
      return this.copySelectionsToClipboard(this.state.selections.value);
    } catch (error) {
      console.error("Failed to copy all selections:", error);
      return false;
    }
  }

  public async pasteSelections(): Promise<{ success: boolean; count: number }> {
    if (this.state.copiedSelections.length === 0) {
      console.warn("No selections to paste");
      return { success: false, count: 0 };
    }

    try {
      const newSelections = this.createPastedSelections();
      this.state.selections.value.push(...newSelections);

      const affectedPages = new Set(newSelections.map((s) => s.page));
      affectedPages.forEach((page) => this.scheduleRedraw(page));

      return { success: true, count: newSelections.length };
    } catch (error) {
      console.error("Paste failed:", error);
      return { success: false, count: 0 };
    }
  }

  public setCanvasRef(el: HTMLCanvasElement | null, pageNumber: number) {
    if (el) {
      this.state.canvasRefs.value[pageNumber] = el;
    }
  }

  public exportSelections(): PdfExportData[] {
    return this.createExportData(this.state.selections.value);
  }

  private cloneSelection(selection: PdfSelection): PdfSelection {
    return new PdfSelectionImpl(
      selection.page,
      selection.x,
      selection.y,
      selection.width,
      selection.height,
      selection.color,
      [...selection.canvasCoords],
      [...selection.pdfCoords],
      selection.textContent,
      selection.fontSize,
      selection.fullContent,
      [...selection.textStyles],
      selection.lineHeight,
      selection.charSpacing,
      selection.fontName,
      selection.customContent,
      selection.isContentEditable,
      selection.isImageSelection,
      selection.imageData,
      selection.keepTransparent,
      selection.style,
      selection.checked,
      selection.name,
      selection.id,
    );
  }

  private createExportData(selections: PdfSelection[]): PdfExportData[] {
    return selections.map((sel, index): PdfExportData => {
      const coordinates = calculateNaturalCoordinates(
        this.state,
        sel,
        sel.page,
      );
      return {
        index,
        page: sel.page,
        coordinates: coordinates.map((c) => Math.round(c * 100) / 100),
        text: sel.textContent,
        fullText: sel.fullContent,
        customText: sel.customContent,
        fontSize: sel.fontSize,
        lineHeight: sel.lineHeight,
        charSpacing: sel.charSpacing,
        textStyles: sel.textStyles,
        color: sel.color,
        isImageSelection: sel.isImageSelection,
        imageData: sel.imageData,
        metadata: {
          createdAt: new Date().toISOString(),
          document:
            this.state.pdfDoc?.documentInfo?.Title || "Unknown document",
          pageCount: this.state.pdfDoc?.numPages || 0,
        },
        style: sel.style,
        checked: sel.checked,
        name: sel.name,
        id: sel.id,
      };
    });
  }

  public importSelections(jsonData: any[]) {
    if (!Array.isArray(jsonData)) {
      console.error("Import data must be an array");
      return;
    }
    if (this.state.isInitialRenderComplete.value) {
      this.doImportSelections(jsonData);
      return;
    }

    const loadCompleteHandler = () => {
      this.doImportSelections(jsonData);
      this.offLoadComplete(loadCompleteHandler);
    };

    this.onLoadComplete(loadCompleteHandler);
  }

  private doImportSelections(jsonData: any[]) {
    this.clearAllSelections();
    const pagesToRedraw = new Set<number>();

    jsonData.forEach((item) => {
      try {
        if (!isValidSelectionData(item)) {
          console.warn("Invalid selection data:", item);
          return;
        }

        const selection = this.createSelectionFromImportedData(item);
        if (selection) {
          this.state.selections.value.push(selection);
          pagesToRedraw.add(selection.page);
        }
      } catch (error) {
        console.error("Error importing selection:", error, item);
      }
    });

    if (pagesToRedraw.size > 0) {
      this.debouncedRedrawPages(Array.from(pagesToRedraw));
    }
  }

  private debouncedRedrawPages(pages: number[]) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = window.setTimeout(() => {
      pages.forEach((pageNumber) => {
        this.redrawPage(pageNumber).catch((err) => {
          console.error(`Failed to redraw page ${pageNumber}:`, err);
        });
      });
      this.debounceTimeout = null;
    }, 100);
  }

  public downloadSelections() {
    const exportData = this.exportSelections();
    downloadAsJSON(exportData, "pdf_selections.json");
  }

  private createSelectionFromImportedData(item: any): PdfSelection | null {
    const pageNumber = item.page;
    const [pdfX1, pdfY1, pdfX2, pdfY2] = item.coordinates;
    const page = this.state.pages.value[pageNumber - 1];
    if (!page) {
      console.warn(`Page ${pageNumber} not found, skipping selection`);
      return null;
    }

    const viewport = page.getViewport({ scale: this.state.scale.value });
    const canvas = this.state.canvasRefs.value[pageNumber];
    if (!canvas) {
      console.warn(
        `Canvas for page ${pageNumber} not found, skipping selection`,
      );
      return null;
    }

    if (this.state.isImage.value) {
      const imagePage = this.state.imagePages.value[pageNumber - 1];
      if (!imagePage) return null;

      const canvasRect = canvas.getBoundingClientRect();
      const displayWidth = canvasRect.width;
      const displayHeight = canvasRect.height;
      const imgRatio = imagePage.naturalWidth / imagePage.naturalHeight;

      let imgDisplayWidth, imgDisplayHeight, imgOffsetX, imgOffsetY;

      if (displayWidth / displayHeight > imgRatio) {
        imgDisplayHeight = displayHeight;
        imgDisplayWidth = imgRatio * displayHeight;
        imgOffsetX = (displayWidth - imgDisplayWidth) / 2;
        imgOffsetY = 0;
      } else {
        imgDisplayWidth = displayWidth;
        imgDisplayHeight = displayWidth / imgRatio;
        imgOffsetX = 0;
        imgOffsetY = (displayHeight - imgDisplayHeight) / 2;
      }

      const scaleX = canvas.width / canvasRect.width;
      const scaleY = canvas.height / canvasRect.height;

      const x1 =
        (pdfX1 / imagePage.naturalWidth) * imgDisplayWidth + imgOffsetX;
      const y1 =
        (pdfY1 / imagePage.naturalHeight) * imgDisplayHeight + imgOffsetY;
      const x2 =
        (pdfX2 / imagePage.naturalWidth) * imgDisplayWidth + imgOffsetX;
      const y2 =
        (pdfY2 / imagePage.naturalHeight) * imgDisplayHeight + imgOffsetY;

      const canvasX1 = x1 * scaleX;
      const canvasY1 = y1 * scaleY;
      const canvasWidth = (x2 - x1) * scaleX;
      const canvasHeight = (y2 - y1) * scaleY;

      const pdfCoordsX1 = pdfX1 / imagePage.naturalWidth;
      const pdfCoordsY1 = pdfY1 / imagePage.naturalHeight;
      const pdfCoordsX2 = pdfX2 / imagePage.naturalWidth;
      const pdfCoordsY2 = pdfY2 / imagePage.naturalHeight;

      return new PdfSelectionImpl(
        pageNumber,
        canvasX1,
        canvasY1,
        canvasWidth,
        canvasHeight,
        item.color || this.getRandomColor(),
        [canvasX1, canvasY1, canvasX1 + canvasWidth, canvasY1 + canvasHeight],
        [pdfCoordsX1, pdfCoordsY1, pdfCoordsX2, pdfCoordsY2],
        item.text || "",
        item.fontSize || 0,
        item.fullText || "",
        item.textStyles || [],
        item.lineHeight || 0,
        item.charSpacing || 0,
        item.fontName || "",
        item.customText || "",
        this.state.enableContentEditing.value,
        item.isImageSelection || false,
        item.imageData || "",
        item.keepTransparent || false,
        item.style || undefined,
        item.checked || false,
        item.name || "",
        item.id || "",
      );
    } else {
      const [x1, y1, x2, y2] = calculateCanvasCoordinates(
        this.state,
        pdfX1,
        pdfY1,
        pdfX2,
        pdfY2,
        page,
        viewport,
      );

      const width = x2 - x1;
      const height = y2 - y1;

      return new PdfSelectionImpl(
        pageNumber,
        x1,
        y1,
        width,
        height,
        item.color || this.getRandomColor(),
        [x1, y1, x2, y2],
        [pdfX1, pdfY1, pdfX2, pdfY2],
        item.text || "",
        item.fontSize || 0,
        item.fullText || "",
        item.textStyles || [],
        item.lineHeight || 0,
        item.charSpacing || 0,
        item.fontName || "",
        item.customText || "",
        this.state.enableContentEditing.value,
        item.isImageSelection || false,
        item.imageData || "",
        item.keepTransparent || false,
        item.style || undefined,
        item.checked || false,
        item.name || "",
        item.id || "",
      );
    }
  }

  private async copySelectionsToClipboard(
    selections: PdfSelection[],
  ): Promise<boolean> {
    this.state.copiedSelections = selections.map((sel) =>
      this.cloneSelection(sel),
    );
    const jsonString = JSON.stringify(
      this.createExportData(selections),
      null,
      2,
    );
    await navigator.clipboard.writeText(jsonString);
    return true;
  }

  private createPastedSelections(): PdfSelection[] {
    const offset = 20;
    return this.state.copiedSelections.map((copiedSel) => {
      const newSelection = this.cloneSelection(copiedSel);
      newSelection.x += offset;
      newSelection.y += offset;
      newSelection.canvasCoords = [
        newSelection.x,
        newSelection.y,
        newSelection.x + newSelection.width,
        newSelection.y + newSelection.height,
      ];

      const { pdfX, pdfY } = this.getPdfCoordinates(
        newSelection.x,
        newSelection.y,
        newSelection.page,
      );
      const { pdfX: pdfX2, pdfY: pdfY2 } = this.getPdfCoordinates(
        newSelection.x + newSelection.width,
        newSelection.y + newSelection.height,
        newSelection.page,
      );
      newSelection.pdfCoords = [pdfX, pdfY, pdfX2, pdfY2];
      newSelection.color = this.getRandomColor();
      newSelection.id = "";
      return newSelection;
    });
  }

  public setScale(
    newScale: number,
    options: {
      immediateRender?: boolean;
      preserveScrollPosition?: boolean;
      preserveSelections?: boolean;
    } = {},
  ): void {
    const {
      immediateRender = true,
      preserveScrollPosition = false,
      preserveSelections = true,
    } = options;

    if (newScale <= 0) {
      console.warn("Scale must be greater than 0");
      return;
    }

    const clampedScale = Math.max(0.1, Math.min(5.0, newScale));
    if (this.state.scale.value === clampedScale) {
      return;
    }

    const prevScale = this.state.scale.value;
    let scrollTop = 0;
    const selectionsBackup = preserveSelections
      ? this.state.selections.value.map((sel) => this.cloneSelection(sel))
      : [];

    if (preserveScrollPosition && this.state.viewerContainer.value) {
      scrollTop = this.state.viewerContainer.value.scrollTop;
    }

    this.state.scale.value = clampedScale;
    this.state.isLoading.value = true;

    const handleRescale = async () => {
      try {
        if (this.state.isImage.value) {
          await this.rescaleImagePages();
        } else {
          await this.rescalePdfPages();
        }

        if (preserveSelections) {
          this.state.selections.value = selectionsBackup.map((sel) => {
            const scaleRatio = clampedScale / prevScale;
            return new PdfSelectionImpl(
              sel.page,
              sel.x * scaleRatio,
              sel.y * scaleRatio,
              sel.width * scaleRatio,
              sel.height * scaleRatio,
              sel.color,
              [
                sel.x * scaleRatio,
                sel.y * scaleRatio,
                (sel.x + sel.width) * scaleRatio,
                (sel.y + sel.height) * scaleRatio,
              ],
              sel.pdfCoords,
              sel.textContent,
              sel.fontSize,
              sel.fullContent,
              sel.textStyles,
              sel.lineHeight,
              sel.charSpacing,
              sel.fontName,
              sel.customContent,
              sel.isContentEditable,
              sel.isImageSelection,
              sel.imageData,
              sel.keepTransparent,
              sel.style,
              sel.checked,
              sel.name,
              sel.id,
            );
          });
        }

        if (preserveScrollPosition && this.state.viewerContainer.value) {
          const scaleRatio = clampedScale / prevScale;
          this.state.viewerContainer.value.scrollTop = scrollTop * scaleRatio;
        }

        if (this.state.selections.value.length > 0) {
          const pagesToRedraw = new Set(
            this.state.selections.value.map((sel) => sel.page),
          );
          pagesToRedraw.forEach((page) => this.scheduleRedraw(page));
        }
      } catch (error) {
        console.error("Error during rescaling:", error);
      } finally {
        this.state.isLoading.value = false;
      }
    };

    if (immediateRender) {
      handleRescale();
    } else {
      this.state.pages.value.forEach((page) => {
        this.renderQueue[page.pageNumber] = true;
      });

      if (this.animationFrameId === null) {
        this.animationFrameId = requestAnimationFrame(async () => {
          await handleRescale();
          this.animationFrameId = null;
        });
      }
    }
  }

  private async rescalePdfPages(): Promise<void> {
    const renderPromises: Promise<void>[] = [];

    for (let i = 0; i < this.state.pages.value.length; i++) {
      const page = this.state.pages.value[i];
      if (!page) continue;

      renderPromises.push(
        this.renderPage(page).catch((err) => {
          console.error(`Error rendering page ${i + 1}:`, err);
        }),
      );
    }

    await Promise.all(renderPromises);
  }

  private async rescaleImagePages(): Promise<void> {
    if (!this.state.imagePages.value.length) return;

    const renderPromises: Promise<void>[] = [];

    for (let i = 0; i < this.state.pages.value.length; i++) {
      const page = this.state.pages.value[i];
      const imgPage = this.state.imagePages.value[i];
      if (!page || !imgPage) continue;

      renderPromises.push(
        this.renderPage(page).catch((err) => {
          console.error(`Error rendering image page ${i + 1}:`, err);
        }),
      );
    }

    await Promise.all(renderPromises);
  }
}
