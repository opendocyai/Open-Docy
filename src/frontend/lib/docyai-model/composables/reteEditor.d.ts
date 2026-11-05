import { CreateEditorOptions } from '../shared';
export declare function useReteEditor(container: HTMLElement, options?: CreateEditorOptions): Promise<{
    destroy: () => () => void;
    editor: import('rete').NodeEditor<import('../shared').Schemes>;
    area: import('rete-area-plugin').AreaPlugin<import('../shared').Schemes, import('../shared').AreaExtra>;
    socket: Record<any, any>;
    connection: any;
    render: import('rete-vue-plugin').VuePlugin<import('../shared').Schemes, import('../shared').AreaExtra>;
    selector: import('rete-area-plugin/_types/extensions').Selector<any>;
    accumulating: {
        [key: string]: any;
        active(): boolean;
        destroy(): void;
    };
    readonly: import('rete-readonly-plugin').ReadonlyPlugin<import('../shared').Schemes>;
    nodeEventBus: import('rete-readonly-plugin').ReadonlyPlugin<import('../shared').Schemes>;
}>;
