<script setup lang="ts">
import { useUploadPresigned } from '@/composables';
import { genFileId } from '@/utils';
import { computed, ref } from 'vue';
import { NuxtIcon, BaseUpload } from '@/components'
import { Modal, Button, message } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'


const { upload_presigned_url } = useUploadPresigned();
const props = defineProps({
    type: {
        type: String,
        default: "echo",
    },
    page: {
        type: String,
        default: "",
    },
    node: {
        type: Object,
        default: () => ({}),
    },
    node_item: {
        type: Object,
        default: () => ({}),
    },
    index: {
        type: Number,
        default: () => 0,
    },
    updateFilesForNode: {
        type: Function,
        required: true,
    },
    onChoosingFileChange: {
        type: Function,
        required: true,
    },
    isGrouped: {
        type: Boolean,
        default: false,
    },
    isOrigin: {
        type: Boolean,
        default: false,
    },
});
const TOTAL_LIMIT_SIZE = Number(props.node?.input_values.limit_size || 50) * 1024 * 1024;
const uploadModal = ref<any>(false);
const uploadTasks = new Map<string, Promise<void>>();
const openUploadModal = () => {
    uploadModal.value = true;
};
const accept = ref<any>(
    "json,csv,xls,xlsx,doc,docx,ppt,pptx,pdf,jpg,jpeg,png,txt,zip"
);

const getTotalSize = (files: any[]) =>
    files.reduce((acc, f) => acc + (f.file_size || 0), 0);

const getFilesList = (files: File[]): any[] => {
    return Array.from(files).map((file: File) => {
        const file_type = file.name.split(".").pop();
        return {
            row: file,
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            uid: genFileId(),
            url: URL.createObjectURL(file),
            status: "pending",
        };
    });
};

const hasErrorFiles = computed(() => {
    return Object.values(props.node_item.file_map || {}).some(
        (f: any) => f.status === "error"
    );
});
const onChoose = () => {
    props.onChoosingFileChange(true);
};
const onFileChange = async (files: File[]) => {
    if (!files || files.length === 0) {
        props.onChoosingFileChange(false);
        return;
    }

    let fileList = getFilesList(files);
    console.log('fileList===', fileList);

    const allFiles = [...Object.values(props.node_item.file_map), ...fileList];
    const totalSize = getTotalSize(allFiles);
    const uploadInfos: any[] = [];
    if (totalSize > TOTAL_LIMIT_SIZE) {
        message.warning(
            `Multiple files allowed, up to ${props.node?.input_values.limit_size || 50
            } MB in total.`
        );
        return;
    }

    for (let i = 0; i < fileList.length; i++) {
        const { row, ...item } = fileList[i];

        const fileInfos = {
            ...structuredClone(item),
            row: structuredClone(row),
            info: {
                file_name: row.name,
                category: "default",
                file_type: row.type,
                file_size: row.size,
            },
        };
        fileList[i].status = "uploading";
        props.node_item.file_map[fileInfos.uid] = structuredClone(fileList[i]);
        props.node_item.file_map[fileInfos.uid].isUploadingStarted = false;

        uploadInfos.push(fileInfos);
    }
    for (let i = 0; i < uploadInfos.length; i++) {
        await uploadFile(uploadInfos[i])
    }
};

