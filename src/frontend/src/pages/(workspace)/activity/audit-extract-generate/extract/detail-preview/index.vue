<script lang="ts" setup>
import { useApiActivity } from "@/api";
import { useHttp } from "@/client";
import { usePdfViewer } from "@/composables";
import type { PdfExportData, PdfManagerType } from "@/shared";
import { useCommonStore } from "@/stores";
import { genFileId } from "@/utils";
import { cloneDeep } from "lodash";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ReteComponentDialogExtractPreview } from "@docyai/rete";
import { NuxtIcon, PdfStencil } from "@/components";
import { Layout, LayoutHeader, Drawer, Spin } from "ant-design-vue";
import { LeftOutlined } from "@ant-design/icons-vue";
import to from "await-to-js";

definePage({
  meta: {
    layout: "custom",
  },
});
const commonStore: any = useCommonStore();

const { request } = useHttp();
const route = useRoute();
const router = useRouter();
interface BoxStyle {
  font_name: string;
  font_size: number;
  text_color: string;
  border_color: string;
  border_width: number;
  border_style: string;
  background_color: string;
}
const styleFormData = ref<BoxStyle>({
  font_name: "",
  font_size: 12,
  text_color: "",
  border_color: "",
  border_width: 0,
  border_style: "",
  background_color: "",
});

const latestStyle = ref<BoxStyle>({
  font_name: "",
  font_size: 12,
  text_color: "",
  border_color: "",
  border_width: 0,
  border_style: "",
  background_color: "",
});

const isOpenRightDrawer = ref(false);

const showRightDrawer = () => {
  isOpenRightDrawer.value = true;
};
const closeRightDrawer = () => {
  isOpenRightDrawer.value = false;
};

const tabList = ref<any[]>([
  { name: "Profile Scan", isSelectionMode: false, icon: "profile-scan" },
]);
const tabIndex = ref<number>(0);
const scale = ref<number>(1);

const form = ref<any>({
  profile_scan: [] as PdfExportData[],
  area: [] as PdfExportData[],
});

const originalSelections = ref<Record<number, PdfExportData[]>>({
  0: [],
});

const { pdfViewerInstance } = usePdfViewer();
const pdfViewer: PdfManagerType = pdfViewerInstance(scale.value);
const selections = pdfViewer.getSelections();
const activeSelectionIndex = computed(() => pdfViewer.getActiveSelectionIndex().value);
const activeSelection = computed(() =>
  activeSelectionIndex.value !== null
    ? selections.value[activeSelectionIndex.value]
    : null
);

const isSelecting = pdfViewer.getIsSelecting();

