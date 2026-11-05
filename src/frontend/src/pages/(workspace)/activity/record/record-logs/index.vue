<script setup lang="ts">
defineOptions({
    name: 'RecordLogs'
})

import { Empty, Collapse, CollapsePanel } from "ant-design-vue";
import { ref } from "vue";
import { LoadingOutlined, CaretRightOutlined } from '@ant-design/icons-vue'
import { formatDateTime } from "@/utils";

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const props = defineProps({
    logsData: {
        type: Object,
        default: [],
    },
    isLogsLoading: {
        type: Boolean,
        default: false,
    },
});
const activeKey = ref<any>([]);

const handleItem = (item: string, value: string | number) => {
    return JSON.parse(item)[value];
};
</script>

<template>
    <div class="h-[80vh] flex items-center justify-center" v-if="isLogsLoading">
        <LoadingOutlined spin class="text-[20px] c-[#2E2BD9]" />
    </div>
    <div v-else>
        <div class="bg-[#f8f8f7] py-[30px] p-x-[40px] rounded-[10px]" v-if="logsData.length">
            <Collapse v-model:activeKey="activeKey" :bordered="true" style="background: #f8f8f7">
                <template #expandIcon="slotProps">
                    <caret-right-outlined :rotate="slotProps?.isActive ? 90 : 0" />
                </template>
                <collapse-panel v-for="(item, index) in logsData" :key="index">
                    <template #header>
                        <div class="flex gap-[30px] items-center">
                            <span class="w-auto text-[13px] font-[Inter]">
                                {{ formatDateTime(handleItem(item, 'timestring')) }}
                            </span>
                            <span class="log-title text-[13px] font-[Inter]">{{ handleItem(item, 'content') }}</span>
                        </div>
                    </template>
                    <p
                        class="bg-[#ffffff] mb-[0px] px-[10px] text-[#535350] font-[Inter] text-[13px] leading-[24px] whitespace-pre-line">
                        {{ handleItem(item, "content") }}
                    </p>
                </collapse-panel>
            </Collapse>
        </div>
        <Empty :image="simpleImage" description="No data" v-else style="margin-top: 60px" />
    </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
