<script setup lang="ts">
import { useCommonStore } from "@/stores";

defineOptions({
  name: "AgentCardTemplate",
});

import { Empty, Avatar } from "ant-design-vue";
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

import { NuxtIcon } from "@/components";

import { useRoute, useRouter } from "vue-router";
import { formatReadCount } from "@/utils";

const props = defineProps({
  dataList: {
    type: Object,
    default: () => {},
  },
  showSource: {
    type: Boolean,
    default: true,
  },
  canSelect: {
    type: Boolean,
    default: false,
  },
  isloading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["selectedMyAgent"]);
const route = useRoute();
const router = useRouter();
const commonStore: any = useCommonStore();

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
    router.push(
      `/pre-built-ai-agents/share-agent?agent_id=${agent.id}&from=${route.name}`
    );
  }
};
</script>

<template>
  <div class="pre-ai-agent-wrap" v-if="dataList.length > 0">
    <div
      v-for="(agent, index) in dataList"
      :key="index"
      class="my-card-item"
      :style="{ 'margin-bottom': showSource ? '30px' : '' }"
    >
      <div
        hoverable
        :class="
          canSelect && commonStore.currentSelectedAgent?.id === agent?.id
            ? 'my-card-info crad-selected'
            : 'my-card-info'
        "
        @click="selectedMyAgent(agent)"
      >
        <div class="card-info">
          <div class="agent-icon">
            <Avatar
              :src="agent?.logo_url"
              shape="square"
              :size="114"
              loading="lazy"
              style="background-color: #efeff0"
            >
            </Avatar>
          </div>
          <div class="agent-info">
            <span class="agent-name">{{ agent?.name }}</span>
            <span class="agent-desc">
              {{ agent?.brief_description }}
            </span>
          </div>
        </div>
        <span
          class="selected-icon"
          v-if="commonStore.currentSelectedAgent?.id === agent?.id"
        >
          <NuxtIcon name="selected" class="text-[16px] pl-[2px]" />
        </span>
      </div>
      <div class="agent-source" v-if="showSource">
        <div class="logo-border">
          <Avatar
            v-if="agent?.publisher?.avatar"
            :size="18"
            :src="agent?.publisher?.avatar"
            style="background-color: #efeff0"
            class="avatar-box"
          />
          <Avatar
            v-else
            :size="18"
            :style="{
              'background-color': agent?.publisher?.default_color,
            }"
            class="avatar-box"
          >
            <span class="text-[12px] flex justify-center items-center">
              {{ agent?.publisher?.display?.substring(0, 1).toUpperCase() }}
            </span>
          </Avatar>
        </div>
        <div class="flex justify-between items-center w-full">
          <div class="flex items-center gap-[10px]">
            <span class="source-title"> By {{ agent?.publisher?.display }} </span>
            <span class="c-[#999999] mb-[2px] text-[18px]">· </span>
            <span
              class="c-[#999999] text-[12px] flex items-center gap-[4px] font-[Inter]"
            >
              <NuxtIcon name="preview" class="text-[16px]" />
              {{ formatReadCount(agent?.view_count || 0) }}
            </span>
            <span
              class="c-[#999999] text-[12px] flex items-center gap-[4px] font-[Inter] ml-[4px]"
            >
              <NuxtIcon name="user-num" class="text-[16px]" />
              {{ formatReadCount(agent?.use_count || 0) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Empty
    v-if="dataList.length === 0 && !isloading"
    :image="simpleImage"
    description="No data"
    style="margin-top: 60px"
  />
</template>

<style src="./index.scss" scoped lang="scss"></style>
