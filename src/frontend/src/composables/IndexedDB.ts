import {autoBind, DB_NAME, dbSchema, IndexedDBService} from "@/shared";

const dbInstances = new Map<string, IndexedDBService>();

function getDBInstance(dbName: string) {
  if (!dbInstances.has(dbName)) {
    dbInstances.set(
      dbName,
      new IndexedDBService(
        dbName,
        dbSchema
      )
    );
  }

  return dbInstances.get(dbName)!;
}

export const useIndexedDB = (dbName: string = DB_NAME) => {
  const db = getDBInstance(dbName);
  return autoBind(db);
};
