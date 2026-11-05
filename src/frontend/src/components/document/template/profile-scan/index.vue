<script setup lang="ts">
import type { PdfExportData, PdfManagerType, PdfSelection } from '@/shared';
import { debounce } from 'lodash';
import { nextTick, onMounted, ref } from 'vue';
import { List, ListItem, ListItemMeta, Checkbox, Input } from 'ant-design-vue'

defineOptions({name: 'DocumentTemplateProfileScan'})
const props = withDefaults(
  defineProps<{
    form: {
      profile_scan: PdfSelection[];
    };
    pdfViewer: PdfManagerType;
  }>(),
  {}
);
const selectionListContainer = ref<any>(null);

const activeSelectionIndex = props.pdfViewer?.getActiveSelectionIndex();
const emit = defineEmits(["goToPage", "handleListClick", "onChange"]);
const handleCheckboxChange = (e: any) => {
  emit('onChange', e)
}

const scrollToSelection = (index: number) => {
  props.pdfViewer.scrollToSelection(index);
};
const handleChangeName = debounce((item: PdfExportData) => {
  props.pdfViewer.setPdfSelection(item.page, { name: item.name });
}, 150);
onMounted(async () => {
  await nextTick();
  if (selectionListContainer.value) {
    props.pdfViewer?.setSelectionListContainer(
      selectionListContainer.value.$el
    );
  }
});
</script>


<template>
  <div class="list-wrap">
    <div class="description">
      Select the fields you want to extract from the document
    </div>
    <List
      size="small"
      :data-source="form.profile_scan"
      :split="false"
      ref="selectionListContainer"
      class="select-list"
    >
      <template #renderItem="{ item, index }">
        <list-item
          :class="[
            'select-list-item',
            { active: activeSelectionIndex === index },
          ]"
          :data-selection-index="index"
          @click="scrollToSelection(index)"
        >
          <list-item-meta>
            <template #avatar>
              <Checkbox v-model:checked="item.checked" @click.stop @change="handleCheckboxChange"/>
            </template>
            <template #title>
              <span class="list-title" :title="item.name">
                <Input v-model:value="item.name" @keydown.stop @change="handleChangeName(item)"/>
              </span>
            </template>
          </list-item-meta>
        </list-item>
      </template>
    </List>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
