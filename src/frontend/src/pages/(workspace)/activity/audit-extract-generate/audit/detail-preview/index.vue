<script lang="ts" setup>
import { useApiActivity } from '@/api';
import { useHttp } from '@/client';
import { usePdfViewer } from '@/composables';
import type { PdfExportData, PdfManagerType } from '@/shared';
import { genFileId } from '@/utils';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ReteComponentDialogAuditPreview } from '@docyai/rete'
import { PdfStencil, NuxtIcon } from '@/components'
import { Layout, LayoutHeader, Drawer, Spin, Button } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import to from 'await-to-js';

definePage({
  meta: {
    layout: "custom",
  }
});

const { request } = useHttp();
const route = useRoute();
const router = useRouter()
const isOpenRightDrawer = ref(false);
const tabIndex = ref<number>(0);
const scale = ref<number>(1);
const { pdfViewerInstance } = usePdfViewer();
const pdfViewer: PdfManagerType = pdfViewerInstance(scale.value);
const domData = ref<any>();
const PdfStencilSrc = ref<any>(null);
const isPageLoading = ref<boolean>(false);
const form = ref<any>({
  profile_scan: [] as PdfExportData[],
});
const showRightDrawer = () => {
  isOpenRightDrawer.value = true;
};
const closeRightDrawer = () => {
  isOpenRightDrawer.value = false;
};
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
    console.log(
      `Import failed: ${error instanceof Error ? error.message : "invalid JSON format"}`
    );
  }
};

const get_fields = (fields: any[]) => {
  return fields.map((item: any) => {
    return {
      coordinates: item?.field_rect || item?.rect,
      page: (item?.field_page_number || item.page_number) + 1,
      name: item.field_name,
      value: item.message,
      pass: item.pass,
      key: genFileId()
    };
  });
};

const getDomTplDetail = async () => {
  isPageLoading.value = true;

  form.value.profile_scan = [];
  const task_id = route.query.task_id;
  const dataApi = useApiActivity("get_results_show_map_audit")(
    task_id
  );
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi,
      {
        data: {
          query_key: route.query.file_name,
        },
      })
  );
  if (error) {
    isPageLoading.value = false;
    return;
  }
  if (res?.code == 200) {
    console.log("🚀 ~ getDomTplDetail ~ data.value: ", res?.data);

    const item: any = res?.data?.find((item: any) => {
      return item.title == route.query.file_name;
    }) || {};
    console.log("🚀 ~ getDomTplDetail ~ item: ", item);

    const { files, values } = item

    console.log({ files, values }, " { files, values }");

    domData.value = values || [];
    form.value.profile_scan = get_fields(domData.value);

    let list: any = [];
    for (const key in files) {
      const item = files[key];
      list = [...list, item];
    }

    if (list.length) {
      PdfStencilSrc.value = list;
    } else {
      PdfStencilSrc.value = domData.value
        .map((item: { field_page: any }) => item.field_page)
        .filter(
          (page: any, index: number, self: any[]) =>
            page && self.indexOf(page) === index
        );
    }

    console.log("🚀 ~ getDomTplDetail ~ PdfStencilSrc.value: ", PdfStencilSrc.value);

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


function back() {
  router.push(`/activity/audit-extract-generate?task_id=${route.query.task_id}&task_name=${route.query.task_name}&activatedTab=0`)
}

onMounted(async () => {
  await getDomTplDetail();
});
</script>
<template>
  <Layout class="layout-wrap">
    <layout-header class="header">
      <div class="back-btn" @click="back">
        <LeftOutlined class="back-icon" />Back
      </div>
      <div class="title">{{ route.query.file_name }}</div>
      <div></div>
    </layout-header>
    <div class="open-drawer-btn fill-revert-layer" @click="showRightDrawer">
      <NuxtIcon name="step-o" class="text-[16px]" filled/>
    </div>
    <div class="h-full flex items-center justify-center" v-if="isPageLoading">
      <Spin :spinning="isPageLoading"></Spin>
    </div>
    <PdfStencil :src="PdfStencilSrc" :scale="scale" :pdfViewer="pdfViewer" v-if="PdfStencilSrc">
      <template #right-side>
        <div class="w-0 h-full relative">
          <Drawer placement="right" v-bind:open="isOpenRightDrawer" rootClassName="sider-drawer" :width="400"
            :get-container="false" :closable="false" :mask="false" :bodyStyle="{ padding: '0 26px 20px' }" :headerStyle="{
              'border-bottom': '1px solid #EAEDF0',
              padding: '14px 20px 14px 30px',
            }" :footerStyle="{
              'border-top': '0px',
            }" :style="{ position: 'absolute' }" @close="closeRightDrawer">
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
            <ReteComponentDialogAuditPreview :pdfViewer="pdfViewer as any" :form="form" />
          </Drawer>
        </div>
      </template>
    </PdfStencil>
  </Layout>
</template>
<style src="./index.scss" scoped lang="scss"></style>
