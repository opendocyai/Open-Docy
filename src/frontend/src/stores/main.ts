import { defineStore, acceptHMRUpdate } from "pinia";
import { useHttp } from "@/client";
import { useApiAuth } from "@/api";
import to from "await-to-js";

export const useMainStore = defineStore("main", {
  state: () => ({
    isLogin: false,
    userInfo: undefined,
    loginForm: undefined,
    token: undefined,
    refresh: undefined,
    userId: undefined,
    first_login: false,
    token_type: undefined,
    spinning: false,
    userSessionId: undefined,
  }),
  actions: {
    SET_LOGIN_STATUS(state: boolean = false) {
      this.isLogin = state;
    },
    SET_LOGIN_FORM(form: any = undefined) {
      this.loginForm = form;
    },
    SET_USER_INFO(info: any = undefined) {
      this.userInfo = info;
    },
    SET_USER_ID(user_id: any = undefined) {
      this.userId = user_id;
    },
    SET_TOKEN_TYPE(type: any = undefined) {
      this.token_type = type;
    },
    SET_SPINNING(state: boolean = false) {
      this.spinning = state;
    },
    SET_FIRST_LOGIN(state: boolean = false) {
      this.first_login = state;
    },
    SET_TOKEN(t: any = undefined) {
      this.token = t;
    },
    SET_REFRESH(refresh_token: any = undefined) {
      this.refresh = refresh_token;
    },
    async GET_USER_INFO() {
      const { request } = useHttp();
      const [err, res] = await to<any>(request(useApiAuth("me_info")));
      if (!err && res?.code == 200) {
        this.SET_USER_INFO(res?.data);
        this.SET_USER_ID(res?.data?.id);
      }
      return { err, res };
    },
    SET_USER_SESSION_ID(info: any = undefined) {
      this.userSessionId = info;
    },

    SET_SERVER_REFRESH: (refresh_token: any) => {
      const { request } = useHttp();
      return to(
        request(useApiAuth("refresh"), {
          data: { refresh_token },
          config: {
            isAuth: false,
            refresh: false,
          },
        }),
      );
    },

    refreshToken(refresh_token: any) {
      return this.SET_SERVER_REFRESH(refresh_token);
    },

    SET_SIGN_OUT() {
      this.SET_LOGIN_STATUS();
      this.SET_USER_INFO();
      this.SET_USER_ID();
      this.SET_TOKEN();
      this.SET_REFRESH();
      this.SET_TOKEN_TYPE();
      this.SET_FIRST_LOGIN();
      this.SET_USER_SESSION_ID();
    },
    SET_COOKIE({ isLogin, userInfo, token }: any) {
      this.SET_LOGIN_STATUS(isLogin);
      this.SET_USER_INFO(userInfo);
      this.SET_TOKEN(token);
    },
  },
  persist: {
    key: "docy-ai-node_main",
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
