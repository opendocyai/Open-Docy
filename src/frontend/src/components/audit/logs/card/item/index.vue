<script setup lang="ts">
defineOptions({ name: "AuditLogsCardItem" });
import { NuxtIcon } from "@/components";
import { FallOutlined, RiseOutlined } from "@ant-design/icons-vue";
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{ item: any }>(), {});

const integrityStatus = computed(() => {
  const status = props.item?.integrity_status;
  const config = {
    success: {
      class: "status-success",
      icon: "Integrity-status",
    },
    error: {
      class: "status-error",
      icon: "Integrity-error",
    },
    warning: {
      class: "status-warning",
      icon: "Integrity-warning",
    },
    verified: {
      class: "status-warning",
      icon: "Integrity-warning",
    },
  };
  return config[status as keyof typeof config] ?? null;
});

const statusColor = ref<Record<string, string>>({
  success: "c-[#17C653]",
  error: "c-[#FF4F4F]",
  warning: "c-[#F98404]",
  verified: "c-[#F98404]",
});
</script>

<template>
  <div class="logs-card-item">
    <div class="logs-card-item-left">
      <div class="left-box records">
        <NuxtIcon name="total-records" filled class="icon" />
      </div>
    </div>
    <div class="logs-card-item-right">
      <div class="name">Total Records</div>
      <div class="num">{{ item?.total_events ?? 0 }}</div>
      <div class="ratio week" :class="{ 'c-[#5194FD]!': item?.weekly_trend && item?.weekly_trend > 0 }">
        <RiseOutlined v-if="item?.weekly_trend && item?.weekly_trend > 0" />
        <FallOutlined v-else />
        {{ item?.weekly_trend ?? 0 }}% this week
      </div>
    </div>
  </div>
  <div class="logs-card-item">
    <div class="logs-card-item-left">
      <div class="left-box use">
        <NuxtIcon name="use-active" filled class="icon" />
      </div>
    </div>
    <div class="logs-card-item-right">
      <div class="name">Use Active</div>
      <div class="num">{{ item?.users_active_7d ?? 0 }}</div>
      <div class="ratio">Last 7 days</div>
    </div>
  </div>

  <div class="logs-card-item">
    <div class="logs-card-item-left">
      <div class="left-box" :class="integrityStatus?.class">
        <NuxtIcon :name="integrityStatus.icon" filled class="icon" />
      </div>
    </div>
    <div class="logs-card-item-right">
      <div class="name">Integrity Status</div>
      <div class="status">
        <span :class="statusColor[item?.integrity_status] ?? ''">
          All logs verified
        </span>
      </div>
      <div class="ratio">Hash chain is valid</div>
    </div>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
