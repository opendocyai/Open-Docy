export declare const useDownload: () => {
    init: (data: Blob | string, filename?: string) => void;
    downloadFile: (url: string, fileName: string) => Promise<void>;
};
