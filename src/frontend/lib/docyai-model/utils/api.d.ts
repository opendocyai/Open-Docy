import { ApiMap } from '../shared/types/http';
export declare class ApiProxy {
    private api;
    private name?;
    constructor(api: ApiMap, name?: string);
    private getApiFn;
    private call;
    create(): any;
}
export declare const apiProxy: (api: ApiMap, name?: string) => ApiProxy;
export declare const useApiProxy: (api: ApiMap, name?: string) => any;
export default apiProxy;
