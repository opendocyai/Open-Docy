<script setup lang="ts">
defineOptions({
	name: 'PdfStencil',
})

import { Spin } from 'ant-design-vue'

import {
	ref, onMounted,
	nextTick,
	watch,
	onUnmounted,
	type Ref
} from 'vue'
import { type PdfManagerType, type SelectionCoords } from '@/shared';
import { usePdfViewer } from '@/composables';

import { NuxtIcon } from '@/components'

import { debounce } from 'lodash'

const emit = defineEmits(["showStyleEditor"]);
const props = withDefaults(
	defineProps<{
		src: string | FileList | File[];
		pdfViewer?: PdfManagerType;
		scale?: number;
		showSidebar?: boolean;
		showToolbar?: boolean;
		btnOffset?: { x: number; y: number };
		isShowBtn?: boolean;
		isShowZoomBtn?: boolean;
		showLeftSide?: boolean;
	}>(),
	{
		src: undefined,
		pdfViewer: undefined,
		scale: 1.5,
		showToolbar: true,
		showLeftSide: true,
		showSidebar: true,
		isShowBtn: false,
		isShowZoomBtn: false,
		btnOffset: () => ({ x: 0, y: 10 }),
	}
);

const viewerContainer = ref<HTMLElement | null>(null);

const { pdfViewerInstance } = usePdfViewer();
console.log("🚀 ~  ~ pdfViewerInstance: ", pdfViewerInstance);

const pdfViewer: PdfManagerType =
	props.pdfViewer || pdfViewerInstance(props.scale);

const pages = pdfViewer.getPages();

const activeSelectionDomPosition: Ref<SelectionCoords | any> =
	pdfViewer.getCurrentSelectionCoords();

const selectionMode = pdfViewer.getSelectionMode();

const getIsInitialRenderComplete = pdfViewer.getIsInitialRenderComplete()

const setCanvasRef = (el: HTMLCanvasElement | null, pageNumber: number) => {
	pdfViewer.setCanvasRef(el, pageNumber);
};

const handleMouseDown = (event: MouseEvent, pageNumber: number) => {
	pdfViewer.handleMouseDown(event, pageNumber);
};

const handleMouseMove = (event: MouseEvent, pageNumber: number) => {
	pdfViewer.handleMouseMove(event, pageNumber);
};

const handleMouseUp = (event: MouseEvent, pageNumber: number) => {
	pdfViewer.handleMouseUp(event, pageNumber);
};

const handleMouseLeave = () => {
	pdfViewer.handleMouseLeave();
};

const scale = ref(props.scale);

const zoomIn = debounce(() => {
	scale.value = (scale.value || 1) + 0.1;
	updateViewerScale();
}, 200);

const zoomOut = debounce(() => {
	if ((scale.value || 1) > 0.1) {
		scale.value = (scale.value || 1) - 0.1;
		updateViewerScale();
	}
}, 200);

const updateViewerScale = () => {
	pdfViewer.setScale(scale.value || 1);
};

onMounted(async () => {
	await nextTick();
	if (viewerContainer.value) {
		pdfViewer.initPdfViewer(viewerContainer.value);
	}
	console.log('props.src----props.src-----props.src', props.src);
	
	pdfViewer.loadSource(props.src)

	watch(
		() => selectionMode.value,
		(value) => {
			console.log(value, "selectionMode.value");
			if (value) {
				pdfViewer.addEventKeyDown();
			} else {
				pdfViewer.removeEventKeydown();
			}
		},
		{ immediate: true, deep: true }
	);

	pdfViewer.addEventKeyDown();
});

onUnmounted(() => {
	pdfViewer.destroy();
	pdfViewer.removeEventKeydown();
});
</script>

<template>
	<div class="pdf-container">
		<div class="toolbar" v-if="$slots.toolbar || props.showToolbar">
			<slot name="toolbar"></slot>
		</div>
		<div class="content-wrapper">
			<div class="left-side" v-if="$slots['left-side'] || props.showLeftSide">
				<slot name="left-side"></slot>
			</div>
			<div class="pdf-viewer" ref="viewerContainer">
				<Spin :spinning="!getIsInitialRenderComplete">
					<template v-if="pages?.length > 0">
						<div class="page-container relative" v-for="page in pages" :key="page.pageNumber">
							<canvas :ref="(el: any) => setCanvasRef(el, page.pageNumber)"
								@mousedown="handleMouseDown($event, page.pageNumber)"
								@mousemove="handleMouseMove($event, page.pageNumber)"
								@mouseup="handleMouseUp($event, page.pageNumber)" @mouseleave="handleMouseLeave"
								class="pdf-page" />
							<div v-if="
								page.pageNumber == activeSelectionDomPosition?.pageNumber &&
								isShowBtn
							" :style="{
								'--left-pos': `${activeSelectionDomPosition?.x + btnOffset?.x
									}px`,
								'--top-pos': `${activeSelectionDomPosition?.y1 + btnOffset?.y
									}px`,
							}" class="absolute z-10 left-[var(--left-pos)] top-[var(--top-pos)]">
								<slot name="canvas-btn" :page="page"></slot>
							</div>
						</div>
					</template>
				</Spin>
			</div>
			<div class="sidebar" v-if="$slots.sidebar || $slots['sidebar-footer'] || props.showSidebar">
				<div class="sidebar-list">
					<slot name="sidebar"></slot>
				</div>
				<div class="sidebar-footer">
					<slot name="sidebar-footer"></slot>
				</div>
			</div>
			<div class="right-side" v-if="$slots['right-side']">
				<slot name="right-side"></slot>
			</div>
		</div>
		<div class="zoom-controls" v-if="isShowZoomBtn">
			<div class="zoom-controls-btn">
				<NuxtIcon name="zoom-in" class="zoom-btn" @click="zoomIn" />
				<NuxtIcon name="zoom-out" class="zoom-btn" @click="zoomOut" />
			</div>
		</div>
	</div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
