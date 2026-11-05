<script setup lang="ts">
defineOptions({
	name: 'TeamPersonal',
})

import { ref, useTemplateRef, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useApiSpace, useApiMenu, useApiRoles, useApiInnerMessage } from '@/api';



import { cloneDeep } from 'lodash';
import { useCopyText, useDialog, type DialogExpose } from '@/composables';
import { message, Dropdown, Avatar, Button } from 'ant-design-vue';
import { useHttp } from '@/client';

import to from 'await-to-js'

import { useAsideStore, useCommonStore, useMainStore, useRoleStore, useSpaceStore } from '@/stores';

import { NuxtIcon, TeamSpaceModal, DownOutlined, PlusOutlined } from '@/components';

const { request } = useHttp()

const router = useRouter();

const mainStore: any = useMainStore();
const spaceStore: any = useSpaceStore();
const asideStore = useAsideStore();
const roleStore = useRoleStore();
const commonStore: any = useCommonStore();

const { copy } = useCopyText()

const submitFormRef = useTemplateRef<any>('submitFormRef');

const ownerCount = ref<number>(0);

const menuList = ref<any[]>([]);
const rolePermsList = ref<any>()

const spaceName = computed(() => {
	const isPersonal = spaceStore.spaceInfoCurrent?.space_type == 'personal'
	if (isPersonal) {
		return spaceStore.spaceInfoCurrent?.display;
	} else {
		return spaceStore.spaceInfoCurrent?.name;
	}
})

watch(
	() => spaceStore.spaceInfoList?.team_workspace,
	(newVal) => {
		if (newVal) {
			const list = newVal.filter((item: any) => item.role_type === "owner")
			ownerCount.value = list.length;
		}
	},
	{ immediate: true }
);

const onChangeSpace = async (item: any, type?: string) => {
	spaceStore.SET_USER_SPACE_CURRENT(item);
	if (type !== 'isRefresh') {
		router.push(`/dashboard`);
	}
	await getMenuList(item);
	await getRolePermsList(item);
	await getNotificationUnreadCount();
}

const getMenuList = async (item: any) => {
	const [error, result] = await to<any>(request(
		useApiMenu("menu_list"),
		{
			data: {
				space_id: item.id,
				role_id: item.role_id,
			},
		}
	));
	if (error) return;
	if (result?.code == 200) {
		asideStore.CLEAR_ASIDE_MENU()
		menuList.value = result.data;
		asideStore.SET_ASIDE_MENU(menuList.value)
	}
}
const getRolePermsList = async (item: any) => {
	const [error, result] = await to<any>(request(
		useApiRoles("get_role_perms")(item.role_id),
		{}
	));
	if (error) return;
	if (result?.code == 200) {
		rolePermsList.value = result.data;
		roleStore.SET_ROLE_PERMS(rolePermsList.value);
	}
}
const getNotificationUnreadCount = async () => {
	const [error, result] = await to(request(
		useApiInnerMessage("get_inner_message_count_unread"),
		{
			data: {
				space_id: spaceStore.spaceInfoCurrent?.id,
			},
		}
	));

	if (error) return;
	if (result?.code == 200) {
		commonStore.SET_NOTIFICATION_COUNT(result.data?.unread_count);
	}
}


const meDialog: DialogExpose = useDialog({
	center: true,
	width: 686,
	showClose: false,
	maskClosable: false,
	centered: true,
	ok: async (_: any, okLoadingState: (state: boolean) => void) => {
		const { ruleFormRef, toCreateTeamWorkspace } = submitFormRef.value;
		okLoadingState(true);
		try {
			await ruleFormRef.validate()
			const [err, res] = await toCreateTeamWorkspace();
			if (!err && res.code == 200) {
				await getSpaceDetail(res?.data.id);
				await message.success("Team space created successfully");
			}
			meDialog.close();
		} catch (e) {
			console.log("🚀 ~ ok ~ e: ", e);
		} finally {
			okLoadingState(false);
		}
	}
})

const getSpaceDetail = async (id: string) => {
	const [error, result] = await to<any>(
		request(useApiSpace("get_space_detail")(id))
	);
	if (error) return;
	if (result?.code == 200) {
		spaceStore.SET_USER_SPACE_CURRENT();
		await getUserSpace('add');
	}
}



