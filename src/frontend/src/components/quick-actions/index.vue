<script setup lang="ts">
import { useReteLabels } from '@docyai/rete';
import { onUnmounted, ref } from 'vue';

import { List, ListItem } from 'ant-design-vue'

import {NuxtIcon, BaseScroll} from '@/components'

defineOptions({ name: 'QuickActions' })


const { labels } = useReteLabels();

const factory = ref<string>("InputFile");

const handleClick = (item: any) => {
    factory.value = item.factory;
};

onUnmounted(() => {
    factory.value = 'InputFile'
});
</script>

<template>
    <div class="h-full flex">
        <div class="flex-none h-full w-[300px] overflow-hidden pr-[15px] mr-[15px] border-r border-[#F0F0F0]">
            <base-scroll>
                <div class="">
                    <div class="font-Inter-Medium font-Inter">
                        Components
                    </div>
                    <List :data-source="labels" @click.stop>
                        <template #renderItem="{ item }">
                            <list-item class="pl-[15px]! cursor-pointer" :class="{ active: item.factory === factory }"
                                @click="handleClick(item)" v-if="!item.hidden">
                                <div class="flex-1 flex items-center justify-between">
                                    <div
                                        class="flex items-center gap-[12px] c-[#555555] text-[14px] fw-400 font-[Inter]">
                                        <NuxtIcon :name="item.icon" class="text-[20px] c-[#999999]"/>
                                        {{ item.label }}
                                    </div>
                                </div>
                            </list-item>
                        </template>
                    </List>
                </div>
            </base-scroll>
        </div>
        <div class="flex-1 h-full pl-[15px] overflow-hidden">
            <base-scroll>
                <div class="fill-revert-layer">
                    <NuxtIcon :name="factory" filled/>
                </div>
            </base-scroll>
        </div>
    </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
