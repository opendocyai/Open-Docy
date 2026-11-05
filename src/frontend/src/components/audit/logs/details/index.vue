<script setup lang="ts">
defineOptions({ name: "AuditLogsDetails" });

import { useApiAudit } from "@/api";
import { JsonPretty, NuxtIcon } from "@/components";
import { useHttp } from "@/client";
import { useCopyText } from "@/composables";
import { Button, Divider, message, Tag } from "ant-design-vue";
import to from "await-to-js";
import dayjs from "dayjs";
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
  record: any;
}>();

const { copy } = useCopyText();
const { request } = useHttp();

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

const info = ref<any>(props.record);
const verify = ref<any>(undefined);
const verifyLoading = ref<boolean>(false);

const actionConfig = computed(
  () => actionConfigMap[info.value?.action as keyof typeof actionConfigMap]
);
const isSuccess = computed(() => info.value?.outcome == "success");
const verifyValid = computed(() => !!verify.value?.valid);
const verifiedAt = computed(() =>
  verify.value?.verified_at
    ? dayjs(verify.value.verified_at).format("DD/MM/YY HH:mm:ss")
    : ""
);

const formatTime = (value?: any) =>
  value ? dayjs(value).format("DD/MM/YY HH:mm:ss") : "";

const detailRows = computed(() =>
  [
    { icon: "audit-id", label: "ID", value: info.value?.id, copyable: true },
    {
      icon: "audit-chain",
      label: "Chain ID",
      value: info.value?.chain_id,
      copyable: true,
    },
    { icon: "audit-user", label: "User", value: info.value?.actor_name },
    { icon: "audit-time", label: "Time", value: formatTime(info.value?.event_time) },
    {
      icon: "audit-resource",
      label: "Resource Type",
      value: info.value?.resource_type,
    },
    {
      icon: "audit-resource-id",
      label: "Resource ID",
      value: info.value?.resource_id,
      copyable: true,
    },
  ].filter((row) => row.value != null && row.value !== "")
);

const hashFields = computed(() =>
  [
    { label: "Previous Hash", key: "previous_hash" },
    { label: "Current Hash", key: "hash" },
    { label: "Payload Hash", key: "payload_hash" },
  ]
    .map((field) => ({ ...field, value: info.value?.[field.key] }))
    .filter((field) => field.value != null && field.value !== "")
);

const get_events_detail = async () => {
  if (!props.record?.id) return;
  const dataApi = useApiAudit("events_detail")(props.record.id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
  if (error || res?.code != 200) return;
  info.value = { ...props.record, ...res.data };
};

const get_events_verify = async () => {
  if (!props.record?.id) return;
  verifyLoading.value = true;
  const dataApi = useApiAudit("events_verify")(props.record.id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
  verifyLoading.value = false;
  if (error || res?.code != 200) return;
  verify.value = res.data;
};

function handleCopy(value?: any) {
  if (value == null || value === "") return;
  copy(String(value));
  message.success("Copied to clipboard");
}

onMounted(() => {
  get_events_detail();
  get_events_verify();
});
</script>

<template>
  <div class="action-result">
    <div class="action-result__action">
      <div v-if="actionConfig" class="action-result__action--icon">
        <NuxtIcon :name="actionConfig.icon" filled class="icon" />
      </div>
      <div class="action-result__action--name">{{ info?.action_label }}</div>
    </div>
    <div class="action-result__result capitalize">
      <Tag
        :bordered="false"
        :color="isSuccess ? '#17C6531F' : '#FF4F4F1F'"
        :class="`${
          isSuccess ? 'c-[#17C653]!' : 'c-[#FF4F4F]!'
        } capitalize flex items-center gap-1`"
      >
        <span
          class="w-[6px] h-[6px] rounded-full inline-block"
          :class="isSuccess ? 'bg-[#17C653]' : 'bg-[#FF4F4F]'"
        ></span>
        {{ info?.outcome }}
      </Tag>
    </div>
  </div>

  <div class="detail-list">
    <div v-for="row in detailRows" :key="row.label" class="detail-row">
      <div class="detail-row__icon">
        <NuxtIcon :name="row.icon" filled class="text-[16px]" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="font-[Inter] fw-400 text-[12px]">{{ row.label }}</div>
        <div
          class="detail-row__value"
          :class="{ capitalize: row.label === 'Resource Type' }"
        >
          {{ row.value }}
          <NuxtIcon
            v-if="row.copyable"
            name="copy-key"
            class="flex-none cursor-pointer text-[16px]"
            @click="handleCopy(row.value)"
          />
        </div>
      </div>
    </div>
  </div>

  <Divider />

  <div v-for="field in hashFields" :key="field.label" class="mb-4 flex flex-col gap-3">
    <div class="font-[Inter-Medium,Inter] fw-500 text-[12px]">{{ field.label }}</div>
    <div class="flex items-center gap-1.5">
      <div
        class="flex-1 c-[#999999] font-[Inter] fw-500 text-[12px] lh-[1.5] whitespace-pre-wrap break-all"
      >
        {{ field.value ? field.value : "--" }}
      </div>
      <NuxtIcon
        v-if="field.value"
        name="copy-key"
        class="flex-none cursor-pointer text-[16px]"
        @click="handleCopy(field.value)"
      />
    </div>
  </div>

  <div class="mb-4 flex flex-col gap-3">
    <div class="font-[Inter-Medium,Inter] fw-500 text-[12px]">JSON</div>
    <div class="bg-[#F2F3F7] p-3 w-full rounded-[5px]">
      <JsonPretty v-if="info?.payload" :json="info?.payload" />
    </div>
  </div>

  <Divider orientation="left" orientationMargin="0">Integrity Verification</Divider>

  <div class="flex gap-3">
    <div class="flex-none">
      <NuxtIcon
        :name="verifyValid ? 'verif-again' : 'verif-again-error'"
        filled
        class="text-[35px]"
      />
    </div>
    <div class="flex-1">
      <div class="flex justify-between mb-4">
        <div class="flex flex-col gap-3">
          <div
            class="text-[14px] font-[Inter-Medium,Inter]"
            :class="verifyValid ? 'c-[#17C653]' : 'c-[#FF4F4F]'"
          >
            {{ verifyValid ? "Verification Successful" : "Verification Failed" }}
          </div>
          <div class="c-[#BABABA] text-[12px] font-[Inter]">{{ verifiedAt }}</div>
        </div>
        <Button
          class="bg-[#5194FD29] c-[#5194FD] border-none"
          :loading="verifyLoading"
          @click="get_events_verify"
        >
          Verify Again
        </Button>
      </div>
      <div class="c-[#BABABA] text-[12px] font-[Inter] lh-[18px]">
        {{
          verifyValid
            ? "All record hashes have been successfully verified. The chain has not been tampered with."
            : "All record hashes have been Verification Failed. The chain has not been tampered with."
        }}
      </div>
    </div>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
