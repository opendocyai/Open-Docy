export declare const useRunTask: () => {
    isLoading: import('vue').Ref<boolean, boolean>;
    isOpen: import('vue').Ref<boolean, boolean>;
    runTaskInfo: import('vue').Ref<any, any>;
    setLoading: (flag: boolean) => void;
    onOpen: (info: any) => void;
    onClose: () => void;
};
