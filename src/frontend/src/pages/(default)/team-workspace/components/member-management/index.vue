<script setup lang="ts">
defineOptions({
    name: 'MemberManagement'
})

import { MemberRolesEdit, InviteMember } from '../index'

import { LoadingOutlined } from '@ant-design/icons-vue'
import { Button, Table, Avatar, Pagination, message } from 'ant-design-vue'

import { NuxtIcon } from '@/components'
import { useConfirmModal } from '@/composables'
import { useMainStore, useSpaceStore } from '@/stores'
import { formatDateTime } from '@/utils'

import { useHttp } from '@/client'
import { useApiSpace } from '@/api'

import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { debounce } from 'lodash'

import to from 'await-to-js'

const { showConfirm } = useConfirmModal();

const mainStore = useMainStore();
const userInfo: any = computed(() => mainStore.userInfo);
const spaceStore: any = useSpaceStore();
const { request } = useHttp();
const route = useRoute();
const router = useRouter()
const tableData = ref([]);
const tableLoading = ref(false);
const pageSize = ref(10);
const pageNumber = ref(1);
const total = ref();
const columns = ref<any>([
    {
        title: "User",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Roles",
        dataIndex: "role_name",
        key: "role_name",
    },
    {
        title: "Join Date",
        dataIndex: "created_at",
        key: "created_at",
    },
    {
        title: "Last Active Time",
        dataIndex: "last_active",
        key: "last_active",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Operation",
        key: "action",
        fixed: "right",
        width: 160,
    },
]);
const props = defineProps({
    isTeamOwner: {
        type: Boolean,
        default: false,
    },
});
const currentMember = ref<any>();
const openRoleModal = ref<boolean>(false);

const openInviteModal = ref<boolean>(false);

const isLoading = ref(true);

const onOpenRoleModal = (record: any) => {
    openRoleModal.value = true;
    currentMember.value = record;
};
const onCloseRoleModal = () => {
    openRoleModal.value = false;
};


const getList = async () => {
    isLoading.value = true;
    tableLoading.value = true;
    const space_id = route.query.space_id;
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiSpace("members_list"),
            {
                data: {
                    pageNumber: pageNumber.value,
                    pageSize: pageSize.value,
                    space_id: space_id,
                },
            })
    );
    isLoading.value = false;
    tableLoading.value = false;
    if (error) return;
    if (res?.code == 200) {
        tableData.value = res.data.results;
        total.value = res.data.count;
    }
};

function onInviteMembers() {
    openInviteModal.value = true;
}

const closeInviteModal = () => {
    openInviteModal.value = false;
};

function deleteOrRemove(record: any) {
    showConfirm({
        title: props.isTeamOwner
            ? "Confirm Remove Member"
            : "Confirm Leaving the Team",
        content: props.isTeamOwner
            ? "Are you sure you want to remove this member?"
            : "Are you sure you want to leave this team?",
        okText: props.isTeamOwner ? "Remove" : "Leave",
        onOk: async () => {
            props.isTeamOwner ? removeFromTeam(record.id) : leaveFromTeam();
        },
        onCancel: () => {
            console.log("cancel");
        },
    });
}

const leaveFromTeam = debounce(async () => {
    const space_id = route.query.space_id;
    const dataApi = useApiSpace("members_leave")(space_id);
    const [error, res] = await to<{ data: any; code: number }>(
        request(dataApi)
    );

    if (error) return;
    if (res?.code == 200) {
        message.success("Successfully leaving the team");
        if (spaceStore.spaceInfoCurrent.id == space_id) {
            spaceStore.SET_USER_SPACE_CURRENT(undefined);
        }
        router.push('/dashboard');
    }
}, 500);
const removeFromTeam = debounce(async (id: any) => {
    const dataApi = useApiSpace("members_remove")(id);
    const [error, res] = await to<{ data: any; code: number }>(
        request(dataApi)
    );

    if (error) return;
    if (res?.code == 200) {
        await getList();
        message.success("Successfully removed member");
    }
}, 500);

function handleChangePage() { }

onMounted(() => {
    getList();
});
</script>

