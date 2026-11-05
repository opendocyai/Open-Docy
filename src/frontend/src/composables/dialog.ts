import {BaseDialog} from "@/components";

import {h, ref, useSlots} from "vue";
import type {Component, Ref} from "vue";

import {useDialogConfig} from './dialogConfig'

export interface DialogExpose {
	on: {};
	Dialog: Component;
	open: (...args: any[]) => void;
	close: () => void;
	setTitle: (title: string) => void;
	setAttr: (attr: Record<string, any>) => void;
	dialogRef: Ref<any | null>;
}

export function useDialog(
	dialogProps: Record<string, any> | null = null
): DialogExpose {
	const {dialogWidthFn} = useDialogConfig();

	const isOpen = ref<boolean>(false);
	const isFooter = ref<boolean>(true);
	const isHeader = ref<boolean>(true);
	const isCancel = ref<boolean>(true);
	const isConfirm = ref<boolean>(true);
	const title = ref<string | undefined>(undefined);
	const width = ref<string>("50%");

	const baseDialogRef = ref<any | null>(null);

	const openArgs = ref<any[]>([]);
	const closeArgs = ref<any[]>([]);

	const on = ref<{
		ok: (...args: any[]) => any;
		cancel: (...args: any[]) => any;
	}>({
		ok: () => {
		}, cancel: () => {
		}
	});

	const open = (...args: any[]) => {
		openArgs.value = args;
		closeArgs.value = args;
		isOpen.value = true;
	};

	const close = () => {
		isOpen.value = false;
	};

	const setTitle = (string: string | undefined) => (title.value = string);
	const setAttr = (attr: Record<string, any>) =>
		Object.assign(dialogProps ?? {}, attr);

	const Dialog = (props: Record<string, any> = {}) => {
		const slots = useSlots();
		const args = Object.assign(dialogProps ?? {}, props);

		if (args?.appendToBody === undefined) {
			args.appendToBody = true;
		}

		if (args?.closeOnClickModal === undefined) {
			args.closeOnClickModal = false;
		}

		const ok = ({okLoadingState}: any) => {
			openArgs.value.push(okLoadingState);
			return args?.ok?.(...openArgs.value) ?? on.value?.ok?.(...openArgs.value);
		};

		const cancel = ({cancelLoadingState}: any) => {
			closeArgs.value.push(cancelLoadingState);
			return args?.cancel
				? args?.cancel?.(...closeArgs.value)
				: on.value?.cancel?.(...closeArgs.value) ?? true
					? cancelLoadingState(false) || close()
					: null;
		};

		return h(
			BaseDialog,
			{
				ref: baseDialogRef,
				modelValue: isOpen.value,
				"onUpdate:modelValue": (val: boolean) => (isOpen.value = val),
				draggable: props.draggable ?? true,
				title: props?.title ?? title.value,
				isFooter: props?.isFooter ?? isFooter.value,
				isCancel: props?.isCancel ?? isCancel.value,
				isConfirm: props?.isConfirm ?? isConfirm.value,
				isHeader: props?.isHeader ?? isHeader.value,
				destroyOnClose: true,
				...args,
				width:
					props.width ?? args.width
						? dialogWidthFn(props.width ?? args.width)
						: dialogWidthFn(width.value),
				onOk: ok,
				onCancel: cancel,
			},
			{
				...slots,
				...Object.fromEntries(
					Object.keys(slots).map((key) => [
						key,
						(...args: any[]) => slots[key]?.(...(openArgs.value || args)),
					])
				),
			}
		)
	}

	return {
		on: on.value,
		dialogRef: baseDialogRef,
		Dialog,
		open,
		close,
		setTitle,
		setAttr,
	};

}
