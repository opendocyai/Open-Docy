import { defineComponent, useTemplateRef, computed } from "vue";
import {
  buildAcceptMap,
  FILE_TYPE_MAP,
  pickFiles,
  type UploadFile,
  useShortUUID,
} from "@/shared";
import { useDropZone, useFileDialog } from "@vueuse/core";
import { Button } from "ant-design-vue";

export default defineComponent({
  name: "BaseUpload",
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: undefined,
    },
    limit: {
      type: Number,
      default: undefined,
    },
    limitSize: {
      type: Number,
      default: undefined,
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    aspectVideo: {
      type: Number,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  emits: ["change", "cancel"],
  setup(props, { slots, emit }) {
    const dropZoneRef = useTemplateRef<HTMLDivElement>("dropZoneRef");

    const acceptTypeList = computed(() => {
      return props.accept?.replace(/\s+/g, "")?.split(",") ?? [];
    });

    const acceptTypes = computed(() => {
      return (
        acceptTypeList.value?.map(
          (type: string) => FILE_TYPE_MAP[type] || `application/${type}`,
        ) ?? []
      );
    });

    const { files, open, onCancel, onChange } = useFileDialog({
      accept: acceptTypes.value.join(","),
      multiple: props.multiple,
    });

    onChange((files: any) => {
      handleFiles(files);
    });

    onCancel(() => {
      emit("cancel");
    });

    async function onDrop(files: File[] | null) {
      handleFiles(files);
    }

    const handleFiles = (input: File[] | FileList | null | undefined) => {
      if (!input) return;

      const files = Array.isArray(input) ? input : Array.from(input);

      if (!files.length || !get_limit(files) || !get_size_limit(files)) return;

      emitChange(files);
    };

    const emitChange = (files: File[] | FileList) => {
      const filesArray: UploadFile[] = Array.from(files).map((file) => {
        return {
          name: file.name,
          size: file.size,
          raw: file,
          type: file.type,
          status: "ready",
          percentage: 0,
          uid: useShortUUID(13),
          url: URL.createObjectURL(file),
        };
      });

      emit("change", files, filesArray);
    };

    const { isOverDropZone } = useDropZone(dropZoneRef, {
      onDrop,
      dataTypes: acceptTypes.value,
      multiple: props.multiple,
      preventDefaultForUnhandled: false,
    });

    const openFilePicker = async () => {
      if (!("showOpenFilePicker" in window)) return open();
      try {
        const files = await pickFiles({
          types: [{ accept: buildAcceptMap(acceptTypeList.value ?? []) }],
          excludeAcceptAllOption: true,
          multiple: props.multiple,
        });
        if (!files.length) return;
        if (!get_size_limit(files)) return;

        emitChange(files);
      } catch (err: any) {
        if (err?.name !== "AbortError") open();
      }
    };

    const get_limit = (fileHandles: any[]) => {
      const limit = props.limit;
      if (!limit) return true;
      return fileHandles.length + (props.fileList?.length ?? 0) <= limit;
    };

    const get_size_limit = (list: any[]) => {
      const limit = props.limitSize;
      if (!limit) return true;
      let total = 0;
      for (const file of [...(props.fileList || []), ...list]) {
        total += file?.size || 0;
        if (total > limit * 1024 * 1024) {
          console.warn("Selected files exceed the size limit:", total);
          return false;
        }
      }
      return true;
    };

    return () => (
			<Button class="w-full h-full relative bg-transparent c-black! p-0 rounded-none" type="link" disabled={props.disabled} ref={dropZoneRef} onClick={openFilePicker}>
				{slots.default?.({isOverDropZone})}
				{slots.loading ? (
					<div class="absolute top-0 left-0 w-full h-full bg-transparent z-10 flex items-center justify-center">
						{slots.loading()}
					</div>
				) : null}
			</Button>
		);
  },
});
