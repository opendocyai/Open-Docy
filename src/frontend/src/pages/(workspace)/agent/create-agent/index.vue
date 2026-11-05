<script setup lang="ts">
import { useApiAgent } from '@/api';
import { useHttp } from '@/client';
import { useCommonStore, useRouterStore, useSpaceStore } from '@/stores';
import to from 'await-to-js';
import { debounce } from 'lodash';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { Row, Col, Button, Form, FormItem, Input, Textarea } from 'ant-design-vue'

import { AgentLimitReached, NuxtIcon, AgentCardTemplateMy } from '@/components'

const routerStore = useRouterStore();
routerStore.SET_BREADCRUMB([
    {
        name: "Agent",
        path: "/agent",
        isClickable: true,
    },
    {
        name: "Create Agent",
        path: "/create-agent",
        isClickable: false,
    },
]);
const { request } = useHttp();

const router = useRouter()

const spaceStore: any = useSpaceStore();
const commonStore: any = useCommonStore();
const spaceInfoCurrent: any = computed(() => spaceStore.spaceInfoCurrent);
const myAgents = ref<any>([]);
const preBuiltAiAgent = ref<HTMLElement | null>(null);
const prebuiltAgents = ref<any>([]);
const pageSize = ref(9);
const pageSizePre = ref(9);

const pageNumber = ref(1);
const pageNumberPre = ref(1);

const allCount = ref<number>(0);
const allCountPre = ref<number>(0);

const isLoadingCreate = ref(false);
const isLoadingFirst = ref(false);
const isLoadingFirstPre = ref(true);

const isLoadingMore = ref(false);
const isLoadingMorePre = ref(false);

const agentForm = reactive({
    name: "",
    description: "",
});
const rules = reactive<any>({
    name: [{ required: true, message: "The agent name is required", trigger: "blur" }],
});

function onCancel() {
    router.push("/agent");
    commonStore.SET_CURRENT_SELECTED_AGENT({});
}

const ruleFormRef = ref<any>(null);
const onConfirm = debounce(() => {
    ruleFormRef.value
        .validate()
        .then(() => {
            toPreAdd();
        })
        .catch((error: any) => {
            scrollToTop();
            console.log("error submit!", error);
        });
}, 500);

const toPreAdd = async () => {
    isLoadingCreate.value = true;
    const params = {
        name: agentForm.name,
        description: agentForm.description,
        space_id: spaceInfoCurrent.value.id,
        template_json: commonStore.currentSelectedAgent.template_json,
        agent_id: commonStore.currentSelectedAgent.id === 'empty-agent' ? undefined : commonStore.currentSelectedAgent.id
    };
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiAgent("pre_add_agent"),
            {
                data: { agent: params },
            })
    );
    isLoadingCreate.value = false;

    if (error) return;
    if (res?.code == 200) {
        router.push(`/audit?code=${res?.data?.code}&back=/agent`);
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
                params: {
                    space_id: spaceInfoCurrent?.value?.id,
                    pageNumber: pageNumber.value,
                    pageSize: pageSize.value,
                    sample: true,
                },
            })
    );
    isLoadingMore.value = false;
    isLoadingFirst.value = false;
    if (error) return;
    if (res?.code == 200) {
        const results = res.data.results;

        myAgents.value = myAgents.value.filter(
            (agent: { id: string }) => agent.id !== "empty-agent"
        );

        if (isLoadMore) {
            myAgents.value = [...myAgents.value, ...results];
        } else {
            myAgents.value = results;
        }

        myAgents.value.push({
            id: "empty-agent",
            template_json: undefined,
        });
        if (isLoadMore) {
            await nextTick();
            scrollToPreBuiltSmooth();
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
            prebuiltAgents.value = [...prebuiltAgents.value, ...res.data.results];
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

        const scrollBottom = target.offsetTop + target.offsetHeight - container.offsetHeight;

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

const onGoPreBuiltAIAgent = () => {
    router.push('/pre-built-ai-agents');
}
onMounted(() => {
    commonStore.SET_CURRENT_SELECTED_AGENT({});
    getMyAgentList();
});
</script>

<template>
    <div class="flex justify-center" style="height: calc(100vh - 130px)">
        <div class="agent-info-content-wrap" ref="containerRef">
            <div class="agent-info">
                <h1 class="title">AI Agent Builder</h1>
                <span class="desc">Copy new AI Agent from the existing or pre-built AI Agents</span>
            </div>
            <Row justify="start">
                <Col :xs="24">
                    <Form ref="ruleFormRef" :model="agentForm" :rules="rules" layout="vertical">
                        <div class="agent-info-value">
                            <form-item label="Name" name="name">
                                <Input v-model:value="agentForm.name" :maxlength="64" placeholder="Name your agent" />
                            </form-item>
                        </div>
                        <div class="agent-info-value">
                            <form-item label="Brief description" name="description">
                                <Textarea v-model:value="agentForm.description" placeholder="Add a brief description"
                                    :maxlength="280" :show-count="false"
                                    style="height: max-content; min-height: 150px; resize: none" />
                                <div class="flex justify-between mt-[10px] max-w-[830px]">
                                    <div class="team-info-name-desc" style="margin-top: 0px"></div>
                                    <span class="text-[#999999] font-[Inter] text-[13px]">
                                        {{ agentForm.description.length }} / 280
                                    </span>
                                </div>
                            </form-item>
                        </div>
                    </Form>
                </Col>
            </Row>

            <div class="agent-info-label flex justify-between flex-wrap gap-[10px]">
                <div>
                    My AI Agents
                </div>
                <div class="flex gap-[6px]">Looking for another agent? Visit here
                    <span class="c-[#2E2BD9] flex gap-[2px] items-center cursor-pointer" @click="onGoPreBuiltAIAgent">
                        Pre-built AI Agents
                        <NuxtIcon name="go-to" />
                    </span>
                </div>
            </div>
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

    <Teleport to="#main-footer" v-if="!isLoadingFirst">
        <div class="create-agent-footer">
            <div class="pr-[14px] flex items-center gap-[16px]">
                <Button class="footer-btn" @click="onCancel">Cancel</Button>
                <Button type="primary" class="footer-btn" :disabled="isLoadingCreate" :loading="isLoadingCreate"
                    @click="onConfirm">
                    Confirm
                </Button>
            </div>
        </div>
    </Teleport>

    <agent-limit-reached />
</template>

<style src="./index.scss" lang="scss" scoped></style>
