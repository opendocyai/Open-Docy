import type { ApiMap } from '@/shared/types'
import {useApiProxy} from '@/utils';

const prefix: string = '/v1/inner/message'
export const useApiInnerMessage = (name?: string) => {
  const api: ApiMap = {
    get_inner_message_list: () => ({ method: "get", url: `${prefix}/list` }),
    get_inner_message_count_unread: () => ({ method: "get", url: `${prefix}/count/unread` }),
    set_message_all_read: () => ({ method: "post", url: `${prefix}/set_all_read` }),
    update_message_status: (id: any) => ({ method: "put", url: `${prefix}/${id}` }),
    get_message_detail: (id: any) => ({ method: "get", url: `${prefix}/${id}` }),
  };

  return useApiProxy(api, name)
};
