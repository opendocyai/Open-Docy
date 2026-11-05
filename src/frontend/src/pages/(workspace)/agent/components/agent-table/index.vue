<script lang="ts" setup>

import { ref, computed } from 'vue';

import { hasRolePerm, formatDateTime } from '@/utils';

import { Table, Tooltip, Avatar, Button } from 'ant-design-vue';

import { QuestionCircleOutlined } from '@ant-design/icons-vue'

import {NuxtIcon} from '@/components';

defineOptions({
  name: "AgentTable",
});
interface AgentData {
  id: number;
  name: string;
}
const props = withDefaults(
  defineProps<{
    agentData?: AgentData[];
    selectedKeys?: any[];
    tableLoading?: boolean;
  }>(),
  {
    agentData: () => [],
    selectedKeys: () => [],
    tableLoading: () => false,
  }
);

const emit = defineEmits<{
  (e: "editAgent", record: { id: any }): void;
  (e: "deleteSingle", record: { id: any }): void;
  (e: "selectedKeysChange", keys: any[]): void;
  (e: "update:selectedKeys", keys: any[]): void;
}>();

const rowSelection = computed<any>(() => ({
  selectedRowKeys: props.selectedKeys,
  onChange: (selectedRowKeys: []) => {
    emit("update:selectedKeys", selectedRowKeys);
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
}));

const columns = ref<any>([
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "Update Time",
    dataIndex: "update_at",
    key: "update_at",
  },
  {
    title: "Tasks Completed",
    dataIndex: "completed",
    key: "completed",
  },
  {
    title: "Completion Ratio",
    dataIndex: "completionRatio",
    key: "completionRatio",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Visibility",
    dataIndex: "visibility",
    key: "visibility",
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
  },
  {
    title: "Created by",
    dataIndex: "createBy",
    key: "createBy",
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    width: 120,
  },
]);

const toEditAgent = (record: any) => {
  emit("editAgent", record);
};

const deleteSingle = (record: any) => {
  emit("deleteSingle", record);
};
</script>
<template>
  <div class="table-page-wrap">
    <Table rowKey="id" :columns="columns" :data-source="agentData" :pagination="false" :loading="tableLoading" bordered
      size="middle" :row-selection="hasRolePerm('sys:agent:bulk:del') ? rowSelection : undefined"
      :scroll="agentData?.length ? { x: 'max-content' } : undefined"
      style="font-size: 13px; color: #000000; font-family: Inter-Medium,Inter;">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <div class="text-ellipsis-span" style="max-width: 200px" :title="record.name">
            {{ record.name }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'update_at'">
          <span class="text-[#8C8C94] text-[12px]">
            {{ formatDateTime(record?.update_at) }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'completed'">
          <span class="text-[#2E2BD9] text-[12px]">
            {{ record?.state?.complete_count }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'completionRatio'">
          <span :class="record?.state?.completion_rate == 100
            ? 'text-[#17C653] text-[12px]'
            : 'text-[#FF0B1A] text-[12px]'
            ">
            {{ record?.state?.completion_rate }} %
          </span>
        </template>
        <template v-if="column.dataIndex === 'status'">
          <span v-if="record?.status == 'draft'" class="text-[#999999] text-[12px]">
            {{ record?.status ? record.status.charAt(0).toUpperCase() + record.status.slice(1) : '' }}
          </span>
          <span v-if="record?.status == 'public'" class="text-[#17C653] text-[12px]">
            {{ record?.status ? record.status.charAt(0).toUpperCase() + record.status.slice(1) : '' }}
          </span>
          <span v-if="record?.status == 'private'" class="text-[#7F63F4] text-[12px]">
            {{ record?.status ? record.status.charAt(0).toUpperCase() + record.status.slice(1) : '' }}
          </span>
          <span v-if="record?.status == 'active'" class="text-[#17C653] text-[12px]">
            {{ record?.status ? record.status.charAt(0).toUpperCase() + record.status.slice(1) : '' }}
          </span>
          <span v-if="record?.status == 'frozen'" class="c-[#F63C47] text-[12px] flex items-center gap-[5px]">
            Frozen
            <Tooltip placement="right" arrow color="#F8FAFC" :overlayStyle="{ maxWidth: '400px' }"
              :overlayInnerStyle="{ color: '#374151', fontFamily: 'Inter', fontWeight: 400, fontSize: '12px' }">
              <template #title>
                All your agents are currently frozen. Select one to unfreeze. Free plan allows 1 agent only.
              </template>
              <span class="c-[#CCCCCC] text-[18px]">
                <QuestionCircleOutlined />
              </span>
            </Tooltip>
          </span>
        </template>
        <template v-if="column.dataIndex === 'visibility'">
          <span v-if="record?.visibility == '-'" class="text-[#999999] text-[12px]">
            {{ record?.visibility }}
          </span>
          <span v-if="record?.visibility == 'Personal'" class="text-[#F59E0B] text-[12px]">
            {{ record?.visibility }}
          </span>
          <span v-if="record?.visibility == 'Public'" class="text-[#3B82F6] text-[12px]">
            {{ record?.visibility }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'source'">
          <span class="text-[#000000] bg-[#EBEBEB] rounded-[3px] px-[6px] py-[2px] text-[12px]">
            {{ record?.market_record_id ? 'Marketplace' : 'Custom' }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'createBy'">
          <div class="flex items-center">
            <Avatar v-if="record?.creator?.avatar" :src="record?.creator?.avatar" :size="26"
              style="margin-right: 6px" />
            <Avatar v-else :size="26" :style="{ 'background-color': record?.creator?.default_color }"
              style="display: flex; align-items: center; margin-right: 6px;">
              <span class="inline-block text-[12px] h-[26px] leading-[21px]">
                {{ record?.creator?.display?.substring(0, 1).toUpperCase() }}
              </span>
            </Avatar>
            <span class="text-[#8C8C94] text-[12px] fw-500 font-[Inter]">
              {{ record?.creator?.display }}
            </span>
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <div class="action-btn">
            <Button type="link" size="small" style="color: #000000" @click="toEditAgent(record)"
              v-if="hasRolePerm('sys:agent:edit')">
              <NuxtIcon name="edit-single" class="icon text-[18px] mr-[2px]" /> Edit
            </Button>
            <Button type="link" size="small" style="color: #f63c47" @click="deleteSingle(record)"
              v-if="hasRolePerm('sys:agent:del')">
              <NuxtIcon name="delete" class="icon text-[14px] mr-[2px]" /> Delete
            </Button>
          </div>
        </template>
      </template>
    </Table>
  </div>
</template>

<style src="./index.scss" lang="scss" scoped></style>
