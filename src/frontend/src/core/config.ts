export interface CodyAIOptions {
  token?: string;
  baseURL?: string;
}

export type CodyAIOptionsType = CodyAIOptions | any

let codyConfig: CodyAIOptionsType = null;

export function setCodyAIConfig(config: CodyAIOptionsType) {
  codyConfig = config;
}

export function getCodyAIConfig(): CodyAIOptionsType {
  return codyConfig;
}
