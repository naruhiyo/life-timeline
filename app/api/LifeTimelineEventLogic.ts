import { IndexedDB } from '@/api/IndexedDB'
import { LifeTimelineEvent } from '@/types/LifeTimelineEvent'

export class LifeTimelineEventLogic {
  /**
   * Create life-timeline event
   *
   * @param form {LifeTimelineEvent}
   * @returns {Promise<boolean>}
   */
  async createLifeTimelineEvent(form: LifeTimelineEvent): Promise<boolean> {
    const db: IndexedDB = await IndexedDB.getSingleton()
    return await db.insert<LifeTimelineEvent>(form)
  }

  /**
   * Get all life-timeline events
   * @returns {Promise<LifeTimelineEvent[]>}
   */
  async getLifeTimelineEvent(): Promise<LifeTimelineEvent[]> {
    const db: IndexedDB = await IndexedDB.getSingleton()
    return await db.selectAll<LifeTimelineEvent>()
  }

  /**
   * Delete a life-timeline event
   *
   * @param encoedId Unique key with base64
   * @returns {Promise<boolean>}
   */
  async deleteLifeTimelineEvent(encoedId: string): Promise<boolean> {
    const decodedId: string = atob(encoedId)
    const db: IndexedDB = await IndexedDB.getSingleton()
    return await db.delete(decodedId)
  }
}
