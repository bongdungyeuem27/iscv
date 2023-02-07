import { gql } from '@apollo/client'

export const getSkillsByEmployeeId = gql`
  query SkillsByEmployeeId($employeeId: ID!) {
    skillsByEmployeeId(employeeId: $employeeId) {
      id
      employeeId
      title
      level
    }
  }
`
export type Skill = {
  id: number
  employeeId: number
  title: string
  level: number
}
export type SkillsByEmployeeId = {
  skillsByEmployeeId: Skill[]
}
