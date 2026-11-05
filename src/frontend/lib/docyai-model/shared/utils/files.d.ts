import { ChunkItem, OpenFilePickerOptions } from '..';
declare class FilesClass {
    base64ToFile: (base64Str: string, filename?: string) => File;
    base64ToBlob: (base64: string) => Blob;
    blobToFile: (blob: Blob, fileName: string) => File;
    fileToBlob: (file: File) => Blob;
    buildAcceptMap: (extList: string[]) => Record<string, string[]>;
    pickFiles: (options: OpenFilePickerOptions) => Promise<File[]>;
    createChunks: (file: File, chunkSize?: number, type?: string) => ChunkItem[];
    fileSuffix(name: string): string | undefined;
}
export declare const files: FilesClass;
export declare const base64ToFile: (base64Str: string, filename?: string) => File;
export declare const base64ToBlob: (base64: string) => Blob;
export declare const blobToFile: (blob: Blob, fileName: string) => File;
export declare const fileToBlob: (file: File) => Blob;
export declare const buildAcceptMap: (extList: string[]) => Record<string, string[]>;
export declare const pickFiles: (options: OpenFilePickerOptions) => Promise<File[]>;
export declare const createChunks: (file: File, chunkSize?: number, type?: string) => ChunkItem[];
export declare const fileSuffix: (name: string) => string | undefined;
export default files;
