<script setup lang="ts">
defineOptions({
  name: "BaseHeader",
});

import { ref, computed, onMounted } from "vue";

import { useRoute } from "vue-router";

import { Button, Badge, Dropdown, List, ListItem, Avatar } from "ant-design-vue";

import { UserOutlined } from "@ant-design/icons-vue";

import { NuxtIcon, Breadcrumbs, BaseHeaderRegister, Account } from "@/components";

import { useAsideStore, useCommonStore, useMainStore } from "@/stores";

import { useHttp } from "@/client";

import { useApiAuth } from "@/api";

import to from "await-to-js";

const props = defineProps({
  hideBreadcrumb: {
    type: Boolean,
    default: false,
  },
  showTitle: {
    type: Boolean,
    default: false,
  },
});
const route = useRoute();

const { request } = useHttp();

const asideStore = useAsideStore();
const commonStore: any = useCommonStore();

const drawer = ref(false);
const accountModal = ref(false);

const mainStore = useMainStore();
const userInfo: any = computed(() => mainStore.userInfo);

const handleCollapsed = () => {
  asideStore.SET_IS_OPEN(!asideStore.collapsed);
};

const handleAccount = () => {
  accountModal.value = true;
};
const handleAcademy = () => {
  const url = "https://docyai.com/academy/";
  window.open(url, "_blank", "noopener,noreferrer");
};
const handleCommunity = () => {
  const url = "https://discord.com/invite/j2f4uEMF";
  window.open(url, "_blank", "noopener,noreferrer");
};
const handleSupport = () => {
  const url = "https://docyai.com/contact";
  window.open(url, "_blank", "noopener,noreferrer");
};

const handleLogOut = async () => {
  await to<any>(
    request(useApiAuth("logout"), {
      headers: { "Ref-Token": `Bearer ${mainStore.refresh}` },
    })
  );

  mainStore.SET_SIGN_OUT();
  window.location.href = "/login";
};

const getUserInfo = () => mainStore.GET_USER_INFO();

onMounted(() => {
  console.log(mainStore, "mainStore-----mainStore");
  if (mainStore.token && mainStore.isLogin) {
    getUserInfo();
  }
});
</script>

<template>
  <div class="base-header">
    <div class="flex items-center gap-x-[15px]">
      <div class="flex-none" v-if="!hideBreadcrumb">
        <NuxtIcon
          :name="asideStore.collapsed ? 'menu-fold' : 'menu-unfold'"
          class="text-[14px] trigger"
          @click="handleCollapsed"
        />
      </div>
      <Breadcrumbs v-if="!hideBreadcrumb" />
      <div class="base-header--title" v-if="showTitle">
        {{ route.meta?.title }}
      </div>
    </div>
    <div class="flex items-center gap-x-[24px]">
      <div class="ml-auto flex items-center gap-x-[24px]">
        <Button @click="drawer = !drawer" type="link" class="p-0 flex items-center">
          <NuxtIcon
            v-if="commonStore.notificationCount == 0"
            name="news"
            class="text-[16px] c-[#212121]"
          />
          <Badge dot v-else>
            <NuxtIcon name="news" class="text-[16px] c-[#212121]" />
          </Badge>
        </Button>
      </div>
      <div class="flex-none">
        <Dropdown :trigger="['click']">
          <div class="ant-dropdown-link" @click.prevent>
            <Avatar :src="userInfo?.avatar" :size="36" v-if="userInfo?.avatar">
              <template #icon>
                <UserOutlined />
              </template>
            </Avatar>
            <Avatar :style="{ 'background-color': userInfo?.default_color }" v-else>
              {{ userInfo?.display?.substring(0, 1).toUpperCase() }}
            </Avatar>
          </div>
          <template #overlay>
            <div class="ant-overlay" @click.stop>
              <div
                class="flex flex-col items-center gap-x-[15px] pb-[10px] pt-[10px] font-[Inter]"
              >
                <Avatar :src="userInfo?.avatar" :size="48" v-if="userInfo?.avatar">
                  <template #icon>
                    <UserOutlined />
                  </template>
                </Avatar>
                <Avatar
                  :size="48"
                  :style="{ 'background-color': userInfo?.default_color }"
                  v-else
                >
                  {{ userInfo?.display?.substring(0, 1).toUpperCase() }}
                </Avatar>
                <div
                  class="c-black fw-500 text-[14px] pb-[8px] pt-[10px] w-full text-align-center overflow-hidden whitespace-nowrap text-ellipsis"
                  :title="userInfo?.display"
                >
                  {{ userInfo?.display }}
                </div>
                <div
                  class="c-[#999999] fw-400 text-[12px] w-full text-align-center overflow-hidden whitespace-nowrap text-ellipsis"
                  :title="userInfo?.email"
                >
                  {{ userInfo?.email }}
                </div>
              </div>

              <List>
                <list-item @click="handleAccount" class="personal-item">
                  <div class="item-icon-wrap fill-revert-layer">
                    <NuxtIcon name="account" class="item-icon c-black" />
                    <span class="text">Account</span>
                  </div>
                </list-item>
                <list-item @click="handleAcademy" class="personal-item">
                  <div class="item-icon-wrap fill-revert-layer">
                    <NuxtIcon name="academy" class="item-icon" filled />
                    <span class="text">Academy</span>
                  </div>
                </list-item>
                <list-item @click="handleCommunity" class="personal-item">
                  <div class="item-icon-wrap fill-revert-layer">
                    <NuxtIcon name="community" class="item-icon" filled />
                    <span class="text">Community</span>
                  </div>
                </list-item>
                <list-item @click="handleSupport" class="personal-item">
                  <div class="item-icon-wrap fill-revert-layer">
                    <NuxtIcon name="support" class="item-icon" filled />
                    <span class="text">Support</span>
                  </div>
                </list-item>
                <list-item @click="handleLogOut" class="personal-item">
                  <div class="item-icon-wrap fill-revert-layer">
                    <NuxtIcon name="log-out" class="item-icon" filled />
                    <span class="text">Log out</span>
                  </div>
                </list-item>
              </List>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>

  <base-header-register v-model:drawer="drawer" />
  <account v-model:accountModal="accountModal" v-if="accountModal" />
</template>

<style src="./index.scss" scoped lang="scss"></style>
