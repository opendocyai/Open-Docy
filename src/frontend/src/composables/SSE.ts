import { useRouter } from "vue-router";

import { SSEManager, autoBind, type SSEManagerType } from "@/shared";

import { useMainStore, useEventSourceStore } from "@/stores";

import { getCodyAIConfig, type CodyAIOptionsType } from "@/core";

import { useAuth } from "@/utils";

let sseInstance: SSEManagerType | null = null;



function getSSEInstance() {
  if (!sseInstance) {
    const mainStore = useMainStore();
    const router = useRouter();

    const { checkAndRefreshToken } = useAuth();

    const eventSourceStore = useEventSourceStore();

    const config: CodyAIOptionsType = getCodyAIConfig();

    const baseUrl =
      config?.baseURL || import.meta.env.VITE_API_BASEURL || "/api";

    sseInstance = SSEManager({
      url: `${baseUrl}/v1/common/sse/stream`,

      getToken: () => mainStore.token!,

      refreshToken: checkAndRefreshToken,
      maxRetryCount: 5,

      baseDelay: 2000,

      maxDelay: 30000,

      debug: true,

      onMessage(data: any) {
        console.log("Received SSE message:", data);

        if (data.event_type != "keep_alive" && data) {
          eventSourceStore.SET_SSE_DATA(data);
        }
      },

      onConnected() {
        console.log("SSE connected");
      },

      onDisconnected() {
        console.log("SSE disconnected");
      },

      onForceLogout() {
        mainStore.SET_SIGN_OUT();
        router.replace("/login");
      },

      onError(error) {
        console.error("SSE error:", error);
      },

      onErrorReconnect(error) {
        console.log("🚀 ~ onErrorReconnect ~ error: ", error);
        if (sseInstance?.isDisconnected.value) {
          mainStore.SET_SIGN_OUT();
          router.replace("/login");
        }
      },
    });
  }
  return sseInstance;
}

export const useSSE = (): SSEManagerType => {
  const sse = getSSEInstance();

  return autoBind(sse);
};
