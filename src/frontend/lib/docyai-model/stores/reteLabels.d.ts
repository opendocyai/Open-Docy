import { NodeTemplate } from '../shared';
export declare const useReteLabelsStore: import('pinia').StoreDefinition<"reteLabels", {
    nodes: NodeTemplate[];
    group_nodes: NodeTemplate[];
}, {}, {
    SET_NODES(list: NodeTemplate[]): void;
    SET_GROUP_NODES(list: NodeTemplate[]): void;
    SET_LABELS(): Promise<(Error | {
        data: any;
        code: number;
    } | null | undefined)[]>;
}>;
