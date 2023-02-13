import axiosServices from '../axiosServices'
import { API_ENDPOINT_NODEJS } from '@constant/index'

export const getAppointmentByBusinessId = (id, from, to) => {
  return axiosServices.get(
    `${API_ENDPOINT_NODEJS}/business/appointment/getlistappointment/${id}?from=${from}&to=${to}`
  )
}
