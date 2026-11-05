<script setup lang="ts">
import { useApiActivity, useApiAgent } from '@/api';
import { useHttp } from '@/client';
import { useCommonStore, useMainStore, useRouterStore, useSpaceStore } from '@/stores';
import { hasRolePerm } from '@/utils';
import { message, Row, Col, Form, FormItem, Button, Input } from 'ant-design-vue';
import { debounce } from 'lodash';
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';

import { LoadingOutlined } from '@ant-design/icons-vue';
import { NuxtIcon, AgentCardTemplateMy } from '@/components'
import to from 'await-to-js';

import { useRouter } from 'vue-router'

const routerStore = useRouterStore();
routerStore.SET_BREADCRUMB([
    {
        name: "Activity",
        path: "/activity",
        isClickable: true,
    },
    {
        name: "Create Task",
        path: "/create-activity",
        isClickable: false,
    },
]);

const router = useRouter()

const { request } = useHttp();
const mainStore = useMainStore();
const userInfo: any = computed(() => mainStore.userInfo);
const preBuiltAiAgent = ref<HTMLElement | null>(null);
const spaceStore: any = useSpaceStore();
const commonStore: any = useCommonStore();
const myAgents = ref<any>([]);
const prebuiltAgents = ref<any>([]);
const activityForm = reactive({
    name: "",
});
const rules = reactive<any>({
    name: [
        { required: true, message: "The task name is required", trigger: "blur" },
    ],
});

const pageSize = ref(9);
const pageSizePre = ref(9);

const pageNumber = ref(1);
const pageNumberPre = ref(1);

const allCount = ref<number>(0);
const allCountPre = ref<number>(0);

const isLoadingCreate = ref(false);
const isLoadingFirst = ref(true);
const isLoadingFirstPre = ref(true);

const isLoadingMore = ref(false);
const isLoadingMorePre = ref(false);

const ruleFormRef = ref<any>(null);
const onCreate = debounce(async () => {
    ruleFormRef.value
        .validate()
        .then(() => {
            if (!commonStore.currentSelectedAgent.id) {
                message.warning("Please click to select the AI Agent");
                return;
            }
            toCreateTask();
        })
        .catch((error: any) => {
            scrollToTop();
            console.log("error submit!", error);
        });
}, 500);

const toCreateTask = async () => {
    isLoadingCreate.value = true;
    const agent_from = commonStore.currentSelectedAgent.source_agent ? 1 : 2;
    const params = {
        name: activityForm.name,
        space_id: spaceStore.spaceInfoCurrent?.id,
        agent_id: commonStore.currentSelectedAgent.id,
        agent_from,
    };
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiActivity("create_activity"),
        {
            data: params,
        })
    );
    isLoadingCreate.value = false;

    if (error) return;
    if (res?.code == 200) {
        router.push(
            `/activity/create-activity/upload-file?task_id=${res.data.task_id}`
        );
    }
};

const getMyAgentList = async (isLoadMore = false) => {
    isLoadingMore.value = true;
    if (!isLoadMore) {
        isLoadingFirst.value = true;
    }
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiAgent("get_agent_list"),
        {
            data: {
                space_id: spaceStore.spaceInfoCurrent?.id,
                exp_draft: true,
                sample: true,
                pageNumber: pageNumber.value,
                pageSize: pageSize.value,
            },
        })
    );
    isLoadingMore.value = false;
    isLoadingFirst.value = false;


    console.log('res :', res);
    console.log('isLoadMore :', isLoadMore);
    if (error) return;
    if (res?.code == 200) {
        if (isLoadMore) {
            myAgents.value = [...myAgents.value, ...res.data.results];
            await nextTick();
            scrollToBottom();
        } else {
            myAgents.value = res.data.results;
        }
        allCount.value = res.data.count;
    }
};

