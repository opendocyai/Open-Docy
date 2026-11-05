<script setup lang="ts">

defineOptions({
    name: 'InviteMember'
})

import { Tag, Input, Modal, Button, Menu, MenuItem, Dropdown, message } from "ant-design-vue";
import { DownOutlined } from '@ant-design/icons-vue'

import { useMainStore } from '@/stores'

import { ref, computed, watch } from 'vue'

import { useRoute } from 'vue-router'

import { useHttp } from '@/client'
import { useApiSpace, useApiRoles } from '@/api'

import to from 'await-to-js'

import { debounce } from 'lodash'

const openInviteModal = defineModel<boolean>("openInviteModal", {
    required: false,
});
const emit = defineEmits(["closeInviteModal", "getList"]);
const { request } = useHttp();
const loading = ref<boolean>(false);
const selectedExpire = ref("7");
const copyLinkValue = ref("");
const route = useRoute();

interface EmailItem {
    value: string;
    isValid: boolean;
}

const inputValue = ref("");
const emailList = ref<EmailItem[]>([]);

const simpleEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;

const validateEmail = (email: string): boolean => {
    return simpleEmailRegex.test(email.trim());
};

const isDisabled = computed(() => {
    if (simpleEmailRegex.test(inputValue.value)) return false;
    if (emailList.value.length > 0) return false;
    return true;
});
const userInfo: any = useMainStore().userInfo;


const inviteUser = debounce(async () => {
    const space_id = route.query.space_id;

    const emailListArr: string[] = emailList.value
        .filter((item) => item.isValid)
        .map((item) => item.value);
    if (emailListArr.length == 0) {
        if (inputValue.value.toLowerCase() === userInfo?.email?.toLowerCase()) {
            errorTips.value = "You're not able to send an invite to yourself";
            return;
        }
        if (simpleEmailRegex.test(inputValue.value)) {
            emailListArr.push(inputValue.value.trim());
        }
    }

    const params = {
        email_list: emailListArr,
        invite_link: copyLinkValue.value,
        space_id: space_id,
        expire_days: selectedExpire.value,
        role_id: selectedRoleId.value
    };

    loading.value = true;
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiSpace("email_invite"),
            { data: params })
    );
    loading.value = false;

    if (error) return;
    if (res?.code == 200) {
        message.success("Invitation email has been sent successfully");
        cancelModal();
        emit("getList");
    }
}, 500);

function cancelModal() {
    inputValue.value = "";
    emailList.value = [];
    emit("closeInviteModal");
}

const errorTips = ref("");

const addEmail = () => {
    if (!inputValue.value.trim()) return;
    const emails = inputValue.value
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e.length > 0);

    emails.forEach((email) => {
        if (!emailList.value.find((item) => item.value === email)) {
            emailList.value.push({
                value: email,
                isValid: validateEmail(email),
            });
            errorTips.value = "";
        }
    });

    inputValue.value = "";
};

const handleInputKeyUp = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    if (inputValue.value.toLowerCase() === userInfo?.email?.toLowerCase()) {
        errorTips.value = "You're not able to send an invite to yourself";
        return;
    }
    if (!simpleEmailRegex.test(inputValue.value)) {
        errorTips.value = `"${inputValue.value}" is not a valid email`;
        return;
    }
    addEmail();
};


function removeEmail(email: string) {
    emailList.value = emailList.value.filter((item) => item.value !== email);
}

const getInviteLink = async () => {
    copyLinkValue.value = "";
    const space_id = route.query.space_id;
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiSpace("invite_link"),
            {
                data: {
                    space_id: space_id,
                    expire_day: selectedExpire.value,
                },
            })
    );
    if (error) return;
    if (res?.code == 200) {
        copyLinkValue.value = res.data.invite_link;
    }
};
const selectedRoleId = ref<any>("");
const currentRole = ref();

interface RoleOption {
    name: string;
    id: string;
    remark?: string;
    icon?: any;
}
const getOption = (role_id: any): any => {
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
}
const rolesOptionList = ref<RoleItem[] | any[]>([]);
const getRolesList = async () => {
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiRoles("role_option_list"),
            {
                data: {
                    space_id: route.query.space_id,
                },
                config: {isParams: true}
            })
    );
    if (error) return;
    if (res?.code == 200) {
        if (res.data.length > 0) {
            selectedRoleId.value = res.data[1].id;
            rolesOptionList.value = res.data.filter((item: { role_type: string; }) => {
                return item.role_type !== 'OWNER'
            })
        }
    }
};

watch(
    () => inputValue.value,
    (newVal) => {
        if (!newVal) {
            errorTips.value = "";
        }
    }
);

watch(openInviteModal, async (newVal: any) => {
    if (newVal) {
        getInviteLink();
        getRolesList();
    }
});
</script>

<template>
    <Modal v-model:open="openInviteModal" title="Invite members" :footer="null" :maskClosable="false" centered
        width="587px" @cancel="cancelModal" style="font-family: Inter">
        <div class="section">
            <div class="section-title">
                <div class="label">
                    <img src="@/assets/images/invite-account.png" alt="" />
                    Email Address
                </div>
            </div>

            <div class="account-wrap">
                <div class="select-wrap">
                    <div class="email-input-wrapper" :style="{ padding: emailList.length ? '4px' : '0' }">
                        <Tag v-for="(item, index) in emailList" :key="index" :color="item.isValid ? '' : 'error'"
                            closable @close="removeEmail(item.value)" @mousedown.stop
                            style="display: flex; align-items: center">
                            <span class="tag-span" :title="item.value">
                                {{ item.value }}
                            </span>
                        </Tag>

                        <Input v-model:value="inputValue" class="email-input" :style="{
                            backgroundColor: emailList.length ? '#FFFFFF' : '#F9F9F9',
                        }" @keyup="handleInputKeyUp" placeholder="Invite members via email." />
                    </div>
                    <div class="min-h-[22px]">
                        <span v-if="errorTips" class="c-[#F63C47] text-[12px]">
                            {{ errorTips }}
                        </span>
                    </div>
                </div>
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
                                                    <span class="role-name max-w-[500px]" :title="item.name">{{
                                                        item.name
                                                        }}</span>
                                                    <span class="system" v-if="!item.space_id">
                                                        System Presets
                                                    </span>
                                                </span>
                                                <span class="text-[12px] c-[#BABABA] h-[14px]">{{ item.remark }}</span>
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
                <Button class="invite-btn" type="primary" size="large" :loading="loading" :disabled="isDisabled"
                    @click="inviteUser">
                    Invite
                </Button>
            </div>
        </div>
    </Modal>
</template>

<style src="./index.scss" scoped lang="scss"></style>
