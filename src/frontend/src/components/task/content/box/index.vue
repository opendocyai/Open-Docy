<script setup lang="ts">
import { cloneDeep } from "lodash";
import { reactive } from "vue";

import { Textarea, RadioGroup, Radio, Checkbox, Button } from "ant-design-vue";
import { NuxtIcon, UploadCard } from "@/components";

defineOptions({
  name: "TaskContentBox",
});

const props = withDefaults(
  defineProps<{
    inputNodes: any;
    inputNode: any;
    selectOptions: any;
    isExitLoading: boolean;
    isSaveLoading: boolean;
  }>(),
  {
    inputNodes: () => [],
    inputNode: () => ({}),
    selectOptions: () => [],
    isExitLoading: false,
    isSaveLoading: false,
  }
);

const radioStyle = reactive({
  display: "flex",
  height: "40px",
  lineHeight: "40px",
  fontFamily: "Inter",
  color: "#C0C0C0",
});

const inputNodeIdx = defineModel<any>("inputNodeIdx", { default: 0 });
const interactionDescription = defineModel<string>("interactionDescription", {
  default: "",
});
const interactionSelect = defineModel<string>("interactionSelect", { default: "" });
const filesByNode = defineModel<any[]>("filesByNode", { default: () => [] });
const isExitLoop = defineModel<boolean>("isExitLoop", { default: false });

const emit = defineEmits(["onSave", "onSaves", "onExitLoop"]);

const updateFilesForNode = (nodeId: string, files: any[]) => {
  filesByNode.value = files.map((file) => file.key);
  console.log("filesByNode===================", filesByNode);
  emit("onSave");
};

const handleChangeText = (e: any) => {
  console.log(e.target.value, "const");
  interactionDescription.value = cloneDeep(e.target.value);
  emit("onSave");
};
const handleChangeSelect = (e: any) => {
  interactionSelect.value = cloneDeep(e.target.value);
  console.log(interactionSelect.value, e.target.value, "interactionSelect");
  emit("onSave");
};

const handleExitLoop = () => {
  emit("onExitLoop");
};

const handleSave = () => {
  emit("onSaves", 1);
};
</script>

<template>
  <div class="box-content">
    <div
      class="content-box--item"
      v-for="(item, index) in inputNodes"
      @click="inputNodeIdx = index"
      :key="index"
    >
      <div class="content-box--header" :class="{ active: index == inputNodeIdx }">
        <div class="flex-none">{{ Number(index) + 1 }}. Interaction Node</div>
        <div class="flex-none" v-if="inputNodes.length - 1">
          <NuxtIcon name="right" class="header-icon" />
        </div>
      </div>
      <div class="content-box--body" v-if="index == inputNodeIdx">
        <div class="page-content">
          <div class="page-content--title">
            Action Required<br />
            Provide the required input to proceed.
          </div>
          <div class="center-content-box">
            <template v-if="item?.variable?.input_type == 'Text'">
              <div class="flex flex-col w-full">
                <div
                  class="text-[12px] c-[#999999] px-[10px] pb-[8px] font-[Inter] leading-[18px] break-words"
                >
                  {{ item.variable?.input_description }}
                </div>
                <div class="flex flex-col items-end w-full">
                  <Textarea
                    v-model:value="interactionDescription"
                    placeholder="Type your input..."
                    :autoSize="{ minRows: 6 }"
                    :maxlength="3000"
                    :show-count="false"
                    class="resize-none w-full bg-[#f9f9f9]"
                    @change="handleChangeText"
                  />
                  <p class="pt-[4px] font-[Inter]]">
                    {{ interactionDescription.length }} / 3000
                  </p>
                </div>
              </div>
            </template>
            <template v-if="item?.variable?.input_type == 'Select'">
              <radio-group v-model:value="interactionSelect" @change="handleChangeSelect">
                <Radio
                  v-for="els in selectOptions"
                  :key="els.uid"
                  :style="radioStyle"
                  :value="els.uid"
                  class="radio-item"
                >
                  <div class="radio-content">
                    {{ els.value }}
                  </div>
                </Radio>
              </radio-group>
            </template>
            <template v-if="item?.variable?.input_type == 'File upload'">
              <div class="upload-files-wrap">
                <div class="upload-file">
                  <div class="upload-content">
                    <UploadCard
                      type="echo"
                      page="manual"
                      :node="item"
                      :updateFilesForNode="updateFilesForNode"
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="flex flex-col items-center justify-center gap-4 mt-[20px]">
            <Checkbox
              v-if="inputNode?.has_loop"
              v-model:checked="isExitLoop"
              @change="handleExitLoop"
              :disabled="isExitLoading"
            >
              Exit Loop
            </Checkbox>
          </div>
          <div class="mt-[30px] mb-[20px] w-full flex justify-center items-center">
            <Button
              @click="handleSave"
              :loading="isSaveLoading"
              class="max-w-[387px] w-full h-[39px] bg-[#E5E5FF] border-[#E5E5FF] c-[#2E2BD9]"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./index.scss" lang="scss" scoped></style>
