import { NodeEditor, ClassicPreset } from 'rete';
import { ConnectionPlugin } from 'rete-connection-plugin';
import { AreaPlugin, NodeView } from 'rete-area-plugin';
import { Node, Connection, Rect, Position, Schemes, AreaExtra, Props } from '..';
declare class ReteConnection {
    isCompatibleSocket(socket: any): socket is {
        isCompatibleWith: (socket: ClassicPreset.Socket) => boolean;
    };
    getNodeRect(node: Node, view: NodeView, area: any): {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    isInsideRect(rect: Rect, point: Position, margin: number): boolean;
    findNearestPoint<T extends Position>(points: T[], target: Position, maxDistance: number): T | undefined;
    canMakeConnection(connection: ConnectionPlugin<Schemes, AreaExtra> | any, editor: NodeEditor<Schemes>, from: any, to: any, isCreate?: boolean): boolean;
    getConnectionSockets(editor: NodeEditor<Schemes>, connection: Connection<Node, Node>): {
        source: ClassicPreset.Socket;
        target: ClassicPreset.Socket;
    } | null;
    useConnectionPlugin(connection: ConnectionPlugin<Schemes, AreaExtra> | any, editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>): void;
    createConnection(connection: ConnectionPlugin<Schemes, AreaExtra> | any, editor: NodeEditor<Schemes>, from: any, to: any): Promise<void>;
    useMagneticConnection<S extends Schemes, K = never>(connection: ConnectionPlugin<S, K>, props: Props): void;
}
export declare const reteConnection: ReteConnection;
export declare const useMagneticConnection: <S extends Schemes, K = never>(connection: ConnectionPlugin<S, K>, props: Props) => void;
export declare const useConnectionPlugin: (connection: ConnectionPlugin<Schemes, AreaExtra> | any, editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>) => void;
export declare const createConnection: (connection: ConnectionPlugin<Schemes, AreaExtra> | any, editor: NodeEditor<Schemes>, from: any, to: any) => Promise<void>;
export default reteConnection;
