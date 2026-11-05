<script setup lang="ts">
defineOptions({ name: "UploadFilePage" });

import { hasRolePerm } from "@/utils";
import ShareTask from "../../../../share-task/index.vue";
import UploadCardPlus from "../../card/plus/index.vue";
import {
  Empty,
  message,
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  LayoutSider,
  Modal,
  Dropdown,
  Button,
} from "ant-design-vue";
import { onMounted, ref, watch } from "vue";
import { useCommonStore, useRouterStore, useSpaceStore } from "@/stores";
import { useRunTask } from "@/composables";
import { useApiActivity, useApiAgent } from "@/api";
import { debounce } from "lodash";
import { useHttp } from "@/client";
import { useRoute, useRouter } from "vue-router";

import { NuxtIcon, AgentCardTemplateMy } from "@/components";

import { DownOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import to from "await-to-js";

const props = defineProps<{
  mode: "create" | "edit";
  id?: string;
}>();
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
    name: props.mode == "edit" ? "Edit Task" : "Create Task",
    path: "/edit-activity",
    isClickable: false,
  },
]);

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const { request } = useHttp();
const spaceStore: any = useSpaceStore();
const commonStore: any = useCommonStore();
const groups = ref<any>([]);
const myAgents = ref<any>([]);
const isDropdownVisible = ref<any>(false);
const currentSelectedAgent = ref<any>({});
const isShowDrawer = ref(false);
const isShowModal = ref(false);
const openInviteModal = ref(false);
const showDelete = ref<string | null>(null);
const onShrink = () => {
  isShowModal.value = true;
};
const hideRightDrawer = () => {
  isShowDrawer.value = false;
};
const showRightDrawer = () => {
  isShowDrawer.value = true;
};
const closeInviteModal = () => {
  openInviteModal.value = false;
};
const onShareTask = () => {
  openInviteModal.value = true;
};

const { onOpen } = useRunTask();

const onEdit = async (currentSelectedAgent: {
  template_json: any;
  description: any;
  name: any;
  space_id: any;
  id: any;
}) => {
  const params = {
    agent: {
      name: currentSelectedAgent.name,
      description: currentSelectedAgent.description,
      space_id: currentSelectedAgent.space_id,
      agent_id: currentSelectedAgent.id,
      template_json: currentSelectedAgent.template_json,
    },
  };
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiAgent("pre_update_agent"), {
      data: params,
    })
  );
  if (error) return;
  if (res?.code == 200) {
    router.push(`/audit?code=${res?.data?.code}`);
  }
};
const isRunLoading = ref(false);
const isSaveLoading = ref(false);
const isloading = ref(false);
interface Node {
  id: string;
  variable: {
    key: string;
  };
  description: string;
}
const inputNodes = ref<Node[]>([
]);
let groupedResult: any[] = [];

const nodeInputData = ref<any>({});
const filesByNodeHasEmpty = ref(true);
const checkEmptyFile = (flattenedData: any) => {
  const hasProblemFile = flattenedData.some((item: any) => {
    if (item.label === "GroupInputFile") {
      return item.variable.upload.some((uploadItem: any) => {
        const fileMap = uploadItem.file_map || {};
        const fileKeys = uploadItem.files || [];


        return fileKeys.some((key: string) => {
          const f = fileMap[key];
          return (
            f.status === "error" || f.status === "pending" || f.status === "uploading"
          );
        });
      });
    } else {
      const fileMap = item.variable.file_map || {};
      const fileKeys = item.variable.files || [];

      return fileKeys.some((key: string) => {
        const f = fileMap[key];
        return (
          f.status === "error" || f.status === "pending" || f.status === "uploading"
        );
      });
    }
  });
  handleChoosingFile(hasProblemFile);
  filesByNodeHasEmpty.value = hasProblemFile;
};
const onSaveTask = async () => {
  const dataToSubmit: {
    node_input: Record<string, { key: string; files: string[] }>;
  } = {
    node_input: {},
  };

  dataToSubmit.node_input = { ...nodeInputData.value };

  isSaveLoading.value = true;
  const dataApi = useApiActivity("save_input_nodes")(route.query.task_id);
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi, {
      data: dataToSubmit,
    })
  );
  isSaveLoading.value = false;

  if (error) return;
  if (res?.code == 200) {
    message.success("Saved successfully");
    getChangeAgent();
  }
};

