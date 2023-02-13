import axiosServices from '../axiosServices'
import { API_ENDPOINT_NODEJS } from '@constant/index'

export const getTokenId = (owner, hashId) => {
  return axiosServices.get(
    `${API_ENDPOINT_NODEJS}/employee/customcv/gettokenid?owner=${owner}&hashid=${hashId}`
  )
}
export const getNFTMetadata = (owner, tokenId) => {
  return axiosServices.get(
    `${API_ENDPOINT_NODEJS}/employee/customcv/getnftmetadata/${tokenId}.json?owner=${owner}`
  )
}

export const publishTemplate = (fd) => {
  return axiosServices.post(`${API_ENDPOINT_NODEJS}/employee/customcv/publishsample`, fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
