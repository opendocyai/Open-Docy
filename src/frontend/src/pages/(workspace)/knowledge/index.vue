<script setup lang="ts">
import { useApiInnerMessage, useApiKnowledge } from "@/api";
import { useHttp } from "@/client";
import { useConfirmModal, useDialog, useDownload, useRunTask, type DialogExpose } from "@/composables";
import { BaseCard, NuxtIcon } from '@/components'
import { useCommonStore, useEventSourceStore, useRouterStore, useSpaceStore } from "@/stores";
import { formatDateTime, hasRolePerm } from "@/utils";
import { message, Table, Button, Tooltip, Tag, Pagination, Input, Select, SelectOption, Dropdown } from "ant-design-vue";
import { debounce } from "lodash";
import { onMounted, ref, watch } from "vue";
import { SearchOutlined } from '@ant-design/icons-vue'
import to from "await-to-js";

import { DataPrompt, DataPromptResult, DataUpload, DataWebsite } from "./components";

const routerStore = useRouterStore();

routerStore.SET_BREADCRUMB([
	{
		name: "Knowledge",
		path: "/knowledge",
	}
]);

const editData = ref<any>(null);
const dialogTitle = ref<string>("");

const { showConfirm } = useConfirmModal();
const { request } = useHttp();
const queryName = ref<any>();
const status = ref();
const statusList = [
	{
		value: 0,
		label: "Not Started",
	},
	{
		value: 1,
		label: "Processing",
	},
	{
		value: 2,
		label: "Activate",
	},
	{
		value: 3,
		label: "Failed",
	},
];
const deleteLoading = ref(false);
const tableLoading = ref(false);
const tableData = ref([]);
const selectedKeys = ref([]);
const file = ref<any>("");
const submitUploadFormRef = ref<any>(null);
const submitWebsiteFormRef = ref<any>(null);
const total = ref();
const sortOrder = ref("descend");
const spaceStore: any = useSpaceStore();
const isWebsitePrompt = ref(false);
const isUploadPrompt = ref(false);
const submitLoading = ref(false);
const pageSize = ref(20);
const pageNumber = ref(1);
const rowSelection: any["rowSelection"] = {
	onChange: (selectedRowKeys: [], selectedRows: any[]) => {
		selectedKeys.value = selectedRowKeys;
	},
	getCheckboxProps: (record: any) => ({
		disabled: record.name === "Disabled User",
		name: record.name,
	}),
};
const rules = ref({
	name: [
		{ required: true, message: "Please enter the data name", trigger: "blur" },
	],
	website_url: [
		{
			required: true,
			message: "Please enter the website URL",
			trigger: "blur",
		},
	],
	source_file_name: [
		{
			required: true,
			trigger: "change",
			validator: (rule: any, value: any) => {
				if (file.value && file.value.size) {
					const maxSize = 200 * 1024 * 1024;
					if (file.value.size > maxSize) {
						file.value = "";
						editData.value.source_file_name = "";
						return new Error("The file size cannot exceed 200MB.");
					}
				}
				if (value && !isNaN(value) && file.value) {
					return true;
				}
				return new Error("Please upload the file");
			},
		},
	],
});
const columns = ref<any>([
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "Dataset Name",
		dataIndex: "name",
		key: "name",
		width: 200,
	},
	{
		title: "Source File",
		dataIndex: "source_file_name",
	},
	{
		title: "Data Process",
		dataIndex: "processing_method",
	},
	{
		title: "Status",
		dataIndex: "status",
	},
	{
		title: "Creation Time",
		dataIndex: "created_at",
		key: "created_at",
		customRender: ({ text }: { text: string }) => formatDateTime(text),
	},
	{
		title: "Update Time",
		dataIndex: "update_at",
		key: "update_at",
		customRender: ({ text }: { text: string }) => formatDateTime(text),
	},
	{
		title: "Action",
		fixed: "right",
		dataIndex: "action",
		width: 160,
	},
]);


const uploadLoading = ref(false);

const myDialog: DialogExpose = useDialog({
	width: 600,
	centered: true,
});
const promptDialog: DialogExpose = useDialog({
	width: 600,
	centered: true,
});
const promptRusultDialog: DialogExpose = useDialog({
	width: 450,
	centered: true,
});

const handleUploadData = (command: string, operationMethod: string) => {
	editData.value = {};
	if (command == "upload") {
		dialogTitle.value = "Import data from your files";
	}
	if (command == "website") {
		dialogTitle.value = "Add Website for Crawling";
	}
	myDialog.setTitle(dialogTitle.value);
	myDialog.open({ formType: command, operationMethod: operationMethod });
};

