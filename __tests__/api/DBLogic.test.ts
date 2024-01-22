import 'fake-indexeddb/auto'
import { DBLogic } from '@/api/DBLogic'
import { IndexedDB } from '@/api/IndexedDB'

describe('DBLogic Test', () => {
  describe('close Database', () => {
    test('close indexed db`', async () => {
      const db = await IndexedDB.getSingleton()
      jest.spyOn(db, 'closeDB').mockImplementation(() => Promise.resolve())

      const logic: DBLogic = new DBLogic()
      await logic.close()

      expect(db.closeDB).toHaveBeenCalledTimes(1)
    })
  })
})
