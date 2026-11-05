<script setup lang="ts">
import { Input, Tooltip, Button, Pagination, message } from 'ant-design-vue'

import { SearchOutlined } from '@ant-design/icons-vue'

import { useRouter } from 'vue-router';

import { BaseCard, NuxtIcon } from '@/components'

import { AgentCard, AgentTable } from './components'

import { useIndexedDB, type DialogExpose, useDialog, useConfirmModal } from '@/composables'

import { hasRolePerm } from '@/utils'

import { ref, watchEffect } from 'vue'

import { useRouterStore, useSpaceStore } from "@/stores";

import { useHttp } from "@/client";

import { useApiAgent } from '@/api'

import { CODE_OK } from '@/shared'

import to from 'await-to-js'

import { debounce } from 'lodash';


const routerStore = useRouterStore();

const { showConfirm } = useConfirmModal();


routerStore.SET_BREADCRUMB([
	{
		name: "Agent",
		path: "/agent",
	}
]);

const { request } = useHttp();

const spaceStore: any = useSpaceStore();

const router = useRouter()

const { add, getAll } = useIndexedDB()



const displayType = ref<any>("table");
const queryName = ref<any>();
const deleteLoading = ref(false);
const tableLoading = ref(false);
const agentData = ref<any>(null);

const total = ref(0);
const sortOrder = ref("descend");
const pageSize = ref(20);
const pageNumber = ref(1);

const mySelectedKeys = ref([]);


const promptDialog: DialogExpose = useDialog({
	width: 400,
	centered: true,
	closable: false,
	maskClosable: false,
});

const lockedDialog: DialogExpose = useDialog({
	width: 400,
	centered: true,
	closable: false,
	maskClosable: false,
});

const unfreezeDialog: DialogExpose = useDialog({
	width: 420,
	centered: true,
	closable: false,
	maskClosable: false,
	okText: 'Unfreeze',
	ok: async ({ data }: any, okLoadingState: (state: boolean) => void) => {
		console.log(data, 'data')
		okLoadingState(true)
		const [error, res] = await set_agent_id_restore<{ data: any; code: number }>(data.id)
		okLoadingState(false)
		unfreezeDialog.close()
		if (error) return
		if (res?.code == 200) {
			message.success(res?.data.message);
			await getList();
		}
		if (res?.code == 100003) {
			notUnfreezeDialog.open({ formType: 'notUnfreeze', data: res?.data })
		}
	}
})

const notUnfreezeDialog: DialogExpose = useDialog({
	width: 420,
	centered: true,
	closable: false,
	maskClosable: false,
	okText: 'Upgrade Now',
	ok: () => {
		notUnfreezeDialog.close()
	}
})

const set_agent_id_restore = <T>(id: any) => {
	const dataApi = useApiAgent('set_agent_id_restore')(id)
	return to<T>(request(dataApi))
}

async function getList() {
	tableLoading.value = true;
	const orderType = "update_at";
	const sortType = sortOrder.value === "ascend" ? "asc" : "desc";
	const [error, res] = await to<{ data: any; code: number }>(
		request(useApiAgent("get_agent_list"),
			{
				data: {
					space_id: spaceStore.spaceInfoCurrent?.id,
					agent_name: queryName.value,
					orderBy: `${orderType}.${sortType}`,
					pageNumber: pageNumber.value,
					pageSize: pageSize.value,
				},
			})
	);
	tableLoading.value = false;
	if (error) return;
	if (res?.code == CODE_OK) {
		agentData.value = res.data.results;
		total.value = res.data.count;
	}
}

getList()

const onSearch = debounce(() => {
	if (queryName.value) {
		getList();
	}
})

const toggleSort = debounce(() => {
	sortOrder.value = sortOrder.value === "ascend" ? "descend" : "ascend";
	getList();
}, 500)

function onToggle(type: "table" | "card") {
	displayType.value = type === "table" ? "table" : "card";
	add('agent', {
		id: 1,
		display_type: displayType.value,
	})
}

