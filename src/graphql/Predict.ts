import { gql, useQuery } from '@apollo/client'

export const getPredict = gql`
  query Prediction($predictionId: ID!) {
    prediction(id: $predictionId) {
      id
      businessId
      businessName
      businessUser
      businessSourceImage
      hashTag
      time
      content
      imageSource
      job
      status
    }
  }
`
export type IPredict = {
  id: number
  businessId: number
  businessName: string | undefined
  businessUser: string | undefined
  businessSourceImage: string | undefined
  hashTag: string
  time: Date
  content: string
  imageSource: string
  job: string
  status: number
}

export type IResPredict = {
  prediction: IPredict[]
}

export type IReqPredict = {
  predictionId: number
}
