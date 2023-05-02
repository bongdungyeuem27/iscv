import { gql } from '@apollo/client'
import { Skill } from './Skill'

export const getDefaultCV = gql`
  query DefaultCV($employeeId: ID!) {
    defaultCV(employeeId: $employeeId) {
      category
      id
      user
      name
      phone
      professional
      email
      github
      linkedin
      sourceImage
      skills {
        id
        employeeId
        title
        level
      }
    }
  }
`
export type IResDefaultCV = {
  defaultCV: {
    category: number
    id: string
    user: string
    name: string
    phone: string
    professional: string
    email: string
    github: string
    linkedin: string
    sourceImage: string
    skills: Skill[]
  }
}

export type IReqDefaultCV = {
  employeeId: number
}
