<script setup lang="ts">
import { useApiPolicy } from '@/api';
import { useConfirmModal, useDialog, useDownload, type DialogExpose } from '@/composables';
import { formatNumber, getPaginate } from '@/shared';
import { useSpaceStore } from '@/stores';
import { message, Table, Tooltip, Input, Button, Pagination } from 'ant-design-vue';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { ref, useTemplateRef } from 'vue';

import { PolicyFilesUploadFiles, NuxtIcon, BaseCard } from '@/components'

import { SearchOutlined } from '@ant-design/icons-vue'

import { useHttp } from '@/client'
import to from 'await-to-js'

defineOptions({
    name: 'PolicyFiles'
})

const { request } = useHttp()

const { showConfirm } = useConfirmModal();

const spaceStore: any = useSpaceStore();

const total = ref<number>(0);

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'File Name',
        dataIndex: 'file_name',
        key: 'file_name',
    },
    {
        title: 'File Format',
        dataIndex: 'file_ext',
        key: 'file_ext',
    },
    {
        title: 'Size (KB)',
        dataIndex: 'file_size',
        key: 'file_size',
        customRender: ({ text }: any) => {
            return formatNumber(text / 1024)
        }
    },
    {
        title: 'Creation Time',
        dataIndex: 'created_at',
        key: 'created_at',
        customRender: ({ text }: any) => {
            return dayjs(text).format('DD/MM/YY HH:mm:ss')
        }
    },
    {
        title: 'Update Time',
        dataIndex: 'update_at',
        key: 'update_at',
        customRender: ({ text }: any) => {
            return dayjs(text).format('DD/MM/YY HH:mm:ss')
        }
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: 180
    }
]

const list = ref([]);
const selectedRowKeys = ref([]);

const sortOrder = ref<any>("descend");

const queryPage = ref({
    name: undefined,
    status: undefined,
    pageNumber: 1,
    pageSize: 20
});

const uploadRef = useTemplateRef<any>('uploadRef');

const toggleSort = debounce(() => {
    sortOrder.value = sortOrder.value === "ascend" ? "descend" : "ascend";
    onSearch();
}, 500);

const get_list = async () => {
    const [error, res] = await to<{ data: any, code: number }>(
        request(useApiPolicy('files_list'),
            {
                data: {
                    space_id: spaceStore.spaceInfoCurrent?.id,
                    ...queryPage.value,
                    sortOrder: sortOrder.value
                }
            })
    )
    if (error) return
    if (res?.code === 200) {
        const { count, results } = res?.data
        total.value = count
        list.value = results
    }
}

get_list()


const uploadDialog: DialogExpose = useDialog({
    width: 524,
    centered: true,
    ok: async ({ formType, data }: any, okLoadingState: (state: boolean) => void) => {
        okLoadingState(true)
        const { files_upload_edit } = uploadRef.value
        if (!files_upload_edit) return
        const [error, res] = await files_upload_edit(formType, data)
        okLoadingState(false)
        if (error) return
        if (res?.code === 200) {
            message.success('Upload success')
            uploadDialog.close()
            await get_list()
        }
    }
});

const onSearch = () => {
    get_list()
}

const pageChange = (_pageNumber: any, _pageSize: any) => {
    queryPage.value.pageNumber = _pageNumber
    queryPage.value.pageSize = _pageSize
    get_list()
}

const onSelectChange = (keys: any, rows: any) => {
    selectedRowKeys.value = keys
}

const handleDelete = (record: any) => {
    showConfirm({
        title: "Confirm Delete The Policy Files",
        content: "Are you sure you want to delete this policy files?",
        okText: "Delete",
        onOk: async () => {
            const [error, res] = await to<{ data: any, code: number }>(request(useApiPolicy('files_delete')(record.id)))
            if (error) return
            if (res?.code === 200) {
                queryPage.value.pageNumber = getPaginate(total.value, queryPage.value.pageSize, queryPage.value.pageNumber, 1)
                await get_list()
                message.success('Deleted successfully')
            }
        }
    });
}

const handleUpload = (record?: any) => {
    uploadDialog.setTitle('Upload Documents')
    uploadDialog.open({ formType: record?.id ? 'edit' : 'create', data: record });
}

const handleUpdate = (record: any) => {
    handleUpload(record)
}

const isDownloadLoading = ref(false)
const { init } = useDownload()

