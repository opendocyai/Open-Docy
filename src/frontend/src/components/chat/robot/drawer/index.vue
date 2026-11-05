<script setup lang="ts">
defineOptions({
  name: "ChatRobotDrawer",
});

import { useConfirmModal } from "@/composables";
import {
  useCommonStore,
  useEventSourceStore,
  useMainStore,
  useSpaceStore,
} from "@/stores";
import {
  Drawer,
  Button,
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  Textarea,
  message,
} from "ant-design-vue";
import { NuxtIcon, ChatRobotNav, ChatRobotMessage } from "@/components";
import { computed, createVNode, nextTick, ref, useTemplateRef, watch } from "vue";
import { LoadingOutlined, RightOutlined } from "@ant-design/icons-vue";
import { debounce } from "lodash";
import { useApiBot } from "@/api";
import { useHttp } from "@/client";
import to from "await-to-js";

const { request } = useHttp();

const commonStore: any = useCommonStore();

const mainStore: any = useMainStore();
const spaceStore: any = useSpaceStore();
const spaceInfoCurrent: any = computed(() => spaceStore.spaceInfoCurrent);

const eventSourceStore = useEventSourceStore();

const { showConfirm } = useConfirmModal();

const quickList = [
  "AI Workflow to create and validate invoices",
  "AI Workflow to review and analyze contracts",
  "AI Agent to auto-fill and manage repetitive documents",
];

const answerBoxRef = useTemplateRef<HTMLDivElement>("answerBoxRef");

const keyword = ref<string>("");
const isBottom = ref<boolean>(false);
const mapObject = ref<any>([]);
const chatList = ref<any>([]);
const isShowChatListDrawer = ref<boolean>(false);
const isSessionListLoading = ref<boolean>(false);
const isShowQuickList = ref<boolean>(true);
const pageNumber = ref(1);
const pageSize = ref(20);
const hasMore = ref(false);
const loading = ref(false);
const isHistoryLoading = ref(false);
const allCount = ref(0);

function scrollToBottom() {
  if (answerBoxRef.value) {
    answerBoxRef.value.scrollTo({
      top: answerBoxRef.value.scrollHeight,
      behavior: "smooth",
    });
  }
}

function onClose() {
  commonStore.SET_IS_SHOW_ROBOT_DRAWER(false);
}

function onCloseList() {
  isShowChatListDrawer.value = false;
}

function navigate() {
  isShowChatListDrawer.value = true;
}

async function handleChange(item: any) {
  mainStore.SET_USER_SESSION_ID(item.id);
  commonStore.SET_IS_CHATTING(false);
  isShowChatListDrawer.value = false;

  isHistoryLoading.value = true;
  loading.value = false;
  pageNumber.value = 1;

  try {
    mapObject.value = await getMessageList(1);
    hasMore.value = !(mapObject.value.length >= allCount.value);
    await nextTick();
    setTimeout(() => {
      scrollToBottom();
    }, 500);
  } finally {
    isHistoryLoading.value = false;
  }
}

async function handleInputEdit(item: any) {
  const session_id = item.id;
  const dataApi = useApiBot("update_session")(session_id);
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi, {
      data: {
        title: item.title,
      },
    })
  );

  if (error) return;
  if (res?.code == 200) {
    await getUserSessionList();
  }
}

async function getUserSessionList() {
  isSessionListLoading.value = true;
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiBot("get_session_list"), {
      data: {
        space_id: spaceInfoCurrent.value.id,
        user_id: mainStore.userInfo?.id,
      },
    })
  );

  isSessionListLoading.value = false;

  if (error) return;
  if (res?.code == 200 && res?.data) {
    chatList.value = [];
    const sessionsData = res?.data;

    sessionsData?.forEach((item: any) => {
      if (item[1].length) {
        chatList.value.push({
          name: item[0],
          list: item[1],
        });
      }
    });
  }
}

async function handleDeleteSession(item: any) {
  const session_id = item.id;
  const dataApi = useApiBot("delete_session")(session_id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));

  if (error) return;
  if (res?.code == 200) {
    await getUserSessionList();
    newConversation();
  }
}

async function handleDelete(item: any) {
  showConfirm({
    title: "Confirm Chat Deletion",
    content: createVNode("span", { style: "color:#212121;" }, [
      `Are you sure you want to delete the `,
      createVNode("b", { style: { fontSize: "13px" } }, `"${item.title}"`),
      createVNode("span", { style: { fontSize: "12px" } }, " ?"),
    ]) as any,
    onOk: async () => {
      await handleDeleteSession(item);
    },
    onCancel: () => {
      console.log("cancel");
    },
  });
}

function newConversation() {
  mapObject.value = [];
  keyword.value = "";
  mainStore.SET_USER_SESSION_ID();
  commonStore.SET_IS_CHATTING(false);
  createUserSession("new conversation");
}

async function getMessageList(page = 1) {
  const params = {
    pageNumber: page,
    pageSize: pageSize.value,
    session_id: mainStore.userSessionId,
    orderBy: "update_at.desc",
  };

  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiBot("get_message_list"), { data: params })
  );

  if (!error && res.code == 200) {
    allCount.value = res?.data.count;
    return res?.data?.results?.reverse() ?? [];
  }
  return [];
}

