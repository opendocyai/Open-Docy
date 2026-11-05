import {
  type UploadFile,
  STATUS_UPLOADING,
  STATUS_FAIL,
  CODE_OK,
  toProxyUrl,
} from "@/shared";
import { getFileExtension } from "@/utils";
import { message } from "ant-design-vue";
import { useHttp } from "@/client";
import { useApiFile } from "@/api";
import to from "await-to-js";

interface UploadOption {
  category: string;
}

export async function useUpload(
  filesArray: UploadFile[],
  option: UploadOption,
) {
  const { request } = useHttp();

  await Promise.all(
    filesArray
      .filter((item: UploadFile) => !item.key)
      .map((item: UploadFile) => upload_presigned_url(item)),
  );

  async function upload_presigned_url(item: UploadFile) {
    if (!item.raw) return;
    item.status = STATUS_UPLOADING;

    try {
      const fileInfos = {
        category: option.category,
        file_name: item.name,
        file_type: item.type,
        file_size: item.size,
      };

      const [err, res] = await to(
        request(useApiFile("pre_signed"), {
          data: fileInfos,
          config: { isAuth: false },
        }),
      );
      if (err) return (item.status = STATUS_FAIL);

      if (res?.code === CODE_OK) {
        const uploadUrl = toProxyUrl(res?.data.upload_url) ?? "";

        if (res?.data.store_type == "local") {
          const formData = new FormData();

          formData.append("file", item.raw);

          await fetch(uploadUrl, {
            method: "PUT",
            body: formData,
          });
        } else {
          await fetch(uploadUrl, {
            method: "PUT",
            body: item.raw,
            headers: {
              "x-ms-blob-type": "BlockBlob",
            },
          });
        }

        item.key = res?.data.key;
        item.status = "success";
        item.file_ext = item.fileType = getFileExtension(item.name!);
      }
    } catch (error) {
      console.log("error :", error);
      item.status = STATUS_FAIL;
      await message.error(`Failed to upload ${item.name}. Please try again.`);
    }
  }

  return filesArray;
}
