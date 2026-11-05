import {defineStore, acceptHMRUpdate} from 'pinia'

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

export const useEventSourceStore = defineStore("eventSource", {
	state: (): EventSourceState => ({
		sse_data: null as any,
		sse_notification_data: [],
	}),
	getters: {
		getSseData: (state) => state.sse_data,
		getSseNotificationData: (state: EventSourceState) => state.sse_notification_data,
	},
	actions: {
		SET_SSE_DATA(data?: any) {
			this.sse_data = data;
		},
		addSseNotificationData(data: Notification) {
			this.sse_notification_data.push(data)
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useEventSourceStore, import.meta.hot));
}

