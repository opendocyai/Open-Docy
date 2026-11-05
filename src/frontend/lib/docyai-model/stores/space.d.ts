export declare const useSpaceStore: import('pinia').StoreDefinition<"space", {
    spaceInfoList: any;
    spaceInfoCurrent: any;
    ownedTeamSpaceCount: number;
}, {}, {
    SET_USER_SPACE_LIST(info?: any): void;
    SET_USER_SPACE_CURRENT(info?: any): void;
    SET_USER_OWNED_SPACE_COUNT(num?: number): void;
    GET_SPACE_LIST(): Promise<any[]>;
    SET_CLEAN_USER_SPACE(): void;
}>;
