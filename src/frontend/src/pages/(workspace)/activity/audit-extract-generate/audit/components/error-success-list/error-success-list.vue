<script lang="ts" setup>
import { useApiFile } from "@/api";
import { useHttp } from "@/client";
import { useDownload } from "@/composables";
import { handleExportFile } from "@/shared";
import { message } from "ant-design-vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NuxtIcon } from "@/components";
import to from "await-to-js";

defineOptions({
  name: "ErrorSuccessList",
});
const route = useRoute();
const router = useRouter();
const props = withDefaults(
  defineProps<{
    item?: object | any;
    index?: number;
    taskName?: string;
  }>(),
  {
    item: () => ({}),
    index: 0,
    taskName: "",
  }
);
const handleFileDownload = async (files: any) => {
  console.log("files :", files);
  files.forEach((element: any | Request | URL) => {
    const fileUrl = element[1];
    console.log('fileUrl :', fileUrl);
    const fileName = element[0].split("/").pop();
    console.log('fileName :', fileName);
    handleExportFile(fileUrl, fileName);
  });
};
const { request } = useHttp();
const { downloadFile } = useDownload();

const onDownDialogImage = async (fileKey: any, fileName: any) => {
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiFile("download_presigned_url"), {
      data: {
        file_key: fileKey,
      },
    })
  );
  console.log(res, error);
  if (error) return;
  if (res?.code == 200) {
    const { file_name, url } = res.data;
    if (url) {
      downloadFile(url, file_name);
    } else {
      message.error("URL does not exist");
    }
  }
};
const handlePreview = async (item: any) => {
  router.push(
    `/activity/audit-extract-generate/audit/detail-preview?task_id=${
      route.query.task_id
    }&task_name=${route.query.task_name}&file_name=${encodeURIComponent(item.title)}`
  );
};
const hovered = ref(false);
</script>

<template>
  <div
    class="error-success-list"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    :class="{ success: item.is_passed, error: !item.is_passed }"
  >
    <div class="error-success-list__title">
      <div class="flex-1 flex items-center gap-[5px] min-h-[22px]">
        <span class="error-success-list__title--icon" v-if="!item.is_passed">
          <NuxtIcon name="clipboard_error" class="text-[20px]" />
        </span>
        <span class="fw-600">{{ item.index + 1 }}. {{ item?.title }}</span>
      </div>
      <div class="flex flex-wrap view-button gap-[8px]">
        <div
          v-if="item.files?.length > 0"
          type="link"
          @click="handleFileDownload(item.files)"
          class="flex items-center cursor-pointer"
        >
          <NuxtIcon name="download" class="text-[17px] text-[#999999]" />
        </div>
        <div
          v-if="item.preview"
          type="link"
          @click="handlePreview(item)"
          class="flex items-center cursor-pointer"
        >
          <NuxtIcon name="preview" class="text-[17px] text-[#999999]" />
        </div>
      </div>
    </div>
    <div class="error-success-list__desc">
      <span class="error-success-list__icon" v-if="item.is_passed"></span>
      {{ item?.msg }}
    </div>
  </div>
</template>

<style src="./error-success-list.scss" scoped lang="scss"></style>
