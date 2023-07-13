import axiosServices from '@apis/axiosServices'
import { IMesssages } from '@redux/types/messages'
import { IRecent } from 'src/types/messages'

export const getRecent = (employeeId: number) => {
  return axiosServices.get<IRecent>(`employee/messages/recent/${employeeId}`)
}

export const getHistory = (employeeId: number, businessId: number) => {
  return axiosServices.get<IMesssages[]>(
    `employee/messages/histories/${employeeId}?business_id=${businessId}`
  )
}
