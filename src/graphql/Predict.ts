import { gql, useQuery } from '@apollo/client'
import { IPost } from 'src/types/posts'

export const getPredict = gql`
  query Prediction($predictionId: ID!) {
    prediction(id: $predictionId) {
      id
      # businessId
      # hashTag
      # time
      # content
      # imageSource
      # job
      # status
    }
  }
`


export type IResPredict = {
  prediction: IPost[]
}

export type IReqPredict = {
  predictionId: number
}
