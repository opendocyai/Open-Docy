type __VLS_Props = {
    inputNodes: any;
    inputNode: any;
    selectOptions: any;
    isExitLoading: boolean;
    isSaveLoading: boolean;
};
type __VLS_ModelProps = {
    "inputNodeIdx"?: any;
    "interactionDescription"?: string;
    "interactionSelect"?: string;
    "filesByNode"?: any[];
    "isExitLoop"?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:inputNodeIdx": (value: any) => any;
    "update:interactionDescription": (value: string) => any;
    "update:interactionSelect": (value: string) => any;
    "update:filesByNode": (value: any[]) => any;
    "update:isExitLoop": (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:inputNodeIdx"?: ((value: any) => any) | undefined;
    "onUpdate:interactionDescription"?: ((value: string) => any) | undefined;
    "onUpdate:interactionSelect"?: ((value: string) => any) | undefined;
    "onUpdate:filesByNode"?: ((value: any[]) => any) | undefined;
    "onUpdate:isExitLoop"?: ((value: boolean) => any) | undefined;
}>, {
    inputNodes: any;
    inputNode: any;
    selectOptions: any;
    isExitLoading: boolean;
    isSaveLoading: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
