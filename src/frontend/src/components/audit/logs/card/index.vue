<script setup lang="ts">
defineOptions({
  name: "AuditLogsCard",
});
import { AuditLogsCardItem } from "@/components";

withDefaults(defineProps<{ cardItem: any }>(), {});
</script>

<template>
  <div class="logs-card">
    <AuditLogsCardItem :item="cardItem" />
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
