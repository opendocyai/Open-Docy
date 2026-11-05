import { NodeEditor } from 'rete';
import { AreaPlugin } from 'rete-area-plugin';
import { Schemes, AreaExtra } from '..';
interface NodeData {
    id: string;
    position?: {
        x: number;
        y: number;
    };
    width?: number | undefined;
    height?: number | undefined;
}
declare class ReteKeyboard {
    observerState: {
        observer: ResizeObserver | null;
        mutationObservers: Map<string, MutationObserver>;
        pendingUpdates: Set<string>;
        isDragging: boolean;
        currentDragNode: NodeData | null;
    };
    copiedData: import('vue').Ref<{
        nodes: any[];
        connections: any[];
        nodeIdMap: Record<string, string>;
    } | null, {
        nodes: any[];
        connections: any[];
        nodeIdMap: Record<string, string>;
    } | {
        nodes: any[];
        connections: any[];
        nodeIdMap: Record<string, string>;
    } | null>;
    handleKeyDown(editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>, event: KeyboardEvent): void;
    ListenKeyboard(editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>): {
        editorCleanup: () => void;
        copySelection: (editor: NodeEditor<Schemes>) => void;
        pasteSelection: (editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>) => void;
        deleteSelection: (editor: NodeEditor<Schemes>, id?: string | undefined) => void;
    };
    copySelection(editor: NodeEditor<Schemes>): void;
    pasteSelection(editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>): void;
    deleteSelection(editor: NodeEditor<Schemes>, id?: string | undefined): void;
    processPendingUpdates: import('lodash').DebouncedFunc<(editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>) => void>;
    updateNodeSize: import('lodash').DebouncedFuncLeading<(node: NodeData, area: AreaPlugin<Schemes, AreaExtra>) => Promise<void>>;
    setupResizeObserver(editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>): void;
    setupMutationObserver(element: HTMLElement, nodeId: string, editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>): void;
    initDragListener(editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>): void;
    cleanupResizeObserver(): void;
}
export declare const reteKeyboard: ReteKeyboard;
export declare const ListenKeyboard: (editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>) => {
    editorCleanup: () => void;
    copySelection: (editor: NodeEditor<Schemes>) => void;
    pasteSelection: (editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>) => void;
    deleteSelection: (editor: NodeEditor<Schemes>, id?: string | undefined) => void;
};
export declare const initDragListener: (editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>) => void;
export declare const updateNodeSize: import('lodash').DebouncedFuncLeading<(node: NodeData, area: AreaPlugin<Schemes, AreaExtra>) => Promise<void>>;
export declare const handleKeyDown: (editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>, event: KeyboardEvent) => void;
export declare const copySelection: (editor: NodeEditor<Schemes>) => void;
export declare const pasteSelection: (editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>) => void;
export declare const deleteSelection: (editor: NodeEditor<Schemes>, id?: string | undefined) => void;
export declare const processPendingUpdates: import('lodash').DebouncedFunc<(editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>) => void>;
export declare const setupResizeObserver: (editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>) => void;
export declare const setupMutationObserver: (element: HTMLElement, nodeId: string, editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>) => void;
export declare const cleanupResizeObserver: () => void;
export default reteKeyboard;
