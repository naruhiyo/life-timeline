import 'fake-indexeddb/auto'
import { DBLogic } from '@/api/DBLogic'
import { IndexedDB } from '@/api/IndexedDB'

describe('DBLogic Test', () => {
  describe('close()', () => {
    test('IndexedDB is closed when the method is called once.', async () => {
      const db = await IndexedDB.getSingleton()
      jest.spyOn(db, 'closeDB').mockImplementation(() => Promise.resolve())

      const logic: DBLogic = new DBLogic()
      await logic.close()

      expect(db.closeDB).toHaveBeenCalledTimes(1)
    })
  })
})
