<script setup lang="ts">
import { useApiActivity, useApiCommon } from "@/api";
import { useHttp } from "@/client";
import { useRouterStore } from "@/stores";
import { message, Button } from "ant-design-vue";
import { cloneDeep, debounce } from "lodash";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  HomeLogo,
  NuxtIcon,
  BaseInfoWrap,
  TaskContentBox,
  BaseScroll,
} from "@/components";
import { LoadingOutlined } from "@ant-design/icons-vue";
import to from "await-to-js";

definePage({
  meta: {
    name: "manual-intervention-from-invite",
    layout: "custom",
    auth: false,
  },
});

const route = useRoute();
const routerStore = useRouterStore();
routerStore.SET_BREADCRUMB([
  {
    name: "Activity",
    path: "/activity",
    isClickable: true,
  },
  {
    name: "Review & Input",
    path: "/manual-intervention",
    isClickable: false,
  },
]);
const { request } = useHttp();

const isNodeLoading = ref(true);

const isSaveLoading = ref(false);
const isRunLoading = ref(false);
const isExitLoading = ref(false);
const isExitLoop = ref(false);

const beforeNodeInfos = ref<any>([]);
const inputNodes = ref<any>([]);

const inputNodeIdx = ref<number>(0);

const interactionDescription = ref("");
const interactionSelect = ref<any>("");
const filesByNode = ref<any[]>([]);

const beforeNodeInfo = computed(() => {
  const node = inputNodes.value[inputNodeIdx.value];
  const beforeNodeInfo = beforeNodeInfos.value?.find((item: any) =>
    item?.interaction_node_id?.includes(node?.id)
  );
  return beforeNodeInfo?.predecessor;
});

const selectOptions = computed(() => {
  const raw = inputNodes.value?.[inputNodeIdx.value]?.variable?.option || [];
  return raw.map((item: any) =>
    typeof item === "string"
      ? { value: item, uid: item }
      : { value: item.value, uid: item.uid }
  );
});

const inputNode = computed(() => inputNodes.value[inputNodeIdx.value]);

const requestPayload = computed(() => {
  const selected = selectOptions.value.find(
    (item: { uid: number }) => item.uid === interactionSelect.value
  );
  return selected ? { label: selected.value, value: selected.uid } : null;
});

const commonKeyVal = ref<string>("");
const signaturVal = ref<string>("");

const getCommonKey = async () => {
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiCommon("get_common_key"), {
      config: { isAuth: false },
    })
  );
  if (error) return;
  return res?.code === 200 ? res.data : "";
};

const getSignature = async () => {
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiCommon("get_signature"), {
      config: { isAuth: false },
    })
  );
  if (error) return;
  return res?.code === 200 ? res.data : "";
};

const getCommonKeySignature = async () => {
  const [commonKey, signature] = await Promise.all([getCommonKey(), getSignature()]);
  commonKeyVal.value = commonKey;
  signaturVal.value = signature;
  if (commonKeyVal.value && signaturVal.value) {
    await get_before_manual_nodes();
  }
};

const get_before_manual_nodes = async () => {
  const [before_manual, manual_nodes] = await Promise.allSettled([
    get_node_before_manual(route.query.task_id),
    share_link_parse(route.query.task_id),
  ]);
  if (before_manual.status == "fulfilled" && manual_nodes.status == "fulfilled") {
    isNodeLoading.value = false;
  }
};

const get_node_before_manual = async (task_id: any) => {
  const dataApi = useApiActivity("get_node_before_manual")(task_id);
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi, {
      headers: {
        "AI-API-Key": `${commonKeyVal.value}`,
        "AI-Signature": `${signaturVal.value}`,
        "USER-ID": `${route.query.u_id}`,
      },
      config: { isAuth: false },
    })
  );

  if (!error && res?.code == 200) {
    beforeNodeInfos.value = res.data;
  }
  return [error, res];
};

const share_link_parse = async (task_id: any) => {
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiActivity("share_link_parse"), {
      headers: {
        "AI-API-Key": `${commonKeyVal.value}`,
        "AI-Signature": `${signaturVal.value}`,
        "USER-ID": `${route.query.u_id}`,
      },
      data: {
        link_code: route.query.code,
      },
      config: { isAuth: false },
    })
  );

  if (!error && res?.code == 200) {
    inputNodes.value = res.data;
    get_node_info(inputNodeIdx.value);
  }

  return [error, res];
};

getCommonKeySignature();

