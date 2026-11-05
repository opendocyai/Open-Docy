<script setup lang="ts">
import { useApiActivity } from "@/api";
import { useHttp } from "@/client";
import { useRouterStore } from "@/stores";
import { cloneDeep, debounce } from "lodash";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "ant-design-vue";
import { NuxtIcon, BaseInfoWrap, TaskContentBox } from "@/components";
import { LoadingOutlined } from "@ant-design/icons-vue";
import to from "await-to-js";

definePage({
  meta: {},
});

const route = useRoute();
const router = useRouter();
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

const detailInfo = ref<any>({});

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

const get_activity_detail = async () => {
  const dataApi = useApiActivity("get_activity_detail")(route.query.task_id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
  if (error) return;
  if (res?.code == 200) {
    console.log("🚀 ~ get_activity_detail ~ data.value: ", res);
    detailInfo.value = res.data;
  }
};

get_activity_detail();

const get_node_before_manual = async (task_id: any) => {
  const dataApi = useApiActivity("get_node_before_manual")(task_id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));

  if(!error && res?.code == 200) {
    beforeNodeInfos.value = res.data;
  }

  return [error, res];
};

const get_manual_nodes = async (task_id: any) => {
  const dataApi = useApiActivity("get_manual_nodes")(task_id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));

  if(!error && res?.code == 200) {
    inputNodes.value = res.data
    get_node_info(inputNodeIdx.value);
  }

  return [error, res];
};

const get_before_manual_nodes = async () => {
  const [before_manual, manual_nodes] = await Promise.allSettled([
    get_node_before_manual(route.query.task_id),
    get_manual_nodes(route.query.task_id),
  ]);
  if (before_manual.status == "fulfilled" && manual_nodes.status == "fulfilled") {
    isNodeLoading.value = false;
  }
};

get_before_manual_nodes();

const get_node_info = (index: any) => {
  const node = inputNodes.value[index];
  if (node && node?.variable?.input_type == "Text") {
    interactionDescription.value = node.variable?.test_text;
  }
  if (node && node?.variable?.input_type == "File upload") {
    filesByNode.value = node.variable?.files || [];
  }
  if (node && node?.variable?.input_type == "Select") {
    interactionSelect.value = node.variable?.value?.value;
  }
  if (node && node?.has_loop) {
    isExitLoop.value = node.variable?.exict_loop || false;
  }
};

watch(
  () => inputNodeIdx.value,
  (value: any) => {
    get_node_info(value);
  }
);

const onSave = async (type?: any) => {
  console.log("onSaveTask");
  console.log("inputNode", inputNode.value);
  if(type) isSaveLoading.value = true;
  const node = set_node();
  const dataApi = useApiActivity("save_manual_input_nodes")(route.query.task_id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi, {
    data: { node },
  }));
  if(type) isSaveLoading.value = false;
  if (error) return;
  if (res?.code == 200 && type) {
    await get_manual_nodes(route.query.task_id);
  }
};

const onSaveTask = debounce(onSave, 500);

const set_node = () => {
  const node = cloneDeep(inputNode.value);
  if (node && node?.variable?.input_type == "Text") {
    node.variable.test_text = interactionDescription.value;
  }
  if (node && node?.variable?.input_type == "File upload") {
    node.variable.files = filesByNode.value || [];
    node.input_values.files = filesByNode.value || [];
  }
  if (node && node?.variable?.input_type == "Select") {
    node.variable.value = requestPayload.value;
  }
  if (node && node?.has_loop) {
    node.variable.exict_loop = isExitLoop.value;
  }
  return node;
};

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
      data: { node: inputNodes.value },
    })
  );
  isRunLoading.value = false;
  if (error) return;
  if (res?.code == 200) {
    router.push("/activity");
  }
};

</script>

<template>
  <div class="manual-intervention" v-if="!isNodeLoading">
    <div class="manual-intervention--header">
      <div class="manual-intervention--header--title">
        {{ detailInfo?.name }}
      </div>
    </div>
    <div class="manual-intervention--content">
      <div class="flex-1 h-full overflow-hidden">
        <base-info-wrap :beforeNodeInfo="beforeNodeInfo" />
      </div>
      <div class="manual-intervention--content-box">
        <div class="h-full overflow-y-auto">
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
        </div>
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

<style src="./index.scss" lang="scss" scoped></style>
