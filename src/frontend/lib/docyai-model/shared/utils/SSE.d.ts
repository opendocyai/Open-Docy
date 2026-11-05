import { SSEStatus, SSEManagerOptions } from '../types/SSE';
declare class SSEManagerClass {
    private eventSource;
    private reconnectTimer;
    private retryCount;
    status: import('vue').Ref<SSEStatus, SSEStatus>;
    private readonly options;
    constructor(options: SSEManagerOptions);
    private printLog;
    private printError;
    get isConnected(): import('vue').ComputedRef<boolean>;
    get isReconnecting(): import('vue').ComputedRef<boolean>;
    get isConnecting(): import('vue').ComputedRef<boolean>;
    get isIdle(): import('vue').ComputedRef<boolean>;
    get isDisconnected(): import('vue').ComputedRef<boolean>;
    connect(): Promise<void>;
    private bindEvents;
    disconnect(): void;
    reconnect(): void;
    private handleReconnect;
    private clearReconnectTimer;
    destroy(): void;
}
export declare const SSEManager: (options: SSEManagerOptions) => SSEManagerClass;
export type SSEManagerType = SSEManagerClass;
export {};