const goItPrompt = () => {
	promptDialog.close();
	isWebsitePrompt.value = false;
	isUploadPrompt.value = false;
};
const goItPromptResult = () => {
	promptRusultDialog.close();
};

const { onOpen } = useRunTask();

const createOrUpdateWebsite = async (
	formType: string,
	operationMethod: string
) => {
	const { ruleWebsiteFormRef, toCreateKnowledge, toUpdateKnowledge } =
		submitWebsiteFormRef.value;
	ruleWebsiteFormRef
		.validate()
		.then(async () => {
			let resultsData;
			submitLoading.value = true;
			if (formType == "website" && operationMethod == "create") {
				resultsData = await toCreateKnowledge();
			} else {
				resultsData = await toUpdateKnowledge();
			}
			submitLoading.value = false;

			const { data } = resultsData;
			console.log("🚀 ~  ~ data: 1111111", data);
			if (data.value.code == "200") {
				myDialog.close();
				isWebsitePrompt.value = true;
				await new Promise((resolve) => requestAnimationFrame(resolve));
				await getList();
			} else if (data.value?.code == "100000") {
				console.log("🚀 ~  ~ data.value: ", data.value?.data);
				onOpen(data.value?.data)
				myDialog.close();
			}
		})
		.catch((error: any) => {
			console.log("error submit!", error);
		});
};

const createOrUpdateUpload = async (
	formType: string,
	operationMethod: string
) => {
	const { ruleUploadFormRef, toCreateKnowledge, toUpdateKnowledge } =
		submitUploadFormRef.value;
	ruleUploadFormRef
		.validate()
		.then(async () => {
			let resultsData;
			submitLoading.value = true;

			if (formType == "upload" && operationMethod == "create") {
				resultsData = await toCreateKnowledge();
			} else {
				resultsData = await toUpdateKnowledge();
			}
			submitLoading.value = false;

			const { data } = resultsData;
			console.log("🚀 ~  ~ data: 2222", data);
			if (data.value?.code == "200") {
				myDialog.close();
				isUploadPrompt.value = true;
				await new Promise((resolve) => requestAnimationFrame(resolve));
				await getList();
			} else if (data.value?.code == "100000") {
				console.log("🚀 ~  ~ data.value: ", data.value?.data);
				onOpen(data.value?.data)
				myDialog.close();
			}
		})
		.catch((error: any) => {
			console.log("error submit!", error);
		});
};

const deleteSingle = async (id: any) => {
	showConfirm({
		title: "Confirm Knowledge Deletion",
		content: "Are you sure you want to delete this knowledge?",
		onOk: debounce(async () => {
			const dataApi = useApiKnowledge("delete_knowledge")(id);
			const [error, res] = await to<{ data: any; code: number }>(
				request(dataApi)
			);
			if (error) return;
			if (res?.code == 200) {
				pageChange(1, 20);
				getList();
				message.success(`Deleted successfully`);
			}
		}, 500),
		onCancel: () => {
			console.log("cancel");
		},
	});
};

const deleteMultiple = async () => {
	if (!selectedKeys.value.length) {
		message.warning("Please select at least one item");
		return;
	}

	showConfirm({
		title: "Confirm Knowledge Deletion",
		content: "Are you sure you want to delete this knowledge?",
		onOk: debounce(async () => {
			deleteLoading.value = true;
			const [error, result] = await to<{
				data: any;
				code: number;
			}>(request(useApiKnowledge("delete_knowledge_multiple"), {
				data: {
					knowledge_ids: selectedKeys.value,
				},
			}));
			deleteLoading.value = false;

			if (error) return;
			if (result?.code == 200) {
				selectedKeys.value = [];
				pageChange(1, 20);
				getList();
				message.success(`Deleted successfully`);
			}
		}, 500),
		onCancel: () => {
			console.log("cancel");
		},
	});
};

