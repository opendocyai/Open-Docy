<script setup lang="ts">
defineOptions({
  name: 'Breadcrumbs',
})

import {Breadcrumb, BreadcrumbItem} from 'ant-design-vue'

import {useRouterStore} from '@/stores';

const routerStore = useRouterStore();
</script>

<template>
	<Breadcrumb separator=">">
		<BreadcrumbItem
			v-for="(item, index) in routerStore.breadcrumb"
			:key="index"
		>
			<router-link
				v-if="item.path && item.isClickable"
				:to="item.path"
				class="font-[Inter] c-[#19191A]!"
			>
				{{ item.name }}
			</router-link>
			<span v-else class="font-[Inter] c-[#19191A]!">{{ item.name }}</span>
		</BreadcrumbItem>
	</Breadcrumb>
</template>

<style scoped>
</style>
