import 'fake-indexeddb/auto'
import { IndexedDB } from '@/api/IndexedDB'

describe('IndexedDB Test', () => {
  describe('get instance', () => {
    test('the instance must be unique', async () => {
      const actual: IndexedDB = await IndexedDB.getSingleton()
      const expected: IndexedDB = await IndexedDB.getSingleton()

      expect(actual).toBe(expected)
    })
  })

  describe('insert', () => {
    test('stored item', async () => {
      const db: IndexedDB = await IndexedDB.getSingleton()
      type TestForm = { test: string }
      const form: TestForm = { test: 'hello' }

      await db.insert<TestForm>(form)

      const actualItems: TestForm[] = await db.selectAll<TestForm>()
      expect(actualItems[0]).toEqual({
        test: 'hello',
      })
    })
  })
})
