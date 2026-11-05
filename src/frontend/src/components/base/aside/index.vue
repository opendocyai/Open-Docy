<script setup lang="ts">
defineOptions({
    name: 'BaseAside',
})

import { LogoAside, TeamPersonal, BaseAsideWorkspace, BaseAsideMarketplace, BaseAsideSupport } from '@/components';

import { useAsideStore } from '@/stores';

const asideStore = useAsideStore();

</script>

<template>
    <div class="base-aside overflow-hidden">
        <div class="flex-none border-b-width-[1px] border-[#EAEDF0]  pb-0">
            <logo-aside />
            <team-personal />
        </div>
        <div class="flex-1 overflow-y-auto overflow-x-hidden pt-[6px]">
            <div class="flex flex-col justify-between">
                <base-aside-workspace v-if="asideStore.user_workspace_list.id" />
                <base-aside-marketplace v-if="asideStore.marketplace_list.id" />
                <base-aside-support v-if="asideStore.support_list.id" />
            </div>
        </div>
    </div>
</template>

<style src="./index.scss" lang="scss" scoped></style>