const getList = async () => {
	tableLoading.value = true;
	const orderType = "update_at";
	const sortType = sortOrder.value === "ascend" ? "asc" : "desc";
	const [error, result] = await to<{ data: any; code: number }>(
		request(useApiKnowledge("get_knowledge_list"),
			{
				data: {
					name: queryName.value,
					status: status.value,
					space_id: spaceStore.spaceInfoCurrent?.id,
					orderBy: `${orderType}.${sortType}`,
					pageNumber: pageNumber.value,
					pageSize: pageSize.value,
				},
			})
	);
	tableLoading.value = false;
	if (error) return;
	if (result?.code == 200) {
		tableData.value = result.data.results;
		total.value = result.data.count;
	}
};
const { init } = useDownload()
const exportDoc = debounce(async (record: any) => {
	try {
		const dataApi = useApiKnowledge("export_knowledge")(record.id);
		console.log(dataApi)
		const res = await request(dataApi, {responseType: "blob", config: { isRaw: true } })
		console.log("🚀 ~  ~ res: ", res);
		let fileName: any = res.headers.get("file-name");
		if (!fileName) {
			const disposition = res.headers.get('content-disposition')
			fileName =
				disposition?.match(/filename="?([^"]+)"?/)?.[1] ?? 'data.csv'
		}
		init(res.data, fileName);
	} catch (e) {
	}
}, 500);

const toggleSort = debounce(() => {
	sortOrder.value = sortOrder.value === "ascend" ? "descend" : "ascend";
	getList();
}, 500);

const editDoc = debounce(async (record: any) => {
	editData.value = record;
	const formType = record.processing_method == 1 ? "upload" : "website";

	if (record.processing_method == 1) {
		dialogTitle.value = "Import data from your files";
	}
	if (record.processing_method == 2) {
		dialogTitle.value = "Add Website for Crawling";
	}
	myDialog.setTitle(dialogTitle.value);
	myDialog.open({ formType: formType, operationMethod: "edit" });
}, 500);

const pageChange = (_pageNumber: any, _pageSize: any) => {
	pageSize.value = _pageSize;
	pageNumber.value = _pageNumber;
	getList();
};

const onSearch = debounce(() => {
	if (queryName.value) {
		getList();
	}
}, 500);

const showUploadResult = (
	formType: string,
	operationMethod: string,
	content: any
) => {
	promptRusultDialog.setTitle("");
	promptRusultDialog.open({ formType, operationMethod, content });
};

const commonStore: any = useCommonStore();
const getInnerMessageList = async () => {
	const orderType = "update_at";
	const sortType = sortOrder.value === "ascend" ? "asc" : "desc";
	const [error, result] = await to<{ data: any; code: number }>(
		request(useApiInnerMessage("get_inner_message_list"),
			{
				data: {
					space_id: spaceStore.spaceInfoCurrent?.id,
					orderBy: `${orderType}.${sortType}`,
				},
			})
	);

	if (error) return;
	if (result?.code == 200) {
		const res = result?.data?.results.filter((item: { status: string }) => {
			return item.status == "unread";
		});

		commonStore.SET_NOTIFICATION_COUNT(res.length);
	}
};

const formatUrl = (url?: string) => {
	if (!url) return ''
	try {
		const u = new URL(url)
		const origin = u.origin
		const pathname = u.pathname.replace(/\/+$/, '')

		const parts = pathname.split('/')
		const lastSegment = parts.pop() || ''

		return lastSegment
			? `${origin}/.../${lastSegment}`
			: origin
	} catch (e) {
		return url
	}
}

const eventSourceStore = useEventSourceStore();

watch(
	() => queryName.value,
	(newVal: any, oldVal: any) => {
		if (newVal === "" && oldVal !== "") {
			getList();
		}
	}
);

watch(
	() => isUploadPrompt.value,
	(newVal) => {
		if (newVal) {
			promptDialog.setTitle("Importing Data");
			promptDialog.open({ formType: "upload", operationMethod: "prompt" });
		} else {
			promptDialog.close();
		}
	}
);

watch(
	() => isWebsitePrompt.value,
	(newVal) => {
		if (newVal) {
			promptDialog.setTitle("Importing Website");
			promptDialog.open({ formType: "website", operationMethod: "prompt" });
		} else {
			promptDialog.close();
		}
	}
);

watch(
	() => eventSourceStore.sse_data,
	(newVal) => {
		if (!newVal?.event_type) return;

		if (newVal?.event_type === "knowledge_upload_finished") {
			getList();
			setTimeout(() => {
				isUploadPrompt.value = false;
				showUploadResult("result", "finished", newVal?.content);
				getInnerMessageList();
			}, 1000);
		}
		if (newVal?.event_type === "knowledge_upload_failed") {
			getList();
			setTimeout(() => {
				isUploadPrompt.value = false;
				showUploadResult("result", "failed", newVal?.content);
			}, 1000);
		}
		if (newVal?.event_type === "knowledge_crawled_finished") {
			getList();
			setTimeout(() => {
				isWebsitePrompt.value = false;
				showUploadResult("result", "finished", newVal?.content);
			}, 1000);
		}
		if (newVal?.event_type === "knowledge_crawled_failed") {
			getList();
			setTimeout(() => {
				isWebsitePrompt.value = false;
				showUploadResult("result", "failed", newVal?.content);
			}, 1000);
		}

		setTimeout(() => {
			eventSourceStore.SET_SSE_DATA();
		}, 100);

	},
	{ deep: true, immediate: true }
);

