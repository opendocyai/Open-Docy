import { useJwtToken } from "./jwtToken";
import { useMainStore } from "@/stores";
import { isEmpty } from "lodash";

let refreshPromise: Promise<boolean> | null = null;

export const useAuth = () => {
  const { isValid, isExpiringSoon, getUserFromToken } = useJwtToken();

  const setTokens = (newToken: string, newRefreshToken: string) => {
    const mainStore: any = useMainStore();
    mainStore.SET_TOKEN(newToken);
    mainStore.SET_REFRESH(newRefreshToken);
    const userData = getUserFromToken(newToken);
    if (!isEmpty(userData)) {
      mainStore.SET_USER_INFO(userData);
    }
  };

  const clearTokens = () => {
    const mainStore: any = useMainStore();
    mainStore.SET_TOKEN();
    mainStore.SET_REFRESH();
    mainStore.SET_USER_INFO();
    mainStore.SET_LOGIN_STATUS();
  };

  const refreshAuthToken = async (): Promise<boolean> => {
    const mainStore: any = useMainStore();
    if (refreshPromise) {
      return refreshPromise;
    }

    if (!mainStore.refresh) {
      clearTokens();
      return Promise.resolve(false);
    }


    refreshPromise = (async () => {
      try {
        console.log("Refreshing Token");

        const [error, res] = await mainStore.refreshToken(mainStore.refresh);

        console.log("🔄 refresh result:", error, res);

        if (error || !res) {
          console.error("❌ refresh token failed");

          clearTokens();

          return false;
        }

        const { access_token, refresh_token } = res;

        if (!access_token || !refresh_token) {
          console.error("❌ refresh response invalid");

          clearTokens();

          return false;
        }

        setTokens(access_token, refresh_token);

        console.log("✅ Token refresh success");

        return true;
      } catch (error) {
        console.error("❌ refresh token exception:", error);

        clearTokens();

        return false;
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
    
  };

  const checkAndRefreshToken = async (): Promise<boolean> => {
    const mainStore: any = useMainStore();
    if (isValid(mainStore.token) && !isExpiringSoon(mainStore.token)) {
      return true;
    }
    return await refreshAuthToken();
  };

  return {
    setTokens,
    clearTokens,
    refreshAuthToken,
    checkAndRefreshToken,
  };
};
