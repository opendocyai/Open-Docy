<script setup lang="ts">
defineOptions({ name: "JsonPretty" });

import { ref } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

const props = defineProps({
  json: {
    type: [Object, Array],
    default: () => ({}),
  },
  deep: {
    type: Number,
    default: Infinity
  }
});

const selectedValue = ref("res.error");


</script>

<template>
  <VueJsonPretty
    v-model:selected-value="selectedValue"
    :data="json"
    showIcon
    selectableType="single"
    :deep="deep"
  />
</template>

<style src="./index.scss" scoped lang="scss"></style>
