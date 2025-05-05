// src/scripts/utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'starter-app-db';
const DB_VERSION = 1;
const STORE_NAME = 'favoriteItems';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

export const db = {
  async getAll() {
    return (await dbPromise).getAll(STORE_NAME);
  },
  async get(id) {
    return (await dbPromise).get(STORE_NAME, id);
  },
  async put(item) {
    return (await dbPromise).put(STORE_NAME, item);
  },
  async delete(id) {
    return (await dbPromise).delete(STORE_NAME, id);
  },
};
