import type { ApiMap } from "@/shared/types";
import { useApiProxy } from "@/utils";

const prefix: string = "/v1/setting";
export const useApiSetting = (name?: string) => {
  const api: ApiMap = {
    user_get: () => ({ method: "get", url: `${prefix}/user` }),
    user_update: (id: string) => ({
      method: "put",
      url: `${prefix}/user/${id}`,
    }),
    user_profile: () => ({ method: "get", url: `${prefix}/user/profile` }),
  };

  return useApiProxy(api, name);
};
