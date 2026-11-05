import { PropType } from 'vue';
type __VLS_Props = {
    json?: any;
    data?: any;
    emit?: Function | PropType<(data: any) => void>;
    seed?: number;
    isButton?: boolean;
    options?: any;
    onControls?: () => void;
    onOutput?: () => void;
    onExport?: () => void;
};
type __VLS_ModelProps = {
    'form'?: any;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:form": (value: any) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:form"?: ((value: any) => any) | undefined;
}>, {
    options: any;
    data: any;
    json: any;
    emit: Function | PropType<(data: any) => void>;
    seed: number;
    isButton: boolean;
    onControls: () => void;
    onOutput: () => void;
    onExport: () => void;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
