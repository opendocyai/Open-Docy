<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FilePreview } from '@/components'
import { Layout, LayoutHeader, Spin } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'

definePage({
  meta: {
    layout: "custom",
  }

});
const router = useRouter();
const route = useRoute();
const fileUrl = ref<any>('');
const isloading = ref(true);
const onBack = () => {
  if (route.query.task_name) {
    router.push(`/activity/audit-extract-generate?task_id=${route.query.task_id}&task_name=${route.query.task_name}&activatedTab=2`);
  } else {
    router.back();
  }
  localStorage.removeItem('generate_file_preview_url');
}
watch(() => fileUrl.value, (newVal) => {
  if (newVal) {
    isloading.value = false
  }
})
onMounted(async () => {
  fileUrl.value = localStorage.getItem('generate_file_preview_url');
});
</script>
<template>
  <Layout class="layout-wrap">
    <layout-header class="header">
      <div class="back-btn" @click="onBack">
        <LeftOutlined class="back-icon" />Back
      </div>
      <div class="title">{{ route.query?.file_name }}</div>
      <div></div>
    </layout-header>
    <div style="height: 100vh; display: flex; justify-content: center; overflow: auto">
      <div class="loading-box" v-if="isloading">
        <Spin />
      </div>
      <file-preview v-else :url="fileUrl" />
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.layout-wrap {
  height: 100vh;
  overflow: hidden;
  background-color: #f1f3f5;

  .header {
    background: #fff;
    height: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebebeb;

    .back-btn {
      cursor: pointer;
      font-family: Inter;
      display: flex;

      .back-icon {
        margin-right: 8px;
        font-size: 12px;
      }
    }

    .title {
      font-size: 16px;
      font-weight: 600;
      font-family: Inter;
    }
  }
}

.loading-box {
  @apply w-full h-full flex items-center justify-center flex-1;
}
</style>
