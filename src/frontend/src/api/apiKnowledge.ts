import type { ApiMap } from "@/shared/types";
import { useApiProxy } from "@/utils";

const prefix: string = "/v1/knowledge";
export const useApiKnowledge = (name?: string) => {
  const api: ApiMap = {
    create_knowledge: () => ({ method: "post", url: `${prefix}/create` }),
    get_knowledge_list: () => ({ method: "get", url: `${prefix}/list` }),
    get_knowledge_detail: (id: string) => ({
      method: "get",
      url: `${prefix}/${id}`,
    }),
    update_knowledge: (id: string) => ({
      method: "put",
      url: `${prefix}/${id}`,
    }),
    delete_knowledge: (id: string) => ({
      method: "delete",
      url: `${prefix}/${id}`,
    }),
    delete_knowledge_multiple: () => ({
      method: "delete",
      url: `${prefix}/batch_delete`,
    }),
    export_knowledge: (id: string) => ({
      method: "get",
      url: `${prefix}/export/${id}`,
    }),
    option_list: () => ({ method: "get", url: `${prefix}/option/list` }),
  };

  return useApiProxy(api, name);
};
