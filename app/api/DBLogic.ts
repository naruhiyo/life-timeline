import { IndexedDB } from '@/api/IndexedDB'

export class DBLogic {
  /**
   * Close db
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    const db: IndexedDB = await IndexedDB.getSingleton()
    return await db.closeDB()
  }
}
