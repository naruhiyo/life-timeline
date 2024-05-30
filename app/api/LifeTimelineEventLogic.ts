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
   * Update life-timeline event
   *
   * @param form {LifeTimelineEvent}
   * @returns {Promise<boolean>}
   */
  async updateLifeTimelineEvent(form: LifeTimelineEvent): Promise<boolean> {
    const db: IndexedDB = await IndexedDB.getSingleton()
    return await db.update<LifeTimelineEvent>(form)
  }

  /**
   * Get life-timeline event
   * @returns {Promise<LifeTimelineEvent>}
   */
  async getLifeTimelineEvent(encodedId: string): Promise<LifeTimelineEvent> {
    const decodedId: string = atob(encodedId)
    const db: IndexedDB = await IndexedDB.getSingleton()
    let item: LifeTimelineEvent | undefined = await db.select<LifeTimelineEvent>(decodedId)
    if (item == undefined) {
      item = {
        id: decodedId,
        type: 'education',
        date: '',
        title: '',
        content: '',
      }
    }
    return item
  }

  /**
   * Get all life-timeline events
   * @returns {Promise<LifeTimelineEvent[]>}
   */
  async getAllLifeTimelineEvents(): Promise<LifeTimelineEvent[]> {
    const db: IndexedDB = await IndexedDB.getSingleton()
    return await db.selectAll<LifeTimelineEvent>()
  }

  /**
   * Delete a life-timeline event
   *
   * @param encodedId Unique key with base64
   * @returns {Promise<boolean>}
   */
  async deleteLifeTimelineEvent(encodedId: string): Promise<boolean> {
    const decodedId: string = atob(encodedId)
    const db: IndexedDB = await IndexedDB.getSingleton()
    return await db.delete(decodedId)
  }
}
