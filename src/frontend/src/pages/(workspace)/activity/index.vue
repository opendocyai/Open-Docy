<script setup lang="ts">
definePage({
	meta: {
		title: "activity"
	}
})

import { useRouterStore, useSpaceStore, useEventSourceStore } from "@/stores";

import { BaseCard, NuxtIcon } from "@/components";
import { formatDateTime, hasRolePerm } from "@/utils";

import { ref, watch, nextTick } from "vue";
import { useRouter } from 'vue-router'

import { Button, Input, Select, Tooltip, Table, SelectOption, Tag, Pagination, Avatar, message } from 'ant-design-vue'

import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

import { useConfirmModal, useDialog, type DialogExpose } from '@/composables'

import { useHttp } from "@/client";

import { useApiActivity } from '@/api'

import to from 'await-to-js'
import { debounce } from "lodash";

const routerStore = useRouterStore();

const eventSourceStore = useEventSourceStore();

routerStore.SET_BREADCRUMB([
	{
		name: "Activity",
		path: "/activity",
	}
]);

const router = useRouter()

const { showConfirm } = useConfirmModal();

const { request } = useHttp();

const queryName = ref<any>("");
const status = ref();
const statusList = [
	{
		value: "Not Started",
		label: "Not Started",
	},
	{
		value: "Queued",
		label: "Queued",
	},
	{
		value: "In Progress",
		label: "In Progress",
	},
	{
		value: "Completed",
		label: "Completed",
	},
	{
		value: "Pause",
		label: "Pause",
	},
	{
		value: "Action Required",
		label: "Action Required",
	},
	{
		value: "Error",
		label: "Failed",
	},
];

const deleteLoading = ref(false);
const tableLoading = ref(false);
const tableData = ref<any>([]);
const selectedKeys = ref([]);
const total = ref();
const sortOrder = ref("descend");
const spaceStore: any = useSpaceStore();
const pageSize = ref(20);
const pageNumber = ref(1);
const rowSelection: any["rowSelection"] = {
	onChange: (selectedRowKeys: []) => {
		selectedKeys.value = selectedRowKeys;
	},
	getCheckboxProps: (record: any) => ({
		disabled: record.status == "Queued" || record.status == "In Progress" || record.status == "Action Required",
		name: record.name,
	}),
};
const columns = ref<any>([
	{
		title: "Task Name",
		dataIndex: "name",
		key: "name",
		width: 200,
	},
	{
		title: "AI Agent",
		dataIndex: "agent",
		key: "agent",
		width: 200,
	},
	{
		title: "Status",
		dataIndex: "status",
		width: 180,
	},
	{
		title: "Run Time",
		dataIndex: "run_time",
		key: "run_time",
		customRender: ({ text }: { text: string }) => formatDateTime(text),
	},
	{
		title: "Created by",
		dataIndex: "createBy",
	},
	{
		title: "Generated File",
		dataIndex: "generated_files",
		width: 140,
	},
	{
		title: "Record",
		dataIndex: "view",
		width: 120,
	},
	{
		title: "Action",
		fixed: "right",
		dataIndex: "action",
		width: 160,
	},
]);

const completedState = ref<any>(null);

const editingKey = ref<string | null>(null);
const editTaskName = ref<string>("");
const oldTaskName = ref<string>("");
const inputRef = ref<any>(null);

const mySelectedKeys = ref([]);

const getList = async () => {
	tableLoading.value = true;
	const orderType = "created_at";
	const sortType = sortOrder.value === "ascend" ? "asc" : "desc";
	const [err, res] = await to<{ data: any; code: number }>(
		request(useApiActivity("get_activity_list"),
			{
				data: {
					task_name: queryName.value,
					t_status: status.value,
					space_id: spaceStore.spaceInfoCurrent?.id,
					orderBy: `${orderType}.${sortType}`,
					pageNumber: pageNumber.value,
					pageSize: pageSize.value,
				},
			})
	);
	tableLoading.value = false;
	if (err) return;
	if (res?.code == 200) {
		tableData.value = res.data.results;
		total.value = res.data.count;
	}
};

const getState = async () => {
	const [err, res] = await to<{ data: any; code: number }>(
		request(useApiActivity("get_activity_state"),
			{
				data: {
					space_id: spaceStore.spaceInfoCurrent?.id,
				},
			})
	);
	if (err) return;
	if (res?.code == 200) {
		completedState.value = res.data;
	}
};