const onRunTask = async () => {
  const dataToSubmit: {
    node_input: Record<string, { key: string; files: any[] }>;
  } = {
    node_input: {},
  };

  dataToSubmit.node_input = { ...nodeInputData.value };

  isRunLoading.value = true;
  const dataApi = useApiActivity("run_activity")(route.query.task_id);
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi, {
      data: dataToSubmit,
    })
  );
  isRunLoading.value = false;

  if (error) return;
  if (res?.code == 200) {
    router.push("/activity");
  }
  if (res?.code == 100000) {
    onOpen(res?.data);
  }
};

const isChoosingFile = ref(false);
const handleChoosingFile = (status: boolean) => {
  isChoosingFile.value = status;
};

const updateFilesForNode = (status?: boolean) => {
  filesByNodeHasEmpty.value = !!status;
  const flattenedData = groupedResult.flatMap((group) => group.items);
  checkEmptyFile(flattenedData);

  const resultObject = flattenedData.reduce((acc, item) => {
    const key = item.id;
    if (item.label == "GroupInputFile") {
      const uploadWithOrder = item.variable.upload.map((u: any, i: number) => ({
        key: u.key,
        files: u.files,
        key_order: i,
      }));

      acc[key] = {
        upload: uploadWithOrder,
      };
    } else {
      acc[key] = {
        key: item.variable.key,
        files: item.variable.files,
      };
    }

    return acc;
  }, {} as Record<string, any>);
  nodeInputData.value = resultObject;
};

const deleteNode = (node: any, idx: number) => {
  if (!node?.items?.length) return;

  node.items = node.items.map((item: any) => {
    if (!item?.variable?.upload?.length) return;
    item.variable.upload.splice(idx, 1);
    return item;
  });
  updateFilesForNode();
};
const addNode = (node: any) => {
  console.log("node.items===", node.items);
  console.log("node===", node);

  node.items = node.items?.map((item: any) => {
    if (item.variable.upload.length) {
      const { key, description } = item.input_values;
      const len = item.variable.upload.length;
      let index = 0;
      if (len > 1) {
        const key = item.variable.upload[len - 1].key;
        index = Number(key.split("-").pop());
      }
      item.variable.upload.push({
        key: `${key}-${index + 1}`,
        files: [],
        file_map: {},
      });
    }
    console.log("node=22=", node);

    return item;
  });
  updateFilesForNode();
};

const getInputNodes = async (agent_id: any) => {
  isloading.value = true;
  const dataApi = useApiActivity("get_input_nodes_by_agent")(route.query.task_id);
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiActivity("get_input_nodes_by_agent"), {
      data: {
        agent_id: agent_id,
        task_id: route.query.task_id,
      },
    })
  );
  isloading.value = false;

  if (error) return;
  if (res?.code == 200) {
    inputNodes.value = res.data;
    handelGroupData();
  }
};

const handelGroupData = () => {
  const dataWithType = inputNodes.value.map((item: any) => {
    if (item.variable?.upload?.length && item.variable?.file_map) {
      item.variable.upload.forEach((uploadItem: any) => {
        uploadItem.file_map = {};
        uploadItem.files?.forEach((fileKey: string) => {
          if (item.variable.file_map[fileKey]) {
            uploadItem.file_map[fileKey] = item.variable.file_map[fileKey];
          }
        });
      });
    }

    return {
      ...item,
      type: item.label,
    };
  });

  if (groups.value?.length > 0) {
    groups.value.forEach((groupIds: any) => {
      const group = dataWithType.filter((item) => groupIds.includes(item.id));
      if (group.length) {
        groupedResult.push({
          type: group[0].label,
          items: group,
        });
      }
    });

    const groupedIds = groups.value.flat();
    const remaining = dataWithType.filter((item) => !groupedIds.includes(item.id));
    remaining.forEach((item) => {
      groupedResult.push({
        type: item.label,
        items: [item],
      });
    });
  } else {
    inputNodes.value.forEach((item: any) => {
      groupedResult.push({
        type: item.label,
        items: [item],
      });
    });
  }

  updateFilesForNode();
};

