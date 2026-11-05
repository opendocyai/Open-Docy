<script setup lang="ts">
defineOptions({ name: "ChatRobotMessage" });

import { onMounted, reactive, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{ data?: any[]; botVersion?: string; isBottom?: boolean }>(),
  {
    data: () => [],
    botVersion: "v1",
    isBottom: false,
  }
);
const scrollRef = ref<any>(null);

const dataArray = reactive([...props.data]);

function scrollBottom() {
  setTimeout(() => {
    if (!scrollRef.value) return;
    let scrollHeight: number = 0;
    const { wrapRef, setScrollTop } = scrollRef.value;
    scrollHeight = wrapRef.scrollHeight + Math.random() * 100;
    setScrollTop(scrollHeight);
  }, 300);
}

watch(
  () => props.data,
  (newValue) => {
    dataArray.length = 0;
    dataArray.push(...newValue);
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  watch(
    () => props.data,
    () => {
      if (props.isBottom) scrollBottom();
    },
    { deep: true, immediate: true }
  );
});
</script>

<template>
  <div class="chat-message">
    <div class="chat-message--group" v-for="(item, index) in dataArray" :key="index">
      <div class="group__right" v-if="item?.content">
        <div class="group__right--text">
          <div
            class="mb-0 c-[#2c2d2c] font-[Inter] text-[12px] fw-400 leading-[18px]"
            v-html="item?.content"
          />
        </div>
      </div>

      <div class="group__left flex-column">
        <div class="d-flex group__left--wrap">
          <div class="group__left--avatar">
            <img src="@/assets/images/robot-avatar.svg" alt="property chat" />
          </div>
          <div
            class="group__left--text d-flex"
            :class="{ 'error-mas': item?.error }"
            v-if="item?.response"
          >
            <div
              class="mb-0 c-[#2c2d2c] font-[Inter] text-[12px] fw-400 leading-[18px]"
              v-html="item?.response"
            />
          </div>
          <div class="group__left--text group__progress bg-[#F2F1FF]" v-if="item?.progress">
            <div class="dot-loader">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
