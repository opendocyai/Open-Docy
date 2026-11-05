import { httpClient, HttpClient, useAuth } from "@/utils";
import { message } from "ant-design-vue";
import { getCodyAIConfig } from "@/core";
import { useMainStore } from "@/stores";
let httpInstance: HttpClient | null = null;
import { useRouter } from "vue-router";

export const useHttp = () => {
  if (!httpInstance) {
    const config: any = getCodyAIConfig();
    const mainStore = useMainStore();
    const { checkAndRefreshToken } = useAuth();
    const router = useRouter();
    console.log("🚀 ~ useHttp ~ config: ", config);

    const baseUrl =
      config?.baseURL || import.meta.env.VITE_API_BASEURL || "/api";

    httpInstance = httpClient({
      baseURL: baseUrl,
      getToken: () => config.token || mainStore.token,
      setToken: (token: string) => mainStore.SET_TOKEN(token),
      refreshToken: checkAndRefreshToken,
      onUnauthorized: () => {
        mainStore.SET_SIGN_OUT();
        router.replace("/login");
      },
      timeout: 16_0000,
      toast: message,
      debug: true,
    });
  }

  return {
    http: httpInstance,
    request: httpInstance.request.bind(httpInstance),
  };
};
