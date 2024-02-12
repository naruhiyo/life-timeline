import 'fake-indexeddb/auto'
import { IndexedDB } from '@/api/IndexedDB'

type TestForm = { id: string; test: string }

describe('IndexedDB Test', () => {
  describe('getSingleton()', () => {
    test('An instance must be unique.', async () => {
      const actual: IndexedDB = await IndexedDB.getSingleton()
      const expected: IndexedDB = await IndexedDB.getSingleton()

      expect(actual).toBe(expected)
    })
  })

  describe('insert()', () => {
    test('Stored an item into IndexedDB.', async () => {
      const db: IndexedDB = await IndexedDB.getSingleton()
      const form: TestForm = { id: 'test-id', test: 'hello' }

      const actual = await db.insert<TestForm>(form)

      const actualItems: TestForm[] = await db.selectAll<TestForm>()

      expect(actual).toBe(true)
      expect(actualItems[0]).toEqual({
        id: 'test-id',
        test: 'hello',
      })
    })
  })
})