watch(
  () => isSelecting.value,
  (val) => {
    if (!val) {
      commonStore.SET_IS_SHOW_STYLE_DRAWER(false);
      let len = selections.value?.length;
      pdfViewer?.setSelectionStyle(selections.value?.[len - 1]?.page, latestStyle.value);
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => selections.value,
  () => {
    if (tabIndex.value === 1) {
      form.value.area = cloneDeep(pdfViewer.exportSelections());
    }
  },
  { deep: true }
);

watch(
  () => activeSelectionIndex.value,
  (value) => {
    if (activeSelection.value) styleFormData.value = activeSelection.value?.style;
  },
  { deep: true }
);

const handleTabChange = async (index: number) => {
  originalSelections.value[tabIndex.value] = cloneDeep(pdfViewer.exportSelections());

  tabIndex.value = index;
  const isSelectionMode = tabList.value[index].isSelectionMode;
  pdfViewer.setSelectionMode(isSelectionMode);

  pdfViewer.clearAllSelections();

  await nextTick();

  if (originalSelections.value[index] && originalSelections.value[index].length > 0) {
    importSelections(originalSelections.value[index]);
  } else {
    if (index === 0) {
      importProfileScan();
    } else if (index === 1) {
    }
  }
};

const domData = ref<any>();
const PdfStencilSrc = ref<any>(null);
const isPageLoading = ref<boolean>(false);

const importProfileScan = () => {
  importSelections(form.value.profile_scan);
};

const importSelections = (data: any[]) => {
  try {
    if (!Array.isArray(data)) {
      console.error("Invalid data format, must be an array");
    }
    pdfViewer?.importSelections(data);
  } catch (error) {
    console.log(`Import failed: ${error instanceof Error ? error.message : "invalid JSON format"}`);
  }
};
const get_fields = (fields: any[]) => {
  return fields.map((item: any) => {
    return {
      coordinates: item.rect,
      page: item.page_number + 1,
      name: item.field_name,
      value: item.field_value,
      key: genFileId(),
    };
  });
};

const getDomTplDetail = async () => {
  isPageLoading.value = true;

  form.value.area = [];
  form.value.profile_scan = [];
  originalSelections.value = [];
  const task_id = route.query.task_id;
  const dataApi = useApiActivity("get_results_show_map_extract")(task_id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi, {
    data: {
      query_key: route.query.name,
    },
  }));
  if (error) {
    isPageLoading.value = false;
    return;
  }
  if (res?.code == 200) {
    const { file_shows, values } = res.data.find((item: any) => {
      return item.title == route.query.file_name;
    });

    domData.value = values || [];
    form.value.profile_scan = get_fields(domData.value);

    console.log(form.value.profile_scan, "form.value.profile_scan");

    if (file_shows.length) {
      PdfStencilSrc.value = file_shows;
    } else {
      PdfStencilSrc.value = domData.value
        .map((item: { field_page: any }) => item.field_page)
        .filter(
          (page: any, index: number, self: any[]) => page && self.indexOf(page) === index
        );
    }
    importProfileScan();
  }
};

watch(
  () => pdfViewer.getIsInitialRenderComplete().value,
  (newVal) => {
    if (newVal) {
      isPageLoading.value = false;
      showRightDrawer();
    }
  },
  { immediate: true }
);
onMounted(async () => {
  await getDomTplDetail();
  handleTabChange(0);
});
</script>
<template>
  <Layout class="layout-wrap">
    <layout-header class="header">
      <div
        class="back-btn"
        @click="
          router.push(
            `/activity/audit-extract-generate?task_id=${route.query.task_id}&task_name=${route.query.task_name}&activatedTab=1`
          )
        "
      >
        <LeftOutlined class="back-icon" />Back
      </div>
      <div class="title">{{ route.query.file_name }}</div>
      <div></div>
    </layout-header>
    <div class="open-drawer-btn fill-revert-layer" @click="showRightDrawer">
      <NuxtIcon name="step-o" class="text-[16px]" />
    </div>
    <div class="h-full flex items-center justify-center" v-if="isPageLoading">
      <Spin :spinning="isPageLoading"></Spin>
    </div>
    <PdfStencil
      v-if="PdfStencilSrc"
      :src="PdfStencilSrc"
      :scale="scale"
      :pdfViewer="pdfViewer"
    >
      <template #right-side>
        <div class="w-0 h-full relative">
          <Drawer
            placement="right"
            v-bind:open="isOpenRightDrawer"
            rootClassName="sider-drawer"
            :width="400"
            :get-container="false"
            :closable="false"
            :mask="false"
            :bodyStyle="{ padding: '0 26px 20px' }"
            :headerStyle="{
              'border-bottom': '1px solid #EAEDF0',
              padding: '14px 20px 14px 30px',
            }"
            :footerStyle="{
              'border-top': '0px',
            }"
            :style="{ position: 'absolute' }"
            @close="closeRightDrawer"
          >
            <template #title>
              <div class="sider-title" v-if="tabIndex == 0">
                Profile Auto scan results ({{ form.profile_scan?.length || 0 }})
              </div>
            </template>
            <template #extra>
              <Button type="link" class="px-0" @click="closeRightDrawer">
                <NuxtIcon name="close" class="c-[#212121] text-[22px]" />
              </Button>
            </template>
            <ReteComponentDialogExtractPreview
              v-if="tabIndex == 0"
              :pdfViewer="pdfViewer as any"
              :form="form"
            />
          </Drawer>
        </div>
      </template>
    </PdfStencil>
  </Layout>
</template>
<style src="./index.scss" scoped lang="scss"></style>
