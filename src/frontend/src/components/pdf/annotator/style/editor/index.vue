<script setup lang="ts">
defineOptions({
  name: "PdfAnnotatorStyleEditor",
});

import {Form, FormItem, InputNumber, Select, SelectOption} from 'ant-design-vue'

const styleFormData = defineModel<any>();

const fontFamily = [
  {
    value: "",
    label: "Default",
  },
  {
    value: "Cour",
    label: "Courier",
  },
  {
    value: "TiRo",
    label: "Times-Roman",
  },
  {
    value: "ZaDb",
    label: "ZapfDingbats",
  },
];
const borderStyle = [
  {
    value: "",
    label: "Default",
  },
  {
    value: "S",
    label: "Solid",
  },
  {
    value: "D",
    label: "Dashed",
  },
];
</script>

<template>
  <div class="style-title">Typography</div>
  <Form
    :model="styleFormData"
    :colon="false"
    :labelCol="{ span: 12 }"
    labelAlign="left"
    class="styleForm"
  >
    <form-item label="Family">
      <Select v-model:value="styleFormData.font_name">
        <select-option
          v-for="(item, index) in fontFamily"
          :value="item.value"
          :key="index"
          >{{ item.label }}
        </select-option>
      </Select>
    </form-item>

    <form-item label="Size">
      <input-number
        v-model:value="styleFormData.font_size"
        :min="10"
        :max="50"
        class="number-input"
      />
    </form-item>
    <form-item label="Text Color" class="color-form-itom">
      <input type="color" v-model="styleFormData.text_color" class="color-input" />
    </form-item>

    <div class="style-title">Border</div>

    <form-item label="Border Type">
      <Select v-model:value="styleFormData.border_style">
        <select-option
          v-for="(item, index) in borderStyle"
          :value="item.value"
          :key="index"
          >{{ item.label }}
        </select-option>
      </Select>
    </form-item>

    <form-item label="Border Weight">
      <input-number
        v-model:value="styleFormData.border_width"
        :min="0"
        :max="20"
        class="number-input"
      />
    </form-item>

    <form-item label="Border Color" class="color-form-itom">
      <input type="color" v-model="styleFormData.border_color" class="color-input" />
    </form-item>
    <div class="style-title">Background</div>
    <form-item label="Background Color" class="color-form-itom">
      <input type="color" v-model="styleFormData.background_color" class="color-input" />
    </form-item>
  </Form>
</template>

<style src="./index.scss" scoped lang="scss"></style>
