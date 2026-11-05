import type { ApiMap } from "@/shared/types";
import { useApiProxy } from "@/utils";

const prefix: string = '/v1/dom/tpl'
export const useApiDom = (name?: string) => {
  const api: ApiMap = {
    create_dom_tpl: () => ({ method: "post", url: `${prefix}/create` }),
    get_dom_list: () => ({ method: "get", url: `${prefix}/list` }),
    get_dom_option_list: () => ({ method: "get", url: `${prefix}/option/list` }),
    get_dom_tpl_detail: (id: string) => ({ method: "get", url: `${prefix}/${id}` }),
    update_dom_tpl: (id: string) => ({ method: "put", url: `${prefix}/${id}` }),
    delete_dom_tpl: (id: string) => ({ method: "delete", url: `${prefix}/${id}` }),
    delete_dom_tpl_multiple: () => ({ method: "delete", url: `${prefix}` }),
    export_dom_tpl: (id: string) => ({ method: "get", url: `${prefix}/export/${id}` }),
    upload_dom_tpl: () => ({ method: "post", url: `${prefix}/upload` }),
    extract_dom_tpl: (id: string) => ({ method: "get", url: `${prefix}/${id}/extract/fields` }),
  };

  return useApiProxy(api, name)
};

