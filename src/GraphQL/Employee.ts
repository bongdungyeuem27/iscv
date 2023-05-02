import { IEmployee } from 'src/types'
import { Skill } from './Skill'
import { gql, useQuery } from '@apollo/client'

export const getEmployeeByUser = gql`
  query Query($user: String) {
    employeeByUser(user: $user) {
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
    }
  }
`

export const getEmployeeIdByUser = gql`
  query Query($user: String) {
    employeeByUser(user: $user) {
      id
    }
  }
`

export type GetEmployeeIdByUser = {
  employeeByUser: {
    id: number
  }
}

export interface EmployeeByUserData {
  employeeByUser: IEmployee
}

export interface GetEmployee {
  employee: IEmployee
}

export const getEmployee = gql`
  query Query($employeeId: ID!) {
    employee(id: $employeeId) {
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
    }
  }
`
