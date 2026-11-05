export declare const useSettingNodeId: () => {
    getNextId: (editor: any) => string;
    resetId: (startFrom?: number) => void;
    currentNodeId: Readonly<import('vue').Ref<number, number>>;
};
