import { ref } from "vue";

const isLoading = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const runTaskInfo = ref<any>(null);

class RunTaskClass {
  constructor() {}

  setLoading(flag: boolean) {
    isLoading.value = flag;
  }
  open(info: any) {
    runTaskInfo.value = info;
    isOpen.value = true;
  }
  close() {
    runTaskInfo.value = null;
    isOpen.value = false;
  }
}

export const useRunTask = () => {
  const runTask = new RunTaskClass();

  const setLoading = runTask.setLoading.bind(runTask);

  const onOpen = runTask.open.bind(runTask);

  const onClose = runTask.close.bind(runTask);

  return {
    isLoading,
    isOpen,
    runTaskInfo,
    setLoading,
    onOpen,
    onClose,
  };
};
