<script setup lang="ts">
defineOptions({ name: 'AgentCardTemplateMy' })

import { hasRolePerm } from "@/utils";
import { Empty, Card } from "ant-design-vue";
import { NuxtIcon } from '@/components';
import { useCommonStore } from "@/stores";
import { useApiAgent } from "@/api";

import { useHttp } from "@/client";
import { useRouter } from 'vue-router';
import to from "await-to-js";



const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

const props = defineProps({
    dataList: {
        type: Object,
        default: () => { },
    },
    canSelect: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(["selectedMyAgent"]);


const {request} = useHttp()
const router = useRouter()
const commonStore: any = useCommonStore();

const showAgent = async (record: {
    template_json: any;
    description: any;
    name: any;
    space_id: any;
    id: any;
}) => {
    const params = {
        agent: {
            name: record.name,
            description: record.description,
            space_id: record.space_id,
            agent_id: record.id,
            template_json: record.template_json,
        },
    };
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiAgent("pre_update_agent"),
        {
            data: params,
        })
    );
    if (error) return;
    if (res?.code == 200) {
        router.push(`/audit?code=${res?.data?.code}`);
    }
};
const selectedMyAgent = (agent: {
    template_json: any;
    description: any;
    name: any;
    space_id: any;
    id: any;
}) => {
    if (props.canSelect) {
        commonStore.SET_CURRENT_SELECTED_AGENT(agent);
        emit("selectedMyAgent", agent);
    } else {
        showAgent(agent);
    }
};
</script>

<template>
    <div class="my-ai-agent-wrap" v-if="dataList?.length > 0">
        <div v-for="(agent, index) in dataList" :key="index" class="my-card-item">
            <Card v-if="agent?.id === 'empty-agent'" hoverable :class="commonStore.currentSelectedAgent?.id === 'empty-agent'
                    ? 'my-card-info create-card crad-selected'
                    : 'my-card-info create-card'
                " @click="selectedMyAgent(agent)">
                <div class="create-text">+ Create new Agent</div>
                <span class="selected-icon" v-if="commonStore.currentSelectedAgent?.id === agent?.id">
                    <NuxtIcon name="selected" class="text-[16px] pl-[2px]" />
                </span>
            </Card>
            <Card v-else hoverable class="my-card-info" :data-id="agent.id" :class="canSelect && commonStore.currentSelectedAgent?.id === agent?.id
                    ? 'my-card-info crad-selected'
                    : 'my-card-info'
                " @click="selectedMyAgent(agent)">
                <span class="card-title" :title="agent?.name">{{ agent?.name }}</span>
                <p class="card-desc" :title="agent?.description">
                    {{ agent?.description }}
                </p>
                <span class="selected-icon" v-if="commonStore.currentSelectedAgent?.id === agent?.id">
                    <NuxtIcon name="selected" class="text-[16px] pl-[2px]" />
                </span>
            </Card>
        </div>
    </div>
    <Empty :image="simpleImage" :description="hasRolePerm('sys:agent:view') ? 'No data' : 'No permission'" v-else
        style="margin-top: 60px" />
</template>

<style src="./index.scss" scoped lang="scss"></style>
