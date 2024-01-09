import 'fake-indexeddb/auto'
import { IndexedDB } from '@/api/IndexedDB'

type TestForm = { id: string; test: string }

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
    test('stored an item', async () => {
      const db: IndexedDB = await IndexedDB.getSingleton()
      const form: TestForm = { id: 'test-id', test: 'hello' }

      await db.insert<TestForm>(form)

      const actualItems: TestForm[] = await db.selectAll<TestForm>()
      expect(actualItems[0]).toEqual({
        id: 'test-id',
        test: 'hello',
      })
    })
  })

  describe('select all', () => {
    test('show items', async () => {
      const db: IndexedDB = await IndexedDB.getSingleton()
      await db.insert<TestForm>({ id: 'test-id1', test: 'hello1' })
      await db.insert<TestForm>({ id: 'test-id2', test: 'hello2' })
      await db.insert<TestForm>({ id: 'test-id3', test: 'hello3' })

      const actualItems: TestForm[] = await db.selectAll<TestForm>()
      expect(actualItems).toEqual([
        {
          id: 'test-id1',
          test: 'hello1',
        },
        {
          id: 'test-id2',
          test: 'hello2',
        },
        {
          id: 'test-id3',
          test: 'hello3',
        },
      ])
    })
  })

  describe('delete', () => {
    test('delete an item', async () => {
      const db: IndexedDB = await IndexedDB.getSingleton()
      await db.insert<TestForm>({ id: 'test-id', test: 'hello1' })

      const actual = await db.delete('test-id')

      const items: TestForm[] = await db.selectAll<TestForm>()

      expect(actual).toEqual(true)
      expect(items).toEqual([])
    })
  })

  describe('delete all', () => {
    test('delete items', async () => {
      const db: IndexedDB = await IndexedDB.getSingleton()
      await db.insert<TestForm>({ id: 'test-id1', test: 'hello1' })
      await db.insert<TestForm>({ id: 'test-id2', test: 'hello2' })
      await db.insert<TestForm>({ id: 'test-id3', test: 'hello3' })

      await db.deleteAll()

      const actualItems: TestForm[] = await db.selectAll<TestForm>()
      expect(actualItems).toEqual([])
    })
  })
})
