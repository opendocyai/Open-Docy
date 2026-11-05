import { UploadFile } from '../shared';
interface UploadOption {
    category: string;
}
export declare function useUpload(filesArray: UploadFile[], option: UploadOption): Promise<UploadFile[]>;
export {};
