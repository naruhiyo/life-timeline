import 'fake-indexeddb/auto'
import { IndexedDB } from '@/api/IndexedDB'
import { LifeTimelineEventLogic } from '@/api/LifeTimelineEventLogic'
import { LifeTimelineEvent } from '@/types/LifeTimelineEvent'

describe('LifeTimelineEventLogic Test', () => {
  describe('create LifeTimelineEvent', () => {
    test('insert an event into indexed db`', async () => {
      const db = await IndexedDB.getSingleton()
      jest.spyOn(db, 'insert').mockImplementation(() => Promise.resolve(true))

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
  })

  describe('get items of LifeTimelineEvent', () => {
    test('get all records in db`', async () => {
      const db = await IndexedDB.getSingleton()
      jest.spyOn(db, 'selectAll').mockImplementation(() =>
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
  })

  describe('delete LifeTimelineEvent', () => {
    test('delete a record from db`', async () => {
      const db = await IndexedDB.getSingleton()
      jest.spyOn(db, 'delete').mockImplementation((_: string) => Promise.resolve(true))

      const testId = btoa('test-id')
      const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
      const actual = await logic.deleteLifeTimelineEvent(testId)

      expect(db.delete).toHaveBeenCalledTimes(1)
      expect(actual).toEqual(true)
    })
  })
})
