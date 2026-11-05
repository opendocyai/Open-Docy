import { Ref } from 'vue';
declare class ReteConnections {
    selectedConnections: Ref<Set<string> & Omit<Set<string>, keyof Set<any>>, Set<string> | (Set<string> & Omit<Set<string>, keyof Set<any>>)>;
    select: (id: string) => void;
    unselect: (id: string) => void;
    isSelected: (id: string) => boolean;
    clear: () => void;
    setSelected: (ids: string[]) => void;
    constructor();
    useReteConnectionSelection(): {
        isSelected: (id: string) => boolean;
        select: (id: string) => void;
        unselect: (id: string) => void;
        clear: () => void;
        setSelected: (ids: string[]) => void;
    };
    getConnection(_: any, { selector, accumulating, area, isEnabled, }: {
        selector: any;
        accumulating: any;
        area: any;
        isEnabled?: Ref<boolean>;
    }): (props: any) => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
        [key: string]: any;
    }>;
}
export declare const reteConnections: ReteConnections;
export declare const getConnection: (_: any, { selector, accumulating, area, isEnabled, }: {
    selector: any;
    accumulating: any;
    area: any;
    isEnabled?: Ref<boolean>;
}) => (props: any) => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>;
export default reteConnections;
