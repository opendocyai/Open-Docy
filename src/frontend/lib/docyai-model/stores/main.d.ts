export declare const useMainStore: import('pinia').StoreDefinition<"main", {
    isLogin: boolean;
    userInfo: undefined;
    loginForm: undefined;
    token: undefined;
    refresh: undefined;
    userId: undefined;
    first_login: boolean;
    token_type: undefined;
    spinning: boolean;
    userSessionId: undefined;
}, {}, {
    SET_LOGIN_STATUS(state?: boolean): void;
    SET_LOGIN_FORM(form?: any): void;
    SET_USER_INFO(info?: any): void;
    SET_USER_ID(user_id?: any): void;
    SET_TOKEN_TYPE(type?: any): void;
    SET_SPINNING(state?: boolean): void;
    SET_FIRST_LOGIN(state?: boolean): void;
    SET_TOKEN(t?: any): void;
    SET_REFRESH(refresh_token?: any): void;
    GET_USER_INFO(): Promise<{
        err: Error | null;
        res: any;
    }>;
    SET_USER_SESSION_ID(info?: any): void;
    SET_SERVER_REFRESH: (refresh_token: any) => Promise<[Error, undefined] | [null, any]>;
    refreshToken(refresh_token: any): Promise<[Error, undefined] | [null, any]>;
    SET_SIGN_OUT(): void;
    SET_COOKIE({ isLogin, userInfo, token }: any): void;
}>;
