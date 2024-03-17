// eslint-disable-next-line import/named
import { IDBPDatabase, openDB } from 'idb'
import { IndexedDBConfig } from '@/api/IndexedDBConfig'

export type LifeTimelineDB = IDBDatabase | undefined

export class IndexedDB {
  private static instance: IndexedDB
  private static db: IDBPDatabase

  private constructor() {
    IndexedDB.init()
  }

  private static async init(): Promise<void> {
    // DB作成
    try {
      const db: IDBPDatabase = await openDB(IndexedDBConfig.DB_NAME, IndexedDBConfig.VERSION, {
        upgrade(db: IDBPDatabase) {
          const isExist = db.objectStoreNames.contains(IndexedDBConfig.STORE_NAME)

          if (!isExist) {
            // Create Object store
            const lifeTimelineStore = db.createObjectStore(IndexedDBConfig.STORE_NAME, {
              keyPath: 'id',
            })

            // Create index
            lifeTimelineStore.createIndex('date_index', 'date')
          }
        },
      })
      IndexedDB.db = db
    } catch (err) {
      console.error('Error caused', err)
    }
  }

  static async getSingleton(): Promise<IndexedDB> {
    if (IndexedDB.instance === null || IndexedDB.instance === undefined) {
      IndexedDB.instance = new IndexedDB()
      await IndexedDB.init()
    }

    return IndexedDB.instance
  }

  /**
   * Insert record.
   * @param form A definition of record
   * @returns {Promise<boolean>}
   */
  async insert<T>(form: T): Promise<boolean> {
    if (IndexedDB.db === undefined || IndexedDB.db === null) {
      console.warn("Insert failed because of the db doesn't connected.")
      return false
    }

    try {
      // start transaction
      const transaction = IndexedDB.db.transaction(IndexedDBConfig.STORE_NAME, 'readwrite')

      // save to store
      const lifeTimelineStore = transaction.objectStore(IndexedDBConfig.STORE_NAME)
      await lifeTimelineStore.add(form)
      await transaction.done
      return true
    } catch (err) {
      console.warn('transaction error', err)
      return false
    }
  }

  /**
   * Get all records
   *
   * @returns {Promise<T[]>}
   */
  async selectAll<T>(): Promise<T[]> {
    if (IndexedDB.db === undefined || IndexedDB.db === null) {
      console.warn("selectAll failed because of the db doesn't connected.")
      return []
    }

    try {
      const transaction = IndexedDB.db.transaction(IndexedDBConfig.STORE_NAME, 'readonly')
      const lifeTimelineStore = transaction.objectStore(IndexedDBConfig.STORE_NAME)
      const items = await lifeTimelineStore.index('date_index').getAll()
      await transaction.done
      return items
    } catch (err) {
      console.warn('transaction error', err)
      return []
    }
  }

  /**
   * Close DB
   *
   * @returns {Promise<void>}
   */
  async closeDB(): Promise<void> {
    if (IndexedDB.db !== undefined && IndexedDB.db !== null) {
      await IndexedDB.db.close()
    }
  }

  /**
   * Delete a record
   *
   * @param id unique key
   * @returns {Promise<boolean>}
   */
  async delete(id: string): Promise<boolean> {
    if (IndexedDB.db === undefined || IndexedDB.db === null) {
      console.warn("SelectAll failed because of the db doesn't connected.")
      return false
    }

    try {
      // start transaction
      const transaction = IndexedDB.db.transaction(IndexedDBConfig.STORE_NAME, 'readwrite')

      // delete from store
      const lifeTimelineStore = transaction.objectStore(IndexedDBConfig.STORE_NAME)
      await lifeTimelineStore.delete(id)
      await transaction.done
      return true
    } catch (err) {
      console.error('delete record error', err)
      return false
    }
  }

  /**
   * Clear all records
   * @returns {Promise<void>}
   */
  async deleteAll(): Promise<void> {
    if (IndexedDB.db === undefined || IndexedDB.db === null) {
      console.warn("Insert failed because of the db doesn't connected.")
      return
    }

    try {
      const transaction = IndexedDB.db.transaction(IndexedDBConfig.STORE_NAME, 'readwrite')
      const lifeTimelineStore = transaction.objectStore(IndexedDBConfig.STORE_NAME)

      await lifeTimelineStore.clear()
      await transaction.done
    } catch (err) {
      console.error('error', err)
    }
    return
  }
}
