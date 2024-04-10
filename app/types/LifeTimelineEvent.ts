export type LifeTimelineEvent = {
  id: string
  type: LifeTimelineEventType
  date: string
  title: string
  content: string
}

export type LifeTimelineEventValid = {
  type: FormValidation
  date: FormValidation
  title: FormValidation
  content: FormValidation
}

export type FormKeys = 'type' | 'date' | 'title' | 'content'
export type FormValidation = {
  isInvalid: boolean
  message: string
}
export type LifeTimelineEventType = 'education' | 'work'
