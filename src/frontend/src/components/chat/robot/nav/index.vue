<script setup lang="ts">
defineOptions({
  name: "ChatRobotNav",
});

import { useMainStore } from "@/stores";
import { computed, ref, watch } from "vue";
import { Button, Input } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { NuxtIcon } from "@/components";

const props = withDefaults(
  defineProps<{
    list?: any[];
  }>(),
  {
    list: () => [],
  }
);

const emit = defineEmits([
  "onDelete",
  "onChange",
  "onInputEdit",
  "newConversation",
  "onNewConversation",
  "onCloseList",
]);
const mainStore = useMainStore();

const listData = ref<any>([]);

const titleValue = ref<string | any>(null);

const isEnter = ref<boolean>(false);

const session_id = computed(() => mainStore.userSessionId);

watch(
  () => props.list,
  (value) => {
    listData.value = [...value];
  },
  { deep: true, immediate: true }
);

const handleDelete = (item: any) => {
  setTimeout(() => {
    emit("onDelete", item);
  }, 100);
};

const handleItem = (item: any) => {
  emit("onChange", item);
};

const handleEdit = (item: any, idx: any, index: any) => {
  item.isEdit = true;
  isEnter.value = false;
  titleValue.value = item.title;
  setTimeout(() => {
    const inputDom: any = document.getElementById(`inputRef${index}${idx}id`);
    inputDom.focus();
  }, 50);
};

const handleEnter = (list: any) => {
  isEnter.value = true;
  list.isEdit = false;
  emit("onInputEdit", list, list.title);
};

const handleBlur = (item: any) => {
  if (!isEnter.value) {
    item.title = titleValue.value;
    item.isEdit = false;
  }
};
const hovered = ref(false);
const hoverBtn = ref("");
const newConversation = () => {
  emit("onCloseList");
  emit("newConversation");
  emit("onNewConversation");
};
</script>

<template>
  <div class="chat-nav">
    <div class="flex items-center justify-between mb-[20px] pr-[20px]">
      <Button
        type="primary"
        ghost
        class="w-full flex items-center justify-center font-[Inter] text-[13px]"
        @click="newConversation"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        New conversation
      </Button>
    </div>
    <div class="h-full overflow-auto pb-[30px]">
      <div class="chat__nav--list" v-for="(item, index) in listData" :key="index">
        <div class="chat__nav--list--title">{{ item.name }}</div>
        <div
          class="chat__nav--list--group"
          v-for="(list, idx) in item.list"
          :class="{ active: list.id === session_id }"
          :key="idx"
        >
          <div
            class="chat__nav--list--group--item"
            @click="handleItem(list)"
            @mouseenter="hovered = true"
            @mouseleave="hovered = false"
            :class="{ active: list.session === session_id }"
          >
            <div class="item__text">
              <div class="item__text--p" v-if="list.isEdit" @mouseup.stop @click.stop>
                <Input
                  type="text"
                  :autofocus="list.isEdit"
                  :id="`inputRef${index}${idx}id`"
                  v-model:value="list.title"
                  @mousedown.stop
                  @blur="handleBlur(list)"
                  @keydown.enter.prevent="handleEnter(list)"
                />
              </div>
              <div
                class="item__text--p font-[Inter]"
                v-if="!list.isEdit"
                :title="list.title"
              >
                {{ list.title }}
              </div>
            </div>
            <div
              class="item__icon d-none d-lg-flex"
              @click.stop
              v-if="!list.isEdit && hovered"
            >
              <div
                class="item__icon--img item__icon--edit"
                @click="handleEdit(list, idx, index)"
                @mouseenter="hoverBtn = 'edit'"
                @mouseleave="hoverBtn = ''"
              >
                <NuxtIcon
                  name="edit-icon"
                  :class="
                    hoverBtn === 'edit'
                      ? 'text-[12px] c-[#2E2BD9]'
                      : 'text-[12px] c-[#999999]'
                  "
                />
              </div>
              <div
                class="item__icon--img item__icon--del"
                @click="handleDelete(list)"
                @mouseenter="hoverBtn = 'delete'"
                @mouseleave="hoverBtn = ''"
              >
                <NuxtIcon
                  name="delete"
                  :class="
                    hoverBtn === 'delete'
                      ? 'text-[14px] c-[#F63C47]'
                      : 'text-[14px] c-[#999999]'
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="chat__nav--noList flex items-center justify-center pt-3 font-[Inter]"
      v-if="!listData.length"
    >
      No conversation
    </div>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
