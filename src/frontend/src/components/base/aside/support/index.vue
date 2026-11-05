<script setup lang="ts">
defineOptions({
  name: "BaseAsideSupport",
});

import { useAsideStore } from "@/stores";
import { NuxtIcon } from "@/components";
import { Menu, MenuItem } from "ant-design-vue";
import { useMenuKeys } from "@/composables";

const asideStore = useAsideStore();
const { selectedKeys, onMenuClick } = useMenuKeys();
</script>

<template>
  <div>
    <div class="aside-title">
      <span class="aside-title-text" v-if="!asideStore?.collapsed">
        {{ asideStore?.support_list?.name }}
      </span>
    </div>
    <Menu
      mode="inline"
      :inline-collapsed="asideStore.collapsed"
      :selected-keys="selectedKeys"
      @click="onMenuClick"
      class="marketplace-menu"
    >
      <template v-for="menu in asideStore?.support_list?.children" :key="menu.path">
        <menu-item :key="menu.path" :item="menu" v-if="menu.meta.icon == 'audit-logs'">
          <template #icon>
            <NuxtIcon :name="menu.meta.icon" filled/>
          </template>
          <span>{{ menu.name }}</span>
        </menu-item>
      </template>
    </Menu>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
