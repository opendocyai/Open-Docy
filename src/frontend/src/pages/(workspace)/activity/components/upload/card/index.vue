<script lang="ts" setup>
import { useUploadPresigned } from '@/composables';
import { genFileId } from '@/utils';
import { message } from 'ant-design-vue';
import { nextTick, onMounted, ref } from 'vue';
import {ToTopOutlined, LoadingOutlined} from '@ant-design/icons-vue'
import {NuxtIcon, BaseUpload} from '@/components'

const props = defineProps({
  type: {
    type: String,
    default: "echo",
  },
  page: {
    type: String,
    default: "",
  },
  node: {
    type: Object,
    default: () => ({}),
  },
  updateFilesForNode: {
    type: Function,
    required: true,
  },
});

const accept = ref<any>("json,csv,xls,xlsx,doc,docx,ppt,pptx,pdf,jpg,jpeg,png,txt,zip");
const total_limit_size = ref<any>(
  Number(props.node?.input_values.limit_size) * 1024 * 1024
);

const form = ref<any>({
  files: [],
});

const getTotalSize = (files: any[]) => files.reduce((acc, f) => acc + (f.size || 0), 0);

const getFilesList = (files: File[]): any[] => {
  return Array.from(files).map((file: File) => {
    const fileType = file.name.split(".").pop();
    return {
      fileType,
      row: file,
      name: file.name,
      size: file.size,
      type: file.type,
      uid: genFileId(),
      url: URL.createObjectURL(file),
      status: "pending",
    };
  });
};

const onFileChange = async (files: File[]) => {
  const fileList = getFilesList(files);

  const newTotalSize = getTotalSize([...form.value.files, ...fileList]);
  if (newTotalSize > total_limit_size.value) {
    return message.warning(
      `Multiple files allowed, up to ${
        props.node?.input_values.limit_size || 50
      } MB in total.`
    );
  }

  form.value.files = [...form.value.files, ...fileList];

  for (let i = 0; i < fileList.length; i++) {
    const fileItem = fileList[i];
    fileItem.status = "uploading";
    await save_file(fileItem);
  }
  await nextTick();
};

const { upload_presigned_url } = useUploadPresigned();

const save_file = async (fileItem: any) => {
  const { row, ...item } = fileItem;
  const fileInfos = {
    ...item,
    row,
    info: {
      file_name: row.name,
      category: "audit",
      file_type: row.type,
      file_size: row.size,
    },
  };

  const { data, error } = await upload_presigned_url(fileInfos);

  if (error.value) {
    fileItem.status = "error";
    return;
  }

  if (data.value?.key) {
    const target = form.value.files.find((f: any) => f.uid === fileItem.uid);
    if (target) {
      target.status = "success";
      target.key = data.value?.key;
    }

    props.updateFilesForNode(props.node.id, form.value.files);
  }
};

const removeFile = (index: number) => {
  const removedFile = form.value.files[index];
  form.value.files.splice(index, 1);

  const updatedFiles = form.value.files.filter(
    (file: { uid: any }) => file.uid !== removedFile.uid
  );
  props.updateFilesForNode(props.node.id, updatedFiles);
};

const handelAccept = (type: any) => {
  return type?.length > 0 ? type.join(",") : false;
};

onMounted(() => {
  if (props.type == "echo" && props.node?.variable?.file_map) {
    const existingFiles = Object.values(props.node.variable.file_map).map(
      (file: any) => ({
        uid: file.id,
        key: file.file_key,
        name: file.file_name,
        size: file.file_size,
        type: file.file_type,
        url: file.url,
        status: "success",
        fileType: file.file_name.split(".").pop(),
      })
    );
    form.value.files = existingFiles;
    props.updateFilesForNode(props.node.id, form.value.files);
  }
});
</script>

<template>
  <div class="file-info">
    <div class="name" :title="node?.input_values?.key">
      <span class="text">{{ node?.input_values?.key }}</span>
    </div>
    <span class="desc" :title="node?.input_values?.description">
      {{ node?.input_values?.description }}
    </span>
  </div>

  <div class="upload-select">
    <base-upload
      multiple
      :accept="handelAccept(node?.input_values.accept) || accept"
      @change="onFileChange"
      class="h-fit!"
    >
      <div class="files-upload">
        <div class="files-upload-content">
          <ToTopOutlined class="upload-icon" />
          <p class="upload-text">Drag and drop a file here or click to browse</p>
          <p class="upload-text">
            +20 more {{ node?.input_values.limit_size || 50 }} MB max
          </p>
        </div>
      </div>
    </base-upload>

    <div class="flex flex-col gap-[2px] mt-[10px]" v-if="form?.files?.length">
      <div
        class="flex items-center justify-between gap-[5px] h-[55px] rounded-[8px] px-[20px] mb-[10px]"
        :class="page !== 'manual' ? 'bg-[#ffffff]' : 'bg-[#f9f9f9]'"
        v-for="(items, indexs) in form?.files"
        :key="indexs"
      >
        <div class="flex items-center gap-[5px] overflow-hidden fill-revert-layer">
          <Suspense>
            <NuxtIcon :name="items.fileType" class="text-[20px] mr-[4px]" filled/>
          </Suspense>
          <div class="flex-1 font-[Inter] fw-400 text-[13px] truncate">
            {{ items.name }}
          </div>
        </div>
        <div class="flex-none flex items-center gap-2">
          <span v-if="items.status === 'uploading'">
            <LoadingOutlined spin class="text-[17px] text-blue-500" />
          </span>

          <span v-else-if="items.status === 'error'" class="text-red-500 text-[13px]">
            Failed
          </span>

          <Suspense v-if="items.status !== 'uploading'">
            <NuxtIcon
              name="close"
              @click="removeFile(Number(indexs))"
              class="cursor-pointer text-[17px] text-[#2E2BD9]"
            />
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./index.scss" scoped lang="scss"></style>
