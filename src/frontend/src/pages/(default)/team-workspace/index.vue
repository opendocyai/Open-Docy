<script setup lang="ts">
import { MemberManagement, TeamInformation, RolesPermissions } from './components'

definePage({
  meta: {
    name: "teamWorkspace",
    layout: "custom",
    auth: true,
  }
});

import { Layout, LayoutHeader, LayoutSider, LayoutContent, Menu, MenuItem } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'

import { BaseHeader, NuxtIcon } from '@/components'
import { ref, onMounted } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import { useApiSpace } from '@/api'

import { useHttp } from '@/client'

import to from 'await-to-js'

const { request } = useHttp()

const router = useRouter();
const route = useRoute();

const selectedKey = ref<any>("");

const hideBreadcrumb = ref(true);

const isTeamOwner = ref<any>(false);
const isTeamInformation = ref<any>();

const menuItems = [
  {
    key: "teamInformation",
    label: "Team information",
  },
  {
    key: "memberManagement",
    label: "Member management",
  },
  {
    key: "rolesPermissions",
    label: "Roles & Permissions",
  },
];

function handleClick(key: any) {
  router.push({
    query: {
      ...route.query,
      activatedTab: key,
    },
  }).then(() => {
    selectedKey.value = key;
  });
}

function backPage() {
  router.push(`/dashboard`);
}


async function getSpaceDetail() {
  const space_id = route.query.space_id;
  const dataApi = useApiSpace("get_space_detail")(space_id);

  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi)
  );
  if (error) return;
  if (res?.code == 200) {
    isTeamOwner.value = res.data.role_type === "owner";
    isTeamInformation.value = res.data;
  }
}

getSpaceDetail();
onMounted(() => {
  handleClick(route.query.activatedTab);
});
</script>

<template>
  <div class="w-full h-full flex justify-center create-team-space">
    <Layout class="team-layout">
      <LayoutSider width="298" class="team-layout-sider">
        <div class="back-btn" @click="backPage">
          <LeftOutlined style="margin-right: 8px; font-size: 12px" />Back
        </div>
        <div class="tabs">
          <div class="title">Team workspace</div>
          <Menu mode="inline" class="side-menu">
            <MenuItem v-for="item in menuItems" :key="item.key" @click="handleClick(item.key)">
              <div :class="['menu-text', selectedKey === item.key ? 'active' : '']">
                <div v-if="item.key === 'teamInformation'" class="display-icon-item">
                  <NuxtIcon name="team-info" class="display-icon"
                    :class="selectedKey === item.key ? 'c-[#2E2BD9]' : 'c-[#555555]'" />
                  <span class="label">{{ item.label }}</span>
                </div>
                <div v-if="item.key === 'memberManagement'" class="display-icon-item">
                  <NuxtIcon name="mamber-management" class="display-icon"
                    :class="selectedKey === item.key ? 'c-[#2E2BD9]' : 'c-[#555555]'" /> <span class="label">{{
                      item.label
                    }}</span>
                </div>
                <div v-if="item.key === 'rolesPermissions' && isTeamOwner" class="display-icon-item">
                  <NuxtIcon name="rolesPermissions" class="display-icon"
                    :class="selectedKey === item.key ? 'c-[#2E2BD9]' : 'c-[#555555]'" /> <span class="label">{{
                      item.label
                    }}</span>
                </div>

              </div>
            </MenuItem>
          </Menu>
        </div>
      </LayoutSider>
      <Layout>
        <LayoutHeader class="team-layout-header">
          <base-header :hideBreadcrumb="hideBreadcrumb"></base-header>
        </LayoutHeader>
        <LayoutContent class="team-layout-content">
          <TeamInformation v-if="selectedKey === 'teamInformation'" :isTeamOwner="isTeamOwner"
            :teamInfomation="isTeamInformation" @getSpaceDetail="getSpaceDetail" />
          <MemberManagement v-else-if="selectedKey === 'memberManagement'" :isTeamOwner="isTeamOwner" />
          <RolesPermissions v-else-if="selectedKey === 'rolesPermissions'" />
        </LayoutContent>
      </Layout>
    </Layout>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
