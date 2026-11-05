<script setup lang="ts">
import { Application } from '@splinetool/runtime'

import { ref, onMounted } from 'vue'

defineOptions({
	name: 'SplineViewer'
})

const containerRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
	if (!containerRef.value) {
		console.error('containerRef is null')
		return;
	}
	
	console.log('containerRef:', containerRef.value)
	
	const app = new Application(containerRef.value);
	
	app.load('/scene.splinecode').then(() => {
		console.log('Spline scene loaded!')
	}).catch((err: any) => {
		console.error('Failed to load spline scene:', err)
	})
})

</script>

<template>
	<canvas ref="containerRef" class="spline-viewer"></canvas>
</template>

<style scoped>
.spline-viewer {
	@apply w-full h-screen block;
}
</style>