const getListAndState = () => {
	getList();
	getState();
};

const onSearch = debounce(() => {
	if (queryName.value) {
		getListAndState();
	}
}, 500);


const toggleSort = debounce(() => {
	sortOrder.value = sortOrder.value === "ascend" ? "descend" : "ascend";
	getListAndState();
}, 500);

watch(
	() => queryName.value,
	(newVal: any, oldVal: any) => {
		if (newVal === "" && oldVal !== "") {
			getListAndState();
		}
	}
);

watch(
	() => spaceStore.spaceInfoCurrent,
	(newVal: any) => {
		if (newVal?.id) {
			getListAndState();
		}
	},
	{ deep: true, immediate: true }
);

watch(() => eventSourceStore.sse_data, (newValue) => {
	if (
		newValue?.event_type == "task_status_changed" ||
		newValue?.event_type == "task_finished"
	) {
		getListAndState();
	}
}, { deep: true, immediate: true })


const deleteMultiple = () => {
	if (!selectedKeys.value.length) {
		message.warning("Please select at least one item");
		return;
	}

	showConfirm({
		title: "Confirm Activity Deletion",
		content: "Are you sure you want to delete this activity?",
		onOk: async () => {
			deleteLoading.value = true;
			const selectedIds = selectedKeys.value?.join();

			const [err, res] = await to<{
				data: any;
				code: number;
			}>(request(useApiActivity("delete_activity_multiple"), {
				data: {
					task_ids: selectedIds,
				},
			}));
			deleteLoading.value = false;

			if (err) return;
			if (res?.code == 200) {
				selectedKeys.value = [];
				pageChange(1, 20);
				getListAndState();
				message.success(`Deleted successfully`);
			}
		},
		onCancel: () => {
			console.log("cancel");
		},
	});
}

const onCreate = () => {
	router.push("/activity/create-activity");
}

const handleRowClick = (record: any) => {
	return {
		onClick: () => {
			const status = record.status;
			console.log('status :', status);
			switch (status) {
				case "Not Started":
					router.push(`/activity/edit-activity/upload-file?task_id=${record.id}`);
					break;

				case "In Progress":
					router.push(
						`/activity/record?task_id=${record.id}&task_name=${encodeURIComponent(record.name)}&activeTag=flowchart`
					);
					break;
				case "Completed":
					router.push(
						`/activity/audit-extract-generate?task_id=${record.id}&task_name=${encodeURIComponent(record.name)}&activatedTab=0`
					);
					break;
				case "Queued":
					message.warning("The task is currently in queue");
					break;
				case "Pause":
					router.push(`/activity/record?task_id=${record.id}&task_name=${encodeURIComponent(record.name)}&activeTag=logs`);
					break;
				case "Action Required":
					router.push(
						`/activity/manual-intervention?task_id=${record.id}`
					);
					break;
				case "Error":
					router.push(`/activity/edit-activity/upload-file?task_id=${record.id}`);
					break;

				default:
					return;
			}
		}
	}
}

const getRowClassName = (record: any) => {
	return record.status === "Queued" ? "queued-row" : "clickable-row";
};


const editName = (id: any) => {
	const record = tableData.value.find((item: { id: any }) => item.id === id);
	if (record) {
		editingKey.value = id.toString();
		oldTaskName.value = record.name;
		editTaskName.value = record.name;
		nextTick(() => {
			inputRef.value?.focus();
		});
	}
}

const saveEdit = debounce((id: any) => {
	console.log('id :', id);
	if (
		editingKey.value !== id.toString() ||
		oldTaskName.value == editTaskName.value
	) {
		editingKey.value = null;
		return;
	}

	const updatedData = [...tableData.value];
	const index = updatedData.findIndex((item) => item.id === id);

	if (index > -1 && updatedData[index]) {
		updatedData[index].name = editTaskName.value;
		tableData.value = updatedData;
		editingKey.value = null;
		updateName(editTaskName.value, id);
	} else {
		message.error("There is no such data available");
	}
}, 500)

const updateName = async (name: string, id: any) => {
	const dataApi = useApiActivity("update_activity")(id);
	const [err, res] = await to<{ data: any; code: number }>(request(
		dataApi,
		{
			data: {
				task_name: name,
			},
		}
	));
	if (err) return;
	if (res?.code == 200) {
		getList();
	}
};

const viewRecord = (record: any) => {
	router.push(`activity/record?task_id=${record.id}&task_name=${encodeURIComponent(record.name)}&activeTag=${"logs"}`);
}


