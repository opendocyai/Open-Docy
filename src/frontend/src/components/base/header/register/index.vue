<script setup lang="ts">
defineOptions({
	name: 'BaseHeaderRegister',
})

import {ref, watch} from 'vue'

import {LoadingOutlined} from '@ant-design/icons-vue'

import {debounce, throttle} from 'lodash'

import {useApiInnerMessage} from "@/api";

import {useMainStore, useSpaceStore, useCommonStore} from "@/stores";

import {formatDateTime} from '@/utils'

import {useHttp} from "@/client";

import to from "await-to-js";

import {Drawer, Button} from "ant-design-vue";

import {NuxtIcon, BaseScroll} from '@/components'

import {type DialogExpose, useDialog} from '@/composables'

const spaceStore: any = useSpaceStore();
const mainStore = useMainStore();

const userInfo: any = mainStore.userInfo;
const commonStore: any = useCommonStore();

const http = useHttp();


const sortOrder = ref("descend");
const scrollRef = ref<any>(null);

const drawer = defineModel<boolean>("drawer", {required: false});
const messageList = ref<any>([]);
const isLoadingFirst = ref(false);

const loading = ref(false);
const finished = ref(false);

const onClose = () => {
	console.log("drawer closed");
};
const queryPage = ref<any>({
	pageNumber: 1,
	pageSize: 100,
	totalCount: 0,
});
const getList = async (append = false) => {
	if (loading.value) return;
	if (!append) {
		isLoadingFirst.value = true;
	}
	loading.value = true;
	const orderType = "created_at";
	const sortType = sortOrder.value === "ascend" ? "asc" : "desc";
	const [err, res] = await to<{ data: any; code: number }>(http.request(
		useApiInnerMessage("get_inner_message_list"),
		{
			data: {
				pageNumber: queryPage.value.pageNumber,
				pageSize: queryPage.value.pageSize,
				space_id: spaceStore.spaceInfoCurrent?.id,
				orderBy: `${orderType}.${sortType}`,
			},
		}
	));
	isLoadingFirst.value = false;
	loading.value = false;
	if (err) return;
	if (res?.code === 200) {
		const results = res?.data.results || [];

		if (results.length < queryPage.value.pageSize) {
			finished.value = true;
		}

		messageList.value = append ? [...messageList.value, ...results] : results;
		const result = res?.data?.results.filter((item: { status: string }) => {
			return item.status == "unread";
		});
		commonStore.SET_NOTIFICATION_COUNT(result.length);
	}
};

const onReadAll = debounce(async () => {
	const [err, res] = await to<{ data: any; code: number }>(http.request(
		useApiInnerMessage("set_message_all_read"),
		{
			data: {
				space_id: spaceStore.spaceInfoCurrent?.id,
				user_id: userInfo.id,
			},
		}
	));
	if (err) return;
	if (res?.code == 200) {
		queryPage.value.pageNumber = 1;
		finished.value = false;
		const {scroll} = scrollRef.value
		scroll.scrollTo(0, 0)
		await getList(false);
	}
}, 500);

const toggleSort = debounce(() => {
	sortOrder.value = sortOrder.value === "ascend" ? "descend" : "ascend";
	queryPage.value.pageNumber = 1;
	finished.value = false;
	const {scroll} = scrollRef.value
	scroll.scrollTo(0, 0)
	getList(false);
}, 500);

const updateStatus = async (id: any) => {
	const action = "read";
	const dataApi = useApiInnerMessage("update_message_status")(id);
	const [err, res] = await to<{ data: any; code: number }>(http.request(
		dataApi,
		{
			params: {
				message_id: id,
				action: action,
			},
		}
	));
	if (err) return;
	if (res?.code == 200) {
		queryPage.value.pageNumber = 1;
		const {scroll} = scrollRef.value
		scroll.scrollTo(0, 0)
		finished.value = false;
		await getList(false);
	}
};

const onViewMessage = (item: any) => {
	if (item.status !== 'read') {
		updateStatus(item.id);
	}
	myDialog.setTitle("Notification");
	myDialog.open({data: item});
};
const myDialog: DialogExpose = useDialog({
	width: 510,
	isCancel: false,
	maskClosable: true,
	centered: true,
	keyboard: false,
	isConfirm: false,
	onCancel: () => {
		queryPage.value.pageNumber = 1;
		finished.value = false;
		const {scroll} = scrollRef.value
		scroll.scrollTo(0, 0)
		getList(false);
	},
});