const getMyAgentList = async () => {
  const [error, res] = await to<{ data: any; code: number }>(
    request(useApiAgent("get_agent_list"), {
      params: {
        space_id: spaceStore.spaceInfoCurrent?.id,
        exp_draft: true,
        sample: true,
        paginated: false,
      },
    })
  );
  if (error) return;
  if (res?.code == 200) {
    myAgents.value = res.data;
  }
};
const getAgentDetail = async (id: string) => {
  const dataApi = useApiAgent("get_agent_detail")(id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
  if (error) return;
  if (res?.code == 200) {
    getInputNodes(id);
    commonStore.SET_CURRENT_SELECTED_AGENT(res?.data);
    currentSelectedAgent.value = res?.data;
    groups.value = res?.data.template_json?.groups;
    showRightDrawer();
  }
};

const selectedMyAgent = (agent: { name: any; id: any }) => {
  groupedResult = [];
  isDropdownVisible.value = false;
  getAgentDetail(agent.id);
};

const isChangeAgent = ref(false);
const getChangeAgent = async () => {
  const task_id = route.query.task_id;
  const dataApi = useApiActivity("change_agent")(task_id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
  if (error) return;
  if (res?.code == 200) {
    isChangeAgent.value = res?.data.can_change;
  }
};
const getTaskDetail = async () => {
  const task_id = route.query.task_id;
  const dataApi = useApiActivity("get_activity_detail")(task_id);
  const [error, res] = await to<{ data: any; code: number }>(request(dataApi));
  if (error) return;
  if (res?.code == 200) {
    getAgentDetail(res?.data.agent_id);
  }
};

const updateNode = debounce(async (type: string) => {
  const dataApi = useApiActivity("update_activity")(route.query.task_id);

  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi, {
      data: {
        agent_id: currentSelectedAgent.value.id,
      },
    })
  );
  if (error) return;
  if (res?.code == 200) {
    if (type == "save") {
      onSaveTask();
    } else {
      onRunTask();
    }
  }
}, 500);

watch(
  () => spaceStore.spaceInfoCurrent,
  async (newVal: any) => {
    if (!newVal?.id) return;
    Promise.all([getMyAgentList()]);
  },
  { deep: true, immediate: true }
);
watch(
  () => route.query.task_id,
  (newVal: any) => {
    if (newVal) {
      getChangeAgent();
      getTaskDetail();
    }
  },
  { deep: true, immediate: true }
);
onMounted(() => {
  commonStore.SET_CURRENT_SELECTED_AGENT({});
});
</script>

