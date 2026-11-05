<script setup lang="ts">
defineOptions({
  name: "GroupLink",
});

import { NuxtIcon } from "@/components";
import { useRete } from "@docyai/rete";
import { Form, FormItem, Button, Select, SelectOption } from "ant-design-vue";
import { cloneDeep } from "lodash";
import { ref, watch } from "vue";

const { reteGroups, editor }: any = useRete();

const reteGroupsList = ref<any>([]);

const nodesList = ref<any>([]);

watch(
  () => reteGroups.value,
  () => {
    const nodes = editor.value
      ?.getNodes()
      .filter((node: any) => node.label == "GroupInputFile");

    reteGroupsList.value = cloneDeep(reteGroups.value ?? []);

    let sNodeIds = [];

    for (let index = 0; index < reteGroupsList.value?.length; index++) {
      const items = reteGroupsList.value[index];
      sNodeIds.push(...items);
    }

    let nodeIds = nodes.map((node: any) => node.id);
    sNodeIds = sNodeIds.filter((id: any) => !nodeIds.includes(id));

    if (sNodeIds.length) {
      for (let i = 0; i < sNodeIds.length; i++) {
        const nodeId = sNodeIds[i];
        reteGroupsList.value?.forEach((items: any) => {
          if (items.includes(nodeId)) {
            items.splice(items.indexOf(nodeId), 1);
          }
        });
      }
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => reteGroupsList.value,
  () => {
    const nodes = editor.value
      ?.getNodes()
      .filter((node: any) => node.label == "GroupInputFile");
    let no_nodes: any = [];

    const groupsList: any = [];

    for (let i = 0; i < reteGroupsList.value?.length; i++) {
      const items = reteGroupsList.value[i];
      groupsList.push(...items);
    }

    no_nodes = nodes?.filter((node: any) => {
      return !groupsList.includes(node.id);
    });

    reteGroupsList.value?.forEach((items: any, index: number) => {
      if (items?.length) {
        let y_nodes = nodes?.filter((node: any) => {
          return items.includes(node.id);
        });
        nodesList.value[index] = [...y_nodes, ...no_nodes];
      } else {
        nodesList.value[index] = no_nodes;
      }
    });
  },
  { immediate: true, deep: true }
);

const addAssociationGroup = () => {
  reteGroupsList.value.push([]);
};

const addAnotherComponent = (index: number) => {
  reteGroupsList.value[index].push(undefined);
};

const handleCleanAllLink = (index: number) => {
  reteGroupsList.value.splice(index, 1);
};

const filteredOptions = (index: number, idx: number): any[] => {
  const id = reteGroupsList.value[index][idx];
  return nodesList.value[index].filter(
    (node: any) => !reteGroupsList.value[index].includes(node.id) || node.id == id
  );
};

defineExpose({
  reteGroupsList,
});
</script>

<template>
  <div class="c-[#999999] font-[Inter] fw-400 text-[12px]">
    View and manage all association groups across components.
  </div>
  <div class="py-[10px] font-[Inter] fw-400">
    <div
      class="bg-[#FFF7E5] rounded-[4px] py-[6px] px-[8px] c-[#F98404] text-[11px] lh-[1.3]"
    >
      Note: These associations are manually created. When a group exists, the associated
      components will appear together when creating a Task.
    </div>
  </div>
  <Form layout="vertical" v-if="reteGroupsList?.length">
    <form-item label="Existing Associations">
      <div class="group-list" v-for="(items, index) in reteGroupsList" :key="index">
        <div
          class="bg-[#F6F6F6] h-[35px] px-[10px] rounded-[5px] flex items-center justify-between"
        >
          <div class="flex-none c-[#999999] font-[Inter] fw-400 text-[12px]">
            Group {{ Number(index) + 1 }}
          </div>
          <div
            class="flex-none c-[#2E2BD9] font-[Inter] fw-400 text-[12px] cursor-pointer flex items-center gap-[5px]"
            @click="handleCleanAllLink(Number(index))"
          >
            <NuxtIcon name="reset" class="text-[16px]" />
            <span>Clean all link</span>
          </div>
        </div>

        <div class="group-list-items">
          <template v-for="(item, idx) in items" :key="idx">
            <div class="group-list-items--item">
              <div class="double-line">
                <NuxtIcon name="link_multiple" class="text-[24px]" />
              </div>
              <div class="rounded-[5px] flex items-center justify-between gap-3">
                <div class="flex-1">
                  <Select v-model:value="reteGroupsList[index][idx]">
                    <template v-for="node in filteredOptions(Number(index), Number(idx))" :key="node.id">
                      <select-option :value="node.id">
                        {{ node.title }} (#{{ node.uid }}) {{ node.input_values.key }}
                      </select-option>
                    </template>
                  </Select>
                </div>
                <div class="flex-none fill-revert-layer">
                  <NuxtIcon
                    name="clean-link"
                    class="text-[16px] cursor-pointer"
                    @click="reteGroupsList[index].splice(idx, 1)"
                    filled
                  />
                </div>
              </div>
            </div>
          </template>
          <div class="group-list-items--item">
            <div class="double-line">
              <NuxtIcon name="link_multiple" class="text-[24px]" />
            </div>
            <div class="group-list-items--item--add">
              <Button type="link" @click="addAnotherComponent(Number(index))">
                + Add Another Component
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form-item>
  </Form>
  <Button type="primary" ghost @click="addAssociationGroup">
    + New Association Group
  </Button>
</template>

<style src="./index.scss" scoped lang="scss"></style>
