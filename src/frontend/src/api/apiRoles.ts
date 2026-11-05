import type { ApiMap } from '@/shared/types'
import {useApiProxy} from '@/utils';

const prefix: string = "/v1/sys/role";
export const useApiRoles = (name?: string) => {
  const api: ApiMap = {
    role_option_list: () => ({ method: "post", url: `${prefix}/option/list` }),
    role_add: () => ({ method: "post", url: `${prefix}/add`}),
    role_update: (id: any) => ({ method: "put", url: `${prefix}/${id}/update`}),
    role_delete: (id: any) => ({ method: "delete", url: `${prefix}/${id}/del`}),
    get_role_menus: (id: any) => ({ method: "get", url: `${prefix}/${id}/menus`}),
    update_role_menus: () => ({ method: "post", url: `${prefix}/menus`}),
    get_role_perms: (id: any) => ({ method: "get", url: `${prefix}/${id}/perms` }),
  };

  return useApiProxy(api, name)
};
