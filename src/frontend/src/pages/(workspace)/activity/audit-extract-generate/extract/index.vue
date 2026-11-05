<script lang="ts" setup>
import { useApiActivity } from "@/api";
import { useHttp } from "@/client";
import { useDialog, useDownload, type DialogExpose } from "@/composables";
import { Empty, Table, Button, Image } from "ant-design-vue";
import { isEmpty } from "lodash";
import { nextTick, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NuxtIcon, TaskGroupData } from '@/components'
import { LoadingOutlined, EyeOutlined } from '@ant-design/icons-vue'
import to from "await-to-js";

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
definePage({
  meta: {
    hidden: true,
  }
});
const route = useRoute();
const router = useRouter();
const isloading = ref(false);
const props = defineProps({
  taskName: {
    type: String,
    default: "",
  },
});
const { request } = useHttp();
const { init } = useDownload()

const columns = ref<any>([]);

const tableData = ref<any>([]);

const isGroupData = ref<boolean>(!!route.query.showGroupData);
const groupData = ref<boolean>(false);

const meDialog: DialogExpose = useDialog({
  width: 750,
  fullscreen: false,
  showClose: true,
  header: true,
  footer: false,
  ok: () => {
    meDialog.close();
  },
});

const handlePreview = async (item: any) => {
  router.push(
    `/activity/audit-extract-generate/extract/detail-preview?task_id=${route.query.task_id}&task_name=${route.query.task_name}&file_name=${encodeURIComponent(item.label)}`,
  );
};
const columns_table = ref<any>({});
const columns_prop: string[] = [];
const handelData = () => {
  columns_table.value.headers.forEach((item: any) => {
    columns_prop.push(item.label);
    if (item.label === "Key Info") {
      Object.assign(item, {
        minWidth: 200,
        className: "bg-[#F7F7F7]!",
      });
    } else {
      Object.assign(item, {
        minWidth: 500,
      });
    }
  });
  columns.value = [
    {
      label: "",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 40,
      fixed: "left",
    },
    ...columns_table.value.headers.map(
      (item: any, index: number, arr: any[]) => {
        const isLast = index === arr.length - 1;
        const isKeyInfo = item.label === "Key Info";
        return {
          label: item.label,
          dataIndex: item.label,
          key: item.label,
          align: item.align || "left",
          files: item.files,
          preview: item.preview,
          color: item.color,
          fixed: isKeyInfo ? "left" : undefined,
          width: isKeyInfo ? 200 : 500,
          resizable: !isLast,
          customHeaderCell: () => ({
            class: item.className || "",
            style: {
              overflow: "hidden",
            },
          }),
          customCell: ({ record }: any) => ({
            style: {},
          }),
        };
      },
    ),
  ];

  tableData.value = columns_table.value.datas.map((row: any[]) => {
    return columns_prop.reduce((acc: any, key, index: number) => {
      const cell = row[index];
      acc[key] = cell
        ? cell
        : {
          type: cell?.type,
          value: cell?.value,
          color: cell?.color,
        };
      return acc;
    }, {});
  });
  get_results_extract_groups();

  console.log(
    tableData.value,
    "tableData.value---tableData.value---tableData.value---tableData.value",
  );
};

const get_results_extract_groups = async () => {
  const dataApi = useApiActivity("get_results_extract_groups")(
    route.query.task_id,
  );
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi)
  );

  if (error) return;
  if (res?.code == 200) {
    console.log(
      !isEmpty(res.data) && !tableData.value.length,
      "(!isEmpty(data.value.data) && !tableData.value.length)",
    );
    if (!isEmpty(res.data)) {
      groupData.value = true;
    }
    if (!isEmpty(res.data) && !tableData.value.length) {
      isGroupData.value = true;
    }
  }
};

const getData = async () => {
  isloading.value = true;
  const dataApi = useApiActivity("get_results_extract")(
    route.query.task_id,
  );
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi,)
  );
  isloading.value = false;

  if (error) return;
  if (res?.code == 200) {
    columns_table.value = res.data;
    handelData();
  }
};
const downloadAllLoading = ref(false);
const onDownloadAll = async () => {
  downloadAllLoading.value = true;
  const task_id = route.query.task_id;
  const dataApi = useApiActivity("get_results_extract_download_all")(
    task_id,
  );

  try {
    const res: any = await request(dataApi, { responseType: "blob", config: { isRaw: true } });

    let fileName: any = res.headers.get("file-name");
    if (!fileName) {
      const disposition = res.headers.get("content-disposition");
      fileName = disposition?.match(/filename="?([^"]+)"?/)?.[1] ?? "data.csv";
    }
    
    if (res.status == 200) {
      init(res.data, fileName);
    }
    downloadAllLoading.value = false;
  } catch (err) {
    console.log("err", err);
    downloadAllLoading.value = false;
  }
};

