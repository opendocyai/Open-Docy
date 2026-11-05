import { Node, Connection } from '..';
declare class ReteNodeConnections {
    processNodeConnections(data: {
        nodes: Node[];
        connections: Connection<Node, Node>[];
    }): {
        nodes: Node[];
        connections: Connection<Node, Node>[];
    };
}
export declare const reteNodeConnections: ReteNodeConnections;
export declare const processNodeConnections: (data: {
    nodes: Node[];
    connections: Connection<Node, Node>[];
}) => {
    nodes: Node[];
    connections: Connection<Node, Node>[];
};
export default reteNodeConnections;
