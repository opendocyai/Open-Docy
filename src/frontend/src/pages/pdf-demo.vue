<script setup lang="ts">
import { usePdfViewer } from '@/composables'
import { PdfStencil, NuxtIcon } from '@/components'
import { Button } from 'ant-design-vue'


import { ref } from 'vue'
import { type PdfManagerType } from '@/shared'

definePage({
	meta: {
		title: 'pdf demo',
		layout: 'custom'
	}
})

const scale = ref<number>(1);

const { pdfViewerInstance } = usePdfViewer();
const pdfViewer: PdfManagerType = pdfViewerInstance(scale.value);

const PdfStencilSrc = ref<any>(null);

const tabList = ref<any[]>([
	{ name: "Profile Scan", isSelectionMode: false, icon: "profile-scan" },
	{ name: "Area", isSelectionMode: true, icon: "area" },
	{ name: "Define Manually", isSelectionMode: false, icon: "manual" },
]);

const tabIndex = ref<number>(0);

function handleFileChange(e: any) {
	console.log(e.target.files[0])

	PdfStencilSrc.value = e.target.files[0];

}

const handleTabChange = async (index: number) => {
	tabIndex.value = index;
	const isSelectionMode = tabList.value[index].isSelectionMode;
	pdfViewer.setSelectionMode(isSelectionMode);
}
</script>

<template>
  <div class="h-full flex flex-col">
    <input type="file" @change="handleFileChange" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <pdf-stencil
        v-if="PdfStencilSrc"
        :src="PdfStencilSrc"
        :pdfViewer="pdfViewer"
        :scale="scale"
      >
        <template #toolbar>
          <div class="flex-1 flex items-center justify-center gap-3 h-[48px]">
            <template v-for="(item, index) in tabList" :key="item.name">
              <Button
                class="flex items-center gap-[4px] tab-btn"
                :class="{ 'btn-active': index == tabIndex }"
                @click="handleTabChange(index)"
              >
                <Suspense>
                  <NuxtIcon
                    :name="index != tabIndex ? item.icon : `${item.icon}-blue`"
                    filled
                  />
                </Suspense>
                {{ item.name }}
              </Button>
            </template>
          </div>
        </template>
        <template #sidebar>sidebar</template>
        <template #sidebar-footer>sidebar footer</template>
      </pdf-stencil>
    </div>
  </div>
</template>
