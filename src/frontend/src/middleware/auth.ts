import type { RouteLocationNormalized } from "vue-router";

import { useMainStore } from "@/stores";

export default async function (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
) {
  console.log("from :", from);
  console.log("to :", to);

  const mainStore = useMainStore();
  console.log('mainStore 22222222:', mainStore);
  if (!mainStore.token) {
    return "/login";
  }
}
