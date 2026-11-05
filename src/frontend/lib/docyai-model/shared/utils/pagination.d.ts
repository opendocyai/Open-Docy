declare class PaginationUtils {
    getPaginate: (total: number, pageSize: number, pageNumber: number, deleteCount: number) => number;
}
declare const pagination: PaginationUtils;
export declare const getPaginate: (total: number, pageSize: number, pageNumber: number, deleteCount: number) => number;
export default pagination;
