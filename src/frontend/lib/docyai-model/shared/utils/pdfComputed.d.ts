import { PdfState, PdfMethodsType, SelectionCoords } from '..';
import { Ref } from 'vue';
export declare class PdfComputed {
    private state;
    private methods;
    constructor(state: PdfState, methods: PdfMethodsType);
    get getPages(): import('vue').ShallowRef<any[]>;
    get getSelectionMode(): Ref<boolean, boolean>;
    get getCurrentSelectionCoords(): Ref<SelectionCoords | null>;
    get getSelections(): Ref<any[] | import('..').PdfSelection[], any[] | import('..').PdfSelection[]>;
    get getCanvasRefs(): Ref<Record<number, HTMLCanvasElement>, Record<number, HTMLCanvasElement>>;
    get getViewerContainer(): Ref<HTMLElement | null, HTMLElement | null>;
    get getEditingSelectionIndex(): Ref<number | null, number | null>;
    get getCustomText(): Ref<string, string>;
    get getIsLoading(): Ref<boolean, boolean>;
    get getIsInitialRenderComplete(): Ref<boolean, boolean>;
    get getFileInputRef(): Ref<HTMLInputElement | null, HTMLInputElement | null>;
    get getShowContentEditor(): Ref<boolean, boolean>;
    get getIsSelecting(): Ref<boolean, boolean>;
    get getCurrentSelection(): Ref<import('..').PdfSelection | null, import('..').PdfSelection | null>;
    get getActiveSelectionIndex(): Ref<number | null, number | null>;
    get getEnableDoubleClickEdit(): Ref<boolean, boolean>;
    get getEnableContentEditing(): Ref<boolean, boolean>;
    get getIsImage(): Ref<boolean, boolean>;
    get getImageUrl(): Ref<string | null, string | null>;
    get getIsResizing(): Ref<boolean, boolean>;
    get getCurrentPage(): Ref<number | null, number | null>;
}
