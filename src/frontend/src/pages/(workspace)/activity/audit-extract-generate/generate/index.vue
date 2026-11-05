<script lang="ts" setup>
import { useApiActivity } from "@/api";
import { useHttp } from "@/client";
import { useDownload, useFileIconList } from "@/composables";
import { handleExportFile } from "@/shared";
import { useCommonStore, useMainStore } from "@/stores";
import { formatDateTime, getFileExtension } from "@/utils";
import { Empty, Card, Button } from "ant-design-vue";
import { LoadingOutlined } from '@ant-design/icons-vue'
import to from "await-to-js";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NuxtIcon } from '@/components'

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const { request } = useHttp();
const { init } = useDownload()

const route = useRoute();
const router = useRouter()

const dataList = ref<any>([]);
const commonStore: any = useCommonStore();
const mainStore = useMainStore();
const props = defineProps({
  taskName: {
    type: String,
    default: '',
  },
});
const isloading = ref(false);

const { fileIconList } = useFileIconList();
const getIconByFileName = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  if (!extension) return "";

  const match = fileIconList.value.find(
    (item: any) => item.id.toLowerCase() === extension
  );
  return match ? match.icon : "";
};
const handleStatus = (status: string) => {
  if (status === "Generated") {
    return "text-#17C653";
  } else if (status === "Failed") {
    return "text-#F63C47";
  }
};
const handleCardStyle = (status: string) => {
  if (status === "Generated") {
    return "my-card-info-generated";
  } else if (status === "Failed") {
    return "my-card-info-failed";
  }
};
const handleCardCoverStyle = (status: string) => {
  if (status === "Generated") {
    return "generated-card";
  } else if (status === "Failed") {
    return "failed-card";
  }
};

const downloadAllLoading = ref(false);
const onDownloadAll = async () => {
  downloadAllLoading.value = true;
  const task_id = route.query.task_id;
  const dataApi = useApiActivity("get_results_generated_download_all")(
    task_id,
  );

  try {
    const res: any = await request(dataApi, { responseType: "blob", config: { isRaw: true } });
    let fileName: any = res.headers.get("file-name");
    if (!fileName) {
      const disposition = res.headers.get("content-disposition");
      fileName = disposition?.match(/filename="?([^"]+)"?/)?.[1] ?? "data.csv";
    }
    const ext = fileName.split(".").pop();
    if (res.status == 200) {
      init(res.data, `Generate-${props.taskName}.${ext}`);
    }
    downloadAllLoading.value = false;
  } catch (err) {
    console.log("err", err);
    downloadAllLoading.value = false;
  }
};
const onDownload = async (item: any) => {
  if (!item.url) {
    return;
  } else {
    handleExportFile(item.url, item.name);
  }
};
const onPreview = async (item: { status: string; name: any; url: any }) => {
  console.log("🚀 ~ onPreview ~ item: ", getFileExtension(item.name));
  if (!isPreviewFile(item.name)) return
  if (item.status == "Failed") {
    return;
  } else {
    localStorage.setItem('generate_file_preview_url', item.url)
    router.push(
      `/activity/audit-extract-generate/generate/detail-preview?task_id=${route.query.task_id}&task_name=${route.query.task_name}&file_name=${encodeURIComponent(item.name)}`
    );
  }
};

const getDate = async () => {
  isloading.value = true;
  const dataApi = useApiActivity("get_results_files_generate")(route.query.task_id);
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi)
  );
  isloading.value = false;

  if (error) return;
  if (res?.code == 200) {
    dataList.value = res.data;
  }
};


const isPreviewFile = (name: string) => {
  return ['pdf', 'docx', 'xls', 'xlsx'].includes(getFileExtension(name))
}


onMounted(() => {
  getDate();
});
</script>
<template>
  <div class="h-[400px] flex items-center justify-center" v-if="isloading">
    <LoadingOutlined spin class="text-[20px] c-[#2E2BD9]" />
  </div>
  <div class="flex items-center justify-between mt-[30px] mb-[30px]" v-else>
    <div class="text-[20px] leading-[32px] h-[32px] fw-600 font-[Inter] text-[#010101]">
      {{ taskName }}_Output files:
    </div>

    <Button v-if="dataList.length"
      class="flex items-center gap-[4px] tab-btn bg-[#2E2BD91A] text-[#2E2BD9] border-none text-[12px] font-[Inter]"
      :loading="downloadAllLoading" :disabled="downloadAllLoading || !dataList.length" @click="onDownloadAll">
      Download All
      <NuxtIcon name="export-icon" :class="downloadAllLoading ? 'text-[#ffffff]' : 'text-[#2E2BD9]'" />
    </Button>
  </div>
  <div v-if="!isloading">
    <div class="card-wrap" v-if="dataList.length > 0">
      <div v-for="(item, index) in dataList" :key="index" class="my-card-item">
        <Card hoverable class="my-card-info" :class="handleCardStyle(item.status)">
          <template #cover>
            <div class="pt-[18px] px-[16px] pb-[25px] rounded-t-[10px]" :class="handleCardCoverStyle(item.status)">
              <div class="card-title flex items-center gap-[10px] text-[#010101] text-[14px] leading-[20px] mb-[16px]">
                <img :src="getIconByFileName(item.name)" alt="" style="width: 35px" />
                <span>{{ item.name }}</span>
              </div>
              <div class="text-[12px] font-[Inter] leading-[20px] text-[#555555] pb-[8px]">
                <span class="mr-[16px]">Output Status:</span>
                <span :class="handleStatus(item.status)">
                  {{ item.status }}
                </span>
              </div>
              <div class="text-[12px] font-[Inter] leading-[20px] text-[#555555]">
                <span class="mr-[16px]">Output Date:</span>
                <span>{{ formatDateTime(item.generate_date) }}</span>
              </div>
            </div>
          </template>
          <template #actions>
            <div class="flex items-center justify-center gap-[4px] border-none text-[12px]" :class="item.status == 'Failed'
              ? 'text-[#E1E1E1] pointer-events-none'
              : 'text-[#4285F4]'
              " @click="onDownload(item)">
              Download
              <NuxtIcon name="download-icon" class="text-[11px]" />
            </div>
            <div class="flex items-center justify-center gap-[4px] border-none text-[12px]" :class="(item.status == 'Failed' || !isPreviewFile(item.name))
              ? 'text-[#E1E1E1] pointer-events-none'
              : 'text-[#37CD7D]'
              " @click="onPreview(item)">
              Preview
              <NuxtIcon name="preview-icon" class="text-[12px]" />
            </div>
          </template>
        </Card>
      </div>
    </div>
    <Empty :image="simpleImage" description="No data" v-else style="margin-top: 100px" />
  </div>
</template>
<style src="./index.scss" scoped lang="scss"></style>
