import type {PdfState} from '@/shared'

export const resetState = (
  state: PdfState,
  renderQueue: Record<number, boolean>
) => {
  state.imagePages.value.forEach((img) => {
    if (img.imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(img.imageUrl);
    }
  });
  state.pdfDoc = null;
  state.pages.value = [];
  state.selections.value = [];
  state.originalCanvasImages = {};
  state.copiedSelections = [];
  state.selectionMode.value = false;
  state.isSelecting.value = false;
  state.isDragging.value = false;
  state.currentSelection.value = null;
  state.currentPage.value = null;
  state.activeSelectionIndex.value = null;
  renderQueue = {};
  state.isImage.value = false;
  state.imageUrl.value = null;
  state.loadingProgress.value = 0;
  state.isInitialRenderComplete.value = false;
  clearAllCanvases(state);
};

export const clearAllCanvases = (state: PdfState) => {
  for (const key in state.canvasRefs.value) {
    const canvas: HTMLCanvasElement | any = state.canvasRefs.value[key];
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
};

export const calculateFontSize = (item: any): number => {
  return Math.sqrt(
    item.transform[0] * item.transform[0] +
      item.transform[1] * item.transform[1]
  );
};

export const isValidSelectionData = (item: any): boolean => {
  return item.page && item.coordinates && item.coordinates.length === 4;
};

export const downloadAsJSON = (data: any, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
