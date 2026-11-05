<script setup lang="ts">
import { useApiFile, useApiPolicy } from '@/api';
import { useHttp } from '@/client';
import { useFileIconList } from '@/composables';
import { useShortUUID, type UploadFile } from '@/shared';
import { useSpaceStore } from '@/stores';
import { getFileExtension } from '@/utils';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

import { NuxtIcon, BaseUpload } from '@/components'

import { LoadingOutlined, CloseOutlined } from '@ant-design/icons-vue'

import to from 'await-to-js'

defineOptions({
    name: 'PolicyFilesUploadFiles'
})

const props = withDefaults(defineProps<{ formType: string, data: any }>(), {
    formType: 'create',
    data: () => ({})
})

const { request } = useHttp();

const spaceStore: any = useSpaceStore();

const { fileIconList } = useFileIconList();

const uploadItems = ref<any>([]);

const getIconByFileName = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (!extension) return "";

    const match = fileIconList.value.find(
        (item: any) => item.id.toLowerCase() === extension
    );
    return match ? match.icon : "";
};

const handleUploadChange = async (files: File[], filesArray: UploadFile[]) => {

    uploadItems.value = [
        ...uploadItems.value,
        ...filesArray.map((item: any) => ({
            ...item,
            file_ext: getFileExtension(item.name),
        }))
    ];
    await Promise.all(
        uploadItems.value
            .filter((item: any) => !item.key)
            .map((item: any) => upload_presigned_url(item))
    );
}

const removeFile = (uid: any) => {
    uploadItems.value = uploadItems.value.filter((item: any) => item.uid !== uid)
}

const retryUpload = async (item: any) => {
    await Promise.all(
        uploadItems.value
            .filter((i: any) => i.uid === item.uid)
            .map((item: any) => upload_presigned_url(item))
    );
}

const upload_presigned_url = async (item: any) => {
    if (!item.raw) return;
    item.status = 'uploading';
    try {
        const fileInfos = {
            file_name: item.name,
            category: "default",
            file_type: item.type,
            file_size: item.size,
        };

        const [error, res] = await to<{ data: any; code: number }>(
            request(useApiFile("pre_signed"),
                {
                    data: fileInfos,
                    config: { isAuth: false }
                },
            )
        );
        if (error) return;
        if (res?.code === 200) {
            await fetch(res?.data.upload_url, {
                method: "PUT",
                body: item.raw,
                headers: {
                    "x-ms-blob-type": "BlockBlob",
                },
            });
            item.key = res?.data.key;
            item.status = 'success';
        }
    } catch {
        item.status = 'fail';
        message.error(`Failed to upload ${item.name}. Please try again.`);
    }
};

const save_files_upload = <T>(files: any) => {
    return to<T>(request(useApiPolicy('files_upload'), {
        data: {
            space_id: spaceStore.spaceInfoCurrent?.id,
            files
        }
    }))
}

const save_files_edit = <T>(files: any, id: any) => {
    return to<T>(request(useApiPolicy('files_edit')(id), {
        data: files[0]
    }))
}

const files_upload_edit = <T>(formType: string, data?: any) => {
    const files = uploadItems.value
        .filter((item: any) => item.key)
        .map((item: any) => ({
            file_key: item.key,
            file_name: item.name,
            file_size: item.size,
            file_ext: item.file_ext
        }));
    if (files.length === 0) {
        message.error("Please select a file")
        return { data: ref(null), error: ref('Please select a file') }
    }
    if (files.length != uploadItems.value.length) {
        message.error("Please select all files")
        return { data: ref(null), error: ref('Please select all files') }
    }
    if (formType == 'create') {
        return save_files_upload<T>(files)
    }
    if (formType == 'edit') {
        return save_files_edit<T>(files, data.id)
    }
    return { data: ref(null), error: ref('Please select a file') }
}

onMounted(() => {
    uploadItems.value = []
    if (props.formType == 'edit') {
        uploadItems.value = [{
            uid: useShortUUID(13),
            key: props.data.id,
            name: props.data.file_name,
            file_ext: props.data.file_ext,
            size: props.data.file_size,
            status: 'success'
        }]
    }
})

defineExpose({
    files_upload_edit
})

</script>

<template>
    <div class="font-[Inter] fw-400 text-[12px] c-[#999999]">
        Upload documents that can be referenced by compliance policies.
    </div>
    <div class="py-[15px]">
        <base-upload v-if="formType == 'create' || !uploadItems.length" :multiple="formType == 'create'"
            @change="handleUploadChange">
            <div
                class="flex flex-col justify-center items-center gap-[2px] bg-[#2E2BD914] border border-dashed border-[#2E2BD9] p-[15px] py-[30px] rounded-[16px]">
                <NuxtIcon name="frame-up" class="text-[40px]" filled />
                <div class="font-[Inter] fw-400 text-[14px]">
                    Drag and drop your file here, or click to browse
                </div>
            </div>
        </base-upload>
        <div class="flex flex-col gap-3 my-[15px]" v-if="uploadItems.length">
            <div class="h-[80px] bg-[#2E2BD90D] rounded-[8px] p-[12px] p-inline-[15px] flex items-center justify-between overflow-hidden"
                v-for="item in uploadItems" :key="item.uid">
                <div class="flex items-center flex-1 overflow-hidden gap-[8px]">
                    <img :src="getIconByFileName(item.name)" alt="logo" class="w-[34px] h-[34px] aspect-ratio-1" />
                    <div class="flex flex-col justify-around line-clamp-1">
                        <span class="font-Inter-Medium font-Inter" :title="item.name">{{ item.name }}</span>
                        <span class="c-[#847E7B] font-[Inter] fw-400 text-[12px]">
                            {{ (item.size / 1024 / 1024).toFixed(4) }}MB
                        </span>
                    </div>
                </div>
                <div class="flex-none flex items-center pl-[15px]">
                    <template v-if="item.status == 'uploading'">
                        <div class="w-[17px] ml-[10px]">
                            <LoadingOutlined spin class="text-[17px] text-blue-500 block" />
                        </div>
                    </template>
                    <template v-if="item.status == 'fail'">
                        <div class="whitespace-nowrap c-[#999999] text-[12px] ml-auto">
                            <span v-if="item.status == 'fail'" class="c-red-500">Failed</span>
                        </div>
                        <div class="w-[17px] ml-[10px]" @click="retryUpload(item)">
                            <NuxtIcon name="retry" class="cursor-pointer text-[17px] text-blue-500 block" />
                        </div>
                    </template>
                    <template v-if="['success'].includes(item.status)">
                        <div class="w-[17px] ml-[10px]" @click="removeFile(item.uid)">
                            <CloseOutlined class="cursor-pointer c-[#999] text-[17px] block" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
