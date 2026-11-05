import type { RouteLocationNormalizedLoaded, Router } from "vue-router";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useIndexedDB } from "@/composables";

export const useMenuKeys = () => {
  const route = useRoute() as RouteLocationNormalizedLoaded;
  const router = useRouter() as Router;

  const selectedKeys = computed(() => {
    return route.path ? [route.path as string] : [];
  });

  async function onMenuClick({ key, item: { item } }: any) {
    console.log("key :", key);
    console.log("🚀 ~ onMenuClick ~ item: ", item);
    console.log('route :', route);
    if (key === route.path) return;
    const { resetAndRebuildDatabase } = useIndexedDB();
    if (item.meta.icon == "api-key") {
      return;
    } else {
      await resetAndRebuildDatabase();

      if (item && item?.path != key) return router.push(item?.path);
      await router.push({ path: key });
    }
  }

  return {
    selectedKeys,
    onMenuClick,
  };
};
