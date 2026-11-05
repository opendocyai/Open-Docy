export type ExtractorType = "profile_scan" | "area" | string;
export interface ResolveExtractorKeysOptions {
    extractor_type: ExtractorType;
    input_values: any;
    input: string;
    formResult: any;
    filesKey: any;
}
export declare function resolveExtractorKeys(opts: ResolveExtractorKeysOptions): any[];
export default resolveExtractorKeys;
