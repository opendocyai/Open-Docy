export interface CodyAIOptions {
    token?: string;
    baseURL?: string;
}
export type CodyAIOptionsType = CodyAIOptions | any;
export declare function setCodyAIConfig(config: CodyAIOptionsType): void;
export declare function getCodyAIConfig(): CodyAIOptionsType;
