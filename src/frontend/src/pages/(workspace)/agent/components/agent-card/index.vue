<script lang="ts" setup>
import { Empty, Spin, Flex, Card, Tag, Button, Dropdown, Menu, MenuItem } from "ant-design-vue";

import {NuxtIcon} from '@/components';

import { hasRolePerm } from '@/utils';

import { EllipsisOutlined } from '@ant-design/icons-vue'

defineOptions({
  name: "AgentCard",
});
defineProps({
  agentData: {
    type: Object,
    default: () => { },
  },
  tableLoading: {
    type: Boolean,
    default: false,
  },
});

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const emit = defineEmits(["deleteSingle", "editAgent"]);

const editAgent = (item: { id: any }) => {
  emit("editAgent", item);
};

const onDelete = (item: { id: any }) => {
  emit("deleteSingle", item);
};
</script>

<template>
  <div class="w-full h-[100%] mt-[200px] flex justify-center items-center" v-if="tableLoading">
    <Spin />
  </div>
  <div v-else>
    <Flex wrap="wrap" gap="30" v-if="agentData?.length > 0">
      <div v-for="(item, index) in agentData" :key="index">
        <Card hoverable class="card-wrap">
          <template #cover>
            <div class="card-top relative">
              <span v-if="item?.visibility == '-'" class="text-[#999999] bg-[#E6E6E6] status-tag">
                Draft
              </span>
              <span v-if="item?.visibility == 'Public'" class="text-[#3B82F6] bg-[#DCE9FF] status-tag">
                {{ item?.visibility }}
              </span>
              <span v-if="item?.visibility == 'Personal'" class="text-[#F59E0B] bg-[#FFE7BF] status-tag">
                {{ item?.visibility }}
              </span>
              <img v-if="item.preview_image" alt="Thumbnail image" :src="item.preview_image"
                class="max-w-full max-h-full object-contain" />
              <div v-else class="w-full h-full flex items-center justify-center">
                <NuxtIcon name="default-logo" class="c-[#ccc] text-[100px]" />
              </div>
            </div>
          </template>
          <div class="card-bottom">
            <div class="title" :title="item.name">{{ item.name }}</div>
            <div class="completed-task">
              <span class="label"> Tasks Completed Tasks in Queue: </span>
              <span class="value task-value">
                <span class="completed-task-count">
                  {{ item?.state?.complete_count }}
                </span>
                /
                <span class="all-task">
                  {{ item?.state?.queued_count }}
                </span>
              </span>
            </div>
            <div class="completed-task">
              <span class="label"> Completion Ratio: </span>
              <span class="value">
                <span class="ratio-value" :class="item?.state?.completion_rate == 100
                    ? 'text-[#17C653]'
                    : 'text-[#FF0B1A]'
                  ">
                  {{ item?.state?.completion_rate }} %
                </span>
              </span>
            </div>
            <div class="card-action">
              <div class="flex-none">
                <Tag v-if="item?.status == 'draft'" :bordered="false">Draft</Tag>
                <Tag v-if="item?.status == 'frozen'" :bordered="false" color="red">Frozen</Tag>
                <Tag v-if="item?.status == 'public'" :bordered="false" color="purple">Public</Tag>
                <Tag v-if="item?.status == 'private'" :bordered="false" color="success">Private</Tag>
                <Tag v-if="item?.status == 'active'" :bordered="false" color="success">Active</Tag>
              </div>
              <span class="action-span" v-if="hasRolePerm('sys:agent:edit') || hasRolePerm('sys:agent:del')">
                <Dropdown placement="bottomRight" :trigger="['click']" :arrow="{ pointAtCenter: true }">
                  <EllipsisOutlined style="font-size: 18px; color: #999999" />
                  <template #overlay>
                    <Menu>
                      <menu-item v-if="hasRolePerm('sys:agent:edit')">
                        <Button type="link" size="small" style="color: #999999;width: 80px;padding: 0px;"
                          class="flex items-center justify-start gap-[4px] c-[#999999]" @click="editAgent(item)">
                          <NuxtIcon name="edit-single" class="icon text-[16px] mr-[2px]" />
                          Edit
                        </Button>
                      </menu-item>
                      <menu-item v-if="hasRolePerm('sys:agent:del')">
                        <Button type="link" size="small" style="color: #999999;width: 80px;padding: 0px"
                          class="flex items-center justify-start gap-[4px] text-[#999999]" @click="onDelete(item)">
                          <NuxtIcon name="delete" class="icon text-[14px] mr-[4px]" />
                          Delete
                        </Button>
                      </menu-item>
                    </Menu>
                  </template>
                </Dropdown>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </Flex>
    <Empty :image="simpleImage" v-else />
  </div>
</template>

<style src="./index.scss" lang="scss" scoped></style>