const handleResizeColumn: any = (w: any, col: { width: any }) => {
  col.width = w;
};

onMounted(async () => {
  getData();
  await nextTick();
});
</script>

<template>
  <div class="h-[400px] flex items-center justify-center" v-if="isloading">
    <LoadingOutlined spin class="text-[20px] c-[#2E2BD9]" />
  </div>
  <div class="flex items-center justify-between mt-[30px] mb-[30px]" v-else>
    <div class="text-[20px] leading-[32px] h-[32px] fw-600 font-[Inter] text-[#010101]">
      {{ taskName }}_Extract:
    </div>

    <div class="flex items-center gap-[15px]" v-if="tableData.length || groupData">
      <Button
        v-if="tableData.length && groupData"
        @click="isGroupData = !isGroupData"
        type="primary"
        :ghost="!isGroupData"
        class="flex items-center gap-[4px]"
      >
        <NuxtIcon name="group-data" /> Group data
      </Button>
      <Button
        v-if="tableData.length || (isGroupData && groupData)"
        class="flex items-center gap-[4px] tab-btn bg-[#2E2BD91A] text-[#2E2BD9] border-none text-[12px] font-[Inter]"
        :loading="downloadAllLoading"
        :disabled="downloadAllLoading || (!tableData.length && !groupData)"
        @click="onDownloadAll"
      >
        Download
        <NuxtIcon
          name="export-icon"
          :class="downloadAllLoading ? 'text-[#ffffff]' : 'text-[#2E2BD9]'"
        />
      </Button>
    </div>
  </div>
  <template v-if="isGroupData">
    <div class="h-[calc(100vh-240px)] mb-[-30px]">
      <task-group-data />
    </div>
  </template>
  <template v-else>
    <div class="h-full flex flex-col mt-[35px] quick-review-wrap" v-if="!isloading">
      <div class="quick-review flex-1" v-if="tableData?.length">
        <Table
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          bordered
          rowKey="index"
          :scroll="{ x: 'max-content', y: 'calc(100vh - 350px)' }"
          class="extract-table"
          style="
            font-family: Inter;
            font-size: 12px;
            color: #000000;
            overflow-x: auto;
            table-layout: fixed;
          "
          @resizeColumn="handleResizeColumn"
        >
          <template #headerCell="{ column }: any">
            <template v-if="column.key === 'index'" class="rounded-[0px]"></template>
            <template v-else>
              <div
                class="quick-review__header"
                :class="{
                  'quick-review__header-info': column.dataIndex === 'Key Info',
                }"
              >
                <div class="quick-review__header--label" :title="column?.label">
                  {{ column?.label }}
                </div>
                <div class="quick-review__header--download">
                  <Button
                    v-if="column?.preview"
                    size="small"
                    class="bg-[#FFFFFF] border-none text-black flex items-center"
                    @click="handlePreview(column)"
                  >
                    <EyeOutlined class="text-[16px] px-[0px]" />
                  </Button>
                </div>
              </div>
            </template>
          </template>
          <template #bodyCell="{ column, index, record }: any">
            <div
              class="px-[12px] py-[8px] min-h-[37px] text-[13px]"
              :style="{
                backgroundColor: record[column.dataIndex]?.color || '',
              }"
            >
              <template v-if="column.key === 'index'">
                <span class="inline-block min-w-[24px]">{{ index + 1 }}</span>
              </template>
              <template v-if="record[column.dataIndex]?.type == 'files'">
                <Image :src="record[column.dataIndex]?.value[0]" :height="40" />
              </template>
              <template
                v-if="record[column.dataIndex]?.type == 'text'"
                :title="record[column.dataIndex]?.value"
              >
                {{ record[column.dataIndex]?.value }}
              </template>
            </div>
          </template>
        </Table>
      </div>
      <Empty
        :image="simpleImage"
        description="No data"
        v-else
        style="margin-top: 100px"
      />
    </div>
  </template>
</template>

<style src="./index.scss" scoped lang="scss"></style>
<style>
.quick-review-wrap {
  height: calc(100vh - 260px);
}

.quick-review {
  height: calc(100vh - 260px);
}

.extract-table .ant-table-thead .ant-table-cell {
  height: 37px !important;
  padding: 0px 0px !important;
}

.extract-table .ant-table-tbody .ant-table-cell {
  height: 37px !important;
  padding: 0px 0px !important;
}

.ant-table-wrapper .ant-table-container table > thead > tr:first-child > *:first-child {
  border-start-start-radius: 0px;
}
</style>