const cancelTaskDialog: DialogExpose = useDialog({
	width: 420,
	isHeader: false,
	closable: false,
	centered: true,
	maskClosable: false,
	cancelText: "Yep, cancel it",
	okText: "Keep it running",
	cancel: async ({ _, data }: any, cancelLoadingState: (state: boolean) => void) => {
		cancelLoadingState(true)
		const [error, result] = await cancel_activity<{ data: any; code: number }>(data)
		cancelLoadingState(false)
		if (error) return;
		if (result?.code == 200) {
			message.success(`Canceled successfully`)
			cancelTaskDialog.close()
			getListAndState()
		}
	},
	ok: () => {
		cancelTaskDialog.close()
	}
})

const cancel_activity = <T>({ id, last_run_id }: any) => {
	return to<T>(
		request(useApiActivity("cancel_activity"), {
			data: {
				task_id: id,
				run_id: last_run_id
			}
		})
	);
}

const cancelTask = debounce((id: any, last_run_id: any) => {
	cancelTaskDialog.open({ formType: 'cancel', data: { id, last_run_id } })
}, 500)


const manualIntervention = debounce((id: any) => {
	router.push(`/activity/manual-intervention?task_id=${id}`);
}, 500)


const pageChange = (_pageNumber: any, _pageSize: any) => {
	pageSize.value = _pageSize;
	pageNumber.value = _pageNumber;
	getListAndState();
};

const promptDialog: DialogExpose = useDialog({
	width: 400,
	centered: true,
	closable: false,
	maskClosable: false,
});

const runTask = debounce(async (record: any) => {
	console.log('record :', record);

	const dataApi = useApiActivity("run_activity")(record.id);
	const [error, res] = await to<{
		data: any;
		code: number;
		status: string;
	}>(request(dataApi));
	if (error) return;
	if (res?.code == 200) {
		if (res?.status == "failed") {
			const options = {
				title:
					"Cannot rerun this task because the associated Agent has been deleted.",
			};
			promptDialog.setTitle("");
			promptDialog.open(options);
		} else {
			getListAndState();
		}
	}
}, 500)


function deleteSingle(id: any) {
	console.log('id :', id);
	showConfirm({
		title: "Confirm Activity Deletion",
		content: "Are you sure you want to delete this activity?",
		onOk: async () => {
			const dataApi = useApiActivity("delete_activity")(id);
			const [err, res] = await to<{ data: any; code: number }>(
				request(dataApi)
			);
			if (err) return;
			if (res?.code == 200) {
				await pageChange(1, 20);
				await getListAndState();
				await message.success(`Deleted successfully`);
			}
		},
		onCancel: () => {
			console.log("cancel");
		},
	})
}

function goItPrompt() {
	mySelectedKeys.value = [];
	promptDialog.close();
	getList();
}
</script>

