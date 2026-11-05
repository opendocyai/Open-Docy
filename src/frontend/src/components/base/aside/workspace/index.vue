<script setup lang="ts">
import {useAsideStore} from "@/stores";
import {NuxtIcon} from "@/components";

defineOptions({
	name: 'BaseAsideWorkspace',
})

import {Menu, MenuItem} from 'ant-design-vue'

import {useMenuKeys} from "@/composables";

const asideStore = useAsideStore();
const { selectedKeys, onMenuClick } = useMenuKeys();
</script>

<template>
	<div>
		<div class="aside-title">
			<span class="aside-title-text"  v-if="!asideStore?.collapsed">{{ asideStore?.user_workspace_list?.name}}</span>
		</div>
		<Menu
			mode="inline"
			:inline-collapsed="asideStore.collapsed"
			:selected-keys="selectedKeys"
			@click="onMenuClick"
			class="marketplace-menu">
			<menu-item :key="menu.path" :item="menu" v-for="menu in asideStore?.user_workspace_list?.children">
				<template #icon>
					<NuxtIcon :name="menu.meta.icon" />
				</template>
				<span>{{menu.name}}</span>
			</menu-item>
		</Menu>
	</div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
