import axiosServices from '../axiosServices'
import { API_ENDPOINT_NODEJS } from '@constant/index'

export const getListMessagesByTime = (businessid, employeeid, from, to) => {
  return axiosServices.get(
    `${API_ENDPOINT_NODEJS}/messages/business/getlistmessagesbytime?businessid=${businessid}&employeeid=${employeeid}&from=${from}&to=${to}`
  )
}
export const send = (businessId, employeeId, content, setProgress) => {
  return axiosServices.post(
    `${API_ENDPOINT_NODEJS}/messages/business/send`,
    {
      businessId: parseInt(businessId),
      employeeId: parseInt(employeeId),
      content: content,
    },
    {
      onUploadProgress: (progressEvent) => {
        setProgress && setProgress((progressEvent.loaded / progressEvent.total) * 100)
      },
    }
  )
}
