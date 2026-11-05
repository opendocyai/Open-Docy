import { HttpClient } from '../utils';
export declare const useHttp: () => {
    http: HttpClient;
    request: <T = any, D = any>(api: import('..').ApiConfig, options?: import('..').RequestOptions<D> | undefined) => Promise<T>;
};
