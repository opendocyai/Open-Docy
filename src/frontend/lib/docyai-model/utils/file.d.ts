export declare class FileClass {
    getFileExtension(src: string): string;
    getFileExtensionFromFile(file: File): string;
    genFileId: (prefix?: string) => string;
}
declare const file: FileClass;
export declare const getFileExtension: (src: string) => string;
export declare const getFileExtensionFromFile: (file: File) => string;
export declare const genFileId: (prefix?: string) => string;
export default file;
