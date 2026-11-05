declare class AppUtilsClass {
    formatDateTime: (input: string | number, withTime?: boolean) => string;
    hasRolePerm: (key: any) => any;
    formatReadCount(num: number): string;
}
declare const appUtils: AppUtilsClass;
export declare const formatDateTime: (input: string | number, withTime?: boolean) => string;
export declare const hasRolePerm: (key: any) => any;
export declare const formatReadCount: (num: number) => string;
export default appUtils;
