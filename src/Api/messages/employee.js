import axiosServices from '../axiosServices'
import { API_ENDPOINT_NODEJS } from '@constant/index'

export const getListMessagesByTime = (employeeid, businessid, from, to) => {
  return axiosServices.get(
    `${API_ENDPOINT_NODEJS}/messages/employee/getlistmessagesbytime?businessid=${businessid}&employeeid=${employeeid}&from=${from}&to=${to}`
  )
}
