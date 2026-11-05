import type {
  HttpClientOptions,
  ApiConfig,
  RequestOptions,
  HttpMethod,
  RequestConfig,
} from "@/shared/types/http";

import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export const MethodEnum: Record<HttpMethod, string> = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
  patch: "patch",
  head: "head",
  options: "options",
};

export const HTTP_CONFIG: RequestConfig = {
  isAuth: true,

  refresh: true,

  isToast: true,

  isLoading: true,

  isRaw: false,
};

interface HttpAxiosInstance extends AxiosInstance {
  request<T = any, R = T>(config: AxiosRequestConfig): Promise<R>;
}

export class HttpClient {
  private readonly _options: HttpClientOptions;

  public instance: HttpAxiosInstance;

  constructor(options: HttpClientOptions) {
    this._options = options;
    this.instance = axios.create(options) as HttpAxiosInstance;
    this.setup();
  }

  public printLog(...args: any[]) {
    if (!this.options.debug) {
      return;
    }
    console.log("[HTTP]", ...args);
  }

  public printError(...args: any[]) {
    if (!this.options.debug) {
      return;
    }
    console.error("[HTTP]", ...args);
  }

  setup() {

    this.instance.interceptors.request.use(async (config) => {
      const custom = config as any;
      const requestConfig = custom.requestConfig || {};
      if (requestConfig.isLoading) {
        this.options.loading?.(true);
      }
      if (requestConfig.isAuth) {
        let token = this.options.getToken?.();
        if (token) {
          const valid = await this.options.refreshToken?.();
          this.printLog("valid 122121212121212121212121:", valid);
          if (!valid) {
            this.options.onUnauthorized?.();
            throw new Error("Token is invalid or expired");
          }
          token = this.options.getToken?.();

          if (!token) {
            this.options.onUnauthorized?.();

            throw new Error("Token is invalid");
          }

          config.headers.Authorization = `Bearer ${token}`;
          config.headers.set("Authorization", `Bearer ${token}`);
        }
      }
      if (this.options.debug) {
        this.printLog("request:", config);
      }
      return config;
    });

    this.instance.interceptors.response.use(
      async (response: any) => {
        const config: any = response.config;
        const requestConfig = config.requestConfig || {};

        const authorization = response.headers.get("authorization");

        if (requestConfig?.isAuth && authorization) {
          const token = authorization.replace(/^Bearer\s+/i, "");
          this.options.setToken?.(token);
        }

        if (requestConfig.isLoading) {
          this.options.loading?.(false);
        }
        if (requestConfig.debug) {
          this.printLog("response:", response);
        }
        return requestConfig.isRaw ? response : response.data;
      },
      async (error) => {
        console.log("🚀 ~  ~ error: ", error);
        const config: any = error.config;
        const requestConfig = config.requestConfig || {};
        if (requestConfig.isLoading) {
          this.options.loading?.(false);
        }

        if (
          error.response?.status === 401 &&
          requestConfig.refresh &&
          !config._retry
        ) {
          config._retry = true;
          try {
            const valid = await this.options.refreshToken?.();
            console.log("🚀 ~  ~ valid: ", valid);
            if (!valid) {
              this.printError("❌ refresh token failed");

              this.options.onUnauthorized?.();

              return Promise.reject(error);
            }

            const newToken = this.options.getToken?.();

            if (!newToken) {
              this.options.onUnauthorized?.();

              return Promise.reject(error);
            }

            if (newToken) {
              config.headers ??= {};
              config.headers.set("Authorization", `${newToken}`);
              config.headers.Authorization = `Bearer ${newToken}`;
            }

            this.printLog("✅ retry request");
            return this.instance(config);
          } catch (e) {
            this.options.logout?.();
          }
        }

        if (error.response?.status === 401 && config._retry) {
          this.options.onUnauthorized?.();
        }

        if (requestConfig.isToast) {
          const msg =
            error.response?.data?.message || error.response?.data?.msg || error.message ||error.msg || "Request failed";
          this.options.toast?.error?.(msg);
        }

        return Promise.reject(error);
      },
    );
  }

  get options() {
    return this._options;
  }

  request<T = any, D = any>(api: ApiConfig, options?: RequestOptions<D>) {
    const { url, method } = api;

    const {
      params,
      data,
      config,
      headers,
      timeout,
      responseType,
      signal,
      withCredentials,
      ...other
    } = options || {};

    const upperMethod = MethodEnum[method] as HttpMethod;

    const isQuery =
      upperMethod === MethodEnum.get ||
      upperMethod === MethodEnum.delete ||
      upperMethod === MethodEnum.head ||
      config?.isParams;

    return this.instance.request<T, T>({
      url,
      method: upperMethod,
      ...(params ? { params } : undefined),
      ...(isQuery ? { params: { ...data, ...params } } : { data }),
      headers,
      timeout,
      responseType,
      signal,
      withCredentials,
      requestConfig: {
        ...HTTP_CONFIG,
        ...config,
      },
      ...other,
    } as RequestOptions<D>);
  }
}

export const httpClient = (options: HttpClientOptions) =>
  new HttpClient(options);

export default httpClient;
