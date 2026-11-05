<script setup lang="ts">
import {
	Layout,
	LayoutHeader,
	Button,
	Spin,
	LayoutSider,
	LayoutContent,
	message,
	Dropdown,
	Form,
	FormItem,
	Input,
	Textarea,
	Menu,
	MenuItem
} from "ant-design-vue";

import {
	AuditPublish,
	NuxtIcon,
	ReteComponentSidebar,
	ReteComponentStepPanel,
	ReteEditor,
	importEditor,
	processNodeConnections,
	useRete,
	useReteLabelsStore,
	useReteRun,
	useReteStore
} from '@docyai/rete'

import { ref, useTemplateRef } from 'vue';

import { useCopyText } from '@/composables/copyText'

import { useDialog, type DialogExpose } from '@/composables/dialog'

import { useExportAsImage } from '@/composables/exportAsImage'

import { useUploadPresigned } from '@/composables/uploadPresigned'

import { base64ToFile } from '@/shared/utils/files'

import { useRoute, useRouter } from 'vue-router';

import { cloneDeep } from 'lodash';

import { useApiAgent } from '@/api';

import { useHttp } from '@/client';

import to from 'await-to-js'

definePage({
	name: 'audit',
	meta: {
		layout: "custom",
	}
});

const route = useRoute()
const router = useRouter()

const reteLabelsStore = useReteLabelsStore()

const { pre_update_agent } = useReteRun({ route })

const { request } = useHttp()

const { upload_presigned_url } = useUploadPresigned();

const {
	editor,
	reteInfo: info,
	setAgentInfo,
	agentInfo,
	nodeEventBus,
	isImportEditor,
	setIsImportEditor,
	setReteGroups
} = useRete()

const { copy } = useCopyText();

const reteStore = useReteStore();

const reteEditorRef = useTemplateRef<any>('reteEditorRef');
console.log("🚀 ~  ~ reteEditorRef: ", reteEditorRef);

const isBackShow = ref<boolean>(false);

const previewImage = ref<any | null>(null);

const isLoading = ref<boolean>(false);
const isDropdownVisible = ref<boolean>(false);


reteLabelsStore.SET_LABELS()


async function code_id_template(isImportEditor: boolean = false) {
	if (!route.query.code) return;
	const dataApi = useApiAgent("code_id_template")(route.query.code);
	const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
	if (error) return;
	if (res?.code == 200) {
		info.value = res.data;
		await get_agent_detail(info.value?.agent_id)
		const { template_json } = info.value
		if (template_json?.groups) {
			setReteGroups(template_json.groups);
		}
		if (template_json?.nodes && !isImportEditor) {
			const json = processNodeConnections(template_json);
			setIsImportEditor(true);
			setTimeout(async () => {
				await importEditor(editor.value, json);
			}, 100);
		}
	}
}


code_id_template()

async function get_agent_detail(id: string) {
	const dataApi = useApiAgent("get_agent_detail")(id);
	const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
	if (error) return;
	if (res?.code == 200) {
		console.log(res.data, "data.value.data");
		setAgentInfo(res.data);
	}
}

const lockedDialog: DialogExpose = useDialog({
	width: 400,
	centered: true,
	closable: false,
	maskClosable: false,
});

const backDialog: DialogExpose = useDialog({
	width: 510,
	centered: true,
	header: false,
	footer: false,
	maskClosable: false,
});


const myDialog: DialogExpose = useDialog({
	width: 510,
	centered: true,
	maskClosable: false,
	ok: async ({ formType, data }: any, okLoadingState: (loading: boolean) => void) => {
		console.log("🚀 ~ ok ~ okLoadingState: ", okLoadingState);
		console.log("🚀 ~ ok ~ { formType, data }: ", { formType, data });
	},
});

const unpublishedDialog: DialogExpose = useDialog({
	width: 510,
	centered: true,
	header: false,
	closable: false,
	maskClosable: false,
	ok: async (_: any, okLoadingState: (loading: boolean) => void) => {
		console.log("🚀 ~ ok ~ okLoadingState: ", okLoadingState);
	},
});

function back() {
	backDialog.open({ formType: "back" });
}

