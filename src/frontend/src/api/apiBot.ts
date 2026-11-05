import type { ApiMap } from "@/shared/types";
import { useApiProxy } from "@/utils";

const prefix: string = "/v1/bot";
export const useApiBot = (name?: string) => {
  const api: ApiMap = {
    get_user_session: () => ({ method: "get", url: `${prefix}/session` }),
    create_user_session: () => ({
      method: "post",
      url: `${prefix}/session/create`,
    }),
    send_message: () => ({ method: "post", url: `${prefix}/message/send` }),
    get_message_list: () => ({ method: "get", url: `${prefix}/messages` }),
    get_session_list: () => ({ method: "get", url: `${prefix}/session/list` }),
    delete_session: (id: string) => ({
      method: "delete",
      url: `${prefix}/session/${id}`,
    }),
    update_session: (id: string) => ({
      method: "put",
      url: `${prefix}/session/${id}`,
    }),
  };

  return useApiProxy(api, name);
};
