import { AxiosRequestConfig } from 'axios';
import { MessageApi, MessageType } from 'ant-design-vue/es/message';
export type HttpMethod = "get" | "post" | "put" | "delete" | "head" | "patch" | "options";
export type ApiConfig = {
    url: string;
    method: HttpMethod;
    [key: string]: any;
};
export type ApiFn = (...args: any[]) => ApiConfig;
export type ApiMap = Record<string, ApiFn>;
export type NoticeType = "info" | "success" | "error" | "warning" | "loading";
export interface ToastOptions {
    type: NoticeType;
    content: string;
}
export interface Toast extends MessageApi {
    (options: ToastOptions): MessageType;
    success(content: string): MessageType;
    error(content: string): MessageType;
    warning(content: string): MessageType;
    info(content: string): MessageType;
}
export interface HttpClientOptions {
    debug?: boolean;
    baseURL?: string;
    timeout?: number;
    loading?: Function;
    getToken?: Function;
    setToken?: Function;
    refreshToken?: Function;
    onUnauthorized?: Function;
    logout?: Function;
    toast?: MessageApi;
}
export interface RequestConfig {
    isAuth?: boolean;
    refresh?: boolean;
    isToast?: boolean;
    isLoading?: boolean;
    isRaw?: boolean;
    isParams?: boolean;
}
export interface RequestOptions<T = any> extends Omit<AxiosRequestConfig, "params" | "data"> {
    params?: T;
    data?: T;
    config?: RequestConfig;
    requestConfig?: RequestConfig;
}
