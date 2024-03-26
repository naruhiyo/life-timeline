import 'fake-indexeddb/auto'
import { IndexedDB } from '@/api/IndexedDB'

type TestForm = { id: string; test: string; date: string }

describe('IndexedDB Test', () => {
  beforeEach(async () => {
    // reset all data before each tests.
    const db: IndexedDB = await IndexedDB.getSingleton()
    await db.deleteAll()
  })

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
      const form: TestForm = { id: 'test-id', test: 'hello', date: '2024-01-01' }

      const actual = await db.insert<TestForm>(form)

      const actualItems: TestForm[] = await db.selectAll<TestForm>()

      expect(actual).toBe(true)
      expect(actualItems[0]).toEqual({
        id: 'test-id',
        test: 'hello',
        date: '2024-01-01',
      })
    })
  })

  describe('update()', () => {
    test('Update an item in IndexedDB', async () => {
      const db: IndexedDB = await IndexedDB.getSingleton()
      const initialForm: TestForm = { id: 'test-id', test: 'hello', date: '2024-01-01' }

      await db.insert<TestForm>(initialForm)

      const secondForm: TestForm = { id: 'test-id', test: 'world', date: '2024-01-01' }

      const actual = await db.update<TestForm>(secondForm)
      const actualItem: TestForm | undefined = await db.select<TestForm>(secondForm.id)

      expect(actual).toBe(true)
      expect(actualItem).toEqual({
        id: 'test-id',
        test: 'world',
        date: '2024-01-01',
      })
    })
  })

  describe('selectAll()', () => {
    test('Obtain three life-timeline event items by ordering them based on `date` when the method is called once."', async () => {
      const db: IndexedDB = await IndexedDB.getSingleton()
      await db.insert<TestForm>({ id: 'test-id1', test: 'hello1', date: '2024-03-01' })
      await db.insert<TestForm>({ id: 'test-id2', test: 'hello2', date: '2024-02-01' })
      await db.insert<TestForm>({ id: 'test-id3', test: 'hello3', date: '2024-01-01' })

      const actualItems: TestForm[] = await db.selectAll<TestForm>()
      expect(actualItems).toEqual([
        {
          id: 'test-id3',
          test: 'hello3',
          date: '2024-01-01',
        },
        {
          id: 'test-id2',
          test: 'hello2',
          date: '2024-02-01',
        },
        {
          id: 'test-id1',
          test: 'hello1',
          date: '2024-03-01',
        },
      ])
    })
  })

  describe('select()', () => {
    test('Obtain the life-timeline event item which is specified with id.', async () => {
      const db: IndexedDB = await IndexedDB.getSingleton()
      const testForm1: TestForm = { id: 'test-id1', test: 'hello1', date: '2024-01-01' }
      const testForm2: TestForm = { id: 'test-id2', test: 'hello2', date: '2024-02-01' }
      await db.insert<TestForm>(testForm1)
      await db.insert<TestForm>(testForm2)

      const actualItem1: TestForm | undefined = await db.select<TestForm>(testForm1.id)
      const actualItem2: TestForm | undefined = await db.select<TestForm>(testForm2.id)
      expect(actualItem1).toEqual({
        id: 'test-id1',
        test: 'hello1',
        date: '2024-01-01',
      })
      expect(actualItem2).toEqual({
        id: 'test-id2',
        test: 'hello2',
        date: '2024-02-01',
      })
    })
  })

  describe('delete()', () => {
    test('Delete a life-timeline event item from IndexedDB when the method is called once.', async () => {
      const db: IndexedDB = await IndexedDB.getSingleton()
      await db.insert<TestForm>({ id: 'test-id', test: 'hello1', date: '2024-01-01' })

      const actual = await db.delete('test-id')

      const items: TestForm[] = await db.selectAll<TestForm>()

      expect(actual).toEqual(true)
      expect(items).toEqual([])
    })
  })

  describe('deleteAll()', () => {
    test('Delete three life-timeline event items from IndexedDB when the method is called once.', async () => {
      const db: IndexedDB = await IndexedDB.getSingleton()
      await db.insert<TestForm>({ id: 'test-id1', test: 'hello1', date: '2024-01-01' })
      await db.insert<TestForm>({ id: 'test-id2', test: 'hello2', date: '2024-02-01' })
      await db.insert<TestForm>({ id: 'test-id3', test: 'hello3', date: '2024-03-01' })

      await db.deleteAll()

      const actualItems: TestForm[] = await db.selectAll<TestForm>()
      expect(actualItems).toEqual([])
    })
  })
})
