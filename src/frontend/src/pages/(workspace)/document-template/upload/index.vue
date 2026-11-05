<script setup lang="ts">
import { useApiDom, useApiFile } from '@/api';
import { toProxyUrl } from '@/shared';
import { useFileIconList } from '@/composables';
import { useRouterStore, useSpaceStore } from '@/stores';
import { message, Button } from 'ant-design-vue';
import { debounce } from 'lodash';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import { ToTopOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { useHttp } from '@/client';
import to from 'await-to-js';


const routerStore = useRouterStore();
routerStore.SET_BREADCRUMB([
    {
        name: "Document Template",
        path: "/document-template",
        isClickable: true
    },
    {
        name: "Upload",
        path: "/upload",
        isClickable: false
    },
]);

const { request } = useHttp()

const router = useRouter()

const spaceStore: any = useSpaceStore();
const spaceInfoCurrent: any = computed(() => spaceStore.spaceInfoCurrent);
const fileList = ref([]);
const files = ref<any>(undefined);
const fileNameVal = ref("");
const isNextLoading = ref(false);
const isNextDisabled = ref(true);
const uploadFileKey = ref("");
const fileInputRef = ref<HTMLInputElement | null>(null);
const removeFile = () => {
    fileList.value = [];
    fileNameVal.value = "";
    uploadFileKey.value = "";
    isNextDisabled.value = true;
    if (fileInputRef.value) {
        fileInputRef.value.value = "";
    }
};
const { fileIconList } = useFileIconList();
const getIconByFileName = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (!extension) return "";

    const match = fileIconList.value.find(
        (item: any) => item.id.toLowerCase() === extension
    );
    return match ? match.icon : "";
};

const maxSizeInBytes = 200 * 1024 * 1024;

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const allowedExtensions = [".docx", ".pdf"];
    const allowedMimeTypes = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
    ];
    const fileName = file.name.toLowerCase();
    const isExtAllowed = allowedExtensions.some((ext) => fileName.endsWith(ext));
    const isMimeAllowed = allowedMimeTypes.includes(file.type);

    if (!isExtAllowed || !isMimeAllowed) {
        message.error(
            "Please upload files in the following formats: DOCX, PDF."
        );
        target.value = "";
        return;
    }

    if (file.size > maxSizeInBytes) {
        message.error("The file size cannot exceed 200MB.");
        target.value = "";
        return;
    }

    files.value = file;
    fileNameVal.value = file.name;
    upload_presigned_url();
};

const tpl_id = ref("");
const onNext = debounce(async () => {
    isNextLoading.value = true;
    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiDom("create_dom_tpl"),
            {
                data: {
                    space_id: spaceInfoCurrent.value.id,
                    file_key: uploadFileKey.value,
                },
            })
    );
    isNextLoading.value = false;
    if (error) return;
    if (res?.code == 200) {
        tpl_id.value = res.data.template_id;
        router.push(`/document-template/create-or-detail?tpl_id=${tpl_id.value}`);
    }
}, 500);

const upload_dom_tpl = async (file: File) => {
    const formData = new FormData();
    formData.append("space_id", spaceInfoCurrent.value.id);
    formData.append("file", file);
    const [error] = await to<{ data: any; code: number }>(
        request(useApiDom("upload_dom_tpl"),
            {
                data: formData,
            })
    );
    if (error) return;
};
const upload_presigned_url = async () => {
    const fileInfos = {
        file_name: files.value?.name,
        category: "default",
        file_type: files.value?.type,
        file_size: files.value?.size,
    };

    const [error, res] = await to<{ data: any; code: number }>(
        request(useApiFile("pre_signed"),
            {
                data: fileInfos,
                config: { isAuth: false }
            })

    );
    if (error) return;
    if (res?.code === 200) {
        uploadFileKey.value = res?.data.key;
        const contentType = files.value?.type || "application/octet-stream";

        const uploadUrl = toProxyUrl(res?.data.upload_url) ?? "";

        try {
            if (res?.data.store_type == "local") {
                const formData = new FormData();

                formData.append("file", files.value);

                await fetch(uploadUrl, {
                    method: "PUT",
                    body: formData,
                });
            } else {
                await fetch(uploadUrl, {
                    method: "PUT",
                    body: files.value,
                    headers: {
                        "x-ms-blob-type": "BlockBlob",
                        "Content-Type": contentType,
                    },
                });
            }

            uploadFileKey.value = res?.data.key;
            isNextDisabled.value = false;
        } catch (e) {
            uploadFileKey.value = "";
            isNextDisabled.value = false;
        }

    }
};
</script>

<template>
    <div class="upload-page">
        <h1 class="px-[50px] text-center">Upload your template file to begin the process.</h1>

        <div class="source_file_name" v-if="fileNameVal">
            <div class="source_file_name_info">
                <img :src="getIconByFileName(fileNameVal)" alt=""
                    style="width: 20px; height: 20px; margin-right: 8px" />
                <span :title="fileNameVal">{{ fileNameVal }}</span>
            </div>
            <div v-if="!isNextDisabled" class="remove-icon" @click="removeFile">
                <CloseOutlined style="cursor: pointer; margin-left: 10px" size="18" />
            </div>
            <LoadingOutlined spin class="text-[16px] c-[#2E2BD9]" v-else />
        </div>
        <div class="files-upload" v-else>
            <div class="files-upload-content">
                <ToTopOutlined class="upload-icon" />
                <p class="upload-text">Drag and drop a file here or click to browse</p>
            </div>
            <input ref="fileInputRef" type="file" @change="handleFileChange" class="files-upload--input"
                accept=".doc,.docx,.pdf" />
        </div>

        <Button type="primary" class="next-btn" :loading="isNextLoading" :disabled="isNextDisabled" @click="onNext">
            Next
        </Button>
    </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