const get_node_info = (index: any) => {
  const node = inputNodes.value[index];
  if (node && node?.variable?.input_type == "Text") {
    interactionDescription.value = node.variable?.test_text;
  }
  if (node && node?.variable?.input_type == "File upload") {
    filesByNode.value = node.variable?.files || [];
    if (node.has_loop) {
      isExitLoop.value = node.variable?.exict_loop || false;
    }
  }
  if (node && node?.variable?.input_type == "Select") {
    interactionSelect.value = node.variable?.value?.value;
  }
};

watch(
  () => inputNodeIdx.value,
  (value: any) => {
    get_node_info(value);
  }
);

const set_node = () => {
  const node = cloneDeep(inputNode.value);
  if (node && node?.variable?.input_type == "Text") {
    node.variable.test_text = interactionDescription.value;
  }
  if (node && node?.variable?.input_type == "File upload") {
    node.variable.files = filesByNode.value || [];
    if (node.has_loop) {
      node.variable.exict_loop = isExitLoop.value;
    }
  }
  if (node && node?.variable?.input_type == "Select") {
    node.variable.value = requestPayload.value;
  }
  return node;
};

const onSave = async (type?: any) => {
  console.log("onSaveTask");
  console.log("inputNode", inputNode.value);
  if(type) isSaveLoading.value = true;
  const node = set_node();
  const dataApi = useApiActivity("save_manual_input_nodes")(route.query.task_id);
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi, {
      headers: {
        "AI-API-Key": `${commonKeyVal.value}`,
        "AI-Signature": `${signaturVal.value}`,
        "USER-ID": `${route.query.u_id}`,
      },
      data: { node },
      config: { isAuth: false },
    })
  );
  if(type) isSaveLoading.value = false;
  if (error) return;
  if (res?.code == 200 && type) {
    await get_before_manual_nodes();
  }
};

const onSaveTask = debounce(onSave, 500);

const handleExitLoop = async () => {
  isExitLoading.value = true;
  await onSaveTask();
  isExitLoading.value = false;
};

const onRunTask = async () => {
  console.log("inputNodes.value", inputNodes.value);
  isRunLoading.value = true;
  const dataApi = useApiActivity("run_activity_after_action")(route.query.task_id);
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi, {
      headers: {
        "AI-API-Key": `${commonKeyVal.value}`,
        "AI-Signature": `${signaturVal.value}`,
        "USER-ID": `${route.query.u_id}`,
      },
      data: { node: inputNodes.value },
      config: { isAuth: false },
    })
  );
  isRunLoading.value = false;
  if (error) return;
  if (res?.code == 200) {
    message.success("Running successfully");
    await get_before_manual_nodes();
  }
};
</script>

<template>
  <div class="manual-intervention" v-if="!isNodeLoading">
    <div class="top-logo mt-[30px] ml-[30px] pb-[30px]">
      <home-logo />
    </div>
    <div class="manual-intervention--content">
      <div class="flex-1 h-full overflow-hidden">
        <base-info-wrap :beforeNodeInfo="beforeNodeInfo" />
      </div>
      <div class="manual-intervention--content-box">
        <base-scroll>
          <div class="flex flex-col gap-[10px]">
            <div class="flex flex-col gap-[10px]">
              <div class="content-box--name">Your Action</div>
              <div class="content-box--desc">
                Action Required Provide the required input to proceed.
              </div>
            </div>
            <task-content-box
              v-model:inputNodeIdx="inputNodeIdx"
              v-model:interactionDescription="interactionDescription"
              v-model:interactionSelect="interactionSelect"
              v-model:filesByNode="filesByNode"
              v-model:isExitLoop="isExitLoop"
              :inputNodes="inputNodes"
              :isExitLoading="isExitLoading"
              :inputNode="inputNode"
              :selectOptions="selectOptions"
              :isSaveLoading="isSaveLoading"
              @onSave="onSaveTask"
              @onSaves="onSave"
              @onExitLoop="handleExitLoop"
            />
          </div>
        </base-scroll>
      </div>
    </div>
    <div class="manual-intervention--footer">
      <Button
        type="primary"
        class="bg-[#17c653]! c-[#fff]!"
        :disabled="isRunLoading || isSaveLoading"
        :loading="isRunLoading || isSaveLoading"
        @click="onRunTask"
      >
        <NuxtIcon name="run" class="text-[18px]" />
        Run
      </Button>
    </div>
  </div>
  <div v-if="isNodeLoading" class="ant-layout flex items-center justify-center">
    <LoadingOutlined spin class="text-[20px] c-[#2E2BD9]" />
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
