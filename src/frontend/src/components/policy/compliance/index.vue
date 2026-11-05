<script setup lang="ts">
defineOptions({
    name: 'PolicyCompliance'
})

import { useIndexedDB, useConfirmModal, type DialogExpose, useDialog, } from '@/composables'

import { PolicyCreateEdit, BaseCard, NuxtIcon } from '@/components'

import {SearchOutlined} from '@ant-design/icons-vue'

import { useSpaceStore } from '@/stores'
import { ref, useTemplateRef, watchEffect } from 'vue';

import { useApiPolicy } from '@/api'
import { debounce } from 'lodash';
import { message, Table, Button, Input, Tooltip, Pagination } from 'ant-design-vue';
import { getPaginate } from '@/shared';

import dayjs from 'dayjs'

import { useRouter } from 'vue-router'

import { useHttp } from '@/client'
import to from 'await-to-js'

const router = useRouter()

const { request } = useHttp()

const { clearTable, getAll } = useIndexedDB()

const { showConfirm } = useConfirmModal();

const spaceStore: any = useSpaceStore();

const formRef = useTemplateRef<any>('formRef');

const isShowList = ref<boolean>(true)
const isSearch = ref<boolean>(false)

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Policy Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Versions',
        dataIndex: 'version_count',
        key: 'version_count',
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
        width: 160
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
const total = ref<number>(0);

watchEffect(async () => {
    const data = await getAll('policy');
    console.log('data :', data);
    if (data?.length) {
    }
})

const get_list = async () => {
    const [error, res] = await to<{ data: any, code: number }>(
        request(useApiPolicy('list'),
            {
                data: {
                    space_id: spaceStore.spaceInfoCurrent?.id,
                    ...queryPage.value,
                    sortOrder: sortOrder.value
                }
            })
    )
    isShowList.value = false
    if (error) return
    if (res?.code === 200) {
        const { count, results } = res?.data
        total.value = count
        list.value = results
    }
}

get_list()

const toggleSort = debounce(() => {
    sortOrder.value = sortOrder.value === "ascend" ? "descend" : "ascend";
    onSearch();
}, 500);

const onSearch = () => {
    isSearch.value = true
    get_list()
}

const pageChange = (_pageNumber: any, _pageSize: any) => {
    queryPage.value.pageNumber = _pageNumber
    queryPage.value.pageSize = _pageSize
    get_list()
}

const policyEditDialog: DialogExpose = useDialog({
    width: 686,
    centered: true,
    ok: async ({ formType, data }: any, okLoadingState: (state: boolean) => void) => {
        okLoadingState(true)
        const { data: res, error } = await formRef.value?.onCreateEdit()
        okLoadingState(false)
        if (error.value) return
        if (res.value?.code === 200) {
            const { policy_id } = res.value?.data
            await get_list()
            policyEditDialog.close()
            await handleReview({ id: policy_id, name: data?.name })
        }
    }
});


const handleCreatePolicy = () => {
    policyEditDialog.setTitle('New Policy')
    policyEditDialog.open({ formType: 'create', data: {} });
}


const onSelectChange = (keys: any, rows: any) => {
    selectedRowKeys.value = keys
}
const handleReview = async (record: any) => {
    await clearTable('policy')
    router.push({
        path: `/compliance-policy/review`,
        query: {
            id: record.id,
            name: record.name
        }
    })
}

const handleEdit = (record: any) => {
    policyEditDialog.setTitle('Edit Policy')
    policyEditDialog.open({ formType: 'edit', data: record });
}

const handleDelete = (record: any) => {
    showConfirm({
        title: "Confirm Delete The Compliance Policy",
        content: "Are you sure you want to delete this compliance policy?",
        okText: "Delete",
        onOk: async () => {
            const [error, res] = await to<{ data: any, code: number }>(request(useApiPolicy('delete')(record.id)))
            if (error) return
            if (res?.code === 200) {
                queryPage.value.pageNumber = getPaginate(total.value, queryPage.value.pageSize, queryPage.value.pageNumber, 1)
                await get_list()
                message.success('Deleted successfully')
            }
        }
    });
}

const handleCustomRow = (record: any) => {
    return {
        onClick: () => {
            handleReview(record)
        }
    }
}

const handleBulkDelete = () => {
    if (!selectedRowKeys.value.length) return message.error('Please select at least one item');
    showConfirm({
        title: "Confirm Delete The Compliance Policy",
        content: "Are you sure you want to delete this compliance policy?",
        okText: "Delete",
        onOk: async () => {
            const [error, res] = await to<{ data: any, code: number }>(request(useApiPolicy('bulk_delete'), {
                data: {
                    policy_ids: selectedRowKeys.value
                }
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
    <base-card v-if="list.length || isSearch">
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
                    <Button type="primary" @click="handleCreatePolicy" class="h-[38px]">+ New Policy</Button>
                </div>
            </div>
        </template>
        <Table rowKey="id" :row-selection="{ onChange: onSelectChange }" :dataSource="list" :columns="columns"
            :pagination="false" bordered :customRow="handleCustomRow">
            <template #bodyCell="{ column, record }">
                <div class="flex items-center gap-[15px]" v-if="column.dataIndex == 'action'">
                    <Button type="link" @click.stop="handleReview(record)"
                        class="c-[#000000]! px-0 flex items-center gap-[3px] text-[13px]">
                        <template #icon>
                            <NuxtIcon name="edit-single" class="text-[17px]" />
                        </template>
                        Edit
                    </Button>
                    <Button type="link" @click.stop="handleDelete(record)"
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
    <base-card v-if="!list.length && !isShowList">
        <div class="flex flex-col justify-center items-center gap-[30px] py-1/10">
            <div class="font-Inter-SemiBold font-Inter">
                📄 Compliance Policy
            </div>
            <div class="font-Inter-Medium font-Inter">
                Configure reusable compliance policies to provide standardized rule-checking capabilities for agents and
                system
                processes.
            </div>
            <Button type="primary" @click="handleCreatePolicy">
                + Create Policy
            </Button>
        </div>
    </base-card>

    <component :is="policyEditDialog.Dialog">
        <template #default="{ formType, data }">
            <div class="mt-[20px] px-[15px]">
                <PolicyCreateEdit ref="formRef" :formType="formType" :data="data" />
            </div>
        </template>
    </component>
</template>

<style src="./index.scss" scoped lang="scss"></style>
