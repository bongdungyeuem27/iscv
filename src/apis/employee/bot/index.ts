import axiosServices from '@apis/axiosServices'
import { IBotMessages } from '@redux/types/bot'

export const getRecentTask = (employeeId: number) => {
  return axiosServices.get<IBotMessages[]>(`employee/bot/recent_task/${employeeId}`)
}
