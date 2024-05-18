import { ReactElement } from 'react'

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

export type VerticalTimelineMap = {
  [key: string]: {
    color: string
    icon: ReactElement
    label: string
  }
}

export type DownloadFormat = Array<{
  key: string
  label: string
}>
