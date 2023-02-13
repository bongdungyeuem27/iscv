import axiosServices from '../axiosServices'
import { API_ENDPOINT_NODEJS } from '@constant/index'

export const searchByName = (search) => {
  return axiosServices.post(`${API_ENDPOINT_NODEJS}/feed/search?search=${search}`)
}
