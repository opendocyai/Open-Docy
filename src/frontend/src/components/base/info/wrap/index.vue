<script setup lang="ts">
import { useDialog, useFileIconList, type DialogExpose } from '@/composables';
import { handleExportFile } from '@/shared';
import { empty, formatDateTime, getFileExtension } from '@/utils';
import { useRoute } from 'vue-router';
import { Card } from 'ant-design-vue'
import {
  NuxtIcon, TaskOutputInputFile,
  TaskOutputAuditNode,
  TaskOutputCompliancePolicy,
  TaskOutputGeneral
} from '@/components'

defineOptions({
  name: 'BaseInfoWrap'
})

const route = useRoute();

const props = withDefaults(defineProps<{ beforeNodeInfo: any, isInvite?: boolean }>(), {
  beforeNodeInfo: () => {
  },
  isInvite: false,
})

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

const { fileIconList } = useFileIconList();

const getIconByFileName = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  if (!extension) return "";

  const match = fileIconList.value.find(
    (item: any) => item.id.toLowerCase() === extension
  );
  return match ? match.icon : "";
};

const onDownload = async (item: any) => {
  if (!item.path[0]) {
    return;
  } else {
    await handleExportFile(item.path[0], item.name);
  }
};

const onPreview = async (item: { status: string; name: any; path: any }) => {
  if (item.status == "Failed") {
    return;
  } else {
    localStorage.setItem('manual_file_preview_url', item?.path[0])
    if (props.isInvite) {
      window.open(`/activity/detail-preview?task_id=${route.query.task_id}&file_name=${encodeURIComponent(item.name)}&code=${route.query.code}&type=manual_invite`, "_blank", "noopener,noreferrer");
    } else {
      window.open(`/activity/detail-preview?task_id=${route.query.task_id}&file_name=${encodeURIComponent(item.name)}&type=manual`, "_blank", "noopener,noreferrer");
    }
  }
};

const outputDialog: DialogExpose = useDialog({
  width: "90vw",
  centered: true,
  isCancel: false,
  maskClosable: false,
  footerAlign: "right",
  okText: "Close",
  ok: ({ data }: any) => {
    outputDialog.close();
  },
});

const handleOutput = (nodeInfo: any) => {
  console.log("🚀 ~ handleOutput ~ nodeInfo: ", nodeInfo);
}
</script>

