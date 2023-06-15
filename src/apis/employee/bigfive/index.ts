import axiosServices from '@apis/axiosServices'

export const getLastestSessionId = (employeeId: number) => {
  return axiosServices.get<number>(`employee/bigfive/lastest?employee_id=${employeeId}`)
}
