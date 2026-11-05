import { Component, Ref } from 'vue';
export interface DialogExpose {
    on: {};
    Dialog: Component;
    open: (...args: any[]) => void;
    close: () => void;
    setTitle: (title: string) => void;
    setAttr: (attr: Record<string, any>) => void;
    dialogRef: Ref<any | null>;
}
export declare function useDialog(dialogProps?: Record<string, any> | null): DialogExpose;
