import { ClassicPreset, NodeEditor } from 'rete';
import { AreaPlugin } from 'rete-area-plugin';
import { ShallowRef } from 'vue';
import { Schemes, AreaExtra } from '..';
export type AddPortsOptions = {
    socket: ClassicPreset.Socket;
};
export type AddPortsInputsOptions = {
    node: any;
    socket?: ClassicPreset.Socket;
    input?: string;
    multipleConnections?: boolean;
};
export type AddPortsOutputsOptions = {
    node: any;
    socket?: ClassicPreset.Socket;
    output?: string;
};
export type addPortsAllOptions = {
    node: any;
    socket?: ClassicPreset.Socket;
    multipleConnections?: boolean;
};
export declare class ReteAddPorts {
    options: AddPortsOptions;
    editor: ShallowRef<NodeEditor<Schemes>, any>;
    area: ShallowRef<AreaPlugin<Schemes, AreaExtra>, any>;
    constructor(options: AddPortsOptions);
    addPortsAll(allOptions: addPortsAllOptions): Promise<void>;
    addPortsOutputs(outputs: AddPortsOutputsOptions): Promise<{
        output: string;
    } | undefined>;
    addPortsInputs(inputs: AddPortsInputsOptions): Promise<{
        input: string;
    } | undefined>;
    removeInput(node: any, input: string): void;
    removeOutput(node: any, output: string): void;
}
export declare const reteAddPorts: (options: AddPortsOptions) => ReteAddPorts;
export default reteAddPorts;
