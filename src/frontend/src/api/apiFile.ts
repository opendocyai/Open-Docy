import type { ApiMap } from "@/shared/types";
import { useApiProxy } from "@/utils";

const prefix: string = "/v1/common";
export const useApiFile = (name?: string) => {
  const api: ApiMap = {
    upload_presigned: () => ({
      url: `${prefix}/upload/presigned-url`,
      method: "post",
    }),

    upload_presigned_url: () => ({
      method: "post",
      url: `${prefix}/upload/presigned-url`,
    }),
    download_presigned_url: () => ({
      method: "post",
      url: `${prefix}/pre-download/url`,
    }),
    pre_signed: () => ({
      method: "post",
      url: `${prefix}/pre-signed/url`,
    }),
  };

  return useApiProxy(api, name);
};