watch(
	() => drawer.value,
	(newVal: any) => {
		if (newVal) {
			queryPage.value.pageNumber = 1;
			finished.value = false;
			if (scrollRef.value) {
				const {scroll} = scrollRef.value
				scroll.scrollTo(0, 0)
			}
			messageList.value = [];
			getList(false);
		}
	}
);

const onScroll = throttle((e: { x: number; y: number }) => {
	const {rootRef: el} = scrollRef.value
	if (loading.value || finished.value) return;
	if (-e.y + el.clientHeight >= el.scrollHeight - 50) {
		queryPage.value.pageNumber++;
		getList(true);
	}
}, 200);
</script>

<template>
  <div class="header-register">
    <Drawer
      :width="422"
      v-model:open="drawer"
      @close="onClose"
      :bodyStyle="{ padding: '0 10px 0px 30px' }"
    >
      <template #title>
        <div class="flex items-center justify-between pr-[20px]">
          <h4 class="flex items-center gap-[10px]">
            Notification
            <Button
              type="link"
              class="px-0 pt-[5px] mb-[2px]"
              :disabled="messageList.length == 0"
              @click="toggleSort"
            >
              <NuxtIcon
                v-if="sortOrder === 'descend'"
                name="descend"
                class="c-[#999999] text-[22px] hover:c-[#666666]"
              />
              <NuxtIcon
                v-else
                name="ascend"
                class="c-[#999999] text-[22px] mb-[2px] hover:c-[#666666]"
              />
            </Button>
          </h4>
          <Button
            type="link"
            class="px-0 pt-[6px]"
            :disabled="messageList.length == 0"
            :title="'Mark all as read'"
            @click="onReadAll"
          >
            <NuxtIcon
              name="clean-all"
              class="c-[#CCCCCC] text-[16px] hover:c-[#999999]"
            />
          </Button>
        </div>
      </template>
      <div class="h-8/10 flex justify-center items-center" v-if="isLoadingFirst">
        <LoadingOutlined spin class="text-[20px] c-[#2E2BD9]" />
      </div>
      <base-scroll v-else ref="scrollRef" scrollbar :probeType="3" @scroll="onScroll">
        <div>
          <div class="pr-[20px]" v-if="messageList.length > 0">
            <div
              class="py-3 border-b border-[#E5E5E5]"
              v-for="(item, index) in messageList"
              @click="onViewMessage(item)"
              :key="index"
            >
              <div class="flex-col flex-1 overflow-hidden px-0 cursor-pointer">
                <div
                  class="flex items-center justify-between gap-x-[5px] overflow-hidden"
                >
                  <div class="flex-1 overflow-hidden">
                    <div class="c-[#847E7B] text-[12px] font-[Inter] fw-400">
                      <span
                        v-if="item.status == 'unread'"
                        class="bg-[#FF4D4D] w-[7px] h-[7px] rounded-full inline-block mr-1"
                      />
                      {{ item.model }}
                    </div>
                  </div>
                  <div class="flex-none">
                    <div class="c-[#847E7B] text-[12px] font-[Inter] fw-400">
                      {{ formatDateTime(item.created_at, false) }}
                    </div>
                  </div>
                </div>
                <div class="c-[#000000] text-[14px] font-[Inter] fw-500 lh-[36px]">
                  {{ item.title }}
                </div>
              </div>
            </div>
            <div class="text-center p-[6px] py-[10px]">
              <LoadingOutlined v-if="loading" spin class="text-[16px] c-[#2E2BD9]" />
              <span v-else class="c-[#CCCCCC] text-[12px] font-[Inter]"> No more </span>
            </div>
          </div>
          <div
            v-else
            class="px-[15px] py-[40px] text-center fw-400 font-[Inter] text-[12px] c-[#BABABA]"
          >
            <span v-if="!isLoadingFirst"> No unread messages for now. </span>
          </div>
        </div>
      </base-scroll>
    </Drawer>
  </div>

  <component :is="myDialog.Dialog">
    <template #default="{ data }">
      <div class="text-[20px] font-[Inter] c-[#000000] fw-600 text-center">
        {{ data.title }}
      </div>
      <div class="text-[12px] font-[Inter] c-[#BABABA] fw-400 text-center lh-[24px]">
        {{ formatDateTime(data.created_at) }}
      </div>
      <div
        class="box-content text-[14px] font-[Inter] c-[#000000] fw-400 lh-[24px] mt-[20px]"
        v-html="data.content"
      />
    </template>
  </component>
</template>

<style src="./index.scss" lang="scss"></style>
