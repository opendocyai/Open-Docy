export type ExtractorType = "profile_scan" | "area" | string;

export interface ResolveExtractorKeysOptions {
	extractor_type: ExtractorType;
	input_values: any;
	input: string;
	formResult: any;
	filesKey: any;
}

export function resolveExtractorKeys(opts: ResolveExtractorKeysOptions): any[] {
	const { extractor_type, input_values, input, formResult, filesKey } = opts;

	const uploadFiles: any[] = input_values?.[input]?.[0]?.data?.files ?? [];
	const ifaceFiles: any[] = [
		formResult?.extractor_files,
		formResult?.auto_scan?.files,
		filesKey,
	].find((f) => f?.length) ?? [];

	if (extractor_type === "profile_scan") return uploadFiles;

	const hasResult = !!formResult?.auto_scan?.fields?.length
		|| !!formResult?.extractor_files?.length;
	const sameFiles = uploadFiles.length === ifaceFiles.length
		&& uploadFiles.every((f) => ifaceFiles.includes(f));
	const hasExecuted1 = hasResult && !!ifaceFiles?.length && sameFiles;

	return hasExecuted1 ? uploadFiles : (ifaceFiles?.length ? ifaceFiles : uploadFiles);
}

export default resolveExtractorKeys;
