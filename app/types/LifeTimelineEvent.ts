export type LifeTimelineEvent = {
  id: string
  type: LifeTimelineEventType
  date: string
  title: string
  subtitle: string
  content: string
}

export type LifeTimelineEventValid = {
  type: FormValidation
  date: FormValidation
  title: FormValidation
  subtitle: FormValidation
  content: FormValidation
}

export type FormKeys = 'type' | 'date' | 'title' | 'subtitle' | 'content'
export type FormValidation = {
  invalid: boolean
  message: string
}
export type LifeTimelineEventType = 'education' | 'work'
