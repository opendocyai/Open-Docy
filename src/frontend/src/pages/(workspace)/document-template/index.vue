<script setup lang="ts">
import { useApiDom } from "@/api";
import { useHttp } from "@/client";
import { useConfirmModal } from "@/composables";
import { handleExportFile, toProxyUrl } from "@/shared";
import { useEventSourceStore, useRouterStore, useSpaceStore } from "@/stores";
import { formatDateTime, hasRolePerm } from "@/utils";
import { message, Table, Button, Tooltip, Input, Pagination } from "ant-design-vue";
import { debounce } from "lodash";
import { onMounted, ref, watch } from "vue";

import { SearchOutlined } from "@ant-design/icons-vue";
import to from "await-to-js";

import { BaseCard, NuxtIcon } from "@/components";

import { useRouter } from "vue-router";

const routerStore = useRouterStore();

routerStore.SET_BREADCRUMB([
  {
    name: "Document Template",
    path: "/document-template",
    isClickable: false,
  },
]);

const { showConfirm } = useConfirmModal();
const { request } = useHttp();
const router = useRouter();

const queryName = ref<any>();
const deleteLoading = ref(false);
const tableLoading = ref(false);
const tableData = ref([]);
const selectedKeys = ref([]);

const total = ref();
const sortOrder = ref("descend");
const spaceStore: any = useSpaceStore();
const pageSize = ref(20);
const pageNumber = ref(1);
const rowSelection: any = {
  onChange: (selectedRowKeys: [], selectedRows: []) => {
    selectedKeys.value = selectedRowKeys;
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};

const columns = ref<any>([
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  { title: "Document Name", dataIndex: "name", key: "name" },
  { title: "File Format", dataIndex: "ext", key: "ext" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Creation Time",
    dataIndex: "created_at",
    key: "created_at",
    customRender: ({ text }: { text: string }) => formatDateTime(text),
  },
  {
    title: "Update Time",
    dataIndex: "update_at",
    key: "update_at",
    customRender: ({ text }: { text: string }) => formatDateTime(text),
  },
  {
    title: "Manage",
    key: "manage",
    fixed: "right",
    width: 160,
  },
]);

const toggleSort = debounce(() => {
  sortOrder.value = sortOrder.value === "ascend" ? "descend" : "ascend";
  getList();
}, 500);
const uploadFile = () => {
  router.push("/document-template/upload");
};

const deleteSingle = async (id: any) => {
  showConfirm({
    title: "Confirm Document Template Deletion",
    content: "Are you sure you want to delete this document template?",
    onOk: debounce(async () => {
      const dataApi = useApiDom("delete_dom_tpl")(id);
      const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
      if (error) return;
      if (res?.code == 200) {
        getList();
        pageChange(1, 20);
        message.success(`Deleted successfully`);
      }
    }, 500),
    onCancel: () => {
      console.log("cancel");
    },
  });
};
const deleteMultiple = async () => {
  if (!selectedKeys.value.length) {
    message.warning("Please select at least one item");
    return;
  }

  showConfirm({
    title: "Confirm Document Template Deletion",
    content: "Are you sure you want to delete this document template?",
    onOk: async () => {
      deleteLoading.value = true;

      const [error, res] = await to<{
        data: any;
        code: number;
      }>(
        request(useApiDom("delete_dom_tpl_multiple"), {
          data: {
            tpl_ids: selectedKeys.value,
          },
        })
      );
      deleteLoading.value = false;

      if (error) return;
      if (res?.code == 200) {
        selectedKeys.value = [];
        pageChange(1, 20);
        getList();
        message.success(`Deleted successfully`);
      }
    },
    onCancel: () => {
      console.log("cancel");
    },
  });
};

const getList = async () => {
  tableLoading.value = true;
  const orderType = "update_at";
  const sortType = sortOrder.value === "ascend" ? "asc" : "desc";
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiDom("get_dom_list"), {
      data: {
        name: queryName.value,
        space_id: spaceStore.spaceInfoCurrent?.id,
        orderBy: `${orderType}.${sortType}`,
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
      },
    })
  );
  tableLoading.value = false;
  if (error) return;
  if (res?.code == 200) {
    tableData.value = res.data.results;
    total.value = res.data.count;
  }
};

