<script setup lang="ts">
defineOptions({
	name: 'BaseDialog',
})

import {
	useAttrs,
	ref,
	computed,
	useTemplateRef,
} from 'vue';

import { Modal, Button } from "ant-design-vue";

const emit = defineEmits<{
	(e: "ok", value: any): void;
	(e: "cancel", value: any): void;
}>();

const dialogRef = useTemplateRef<any>('dialogRef');

const isOpen = defineModel<boolean>({ default: false });
const fullscreen = ref<boolean>(false);
const okLoading = ref<boolean>(false);
const cancelLoading = ref<boolean>(false);

const okLoadingState = (state: boolean) => {
	okLoading.value = state;
};

const cancelLoadingState = (state: boolean) => {
	cancelLoading.value = state;
};

const attrs = useAttrs();

const ok = () => {
	emit("ok", { okLoadingState, attrs });
};

const cancel = () => {
	emit("cancel", { cancelLoadingState, attrs });
};

const wrapClassName = computed<string>(() => {
	return fullscreen.value ? 'full-modal' : attrs.wrapClassName ? String(attrs.wrapClassName) : ''
})

defineExpose({
	dialogRef,
});

</script>

<template>
	<Modal ref="dialogRef" v-bind="$attrs" v-model:open="isOpen" :ok-loading="okLoading" :cancel-loading="cancelLoading"
		:wrap-class-name="wrapClassName" @ok="ok" @cancel="cancel">
		<template #title v-if="$attrs.isHeader">
			<slot name="title">
				{{ $attrs.title }}
			</slot>
		</template>
		<template #default>
			<slot name="default" />
		</template>
		<template #footer v-if="$attrs.isFooter">
			<div class="flex gap-[5px] items-center justify-center"
				:class="{ 'justify-start!': $attrs.footerAlign === 'left', 'justify-end!': $attrs.footerAlign === 'right', 'justify-between': $attrs.footerAlign === 'between' }">
				<slot name="footer">
					<Button @click="cancel" v-if="$attrs.isCancel" :loading="cancelLoading">
						{{ $attrs.cancelText || "Cancel" }}
					</Button>
					<Button type="primary" v-if="$attrs.isConfirm" @click="ok" :loading="okLoading">
						{{ $attrs.okText || "Confirm" }}
					</Button>
				</slot>
			</div>
		</template>
	</Modal>
</template>

<style lang="scss">
.full-modal {
	.ant-modal {
		@apply max-w-full w-full! top-0 pb-0 m-0;

	}

	.ant-modal-content {
		@apply flex flex-col h-screen;
	}

	.ant-modal-body {
		@apply flex-1;
	}
}

.ant-modal .ant-modal-title {
	@apply font-[Inter-Medium,Inter] fw-600;
}

.ant-btn {
	@apply font-[Inter] fw-400;
}
</style>
