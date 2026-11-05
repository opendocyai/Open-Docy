<script setup lang="ts">
defineOptions({
	name: 'BaseAsideMarketplace',
})

import {useAsideStore} from "@/stores";
import {NuxtIcon} from "@/components";

import {Menu, MenuItem} from 'ant-design-vue'

import {useMenuKeys} from "@/composables";

const asideStore = useAsideStore();
const {selectedKeys, onMenuClick} = useMenuKeys();
</script>

<template>
	<div>
		<div class="aside-title">
			<span class="aside-title-text" v-show="!asideStore.collapsed">{{ asideStore.marketplace_list.name }}</span>
			<span class="collapsed-line" style="" v-show="asideStore.collapsed"></span>
		</div>
		<Menu
			mode="inline"
			:inline-collapsed="asideStore.collapsed"
			:selected-keys="selectedKeys"
			@click="onMenuClick"
			class="marketplace-menu">
			<menu-item :key="menu.path" :item="menu" v-for="menu in asideStore.marketplace_list?.children">
				<template #icon>
					<NuxtIcon :name="menu.meta.icon"/>
				</template>
				<span>{{ menu.name }}222</span>
			</menu-item>
		</Menu>
	</div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
