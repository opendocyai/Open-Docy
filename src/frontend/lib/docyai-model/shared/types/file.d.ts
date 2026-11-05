export declare const UUID_CHARS: string[];
export declare const FILE_TYPE_MAP: Record<string, string>;
export declare const FILE_TYPES: Record<string, string[]>;
export type FileTypeKey = keyof typeof FILE_TYPES;
export interface OpenFilePickerOptions {
    multiple?: boolean;
    excludeAcceptAllOption?: boolean;
    types?: FilePickerAcceptType[];
    id?: string;
    startIn?: WellKnownDirectory | FileSystemHandle;
}
export interface FilePickerAcceptType {
    description?: string;
    accept: Record<string, string[]>;
}
export type WellKnownDirectory = 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos';
export type FileStatus = 'ready' | 'uploading' | 'success' | 'fail';
export interface UploadFile {
    name?: string;
    raw?: File;
    size?: number;
    status?: FileStatus;
    percentage?: number;
    uid?: number | string;
    type?: string;
    url?: string;
    key?: string;
    file_ext?: string;
    fileType?: string;
}
export interface ChunkItem {
    index: number;
    start: number;
    end: number;
    chunk: File | Blob;
}
