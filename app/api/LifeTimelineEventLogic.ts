import { IndexedDB } from '@/api/IndexedDB'
import { LifetimeEvent } from '@/types/LifetimeEvent'

export class LifeTimelineEventLogic {
  /**
   * Create life-timeline event
   *
   * @param form {LifetimeEvent}
   * @returns {Promise<boolean>}
   */
  async createLifeTimelineEvent(form: LifetimeEvent): Promise<boolean> {
    const db: IndexedDB = await IndexedDB.getSingleton()
    return await db.insert<LifetimeEvent>(form)
  }
}
