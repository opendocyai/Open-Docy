<script setup lang="ts">
import to from "await-to-js";

defineOptions({
  name: "UploadAvatar",
});

import { message, Avatar } from "ant-design-vue";

import type { UploadFile } from "@/shared";
import { CODE_OK, STATUS_FAIL, STATUS_SUCCESS, STATUS_UPLOADING } from "@/shared";

import { useHttp } from "@/client";
import { getFileExtension } from "@/utils";
import { BaseUpload } from "@/components";

import { useApiFile } from "@/api";
import { useUploadPresigned } from "@/composables";

withDefaults(defineProps<{ avatar?: string; userInfo?: any }>(), {
  avatar: "",
  userInfo: () => ({}),
});

const emit = defineEmits(["update:avatar", "upload"]);

const { request } = useHttp();

const { upload_presigned_url } = useUploadPresigned();

const handleChange = async (files: File[], filesArray: UploadFile[]) => {
  await Promise.all(
    filesArray
      .filter((item: any) => !item.key)
      .map((item: any) => _upload_presigned_url(item))
  );
  console.log("🚀 ~ handleChange ~ filesArray: ", filesArray);

  emit("update:avatar", URL.createObjectURL(files[0]!));
};

const _upload_presigned_url = async (item: any) => {
  if (!item.raw) return;
  item.status = STATUS_UPLOADING;
  try {
    const fileInfos = {
      file_name: item.name,
      category: "default",
      file_type: item.type,
      file_size: item.size,
    };

    const { data, error } = await upload_presigned_url({
      info: fileInfos,
      row: item.raw,
      ...item,
    });

    if (error.value) return (item.status = STATUS_FAIL);

    console.log("data, error :", data, error);

    if (data.value) {
      item.key = data.value.key;
      item.status = STATUS_SUCCESS;
      item.file_ext = getFileExtension(item.name);
    }

    emit("upload", data.value);
  } catch (e) {
    console.log("🚀 ~ upload_presigned_url ~ e: ", e);
    item.status = STATUS_FAIL;
    await message.error(`Failed to upload ${item.name}. Please try again.`);
  }
};
</script>

<template>
  <div class="upload-avatar">
    <base-upload accept="jpeg,png,svg" @change="handleChange">
      <Avatar :src="avatar" :size="66" v-if="avatar" />
      <Avatar :size="66" :style="{ 'background-color': userInfo?.default_color }" v-else>
        {{ userInfo?.display?.substring(0, 1).toUpperCase() }}
      </Avatar>
    </base-upload>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
