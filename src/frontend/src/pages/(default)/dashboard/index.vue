<script setup lang="ts">

definePage({
    name: 'dashboard'
})

import { useRouterStore, useCommonStore } from "@/stores";

const routerStore = useRouterStore();

routerStore.SET_BREADCRUMB([
    {
        name: "Dashboard",
        path: "/dashboard",
    }
]);


import { Button, message } from 'ant-design-vue'

import { ref, watch, onMounted, onBeforeMount, nextTick } from 'vue'

import { LoadingOutlined, RightOutlined } from '@ant-design/icons-vue'

import { NuxtIcon, AgentCardTemplate } from '@/components'
import { useHttp } from "@/client";

import { useApiCommon, useApiAgent } from "@/api";

import to from "await-to-js";

const { request } = useHttp();

const quickList = [
    "AI Workflow to create and validate invoices",
    "AI Workflow to review and analyze contracts",
    "AI Agent to auto-fill and manage repetitive documents",
];

const commonStore: any = useCommonStore();
const tabLists = ref<any>([]);

const selected = ref("");
const selectedStyle = {
    backgroundColor: "#F2F1FF",
    color: "#2E2BD9",
    borderColor: "#2E2BD9",
};

const defaultStyle = {
    borderColor: "#DCDBDD",
    color: "#8B8C8F",
};
const keyword = ref("");
const queryName = ref("");
const dataList = ref<any>([]);
const pageSize = ref(200);
const pageNumber = ref(1);
const allCount = ref<number>(0);
const isLoadingMore = ref(false);
const isLoadingFirst = ref(false);

const getMarketplaceClass = async () => {
    const [err, res] = await to(
        request(useApiCommon("get_marketplace_class"))
    );
    console.log("🚀 ~ getMarketplaceClass ~ res: ", res);
    if (err) return;
    tabLists.value = res;
};

const getAgentList = async (isLoadMore = false) => {
    isLoadingMore.value = true;
    if (!isLoadMore) {
        isLoadingFirst.value = true;
    }
    const [err, res] = await to<{ data: any; code: number }>(
        request(useApiAgent("get_marketplace_list"),
            {
                data: {
                    category: selected.value,
                    name: queryName.value,
                    pageNumber: pageNumber.value,
                    pageSize: pageSize.value,
                },
            }
        ));
    isLoadingMore.value = false;
    isLoadingFirst.value = false;
    if (err) return;
    if (res?.code == 200) {
        if (isLoadMore) {
            dataList.value = [...dataList.value, ...res.data.results];
            await nextTick();
            scrollToBottom();
        } else {
            dataList.value = res.data.results;
        }
        allCount.value = res.data.count;
    }
};

const onSearch = (item: string) => {
    pageSize.value = 200;
    pageNumber.value = 1;
    selected.value = selected.value === item ? "" : item;
    getAgentList();
};

const onSendQa = (_keyword: string) => {
    if (!_keyword) {
        message.warning("Please enter your question!");
        return;
    }
    commonStore.SET_IS_SHOW_ROBOT_DRAWER(true);
    commonStore.SET_CHAT_KEYWORD(_keyword);
    keyword.value = "";
};

const handleEnter = () => {
    if (commonStore.isChatting) return;
    if (!keyword.value) {
        message.warning("Please enter your question!");
        return;
    }
    onSendQa(keyword.value);
};

const onQuickQa = (item: string) => {
    commonStore.SET_IS_SHOW_ROBOT_DRAWER(true);
    commonStore.SET_CHAT_KEYWORD(item);
};

const loadMore = () => {
    if (isLoadingMore.value) return;
    pageNumber.value += 1;
    getAgentList(true);
};

const containerRef = ref<HTMLElement | null>(null);
const scrollToBottom = () => {
    if (containerRef.value) {
        containerRef.value.scrollTo({
            top: containerRef.value.scrollHeight,
            behavior: "smooth",
        });
    }
};


watch(queryName, (newVal: any) => {
    if (!newVal) {
        getAgentList();
    }
});

onBeforeMount(() => {
    commonStore.SET_ASK_BTN_TIPS(false);
})

onMounted(() => {
    commonStore.SET_ASK_BTN_TIPS(false);
});
</script>

<template>
    <div class="dashboard p-2 p-lg-4 overflow-auto" style="height: calc(100vh - 70px)" ref="containerRef">
        <div class="w-full h-full min-h-[443px] flex flex-wrap items-center justify-center dashboard-top">
            <div class="dashboard-top-wrap">
                <div class="ai-slogan-wrap">
                    <img src="@/assets/images/robot-avatar.svg" alt="" />
                    <span> Your work, <span class="auto">auto</span> flow. </span>
                </div>

                <div class="ai-input-wrap">
                    <div class="gradient-border">
                        <div class="input-wrap">
                            <input v-model.trim="keyword" type="text"
                                placeholder="Ask about node setup, AI workflow, or running an Agent..." maxlength="1024"
                                @keydown.enter.prevent="handleEnter" />
                            <img src="@/assets/images/send.svg" alt="" :class="commonStore.isChatting || !keyword ? ' unsend-btn' : 'send-btn'
                                " @click="onSendQa(keyword)" />
                        </div>
                    </div>
                </div>
                <div class="quick-list">
                    <div class="explorer">
                        <span class="text">AI Workflow Explorer </span>
                        <span class="icon">🚀</span>
                    </div>
                    <div class="list-wrap flex flex-wrap justify-center gap-4">
                        <div class="list" v-for="(item, index) in quickList" :key="index" @click="onQuickQa(item)">
                            <span class="quick-item" :title="item">{{ item }} </span>
                            <RightOutlined class="icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pre-built-agent" v-if="false">
            <div class="agent-header">
                <span class="ai-agent">Pre-built AI Agent</span>
                <div class="agent-filter-btn">
                    <Button v-for="item in tabLists" :key="item[1]" shape="round"
                        :type="selected === item[1] ? 'primary' : 'default'" :ghost="selected !== item[1]"
                        :style="selected === item[1] ? selectedStyle : defaultStyle" @click="onSearch(item[1])">
                        {{ item[0] }}
                    </Button>
                </div>
            </div>
            <div class="agent-list">
                <div class="flex justify-center items-center loading-box" v-if="isLoadingFirst">
                    <LoadingOutlined spin class="text-[20px] c-[#2E2BD9]" />
                </div>
                <agent-card-template v-else :dataList="dataList" :canSelect="false" />
                <div class="w-[100%] h-[20px] mt-[20px] pr-[30px] flex justify-center items-center"
                    v-if="dataList?.length < allCount && !isLoadingMore">
                    <Button type="link" class="more-btn flex justify-center items-center" style="color: #2e2bd9"
                        :disabled="isLoadingMore" @click="loadMore">
                        Load More
                        <LoadingOutlined spin class="text-[12px]" v-if="isLoadingMore" />
                        <NuxtIcon name="load_down" class="c-[#2E2BD9] text-[14px] pl-[6px]" v-else />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>