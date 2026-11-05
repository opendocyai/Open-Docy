<script setup lang="ts">
defineOptions({ name: "TaskOutputCompliancePolicy" });

import { computed, ref } from "vue";
import { Empty, Pagination } from "ant-design-vue";
import { BaseCard } from "@/components";

const props = withDefaults(defineProps<{ data: any }>(), {
  data: () => [],
});

const total = computed(() => props.data?.[0]?.values_extra?.length || 0);
const current = ref<number>(1);
const pageSize = ref<number>(10);

const outputValues = computed(() => {
  if (total.value > pageSize.value) {
    return props.data?.[0]?.values_extra?.slice(
      (current.value - 1) * pageSize.value,
      current.value * pageSize.value
    );
  }
  return props.data?.[0]?.values_extra || [];
});

const handleChangePage = (page: number, size: number) => {
  current.value = page;
  pageSize.value = size;
};

const getString = (value: any) => {
  return Array.isArray(value) ? value.join(", ") : value;
};
</script>

<template>
  <base-card class="px-[0]! rounded-[10px] border border-[#C0C0C0] border-solid">
    <template #header>
      <div class="border-b-[1px] border-[#C0C0C0] pb-[15px] px-[15px]">Value</div>
    </template>
    <div
      class="px-[15px] font-[Inter] fw-400 text-[13px] mb-[15px] flex flex-col gap-[10px]"
      v-if="outputValues.length"
    >
      <template v-for="value in outputValues" :key="value.field_name">
        <div class="flex flex-wrap">
          <span class="flex-none"> "{{ value.pass }}" </span>
          <span class="px-[2px] flex-none">:</span>
          <div class="c-[#1FAB26] pl-[3px] flex-1 whitespace-pre-wrap">
            "{{ getString(value.message) }}"
          </div>
        </div>
      </template>
    </div>
    <template v-else>
      <Empty
        description="No results yet. Please run the node to see results."
        class="c-[#999]"
      />
    </template>
    <template #footer v-if="outputValues?.length && total > pageSize">
      <div class="border-t-[1px] pt-[15px] border-[#C0C0C0] border border-solid px-[15px] flex justify-end">
        <Pagination
          @change="handleChangePage"
          size="small"
          v-model:current="current"
          v-model:page-size="pageSize"
          :total="total"
          :show-total="
            (total, range) => `Showing ${range[0]}–${range[1]} of ${total} results`
          "
        />
      </div>
    </template>
  </base-card>
</template>

<style src="./index.scss" scoped lang="scss"></style>
