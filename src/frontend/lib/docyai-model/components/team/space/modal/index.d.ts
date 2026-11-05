declare function toCreateTeamWorkspace(): Promise<[Error, undefined] | [null, {
    data: any;
    code: number;
}]>;
declare const __VLS_export: import('vue').DefineComponent<{}, {
    ruleFormRef: Readonly<import('vue').ShallowRef<any>>;
    toCreateTeamWorkspace: typeof toCreateTeamWorkspace;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
