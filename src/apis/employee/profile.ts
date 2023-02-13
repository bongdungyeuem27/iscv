import axiosServices from '@apis/axiosServices'
import { API_ENDPOINT_NODEJS, NODE_GRAPHQL_SERVER } from '@constants/index'

export const postAvatar = (df: FormData) => {
  return axiosServices.post(`${NODE_GRAPHQL_SERVER}employee/profile/avatar`, df, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteAvatar = (id: number) => {
  return axiosServices.delete(`${API_ENDPOINT_NODEJS}/employee/profile/avatar/${id}`, {})
}

export const getAvatar = async (id: number) => {
  return new Promise(async (resolve, reject) => {
    await axiosServices
      .get(`${API_ENDPOINT_NODEJS}/employee/profile/avatar/${id}`)
      .then((success) => {
        resolve(`${API_ENDPOINT_NODEJS}/employee/profile/avatar/${id}`)
      })
      .catch((error) => reject(false))
  })
}