<template>
  <div
    class="base-info-wrap"
    v-if="
      beforeNodeInfo?.output_values?.data && empty(beforeNodeInfo?.output_values?.files)
    "
  >
    <template v-if="beforeNodeInfo?.label == 'AuditNode'">
      <div class="base-info">
        <div class="label">🔍 {{ beforeNodeInfo?.title }}</div>
        <div class="base-info-content" @click.stop="handleOutput(beforeNodeInfo)">
          <template
            v-for="(value, index) in beforeNodeInfo?.output_values?.data?.[0]?.values"
            :key="index"
          >
            <div class="info-item whitespace-pre-line">
              <span> "{{ value.field_name }}" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value.field_value }}"
              </span>
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-else-if="beforeNodeInfo?.label == 'InputFile'">
      <div class="base-info">
        <div class="label mb-[20px]">🔍 {{ beforeNodeInfo?.title }}</div>
        <div
          class="base-info-content flex-row! flex-nowrap!"
          v-if="beforeNodeInfo?.output_values?.data"
          @click.stop="handleOutput(beforeNodeInfo)"
        >
          <div class="info-item">
            <span> "{{ beforeNodeInfo?.output_values?.data?.key }}" </span>
            <span class="px-[2px]">:</span>
            <span
              class="c-[#1FAB26] pl-[3px] whitespace-pre-line"
              v-for="value in beforeNodeInfo?.output_values?.data?.files"
              :key="value"
            >
              "{{ value }}"
            </span>
          </div>
        </div>
      </div>
    </template>
    <template
      v-else-if="
        beforeNodeInfo?.label == 'AuditNodeField' ||
        beforeNodeInfo?.label == 'AuditNodeGlobal'
      "
    >
      <div class="base-info">
        <div class="label">🔍 {{ beforeNodeInfo?.title }}</div>
        <div class="base-info-content" @click.stop="handleOutput(beforeNodeInfo)">
          <template
            v-for="(value, index) in beforeNodeInfo?.output_values?.data?.[0]
              ?.values_extra"
            :key="index"
          >
            <div class="px-[5px] c-[#B4B4B4] font-[Inter] fw-500 text-[13px]">
              Audit {{ Number(index) + 1 }}
            </div>
            <div class="info-item">
              <span> "Field" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value.field_name }}"
              </span>
            </div>
            <div class="info-item">
              <span> "Field Value" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value.field_value }}"
              </span>
            </div>
            <div class="info-item">
              <span> "Expected Result" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value.field_expected_value }}"
              </span>
            </div>
            <div class="info-item">
              <span> "Validation Rule" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value.field_audit_rule }}"
              </span>
            </div>
            <div class="info-item">
              <span> "Validation Outcome" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value.pass }}"
              </span>
            </div>
            <div class="info-item">
              <span> "Reasons" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value.message }}"
              </span>
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-else-if="beforeNodeInfo?.label == 'ConditionalNode'">
      <div class="base-info">
        <div class="label" v-if="beforeNodeInfo?.title">
          🔍 {{ beforeNodeInfo?.title }}
        </div>
        <div class="base-info-content" @click.stop="handleOutput(beforeNodeInfo)">
          <template
            v-for="value in beforeNodeInfo?.output_values?.data?.[0]?.values"
            :key="value.field_name"
          >
            <div class="info-item">
              <span> "Field" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value?.field_name }}"
              </span>
            </div>
            <div class="info-item">
              <span> "Field Value" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value?.field_value }}"
              </span>
            </div>
            <div class="info-item">
              <span> "Expected Result" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value?.field_expected_value }}"
              </span>
            </div>
            <div class="info-item">
              <span> "Expected Rule" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value?.field_audit_rule }}"
              </span>
            </div>
            <div class="info-item">
              <span> "Validation Outcome" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px]" v-if="value?.pass">
                "{{ value?.pass }}"
              </span>
              <span class="c-[#F63C47] pl-[3px]" v-else> "{{ value?.pass }}" </span>
            </div>
            <div class="info-item">
              <span> "Reasons" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value?.message }}"
              </span>
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-else-if="beforeNodeInfo?.label == 'CompliancePolicy'">
      <div class="base-info">
        <div class="label" v-if="beforeNodeInfo?.title">
          🔍 {{ beforeNodeInfo?.title }}
        </div>
        <div class="base-info-content" @click.stop="handleOutput(beforeNodeInfo)">
          <template
            v-for="value in beforeNodeInfo?.output_values?.data?.[0]?.values_extra"
            :key="value.field_name"
          >
            <div class="info-item">
              <span> "{{ value?.pass }}" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{ value?.message }}"
              </span>
            </div>
          </template>
        </div>
      </div>
    </template>
    <template
      v-else-if="
        beforeNodeInfo?.output_values?.data?.[0] &&
        empty(beforeNodeInfo?.output_values?.files)
      "
    >
      <div class="base-info">
        <div class="label" v-if="beforeNodeInfo?.title">
          🔍 {{ beforeNodeInfo?.title }}
        </div>
        <div class="base-info-content" @click.stop="handleOutput(beforeNodeInfo)">
          <template
            v-for="value in beforeNodeInfo?.output_values?.data?.[0]?.values"
            :key="value.field_name"
          >
            <div class="info-item">
              <span> "{{ value.field_name }}" </span>
              <span class="px-[2px]">:</span>
              <span class="c-[#1FAB26] pl-[3px] whitespace-pre-line">
                "{{
                  Array.isArray(value.field_value)
                    ? value.field_value.join(", ")
                    : value.field_value
                }}"
              </span>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
  <div class="base-info-wrap" v-if="!empty(beforeNodeInfo?.output_values?.files)">
    <div class="base-info" v-if="beforeNodeInfo?.output_values?.files?.name">
      <div class="label" v-if="beforeNodeInfo?.title">AI Output Overview</div>
      <div class="my-card-item">
        <Card
          hoverable
          class="my-card-info"
          :class="handleCardStyle(beforeNodeInfo?.output_values.files.status)"
        >
          <template #cover>
            <div
              class="pt-[18px] px-[16px] pb-[25px] rounded-t-[10px]"
              :class="handleCardCoverStyle(beforeNodeInfo?.output_values.files.status)"
            >
              <div
                class="card-title flex items-center gap-[10px] text-[#010101] text-[14px] leading-[20px] mb-[16px]"
              >
                <img
                  :src="getIconByFileName(beforeNodeInfo?.output_values.files.name)"
                  alt=""
                  style="width: 35px"
                />
                <span :title="beforeNodeInfo?.output_values.files.name">
                  {{ beforeNodeInfo?.output_values.files.name }}
                </span>
              </div>
              <div
                class="text-[12px] font-[Inter] leading-[20px] text-[#555555] pb-[8px]"
              >
                <span class="mr-[16px]">Output Status:</span>
                <span :class="handleStatus(beforeNodeInfo?.output_values.files.status)">
                  {{ beforeNodeInfo?.output_values.files.status }}
                </span>
              </div>
              <div class="text-[12px] font-[Inter] leading-[20px] text-[#555555]">
                <span class="mr-[16px]">Output Date:</span>
                <span>
                  {{ formatDateTime(beforeNodeInfo?.output_values.files.time_stamp) }}
                </span>
              </div>
            </div>
          </template>
          <template #actions>
            <div
              class="flex items-center justify-center gap-[4px] border-none text-[12px]"
              :class="
                beforeNodeInfo?.output_values.files.status == 'Failed'
                  ? 'text-[#E1E1E1] pointer-events-none'
                  : 'text-[#4285F4]'
              "
              @click="onDownload(beforeNodeInfo?.output_values.files)"
            >
              Download
              <NuxtIcon name="download-icon" class="text-[11px]" />
            </div>
            <div
              class="flex items-center justify-center gap-[4px] border-none text-[12px]"
              :class="beforeNodeInfo?.output_values.files.status == 'Failed' ||
              !['pdf', 'docx', 'xls', 'xlsx'].includes(getFileExtension(beforeNodeInfo?.output_values.files.name!))
              ? 'text-[#E1E1E1] pointer-events-none'
              : 'text-[#37CD7D]'
              "
              @click="onPreview(beforeNodeInfo?.output_values.files)"
            >
              Preview
              <NuxtIcon name="preview-icon" class="text-[12px]" />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>

  <component :is="outputDialog.Dialog">
    <template #default="{ formType, data }">
      <TaskOutputInputFile v-if="formType == 'InputFile'" :data="data" />
      <TaskOutputAuditNode
        v-else-if="['AuditNodeField', 'AuditNodeGlobal'].includes(formType)"
        :data="data"
      />
      <TaskOutputCompliancePolicy
        v-else-if="formType == 'CompliancePolicy'"
        :data="data"
      />
      <TaskOutputGeneral v-else :data="data" />
    </template>
  </component>
</template>

<style src="./index.scss" lang="scss" scoped></style>
