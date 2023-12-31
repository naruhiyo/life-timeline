import 'fake-indexeddb/auto'
import { IndexedDB } from '@/api/IndexedDB'
import { LifeTimelineEventLogic } from '@/api/LifeTimelineEventLogic'
import { LifeTimelineEvent } from '@/types/LifeTimelineEvent'

describe('LifeTimelineEventLogic Test', () => {
  describe('createLifeTimelineEvent()', () => {
    let db: IndexedDB
    let spy: jest.SpyInstance<Promise<boolean>, [form: unknown], any>

    beforeEach(async () => {
      db = await IndexedDB.getSingleton()
      spy = jest.spyOn(db, 'insert')
    })

    afterEach(async () => {
      await spy.mockClear()
    })

    test('Inserted a life-timeline event into IndexedDB and returned `true`.', async () => {
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

    test('Failed to insert a life-timeline event into IndexedDB and returned `false`.', async () => {
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

  describe('getLifeTimelineEvent()', () => {
    let db: IndexedDB
    let spy: jest.SpyInstance<Promise<unknown[]>, [], any>

    beforeEach(async () => {
      db = await IndexedDB.getSingleton()
      spy = jest.spyOn(db, 'selectAll')
    })

    afterEach(async () => {
      await spy.mockClear()
    })

    test('Retrieve all lifetime-event items from IndexedDB and return them.', async () => {
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

    test('Retrieve an empty list from IndexedDB and return it.', async () => {
      const db = await IndexedDB.getSingleton()
      spy.mockImplementation(() => Promise.resolve([]))

      const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
      const actualList: LifeTimelineEvent[] = await logic.getLifeTimelineEvent()

      expect(db.selectAll).toHaveBeenCalledTimes(1)
      expect(actualList).toEqual([])
    })
  })
})
