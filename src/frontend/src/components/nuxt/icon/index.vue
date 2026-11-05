<script setup lang="ts">
defineOptions({
  name: "NuxtIcon",
  inheritAttrs: false,
});

import { ref, watch } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  filled: { type: Boolean, required: false, default: false },
});

const icon = ref("");
const hasStroke = ref(false);

const iconsImport = import.meta.glob("/src/assets/icons/*.svg", {
  query: "?raw",
  import: "default",
});

const iconCache = new Map<string, Promise<string>>();

async function loadIcon(name: string) {
  const key = `/src/assets/icons/${name}.svg`;

  const loader = iconsImport[key];

  if (!loader) {
    console.error(`[nuxt-icons] Icon '${name}' doesn't exist`);

    return "";
  }

  let promise = iconCache.get(key);

  if (!promise) {
    promise = loader() as Promise<string>;

    iconCache.set(key, promise);
  }

  return promise;
}

async function getIcon(name: string) {
  try {
    const rawIcon = await loadIcon(name);

    icon.value = rawIcon;
    hasStroke.value = rawIcon.includes("stroke");
  } catch (error) {
    console.error(`[nuxt-icons] Failed to load icon '${name}'`, error);

    icon.value = "";
    hasStroke.value = false;
  }
}

watch(
  () => props.name,
  (name) => {
    getIcon(name);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <span
    v-if="icon"
    class="nuxt-icon"
    :class="{
      'nuxt-icon--fill': !filled,
      'nuxt-icon--stroke': hasStroke && !filled,
    }"
    v-html="icon"
    v-bind="$attrs"
  />
</template>

<style>
.nuxt-icon svg {
  height: 1em;
  vertical-align: middle;
  width: 1em;
}

.nuxt-icon.nuxt-icon--fill,
.nuxt-icon.nuxt-icon--fill * {
  fill: currentColor !important;
}

.nuxt-icon.nuxt-icon--stroke,
.nuxt-icon.nuxt-icon--stroke * {
  stroke: currentColor !important;
}
</style>
