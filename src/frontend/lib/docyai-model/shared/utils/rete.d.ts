import { NodeEditor } from 'rete';
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin';
import { VuePlugin } from 'rete-vue-plugin';
import { ReadonlyPlugin } from 'rete-readonly-plugin';
import { CreateEditorOptions } from './createReteApp';
import { Schemes, AreaExtra } from '..';
export declare function createEditor(container: HTMLElement, options?: CreateEditorOptions): Promise<{
    destroy: () => () => void;
    editor: NodeEditor<Schemes>;
    area: AreaPlugin<Schemes, AreaExtra>;
    socket: Record<any, any>;
    connection: any;
    render: VuePlugin<Schemes, AreaExtra>;
    selector: AreaExtensions.Selector<any>;
    accumulating: {
        [key: string]: any;
        active(): boolean;
        destroy(): void;
    };
    readonly: ReadonlyPlugin<Schemes>;
    nodeEventBus: ReadonlyPlugin<Schemes>;
}>;
