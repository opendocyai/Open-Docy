<script setup lang="ts">
defineOptions({
  name: "BaseLayout",
});

import { BaseAside, BaseHeader } from '@/components';
import { Layout, LayoutSider, LayoutHeader, LayoutContent } from 'ant-design-vue';

import { useAsideStore } from '@/stores';

const asideStore = useAsideStore();
</script>

<template>
  <Layout>
    <layout-sider v-model:collapsed="asideStore.collapsed" :trigger="null" :width="asideStore.width"
      :collapsed-width="72" collapsible class="left-aside overflow-hidden"><base-aside /></layout-sider>
    <Layout>
      <layout-header><base-header /></layout-header>
      <layout-content>
        <div class="h-full flex flex-col overflow-hidden">
          <div class="flex-1 overflow-auto">
            <slot />
          </div>
          <div class="flex-none" id="main-footer"></div>
        </div>
      </layout-content>
    </Layout>
  </Layout>
</template>

<style src="./index.scss" lang="scss" scoped></style>