<template>
    <div class="w-full h-full flex justify-center items-center" style="height: calc(100vh - 150px)" v-if="isLoading">
        <LoadingOutlined spin class="text-[20px] c-[#2E2BD9]" />
    </div>
    <div class="member-wrap" v-else>
        <div class="flex justify-between items-center">
            <div class="title">
                Member management
                <span class="text-[12px] fw-400 c-[#999999]">
                    {{ `(${tableData.length})` }}
                </span>
            </div>
            <div class="team-info-right">
                <Button v-if="isTeamOwner" type="primary" @click="onInviteMembers"
                    class="invite-btn font-[Inter] h-[34px]">
                    <NuxtIcon name="invite-icon" class="c-[#ffffff] icon" /> Invite members
                </Button>
            </div>
        </div>
        <Table v-if="tableData.length > 0" :columns="columns" :data-source="tableData" :loading="tableLoading"
            :pagination="false" :scroll="{ x: 'max-content' }" class="member-table"
            style="font-size: 13px; color: #999999; font-family: Inter">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <div class="user-info">
                        <Avatar v-if="record?.avatar" :src="record?.avatar" :size="48" style="margin-right: 10px" />
                        <Avatar v-else :size="48" :style="{ 'background-color': record?.default_color }"
                            style="display: flex; align-items: center; margin-right: 10px">
                            {{ record?.fullname?.substring(0, 1).toUpperCase() }}
                        </Avatar>
                        <div class="name-email">
                            <span class="name">{{ record.fullname }}</span>
                            <span class="email">{{ record.email }}</span>
                        </div>
                    </div>
                </template>
                <template v-if="column.key === 'role_name'">
                    <span style="color: #2e2bd9">{{ record.role_name }}
                    </span>
                </template>
                <template v-if="column.key === 'created_at'">
                    <span>
                        {{ formatDateTime(record.created_at) }}
                    </span>
                </template>
                <template v-if="column.key === 'last_active'">
                    <span>
                        {{ formatDateTime(record.last_active) }}
                    </span>
                </template>
                <template v-if="column.key === 'status'">
                    <span class="flex gap-[6px] items-center">
                        <span class="status-dot" :class="record.status ? 'bg-[#17C653]' : 'bg-[#D9D9D9]'"></span>
                        <span :class="record.status ? 'c-[#17C653]' : 'c-[#D9D9D9]'">
                            {{ record.status ? "Activated" : "Invitation Sent" }}
                        </span>
                    </span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <div class="flex">
                        <Button v-if="
                            !(record.email === userInfo.email) &&
                            record.role_type !== 'owner' &&
                            isTeamOwner
                        " type="text" @click="onOpenRoleModal(record)" style="color: #2e2bd9; font-family: Inter">Edit
                            Roles</Button>
                        <Button v-if="
                            !(record.email === userInfo.email) &&
                            record.role_type !== 'owner' &&
                            isTeamOwner
                        " danger type="text" class="c-[#E62D05]" @click="deleteOrRemove(record)"
                            style="color: #e62d05; font-family: Inter">Remove from Team</Button>
                        <Button danger type="text" v-if="
                            record.email === userInfo.email && record.role_type !== 'owner'
                        " style="color: #e62d05; font-family: Inter" @click="deleteOrRemove(record)">
                            Leave from Team</Button>
                        <span v-if="
                            record.email === userInfo.email && record.role_type === 'owner'
                        "></span>
                    </div>
                </template>
            </template>
        </Table>
        <div class="flex justify-end mt-[20px]" v-if="total > 10">
            <Pagination v-model:current="pageNumber" v-model:pageSize="pageSize" show-size-changer :total="total"
                :show-total="(total: any) => `Total ${total} items`" @change="handleChangePage"
                class="table-pagination" />
        </div>
    </div>

    <InviteMember :openInviteModal="openInviteModal" @getList="getList" @closeInviteModal="closeInviteModal" />
    <MemberRolesEdit :openModal="openRoleModal" :currentMember="currentMember" @getList="getList"
        @onCloseRoleModal="onCloseRoleModal" />
</template>

<style src="./index.scss" scoped lang="scss"></style>
