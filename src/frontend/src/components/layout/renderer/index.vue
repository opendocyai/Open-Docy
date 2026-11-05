<script setup lang="ts">
defineOptions({
  name: "LayoutRenderer",
})

import { onUnmounted, watch, ref } from 'vue'
import enUS from "ant-design-vue/es/locale/en_US";
import { ConfigProvider, message } from "ant-design-vue";

import { useSSE } from '@/composables'

import { useMainStore, useEventSourceStore } from '@/stores'

const themeToken = {
  colorPrimary: "#2E2BD9",
  colorSuccess: "#17C653",
};

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "@/layouts/default.vue";
import CustomLayout from "@/layouts/custom.vue";

const { reconnect, disconnect } = useSSE();

const route = useRoute();

const router = useRouter()

const mainStore = useMainStore();
const eventSourceStore = useEventSourceStore();

const layouts = {
  default: DefaultLayout,
  custom: CustomLayout,
};

const LayoutRenderer = computed(() => {
  const layout = route.meta?.layout as keyof typeof layouts;
  return layouts[layout] || DefaultLayout;
});

const routerReady = ref(false);

router.isReady().then(() => {
  routerReady.value = true;
});

watch(() => eventSourceStore.sse_data, (val) => {
  if (val) {
    const { event_type, object_type, object_id, content } = val;
    if (event_type == 'after_purchase') {
      if (object_type == 'user' && object_id == mainStore.userId) {
        message.success({ content, key: event_type });
      }
    }
  }
});


watch(() => mainStore.isLogin, (val) => {
  if (val && mainStore.token) {
    reconnect();
  } else {
    disconnect();
  }
}, { immediate: true })

onUnmounted(() => {
  disconnect();
});
</script>

<template>
  <ConfigProvider :locale="enUS" :theme="{ token: themeToken }">
    <template v-if="routerReady">
      <component :is="LayoutRenderer">
        <KeepAlive v-if="route.meta.keepAlive">
          <RouterView />
        </KeepAlive>
        <RouterView v-else />
      </component>
    </template>
  </ConfigProvider>
</template>

<style scoped></style>
