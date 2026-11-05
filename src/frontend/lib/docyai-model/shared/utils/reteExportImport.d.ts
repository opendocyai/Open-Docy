import { ClassicPreset, NodeEditor } from 'rete';
import { Schemes } from '..';
type NodeData = {
    id: string;
    label: string;
    position?: {
        x: number;
        y: number;
    };
    inputs: Record<string, SerializedPort>;
    outputs: Record<string, SerializedPort>;
    controls: Record<string, SerializedControl>;
    data?: Record<string, any>;
};
type SerializedPort = {
    id: string;
    label?: string;
    socket: {
        name: string;
    };
    multipleConnections: boolean | undefined;
};
type SerializedControl = {
    type: "input" | "ProgressNode" | "InputFileNode";
    id: string;
    value: any;
    readonly?: boolean;
    options?: any;
};
declare class ReteExportImport {
    exportEditor(editor: NodeEditor<Schemes>): Promise<{
        nodes: NodeData[];
        connections: any[];
        viewport: any;
    }>;
    serializeControl(control: ClassicPreset.Control): SerializedControl;
    serializePort(port: ClassicPreset.Input<ClassicPreset.Socket> | ClassicPreset.Output<ClassicPreset.Socket>): SerializedPort;
    importEditor(editor: NodeEditor<Schemes>, data: any): Promise<void>;
    updateNode(editor: NodeEditor<Schemes>, nodeId: string, changes: any): Promise<void>;
}
export declare const reteExportImport: ReteExportImport;
export declare const exportEditor: (editor: NodeEditor<Schemes>) => Promise<{
    nodes: NodeData[];
    connections: any[];
    viewport: any;
}>;
export declare const serializeControl: (control: ClassicPreset.Control) => SerializedControl;
export declare const serializePort: (port: ClassicPreset.Input<ClassicPreset.Socket> | ClassicPreset.Output<ClassicPreset.Socket>) => SerializedPort;
export declare const importEditor: (editor: NodeEditor<Schemes>, data: any) => Promise<void>;
export declare const updateNode: (editor: NodeEditor<Schemes>, nodeId: string, changes: any) => Promise<void>;
export default reteExportImport;