const uploadFile = async (fileInfos: any) => {
    const fileEntry = props.node_item.file_map[fileInfos.uid];
    if (!fileEntry || fileEntry.isUploadingStarted) return;

    fileEntry.isUploadingStarted = true;

    let result = await upload_presigned_url(fileInfos);

    if (result.error.value) {
        console.log("❌ Upload failed", fileInfos.uid);

        const MAX_RETRY = 2;
        let success = false;

        for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
            const retry = await upload_presigned_url(fileInfos);

            if (!retry.error.value) {
                result = retry;
                success = true;
                break;
            }
        }

        if (!success) {
            await updateFileStatus(fileInfos.uid, "error");
            return;
        }
    }

    const { upload_url, key, uid } = result.data.value;

    await replaceUidWithFileKey(uid, key, upload_url);
};
const replaceUidWithFileKey = (uid: string, fileKey: string, url: string) => {
    console.log('✅[Upload succeeded]', uid, fileKey);
    const entry = props.node_item.file_map[uid];

    props.node_item.file_map[fileKey] = {
        ...entry,
        status: "success",
        file_key: fileKey,
        url,
    };

    delete props.node_item.file_map[uid];

    props.node_item.files = Object.keys(props.node_item.file_map);
    props.updateFilesForNode();
};
const updateFileStatus = (
    uid: string,
    status: "success" | "error",
    extra: any = {}
) => {
    const fileMap = props.node_item.file_map || {};
    if (fileMap[uid]) {
        fileMap[uid].status = status;
        Object.assign(fileMap[uid], extra);
    }

    props.node_item.file_map = { ...fileMap };
    props.updateFilesForNode();
};

const removeFile = (file: any) => {
    const fileMap = props.node_item.file_map;
    const keyToDelete = file.file_key
        ? Object.keys(fileMap).find((k) => fileMap[k].file_key === file.file_key)
        : Object.keys(fileMap).find((k) => fileMap[k].uid === file.uid);

    if (keyToDelete) delete fileMap[keyToDelete];
};

const retryUpload = async (item: any) => {
    item.status = "uploading";
    item.isUploadingStarted = false;

    const fileInfos = {
        uid: item.uid,
        row: item.row,
        info: {
            file_name: item.file_name,
            category: "default",
            file_type: item.file_type,
            file_size: item.file_size,
        }
    };

    await uploadFile(fileInfos);
};

const onConfirm = () => {
    props.node_item.files = Object.keys(props.node_item.file_map);
    props.updateFilesForNode();
    uploadModal.value = false;
};

const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const handelAccept = (type: any) => {
    return type?.length > 0 ? type.join(",") : false;
}
</script>

