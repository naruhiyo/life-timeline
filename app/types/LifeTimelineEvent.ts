export type LifeTimelineEvent = {
  id: string
  type: LifeTimelineEventType
  date: string
  title: string
  subtitle: string
  content: string
}

export type LifeTimelineEventType = 'education' | 'work'
