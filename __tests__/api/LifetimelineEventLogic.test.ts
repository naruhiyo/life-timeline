import 'fake-indexeddb/auto'
import { IndexedDB } from '@/api/IndexedDB'
import { LifeTimelineEventLogic } from '@/api/LifeTimelineEventLogic'
import { LifeTimelineEvent } from '@/types/LifeTimelineEvent'

describe('LifeTimelineEventLogic Test', () => {
  describe('create LifeTimelineEvent', () => {
    let db: IndexedDB
    let spy: jest.SpyInstance<Promise<boolean>, [form: unknown], any>

    beforeEach(async () => {
      db = await IndexedDB.getSingleton()
      spy = jest.spyOn(db, 'insert')
    })

    afterEach(async () => {
      await spy.mockClear()
    })

    test('insert an event into indexed db`', async () => {
      spy.mockImplementation(() => Promise.resolve(true))

      const testData: LifeTimelineEvent = {
        id: 'test-id',
        type: 'education',
        date: '2023-12-31',
        title: 'jest title',
        subtitle: 'jest subtitle',
        content: 'jest content',
      }

      const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
      const actual: boolean = await logic.createLifeTimelineEvent(testData)

      expect(db.insert).toHaveBeenCalledTimes(1)
      expect(actual).toEqual(true)
    })

    test('failed to insert an event into indexed db`', async () => {
      const db = await IndexedDB.getSingleton()
      spy.mockImplementation(() => Promise.resolve(false))

      const testData: LifeTimelineEvent = {
        id: 'test-id',
        type: 'education',
        date: '2023-12-31',
        title: 'jest title',
        subtitle: 'jest subtitle',
        content: 'jest content',
      }

      const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
      const actual: boolean = await logic.createLifeTimelineEvent(testData)

      expect(db.insert).toHaveBeenCalledTimes(1)
      expect(actual).toEqual(false)
    })
  })

  describe('get items of LifeTimelineEvent', () => {
    let db: IndexedDB
    let spy: jest.SpyInstance<Promise<unknown[]>, [], any>

    beforeEach(async () => {
      db = await IndexedDB.getSingleton()
      spy = jest.spyOn(db, 'selectAll')
    })

    afterEach(async () => {
      await spy.mockClear()
    })

    test('get all records in db`', async () => {
      const db = await IndexedDB.getSingleton()
      spy.mockImplementation(() =>
        Promise.resolve([
          {
            id: 'test-id',
            type: 'education',
            date: '2023-12-31',
            title: 'jest title',
            subtitle: 'jest subtitle',
            content: 'jest content',
          },
        ]),
      )

      const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
      const actualList: LifeTimelineEvent[] = await logic.getLifeTimelineEvent()

      expect(db.selectAll).toHaveBeenCalledTimes(1)
      expect(actualList).toEqual([
        {
          id: 'test-id',
          type: 'education',
          date: '2023-12-31',
          title: 'jest title',
          subtitle: 'jest subtitle',
          content: 'jest content',
        },
      ])
    })

    test('get empty list from db`', async () => {
      const db = await IndexedDB.getSingleton()
      spy.mockImplementation(() => Promise.resolve([]))

      const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
      const actualList: LifeTimelineEvent[] = await logic.getLifeTimelineEvent()

      expect(db.selectAll).toHaveBeenCalledTimes(1)
      expect(actualList).toEqual([])
    })
  })

  describe('delete LifeTimelineEvent', () => {
    let db: IndexedDB
    let spy: jest.SpyInstance<Promise<boolean>, [id: string], any>

    beforeEach(async () => {
      db = await IndexedDB.getSingleton()
      spy = jest.spyOn(db, 'delete')
    })

    afterEach(async () => {
      await spy.mockClear()
    })

    test('delete a record from db`', async () => {
      const db = await IndexedDB.getSingleton()
      spy.mockImplementation((_: string) => Promise.resolve(true))

      const testId = btoa(encodeURIComponent('test-id'))
      const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
      const actual = await logic.deleteLifeTimelineEvent(testId)

      expect(db.delete).toHaveBeenCalledTimes(1)
      expect(actual).toEqual(true)
    })

    test('failed to delete a record from db`', async () => {
      const db = await IndexedDB.getSingleton()
      spy.mockImplementation((_: string) => Promise.resolve(false))

      const testId = btoa(encodeURIComponent('test-id'))
      const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
      const actual = await logic.deleteLifeTimelineEvent(testId)

      expect(db.delete).toHaveBeenCalledTimes(1)
      expect(actual).toEqual(false)
    })
  })
})
