import type { PdfSelection, PdfState, PdfMethodsType } from "@/shared";
import { PdfSelectionImpl, resetState } from "@/shared";
import { debounce } from "lodash";

export class PdfHandlers {
  public state: PdfState;
  public methods: PdfMethodsType;

  constructor(state: PdfState, methods: PdfMethodsType) {
    this.state = state;
    this.methods = methods;
  }

  public finishEditingSelection = () => {
    this.methods.finishEditingSelection();
  };

  public cancelEditingSelection = () => {
    this.methods.cancelEditingSelection();
  };

  public copySelectedSelectionsToClipboard = () => {
    this.methods.copySelectedSelectionsToClipboard();
  };
  public copyAllSelectionsToClipboard = () => {
    this.methods.copyAllSelectionsToClipboard();
  };
  public pasteSelections = () => {
    this.methods.pasteSelections();
  };

  public _handleKeyDown(event: KeyboardEvent) {
    console.log("handleKeyDown", this.state.activeSelectionIndex.value);
    if (this.state.editingSelectionIndex.value !== null) {
      const editingIndex = this.state.editingSelectionIndex.value;
      if (
        editingIndex >= 0 &&
        editingIndex < this.state.selections.value.length &&
        !this.state.selections.value[editingIndex]?.isContentEditable
      ) {
        return;
      }

      event.stopPropagation();

      if (event.key === "Escape") {
        this.methods.cancelEditingSelection();
      } else if (event.key === "Enter" && !event.shiftKey) {
        this.methods.finishEditingSelection();
      }
    }

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === "c" &&
      this.state.selectionMode.value
    ) {
      event.preventDefault();
      if (this.state.activeSelectionIndex.value !== null) {
        this.copySelectedSelectionsToClipboard();
      } else if (this.state.selections.value.length > 0) {
        this.copyAllSelectionsToClipboard();
      }
    }

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === "v" &&
      this.state.selectionMode.value
    ) {
      event.preventDefault();
      this.pasteSelections();
    }

    if (
      event.key === "Delete" &&
      this.state.activeSelectionIndex.value !== null
    ) {
      event.preventDefault();
      this.removeSelection(this.state.activeSelectionIndex.value);
    }

    if (this.state.editingSelectionIndex.value !== null) {
      if (event.key === "Escape") {
        this.cancelEditingSelection();
        event.preventDefault();
      } else if (event.key === "Enter" && !event.shiftKey) {
        this.finishEditingSelection();
        event.preventDefault();
      }
    }
  }

  public handleKeyDown = debounce(this._handleKeyDown, 300);

  public removeSelection(index: number) {
    this.methods.removeSelection(index);
  }

  private getCanvas = (pageNumber: number) => {
    return this.state.canvasRefs.value[pageNumber];
  };

  private getXY = (event: MouseEvent, pageNumber: number) => {
    const canvas = this.getCanvas(pageNumber);
    if (!canvas) return { canvas: null, x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const currentX = (event.clientX - rect.left) * scaleX;
    const currentY = (event.clientY - rect.top) * scaleY;

    return {
      canvas,
      x: currentX,
      y: currentY,
    };
  };

  public async handleMouseDown(event: MouseEvent, pageNumber: number) {
    if (!this.state.selectionMode.value) return;

    const { canvas, x: mouseX, y: mouseY } = this.getXY(event, pageNumber);
    if (!canvas) return;

    this.state.currentPage.value = pageNumber;

    let shouldHandleResize = false;
    if (
      this.state.isHoveringResizeHandle.value &&
      this.state.hoveredSelectionIndex.value !== null
    ) {
      const i = this.state.hoveredSelectionIndex.value;
      const selection = this.state.selections.value[i];
      if (selection && selection.page === pageNumber) {
        this.state.isResizing.value = true;
        this.state.activeSelectionIndex.value = i;
        this.state.resizeStartX.value = mouseX;
        this.state.resizeStartY.value = mouseY;
        this.state.originalSelectionWidth.value = selection.width;
        this.state.originalSelectionHeight.value = selection.height;
        this.state.originalSelectionOnResize.value = { ...selection };

        this.methods["scrollToSelection"](i, false);
        shouldHandleResize = true;

        this.methods["scheduleRedraw"](pageNumber);
      }
    }

    if (!shouldHandleResize) {
      if (event.detail === 2 && this.state.enableDoubleClickEdit.value) {
        const clickedSelectionIndex = this.methods["findSelectionAtPosition"](
          pageNumber,
          mouseX,
          mouseY,
        );
        if (clickedSelectionIndex !== null) {
          this.methods.startEditingSelection(clickedSelectionIndex);
          return;
        }
      }

      const clickedSelectionIndex =
        this.state.hoveredSelectionIndex.value !== null
          ? this.state.hoveredSelectionIndex.value
          : this.methods["findSelectionAtPosition"](pageNumber, mouseX, mouseY);

      if (clickedSelectionIndex !== null) {
        if (this.state.editingSelectionIndex.value !== null) {
          this.methods.cancelEditingSelection();
        }

        this.state.isDragging.value = true;
        this.state.activeSelectionIndex.value = clickedSelectionIndex;
        const selection = this.state.selections.value[clickedSelectionIndex];

        this.state.dragOffset.value = {
          x: mouseX - selection.x,
          y: mouseY - selection.y,
        };

        this.state.startPos.value = { x: mouseX, y: mouseY };
        this.state.currentPage.value = pageNumber;

        this.methods["scrollToSelection"](clickedSelectionIndex, false);
      } else {
        if (this.state.editingSelectionIndex.value !== null) {
          this.methods.cancelEditingSelection();
        }

        this.state.isSelecting.value = true;
        this.state.currentPage.value = pageNumber;
        this.state.startPos.value = { x: mouseX, y: mouseY };

        this.state.currentSelection.value = new PdfSelectionImpl(
          pageNumber,
          mouseX,
          mouseY,
          0,
          0,
          this.methods["getRandomColor"](),
          [],
          [],
        );

        this.state.activeSelectionIndex.value = null;
      }
    }

    this.methods["scheduleRedraw"](pageNumber);
  }

  public async handleMouseMove(event: MouseEvent, pageNumber: number) {
    if (!this.state.selectionMode.value) return;

    const { canvas, x: currentX, y: currentY } = this.getXY(event, pageNumber);
    if (!canvas) return;

    this.methods.updateHoverState(pageNumber, currentX, currentY);

    canvas.style.cursor = this.getCursorStyle();

    if (
      !this.state.isSelecting.value &&
      !this.state.isDragging.value &&
      !this.state.isResizing.value
    ) {
      return;
    }

    if (this.state.currentPage.value !== pageNumber) return;

    if (
      this.state.isResizing.value &&
      this.state.activeSelectionIndex.value !== null
    ) {
      this.handleResizeSelection(pageNumber, currentX, currentY, canvas);
    } else if (
      this.state.isDragging.value &&
      this.state.activeSelectionIndex.value !== null
    ) {
      this.handleDragSelection(pageNumber, currentX, currentY, canvas);
    } else if (
      this.state.isSelecting.value &&
      this.state.currentSelection.value
    ) {
      this.handleCreateSelection(pageNumber, currentX, currentY);
    }

    this.methods.scheduleRedraw(pageNumber);
  }

  private getCursorStyle(): string {
    if (this.state.isHoveringResizeHandle.value) return "nwse-resize";
    if (this.state.hoveredSelectionIndex.value !== null) return "move";
    return "default";
  }

  private handleResizeSelection(
    pageNumber: number,
    currentX: number,
    currentY: number,
    canvas: HTMLCanvasElement,
  ) {
    const selection =
      this.state.selections.value[this.state.activeSelectionIndex.value!];
    const deltaX = currentX - this.state.resizeStartX.value;
    const deltaY = currentY - this.state.resizeStartY.value;

    const newWidth = Math.max(
      10,
      this.state.originalSelectionWidth.value + deltaX,
    );
    const newHeight = Math.max(
      10,
      this.state.originalSelectionHeight.value + deltaY,
    );

    const updatedSelection = this.createUpdatedSelection(
      pageNumber,
      selection,
      selection.x,
      selection.y,
      newWidth,
      newHeight,
      canvas,
    );

    this.state.selections.value[this.state.activeSelectionIndex.value!] =
      updatedSelection;
  }

  private handleDragSelection(
    pageNumber: number,
    currentX: number,
    currentY: number,
    canvas: HTMLCanvasElement,
  ) {
    const selection =
      this.state.selections.value[this.state.activeSelectionIndex.value!];
    const newX = currentX - this.state.dragOffset.value.x;
    const newY = currentY - this.state.dragOffset.value.y;

    const clampedX = Math.max(
      0,
      Math.min(newX, canvas.width - selection.width),
    );
    const clampedY = Math.max(
      0,
      Math.min(newY, canvas.height - selection.height),
    );

    const updatedSelection = this.createUpdatedSelection(
      pageNumber,
      selection,
      clampedX,
      clampedY,
      selection.width,
      selection.height,
      canvas,
    );

    this.state.selections.value[this.state.activeSelectionIndex.value!] =
      updatedSelection;
  }

  private handleCreateSelection(
    pageNumber: number,
    currentX: number,
    currentY: number,
  ) {
    const width = currentX - this.state.startPos.value.x;
    const height = currentY - this.state.startPos.value.y;

    const startX = Math.min(this.state.startPos.value.x, currentX);
    const startY = Math.min(this.state.startPos.value.y, currentY);
    const absWidth = Math.abs(width);
    const absHeight = Math.abs(height);

    if (!this.state.currentSelection.value) return;

    this.state.currentSelection.value.x = startX;
    this.state.currentSelection.value.y = startY;
    this.state.currentSelection.value.width = absWidth;
    this.state.currentSelection.value.height = absHeight;
    this.state.currentSelection.value.canvasCoords = [
      startX,
      startY,
      startX + absWidth,
      startY + absHeight,
    ];
    this.state.currentSelection.value.pdfCoords =
      this.calculateNaturalCoordinates(
        pageNumber,
        startX,
        startY,
        absWidth,
        absHeight,
      );
  }

  private createUpdatedSelection(
    pageNumber: number,
    originalSelection: PdfSelection,
    x: number,
    y: number,
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
  ): PdfSelection {
    return new PdfSelectionImpl(
      originalSelection.page,
      x,
      y,
      width,
      height,
      originalSelection.color,
      [x, y, x + width, y + height],
      this.calculateNaturalCoordinates(pageNumber, x, y, width, height),
      originalSelection.textContent,
      originalSelection.fontSize,
      originalSelection.fullContent,
      originalSelection.textStyles,
      originalSelection.lineHeight,
      originalSelection.charSpacing,
      originalSelection.fontName,
      originalSelection.customContent,
      originalSelection.isContentEditable,
      originalSelection.isImageSelection,
      originalSelection.imageData,
      originalSelection.keepTransparent,
      originalSelection.style,
      originalSelection.checked,
      originalSelection.name,
      originalSelection.id,
    );
  }

  private calculateNaturalCoordinates(
    pageNumber: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ): number[] {
    if (this.state.isImage.value) {
      return this.calculateImageNaturalCoordinates(
        pageNumber,
        x,
        y,
        width,
        height,
      );
    }
    return this.calculatePdfNaturalCoordinates(pageNumber, x, y, width, height);
  }

  private calculateImageNaturalCoordinates(
    pageNumber: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ): number[] {
    const imagePage = this.state.imagePages.value[pageNumber - 1];
    const canvas = this.state.canvasRefs.value[pageNumber];
    if (!imagePage || !canvas) return [0, 0, 0, 0];

    const canvasRect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / canvasRect.width;
    const scaleY = canvas.height / canvasRect.height;

    const displayX = x / scaleX;
    const displayY = y / scaleY;
    const displayWidth = width / scaleX;
    const displayHeight = height / scaleY;

    const displayRatio = canvasRect.width / canvasRect.height;
    const imageRatio = imagePage.naturalWidth / imagePage.naturalHeight;

    let imgDisplayWidth, imgDisplayHeight, imgOffsetX, imgOffsetY;

    if (displayRatio > imageRatio) {
      imgDisplayHeight = canvasRect.height;
      imgDisplayWidth = imageRatio * canvasRect.height;
      imgOffsetX = (canvasRect.width - imgDisplayWidth) / 2;
      imgOffsetY = 0;
    } else {
      imgDisplayWidth = canvasRect.width;
      imgDisplayHeight = canvasRect.width / imageRatio;
      imgOffsetX = 0;
      imgOffsetY = (canvasRect.height - imgDisplayHeight) / 2;
    }

    const naturalX1 = Math.max(
      0,
      Math.min(1, (displayX - imgOffsetX) / imgDisplayWidth),
    );
    const naturalY1 = Math.max(
      0,
      Math.min(1, (displayY - imgOffsetY) / imgDisplayHeight),
    );
    const naturalX2 = Math.max(
      0,
      Math.min(1, (displayX + displayWidth - imgOffsetX) / imgDisplayWidth),
    );
    const naturalY2 = Math.max(
      0,
      Math.min(1, (displayY + displayHeight - imgOffsetY) / imgDisplayHeight),
    );

    return [naturalX1, naturalY1, naturalX2, naturalY2];
  }

  private calculatePdfNaturalCoordinates(
    pageNumber: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ): number[] {
    const page = this.state.pages.value[pageNumber - 1];
    if (!page) return [0, 0, 0, 0];

    const viewport = page.getViewport({ scale: this.state.scale.value });
    const topLeft = this.methods.getPdfCoordinates(x, y, pageNumber);
    const bottomRight = this.methods.getPdfCoordinates(
      x + width,
      y + height,
      pageNumber,
    );

    return [topLeft.pdfX, topLeft.pdfY, bottomRight.pdfX, bottomRight.pdfY];
  }

  public async handleMouseUp(event: MouseEvent, pageNumber: number) {
    if (!this.state.selectionMode.value) return;

    if (this.state.isResizing.value) {
      this.state.isResizing.value = false;
      this.state.originalSelectionOnResize.value = null;
    } else if (
      this.state.isSelecting.value &&
      this.state.currentSelection.value
    ) {
      if (
        this.state.currentSelection.value.width < 5 ||
        this.state.currentSelection.value.height < 5
      ) {
        this.methods["cancelSelection"]();
        return;
      }

      const selection =
        await this.methods["createSelectionFromCurrent"](pageNumber);
      this.state.selections.value.push(selection);
    }

    this.state.isSelecting.value = false;
    this.state.isDragging.value = false;
    this.state.currentSelection.value = null;
    this.methods["scheduleRedraw"](pageNumber);
  }

  public handleMouseLeave() {
    if (
      this.state.isSelecting.value ||
      this.state.isDragging.value ||
      this.state.isResizing.value
    ) {
      this.methods["cancelSelection"]();
      this.state.isResizing.value = false;
    }
  }

  public reset() {
    resetState(this.state, this.methods.renderQueue);
  }

  public destroy() {
    resetState(this.state, this.methods.renderQueue);
    this.state.viewerContainer.value = null;
    this.state.selectionListContainer.value = null;
    this.state.canvasRefs.value = {};
  }
}
