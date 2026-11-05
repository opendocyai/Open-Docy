<script lang="ts" setup>
import { useApiActivity } from "@/api";
import { useHttp } from "@/client";
import { useRouterStore } from "@/stores";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Audit from "./audit/index.vue";
import Extract from "./extract/index.vue";
import Generate from "./generate/index.vue";

import { Button } from 'ant-design-vue'
import { BaseCard } from '@/components'
import to from "await-to-js";

const route = useRoute();
const router = useRouter();
const { request } = useHttp();
const routerStore = useRouterStore();
routerStore.SET_BREADCRUMB([
    {
        name: "Activity",
        path: "/activity",
        isClickable: true
    },
    {
        name: `${route.query.task_name}`,
        path: "/audit-extract-generate",
        isClickable: false
    },
]);
const detailData = ref<any>({});
const tabIndex = ref<any>(route.query.activatedTab);
const tabList = ref<any[]>([
    { name: "Audit" },
    { name: "Extract" },
    { name: "Generate" },
]);
const handleTabChange = async (index: number) => {
    tabIndex.value = index;
    router.push({
        query: {
            ...route.query,
            activatedTab: index,
        },
    });
};
watch(
    () => route.fullPath,
    () => {
        routerStore.SET_BREADCRUMB([
            {
                name: "Activity",
                path: "/activity",
                isClickable: true
            },
            {
                name: `${route.query.task_name}`,
                path: "/audit-extract-generate",
                isClickable: false
            },
        ]);
    },
    { immediate: true }
);
const getDetail = async () => {
    const task_id = route.query.task_id;
    const dataApi = useApiActivity("get_activity_detail")(task_id);
    const [error, res] = await to<{ data: any; code: number }>(
        request(dataApi)
    );
    if (error) return;
    if (res?.code == 200) {
        detailData.value = res?.data;
    }
};

onMounted(async () => {
    tabIndex.value = route.query.activatedTab || "0";
    await getDetail();
});
</script>
<template>
    <base-card>
        <template #header>

            <div class="flex flex-wrap items-start justify-center mt-[15px]">
                <div class="btn-wrap">
                    <div v-for="(item, index) in tabList" :key="item.name">
                        <Button class="flex items-center gap-[4px] fill-revert-layer tab-btn"
                            :class="{ 'btn-active': index == tabIndex }" @click="handleTabChange(index)">
                            {{ item.name }}
                        </Button>
                    </div>
                </div>
            </div>
            <div class="content-wrap">
                <div v-if="tabIndex == '0'">
                    <Audit :taskName="detailData.name" />
                </div>
                <div v-if="tabIndex == '1'">
                    <Extract :taskName="detailData.name" />
                </div>
                <div v-if="tabIndex == '2'">
                    <Generate :taskName="detailData.name" />
                </div>
            </div>
        </template>
    </base-card>
</template>

<style src="./index.scss" lang="scss" scoped></style>
