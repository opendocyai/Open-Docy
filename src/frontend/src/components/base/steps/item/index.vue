<script setup lang="ts">
defineOptions({
    name: 'BaseStepsItem'
})

withDefaults(
    defineProps<{
        item?: object | any;
        index?: number;
    }>(),
    {
        item: () => ({}),
        index: 0,
    }
);
</script>

<template>
    <div class="base-steps-item">
        <div class="base-steps-item__line"></div>
        <div class="base-steps-item__icon">
            <span class="base-steps-icon">
                <span class="base-steps-icon-dot"></span>
            </span>
        </div>
        <div class="base-steps-item__content">
            <div class="base-steps-item__title">
                <slot name="title" :item="item" :index="index"></slot>
            </div>
            <div class="base-steps-item__description">
                <slot name="description" :item="item" :index="index"></slot>
            </div>
        </div>
    </div>
</template>

<style src="./index.scss" lang="scss" scoped></style>
