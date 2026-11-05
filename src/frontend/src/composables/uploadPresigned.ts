import { useApiFile } from "@/api";
import { useHttp } from "@/client";
import { toProxyUrl } from "@/shared";
import to from "await-to-js";
import { ref, type Ref } from "vue";

interface FileInfo {
  info: any;
  row: File;
  uid: string;
}

interface UploadResponse {
  data?: any;
  code: number;
  upload_url?: string;
  store_type?: string;
}

interface UploadResult<T = any> {
  data: Ref<T | null>;
  error: Ref<Error | null>;
}

class UploadPresignedClass {
  constructor() {}

  async upload_presigned_url(fileInfos: FileInfo): Promise<UploadResult> {
    const { request } = useHttp();
    const result: UploadResult = {
      data: ref(null),
      error: ref(null),
    };

    try {
      const [error, res] = await to<{
        data: UploadResponse;
        code: number;
      }>(request(useApiFile("pre_signed"), { data: fileInfos.info }));

      if (error) {
        result.error.value = error;
        return result;
      }

      if (res?.code !== 200 || !res?.data?.upload_url) {
        throw new Error("Failed to get pre-signed URL");
      }

      console.log(fileInfos, "fileInfos.row");
      const contentType = fileInfos.row?.type || "application/octet-stream";
      const uploadUrl = toProxyUrl(res?.data.upload_url) ?? "";

      if (res?.data.store_type == "local") {
        const formData = new FormData();

        formData.append("file", fileInfos.row);

        await fetch(uploadUrl, {
          method: "PUT",
          body: formData,
        });
      } else {
        await fetch(uploadUrl, {
          method: "PUT",
          body: fileInfos.row,
          headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": contentType,
          },
        });
      }

      result.data.value = { ...res.data, uid: fileInfos.uid };
      return result;
    } catch (error) {
      result.error.value = error as Error;
      return result;
    }
  }
}

let uploadPresignedInstance: ReturnType<typeof useUploadPresigned> | null =
  null;

let uploadPresignedClass: UploadPresignedClass | any = null;

export const useUploadPresigned = (): any => {
  if (uploadPresignedInstance) return uploadPresignedInstance;

  if (!uploadPresignedClass) {
    uploadPresignedClass = new UploadPresignedClass();
  }

  uploadPresignedInstance = {
    uploadPresigned: uploadPresignedClass,
    upload_presigned_url:
      uploadPresignedClass.upload_presigned_url.bind(uploadPresignedClass),
  };

  return uploadPresignedInstance;
};
