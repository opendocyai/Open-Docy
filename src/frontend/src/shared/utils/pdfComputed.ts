import type { PdfState, PdfMethodsType, SelectionCoords } from '@/shared';
import {type Ref} from 'vue'

export class PdfComputed {
  private state: PdfState;
  private methods: PdfMethodsType;
  constructor(state: PdfState, methods: PdfMethodsType) {
    this.state = state;
    this.methods = methods;
  }

  get getPages() {
    return this.state.pages;
  }
  get getSelectionMode() {
    return this.state.selectionMode;
  }
  get getCurrentSelectionCoords(): Ref<SelectionCoords | null> {
    return this.methods.getCurrentSelectionCoords();
  }
  get getSelections() {
    return this.state.selections;
  }

  get getCanvasRefs() {
    return this.state.canvasRefs;
  }

  get getViewerContainer() {
    return this.state.viewerContainer;
  }

  get getEditingSelectionIndex() {
    return this.state.editingSelectionIndex;
  }

  get getCustomText() {
    return this.state.customText;
  }

  get getIsLoading() {
    return this.state.isLoading;
  }

  get getIsInitialRenderComplete () {
    return this.state.isInitialRenderComplete;
  }

  get getFileInputRef() {
    return this.state.fileInputRef;
  }

  get getShowContentEditor() {
    return this.state.showContentEditor;
  }

  get getIsSelecting() {
    return this.state.isSelecting;
  }

  get getCurrentSelection() {
    return this.state.currentSelection;
  }

  get getActiveSelectionIndex() {
    return this.state.activeSelectionIndex;
  }

  get getEnableDoubleClickEdit() {
    return this.state.enableDoubleClickEdit;
  }

  get getEnableContentEditing() {
    return this.state.enableContentEditing;
  }

  get getIsImage() {
    return this.state.isImage;
  }

  get getImageUrl() {
    return this.state.imageUrl;
  }

  get getIsResizing() {
    return this.state.isResizing;
  }
  get getCurrentPage() {
    return this.state.currentPage
  }
}
