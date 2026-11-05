<script setup lang="ts">
defineOptions({
    name: 'BaseSteps'
})

import { BaseStepsItem } from '@/components';

withDefaults(
    defineProps<{
        items?: any[];
    }>(),
    {
        items: () => [],
    }
);
</script>

<template>
    <div class="base-steps">
        <base-steps-item v-for="(item, index) in items" :key="index" :item="item" :index="index">
            <template #title="{ item, index }">
                <slot name="title" :item="item" :index="index"></slot>
            </template>
            <template #description="{ item, index }">
                <slot name="description" :item="item" :index="index"></slot>
            </template>
        </base-steps-item>
    </div>
</template>

<style src="./index.scss" lang="scss" scoped></style>