<template>
	<base-card>
		<template #header>
			<div class="flex justify-end mb-[20px] mt-[10px] gap-[40px] c-[#555555] text-[12px] font-[Inter]">
				<div class="font-[Inter]">
					No. of Tasks Completed：
					<span class="c-[#2E2BD9]">
						{{ completedState?.completed_task }}
					</span>
				</div>
				<div v-if="false">
					Completion Ratio：
					<span class="c-[#17C653]">
						{{ completedState?.completed_rate }}%
					</span>
				</div>
			</div>
			<div class="top-wrap">
				<div class="top-left">
					<Input v-model:value="queryName" placeholder="Task name" style="width: 200px" allow-clear>
						<template #suffix>
							<Tooltip title="Click to search">
								<SearchOutlined style="color: #cccccc" @click="onSearch" />
							</Tooltip>
						</template>
					</Input>
					<Select ref="select" v-model:value="status" placeholder="Status" style="width: 120px" allowClear
						@change="getListAndState" class="status-select">
						<select-option v-for="(item, index) in statusList" :value="item.value" :key="index">
							{{ item.label }}
						</select-option>
					</Select>
					<Button @click="toggleSort" style="font-family: Inter;">
						<div class="sort-box">
							<NuxtIcon name="descend" class="icon" v-if="sortOrder === 'descend'" />
							<NuxtIcon name="ascend" class="icon" v-else />
							<span class="sort-by">Sorted by <span>Last created</span> </span>
						</div>
					</Button>
				</div>
				<div class="top-right">
					<Button :loading="deleteLoading" @click="deleteMultiple" v-if="hasRolePerm('sys:task:bulk:del')">
						Bulk Delete
					</Button>
					<Button type="primary" style="width: 130px" @click="onCreate" v-if="hasRolePerm('sys:task:add')">
						+ Create Task
					</Button>
				</div>
			</div>
		</template>
		<Table rowKey="id" :row-selection="hasRolePerm('sys:task:bulk:del') ? rowSelection : undefined"
			:columns="columns" :data-source="tableData" :pagination="false" :loading="tableLoading"
			:scroll="tableData?.length ? { x: 'max-content' } : undefined" :customRow="handleRowClick" bordered
			size="middle" :row-class-name="getRowClassName" style="font-size: 13px; color: #000000; font-family: Inter">
			<template #bodyCell="{ column, text, record }">
				<template v-if="column.dataIndex === 'name'">
					<div v-if="editingKey !== record.id" class="flex justify-between gap-[4px]">
						<span class="text-ellipsis-span" style="width: 300px">
							{{ text }}
						</span>
						<Button v-if="hasRolePerm('sys:task:edit')" style="color: #212121" type="link" size="small"
							class="view-btn" @click.stop="editName(record.id)">
							<span class="fill-revert-layer">
								<NuxtIcon name="edit" class="icon text-[16px] c-[#212121] fw-0" />
							</span>
						</Button>
					</div>
					<div v-else style="width: 336px; display: flex">
						<Input v-model:value="editTaskName" v-show="editingKey === record.id" ref="inputRef"
							@pressEnter="saveEdit(record.id)" @click.stop style="width: 100%" />
						<div class="w-[32px]"></div>
					</div>
				</template>
				<template v-if="column.dataIndex === 'agent' && record.agent">
					<div class="flex items-center">
						<Tag size="large" :bordered="false" :title="record.agent.name" color="#FAECCF"
							class="text-ellipsis-span text-[12px] fw-500 font-[Inter]"
							style="color: #000000; max-width: 200px">
							{{ record.agent.name }}
						</Tag>
					</div>
				</template>
				<template v-if="column.dataIndex === 'processing_method'">
					<Tag v-if="record.processing_method == 1" size="large" :bordered="false" color="#EEEDFF"
						style="color: #000; font-size: 13px">
						Uploaded
					</Tag>
					<Tag v-if="record.processing_method == 2" size="large" :bordered="false" color="geekblue"
						style="color: #000; font-size: 13px">
						Web Scraped
					</Tag>
				</template>
				<template v-if="column.dataIndex === 'status'">
					<span class="state--noStart" v-if="record.status === 'Not Started'">
						Not Started
					</span>
					<span class="state--queued" v-if="record.status === 'Queued'">
						Queued
					</span>
					<span class="state--inProgress" v-if="record.status === 'In Progress'">
						In Progress
					</span>
					<span class="state--completed" v-if="record.status === 'Completed'">
						Completed
					</span>
					<span class="state--pause" v-if="record.status === 'Pause'">
						Pause
					</span>
					<span class="state--actionRequired" v-if="record.status === 'Action Required'">
						Action Required
					</span>
					<span class="state--error" v-if="record.status === 'Error'">
						<span>Failed </span>
						<Tooltip placement="top">
							<template #title>
								<span>{{ record.error_info }}</span>
							</template>
							<ExclamationCircleOutlined class="c-[#CCCCCC] text-[15px] pt-[2px]" />
						</Tooltip>
					</span>
				</template>

				<template v-if="column.dataIndex === 'createBy'">
					<div class="flex items-center">
						<Avatar v-if="record?.creator?.avatar" :src="record?.creator?.avatar" :size="26"
							style="margin-right: 6px" />
						<Avatar v-else :size="26" :style="{ 'background-color': record?.creator?.default_color }"
							style="display: flex; align-items: center; margin-right: 6px">
							<span class="inline-block text-[12px] h-[26px] lh-[21px]">
								{{ record?.creator?.display?.substring(0, 1).toUpperCase() }}
							</span>
						</Avatar>
						<span class="c-[#8C8C94] text-[12px] fw-500 font-[Inter]">
							{{ record?.creator?.display }}
						</span>
					</div>
				</template>
				<template v-if="column.dataIndex === 'run_time'">
					<span class="c-[#8C8C94] text-[12px] fw-500 font-[Inter]" v-if="record.status !== 'In Progress'">
						{{ record.run_time }}
					</span>
				</template>
				<template v-if="column.dataIndex === 'generated_files'">
					<span class="c-[#8C8C94] text-[12px] fw-500 font-[Inter]">
						{{ record.generated_files?.length || 0 }}
					</span>
				</template>
				<template v-if="column.dataIndex === 'view'">
					<Button
						v-if="record.status !== 'Not Started' && record.status !== 'Queued' && hasRolePerm('sys:task:record:view')"
						style="color: #6676ff;padding: 0px;" type="link" size="small" class="view-btn"
						@click.stop="viewRecord(record)">
						<NuxtIcon name="view" class="icon text-[20px] mr-[4px]" />
						View
					</Button>
				</template>
				<template v-if="column.dataIndex === 'action'">
					<div class="action-btn">
						<Button v-if="
							(record.status === 'Not Started' || record.status === 'Pause') && hasRolePerm('sys:task:run')
						" style="color: #000000;padding: 0px;" type="link" size="small" @click.stop="runTask(record)">
							<NuxtIcon name="run" class="icon text-[18px] c-[#17C653]" />
							Run
						</Button>
						<Button
							v-if="(record.status === 'Error' || record.status === 'Completed') && hasRolePerm('sys:task:run')"
							style="color: #000000;padding: 0px;" type="link" size="small" @click.stop="runTask(record)">
							<NuxtIcon name="run" class="icon text-[18px] c-[#17C653]" />
							Rerun
						</Button>

						<Button v-if="
							(record.status === 'Queued' || record.status === 'In Progress') && hasRolePerm('sys:task:cancel')
						" style="color: #000000;padding: 0px;" type="link" size="small"
							@click.stop="cancelTask(record.id, record.last_run_id)">
							<NuxtIcon name="cancle" class="icon text-[18px] text-[#F63C47]" />
							Cancel
						</Button>
						<Button v-if="record.status === 'Action Required' && hasRolePerm('sys:task:manual')"
							style="color: #ff557a;padding: 0px;" type="link" size="small"
							@click.stop="manualIntervention(record.id)">
							<NuxtIcon name="manual-intervention" class="icon text-[18px]" />
							Manual Intervention
						</Button>

						<Button v-if="
							(record.status === 'Completed' ||
								record.status === 'Not Started' ||
								record.status === 'Error') &&
							hasRolePerm('sys:task:del')
						" style="color: #000000;padding: 0px;" type="link" size="small" @click.stop="deleteSingle(record.id)">
							<NuxtIcon name="delete" class="icon text-[16px] c-[#CCCCCC]" />
							Delete
						</Button>
					</div>
				</template>
			</template>
		</Table>
		<template #footer>
			<div v-if="total > 20" class="flex justify-end">
				<Pagination v-model:current="pageNumber" v-model:pageSize="pageSize" show-size-changer
					:show-total="(total: any) => `Total ${total} items`" :total="total" @change="pageChange"
					class="table-pagination" />
			</div>
		</template>
	</base-card>

	<component :is="cancelTaskDialog.Dialog">
		<div class="px-[30px] flex flex-col items-center justify-center gap-[10px]">
			<div class="mb-[20px] font-[Inter] fw-600 text-[20px]">Cancel the task?</div>
			<div
				class="flex flex-col items-center justify-center gap-[10px] c-[#212121] font-[Inter] fw-400 text-[12px]">
				<div>No worries — you can stop it anytime!</div>
				<div>Just a headsup:</div>
				<div class="text-center">even if you cancel now, <br />
					this task will still count toward your free limit.</div>
				<div class="c-[#F63C47] py-[5px]">Still want to cancel?</div>
			</div>
		</div>
	</component>


	<component :is="promptDialog.Dialog">
		<template #default="options">
			<div class="flex flex-col gap-[10px] flex justify-center items-center text-[#000000]">
				<img src="@/assets/icons/warning.svg" alt="" class="w-[40px] my-[14px]" />
				<span class="text-[12px] fw-400 font-[Inter] px-[16px] mb-[6px] text-center leading-[24px]">
					{{ options.title }}
				</span>
			</div>
		</template>
		<template #footer="">
			<div class="dialog-footer">
				<Button type="primary" style="
				padding: 0 16px;
				background-color: #7f63f4;
				margin-bottom: 10px;" @click="goItPrompt">
					Ok,got it
				</Button>
			</div>
		</template>
	</component>
</template>

<style src="./index.scss" scoped lang="scss"></style>
