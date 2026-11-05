import { GetSchemes, ClassicPreset } from 'rete';
import { VueArea2D } from 'rete-vue-plugin';
import { SocketData } from 'rete-connection-plugin';
export declare class Node extends ClassicPreset.Node<Record<string, ClassicPreset.Socket>, Record<string, ClassicPreset.Socket>, Record<string, ClassicPreset.InputControl<"number"> | ClassicPreset.InputControl<"text">>> {
}
export declare class Connection<A extends Node, B extends Node> extends ClassicPreset.Connection<A, B> {
    isMagnetic: boolean;
}
export type Schemes = GetSchemes<Node, Connection<Node, Node>>;
export type AreaExtra = VueArea2D<Schemes>;
export type Position = {
    x: number;
    y: number;
};
export type Rect = {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export type Props = {
    createConnection: (from: SocketData, to: SocketData) => Promise<void>;
    display: (from: SocketData, to: SocketData) => boolean;
    offset: (socket: SocketData, position: Position) => Position;
    margin?: number;
    distance?: number;
};
export interface MagneticState {
    active: boolean;
    sourceNodeId?: string;
    sourceOutput?: string;
    targetNodeId?: string;
    targetInput?: string;
}
export type NodeFactory = "InputFile" | "DataExtractor" | "ExtractSignature" | "AuditNode" | "AuditNodeField" | "AuditNodeGlobal" | "ConditionalNode" | "InteractionNode" | "KnowledgeNode" | "DocumentTemplateNode" | "WebSearch" | "ContentGeneratorNode" | "CustomComponent" | "GroupInputFile" | "GroupDataExtractor" | "CompliancePolicy" | "CustomPart";
export interface NodeTemplate {
    icon?: string;
    label: string;
    json?: any;
    factory: NodeFactory | any;
    hidden?: boolean;
}
export type UpdateNodeProps = (data?: any) => void;