const getPreBuiltAgentList = async (isLoadMore = false) => {
    isLoadingMorePre.value = true;
    if (!isLoadMore) {
        isLoadingFirstPre.value = true;
    }
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiAgent("get_marketplace_list"),
            {
                data: {
                    category: "",
                    name: "",
                    pageNumber: pageNumberPre.value,
                    pageSize: pageSizePre.value,
                },
            })
    );
    isLoadingMorePre.value = false;
    isLoadingFirstPre.value = false;
    if (error) return;
    if (res?.code == 200) {
        if (isLoadMore) {
            prebuiltAgents.value = [
                ...prebuiltAgents.value,
                ...res.data.results,
            ];
            await nextTick();
            scrollToBottom();
        } else {
            prebuiltAgents.value = res.data.results;
        }
        allCountPre.value = res.data.count;
    }
};
const loadMore = () => {
    if (isLoadingMore.value) return;
    pageNumber.value += 1;
    getMyAgentList(true);
};

const loadMorePre = () => {
    if (isLoadingMorePre.value) return;
    pageNumberPre.value += 1;
    getPreBuiltAgentList(true);
};

const scrollToPreBuiltSmooth = () => {
    if (containerRef.value && preBuiltAiAgent.value) {
        const container = containerRef.value;
        const target = preBuiltAiAgent.value;

        const scrollBottom =
            target.offsetTop + target.offsetHeight - container.offsetHeight;

        container.scrollTo({
            top: scrollBottom,
            behavior: "smooth",
        });
    }
};
const containerRef = ref<HTMLElement | null>(null);
const scrollToTop = () => {
    if (containerRef.value) {
        containerRef.value.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
};
const scrollToBottom = () => {
    if (containerRef.value) {
        containerRef.value.scrollTo({
            top: containerRef.value.scrollHeight,
            behavior: "smooth",
        });
    }
};

watch(
    () => spaceStore.spaceInfoCurrent,
    (newVal: any) => {
        if (newVal?.id) {
            commonStore.SET_CURRENT_SELECTED_AGENT({});
        }
    },
    { deep: true, immediate: true }
);

onMounted(() => {
    if (hasRolePerm('sys:agent:view')) {
        getMyAgentList();
    } else {
        isLoadingFirst.value = false
    }
});
</script>


<template>
    <div class="flex justify-center overflow-auto" style="height: calc(100vh - 130px)">
        <div class="info-content-wrap font-[Inter]" ref="containerRef">
            <div class="mb-[60px]">
                <div class="text-[20px] text-[#000000] mt-[30px] leading-[29px] fw-500">
                    Hello <span class="text-[#2E2BD9]">{{ userInfo.display }}</span>, welcome to Docy AI !
                </div>
                <div class="text-[32px] text-[#000000] mt-[20px] leading-[29px] fw-600">
                    Create Task
                </div>
            </div>
            <div class="mb-[20px]">
                <div class="text-[24px] text-[#000000] mb-[30px] fw-500 font-[Inter]">
                    1. Task the name
                </div>
                <Row justify="start">
                    <Col :xs="24" :xxl="24">
                        <Form ref="ruleFormRef" :model="activityForm" :rules="rules" layout="vertical">
                            <div class="form-info-value">
                                <form-item label="Name the task" name="name">
                                    <Input v-model:value.trim="activityForm.name" :maxlength="64"
                                        placeholder="Name your task" />
                                </form-item>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
            <div>
                <div class="text-[24px] text-[#000000] mb-[30px] fw-500 font-[Inter]">
                    2. Click to select the AI Agent
                </div>
                <div class="agent-info-label">My AI Agents</div>
                <div class="flex justify-center items-center h-[150px]" v-if="isLoadingFirst">
                    <LoadingOutlined spin class="text-[20px] c-[#2E2BD9]" />
                </div>
                <div v-else>
                    <agent-card-template-my :dataList="myAgents" :canSelect="true" />
                    <div class="w-[100%] h-[20px] mt-[20px] pr-[30px] flex justify-center items-center"
                        v-if="myAgents.length < allCount">
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
    </div>

    <Teleport to="#main-footer" v-if="!isLoadingFirst">
        <div class="create-footer">
            <div class="pr-[20px] flex justify-end items-center">
                <Button type="primary" class="footer-btn" :disabled="!hasRolePerm('sys:agent:view') || isLoadingCreate"
                    :loading="isLoadingCreate" @click="onCreate">
                    Create
                </Button>
            </div>
        </div>
    </Teleport>
</template>

<style src="./index.scss" lang="scss" scoped></style>
