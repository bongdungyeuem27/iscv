import axiosServices from '../axiosServices'
import { API_ENDPOINT_NODEJS } from '@constant/index'

export const postImage = (image, businessId, setProgress) => {
  let fd = new FormData()
  fd.append('image', image)
  return axiosServices.post(`${API_ENDPOINT_NODEJS}/business/post/${businessId}`, fd, {
    onUploadProgress: (progressEvent) => {
      setProgress && setProgress((progressEvent.loaded / progressEvent.total) * 100)
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getImage = async (businessId, imageName) => {
  return new Promise(async (resolve, reject) => {
    await axiosServices
      .get(`${API_ENDPOINT_NODEJS}/business/post/${businessId}/${imageName}`)
      .then((success) => {
        resolve(`${API_ENDPOINT_NODEJS}/business/post/${businessId}/${imageName}`)
      })
      .catch((error) => reject(false))
  })
}
