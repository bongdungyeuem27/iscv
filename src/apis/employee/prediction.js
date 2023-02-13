import axiosServices from '../axiosServices'
import { API_ENDPOINT_NODEJS } from '@constant/index'

export const prediction = (id) => {
  return axiosServices.get(`${API_ENDPOINT_NODEJS}/employee/prediction/${id}`)
}