function deleteMultiple() {
	if (!mySelectedKeys.value.length) {
		message.warning("Please select at least one item");
		return;
	}
	showConfirm({
		title: "Confirm Agent Deletion",
		content: "Are you sure you want to delete this agent?",
		onOk: async () => {
			deleteLoading.value = true;
			const selectedIds = mySelectedKeys.value?.join();
			const [error, res] = await to<{
				data: any;
				code: number;
			}>(request(useApiAgent("delete_agent_multiple"), {
				data: {
					agent_ids: selectedIds,
				},
			}));
			deleteLoading.value = false;
			if (error) return;
			if (res?.code == 200) {
				if (res?.data.agent_locked.length > 0) {
					const options = {
						title:
							"This Agent has associated unfinished tasks and cannot be deleted.",
						agent_list: res?.data.agent_locked,
					};
					promptDialog.setTitle("");
					promptDialog.open(options);
				} else {
					mySelectedKeys.value = [];
					message.success(`Deleted successfully`);
					pageChange(1, 20);
					getList();
				}
			}
		},
		onCancel: () => {
			console.log("cancel");
		},
	});
}

function onCreate() {
	router.push("/agent/create-agent");
}

function selectedKeysChange(_selectedKeys: any) {
	mySelectedKeys.value = _selectedKeys;
}


function deleteSingle(record: any) {
	showConfirm({
		title: "Confirm Agent Deletion",
		content: "Are you sure you want to delete this agent?",
		onOk: async () => {
			const dataApi = useApiAgent("delete_agent")(record.id);
			const [error, res] = await to<{ data: any; code: number }>(
				request(dataApi)
			);
			if (error) return;
			if (res?.code == 200) {
				if (res?.data.agent_locked.length > 0) {
					const options = {
						title:
							"This Agent has associated unfinished tasks and cannot be deleted.",
						agent_list: res?.data.agent_locked,
					};
					promptDialog.setTitle("");
					promptDialog.open(options);
				} else {
					message.success(`Deleted successfully`);
					pageChange(1, 20);
					getList();
				}
			}
		},
		onCancel: () => {
			console.log("cancel");
		},
	});
}

function pageChange(_pageNumber: any, _pageSize: any) {
	pageNumber.value = _pageNumber;
	pageSize.value = _pageSize;
	getList();
}

async function editAgent(record: any) {
	const params = {
		agent: {
			name: record.name,
			description: record.description,
			space_id: record.space_id,
			agent_id: record.id,
			template_json: record.template_json,
		},
		save_as_draft: record.status == 'draft'
	};
	const [err, res] = await to<{ data: any; code: number }>(
		request(useApiAgent("pre_update_agent"), { data: params })
	);
	if (err) return;
	if (res?.code == 200) {
		router.push(`/audit?code=${res?.data?.code}`);
	} else if (res?.code == 200000) {
		lockedDialog.open({ formType: 'locked', data: res?.data })
	}
}

watchEffect(async () => {
	const data: any = await getAll('agent');
	console.log(data, 'data indexedDB')
	if (data?.length) {
		const { display_type } = data.at(-1);
		displayType.value = display_type || 'table';
	}
	await getList()
})


function goItPrompt() {
  mySelectedKeys.value = [];
  promptDialog.close();
  getList();
}
</script>