onMounted(() => {
	getList();
});
</script>

<template>
	<base-card>
		<template #header>
			<div class="top-wrap">
				<div class="top-left">
					<Input v-model:value="queryName" placeholder="Name" style="width: 200px" allow-clear>
						<template #suffix>
							<Tooltip title="Click to search">
								<SearchOutlined style="color: #cccccc" @click="onSearch" />
							</Tooltip>
						</template>
					</Input>
					<Select ref="select" v-model:value="status" placeholder="Status" style="width: 120px" allowClear
						@change="getList">
						<select-option v-for="(item, index) in statusList" :key="index" :value="item.value">
							{{ item.label }}
						</select-option>
					</Select>
					<Button @click="toggleSort" style="font-family: Inter">
						<div class="sort-box">
							<NuxtIcon name="descend" class="icon" v-if="sortOrder === 'descend'" />
							<NuxtIcon name="ascend" class="icon" v-else />
							<span class="sort-by">Sorted by <span>Last updated</span> </span>
						</div>
					</Button>
				</div>
				<div class="top-right">
					<Button :loading="deleteLoading" @click="deleteMultiple" v-if="hasRolePerm('sys:knl:bulk:del')">Bulk
						Delete
					</Button>
					<Dropdown :trigger="['click']">
						<Button type="primary" @click.prevent v-if="hasRolePerm('sys:knl:add')">+ Create Dataset
						</Button>
						<template #overlay>
							<div
								class="w-[282px] mt-[11px] bg-white rounded-[5px] shadow-[0px_0px_4px_0px_#00000040] p-[15px] before:content-[''] before:absolute before:w-[10px] before:h-[10px] before:rotate-[45deg] before:bg-white before:right-[40px] before:top-5.5px before:border before:border-[#00000014] before:border-b-[transparent] before:border-r-[transparent]">
								<div class="flex flex-col gap-[10px] font-[Inter]">
									<div class="flex flex-col gap-[5px] cursor-pointer create-menu"
										@click="handleUploadData('upload', 'create')">
										<div class="menu-item--title">Upload file</div>
										<div class="menu-item--desc">
											TXT, CSV, DOCX,JSON, XLSX, PDF,or PPT
										</div>
									</div>
									<div class="flex flex-col gap-[5px] cursor-pointer create-menu"
										@click="handleUploadData('website', 'create')">
										<div class="menu-item--title">Import from website</div>
										<div class="menu-item--desc">Extract content from a website</div>
									</div>
								</div>
							</div>
						</template>
					</Dropdown>
				</div>
			</div>
		</template>
		<Table rowKey="id" :row-selection="hasRolePerm('sys:knl:bulk:del') ? rowSelection : undefined"
			:columns="columns" :data-source="tableData" :pagination="false" :loading="tableLoading" bordered
			size="middle" :scroll="tableData?.length ? { x: 'max-content' } : undefined"
			style="font-size: 13px; color: #000000; font-family: Inter">
			<template #bodyCell="{ column, text, record, index }">
				<template v-if="column.dataIndex === 'name'">
					<div class="text-ellipsis-span" style="max-width: 200px" :title="record.name">
						{{ record.name }}
					</div>
				</template>
				<template v-if="column.dataIndex === 'processing_method'">
					<Tag v-if="record.processing_method == 1" size="large" :bordered="false" color="#EEEDFF"
						style="color: #000; font-size: 13px">
						Uploaded
					</Tag>
					<Tag v-if="record.processing_method == 2" size="large" :bordered="false" color="blue"
						style="color: #000; font-size: 13px">
						Web Scraped
					</Tag>
				</template>
				<template v-if="column.dataIndex === 'source_file_name'">
					<template class="" v-if="record.processing_method == 1">
						<div class="flex flex-col gap-[5px]">
							<div class="flex-none max-w-[300px] line-clamp-1" v-for="(item, index) in text?.split(',')"
								:title="item" :key="index">
								{{ item }}
							</div>
						</div>
					</template>
					<Tooltip v-else :title="record.website_url">
						<span>{{ formatUrl(record.website_url) }}</span>
					</Tooltip>
				</template>
				<template v-if="column.dataIndex === 'status'">
					<span class="state--noStart" v-if="record.status == 0"> Not Started </span>
					<span class="state--crawling" v-if="record.status == 1"> Processing </span>
					<span class="state--activate" v-if="record.status == 2"> Activate </span>
					<span class="state--inactivate" v-if="record.status == 3"> Failed </span>
				</template>
				<template v-if="column.dataIndex === 'action'">
					<div class="action-btn">
						<Button type="link" size="small" style="color: #000000" :disabled="record.status != 2"
							@click="exportDoc(record)" v-if="hasRolePerm('sys:knl:export')">
							<NuxtIcon name="export-icon" class="icon text-[18px]" />
							Export
						</Button>
						<Button type="link" size="small" style="color: #000000" :disabled="record.status < 2"
							@click="editDoc(record)" v-if="hasRolePerm('sys:knl:edit')">
							<NuxtIcon name="edit-single" class="icon text-[18px] mr-[2px]" />
							Edit
						</Button>
						<Button type="link" size="small" style="color: #f63c47" @click="deleteSingle(record.id)"
							v-if="hasRolePerm('sys:knl:del')">
							<NuxtIcon name="delete" class="icon text-[14px] mr-[2px]" />
							Delete
						</Button>
					</div>
				</template>
			</template>
		</Table>
		<template #footer>
			<div class="flex justify-end" v-if="total > 20">
				<Pagination v-model:current="pageNumber" v-model:pageSize="pageSize" show-size-changer
					:show-total="(total: any) => `Total ${total} items`" :total="total" @change="pageChange"
					class="table-pagination" />
			</div>
		</template>
	</base-card>

	<component :is="myDialog.Dialog">
		<template #default="{ formType, operationMethod, content }">
			<div class="flex flex-col gap-[10px]">
				<DataUpload v-if="
					formType == 'upload' &&
					(operationMethod == 'create' || operationMethod == 'edit')
				" ref="submitUploadFormRef" v-model:loading="uploadLoading" :rules="rules" :editData="editData"
					:formType="formType" :operationMethod="operationMethod" @getList="getList" />
				<DataWebsite v-else-if="
					formType == 'website' &&
					(operationMethod == 'create' || operationMethod == 'edit')
				" ref="submitWebsiteFormRef" :rules="rules" :editData="editData" :formType="formType"
					:operationMethod="operationMethod" @getList="getList" />
			</div>
		</template>
		<template #footer="{ formType, operationMethod }">
			<div class="dialog-footer">
				<Button v-if="
					formType === 'upload' &&
					(operationMethod === 'create' || operationMethod === 'edit')
				" type="primary" :loading="submitLoading" :disabled="uploadLoading" style="width: 126px; height: 39px"
					@click="createOrUpdateUpload(formType, operationMethod)">
					Confirm
				</Button>
				<Button v-if="
					formType === 'website' &&
					(operationMethod === 'create' || operationMethod === 'edit')
				" type="primary" :loading="submitLoading" style="width: 126px; height: 39px"
					@click="createOrUpdateWebsite(formType, operationMethod)">
					Confirm
				</Button>
			</div>
		</template>
	</component>

	<component :is="promptDialog.Dialog">
		<template #default="{ formType, operationMethod, content }">
			<div class="flex flex-col gap-[10px]">
				<DataPrompt v-if="operationMethod == 'prompt'" ref="promptRef" :formType="formType" />
			</div>
		</template>
		<template #footer="{ formType, operationMethod }">
			<div class="dialog-footer">
				<Button v-if="
					(formType === 'upload' && operationMethod === 'prompt') ||
					(formType === 'website' && operationMethod === 'prompt')
				" type="primary" :loading="submitLoading" style="width: 126px; height: 39px" @click="goItPrompt">
					I got it
				</Button>
			</div>
		</template>
	</component>
	<component :is="promptRusultDialog.Dialog">
		<template #default="{ formType, operationMethod, content }">
			<div class="flex flex-col gap-[10px]">
				<DataPromptResult v-if="formType == 'result'" ref="promptRef" :formType="formType"
					:operationMethod="operationMethod" :content="content" />
			</div>
		</template>
		<template #footer="{ formType}">
			<div class="dialog-footer">
				<Button v-if="formType === 'result'" type="primary" style="width: 126px; height: 39px"
					@click="goItPromptResult">
					Ok, got it !
				</Button>
			</div>
		</template>
	</component>
</template>

<style src="./index.scss" scoped lang="scss"></style>