const _back = () => {
	backDialog.close();
	router.replace("/agent");
};
console.log("🚀 ~  ~ _back: ", _back);

const handleEditName = () => {
	myDialog.setAttr({ width: 510, wrapClassName: '' });
	myDialog.setTitle("Edit Audit");
	myDialog.open({
		formType: "edit",
		data: cloneDeep(info.value),
	});
};

const handleCopy = async () => {
	await copy(agentInfo.value?.id)
	await message.success({ content: "Copied successfully" });
}

const handleUnPublished = () => {
	unpublishedDialog.open({ formType: "unpublished" });
};

const handleSaveAgent = async () => {
	isLoading.value = true;
	isDropdownVisible.value = false;

	if (!isBackShow.value) {
		const [error, res] = await pre_update_agent({ isJson: true });
		if (error) return
		if (res?.code == 200000) {
			lockedDialog.open({ formType: 'locked', data: res?.data })
			return
		}
	}
	const [error, res] = await add_or_update_agent();
	if (isBackShow.value) {
		backDialog.close();
		isBackShow.value = false;
	}
	if (error) return;
	await draft_save()
};

const add_or_update_agent = async () => {
	const { editorRef } = reteEditorRef.value;
	const base64 = await useExportAsImage(editorRef);
	const file = base64ToFile(base64, `${info.value?.name}.png`);
	const fileInfos = {
		row: file,
		info: {
			file_name: file.name,
			category: "audit",
			file_type: file.type,
			file_size: file.size,
		},
	};
	await save_file(fileInfos);

	const [error, res] = await to<{ data: any; code: number }>(
		request(useApiAgent("add_or_update_agent"),
			{
				data: {
					agent_id: info.value?.agent_id,
					code: route.query.code,
					preview_image: previewImage.value,
				},
			})
	);
	isLoading.value = false;
	if (error) return [error, res];
	if (res?.code == 200) {
		message.success({ content: "Agent saved successfully" });
		await get_agent_detail(info.value?.agent_id);
	}
	return [error, res];
};

const save_file = async (fileInfos: any) => {
	const { data, error } = await upload_presigned_url(fileInfos);
	if (error.value) return;
	if (data.value?.key) {
		previewImage.value = data.value?.key;
	}
};

const publishTipDialog: DialogExpose = useDialog({
	width: 391,
	centered: true,
	header: false,
	footer: false,
	closable: false,
	maskClosable: false,
});

const handlePublish = async () => {
	isDropdownVisible.value = false;
	if (agentInfo.value.market_record_id) {
		publishTipDialog.open({ formType: "back" });
		return
	}

	await marketplace_before_published();
	if (isBackShow.value) {
		backDialog.close();
	}
};

async function marketplace_before_published() {
	const [error, res] = await to<{ data: any; code: number }>(
		request(useApiAgent("marketplace_before_published"),
			{
				data: {
					code: route.query.code,
				},
			})
	);

	if (error) return;
	if (res?.code == 200) {
		myDialog.setAttr({ width: 610, wrapClassName: 'publish-agent-modal' });
		myDialog.setTitle("Publish to Marketplace");

		if (res.data) {
			myDialog.open({
				formType: "publish",
				data: cloneDeep(res.data),
			});
		} else {
			const { description } = info.value;
			info.value.brief_description = description;
			info.value.description = '';
			myDialog.open({
				formType: "publish",
				data: cloneDeep(info.value),
			});
		}
	}
}


function onConfirm() {
	publishTipDialog.close();
}


function handleLocked() {
	lockedDialog.close();
	_back()
}

const draft_save = async () => {
	const [err, res] = await to<{ data: any; code: number }>(
		request(useApiAgent("draft_save"),
			{
				data: {
					code: route.query.code,
				},
			})
	);
	if (err) return
	if (res?.code == 200) {
		_back();
	}
}

async function handleSaveDraft() {
	const [err, res] = await pre_update_agent({ isJson: true, save_as_draft: true });
	if (err) return
	if (res?.code == 200) {
		await draft_save()
	}
	if (res?.code == 200000) {
		lockedDialog.open({ formType: 'locked', data: res?.data })
	}
}
async function handleUpdatePublished({ key }: any) {
	console.log(key, "key");
	isBackShow.value = true;
	backDialog.close();
	if (key == 1) {
		await handleSaveAgent();
	}
	if (key == 2) {
		await handlePublish();
	}
}
</script>