<template>
  <base-card>
    <template #header>
      <div class="top-wrap">
        <div class="top-left">
          <Input
            v-model:value="queryName"
            placeholder="Name"
            style="width: 200px"
            allow-clear
          >
            <template #suffix>
              <Tooltip title="Extra information">
                <SearchOutlined style="color: #cccccc" @click="onSearch" />
              </Tooltip>
            </template>
          </Input>
          <Button @click="toggleSort" style="font-family: Inter">
            <div class="sort-box">
              <NuxtIcon name="descend" class="icon" v-if="sortOrder === 'descend'" />
              <NuxtIcon name="ascend" class="icon" v-else />
              <span class="sort-by">Sorted by <span> Last updated</span> </span>
            </div>
          </Button>
        </div>
        <div class="top-right">
          <div v-if="displayType === 'table'" class="display-type fill-revert-layer">
            <NuxtIcon
              name="display-table"
              class="display-icon bg-[#EEEFF1] rounded-[3px]"
            />
            <NuxtIcon
              name="display-card"
              class="display-icon"
              @click="onToggle('card')"
            />
          </div>
          <div v-else class="display-type fill-revert-layer">
            <NuxtIcon
              name="display-table"
              class="display-icon"
              @click="onToggle('table')"
            />
            <NuxtIcon
              name="display-card"
              class="display-icon bg-[#EEEFF1] rounded-[3px]"
            />
          </div>
          <Button
            :loading="deleteLoading"
            @click="deleteMultiple"
            v-if="hasRolePerm('sys:agent:bulk:del')"
          >
            Bulk Delete
          </Button>
          <Button
            type="primary"
            style="width: 130px"
            @click="onCreate"
            v-if="hasRolePerm('sys:agent:add')"
          >
            + Create
          </Button>
        </div>
      </div>
    </template>
    <AgentTable
      v-if="displayType === 'table'"
      :agentData="agentData"
      :tableLoading="tableLoading"
      v-model:selectedKeys="mySelectedKeys"
      @deleteSingle="deleteSingle"
      @editAgent="editAgent"
      @selectedKeysChange="selectedKeysChange"
    />
    <AgentCard
      v-else
      :agentData="agentData"
      :tableLoading="tableLoading"
      @deleteSingle="deleteSingle"
      @editAgent="editAgent"
    />
    <template #footer>
      <div v-if="total > 20" class="flex justify-end">
        <Pagination
          v-model:current="pageNumber"
          v-model:pageSize="pageSize"
          show-size-changer
          :show-total="(total: any) => `Total ${total} items`"
          :total="total"
          @change="pageChange"
          class="table-pagination"
        />
      </div>
    </template>
  </base-card>

  <component :is="lockedDialog.Dialog">
    <template #default="{ data }">
      <div class="text-center font-[Inter-SemiBold,Inter] text-[20px] fw-600 mb-[15px]">
        Editing Locked
      </div>
      <div class="text-[12px] font-[Inter] fw-400 c-[#212121] text-center">
        <p class="mb-0 lh-[26px]">
          This Docy Agent is currently being edited by
          <span class="c-[#5194FD]">{{ data?.edit_user }}</span
          >.
        </p>
        <p class="mb-0 lh-[26px]">Editing is temporarily locked to prevent conflicts.</p>
        <p class="mb-0 lh-[26px]">Please try again later.</p>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <Button
          type="primary"
          class="px-[16px] bg-[#7f63f4] mb-[10px]"
          @click="lockedDialog.close()"
        >
          Got It
        </Button>
      </div>
    </template>
  </component>

  <component :is="promptDialog.Dialog">
    <template #default="options">
      <div class="flex flex-col gap-[10px] flex justify-center items-center c-[#000000]">
        <img src="@/assets/icons/warning.svg" alt="" class="w-[40px] my-[14px]" />

        <div
          class="text-[12px] fw-400 font-[Inter] mb-[10px] px-[40px] break-all lh-[24px]"
        >
          [
          <span v-for="items in options.agent_list">
            {{ items[0] }},<{{ items[1] }}>
          </span>
          ]
        </div>
        <span
          class="text-[12px] fw-400 font-[Inter] px-[16px] mb-[6px] text-center lh-[24px]"
        >
          {{ options.title }}
        </span>
      </div>
    </template>
    <template #footer="">
      <div class="dialog-footer">
        <Button
          type="primary"
          style="padding: 0 16px; background-color: #7f63f4; margin-bottom: 10px"
          @click="goItPrompt"
        >
          Ok,got it
        </Button>
      </div>
    </template>
  </component>
</template>

<style src="./index.scss" lang="scss" scoped></style>
