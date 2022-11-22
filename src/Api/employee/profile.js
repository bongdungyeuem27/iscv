import axiosServices from '../axiosServices'
import { API_ENDPOINT_NODEJS } from '@constant/index'

export const uploadAvatar = (fd, id, setProgress) => {
  return axiosServices.post(`${API_ENDPOINT_NODEJS}/employee/profile/avatar/${id}`, fd, {
    onUploadProgress: (progressEvent) => {
      setProgress && setProgress((progressEvent.loaded / progressEvent.total) * 100)
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const deleteAvatar = (id) => {
  return axiosServices.delete(`${API_ENDPOINT_NODEJS}/employee/profile/avatar/${id}`)
}

export const getAvatar = async (id) => {
  return new Promise(async (resolve, reject) => {
    await axiosServices
      .get(`${API_ENDPOINT_NODEJS}/employee/profile/avatar/${id}`)
      .then((success) => {
        resolve(`${API_ENDPOINT_NODEJS}/employee/profile/avatar/${id}`)
      })
      .catch((error) => reject(false))
  })
}
