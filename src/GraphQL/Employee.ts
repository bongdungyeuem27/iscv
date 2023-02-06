import { gql, useQuery } from '@apollo/client'

export type Employee = {
  category: number
  id: number
  user: string
  name: string
  phone: string
  professional: string
  email: string
  github: string
  linkedin: string
  sourceImage: string
}

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
  employeeByUser: Employee
}

export interface GetEmployee {
  employee: Employee
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
