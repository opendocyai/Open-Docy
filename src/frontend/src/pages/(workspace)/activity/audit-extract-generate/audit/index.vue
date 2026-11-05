<script lang="ts" setup>
definePage({
  meta: {
    hidden: true,
  }
});

import { useHttp } from "@/client";
import ErrorSuccessList from "./components/error-success-list/error-success-list.vue";
import { Empty, Row, Col } from "ant-design-vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useApiActivity } from "@/api";

import { LoadingOutlined } from '@ant-design/icons-vue'
import to from "await-to-js";

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const { request } = useHttp();
const props = defineProps({
  taskName: {
    type: String,
    default: "",
  },
});
const route = useRoute();
const isloading = ref(false);
const col1 = ref<any>([]);
const col2 = ref<any>([]);
const col3 = ref<any>([]);
interface Item {
  title: string;
  index?: number;
}

function splitIntoThreeColumnsWithIndex(
  items: Item[]
): any {
  items.forEach((item, i) => {
    const newItem = { ...item, index: i };

    const mod = i % 3;
    if (mod === 0) col1.value.push(newItem);
    else if (mod === 1) col2.value.push(newItem);
    else col3.value.push(newItem);
  });
}
const dataList = ref<any>([]);

const getData = async () => {
  isloading.value = true;
  const dataApi = useApiActivity("get_results_audit")(
    route.query.task_id
  );
  const [error, res] = await to<{ data: any; code: number }>(
    request(dataApi)
  );
  isloading.value = false;

  if (error) return;
  if (res?.code == 200) {
    dataList.value = res.data;
    splitIntoThreeColumnsWithIndex(dataList.value);
  }
};
onMounted(() => {
  getData();
});
</script>

<template>
  <div class="details">
    <div class="h-[400px] flex items-center justify-center" v-if="isloading">
      <LoadingOutlined spin class="text-[20px] c-[#2E2BD9]" />
    </div>
    <div class="flex items-center justify-between mt-[30px] mb-[30px]" v-else>
      <div class="text-[20px] leading-[32px] h-[32px] fw-600 font-[Inter] text-[#010101]">
        {{ taskName }}_Audit Summary:
      </div>
      <div class="h-[32px]"></div>
    </div>
    <div v-if="!isloading">
      <Row :gutter="0" v-if="dataList.length > 0">
        <Col :span="8">
          <div class="flex flex-col gap-[15px] px-[10px]">
            <ErrorSuccessList v-for="(item, index) in col1" :item="item" :index="Number(index)" :key="index"
              :taskName="props.taskName" />
          </div>
        </Col>
        <Col :span="8">
          <div class="flex flex-col gap-[15px] px-[15px]">
            <ErrorSuccessList v-for="(item, index) in col2" :item="item" :index="Number(index)" :key="index"
              :taskName="props.taskName" />
          </div>
        </Col>
        <Col :span="8">
          <div class="flex flex-col gap-[15px] px-[15px]">
            <ErrorSuccessList v-for="(item, index) in col3" :item="item" :index="Number(index)" :key="index"
              :taskName="props.taskName" />
          </div>
        </Col>
      </Row>
      <Empty :image="simpleImage" description="No data" v-else style="margin-top: 100px" />
    </div>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
