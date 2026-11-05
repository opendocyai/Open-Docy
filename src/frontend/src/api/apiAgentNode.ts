import type { ApiMap } from "@/shared";
import { useApiProxy } from "@/utils";

const prefix: string = "/v1/node";
export const useApiAgentNode = (name?: string) => {
  const api: ApiMap = {
    check_save: (node_id: string) => ({
      url: `${prefix}/${node_id}/check_save`,
      method: "post",
    }),
    get_code: (node_id: string) => ({
      url: `${prefix}/${node_id}/get_code`,
      method: "get",
    }),
  };

  return useApiProxy(api, name);
};
