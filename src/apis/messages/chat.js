import axiosServices from '../axiosServices'
import { API_ENDPOINT_NODEJS } from '@constant/index'

export const getRecentlyPage = (id) => {
  return axiosServices.get(
    `${API_ENDPOINT_NODEJS}/messages/employee/getrecentlypage?employeeid=${id}`
  )
}
export const getRecentlyProfile = (id) => {
  return axiosServices.get(
    `${API_ENDPOINT_NODEJS}/messages/business/getrecentlyprofile?businessid=${id}`
  )
}
