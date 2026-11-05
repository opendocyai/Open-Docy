<script setup lang="ts">

defineOptions({
    name: 'MemberRolesEdit'
})

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { debounce } from 'lodash'
import { message, Modal, Dropdown, Menu, MenuItem, Button } from 'ant-design-vue'

import { DownOutlined } from '@ant-design/icons-vue'

import { useApiSpace, useApiRoles } from '@/api'

import { useHttp } from '@/client'

import to from 'await-to-js'

const openModal = defineModel<boolean>("openModal", {
    required: false,
});
const props = defineProps({
    currentMember: {
        type: Object,
        default: {},
    },
});
const route = useRoute();
const emit = defineEmits(["onCloseRoleModal", "getList"]);
const { request } = useHttp();
const isLoading = ref(false);
const selectedRoleId = ref<any>("");
const currentRole = ref();

const onConfirm = debounce(async () => {
    isLoading.value = true;
    const dataApi = useApiSpace("members_update")(props.currentMember.id);

    const [error, res] = await to<{ data: any; code: number }>(
        request(dataApi,
            {
                data: {
                    role_id: selectedRoleId.value,
                },
            })
    );
    if (error) {
        isLoading.value = false;
        return;
    }
    if (res?.code == 200) {
        isLoading.value = false;
        message.success("Update successful");
        cancelModal();
        emit("getList");
    }
}, 500);

const cancelModal = () => {
    emit("onCloseRoleModal");
};

interface RoleOption {
    name: string;
    id: string;
    remark?: string;
    icon?: any;
    space_id?: string
}
const getOption = (role_id: any) => {
    return (
        rolesOptionList.value.find((opt) => opt.id === role_id) ||
        ({} as RoleOption)
    );
};
const onSelectRole = (value: any) => {
    selectedRoleId.value = value.id;
    currentRole.value = value;
};
interface RoleItem {
    id: number | string;
    name: string;
    remark: string;
    space_id?: string
}

const rolesOptionList = ref<RoleItem[]>([]);
const getRolesList = async () => {
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiRoles("role_option_list"),
            {
                data: {
                    space_id: route.query.space_id,
                },
                config: { isParams: true }
            })
    );
    if (error) return;
    if (res?.code == 200 && res.data.length > 0) {
        rolesOptionList.value = res.data.filter(
            (item: { role_type: string }) => {
                return item.role_type !== "OWNER";
            }
        );
    }
};
watch(openModal, async (newVal: any) => {
    if (newVal) {
        selectedRoleId.value = props.currentMember.role_id;
        getRolesList();
    }
});
</script>

<template>
    <Modal v-model:open="openModal" title="Edit Roles" :footer="null" :maskClosable="false" centered width="587px"
        @cancel="cancelModal" style="font-family: Inter">
        <div class="section">
            <div class="account-wrap">
                <div class="select-role">
                    <div class="text-[14px] c-[#000000] font-[Inter] mb-[16px]">
                        Select Role
                    </div>
                    <div class="select-card">
                        <Dropdown :trigger="['click']">
                            <a class="ant-dropdown-link" @click.prevent>
                                <div class="display-info flex">
                                    <div class="flex items-center flex-1">
                                        <div class="flex flex-col">
                                            <span class="text-[13px] c-[#000000] flex">
                                                <span class="role-name max-w-[450px]"
                                                    :title="getOption(selectedRoleId).name">
                                                    {{ getOption(selectedRoleId).name }}
                                                </span>
                                                <span class="system" v-if="!getOption(selectedRoleId).space_id">
                                                    System Presets
                                                </span>
                                            </span>
                                            <span class="text-[12px] c-[#BABABA]"
                                                v-if="getOption(selectedRoleId).remark">
                                                {{ getOption(selectedRoleId).remark }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="w-[20px]">
                                        <DownOutlined class="c-[#555555]" />
                                    </div>
                                </div>
                            </a>
                            <template #overlay>
                                <Menu>
                                    <menu-item v-for="item in rolesOptionList" :class="item.id == selectedRoleId ? 'bg-[#2E2BD90D]' : 'bg-[#ffffff]'
                                        " style="margin: 4px 0" @click="onSelectRole(item)">
                                        <div class="flex items-center">
                                            <div class="flex flex-col font-[Inter]">
                                                <span class="text-[13px] c-[#000000] flex">
                                                    <span class="role-name max-w-[500px]" :title="item.name">
                                                        {{ item.name }}
                                                    </span>
                                                    <span class="system" v-if="!item.space_id">
                                                        System Presets
                                                    </span>
                                                </span>
                                                <span class="text-[12px] c-[#BABABA] h-[14px]">
                                                    {{ item.remark }}
                                                </span>
                                            </div>
                                        </div>
                                    </menu-item>
                                </Menu>
                            </template>
                        </Dropdown>
                    </div>
                </div>
            </div>

            <div class="text-right mt-[10px]">
                <Button class="confirm-btn" type="primary" size="large" :loading="isLoading" :disabled="isLoading"
                    @click="onConfirm">
                    Confirm
                </Button>
            </div>
        </div>
    </Modal>
</template>

<style src="./index.scss" scoped lang="scss"></style>
