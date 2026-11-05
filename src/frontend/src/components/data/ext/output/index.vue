<script setup lang="ts">
defineOptions({ name: "DataExtOutput" });
import { Button } from "ant-design-vue";
import { NuxtIcon, JsonPretty } from "@/components";
import { ref } from "vue";

const props = withDefaults(defineProps<{ data: any }>(), {
  data: () => ({}),
});

const deep = ref(Infinity);

const onChangeDeep = (val: number) => {
  deep.value = val;
};
</script>

<template>
  <div class="flex items-center">
    <Button
      type="link"
      class="c-[#000000] p-0"
      title="Expand All"
      @click="onChangeDeep(Infinity)"
    >
      <template #icon>
        <Suspense>
          <NuxtIcon name="expand-all" />
        </Suspense>
      </template>
    </Button>
    <Button
      type="link"
      class="c-[#000000] p-0"
      title="Collapse All"
      @click="onChangeDeep(2)"
    >
      <template #icon>
        <Suspense>
          <NuxtIcon name="collapse-all" />
        </Suspense>
      </template>
    </Button>
  </div>
  <JsonPretty :json="data" :deep="deep" />
</template>

<style src="./index.scss" scoped lang="scss"></style>
