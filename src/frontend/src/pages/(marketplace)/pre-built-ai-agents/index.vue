<script setup lang="ts">
import { useApiAgent, useApiCommon, useApiSetting } from "@/api";
import { useCommonStore, useMainStore, useRouterStore } from "@/stores";
import { debounce } from "lodash";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { BaseCard, NuxtIcon, AgentCardTemplate } from '@/components'
import { Menu, MenuDivider, MenuItem, Avatar, Button, Input, Tooltip, Dropdown } from 'ant-design-vue'
import {
	UserOutlined,
	SearchOutlined,
	LoadingOutlined
} from '@ant-design/icons-vue'
import { useHttp } from "@/client";
import to from "await-to-js";

const routerStore = useRouterStore();

routerStore.SET_BREADCRUMB([
	{
		name: "Pre-Built AI Agents",
		path: "/pre-built-ai-agents",
		isClickable: false,
	}
]);


const { request } = useHttp();
const commonStore: any = useCommonStore();
const mainStore = useMainStore();

const userInfo: any = computed(() => mainStore.userInfo);
const activeKey = ref("");
const queryName = ref("");
const dataList = ref<any>([]);
const tabLists = ref<any>([]);
const pageSize = ref(200);
const pageNumber = ref(1);
const allCount = ref<number>(0);
const isLoadingMore = ref(false);
const isLoadingFirst = ref(false);
const changeTab = debounce((key: any) => {
	activeKey.value = key;
	pageSize.value = 200;
	pageNumber.value = 1;
	getAgentList();
}, 500);
const selectedStyle = {
	backgroundColor: "#F2F1FF",
	color: "#2E2BD9",
	borderColor: "#2E2BD9",
	fontSize: "12px",
	fontFamily: "Inter",
	height: "35px",
};

const defaultStyle = {
	borderColor: "#DCDBDD",
	color: "#303330",
	fontSize: "12px",
	fontFamily: "Inter",
	height: "35px",
};
const getMarketplaceClass = async (isLoadMore = false) => {
	const [error, res] = await to<any>(
		request(useApiCommon("get_marketplace_class"))
	);
	if (error) return;
	tabLists.value = [["All Templates", ""], ...res];
};

const getAgentList = async (isLoadMore = false) => {
	isLoadingMore.value = true;
	if (!isLoadMore) {
		isLoadingFirst.value = true;
	}
	const [error, res] = await to<{ data: any; code: number }>(
		request(useApiAgent("get_marketplace_list"),
			{
				data: {
					category: activeKey.value,
					name: queryName.value,
					pageNumber: pageNumber.value,
					pageSize: pageSize.value,
				},
			})
	);
	isLoadingMore.value = false;
	isLoadingFirst.value = false;
	if (error) return;
	if (res?.code == 200) {
		if (isLoadMore) {
			dataList.value = [...dataList.value, ...res.data.results];
			await nextTick();
			scrollToBottom();
		} else {
			dataList.value = res.data.results;
		}
		allCount.value = res.data.count;
	}
};

const loadMore = () => {
	if (isLoadingMore.value) return;
	pageNumber.value += 1;
	getAgentList(true);
};

const containerRef = ref<HTMLElement | null>(null);
const scrollToBottom = () => {
	if (containerRef.value) {
		containerRef.value.scrollTo({
			top: containerRef.value.scrollHeight,
			behavior: "smooth",
		});
	}
};

const toMarketplace = () => {
	window.open("/template-marketplace", "_blank", "noopener,noreferrer");
};

const onSearch = debounce(() => {
	allCount.value = 0;
	pageNumber.value = 1;
	dataList.value = [];
	getAgentList();
}, 500);

const profileData = ref<any>();
const getUserProfile = async () => {
	const [error, res] = await to<{ data: any; code: number }>(
		request(useApiSetting("user_profile"),
			{
				params: {
					user_id: userInfo.value?.id,
				},
			})
	);

	if (error) return;
	if (res?.code == 200) {
		console.log(res.data, "data");
		profileData.value = res.data;
	}
};


const tabContainer = ref<HTMLElement | null>(null);
const showLeft = ref(false);
const showRight = ref(false);

const checkOverflow = () => {
	const el = tabContainer.value;
	if (!el) return;

	showLeft.value = el.scrollLeft > 0;
	showRight.value =
		el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
};

const scrollLeft = () => {
	tabContainer.value?.scrollBy({
		left: -100,
		behavior: "smooth",
	});
};

const scrollRight = () => {
	tabContainer.value?.scrollBy({
		left: 100,
		behavior: "smooth",
	});
};
let resizeObserver: ResizeObserver | null = null;
const checkTabs = (async () => {
	await nextTick();

	checkOverflow();

	const el = tabContainer.value;
	if (!el) return;

	el.addEventListener("scroll", checkOverflow);

	resizeObserver = new ResizeObserver(() => {
		checkOverflow();
	});

	resizeObserver.observe(el);
});

onBeforeUnmount(() => {
	tabContainer.value?.removeEventListener("scroll", checkOverflow);
	window.removeEventListener("resize", checkOverflow);
});

watch(queryName, (newVal: any) => {
	if (!newVal) {
		getAgentList();
	}
});

