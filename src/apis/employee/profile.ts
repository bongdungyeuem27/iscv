import axiosServices from '@apis/axiosServices'
import { API_ENDPOINT_NODEJS } from '@constants/index'

export const postAvatar = (df: FormData) => {
  return axiosServices.post(`employee/profile/avatar`, df, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteAvatar = (id: number) => {
  return axiosServices.delete(`${API_ENDPOINT_NODEJS}/employee/profile/avatar/${id}`, {})
}
