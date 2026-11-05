<script setup lang="ts">
import { useRouterStore, useSpaceStore } from "@/stores";
import { BaseCard, NuxtIcon, AuditLogsCard, AuditLogsDetails } from "@/components";
import {
  Avatar,
  Button,
  DatePicker,
  Drawer,
  Input,
  Select,
  SelectOption,
  Table,
  Tag,
  Tooltip,
  type TableColumnsType,
  type TablePaginationConfig,
} from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { debounce } from "lodash";
import { ref, watch } from "vue";
import dayjs from "dayjs";
import { useApiAudit } from "@/api";
import { useHttp } from "@/client";
import { useDownload } from "@/composables";
import to from "await-to-js";

const RangePicker = DatePicker.RangePicker;

const routerStore = useRouterStore();
const spaceStore = useSpaceStore();

const { request } = useHttp();
const { init: download } = useDownload();

routerStore.SET_BREADCRUMB([
  {
    name: "Audit Logs",
    path: "/audit-logs",
    isClickable: false,
  },
]);

interface AuditEvent {
  id: string;
  action: string;
  action_label?: string;
  action_description?: string;
  event_time: string;
  actor_name?: string;
  actor_avatar?: string;
  resource_type: string;
  outcome: string;
}

interface AuditStats {
  total_events: number;
  users_active_7d: number;
  integrity_status: string;
  weekly_trend: { week?: number } | null;
}

interface AuditQuery {
  keyword?: string;
  resource_type?: string;
  action?: string;
  date_range: any;
  pageNumber: number;
  pageSize: number;
}

const columns: TableColumnsType<AuditEvent> = [
  { title: "ID", dataIndex: "id", key: "id", width: 200 },
  { title: "Action", dataIndex: "action", key: "action" },
  {
    title: "Time",
    dataIndex: "event_time",
    key: "event_time",
    customRender: ({ text }) =>
      text ? dayjs(text as string).format("DD/MM/YY HH:mm:ss") : "",
    width: 200
  },
  { title: "User", dataIndex: "user", key: "user", width: 200 },
  { title: "Resource Type", dataIndex: "resource_type", key: "resource_type", width: 150 },
  { title: "Result", dataIndex: "outcome", key: "outcome", width: 120 },
];

const tableData = ref<AuditEvent[]>([]);

const queryParams = ref<AuditQuery>({
  keyword: undefined,
  resource_type: undefined,
  action: undefined,
  date_range: [],
  pageNumber: 1,
  pageSize: 10,
});

const total = ref(0);
const tableLoading = ref(false);

const cardItem = ref<AuditStats>({
  total_events: 0,
  users_active_7d: 0,
  integrity_status: "warning",
  weekly_trend: null,
});

const typesList = ref<string[]>([]);
const statusList = ref<string[]>([]);

const isDrawerOpen = ref(false);
const exportLoading = ref(false);
const exportItemLoading = ref(false);
const drawerItem = ref<AuditEvent | undefined>(undefined);

const actionConfigMap = {
  create: { icon: "audit-create", bg: "bg-[#F0F5FE]" },
  execute: { icon: "audit-execute", bg: "bg-[#EEF7EE]" },
  update: { icon: "audit-update", bg: "bg-[#FFEEC1]" },
  delete: { icon: "audit-delete", bg: "bg-[#FFF0F0]" },
  batch_delete: { icon: "audit-delete", bg: "bg-[#FFF0F0]" },
  invite: { icon: "audit-invite", bg: "bg-[#F2EAFF]" },
  apply: { icon: "audit-apply", bg: "bg-[#EEF7FF]" },
  complete: { icon: "audit-complete", bg: "bg-[#EEF7FF]" },
  action_required: { icon: "audit-action_required", bg: "bg-[#EEF7FF]" },
  fail: { icon: "audit-fail", bg: "bg-[#EEF7FF]" },
  resume: { icon: "audit-execute", bg: "bg-[#EEF7FF]" },
  cancel: { icon: "audit-cancel", bg: "bg-[#EEF7FF]" },
  publish: { icon: "audit-published", bg: "bg-[#EEF7FF]" },
} as const;

const resourceTypeConfigMap = {
  agent: { color: "#E9F7FF", cls: "c-[#5194FD]!" },
  knowledge: { color: "#17C6531F", cls: "c-[#17C653]!" },
  task: { color: "#F2EAFF", cls: "c-[#A46EFF]!" },
  policy: { color: "#FFF6DE", cls: "c-[#F98404]!" },
  template: { color: "#FFF0F0", cls: "c-[#FF4F4F]!" },
  space: { color: "#0000000a", cls: "c-[#000000e0]!"}
} as const;

