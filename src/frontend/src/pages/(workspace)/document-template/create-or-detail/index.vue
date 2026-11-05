<script setup lang="ts">
import { useApiDom } from "@/api";
import { useHttp } from "@/client";
import { usePdfViewer } from "@/composables";
import { blobToFile, toProxyUrl, type PdfExportData, type PdfManagerType } from "@/shared";
import { useCommonStore, useEventSourceStore } from "@/stores";
import { message, Layout, LayoutHeader, Drawer, Button, Spin } from "ant-design-vue";
import { LeftOutlined } from "@ant-design/icons-vue";
import to from "await-to-js";
import { cloneDeep, debounce, throttle } from "lodash";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ReteComponentDialogArea } from "@docyai/rete";
import {
  PdfStencil,
  NuxtIcon,
  PdfAnnotatorStyleEditor,
  DocumentTemplateProfileScan,
  FilePreview,
} from "@/components";

definePage({
  meta: {
    layout: "custom",
  },
});

const commonStore: any = useCommonStore();

const { request } = useHttp();
const route = useRoute();
const router = useRouter();
const applyRuleLoading = ref(false);
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
  { name: "Area", isSelectionMode: true, icon: "area" },
  { name: "Profile Scan", isSelectionMode: false, icon: "profile-scan" },
]);
const tabIndex = ref<number>(0);
const scale = ref<number>(1.3);

const form = ref<any>({
  profile_scan: [] as PdfExportData[],
  area: [] as PdfExportData[],
});

const originalSelections = ref<any>({
  0: [],
  1: [],
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
    if (tabIndex.value === 0) {
      form.value.area = cloneDeep(pdfViewer.exportSelections());
    } else if (tabIndex.value === 1) {
      form.value.profile_scan = pdfViewer.exportSelections().map((sel) => ({
        ...sel,
        value_cell: {
          x1: sel.coordinates[0],
          y1: sel.coordinates[1],
          x2: sel.coordinates[2],
          y2: sel.coordinates[3],
        },
      }));
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => activeSelectionIndex.value,
  (value) => {
    if (activeSelection.value) styleFormData.value = activeSelection.value?.style;
  },
  { deep: true, immediate: true }
);

const handleTabChange = async (index: number) => {
  originalSelections.value[tabIndex.value] = cloneDeep(pdfViewer.exportSelections());

  tabIndex.value = index;
  const isSelectionMode = tabList.value[index]?.isSelectionMode;
  pdfViewer.setSelectionMode(isSelectionMode);

  pdfViewer.clearAllSelections();

  await nextTick();
  console.log("originalSelections==", originalSelections.value);
  if (isRenderingComplete.value) {
    if (originalSelections.value[index] && originalSelections.value[index]?.length > 0) {
      console.log("originalSelections.value[index]===", originalSelections.value[index]);
      importSelections(originalSelections.value[index]);
    } else {
      if (index === 0) {
        await importArea();
      } else if (index === 1) {
        await importProfileScan();
      }
    }
  } else {
    console.log("Rendering still in progress. Will retry later.");
    setTimeout(() => handleTabChange(index), 500);
  }
};

const closeleftDrawer = () => {
  commonStore.SET_IS_SHOW_STYLE_DRAWER(false);
};

const handleStyleEditor = () => {
  commonStore.SET_IS_SHOW_STYLE_DRAWER(!commonStore.isShowStyleDrawer);
  styleFormData.value = activeSelection.value?.style;
};

const debouncedApply = debounce((nStyle: BoxStyle) => {
  pdfViewer?.setSelectionStyle(activeSelection.value?.page, nStyle);
  latestStyle.value = cloneDeep(nStyle);
}, 300);

watch(styleFormData, debouncedApply, { deep: true });

function transformAreaFieldList(data: any): any[] {
  return data?.map(
    (area: {
      checked: any;
      coordinates: any;
      id: any;
      name: any;
      value_cell: { x1: any; x2: any; y1: any; y2: any };
      page: any;
      style: any;
    }) => ({
      id: area.id,
      name: area.name,
      checked: area.checked,
      value_cell: {
        x1: area.coordinates[0],
        x2: area.coordinates[2],
        y1: area.coordinates[1],
        y2: area.coordinates[3],
      },
      page: area.page,
      style: area.style,
    })
  );
}

const transformAutoFieldList = (field_dict: any[]): any[] => {
  console.log("field_dict==============", field_dict);
  const result = field_dict?.map(
    (auto: {
      checked: any;
      coordinates: any;
      id: any;
      name: any;
      value_cell: { x1: any; x2: any; y1: any; y2: any };
      page: any;
      style: any;
    }) => ({
      id: auto.id,
      name: auto.name,
      checked: auto.checked,
      value_cell: auto.value_cell,
      page: auto.page,
      style: auto.style,
    })
  );
  return result;
};
const oldScanData = ref<any>();
const handleApplyRule = async () => {
  const autoList = form.value?.profile_scan
    ? transformAutoFieldList(form.value?.profile_scan)
    : [];
  const areaList = form.value?.area ? transformAreaFieldList(form.value?.area) : [];
  const params = { auto: autoList, area: areaList };

  applyRuleLoading.value = true;
  const tpl_id = route.query.tpl_id;
  const dataApi = useApiDom("update_dom_tpl")(tpl_id);
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi, { data: params })
  );
  applyRuleLoading.value = false;

  if (error) return;
  if (res?.code === 200) {
    if (tabIndex.value == 1) {
      form.value.profile_scan = form.value?.profile_scan;
    } else {
      form.value.area = form.value?.area;
    }
    navigateTo("/document-template");
  }
};

