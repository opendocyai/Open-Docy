<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Layout, LayoutHeader, Spin } from "ant-design-vue";
import { FilePreview } from "@/components";

definePage({
  meta: {
    name: "DetailPreview",
    layout: "custom",
    auth: true,
  },
});
const router = useRouter();
const route = useRoute();
const fileUrl = ref<any>("");
const isloading = ref(true);

const onBack = () => {
  if (route.query.type == "manual") {
    router.push(`/activity/manual-intervention?task_id=${route.query.task_id}`);
  } else if (route.query.type == "manual_invite") {
    router.push(
      `/activity/manual-intervention-from-invite?task_id=${route.query.task_id}&code=${route.query.code}`
    );
  } else {
    router.back();
  }
  localStorage.removeItem("manual_file_preview_url");
};
watch(
  () => fileUrl.value,
  (newVal) => {
    if (newVal) {
      isloading.value = false;
    }
  }
);
onMounted(async () => {
  fileUrl.value = localStorage.getItem("manual_file_preview_url");
});
</script>

<template>
  <Layout class="layout-wrap">
    <layout-header class="header">
      <div class="title">{{ route.query?.file_name }}</div>
    </layout-header>
    <div
      style="
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: auto;
      "
    >
      <div class="loading-box" v-if="isloading">
        <Spin />
      </div>
      <file-preview v-else :src="fileUrl" />
    </div>
  </Layout>
</template>

<style src="./index.scss" scoped lang="scss"></style>
