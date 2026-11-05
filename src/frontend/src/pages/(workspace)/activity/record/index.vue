<script setup lang="ts">

import Logs from './record-logs/index.vue';
import Flowchart from "./flowchart/index.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useMainStore, useRouterStore } from "@/stores";
import { useHttp } from "@/client";
import { useRoute } from "vue-router";
import { BaseCard } from '@/components'
import { Button } from 'ant-design-vue'

const route = useRoute();
const { request } = useHttp();
const mainStore = useMainStore();
const routerStore = useRouterStore();
routerStore.SET_BREADCRUMB([
    {
        name: "Activity",
        path: "/activity",
        isClickable: true,
    },
    {
        name: `${route.query.task_name} - record`,
        path: "/activity",
        isClickable: false,
    }
]);
const isLogsLoading = ref<boolean>(false);
const tabIndex = ref<number>(1);
const tabList = ref<any[]>([{ name: "Flowchart" }, { name: "Logs" }]);
const logsData = ref<any>([]);
const task_id = ref(route.query.task_id);
const handleTabChange = async (index: number) => {
    tabIndex.value = index;
};

const error = ref<string | null>(null);
const eventSource = ref<EventSource | null>(null);
const url = `/api/v1/activity/log/view?token=${mainStore.token}&task_id=${task_id.value}`;

const startEventSource = () => {
    isLogsLoading.value = true;
    eventSource.value = new EventSource(url);
    eventSource.value.onopen = () => {
        isLogsLoading.value = false;
    };
    eventSource.value.onmessage = (event) => {
        logsData.value.push(event.data);
    };

    eventSource.value.onerror = (err) => {
        console.error("EventSource failed:", err);
        error.value = "Failed to connect to the server.";
        if (eventSource.value) {
            eventSource.value.close();
        }
        isLogsLoading.value = false;

    };
};

onMounted(() => {
    tabIndex.value = route.query.activeTag === "flowchart" ? 0 : 1;
    startEventSource();
});

onBeforeUnmount(() => {
    if (eventSource.value) {
        eventSource.value.close();
    }
});
</script>

<template>
    <base-card>
        <template #header>
            <div class="flex items-center flex-col">
                <div class="btn-wrap">
                    <div v-for="(item, index) in tabList" :key="item.name">
                        <Button class="flex items-center gap-[4px] fill-revert-layer tab-btn"
                            :class="{ 'btn-active': index == tabIndex }" @click="handleTabChange(index)">
                            {{ item.name }}
                        </Button>
                    </div>
                </div>
            </div>
        </template>
        <div class="content-wrap">
            <Flowchart v-if="tabIndex === 0" />
            <Logs v-if="tabIndex === 1" :logsData="logsData" :isLogsLoading="isLogsLoading" />
        </div>
    </base-card>
</template>

<style src="./index.scss" lang="scss" scoped></style>
