<script setup lang="ts">
import { computed } from "vue";

defineOptions({ name: "JsonViewer" });

interface Props {
  data: unknown;
}

const props = defineProps<Props>();

const escapeHtml = (value: string) => {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const TOKEN_REGEX =
  /("(?:\\.|[^"\\])*")(?=\s*:)|("(?:\\.|[^"\\])*")|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;

function toJsonText(data: unknown): { text: string; highlight: boolean } {
  if (data === null) return { text: "null", highlight: true };

  if (typeof data === "string") {
    try {
      return { text: JSON.stringify(JSON.parse(data), null, 2), highlight: true };
    } catch {
      return { text: data, highlight: false };
    }
  }

  try {
    const json = JSON.stringify(data, null, 2);
    return json === undefined
      ? { text: String(data ?? ""), highlight: false }
      : { text: json, highlight: true };
  } catch {
    return { text: "", highlight: false };
  }
}

const jsonHtml = computed(() => {
  const { text, highlight } = toJsonText(props.data);
  const escaped = escapeHtml(text);

  if (!highlight) return escaped;

  return escaped.replace(TOKEN_REGEX, (match, key, string, boolean) => {
    if (key) {
      return `<span class="json-key">${key}</span>`;
    }

    if (string) {
      return `<span class="json-string">${string}</span>`;
    }

    if (boolean) {
      return `<span class="json-boolean">${boolean}</span>`;
    }

    return `<span class="json-number">${match}</span>`;
  });
});
</script>

<template>
  <pre class="json-viewer" v-html="jsonHtml" />
</template>

<style src="./index.scss" scoped lang="scss"></style>
