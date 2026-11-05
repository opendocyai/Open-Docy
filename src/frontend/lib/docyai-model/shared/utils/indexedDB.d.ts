import { DbSchema } from '..';
export declare class IndexedDBService {
    private db;
    private dbName;
    private schema;
    constructor(dbName?: string, schema?: DbSchema);
    private table;
    getTables(): Promise<any[]>;
    private cleanData;
    put(tableName: string, data: any): Promise<any>;
    add(tableName: string, data: any): Promise<any>;
    bulkAdd(tableName: string, dataArray: any[]): Promise<any>;
    getAll<T = any>(tableName?: string): Promise<T[] | Record<string, any[]>>;
    getById<T = any>(tableName: string, id: number | string): Promise<T | undefined>;
    getByField<T = any>(tableName: string, field: string, value: any): Promise<T[]>;
    update(tableName: string, id: number | string, newData: object): Promise<number>;
    remove(tableName: string, id: number | string): Promise<void>;
    clearTable(tableName: string): Promise<void>;
    clearAllTables(): Promise<void>;
    resetAndRebuildDatabase(): Promise<void>;
    transaction(callback: () => Promise<void>): Promise<void>;
    listenChanges(tableName: string, callback: (type: "creating" | "updating" | "deleting", payload: any) => void): void;
    close(): void;
}
