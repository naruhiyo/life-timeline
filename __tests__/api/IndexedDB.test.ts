import 'fake-indexeddb/auto'
import { IndexedDB } from '@/api/IndexedDB'

describe('IndexedDB Test', () => {
  beforeEach(async () => {
    const db: IndexedDB = await IndexedDB.getSingleton()
    await db.deleteAll()
  })

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

  describe('selectAll', () => {
    test('show items', async () => {
      type TestForm = { test: string }
      const db: IndexedDB = await IndexedDB.getSingleton()
      await db.insert<TestForm>({ test: 'hello1' })
      await db.insert<TestForm>({ test: 'hello2' })
      await db.insert<TestForm>({ test: 'hello3' })

      const actualItems: TestForm[] = await db.selectAll<TestForm>()
      expect(actualItems).toEqual([
        {
          test: 'hello1',
        },
        {
          test: 'hello2',
        },
        {
          test: 'hello3',
        },
      ])
    })
  })
})