onMounted(async () => {
	commonStore.SET_CURRENT_SELECTED_AGENT({});
	getMarketplaceClass();
	getAgentList();
	getUserProfile();

	await nextTick();
	checkTabs()
});
</script>

<template>
	<base-card>
		<div class="flex justify-between items-start gap-[20px]" v-if="true">
			<div class="flex flex-col gap-[14px] font-[Inter] mt-[20px]">
				<span class="text-[16px] c-[#000000]">Discover templates</span>
				<span class="text-[11px] c-[#999999]">Browse resources from creators around the world—a great place for
					inspiration and shortcuts to boost your workflow</span>
			</div>
			<div class="flex gap-[12px] c-[#2C2C2C] text-[14px] font-[Inter] fill-revert-layer mt-[10px]" v-if="false">
				<Dropdown :trigger="['click']">
					<Button type="text" size="small" class="flex items-center gap-[6px] font-[Inter]">
						<NuxtIcon name="profile" class="text-[18px]" /> My Profile
					</Button>
					<template #overlay>
						<Menu style="padding: 10px 8px">
							<div class="flex items-center gap-[12px] font-[Inter] px-[12px]">
								<Avatar v-if="profileData?.avatar" :src="profileData?.avatar" :size="26">
									<template #icon>
										<UserOutlined />
									</template>
								</Avatar>
								<Avatar v-else :size="26" :style="{ 'background-color': profileData?.default_color }">
									{{ profileData?.display?.substring(0, 1).toUpperCase() }}
								</Avatar>
								<div class="flex flex-col">
									<span class="text-[13px] c-[#000000]">
										{{ profileData?.display }}
									</span>
									<span class="text-[12px] c-[#C0C0C0]">
										{{ profileData?.email }}
									</span>
								</div>
							</div>
							<menu-divider style="margin: 8px 8px" />
							<menu-item key="1" @click="toMarketplace">
								<div class="flex items-center gap-[6px] font-[Inter]" v-if="profileData.profile">
									<NuxtIcon name="personal-profile" class="text-[18px] c-[#A7A7A7]" />
									<span class="c-[#4B525B] text-[14px] flex">
										Marketplace personal profile
									</span>
								</div>
								<div class="flex items-center gap-[6px] font-[Inter]" v-else>
									<NuxtIcon name="personal-profile" class="text-[18px] c-[#A7A7A7]" />
									<span class="c-[#4B525B] text-[14px] flex">
										Become a creator
									</span>
								</div>
							</menu-item>
						</Menu>
					</template>
				</Dropdown>

			</div>
		</div>
		<div class="flex gap-[12px] justify-between flex-wrap my-[26px]">
			<div class="tabs-wrapper flex items-center flex-1 min-w-0">
				<div v-show="showLeft" class="nav-btn fill-revert-layer pr-[10px]" @click="scrollLeft">
					<NuxtIcon name="tab-left" class="text-[20px]"></NuxtIcon>
				</div>
				<div class="tabs-mask-wrapper" :class="{
					'mask-left': showLeft,
					'mask-right': showRight
				}">
					<div ref="tabContainer" class="flex gap-[12px] tabs-container">
						<Button v-for="item in tabLists" :key="item[1]"
							:type="activeKey === item[1] ? 'primary' : 'default'" :ghost="activeKey !== item[1]"
							:style="activeKey === item[1] ? selectedStyle : defaultStyle"
							class="flex items-center gap-[6px] whitespace-nowrap" @click="changeTab(item[1])">
							<span>{{ item[0] }}</span>
						</Button>
					</div>
				</div>

				<div v-show="showRight" class="nav-btn fill-revert-layer pl-[10px]" @click="scrollRight">
					<NuxtIcon name="tab-right" class="text-[20px]"></NuxtIcon>
				</div>
			</div>
			<div class="w-[300px]">
				<Input v-model:value="queryName" placeholder="Search Agent" allow-clear
					style="height: 36px; font-size: 12px; min-width: 300px">
					<template #suffix>
						<Tooltip title="Click to search">
							<SearchOutlined style="color: #cccccc; font-size: 16px;" @click="onSearch" />
						</Tooltip>
					</template>
				</Input>
			</div>
		</div>

		<div class="flex justify-center items-center" style="height: 200px" v-if="isLoadingFirst">
			<LoadingOutlined spin class="text-[20px] c-[#2E2BD9]" />
		</div>

		<div v-else ref="containerRef" style="
          padding-bottom: 20px;
          padding-right: 6px;
        ">
			<AgentCardTemplate :dataList="dataList" :canSelect="false" />
			<div class="w-[100%] h-[20px] mt-[20px] pr-[30px] flex justify-center items-center"
				v-if="dataList?.length < allCount && !isLoadingMore">
				<Button type="link" class="more-btn flex justify-center items-center" style="color: #2e2bd9"
					:disabled="isLoadingMore" @click="loadMore">
					Load More
					<LoadingOutlined spin class="text-[12px]" v-if="isLoadingMore" />
					<NuxtIcon name="load_down" class="c-[#2E2BD9] text-[14px] pl-[6px]" v-else />
				</Button>
			</div>
		</div>
	</base-card>
</template>

<style src="./index.scss" scoped lang="scss"></style>