const newWorkspace = () => {
	meDialog.setTitle('Create Your Team Space');
	meDialog.open({ formType: 'add' });
}

const onCopyText = async (text: string) => {
	if (text) {
		await copy(text);
		await message.success("Copy successful");
	}
}


const getUserSpace = async (type?: string) => {
	const [error, result] = await spaceStore.GET_SPACE_LIST()
	if (error) return;
	if (result?.code === 200) {
		const workspaces = result?.data;
		let target = null;

		const { spaceInfoCurrent, spaceInfoList } = spaceStore;

		if (type === "add") {
			target = spaceInfoList.team_workspace.find((item: any) => item.role_type == 'owner')
		} else {
			const currentSpace = cloneDeep(spaceInfoCurrent);
			if (currentSpace?.id) {
				const oldInfo = currentSpace.space_type == 'personal' ? spaceInfoList.personal_workspace : spaceInfoList.team_workspace;
				target = oldInfo.find((item: any) => item.id == currentSpace?.id)
			} else {
				target = workspaces.personal_workspace?.[0] ?? workspaces.team_workspace?.[0];
			}
		}

		await onChangeSpace(target, type === "add" ? undefined : "isRefresh");
	}
}

watch(
	() => mainStore.userInfo,
	(newVal: any) => {
		if (newVal) {
			getUserSpace();
		}
	},
	{ immediate: true }
);

</script>

<template>
	<div class="team-personal" :class="{
		'px-[6px]!': asideStore.collapsed,
	}">
		<Dropdown :trigger="['click']" overlay-class-name="team-personal-dropdown">
			<div class="ant-dropdown-link" :class="{
				'px-[10px]! bg-transparent!': asideStore.collapsed,
			}">
				<div class="ant-dropdown-link-name">
					<div class="ant-overlay-card-item-icon">
						<Avatar v-if="spaceStore.spaceInfoCurrent?.avatar" :src="spaceStore.spaceInfoCurrent?.avatar"
							alt="" shape="square" :size="28" />
						<Avatar v-else shape="square" :size="28" :style="{
							fontSize: '16px',
							'background-color': spaceStore.spaceInfoCurrent?.default_color,
						}" class="ant-overlay-card-item-icon-avatar">
							<span>{{ spaceName?.substring(0, 1)?.toUpperCase() }}</span>
						</Avatar>
					</div>
					<div class="team-name" v-if="!asideStore.collapsed">
						<span :title="spaceName">
							{{ spaceName }}
						</span>
					</div>
				</div>
				<div class="team-icon">
					<DownOutlined />
				</div>
			</div>

			<template #overlay>
				<div class="ant-overlay">
					<div class="ant-overlay-item">
						<div class="ant-overlay-title">Personal space</div>
						<div :class="spaceStore.spaceInfoCurrent?.id == item?.id
							? 'ant-overlay-card ant-overlay-card-selected'
							: 'ant-overlay-card'
							" v-for="(item, index) in spaceStore.spaceInfoList
								?.personal_workspace" :key="index" @click="onChangeSpace(item)">
							<div class="ant-overlay-card-item">
								<div class="ant-overlay-card-item-icon">
									<Avatar v-if="item?.avatar" :src="item?.avatar" alt="" shape="square" :size="28" />
									<Avatar v-else shape="square" :size="28"
										:style="{ 'background-color': item?.default_color }"
										class="ant-overlay-card-item-icon-avatar">
										{{ item?.display?.substring(0, 1).toUpperCase() }}
									</Avatar>
								</div>
								<div class="ant-overlay-card-item-info pr-[0]!">
									<div class="info-name" :title="item.display">
										{{ item.display }}
									</div>
									<div @click.stop="onCopyText(item.display)" title="Copy" class="copy-btn">
										<NuxtIcon name="copy" class="text-[10px]" />
									</div>
								</div>
							</div>
							<div class="id-box">
								ID:{{ item.id }}
								<div @click.stop="onCopyText(item.id)" title="Copy" class="copy-btn">
									<NuxtIcon name="copy" class="text-[10px]" />
								</div>
							</div>
							<span class="selected-icon" v-if="spaceStore.spaceInfoCurrent?.id == item?.id">
								<NuxtIcon name="selected" class="text-[13px] pl-[2px]" />
							</span>
						</div>
					</div>
				</div>
			</template>
		</Dropdown>
	</div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
