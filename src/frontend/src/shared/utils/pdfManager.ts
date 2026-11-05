import type {
  PdfStateType,
  PdfComputedType,
  PdfMethodsType,
  PdfHandlersType,
  SelectionCoords,
  PdfExportData,
  PdfSelectionStyle,
} from "@/shared";

import { PdfStateImpl, PdfMethods, PdfComputed, PdfHandlers } from "@/shared";

import { computed, type Ref } from "vue";

export class PdfManager {
  public state: PdfStateType;
  public computed: PdfComputedType;
  public methods: PdfMethodsType;
  public handlers: PdfHandlersType;

  constructor(initialScale: number = 1.5) {
    this.state = new PdfStateImpl(initialScale);
    this.methods = new PdfMethods(this.state);
    this.computed = new PdfComputed(this.state, this.methods);
    this.handlers = new PdfHandlers(this.state, this.methods);
  }

  public getPages() {
    return computed(() => this.computed.getPages.value);
  }

  public getCurrentSelectionCoords(): Ref<SelectionCoords | null> {
    return computed(() => this.computed.getCurrentSelectionCoords.value);
  }

  public getSelectionMode() {
    return computed(() => this.computed.getSelectionMode.value);
  }

  public getSelections() {
    return computed(() => this.computed.getSelections.value);
  }

  public getIsResizing() {
    return computed(() => this.computed.getIsResizing.value);
  }

  public getCanvasRefs() {
    return computed(() => this.computed.getCanvasRefs.value);
  }

  public getViewerContainer() {
    return computed(() => this.computed.getViewerContainer.value);
  }

  public getEditingSelectionIndex() {
    return computed(() => this.computed.getEditingSelectionIndex.value);
  }

  public getCustomText() {
    return computed(() => this.computed.getCustomText.value);
  }

  public getIsLoading() {
    return computed(() => this.computed.getIsLoading.value);
  }

  public getIsInitialRenderComplete() {
    return computed(() => this.computed.getIsInitialRenderComplete.value);
  }

  public getFileInputRef() {
    return computed(() => this.computed.getFileInputRef.value);
  }

  public getShowContentEditor() {
    return computed(() => this.computed.getShowContentEditor.value);
  }

  public getIsSelecting() {
    return computed(() => this.computed.getIsSelecting.value);
  }

  public getCurrentSelection() {
    return computed(() => this.computed.getCurrentSelection.value);
  }

  public getActiveSelectionIndex() {
    return computed(() => this.computed.getActiveSelectionIndex.value);
  }

  public getEnableDoubleClickEdit() {
    return computed(() => this.computed.getEnableDoubleClickEdit.value);
  }

  public getEnableContentEditing() {
    return computed(() => this.computed.getEnableContentEditing.value);
  }

  public getIsImage() {
    return computed(() => this.computed.getIsImage.value);
  }

  public getImageUrl() {
    return computed(() => this.computed.getImageUrl.value);
  }

  public getCurrentPage() {
    return computed(() => this.computed.getCurrentPage.value);
  }

  public loadSource = (source: string | File | FileList | File[]) => {
    this.methods?.loadSource(source);
  };

  public setCanvasRef(el: HTMLCanvasElement | null, pageNumber: number) {
    this.methods.setCanvasRef(el, pageNumber);
  }

  public exportSelections(): PdfExportData[] {
    return this.methods.exportSelections();
  }

  public clearLastSelection() {
    this.methods.clearLastSelection();
  }

  public clearAllSelections() {
    this.methods.clearAllSelections();
  }

  public async copySelectedSelectionsToClipboard() {
    return this.methods.copySelectedSelectionsToClipboard();
  }

  public async copyAllSelectionsToClipboard() {
    return this.methods.copyAllSelectionsToClipboard();
  }

  public async pasteSelections() {
    return this.methods.pasteSelections();
  }

  public importSelections(jsonData: any[]) {
    this.methods.importSelections(jsonData);
  }

  public downloadSelections() {
    this.methods.downloadSelections();
  }

  public toggleSelectionMode() {
    this.methods?.toggleSelectionMode();
  }

  public setSelectionMode(enabled: boolean) {
    this.methods.setSelectionMode(enabled);
  }

  public setSelectionStyle(pageNumber: number, style: PdfSelectionStyle) {
    this.methods.setSelectionStyle(pageNumber, style);
  }

  public setPdfSelection(pageNumber: number, options: object) {
    this.methods.setPdfSelection(pageNumber, options);
  }

  public scrollToSelection(index: number, scrollPage: boolean = true) {
    this.methods.scrollToSelection(index, scrollPage);
  }

  public initPdfViewer(container: HTMLElement) {
    this.methods.initPdfViewer(container);
  }

  public setSelectionListContainer(container: HTMLElement) {
    this.methods.setSelectionListContainer(container);
  }

  public removeSelection(index: number) {
    this.methods.removeSelection(index);
  }

  public onLoadComplete(callback: () => void) {
    this.methods.onLoadComplete(callback);
  }
  public offLoadComplete(callback: () => void) {
    this.methods.offLoadComplete(callback);
  }

  public handleKeyDown(event: KeyboardEvent) {
    this.handlers.handleKeyDown(event);
  }

  public addEventKeyDown() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  public removeEventKeydown() {
    window.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  public handleMouseDown(event: MouseEvent, pageNumber: number) {
    this.handlers.handleMouseDown(event, pageNumber);
  }

  public handleMouseMove(event: MouseEvent, pageNumber: number) {
    this.handlers.handleMouseMove(event, pageNumber);
  }

  public handleMouseUp(event: MouseEvent, pageNumber: number) {
    this.handlers.handleMouseUp(event, pageNumber);
  }

  public handleMouseLeave() {
    this.handlers.handleMouseLeave();
  }

  public setScale(
    scale: number,
    options: {
      immediateRender?: boolean;
      preserveScrollPosition?: boolean;
      preserveSelections?: boolean;
    } = {},
  ) {
    this.methods.setScale(scale, options);
  }

  public reset(): void {
    this.handlers.reset();
  }

  public destroy() {
    this.handlers.destroy();
  }
}
