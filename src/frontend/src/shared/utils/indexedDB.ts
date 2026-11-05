import Dexie, { type Table } from "dexie";
import {DB_NAME, type DbSchema, dbSchema} from "@/shared";


export class IndexedDBService {
	private db: Dexie;

	private dbName: string;

	private schema: DbSchema;

	constructor(
		dbName: string = DB_NAME,
		schema: DbSchema = dbSchema,
	) {

		this.dbName = dbName;
		this.schema = schema;

		this.db = new Dexie(this.dbName);

		this.db.version(1).stores(this.schema);
	}

	private table(tableName: string): Table<any, any> {
		return this.db.table(tableName);
	}

	async getTables() {
		return this.db.tables.map(
			(table: any) => table.name
		);
	}

	private cleanData<T extends Record<string, any>>(data: T): T {
		const cleaned = {} as T;

		for (const key in data) {
			if (data[key] !== undefined) {
				cleaned[key] = structuredClone(data[key]);
			}
		}

		return cleaned;
	}

	async put(tableName: string, data: any) {
		const cleanedData = this.cleanData(data);
		return this.table(tableName).put(cleanedData);
	}

	async add(tableName: string, data: any) {
		return this.put(tableName, data);
	}

	async bulkAdd(tableName: string, dataArray: any[]) {
		const cleaned = dataArray.map((item) => this.cleanData(item));

		return this.table(tableName).bulkPut(cleaned);
	}

	async getAll<T = any>(tableName?: string): Promise<T[] | Record<string, any[]>> {
		if (tableName) {
			return this.table(tableName).toArray();
		}

		const tables = this.db.tables;
		const entries = await Promise.all(
			tables.map(async (table: any) => {
				const data = await table.toArray();

				return [table.name, data];
			})
		);
		return Object.fromEntries(entries);
	}

	async getById<T = any>(
		tableName: string,
		id: number | string
	): Promise<T | undefined> {
		return this.table(tableName).get(id);
	}

	async getByField<T = any>(
		tableName: string,
		field: string,
		value: any
	): Promise<T[]> {
		return this.table(tableName).where(field).equals(value).toArray();
	}

	async update(
		tableName: string,
		id: number | string,
		newData: object
	) {
		const cleanedData = this.cleanData(newData);

		return this.table(tableName).update(id, cleanedData);
	}

	async remove(tableName: string, id: number | string) {
		return this.table(tableName).delete(id);
	}

	async clearTable(tableName: string) {
		return this.table(tableName).clear();
	}

	async clearAllTables() {
		for (const table of this.db.tables) {
			await table.clear();
		}
	}

	async resetAndRebuildDatabase() {
		await this.db.delete();

		this.db = new Dexie(this.dbName);

		this.db.version(1).stores(this.schema);
	}

	async transaction(callback: () => Promise<void>) {
		return this.db.transaction("rw", this.db.tables, callback);
	}

	listenChanges(
		tableName: string,
		callback: (
			type: "creating" | "updating" | "deleting",
			payload: any
		) => void
	) {
		const table = this.table(tableName);

		table.hook("creating", (_primKey: any, obj: any) => {
			callback("creating", obj);
		});

		table.hook("updating", (modifications: any, _primKey: any, obj: any) => {
			callback("updating", {
				modifications,
				oldData: obj,
			});
		});

		table.hook("deleting", (_primKey: any, obj: any) => {
			callback("deleting", obj);
		});
	}

	close() {
		this.db.close();
	}

}
