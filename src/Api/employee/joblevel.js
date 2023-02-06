import axiosServices from '../axiosServices'
import { API_ENDPOINT_NODEJS } from '@constant/index'

export const calculate = (id) => {
  return axiosServices.get(`${API_ENDPOINT_NODEJS}/employee/joblevel/calculate/${id}`)
}
