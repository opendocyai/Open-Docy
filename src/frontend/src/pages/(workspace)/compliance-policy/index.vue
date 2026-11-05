<script setup lang="ts">
import { useRouterStore } from "@/stores";
import { ref } from "vue";

import { PolicyCompliance, PolicyFiles } from '@/components'

const routerStore = useRouterStore();

routerStore.SET_BREADCRUMB([
	{
		name: "Compliance Policy",
		path: "/compliance-policy",
	}
]);

const tabs_list = ref<any>([
	{ key: "1", tab: "Compliance Policy" },
	{ key: "2", tab: "Policy Files" },
])
const activeKey = ref<any>('1');
</script>

<template>
	<div class="flex items-center gap-[10px] px-[30px] py-[15px] border-b border-b-[#EBEBEB]">
		<div class="c-[#999999] text-[14px] font-[Inter] fw-400 py-[10px] px-[30px] rounded-[10px] cursor-pointer"
			:class="{ 'c-[#333333] bg-[#F3F3F3]': activeKey == item.key }" v-for="item in tabs_list"
			@click="activeKey = item.key" :key="item.key">
			<span>{{ item.tab }}</span>
		</div>
	</div>

	<PolicyCompliance v-if="activeKey == 1" />
	<PolicyFiles v-if="activeKey == 2" />
</template>

<style src="./index.scss" scoped lang="scss"></style>
