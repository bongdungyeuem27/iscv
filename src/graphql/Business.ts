import { gql } from '@apollo/client'
import { Professional } from '@pages/register/types'

export type Business = {
  category: number
  id: number
  user: string
  name: string
  phone: string
  professional: Professional
  email: string
  github: string
  linkedin: string
  sourceImage: string
}

export const getBusinessByUser = gql`
  query Query($user: String) {
    businessByUser(user: $user) {
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

export type GetBusinessByUser = {
  businessByUser: Business | null
}

export const getBusiness = gql`
  query Business($id: Int!) {
    business(id: $id) {
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
export type GetBusiness = {
  business: Business
}

export const getImageNameById = gql`
  query BusinessImage($id: Int!) {
    business(id: $id) {
      sourceImage
      name
    }
  }
`
export type GetImageNameById = {
  business: {
    sourceImage: string
    name: string
  }
}
