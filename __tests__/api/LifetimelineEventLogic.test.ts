import 'fake-indexeddb/auto'
import { IndexedDB } from '@/api/IndexedDB'
import { LifeTimelineEventLogic } from '@/api/LifeTimelineEventLogic'
import { LifetimeEvent } from '@/types/LifetimeEvent'

describe('LifeTimelineEventLogic Test', () => {
  describe('create LifeTimelineEvent', () => {
    test('insert an event into indexed db`', async () => {
      const db = await IndexedDB.getSingleton()
      jest.spyOn(db, 'insert').mockImplementation(() => Promise.resolve(true))

      const testData: LifetimeEvent = {
        type: 'education',
        date: '2023-12-31',
        title: 'jest title',
        subtitle: 'jest subtitle',
        content: 'jest content',
      }

      const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
      const actual = await logic.createLifeTimelineEvent(testData)

      expect(db.insert).toHaveBeenCalledTimes(1)
      expect(actual).toEqual(true)
    })
  })
})