<template>
    <div class="w-[412px]">
        <div class="file-info mb-[6px]">
            <div class="name" :title="isGrouped ? node_item.key : node?.input_values?.key">
                <span class="text">
                    {{ isGrouped ? node_item.key : node?.input_values?.key }}
                </span>
            </div>
            <span class="desc" :title="node?.input_values?.description"><span v-if="isOrigin"> {{
                node?.input_values?.description }} </span>
            </span>
        </div>
        <div class="upload-select" @click="openUploadModal">
            <div class="files-upload" :class="hasErrorFiles ? 'border-[#ff4d4f!] bg-[#F8252E0F!]' : ''">
                <div v-if="
                    node_item.file_map && Object.keys(node_item.file_map).length > 0
                " class="flex items-center justify-between w-[100%]">
                    <div class="flex w-[215px] gap-[10px] overflow-hidden px-[16px]">
                        <div v-for="(items, indexs) in node_item.file_map">
                            <div class="flex items-center overflow-hidden fill-revert-layer">
                                <Suspense>
                                    <NuxtIcon :name="items.file_name.split('.').pop()" class="text-[30px]" filled/>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                    <div class="text-[12px] font-[Inter] c-[#000] w-[90px] h-[50px] flex items-center justify-end absolute right-[80px] opacity-94 bg-[#fff]"
                        :class="hasErrorFiles ? ' bg-transparent!' : ''">
                        Total of
                        <span class="c-[#2e2bd9] mx-[4px]">
                            {{ Object.keys(node_item.file_map).length }}
                        </span>
                        files
                    </div>
                </div>
                <div v-else class="files-upload-content">
                    <div
                        class="text-[12px] font-[Inter] c-[#ccc] w-[100px] h-[50px] flex items-center justify-start absolute left-[16px]">
                        No files uploaded. Click to add files.
                    </div>
                </div>
                <div class="w-[80px] h-full flex">
                    <div class="h-[100%]">
                        <img src="@/assets/images/border-line.png" alt="" />
                    </div>
                    <base-upload multiple :accept="handelAccept(node?.input_values.accept) || accept"
                        @change="(files) => onFileChange(files)" class="h-full">
                        <div @click="onChoose"
                            class="h-full flex flex-col items-center justify-center gap-[6px] font-[Inter]">
                            <NuxtIcon name="export-up" class="text-[20px] c-[#2E2BD9]"></NuxtIcon>
                            <span class="c-[#999999] text-[11px]"> Choose </span>
                        </div>
                    </base-upload>
                </div>
            </div>
        </div>
    </div>
    <Modal v-model:open="uploadModal" title="Upload Files" :maskClosable="false" :closable="false" :footer="null"
        centered width="auto" wrapClassName="account-modal-wrap">
        <div class="px-[20px]">
            <div class="file-info-modal mt-[20px] mb-[10px]">
                <span class="name">
                    {{ isGrouped ? node_item.key : node?.input_values?.key }}</span>
                <span class="desc" v-if="node?.input_values?.description">
                    {{ node?.input_values?.description }}
                </span>
            </div>
            <div class="upload-select">
                <base-upload multiple :accept="handelAccept(node?.input_values.accept) || accept"
                    @change="(files) => onFileChange(files)" class="h-fit!">
                    <div class="files-upload h-[60px]" :class="[
                        node_item.file_map && Object.keys(node_item.file_map).length > 0
                            ? 'border-[#EBEBEB!]'
                            : 'bg-[#2E2BD90D] bordr-[#2E2BD9]',
                    ]">
                        <div class="files-upload-content-modal" :class="node_item.file_map && Object.keys(node_item.file_map).length > 0
                            ? ''
                            : 'bg-[#2E2BD90D]'
                            ">
                            <p class="upload-text-title gap-[8px]">
                                <NuxtIcon name="export-up"></NuxtIcon>
                                Choose Files
                            </p>
                            <p class="upload-text">
                                +20 more {{ node?.input_values.limit_size || 50 }} MB max
                            </p>
                        </div>
                    </div>
                </base-upload>
                <div class="flex flex-col gap-[2px]" v-if="
                    node_item.file_map && Object.keys(node_item.file_map).length > 0
                ">
                    <div class="flex items-center justify-between gap-[10px] min-h-[55px] rounded-[8px] px-[20px] mt-[12px]"
                        :class="page !== 'manual' ? 'bg-[#2E2BD90D]' : 'bg-[#f9f9f9]'"
                        v-for="(items, indexs) in node_item.file_map" :key="indexs">

                        <div class="flex items-center gap-[5px] overflow-hidden fill-revert-layer">
                            <Suspense>
                                <NuxtIcon :name="items.file_name.split('.').pop()" class="text-[34px] mr-[8px]" filled/>
                            </Suspense>
                            <div class="flex-1 font-[Inter] fw-400 text-[13px] truncate flex flex-col">
                                <span class="c-[#010101] text-[13px] text-ellipsis overflow-hidden"
                                    :title="items.file_name">
                                    {{ items.file_name }}
                                </span>
                                <span class="c-[#847E7B] text-[12px]">
                                    {{ formatSize(items.file_size) }}
                                </span>
                            </div>
                        </div>
                        <div class="flex-none flex items-center gap-2">
                            <span v-if="
                                items.status === 'uploading' || items.status === 'pending'
                            ">
                                <LoadingOutlined spin class="text-[17px] text-blue-500" />
                            </span>

                            <span v-if="items.status == 'error'"
                                class="text-red-500 text-[13px] flex items-center gap-[4px]">
                                Failed

                                <NuxtIcon name="retry" class="cursor-pointer text-[17px] text-blue-500 ml-[4px]"
                                    @click="retryUpload(items)" />
                            </span>

                            <Suspense v-else-if="items.status !== 'uploading' && items.status !== 'pending'">
                                <NuxtIcon name="close" @click="removeFile(items)"
                                    class="cursor-pointer text-[17px] text-[#999999]" />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex gap-[16px] justify-center mt-[30px]">
                <Button type="primary" class="font-[Inter]" @click="onConfirm">
                    Confirm
                </Button>
            </div>
        </div>
    </Modal>
</template>

<style src="./index.scss" scoped lang="scss"></style>
