export type LifeTimelineEvent = {
  id: string
  type: 'education' | 'work'
  date: string
  title: string
  subtitle: string
  content: string
}

export type LifeTimelineEventType = 'education' | 'work'