const actionConfig = (action?: string) =>
  action ? actionConfigMap[action as keyof typeof actionConfigMap] : undefined;

const resourceTypeConfig = (type?: string) =>
  type ? resourceTypeConfigMap[type as keyof typeof resourceTypeConfigMap] : undefined;

const isSuccess = (outcome?: string) => outcome?.toLocaleLowerCase() === "success";

let statsSeq = 0;
let querySeq = 0;

function buildQuery() {
  const { date_range, ...rest } = queryParams.value;
  const query: Record<string, any> = {
    space_id: spaceStore.spaceInfoCurrent?.id,
    ...rest,
  };
  if (date_range?.length) {
    query.start_time = dayjs(date_range[0]).format("YYYY-MM-DDT00:00:00");
    query.end_time = dayjs(date_range[1]).format("YYYY-MM-DDT23:59:59");
  }
  return Object.fromEntries(Object.entries(query).filter(([, v]) => v != null));
}

async function get_filter_event_types() {
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiAudit("filter_event_types"), {
      data: { space_id: spaceStore.spaceInfoCurrent?.id },
    })
  );
  if (error || res?.code != 200) return;
  typesList.value = res?.data?.resource_types ?? [];
  statusList.value = res?.data?.actions ?? [];
}

async function get_stats() {
  const seq = ++statsSeq;
  const [error, res] = await to<{ data: AuditStats; code: number }>(
    request(useApiAudit("stats"), {
      data: { space_id: spaceStore.spaceInfoCurrent?.id },
    })
  );
  if (error || res?.code != 200 || seq !== statsSeq) return;
  cardItem.value = res?.data;
}

async function get_query() {
  const seq = ++querySeq;
  tableLoading.value = true;
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiAudit("query"), { data: buildQuery() })
  );
  if (seq !== querySeq) return;
  tableLoading.value = false;
  if (error || res?.code != 200) return;
  const { results, total: totals, count } = res?.data ?? {};
  tableData.value = results ?? [];
  total.value = totals ?? count ?? 0;
}

Promise.allSettled([get_filter_event_types(), get_stats(), get_query()]);

const refresh = () => {
  queryParams.value.pageNumber = 1;
  get_query();
};

const onSearch = debounce(refresh, 400);

async function exportCSV(extra: Record<string, any> = {}) {
  try {
    const res: any = await request(useApiAudit("export"), {
      data: { ...buildQuery(), ...extra },
      responseType: "blob",
      config: { isRaw: true },
    });
    let fileName = res?.headers?.get?.("file-name");
    if (!fileName) {
      const disposition = res?.headers?.get?.("content-disposition");
      fileName = disposition?.match(/filename="?([^"]+)"?/)?.[1];
    }
    console.log('fileName :', fileName);

    download(res.data, fileName || "audit-logs.csv");
  } catch {
  }
}

async function handleExportCSV() {
  exportLoading.value = true;
  await exportCSV();
  exportLoading.value = false;
}

async function handleExportCSVItem(record?: AuditEvent) {
  exportItemLoading.value = true;
  await exportCSV(record?.id ? { event_id: record.id } : {});
  exportItemLoading.value = false;
}

watch(
  () => spaceStore.spaceInfoCurrent?.id,
  () => {
    queryParams.value.pageNumber = 1;
    Promise.allSettled([get_stats(), get_query()]);
  }
);

function handleTableChange(pag: TablePaginationConfig) {
  queryParams.value.pageNumber = pag.current ?? 1;
  queryParams.value.pageSize = pag.pageSize ?? 10;
  get_query();
}

const handleRow = (record: any) => ({
  onClick: () => {
    drawerItem.value = record;
    isDrawerOpen.value = true;
  },
});

function onClose() {
  isDrawerOpen.value = false;
  drawerItem.value = undefined;
}
</script>

