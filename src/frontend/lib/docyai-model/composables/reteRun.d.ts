import { ClassicPreset, NodeEditor } from 'rete';
import { Ref } from 'vue';
import { Schemes } from '../shared';
interface PreUpdateAgentOptions {
    agent?: {
        name?: string | any;
        description?: string | any;
        space_id?: string | any;
        template_json?: object | any;
    };
    code?: string | any;
    isJson?: boolean;
    save_as_draft?: boolean;
}
interface PreRunAgentOptions {
    run_node_name?: string | any;
    code?: string | any;
}
type addPortsAllOptions = {
    nodeId: string;
    socket?: ClassicPreset.Socket;
    multipleConnections?: boolean;
};
type AddPortsInputsOptions = {
    nodeId: any;
    socket?: ClassicPreset.Socket;
    input?: string;
    multipleConnections?: boolean;
};
type AddPortsOutputsOptions = {
    nodeId: any;
    socket?: ClassicPreset.Socket;
    output?: string;
};
type ReteRunEditor = NodeEditor<Schemes>;
interface ReteRunOptions {
    route: {
        query: Record<string, any>;
    };
}
export declare function useReteRun(options: ReteRunOptions): {
    importEditor: (editor: NodeEditor<Schemes>, data: any) => Promise<void>;
    pre_update_agent: <T = any>(params?: PreUpdateAgentOptions) => Promise<[Error, undefined] | boolean[] | [null, T]>;
    setAddPortsAll: (options: addPortsAllOptions) => Promise<void>;
    pre_run_agent: <T>(params?: PreRunAgentOptions) => Promise<[Error, undefined] | [null, T]>;
    updateNode: <T>(editor: ReteRunEditor, nodeId: string, changes: T) => Promise<void>;
    onLocked: (props: any, lock: Ref<boolean>) => void;
    setAddPortsOutputs: (options: AddPortsOutputsOptions) => Promise<void>;
    setAddPortsInputs: (options: AddPortsInputsOptions) => Promise<void>;
    removeInput: (nodeId: string, input: string) => Promise<void>;
    removeOutput: (nodeId: string, output: string) => Promise<void>;
};
export {};
