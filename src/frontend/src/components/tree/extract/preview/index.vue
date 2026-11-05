<script setup lang="ts">
import type { PdfManagerType } from "@/shared";
import { CaretDownOutlined } from "@ant-design/icons-vue";

defineOptions({
  name: "TreeExtractPreview",
});

const props = withDefaults(
  defineProps<{
    treeData: any[];
    profile_scan: any[];
    pdfViewer: PdfManagerType;
  }>(),
  {
    treeData: () => [],
    profile_scan: () => [],
  }
);

const handleChangeActive = (treeData: any[], el: any) => {
  treeData.forEach((item) => {
    item.active = false;
    if (item?.children?.length) {
      handleChangeActive(item.children, el);
    }
  });
  el.active = true;
  const index = props.profile_scan.findIndex((item) => item.key === el.key);
  props.pdfViewer.scrollToSelection(index);
};
</script>

<template>
  <div class="tree-extract-preview">
    <div class="tree-extract-preview__content" v-if="treeData.length">
      <div class="list" v-for="item in treeData" :key="item.key">
        <div class="list__title" @click="item.open = !item.open">
          <CaretDownOutlined
            class="rotate--90 cursor-pointer"
            :class="{ 'rotate-[0]!': !item.open }"
          />
          {{ item.value }}
        </div>
        <div
          class="els__children"
          v-if="!item.open"
          v-for="els in item.children"
          :key="els.key"
        >
          <div class="list__title" @click="els.open = !els.open">
            <CaretDownOutlined
              class="rotate--90 cursor-pointer"
              :class="{ 'rotate-[0]!': !els.open }"
            />
            {{ els.value }}
          </div>
          <div
            class="el__children"
            v-if="!els.open"
            v-for="el in els.children"
            :key="el.key"
          >
            <div
              class="list__title"
              @click.stop="handleChangeActive(treeData, el)"
              :class="{ active: el.active }"
            >
              {{ el.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
