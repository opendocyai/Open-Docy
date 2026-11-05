export interface Notification {
    event_type: string;
    object_type: string;
    object_id: string | null;
    content: string;
    payload: Record<string, any>;
    page: string | null;
    timestamp: number;
    timestring: string;
}
interface EventSourceState {
    sse_notification_data: Notification[];
    sse_data: any;
}
export declare const useEventSourceStore: import('pinia').StoreDefinition<"eventSource", EventSourceState, {
    getSseData: (state: {
        sse_notification_data: {
            event_type: string;
            object_type: string;
            object_id: string | null;
            content: string;
            payload: Record<string, any>;
            page: string | null;
            timestamp: number;
            timestring: string;
        }[];
        sse_data: any;
    } & import('pinia').PiniaCustomStateProperties<EventSourceState>) => any;
    getSseNotificationData: (state: EventSourceState) => Notification[];
}, {
    SET_SSE_DATA(data?: any): void;
    addSseNotificationData(data: Notification): void;
}>;
export {};
