export declare const useRoleStore: import('pinia').StoreDefinition<"role", {
    role_perms_list: any[];
}, {}, {
    SET_ROLE_PERMS(list: any): void;
    HAS_ROLE_PERM(key: any): boolean;
}>;
