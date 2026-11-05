import { FileStatus } from '../types';
declare class StatusFile {
    ready: FileStatus;
    uploading: FileStatus;
    success: FileStatus;
    fail: FileStatus;
    get_status(status: FileStatus): FileStatus;
}
export declare const statusFile: StatusFile;
export declare const STATUS_READY: FileStatus;
export declare const STATUS_UPLOADING: FileStatus;
export declare const STATUS_SUCCESS: FileStatus;
export declare const STATUS_FAIL: FileStatus;
export declare const get_status: (status: FileStatus) => FileStatus;
export default statusFile;
