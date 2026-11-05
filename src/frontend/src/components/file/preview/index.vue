<script setup lang="ts">
defineOptions({
    name: 'FilePreview'
})

import { FileViewer } from '@file-viewer/vue3'
import allPreset from '@file-viewer/preset-all'

withDefaults(defineProps<{
    file?: File | Blob | ArrayBuffer;
    url?: string;
}>(), {
    file: undefined,
    url: undefined
})

const viewerOptions: any = {
    preset: allPreset,
    renderers: allPreset.renderers,
    rendererMode: 'replace',
    theme: 'light',
    toolbar: false,
    locale: 'en-US'
}

</script>

<template>
    <div class="file-viewer">
        <FileViewer v-if="file || url" :file="file" :url="url" :options="viewerOptions" />
        <div v-else>Please select a file to preview</div>
    </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
