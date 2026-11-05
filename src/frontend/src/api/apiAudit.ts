import type { ApiMap } from "@/shared";
import { useApiProxy } from "@/utils";

const prefix: string = '/v1/audit'
export const useApiAudit = (name?: string) => {
  const api: ApiMap = {
    stats: () => ({url: `${prefix}/stats`, method: 'get'}),
    query: () => ({url: `${prefix}/query`, method: 'get'}),
    filter_event_types: () => ({url: `${prefix}/filter-event-types`, method: 'get'}),
    export: () => ({url: `${prefix}/export`, method: 'get'}),
    events_verify: (event_id: string) => ({url: `${prefix}/events/${event_id}/verify`, method: 'get'}),
    events_detail: (event_id: string) => ({url: `${prefix}/events/${event_id}`, method: 'get'}),
  };

  return useApiProxy(api, name)
}