<template>
	<Layout class="w-full h-full">
		<LayoutHeader>
			<div class="back">
				<Button type="link" @click="back">
					<NuxtIcon name="back" />
					Back
				</Button>
			</div>
			<div class="flex items-center gap-[10px]">
				<div class="title">
					<span>{{ info?.name }}</span>
					<NuxtIcon name="edit" class="cursor-pointer" @click="handleEditName" />
				</div>
				<div class="flex-none">
					<Dropdown :arrow="{ pointAtCenter: true }">
						<span
							class="bg-[#F8F9FF] flex items-center gap-[2px] px-[10px] h-[30px] c-[#2E2BD9] cursor-pointer text-[14px] font-[Inter] fw-400 rounded-[5px] border-width-1 border-[#E7EDFF]">
							<NuxtIcon name="link-icon" class="text-[16px]" />
							<span class="">ID</span>
						</span>
						<template #overlay>
							<div class="bg-white px-[15px] py-[8px] rounded-[5px] flex items-center gap-[30px]">
								<span>Agent ID: {{ agentInfo?.id }}</span>
								<Button size="small" @click="handleCopy"
									class="flex items-center justify-center bg-[#EBEBEB]">
									<template #icon>
										<NuxtIcon name="copy-key" class="lh-[1]" />
									</template>
								</Button>
							</div>
						</template>
					</Dropdown>
				</div>
			</div>
			<div class="btn-publish">
				<Button danger v-if="agentInfo?.published" @click="handleUnPublished" :disabled="isLoading">
					Unpublish
				</Button>
				<Dropdown :trigger="['click']" v-model:open="isDropdownVisible">
					<Button type="primary" :disabled="isLoading" :style="{
						color: '#ffffff',
						backgroundColor: agentInfo?.status == 'active' ? '#17C653' : '#2E2BD9',
					}" @click.prevent="isDropdownVisible = true">
						{{ agentInfo?.status == "active" ? "Update" : "Publish" }}
					</Button>
					<template #overlay>
						<div class="dropdown-menu">
							<div class="dropdown-menu--item" @click.stop>
								<div class="dropdown-menu--item--info">
									<span class="dropdown-menu--item--info--title">
										{{
											agentInfo?.status == "active"
												? "Update Current Agent"
												: "Publish Current Agent"
										}}
									</span>
								</div>
								<div class="r-icon text-[20px]!">
									<NuxtIcon name="close" @click.prevent="isDropdownVisible = false" />
								</div>
							</div>
							<div class="dropdown-menu--line"></div>
							<div class="dropdown-menu--item" @click.prevent="handleSaveAgent">
								<div class="dropdown-menu--item--info">
									<div class="dropdown-menu--item--info--icon">
										<NuxtIcon name="stm-agent" />
									</div>
									<span class="dropdown-menu--item--info--name">
										{{
											agentInfo?.status == "active"
												? "Update to Personally "
												: "Publish to Personally"
										}}
									</span>
								</div>
							</div>
							<div class="dropdown-menu--item" @click.prevent="handlePublish" v-if="false">
								<div class="dropdown-menu--item--info">
									<div class="dropdown-menu--item--info--icon">
										<NuxtIcon :name="agentInfo?.status == 'active' ? 'ptm' : 'ptm-up'" />
									</div>
									<span class="dropdown-menu--item--info--name">
										{{
											agentInfo?.status == "active"
												? "Update to Personally & Marketplace"
												: "Publish to Personally & Marketplace"
										}}
									</span>
								</div>
							</div>
						</div>
					</template>
				</Dropdown>
			</div>
		</LayoutHeader>
		<Layout class="audit-container">
			<Spin :spinning="isLoading" class="spin-overlay" v-if="isLoading" />
			<LayoutSider v-model:collapsed="reteStore.collapsed" :trigger="null" :width="reteStore.width" collapsible>
				<rete-component-sidebar />
			</LayoutSider>
			<LayoutContent>
				<rete-editor ref="reteEditorRef" />
			</LayoutContent>
			<div class="relative">
				<rete-component-step-panel />
			</div>
		</Layout>
	</Layout>

	<component :is="lockedDialog.Dialog">
		<template #default="{ data }">
			<div class="font-Inter-SemiBold font-Inter">Editing Locked</div>
			<div class="text-[12px] font-[Inter] fw-400 c-[#212121] text-center">
				<p class="mb-0 lh-[26px]">
					This Docy Agent is currently being edited by
					<span class="c-[#5194FD]">{{ data?.edit_user }}</span>.
				</p>
				<p class="mb-0 lh-[26px]">Editing is temporarily locked to prevent conflicts.</p>
				<p class="mb-0 lh-[26px]">Please try again later.</p>
			</div>
		</template>
		<template #footer>
			<div class="dialog-footer">
				<Button type="primary" class="px-[16px] bg-[#7f63f4] mb-[10px]" @click="handleLocked">
					Got It
				</Button>
			</div>
		</template>
	</component>

	<component :is="myDialog.Dialog">
		<template #default="{ formType, data }">
			<template v-if="formType == 'edit'">
				<Form :model="data" layout="vertical">
					<form-item label="Name" name="name" :rules="[
						{
							max: 50,
							message: 'Agent name should be no more than 50 characters.',
							trigger: ['change', 'blur'],
						},
					]">
						<Input v-model:value="data.name" :maxlength="50" show-count />
					</form-item>
					<form-item label="Description" name="description">
						<Textarea v-model:value="data.description" :maxlength="500" show-count
							:auto-size="{ minRows: 4 }" />
					</form-item>
				</Form>
			</template>
			<template v-if="formType == 'publish'">
				<audit-publish :data="data" ref="auditPublishRef" :info="info" />
			</template>
		</template>
	</component>

	<component :is="unpublishedDialog.Dialog">
		<div class="font-Inter-Medium font-Inter">Unpublish agent template</div>
		<div class="p-[15px] pb-[5px] text-center">
			<p class="c-[#BABABA] font-[Inter] fw-400 text-[14px]">
				This will remove the Agent template from the Marketplace and make it unavailable
				for others.
			</p>
		</div>
	</component>

	<component :is="backDialog.Dialog">
		<template #default>
			<div class="text-[38px] flex justify-center mb-[15px]">
				<NuxtIcon name="warning" class="c-[#FFA500]" />
			</div>
			<div class="font-[Inter-Medium,Inter] font-[Inter] flex justify-center text-[24px]">Exit Editing?</div>
			<div class="p-[15px] pb-[5px] text-center">
				<p class="c-[#BABABA] font-[Inter] fw-400 text-[14px]">
					Your changes have not been saved, Please choose how to handle your edits.
				</p>
			</div>
			<div class="flex items-center justify-center gap-[15px] font-[Inter] fw-400 text-[14px]">
				<Button type="primary" ghost @click="handleSaveDraft">Save Draft</Button>
				<Dropdown placement="bottomRight" arrow>
					<Button type="primary">
						<div class="flex items-center gap-[5px] fill-revert-layer">
							<span>Update Published</span>
							<NuxtIcon name="down-chevron" />
						</div>
					</Button>
					<template #overlay>
						<Menu @click="handleUpdatePublished">
							<menu-item key="1"> Only update for me</menu-item>
							<menu-item key="2" v-if="false"> Update for me + public template</menu-item>
						</Menu>
					</template>
				</Dropdown>
			</div>
		</template>
	</component>


	<component :is="publishTipDialog.Dialog">
		<template #default>
			<div class="flex flex-col items-center justify-center pt-[10px] pb-[16px]">
				<div class="font-[Inter] fw-600 text-[16px] c-[#000] text-center">
					Publish agent template
				</div>
				<div class="text-center">
					<div class="c-[#BABABA] font-[Inter] fw-400 text-[14px] my-[26px]">
						You can't republish an agent duplicated from Marketplace.
					</div>
				</div>
				<Button type="primary" class="w-[102px] h-[38px] text-[14px] font-[Inter]" @click="onConfirm">
					I Got it
				</Button>
			</div>
		</template>
	</component>
</template>

<style src="./index.scss" lang="scss" scoped></style>
