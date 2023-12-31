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
          type: 'education',
          date: '2023-12-31',
          title: 'jest title',
          subtitle: 'jest subtitle',
          content: 'jest content',
        },
      ])
    })
  })
})