<template>
  <base-card>
    <template #header>
      <div class="top-wrap">
        <div class="top-left">
          <span class="text-[12px] font-[Inter] c-[#999]">
            Monitor and review activity across your workspace. All events are securely
            recorded and tamper-evident.
          </span>
        </div>
        <div class="top-right">
          <Button
            type="primary"
            class="w-[130px] flex items-center gap-1.5"
            @click="handleExportCSV"
            :loading="exportLoading"
          >
            <template #icon>
              <NuxtIcon name="export" class="text-[18px]" />
            </template>
            Export CSV
          </Button>
        </div>
      </div>
    </template>

    <AuditLogsCard :cardItem="cardItem" />

    <div class="top-wrap mb-4">
      <div class="top-left">
        <Input
          v-model:value="queryParams.keyword"
          placeholder="Space id/Chain id/ Agent id"
          style="width: 240px"
          allow-clear
        >
          <template #suffix>
            <Tooltip title="Extra information">
              <SearchOutlined style="color: #cccccc" @click="onSearch" />
            </Tooltip>
          </template>
        </Input>
        <Select
          v-model:value="queryParams.resource_type"
          placeholder="Resource Type"
          style="width: 140px"
          allowClear
          class="status-select capitalize"
          @change="onSearch"
        >
          <SelectOption
            v-for="(item, index) in typesList"
            :key="index"
            :value="item"
            class="capitalize"
          >
            {{ item }}
          </SelectOption>
        </Select>
        <Select
          v-model:value="queryParams.action"
          placeholder="Action"
          style="width: 140px"
          allowClear
          class="status-select capitalize"
          @change="onSearch"
        >
          <SelectOption
            v-for="(item, index) in statusList"
            :key="index"
            :value="item"
            class="capitalize"
          >
            {{ item }}
          </SelectOption>
        </Select>
        <RangePicker
          v-model:value="queryParams.date_range"
          format="DD/MM/YYYY"
          class="range-picker"
          @change="onSearch"
        />
      </div>
    </div>

    <Table
      rowKey="id"
      :columns="columns"
      :data-source="tableData"
      :loading="tableLoading"
      bordered
      size="middle"
      :pagination="{
        total: total,
        current: queryParams.pageNumber,
        pageSize: queryParams.pageSize,
        showSizeChanger: true,
        showTotal: (t: number) => `Total ${t} items`,
      }"
      :customRow="handleRow"
      @change="handleTableChange"
      style="font-size: 13px; color: #000000; font-family: Inter-Medium, Inter"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'action'">
          <div class="flex items-center gap-2 py-2">
            <div
              v-if="actionConfig(record.action)"
              class="flex items-center justify-center text-[30px] flex-none"
            >
              <NuxtIcon :name="actionConfig(record.action)?.icon ?? ''" filled />
            </div>
            <div class="flex flex-col justify-between">
              <div class="font-[Inter-Medium,Inter] fw-500">
                {{ record.action_label }}
              </div>
              <div class="c-[#999999]">{{ record.action_description }}</div>
            </div>
          </div>
        </template>
        <template v-if="column.dataIndex === 'user'">
          <div class="flex items-center gap-1.5">
            <Avatar :size="24" :src="record.actor_avatar" v-if="record.actor_avatar" />
            {{ record.actor_name }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'resource_type'">
          <Tag
            v-if="resourceTypeConfig(text)"
            :bordered="false"
            :color="resourceTypeConfig(text)?.color ?? ''"
            :class="`${resourceTypeConfig(text)?.cls} capitalize`"
          >
            {{ text }}
          </Tag>
        </template>
        <template v-if="column.dataIndex === 'outcome'">
          <div class="flex items-center gap-1.5 capitalize">
            <span
              class="flex-none w-2 h-2 rounded-full"
              :class="isSuccess(text) ? 'bg-[#17C653]' : 'bg-[#FF4F4F]'"
            />
            {{ text }}
          </div>
        </template>
      </template>
    </Table>
  </base-card>

  <Drawer
    :width="500"
    title="Audit Event Details"
    placement="right"
    :open="isDrawerOpen"
    @close="onClose"
    class="rounded-lt-[10px] font-[Inter]"
  >
    <template #extra>
      <Button
        @click="handleExportCSVItem(drawerItem)"
        :loading="exportItemLoading"
        class="mr-4 w-[130px] flex items-center gap-1.5"
      >
        <template #icon>
          <NuxtIcon name="export" class="text-[18px]" />
        </template>
        <span class="text-[12px]">Export CSV</span>
      </Button>
    </template>
    <div class="px-[10px]">
      <AuditLogsDetails v-if="isDrawerOpen" :record="drawerItem" />
    </div>
  </Drawer>
</template>

<style src="./index.scss" scoped lang="scss"></style>
