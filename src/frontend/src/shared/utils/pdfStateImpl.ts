import { type Ref, ref, shallowRef } from "vue";
import type { PdfState, PdfSelection, PdfPage, ImagePages } from "@/shared";
export class PdfStateImpl implements PdfState {
  public pdfDoc: any = null;
  public scale: Ref<number>;
  public selectionMode = ref<boolean>(false);
  public isSelecting = ref<boolean>(false);
  public isDragging = ref<boolean>(false);
  public selections = ref<PdfSelection[]>([]);
  public currentSelection = ref<PdfSelection | null>(null);
  public startPos = ref({ x: 0, y: 0 });
  public currentPage = ref<number | null>(null);
  public activeSelectionIndex = ref<number | null>(null);
  public dragOffset = ref({ x: 0, y: 0 });
  public canvasRefs = ref<Record<number, HTMLCanvasElement>>({});
  public pages = ref<PdfPage[]>([]);
  public viewerContainer = ref<HTMLElement | any>(null);
  public renderQuality = window.devicePixelRatio || 1;
  public originalCanvasImages: Record<number, HTMLCanvasElement> = {};
  public selectionListContainer = ref<HTMLElement | null>(null);
  public renderQueue: Record<number, boolean> = {};
  public animationFrameId: number | null = null;
  public copiedSelections: PdfSelection[] = [];
  public enableDoubleClickEdit = ref<boolean>(false);
  public enableContentEditing = ref<boolean>(false);
  public editingSelectionIndex = ref<number | null>(null);
  public customText = ref<string>("");
  public showContentEditor = ref<boolean>(false);
  public isImage = ref<boolean>(false);
  public imageUrl = ref<string | null>(null);
  public fileInputRef: Ref<HTMLInputElement | null> = ref(null);
  public isLoading = ref<boolean>(false);
  public maxImageWidth = ref<number | null>(800);

  public files = shallowRef<File[]>([]);
  public currentFileIndex = ref<number>(0);

  public imageFiles = shallowRef<File[]>([]);
  public pdfFile = shallowRef<File | null>(null);

  public imagePages = shallowRef<ImagePages[]>([]);

  public isResizing = ref<boolean>(false);
  public resizeStartX = ref<number>(0);
  public resizeStartY = ref<number>(0);
  public originalSelectionWidth = ref<number>(0);
  public originalSelectionHeight = ref<number>(0);
  public resizeDirection = ref<string | null>(null);
  public originalSelectionOnResize = ref<PdfSelection | null>(null);
  public hoveredSelectionIndex = ref<number | null>(null);

  public isHoveringResizeHandle = ref<boolean>(false);

  public loadingProgress = ref<number>(0);
  public isInitialRenderComplete = ref<boolean>(false);

  constructor(initialScale: number) {
    this.scale = ref(initialScale);
  }
}