async function loadMore() {
  if (loading.value || !hasMore.value) return;
  loading.value = true;

  const nextPage = pageNumber.value + 1;
  const newData = await getMessageList(nextPage);

  if (!newData.length) {
    hasMore.value = false;
  } else {
    pageNumber.value = nextPage;
    mapObject.value = [...newData, ...mapObject.value];
    hasMore.value = !(mapObject.value.length >= allCount.value);
  }

  loading.value = false;
}

async function sendMessage(_keyword: any, type?: any) {
  if (commonStore.isChatting) {
    message.warning("Q&A in progress, please try again later!");
    return;
  }

  if (!_keyword) {
    message.warning("Please enter your question!");
    return;
  }

  keyword.value = "";
  commonStore.SET_IS_CHATTING(true);
  commonStore.SET_CHAT_KEYWORD("");

  const params = {
    user_id: mainStore.userInfo?.id,
    content: _keyword,
    session_id: mainStore.userSessionId,
  };
  mapObject.value.push({
    content: _keyword,
    progress: true,
    response: "",
    id: "",
  });
  await nextTick();

  scrollToBottom();

  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiBot("send_message"), {
      data: params,
    })
  );
  if (error || res.code == 400) commonStore.SET_IS_CHATTING(false);
}

function handleEnter(e: KeyboardEvent) {
  console.log("e :", e);
  if (e.shiftKey) return;

  e.preventDefault();
  sendMessage(keyword.value);
}

const handleTextareaChange = debounce(() => {
  scrollToBottom();
}, 500);

async function createUserSession(type?: string) {
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiBot("create_user_session"), {
      data: {
        user_id: mainStore.userInfo?.id,
        space_id: spaceInfoCurrent.value?.id,
      },
    })
  );

  if (error) return;
  if (res?.code == 200 && res.data?.session) {
    mainStore.SET_USER_SESSION_ID(res.data?.session);
    if (type !== "new conversation") {
      await sendMessage(commonStore.chatKeyword, "send");
    }
  }
}

async function getUserSession() {
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiBot("get_user_session"), {
      data: {
        space_id: spaceInfoCurrent.value.id,
      },
    })
  );

  if (error) return;
  if (res?.code == 200 && res.data?.id) {
    await loadMore();
    mainStore.SET_USER_SESSION_ID(res.data?.id);
    if (commonStore.chatKeyword) {
      await sendMessage(commonStore.chatKeyword);
    }
  } else {
    await createUserSession("create session");
  }
}

