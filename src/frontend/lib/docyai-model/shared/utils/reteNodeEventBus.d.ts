type CallbackFunction = (data: any) => void;
type UnsubscribeFunction = () => void;
export declare class ReteNodeEventBus {
    private listeners;
    subscribe(nodeId: string, callback: CallbackFunction): UnsubscribeFunction;
    unsubscribe(nodeId: string, callback: CallbackFunction): void;
    publish(nodeId: string, data: any): void;
    destroy(): void;
}
export declare const reteNodeEventBus: ReteNodeEventBus;
export {};