const exportDoc = debounce(async (record: any) => {
  const dataApi = useApiDom("export_dom_tpl")(record.id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
  if (error) return;
  if (res?.code == 200) {
    const download_url = res?.data.download_url;
    const file_name = `${record.name}.${record.ext}`;
    const uploadUrl = toProxyUrl(download_url) ?? "";
    handleExportFile(uploadUrl, file_name);
  }
}, 500);

const editDoc = async (record: any) => {
  router.push(
    `/document-template/create-or-detail?tpl_id=${record.id}&name=${record.name}`
  );
};

const pageChange = (_pageNumber: any, _pageSize: any) => {
  pageSize.value = _pageSize;
  pageNumber.value = _pageNumber;
  getList();
};
const onSearch = debounce(() => {
  if (queryName.value) {
    getList();
  }
}, 500);

watch(
  () => queryName.value,
  (newVal: any, oldVal: any) => {
    if (newVal === "" && oldVal !== "") {
      getList();
    }
  }
);

const eventSourceStore = useEventSourceStore();
watch(
  () => eventSourceStore.sse_data,
  (newVal: any) => {
    if (!newVal?.event_type) return;
    if (newVal?.event_type === "template_status_changed") {
      getList();
    }
  },
  { deep: true }
);

onMounted(() => {
  getList();
});
</script>

<template>
  <base-card>
    <template #header>
      <div class="top-wrap">
        <div class="top-left">
          <Input
            v-model:value="queryName"
            placeholder="Name"
            style="width: 200px"
            allow-clear
          >
            <template #suffix>
              <Tooltip title="Click to search">
                <SearchOutlined style="color: #cccccc" @click="onSearch" />
              </Tooltip>
            </template>
          </Input>
          <Button @click="toggleSort" style="font-family: Inter">
            <div class="sort-box">
              <NuxtIcon name="descend" class="icon" v-if="sortOrder === 'descend'" />
              <NuxtIcon name="ascend" class="icon" v-else />
              <span class="sort-by">Sorted by <span>Last updated</span> </span>
            </div>
          </Button>
        </div>
        <div class="top-right">
          <Button
            :loading="deleteLoading"
            @click="deleteMultiple"
            v-if="hasRolePerm('sys:tpl:bulk:del')"
          >
            Bulk Delete
          </Button>
          <Button type="primary" @click="uploadFile" v-if="hasRolePerm('sys:tpl:add')">
            + Upload Document
          </Button>
        </div>
      </div>
    </template>
    <Table
      rowKey="id"
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      :loading="tableLoading"
      bordered
      size="middle"
      :row-selection="hasRolePerm('sys:tpl:bulk:del') ? rowSelection : undefined"
      :scroll="tableData?.length ? { x: 'max-content' } : undefined"
      style="font-size: 13px; color: #000000; font-family: Inter"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <span class="state--activate" v-if="record.status == 1">Activate</span>
          <span class="state--crawling" v-if="record.status == 2">Processing</span>
          <span class="state--inactivate" v-if="record.status == 3"> Failed </span>
        </template>
        <template v-if="column.key === 'manage'">
          <div class="action-btn">
            <Button
              type="link"
              size="small"
              style="color: #000000"
              @click="exportDoc(record)"
              v-if="hasRolePerm('sys:tpl:export')"
            >
              <NuxtIcon name="export-icon" class="icon text-[18px]" /> Export
            </Button>
            <Button
              type="link"
              size="small"
              style="color: #000000"
              @click="editDoc(record)"
              v-if="hasRolePerm('sys:tpl:edit')"
            >
              <NuxtIcon name="edit-single" class="icon text-[18px] mr-[2px]" /> Edit
            </Button>
            <Button
              type="link"
              size="small"
              style="color: #f63c47"
              @click="deleteSingle(record.id)"
              v-if="hasRolePerm('sys:tpl:del')"
            >
              <NuxtIcon name="delete" class="icon text-[14px] mr-[2px]" /> Delete
            </Button>
          </div>
        </template>
      </template>
    </Table>
    <template #footer>
      <div class="flex justify-end" v-if="total > 20">
        <Pagination
          v-model:current="pageNumber"
          v-model:pageSize="pageSize"
          show-size-changer
          :show-total="(total: any) => `Total ${total} items`"
          :total="total"
          @change="pageChange"
          class="table-pagination"
        />
      </div>
    </template>
  </base-card>
</template>

<style src="./index.scss" scoped lang="scss"></style>