const handleBatchDownload = async () => {
    try {
        isDownloadLoading.value = true
        const [error, res] = await to<any>(request(useApiPolicy('files_batch_download'), {
            params: {
                space_id: spaceStore.spaceInfoCurrent?.id,
                name: queryPage.value.name,
            },
            responseType: "blob",
            config: {
                isRaw: true
            }
        }))
        let fileName: any = res.headers.get("file-name");
        if (!fileName) {
            const disposition = res.headers.get('content-disposition')
            fileName =
                disposition?.match(/filename="?([^"]+)"?/)?.[1] ?? 'data.csv'
        }
        init(res.data, fileName);
    } catch (e) {
        console.warn("🚀 ~ handleBatchDownload ~ e: ", e);
    } finally {
        isDownloadLoading.value = false
    }

}

const handleBulkDelete = () => {
    if (!selectedRowKeys.value.length) return message.error('Please select at least one item');
    showConfirm({
        title: "Confirm Delete The Policy Files",
        content: "Are you sure you want to delete this policy files?",
        okText: "Delete",
        onOk: async () => {
            const [error, res] = await to<{ data: any, code: number }>(request(useApiPolicy('files_batch_delete'), {
                data: [...selectedRowKeys.value]
            }))
            if (error) return
            if (res?.code === 200) {
                queryPage.value.pageNumber = getPaginate(total.value, queryPage.value.pageSize, queryPage.value.pageNumber, selectedRowKeys.value.length)
                await get_list()
                selectedRowKeys.value = []
                message.success('Deleted successfully')
            }
        }
    });
}
</script>

<template>
    <base-card>
        <template #header>
            <div class="flex items-center gap-[15px]">
                <div class="flex-none">
                    <Input v-model:value="queryPage.name" placeholder="Name" class="w-[240px] h-[28px]" allow-clear>
                        <template #suffix>
                            <Tooltip title="Click to search">
                                <SearchOutlined style="color: #cccccc" @click="onSearch" />
                            </Tooltip>
                        </template>
                    </Input>
                </div>
                <div class="flex-none">
                    <Button @click="toggleSort" class="font-[Inter] h-[28px]">
                        <div class="sort-box">
                            <NuxtIcon name="descend" class="icon" v-if="sortOrder === 'descend'" />
                            <NuxtIcon name="ascend" class="icon" v-else />
                            <span class="sort-by">Sorted by <span>Last updated</span> </span>
                        </div>
                    </Button>
                </div>
                <div class="flex-none ml-auto flex items-center gap-[15px]">
                    <Button @click="handleBulkDelete" class="h-[38px]">Bulk Delete</Button>
                    <Button type="primary" :loading="isDownloadLoading" ghost @click="handleBatchDownload"
                        class="flex items-center gap-1 h-[38px]" :disabled="!list.length">
                        <NuxtIcon name="download" class="text-[16px]" />
                        Download All
                    </Button>
                    <Button type="primary" @click="handleUpload()" class="h-[38px]">+ Upload File</Button>
                </div>
            </div>
        </template>
        <Table rowKey="id" :row-selection="{ onChange: onSelectChange }" :dataSource="list" :columns="columns"
            :pagination="false" bordered>
            <template #bodyCell="{ column, record }">
                <div class="flex items-center justify-between gap-[5px]" v-if="column.dataIndex == 'action'">
                    <Button type="link" @click="handleUpdate(record)"
                        class="c-[#000000]! px-0 flex items-center gap-[3px] text-[13px]">
                        <template #icon>
                            <NuxtIcon name="retry" class="text-[20px]" />
                        </template>
                        Update
                    </Button>
                    <Button type="link" @click="handleDelete(record)"
                        class="c-[#F63C47]! px-0 flex items-center gap-[3px] text-[13px]">
                        <template #icon>
                            <NuxtIcon name="delete-icon" class="text-[17px]" />
                        </template>
                        Delete
                    </Button>
                </div>
            </template>
        </Table>
        <template #footer>
            <div class="flex justify-end">
                <Pagination v-model:current="queryPage.pageNumber" v-model:pageSize="queryPage.pageSize"
                    show-size-changer :show-total="(total: any) => `Total ${total} items`" :total="total"
                    @change="pageChange" hideOnSinglePage />
            </div>
        </template>
    </base-card>

    <component :is="uploadDialog.Dialog">
        <template #default="{ formType, data }">
            <PolicyFilesUploadFiles ref="uploadRef" :formType="formType" :data="data" />
        </template>
    </component>
</template>

<style src="./index.scss" scoped lang="scss"></style>
