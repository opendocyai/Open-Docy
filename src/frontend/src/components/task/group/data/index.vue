<script setup lang="ts">
defineOptions({
    name: 'TaskGroupData'
})

import { Empty, Button, Table, Image } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { EyeOutlined } from '@ant-design/icons-vue';
import { computed, ref } from "vue";
import { useApiActivity } from "@/api";
import { useHttp } from "@/client";
import to from "await-to-js";

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

const { request } = useHttp();

const route = useRoute();
const router = useRouter();

const tags_list = ref<any[]>([]);
const tags_index = ref<number>(0);

const group_index = ref<number>(0);

const columns = ref<any[]>([]);

const dataSource = ref<any[]>([]);

const groups_name = computed<any>(() => {
    return tags_list.value[tags_index.value]?.data || [];
});

const get_results_extract_groups = async () => {
    console.log(route.query.task_id, 'get_results_extract_groups');

    const dataApi = useApiActivity("get_results_extract_groups")(
        route.query.task_id
    );
    const [error, res] = await to<{ data: any; code: number }>(request(dataApi));

    if (error) return;
    if (res?.code == 200) {
        if (res.data) {
            let tags_list_temp: any[] = [];
            for (const key in res.data) {
                console.log(key, res.data[key]);
                let data_temp: any[] = [];

                res.data[key].forEach((item: any) => {
                    for (const k in item) {
                        data_temp.push({ name: k });
                    }
                });
                console.log(data_temp, 'data_tempdata_tempdata_temp')
                tags_list_temp.push({
                    name: key,
                    data: data_temp,
                });
            }
            tags_list.value = tags_list_temp;
            await get_results_extract_by_group(
                tags_list.value[tags_index.value]?.name,
                groups_name.value[group_index.value]?.name
            );
        }
    }
};

get_results_extract_groups();


const columns_table = ref<any>({});
let columns_prop: string[] = [];

const get_results_extract_by_group = async (key: string, group_name: string) => {
    const dataApi = useApiActivity("get_results_extract_by_group")(
        route.query.task_id
    );
    const [error, res] = await to<{ data: any; code: number }>(request(dataApi, {
        data: {
            key,
            group_name,
        },
    }));

    if (error) return;
    if (res?.code == 200) {
        if (res.data) {
            columns_table.value = res.data;
            dataSource.value = []
            columns_prop = []
            handelData();
        }
    }
};

const handleGroup = async (index: number) => {
    group_index.value = index;
    console.log(groups_name.value[group_index.value], 'tags_list.value[tags_index.value]')
    await get_results_extract_by_group(
        tags_list.value[tags_index.value]?.name,
        groups_name.value[group_index.value]?.name
    );
}

const handelData = () => {
    columns_table.value.headers.forEach((item: any) => {
        columns_prop.push(item.label);
        if (item.label === "Key Info") {
            Object.assign(item, {
                minWidth: 200,
                className: "bg-[#F7F7F7]!",
            });
        } else {
            Object.assign(item, {
                minWidth: 500,
            });
        }
    });

    console.log(columns_prop, 'columns_propcolumns_propcolumns_propcolumns_propcolumns_prop')
    columns.value = [
        {
            label: "",
            dataIndex: "index",
            key: "index",
            align: "center",
            width: 40,
            fixed: "left",
        },
        ...columns_table.value.headers.map((item: any, index: number, arr: any[]) => {
            const isLast = index === arr.length - 1;
            const isKeyInfo = item.label === "Key Info";
            return {
                label: item.label,
                title: item.label,
                dataIndex: item.label,
                key: item.label,
                align: item.align || "left",
                files: item.files,
                preview: item.preview,
                color: item.color,
                fixed: isKeyInfo ? "left" : undefined,
                width: isKeyInfo ? 200 : 500,
                resizable: !isLast,
                customHeaderCell: () => ({
                    class: item.className || "",
                    style: {
                        overflow: "hidden",
                    },
                }),
                customCell: () => ({
                    style: {},
                }),
            };
        }),
    ];

    dataSource.value = columns_table.value.datas.map((row: any[]) => {
        return columns_prop.reduce((acc: any, key, index: number) => {
            console.log("row", row);
            const cell = row[index];
            console.log("cell", cell);
            acc[key] = cell
                ? cell
                : {
                    type: cell?.type,
                    value: cell?.value,
                    color: cell?.color,
                };
            console.log("acc", acc);
            return acc;
        }, {});
    });
    console.log("tableData.value==13454323454345434565456", dataSource.value);
};

const handleTag = async (index: number) => {
    tags_index.value = index
    group_index.value = 0
    await get_results_extract_by_group(
        tags_list.value[tags_index.value]?.name,
        groups_name.value[group_index.value]?.name
    );
}

const handlePreview = (item: any) => {
    console.log("item", item.name, "item");
    const { task_id, task_name, activatedTab } = route.query
    router.push(
        `/activity/audit-extract-generate/extract/group-detail?task_id=${task_id}&task_name=${task_name}&activatedTab=${activatedTab}&group_key=${encodeURIComponent(item.name)}&file_name=${encodeURIComponent(item.name)}`
    );
}
</script>

<template>
    <div class="h-full flex flex-col overflow-hidden">
        <template v-if="dataSource?.length">
            <div class="flex-none">
                <div class="tags">
                    <div class="tags_item pb-[9px]">
                        <span class="c-[#000000] font-[Inter] font-normal text-[13px]">Files name:</span>
                    </div>
                    <div class="tags_list">
                        <div class="tags_item" v-for="(item, index) in tags_list"
                            :class="{ active: tags_index == index }" :key="index" @click="handleTag(index)">
                            <span class="active_lb"></span>
                            <span class="active_rb"></span>
                            <span>{{ item.name }}</span>
                            <Button type="link" @click.stop="handlePreview(item)" class="c-[#000] p-0 h-auto lh-[1]">
                                <EyeOutlined class="text-[16px] px-[0px]" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto">
                <Table :dataSource="dataSource" :columns="columns" :pagination="false" bordered>
                    <template #headerCell="{ title, column }">
                        <template v-if="column.key === 'index'" class="rounded-[0px]"></template>
                        <template v-else>
                            <div class="quick-review__header" :class="{
                                'quick-review__header-info': column.dataIndex === 'Key Info',
                            }">
                                <div class="quick-review__header--label" :title="title">
                                    {{ title }}
                                </div>
                            </div>
                        </template>
                    </template>
                    <template #bodyCell="{ text, column, index, record }">
                        <template v-if="column.dataIndex === 'index'">
                            <div class="px-[10px]">{{ index + 1 }}</div>
                        </template>
                        <template v-else>
                            <template v-if="text?.type == 'files'">
                                <Image v-for="img in text?.value" :src="img" :height="40" :key="img" />
                            </template>
                            <template v-if="text?.type == 'text'" :title="text?.value">
                                <div class="px-[10px] py-[6px] whitespace-pre-wrap"
                                    :style="{ backgroundColor: text?.color || '' }">
                                    {{ text?.value }}
                                </div>
                            </template>
                        </template>
                    </template>
                </Table>
            </div>
            <div class="flex-none task-footer">
                <div class="task-footer--item" v-for="(item, index) in groups_name"
                    :class="{ active: group_index == index }" :key="index" @click="handleGroup(Number(index))">
                    {{ item.name }}
                </div>
            </div>
        </template>
        <Empty :image="simpleImage" description="No data" v-else style="margin-top: 100px" />
    </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>