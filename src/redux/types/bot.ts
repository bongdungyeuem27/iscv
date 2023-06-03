import { ERole } from 'src/types/messages'

export type IBotMessages = {
  _id: string
  role: ERole
  content: string
  time: Date
}