const pdfUrl = shallowRef<any>();
const domData = ref<any>();
const isPageLoading = ref<boolean>(false);

const getDomTplDetail = async () => {
  form.value.area = [];
  form.value.profile_scan = [];
  originalSelections.value = [];
  const tpl_id = route.query.tpl_id;
  const dataApi = useApiDom("get_dom_tpl_detail")(tpl_id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
  if (error) return;
  if (res?.code == 200) {
    domData.value = res?.data;

    if (res?.data?.field_dict?.area) {
      form.value.area =
        res?.data?.field_dict?.area?.length > 0
          ? res?.data?.field_dict?.area?.map(
              (item: { id: any; value_cell: { x1: any; y1: any; x2: any; y2: any } }) => {
                const { x1, y1, x2, y2 } = item.value_cell || {};
                return {
                  ...item,
                  id: item.id ?? "",
                  coordinates: [x1, y1, x2, y2],
                };
              }
            )
          : [];
    }

    if (res?.data?.field_dict?.auto) {
      form.value.profile_scan =
        res?.data?.field_dict?.auto?.length > 0
          ? res?.data?.field_dict?.auto?.flatMap((item: { data: any[]; page: any }) =>
              item.data?.map((dataItem: any) => ({
                ...dataItem,
                page: item.page,
              }))
            )
          : [];
    }

    const profileScanArray = cloneDeep(form.value?.profile_scan)?.map((item: any) => {
      if (!item) return item;
      const { x1, y1, x2, y2 } = item.value_cell ?? {};
      item.coordinates = [x1, y1, x2, y2];
      return item;
    });

    originalSelections.value = [form?.value.area, profileScanArray];
    if (res.data.ext == "pdf") {
      const url = toProxyUrl(res.data.file_download_url) ?? "";
      
      
      pdfUrl.value = url;
      console.log('pdfUrl.value :', pdfUrl.value);
    }

    await nextTick();
    if (tabIndex.value == 0) {
      importArea();
    } else if (tabIndex.value === 1) {
      await importProfileScan();
    }
  }
};

const importArea = async () => {
  const array: any[] = cloneDeep(form.value?.area)?.filter(
    (item: any) => item.coordinates?.length >= 4
  );
  originalSelections.value[0] = array;
  importSelections(array);
};

const importProfileScan = async () => {
  importSelections(originalSelections.value[1]);
};

const MAX_NUM = 3;
let count_num = 1;

const importSelections = async (data: any[]) => {
  try {
    if (!Array.isArray(data)) {
      console.error("Invalid data format, must be an array");
    }

    if (isRenderingComplete.value) {
      pdfViewer?.importSelections(data);
    } else {
      if (domData.value?.status !== 2) {
        count_num += 1;
        if (count_num >= MAX_NUM) return;
        console.log("PDF rendering not complete yet. Waiting...");
        setTimeout(() => importSelections(data), 500);
      }
    }
  } catch (error) {
    console.log(`Import failed: ${error instanceof Error ? error.message : "invalid JSON format"}`);
  }
};

const retryExtractData = throttle(async () => {
  const tpl_id = route.query.tpl_id;
  const dataApi = useApiDom("extract_dom_tpl")(tpl_id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
  applyRuleLoading.value = false;

  if (error) return;
  if (res?.code == 200) {
    getDomTplDetailAndRender();
  }
}, 3000);

const eventSourceStore = useEventSourceStore();

const getDomTplDetailAndRender = async () => {
  isPageLoading.value = true;
  await getDomTplDetail();
};

const handleCheckboxChange = async () => {
  originalSelections.value[0] = form.value.area;
  originalSelections.value[1] = form.value.profile_scan;
  pdfViewer.clearAllSelections();
  await nextTick();
  if (
    originalSelections.value[tabIndex.value] &&
    originalSelections.value[tabIndex.value].length > 0
  ) {
    pdfViewer.importSelections(originalSelections.value[tabIndex.value]);
  }
};

onMounted(async () => {
  await getDomTplDetailAndRender();
  tabIndex.value = 0;

  updateDrawerWidth();
  window.addEventListener("resize", updateDrawerWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateDrawerWidth);
  pdfViewer.destroy();
});
const drawerWidth = ref(300);

function updateDrawerWidth() {
  const w = window.innerWidth;
  if (w <= 1180) {
    drawerWidth.value = 250;
  } else if (w <= 1366) {
    drawerWidth.value = 300;
  } else {
    drawerWidth.value = 450;
  }
}
const isPdfReady = ref(false);
const isRenderingComplete = ref(false);

watch(
  () => pdfViewer.getIsInitialRenderComplete().value,
  async (newVal) => {
    if (newVal) {
      isPdfReady.value = true;
      isRenderingComplete.value = true;
      showRightDrawer();
      handleTabChange(tabIndex.value);
    }
  },
  { immediate: true }
);

watch(
  () => domData.value?.status,
  (newVal) => {
    if (newVal !== 2) {
      isPageLoading.value = false;
    } else {
      isPageLoading.value = true;
    }
  }
);

watch(
  () => eventSourceStore.sse_data,
  (newVal: any) => {
    if (!newVal?.event_type) return;
    if (newVal?.event_type === "template_status_changed") {
      if (newVal?.payload?.status == 3) {
        message.warning(newVal?.content);
      }
      getDomTplDetailAndRender();
    }
  },
  { deep: true }
);

const canApplyRule = computed(() => {
  const hasChecked = form.value?.profile_scan.some(
    (item: { checked: any }) => item?.checked
  );
  const hasArea = Array.isArray(form.value?.area) && form.value?.area?.length > 0;
  return hasChecked || hasArea;
});

function navigateTo(name: string) {
  router.push(name);
}
</script>

<template>
  <Layout class="layout-wrap">
    <layout-header class="header">
      <div class="back-btn" @click="navigateTo('/document-template')">
        <LeftOutlined class="back-icon" />Back
      </div>
      <div class="title">{{ domData?.name }}</div>
      <div>
        <Button
          type="primary"
          block
          :loading="applyRuleLoading"
          :disabled="
            applyRuleLoading ||
            !canApplyRule ||
            !isRenderingComplete ||
            domData?.status == 2
          "
          @click="handleApplyRule"
          class="font-[Inter] w-[121px]! h-[41px]"
        >
          Apply Rule
        </Button>
      </div>
    </layout-header>

    <div class="h-full flex overflow-hidden">
      <div class="flex-1 h-full flex flex-col overflow-hidden">
        <div
          class="open-drawer-btn"
          @click="showRightDrawer"
          v-if="domData?.ext?.toLowerCase() == 'pdf' && !isPageLoading"
        >
          <NuxtIcon name="step-o" class="text-[16px]" />
        </div>

        <div class="h-full flex items-center justify-center" v-if="isPageLoading">
          <Spin :spinning="isPageLoading"></Spin>
        </div>

        <PdfStencil
          v-if="domData?.file_download_url && domData?.ext?.toLowerCase() == 'pdf' && pdfUrl"
          :src="pdfUrl"
          :scale="scale"
          :isShowBtn="true"
          :isShowZoomBtn="true"
          :pdfViewer="pdfViewer"
        >
          <template #toolbar>
            <div class="flex-1 flex items-center justify-center gap-3 h-[48px]">
              <template v-for="(item, index) in tabList" :key="item.name">
                <Button
                  class="flex items-center gap-[4px] fill-revert-layer tab-btn font-[Inter]"
                  :class="{ 'btn-active': index == tabIndex }"
                  :disabled="isPageLoading"
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
          <template #left-side v-if="commonStore.isShowStyleDrawer">
            <div class="h-full w-0 relative" id="left-side">
              <Drawer
                placement="left"
                v-bind:open="commonStore.isShowStyleDrawer"
                rootClassName="sider-drawer"
                :get-container="false"
                :closable="false"
                :mask="false"
                :width="drawerWidth"
                :bodyStyle="{ padding: '0 20px 20px' }"
                :headerStyle="{
                  'border-bottom': '0px',
                  padding: '10px 20px 0px 20px',
                }"
                :style="{
                  position: 'absolute',
                  'border-top': '1px solid #F1F3F5',
                }"
                @close="closeleftDrawer"
              >
                <template #title>
                  <span class="sider-title font-[Inter]"> Text Filed Annotation </span>
                </template>
                <template #extra>
                  <Button type="link" class="px-0" @click="closeleftDrawer">
                    <NuxtIcon name="close" class="c-[#212121] text-[22px]" />
                  </Button>
                </template>
                <pdf-annotator-style-editor v-model="styleFormData" />
              </Drawer>
            </div>
          </template>
          <template #canvas-btn>
            <div class="box-menu">
              <Button
                :class="[
                  'menu-icon-btn',
                  commonStore.isShowStyleDrawer ? 'active-menu-icon-btn' : '',
                ]"
                @click="handleStyleEditor"
              >
                <NuxtIcon
                  name="style-icon"
                  :class="
                    commonStore.isShowStyleDrawer
                      ? 'text-[18px] c-[#2E2BD9]'
                      : 'text-[18px] c-[#999999]'
                  "
                />
              </Button>
            </div>
          </template>

          <template #right-side>
            <div class="w-0 h-full relative">
              <Drawer
                placement="right"
                v-bind:open="isOpenRightDrawer"
                rootClassName="sider-drawer"
                :get-container="false"
                :closable="false"
                :mask="false"
                :width="drawerWidth"
                :bodyStyle="{ padding: '0 20px 20px' }"
                :headerStyle="{
                  'border-bottom': '0px',
                  padding: '10px 20px 0px 30px',
                }"
                :footerStyle="{
                  'border-top': '0px',
                }"
                :style="{
                  position: 'absolute',
                  'border-top': '1px solid #F1F3F5',
                }"
                @close="closeRightDrawer"
              >
                <template #title>
                  <div class="sider-title" v-if="tabIndex == 0">
                    Area ({{ form.area?.length || 0 }})
                  </div>
                  <div class="sider-title" v-if="tabIndex == 1">
                    Profile Auto scan results ({{ form?.profile_scan?.length || 0 }})
                  </div>
                </template>
                <template #extra>
                  <Button type="link" class="px-0" @click="closeRightDrawer">
                    <NuxtIcon name="close" class="c-[#212121] text-[22px]" />
                  </Button>
                </template>
                <div v-if="isPdfReady" :key="tabIndex">
                  <ReteComponentDialogArea
                    v-if="tabIndex == 0"
                    :pdfViewer="pdfViewer as any"
                    :form="form"
                    @onChange="handleCheckboxChange"
                  />
                  <DocumentTemplateProfileScan
                    v-if="tabIndex == 1"
                    :pdfViewer="pdfViewer"
                    :form="form"
                    @onChange="handleCheckboxChange"
                  />
                </div>
                <div
                  v-if="tabIndex == 1 && !form.profile_scan"
                  class="flex flex-col items-center justify-center"
                >
                  <img src="@/assets/images/scan-failed.svg" alt="" class="text-[55px]" />
                  <div class="text-[13px] c-[#999999]">
                    Automatic document scan failed. You can
                    <Button type="link" class="px-0 c-[#2E2BD9]" @click="retryExtractData"
                      >[Retry]</Button
                    >
                    or switch to Area mode to set the file.
                  </div>
                </div>

                <template #footer v-if="tabIndex == 1">
                  <div class="w-[100%] flex justify-center">
                    <Button
                      class="text-[#2E2BD9] flex items-center justify-center text-[13px] w-[126px] h-[38px] mb-[20px] font-[Inter]"
                      style="background-color: #2e2bd912"
                      type="primary"
                      ghost
                      @click="retryExtractData"
                    >
                      <NuxtIcon name="re-scan" class="icon text-[18px] mr-[10px]" />
                      Retry
                    </Button>
                  </div>
                </template>
              </Drawer>
            </div>
          </template>
        </PdfStencil>

        <file-preview
          v-if="
            domData?.file_download_url &&
            domData?.ext?.toLowerCase() == 'docx' &&
            !isPageLoading
          "
          :src="domData?.file_download_url"
          @loaded="domData?.status !== 2 ? (isPageLoading = false) : ''"
        />
      </div>
    </div>
  </Layout>
</template>

<style src="./index.scss" scoped lang="scss"></style>
