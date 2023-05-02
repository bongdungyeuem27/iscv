import { gql } from '@apollo/client'

export const getSkillsByEmployee = gql`
  query DefaultCV($employeeId: ID!) {
    skillsByEmployee(employeeId: $employeeId) {
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
export type IResSkillsByEmployee = {
  skillsByEmployee: Skill[] | null
}
export type IReqSkillsByEmployee = {
  employeeId: number
}