<template>
  <Layout class="page-layout h-full">
    <Layout class="page-layout-content">
      <layout-header class="page-header">
        <div class="flex items-center justify-between pt-[16px]">
          <Dropdown :trigger="['click']" arrow v-model:open="isDropdownVisible">
            <template #overlay>
              <div
                class="agent-content bg-[#ffffff] px-[20px] py-[20px] rounded-[8px] shadow-md max-h-[500px] overflow-auto w-[433px]"
              >
                <div class="agent-info-label">My AI Agents</div>
                <agent-card-template-my
                  :dataList="myAgents"
                  :canSelect="true"
                  :hoverType="'line'"
                  @selectedMyAgent="selectedMyAgent"
                />
              </div>
            </template>
            <Button :disabled="!isChangeAgent" class="agent-select-btn">
              <span class="agent-select-text">
                {{ currentSelectedAgent?.name }}
              </span>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div
          class="text-[32px] text-[#000000] fw-600 font-[Inter] mt-[50px] mb-[10px] text-center leading-[40px]"
        >
          Upload the file(s) for this task
        </div>
        <div
          class="open-drawer-btn fill-revert-layer"
          v-if="!isShowDrawer"
          @click="showRightDrawer"
        >
          <NuxtIcon name="step-o" class="text-[16px]" filled />
        </div>
      </layout-header>

      <layout-content class="page-content">
        <div class="h-[100%] flex items-center justify-center" v-if="isloading">
          <LoadingOutlined spin class="text-[20px] c-[#2E2BD9]" />
        </div>
        <div class="upload-page-wrap flex justify-center" v-else>
          <div class="upload-files-wrap">
            <div class="upload-file" v-if="inputNodes.length > 0">
              <div class="upload-content" v-for="(node, nodeIndex) in groupedResult">
                <div class="upload-card-wrap">
                  <div
                    class="w-[412px] flex flex-col gap-[15px]"
                    v-for="(item, index) in node.items"
                  >
                    <template v-if="item?.variable?.upload">
                      <div
                        v-for="(els, idx) in item?.variable?.upload"
                        class="flex items-center justify-center relative"
                        :class="
                          item?.variable?.upload.length > 0 && index == 0
                            ? 'pl-[65px]'
                            : 'pl-[32px]'
                        "
                        :key="`${index}-${idx}`"
                        @mouseenter="showDelete = `${nodeIndex}-${idx}`"
                        @mouseleave="showDelete = null"
                      >
                        <UploadCardPlus
                          :node="item"
                          :node_item="els"
                          :index="Number(idx)"
                          isGrouped
                          :isOrigin="index == 0 && idx == 0"
                          :updateFilesForNode="updateFilesForNode"
                          :onChoosingFileChange="handleChoosingFile"
                        />
                        <div class="w-[36px] pt-[58px] fill-revert-layer">
                          <NuxtIcon
                            name="group-link"
                            class="text-[36px] w-[40px]"
                            v-if="
                              node.items?.length > 1 && index !== node.items?.length - 1
                            "
                            filled
                          />
                          <div v-if="node.items.length == 1" class="w-[40px]"></div>
                        </div>
                        <div
                          v-if="
                            node.type == 'GroupInputFile' &&
                            Number(idx) > 0 &&
                            index == 0 &&
                            showDelete == `${nodeIndex}-${idx}`
                          "
                          @click="deleteNode(node, Number(idx))"
                          class="delete-icon"
                        >
                          <NuxtIcon name="delete-icon" class="icon text-[15px]" />
                        </div>
                      </div>
                    </template>
                    <div v-else class="flex items-center justify-center pl-[32px]">
                      <UploadCardPlus
                        :node="item"
                        :node_item="item.variable"
                        :updateFilesForNode="updateFilesForNode"
                        :onChoosingFileChange="handleChoosingFile"
                      />
                      <div class="w-[36px]"></div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="node.type == 'GroupInputFile'"
                  class="files-upload-add"
                  @click="addNode(node)"
                >
                  + Add
                </div>
              </div>
            </div>
            <Empty :image="simpleImage" v-else />
          </div>
        </div>
      </layout-content>
      <layout-footer class="page-footer">
        <Button
          style="background-color: #e5e5ff; color: #2e2bd9"
          type="primary"
          :disabled="isSaveLoading || filesByNodeHasEmpty || isChoosingFile"
          :loading="isSaveLoading"
          class="flex items-center justify-center gap-[4px] tab-btn text-[#2E2BD9] border-color text-[13px] font-[Inter] w-[129px] h-[38px] shadow-none"
          @click="updateNode('save')"
        >
          Save
        </Button>
        <Button
          v-if="hasRolePerm('sys:task:run')"
          style="background-color: #17c653"
          type="primary"
          :disabled="isRunLoading || filesByNodeHasEmpty || isChoosingFile"
          :loading="isRunLoading"
          class="flex items-center justify-center gap-[4px] tab-btn text-[#ffffff] border-color text-[13px] font-[Inter] w-[129px] h-[38px] shadow-none"
          @click="updateNode('run')"
        >
          <NuxtIcon
            v-if="!isRunLoading"
            name="run"
            class="text-[18px] text-[#ffffff] mr-[6px]"
          />
          Run
        </Button>
      </layout-footer>
    </Layout>
    <layout-sider v-if="isShowDrawer" class="page-sider">
      <div class="flex items-center justify-between mb-[16px] font-[Inter]">
        <div class="text-[16px] fw-500 leading-[40px]">Current Workflow</div>
        <div class="flex items-center gap-[10px]">
          <Button
            type="link"
            class="px-0"
            @click="onShrink"
            v-if="currentSelectedAgent.status !== 'draft'"
          >
            <NuxtIcon name="shrink" class="c-[#212121] text-[24px]" />
          </Button>
          <Button type="link" class="px-0" @click="hideRightDrawer">
            <NuxtIcon name="close" class="c-[#212121] text-[24px]" />
          </Button>
        </div>
      </div>
      <div
        class="workflow-box"
        :class="currentSelectedAgent.status !== 'draft' ? 'bg-[#dedede]' : 'bg-[#F0F0F0]'"
      >
        <div
          v-if="currentSelectedAgent.status !== 'draft'"
          class="w-[100%] h-[100%] text-[#ffffff]"
        >
          <img
            alt="Thumbnail image"
            :src="currentSelectedAgent?.preview_image"
            class="preview-img max-w-full max-h-full object-contain w-[100%] h-[100%]"
          />
        </div>

        <div v-else class="w-[100%] h-[100%] flex justify-center items-center">
          <NuxtIcon name="default-logo" class="c-[#ccc] text-[188px]" />
        </div>
      </div>
      <div class="workflow-info">
        <span class="title" :title="currentSelectedAgent?.name">
          {{ currentSelectedAgent?.name }}</span
        >
        <Button
          v-if="hasRolePerm('sys:agent:edit')"
          type="link"
          style="color: #2e2bd9"
          class="px-0 font-[Inter]"
          @click="onEdit(currentSelectedAgent)"
        >
          Edit >
        </Button>
      </div>
    </layout-sider>
  </Layout>
  <Modal
    v-model:open="isShowModal"
    title="Current Workflow"
    wrap-class-name="full-modal"
    :footer="null"
  >
    <div class="w-full h-full flex items-center justify-center">
      <img
        v-if="currentSelectedAgent?.preview_image"
        alt="Thumbnail image"
        :src="currentSelectedAgent?.preview_image"
        class="max-w-full max-h-[calc(100vh-100px)] object-contain"
      />
    </div>
  </Modal>
</template>

<style src="./index.scss" scoped lang="scss"></style>
<style scoped lang="scss">
.page-layout {
  display: flex;
  height: calc(100vh - 64px);
  background-color: #f5f5f5;
}

.page-layout-content {
  width: 100%;
  padding: 0 20px;
}

.page-header {
  height: auto;
  padding: 0 10px;
  background-color: #f5f5f5;
  position: relative;
}

.page-content {
  flex: 1;
  overflow: auto;
}

.page-sider {
  background-color: #ffffff;
  width: 500px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 16px 20px 16px 30px;
  border-left: 1px solid #eaedf0;
}

.agent-info-label {
  font-family: "Inter";
  font-weight: 500;
  font-size: 13px;
  color: #999999;
  margin: 0px 0 10px;
}
</style>
<style>
.agent-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.agent-content::-webkit-scrollbar-thumb {
  background-color: #cccccc;
  border-radius: 3px;
}

.agent-content::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
