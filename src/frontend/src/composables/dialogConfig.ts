import { useViewport } from "@/composables";
import { computed } from "vue";

type DialogWidth = number | string;

const DEFAULT_DIALOG_WIDTH = 640;
const DEFAULT_MOBILE_DIALOG_WIDTH = "95vw";

const normalizeWidth = (width: DialogWidth) => {
  return typeof width === "number" ? `${width}px` : width;
};

export const useDialogConfig = () => {
  const viewport = useViewport();

  const isMobile = computed(() => viewport.isLessThan("tablet").value);
  console.log("🚀 ~ useDialogConfig ~ isMobile: ", isMobile.value);

  const dialogWidthFn = (
    width: DialogWidth = DEFAULT_DIALOG_WIDTH,
    mobileWidth: DialogWidth = DEFAULT_MOBILE_DIALOG_WIDTH,
  ) => {
    return normalizeWidth(isMobile.value ? mobileWidth : width);
  };

  return {
    dialogWidthFn,
  };
};
