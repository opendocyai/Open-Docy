export interface ConfirmModalOptions {
    title?: string;
    content?: string;
    okText?: string;
    cancelText?: string;
    closable?: boolean;
    onOk?: () => Promise<void> | void;
    onCancel?: () => void;
}
export declare function useConfirmModal(): {
    showConfirm: (options: ConfirmModalOptions) => Promise<boolean>;
};
