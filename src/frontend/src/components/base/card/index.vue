<script setup lang="ts">
defineOptions({
	name: 'BaseCard',
})

withDefaults(
	defineProps<{
		isFixed?: boolean
	}>(),
	{
		isFixed: false
	},
)

</script>

<template>
	<div class="base-card" :class="{'overflow-hidden': isFixed}">
		<div class="base-card__header" v-if="$slots.header">
			<slot name="header"></slot>
		</div>
		<div class="base-card__body" :class="{'overflow-hidden': isFixed}">
			<slot></slot>
		</div>
		<div class="base-card__footer" v-if="$slots.footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<style src="./index.scss" lang="scss" scoped></style>
