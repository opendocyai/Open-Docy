<script setup lang="ts">
import { ref, h, watch, computed } from "vue";
const openInviteModal = defineModel<boolean>("openInviteModal", {
    required: false,
});
const props = withDefaults(
    defineProps<{
        pageType?: string;
    }>(),
    {
        pageType: "",
    }
);
const emit = defineEmits(["closeInviteModal"]);
const route = useRoute();

const { request } = useHttp();
const loading = ref<boolean>(false);
const copyLinkValue = ref("");
const copyText = useCopyText();
const emailContent = ref("");

const copyLink = async () => {
    if (copyLinkValue.value) {
        await copyText.copy(copyLinkValue.value);
        message.success("Copy successful");
    }
};

const sendEmail = async () => {
    const url = new URL(copyLinkValue.value);
    const codeVal = url.searchParams.get("code");
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
        emails: emailListArr,
        link_code: codeVal,
        email_content: emailContent.value,
    };
    loading.value = true;
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiActivity("send_email"),
            {
                data: params,
                config: { isAuth: true }
            })
    );
    loading.value = false;
    if (error) return;
    if (res?.code == 200) {
        message.success("Send email successful");
        emit("closeInviteModal");
    }
};

const cancelModal = () => {
    emit("closeInviteModal");
};

const getShareLink = async () => {
    openInviteModal.value = true;
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiActivity("share_link"),
            {
                data: {
                    task_id: route.query.task_id,
                    page: props.pageType,
                },
            })
    );
    if (error) return;
    if (res?.code == 200) {
        copyLinkValue.value = res?.data.share_link;
    }
};

watch(
    () => openInviteModal.value,
    async (newVal: any) => {
        if (newVal) {
            getShareLink();
        }
    },
    { deep: true, immediate: true }
);

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const isValidEmail = (email: string) => emailRegex.test(email);

import { Tag, Input, message, Modal, Button, Textarea } from "ant-design-vue";
import { useMainStore } from "@/stores";
import { useApiActivity } from "@/api";
import { useCopyText } from "@/composables";
import { useRoute } from "vue-router";
import { useHttp } from "@/client";

import { NuxtIcon } from '@/components'
import to from "await-to-js";

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
const errorTips = ref("");
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

const removeEmail = (email: string) => {
    emailList.value = emailList.value.filter(
        (item: { value: string }) => item.value !== email
    );
};

watch(
    () => inputValue.value,
    (newVal) => {
        if (!newVal) {
            errorTips.value = "";
        }
    }
);
</script>

<template>
    <Modal v-model:open="openInviteModal" title="Share Task" :footer="null" :maskClosable="false" centered width="587px"
        @cancel="cancelModal">
        <div class="section">
            <div class="section-title">
                <div class="label">
                    <img src="@/assets/images/invite-account.png" alt="" /> Invite via
                    Account
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
                        }" @keyup="handleInputKeyUp"
                            placeholder="Directly invite team members, or invite external members via email." />
                    </div>
                    <div class="min-h-[22px]">
                        <span v-if="errorTips" class="c-[#F63C47] text-[12px]">
                            {{ errorTips }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-[135px]">
            <Textarea v-model:value="emailContent" placeholder="Please add the email content"
                style="height: 100%; resize: none" :maxlength="500" show-count>
            </Textarea>
        </div>
        <div class="flex items-center justify-center gap-[24px] mt-[30px] mb-[10px]">
            <Button class="text-[#2E2BD9] flex items-center justify-center text-[13px] h-[38px]"
                style="background-color: #2e2bd912" type="primary" ghost :disabled="!copyLinkValue" @click="copyLink">
                <NuxtIcon name="link-icon" class="icon text-[24px] mr-[10px]" /> Copy
                Link
            </Button>
            <Button class="text-[#FFFFFF] flex items-center justify-center text-[13px] h-[38px]" type="primary"
                :loading="loading" :disabled="isDisabled" @click="sendEmail">
                <NuxtIcon name="email-icon" class="icon text-[24px] mr-[10px]" />Send
                Email
            </Button>
        </div>
    </Modal>
</template>

<style src="./index.scss" scoped lang="scss"></style>