watch(
  () => eventSourceStore.sse_data,
  (newVal) => {
    if (!newVal?.event_type) return;
    if (newVal?.event_type === "message_push") {
      if (newVal?.payload?.is_finished) commonStore.SET_IS_CHATTING(false);
      const contentChunk = newVal?.content;
      for (const item of mapObject.value) {
        if (!item.id || item.id === newVal?.payload?.message_id) {
          item.response = (item.response || "") + contentChunk;
          item.id = newVal?.payload?.message_id;
          item.progress = false;
          break;
        }
      }
      nextTick(() => {
        scrollToBottom();
      });
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => commonStore.isShowRobotDrawer,
  async (newVal) => {
    if (newVal) {
      if (commonStore.isChatting) {
        message.warning("Q&A in progress, please try again later!");
        return;
      } else {
        await getUserSession();
      }
    } else {
      isShowChatListDrawer.value = false;
    }
  },
  { immediate: true }
);
watch(
  () => commonStore.isChatting,
  (newVal) => {
    if (newVal) {
      isShowQuickList.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <Drawer
    placement="right"
    :width="466"
    v-model:open="commonStore.isShowRobotDrawer"
    @close="onClose"
    rootClassName="chat-drawer"
    :closable="false"
    :push="false"
    :bodyStyle="{ padding: '10px 0px 24px' }"
    :headerStyle="{ 'border-bottom': '0px', padding: '10px 24px 0px 24px' }"
    :contentWrapperStyle="{
      'border-top-left-radius': '20px',
      overflow: 'hidden',
    }"
  >
    <template #title>
      <div class="flex items-center justify-between pr-4 gap-[5px]">
        <div class="flex items-center gap-[10px]">
          <div class="chit-header__left--icon cursor-pointer" @click="navigate">
            <NuxtIcon name="menu-list" />
          </div>
          <div class="font-[Inter-Medium,Inter] font-[Inter]" v-if="mapObject.length !== 0">
            Docy Al Assistant
          </div>
        </div>
        <Button
          v-if="mapObject.length !== 0"
          type="primary"
          class="font-[Inter]"
          style="background-color: #2e2bd9"
          @click="newConversation"
        >
          New conversation
        </Button>
      </div>
    </template>
    <template #extra>
      <Button type="link" class="px-0" @click="onClose">
        <NuxtIcon name="close" class="c-[#212121] text-[24px]" />
      </Button>
    </template>

    <Layout style="height: 100%; display: flex; flex-direction: column">
      <layout-header
        class="chat-header"
        style="height: auto"
        v-if="mapObject.length == 0"
      >
        <div class="welcome text-[22px]">
          Hello,l am
          <img src="@/assets/images/robot-avatar.svg" alt="" />
          Docy Al Assistant
        </div>
      </layout-header>

      <layout-content class="chat-content px-[24px]">
        <div class="qa-content" ref="answerBoxRef">
          <div
            class="flex justify-center c-[#cccccc] text-[12px]"
            v-if="mapObject.length !== 0"
          >
            <div
              v-if="!isHistoryLoading && hasMore"
              class="h-[22px] flex items-center justify-center mb-[10px]"
            >
              <Button
                type="link"
                :disabled="commonStore.isChatting"
                class="flex items-center inline-block h-[22px] leading-[22px]"
                @click="loadMore"
              >
                <span
                  :class="commonStore.isChatting ? '' : 'hover:text-[#2E2BD9]'"
                  class="inline-block h-[22px] leading-[22px] text-[12px] text-[#cccccc]"
                >
                  Load More
                </span>
                <LoadingOutlined
                  spin
                  class="text-[12px] c-[#2E2BD9] ml-[6px]"
                  v-if="loading"
                />
              </Button>
            </div>
            <p v-else class="mb-[0px]"></p>
          </div>

          <div v-if="isHistoryLoading" class="flex justify-center items-center h-full">
            <LoadingOutlined spin class="text-[16px] c-[#2E2BD9]" />
          </div>

          <ChatRobotMessage v-else :isBottom="isBottom" :data="mapObject" />
        </div>
      </layout-content>

      <layout-footer class="chat-footer">
        <div class="footer">
          <div class="quick-list" v-if="mapObject.length == 0">
            <div class="explorer mt-[10px] mb-[14px]">
              <span class="text">AI Workflow Explorer </span>
              <span class="icon">🚀</span>
            </div>
            <div class="list-wrap flex flex-wrap justify-center gap-4">
              <div
                class="list"
                v-for="(item, index) in quickList"
                :key="index"
                @click="sendMessage(item)"
              >
                <span class="quick-item" :title="item">{{ item }} </span>
                <RightOutlined class="icon" />
              </div>
            </div>
          </div>

          <div v-else-if="mapObject.length !== 0 && !isShowQuickList">
            <div class="explorer-btn mx-[24px] mt-[14px]" @click="isShowQuickList = true">
              <span class="text">AI Workflow Explorer </span>
              <span class="icon">🚀</span>
            </div>
          </div>

          <div
            class="quick-list quick-list-shadow"
            v-if="mapObject.length !== 0 && isShowQuickList"
          >
            <div class="explorer flex justify-between items-center mt-[10px] mb-[8px]">
              <span class="text">AI Workflow Explorer <span class="icon">🚀</span></span>
              <Button type="link" class="px-0" @click="isShowQuickList = false">
                <NuxtIcon name="close" class="c-[#212121] text-[16px]" />
              </Button>
            </div>
            <div class="list-wrap flex flex-wrap justify-center gap-4">
              <div
                class="list"
                v-for="(item, index) in quickList"
                :key="index"
                @click="sendMessage(item)"
              >
                <span class="quick-item" :title="item">{{ item }} </span>
                <RightOutlined class="icon" />
              </div>
            </div>
          </div>

          <div class="ai-input-wrap px-[24px]">
            <div class="gradient-border">
              <div class="input-wrap">
                <Textarea
                  v-model:value.trim="keyword"
                  type="text"
                  placeholder="Ask about node setup, AI workflow, or running an Agent..."
                  class="custom-textarea"
                  :auto-size="{ minRows: 3, maxRows: 6 }"
                  @pressEnter="handleEnter"
                  @change="handleTextareaChange"
                />
                <img
                  src="@/assets/images/send.svg"
                  alt=""
                  :class="
                    commonStore.isChatting || !keyword ? ' un-send-btn' : 'send-btn'
                  "
                  @click="sendMessage(keyword)"
                />
              </div>
            </div>
          </div>
        </div>
      </layout-footer>

      <Drawer
        placement="left"
        :width="'50%'"
        v-model:open="isShowChatListDrawer"
        @close="onCloseList"
        :get-container="false"
        :closable="false"
        :push="false"
        :bodyStyle="{ padding: '20px 0px 20px 20px' }"
        :headerStyle="{ 'border-bottom': '0px', padding: '10px 10px 0px 20px' }"
        :contentWrapperStyle="{
          'border-top-left-radius': '20px',
          overflow: 'hidden',
        }"
      >
        <div v-if="isSessionListLoading" class="flex justify-center items-center h-full">
          <LoadingOutlined spin class="text-[16px] c-[#2E2BD9]" />
        </div>
        <ChatRobotNav
          v-else
          :list="chatList"
          @onChange="handleChange"
          @onInputEdit="handleInputEdit"
          @onDelete="handleDelete"
          @newConversation="newConversation"
          @onCloseList="onCloseList"
        />
      </Drawer>
    </Layout>
  </Drawer>
</template>

<style src="./index.scss" scoped lang="scss"></style>
