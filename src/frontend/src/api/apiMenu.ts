import type { ApiMap } from '@/shared/types'
import {useApiProxy} from '@/utils';

const prefix: string = "/v1/sys/menu";
export const useApiMenu = (name?: string) => {
  const api: ApiMap = {
    menu_list: () => ({ method: "get", url: `${prefix}/sidebar` }),
    menu_tree: () => ({ method: "get", url: `${prefix}/tree` }),
  };

  return useApiProxy(api, name)
};
