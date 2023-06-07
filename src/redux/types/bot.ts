import { ERole } from 'src/types/messages'

export enum EBotCategory {
  NEW_INTERVIEW,
  INTERVIEW_DIRECTION
}

export type IBotMetadata = {
  _id: string
  fromTime?: Date
  toTime?: Date
  businessImage?: string
  businessId?: number
  businessName?: string
}

export type IBotMessages = {
  _id: string
  role: ERole
  content: string
  time: Date
  category?: EBotCategory
  metadata?: IBotMetadata
}
