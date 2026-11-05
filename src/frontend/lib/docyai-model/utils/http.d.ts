import { HttpClientOptions, ApiConfig, RequestOptions, HttpMethod, RequestConfig } from '../shared/types/http';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
export declare const MethodEnum: Record<HttpMethod, string>;
export declare const HTTP_CONFIG: RequestConfig;
interface HttpAxiosInstance extends AxiosInstance {
    request<T = any, R = T>(config: AxiosRequestConfig): Promise<R>;
}
export declare class HttpClient {
    private readonly _options;
    instance: HttpAxiosInstance;
    constructor(options: HttpClientOptions);
    printLog(...args: any[]): void;
    printError(...args: any[]): void;
    setup(): void;
    get options(): HttpClientOptions;
    request<T = any, D = any>(api: ApiConfig, options?: RequestOptions<D>): Promise<T>;
}
export declare const httpClient: (options: HttpClientOptions) => HttpClient;
export default httpClient;
