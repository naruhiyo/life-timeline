import { IndexedDBConfig } from '@/api/IndexedDBConfig'

export type LifeTimelineDB = IDBDatabase | undefined

export class IndexedDB {
  private static instance: IndexedDB
  private static db: LifeTimelineDB

  private constructor() {
    IndexedDB.init()
  }

  private static init(): Promise<void> {
    return new Promise((resolve, reject) => {
      // for debug
      // window.indexedDB.deleteDatabase(IndexedDBConfig.DB_NAME)

      // DB作成
      const request: IDBOpenDBRequest = window.indexedDB.open(
        IndexedDBConfig.DB_NAME,
        IndexedDBConfig.VERSION,
      )

      /**
       * Success to connect db
       */
      request.onsuccess = (): void => {
        IndexedDB.db = request.result
        resolve()
      }

      /**
       * Upgrade Event
       * - The event has occured if a version updated.
       *
       * @param e {IDBVersionChangeEvent}
       */
      request.onupgradeneeded = (e: IDBVersionChangeEvent): void => {
        IndexedDB.db = (e.target as IDBOpenDBRequest).result

        const isExist = IndexedDB.db.objectStoreNames.contains(IndexedDBConfig.STORE_NAME)

        if (!isExist) {
          // Create Object store
          IndexedDB.db.createObjectStore(IndexedDBConfig.STORE_NAME, {
            keyPath: 'id',
          })
        }
        resolve()
      }

      request.onerror = (e: Event): void => {
        console.error('Error caused', e.target)
        reject()
      }
    })
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
    return new Promise((resolve, reject) => {
      if (IndexedDB.db === undefined || IndexedDB.db === null) {
        console.warn("Insert failed because of the db doesn't connected.")
        reject(false)
      }

      // start transaction
      const transaction = IndexedDB.db!.transaction(IndexedDBConfig.STORE_NAME, 'readwrite')

      // save to store
      const lifeTimelineStore = transaction.objectStore(IndexedDBConfig.STORE_NAME)
      lifeTimelineStore.add(form)

      transaction.oncomplete = (_: Event) => {
        resolve(true)
      }

      transaction.onerror = (e: Event) => {
        console.warn('transaction error', e.target)
        reject(false)
      }
    })
  }

  /**
   * Get all records
   *
   * @returns {Promise<T[]>}
   */
  async selectAll<T>(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (IndexedDB.db === undefined || IndexedDB.db === null) {
        console.warn("SelectAll failed because of the db doesn't connected.")
        return resolve([])
      }

      const transaction: IDBTransaction = IndexedDB.db.transaction(
        IndexedDBConfig.STORE_NAME,
        'readonly',
      )
      const lifeTimelineStore: IDBRequest<T[]> = transaction
        .objectStore(IndexedDBConfig.STORE_NAME)
        .getAll()

      lifeTimelineStore.onsuccess = (e: Event): void => {
        const items: T[] = (e.target as IDBRequest<T[]>).result
        resolve(items)
      }

      lifeTimelineStore.onerror = (e: Event) => {
        console.warn('transaction error', e.target)
        reject([])
      }
    })
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
    return new Promise((resolve, reject) => {
      if (IndexedDB.db === undefined || IndexedDB.db === null) {
        console.warn("SelectAll failed because of the db doesn't connected.")
        return resolve(false)
      }

      // start transaction
      const transaction = IndexedDB.db!.transaction(IndexedDBConfig.STORE_NAME, 'readwrite')

      // delete from store
      const lifeTimelineStore = transaction.objectStore(IndexedDBConfig.STORE_NAME)
      lifeTimelineStore.delete(id)

      transaction.oncomplete = (_: Event) => {
        resolve(true)
      }

      transaction.onerror = (e: Event) => {
        console.error('delete record error', e)
        reject(false)
      }
    })
  }

  /**
   * Clear all records
   * @returns {Promise<void>}
   */
  async deleteAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (IndexedDB.db === undefined || IndexedDB.db === null) {
        console.warn("Insert failed because of the db doesn't connected.")
        return resolve()
      }

      // 読み書きトランザクションを開き、データを消去する準備をする
      const transaction: IDBTransaction = IndexedDB.db.transaction(
        IndexedDBConfig.STORE_NAME,
        'readwrite',
      )
      const lifeTimelineStore: IDBObjectStore = transaction.objectStore(IndexedDBConfig.STORE_NAME)

      lifeTimelineStore.clear()

      transaction.oncomplete = (_: Event) => {
        resolve()
      }

      transaction.onerror = (e: Event) => {
        console.error('error', e.target)
        reject()
      }
    })
  }
}