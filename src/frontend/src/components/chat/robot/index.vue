<script setup lang="ts">
import { useCommonStore } from "@/stores";
import { useRoute } from "vue-router";
import { ChatRobotDrawer } from "@/components";
import { Button } from "ant-design-vue";

defineOptions({
  name: "ChatRobot",
});

const commonStore: any = useCommonStore();
const route = useRoute();

function onHideAskTips() {
  commonStore.SET_ASK_BTN_TIPS(false);
}

function openRobotDrawer() {
  if (["audit"].includes(route.name as string)) {
    if (!commonStore.askBtnTips) {
      commonStore.SET_IS_SHOW_ROBOT_DRAWER(true);
    }
  } else {
    commonStore.SET_IS_SHOW_ROBOT_DRAWER(true);
  }
}
</script>

<template>
  <div
    v-if="['dashboard', 'audit'].includes(route.name as string)"
    class="chat-robot-btn"
    @keydown.stop
    @pointerdown.stop
    @dblclick.stop
    @contextmenu.stop
    @click.stop="openRobotDrawer"
    shape="square"
  >
    <img src="@/assets/images/ai-assistant.svg" alt="AI Assistant" />
    <span>AI Assistant</span>
    <div class="ask-tip" v-if="commonStore.askBtnTips">
      <div class="ask-tip-content">
        <div class="ask-tip-card">
          <div class="ask-tip-title">Ask the AI Assistant</div>
          <div class="ask-tip-text">
            Share your idea with AI—instantly generate a flowchart and streamline your
            workflow in one go!
          </div>
          <div class="ask-tip-btn">
            <Button @click.stop="onHideAskTips"> I Got It</Button>
          </div>
        </div>
      </div>
      <div class="ask-tip-mask"></div>
    </div>
  </div>
  <ChatRobotDrawer v-if="commonStore.isShowRobotDrawer" />
</template>

<style src="./index.scss" scoped lang="scss"></style>
