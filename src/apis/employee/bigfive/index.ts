import axiosServices from '@apis/axiosServices'

export const getLastestSessionId = (employeeId: number) => {
  return axiosServices.get<number>(`employee/bigfive/lastest?employee_id=${employeeId}`)
}

export const readBigFive = (employeeId: number) => {
  return axiosServices.get<number>(`employee/bigfive/read_big_five?employee_id=${employeeId}`)
}
export const checkDiff = (employeeId: number) => {
  return axiosServices.get<{ hadBigfive: boolean }>(
    `employee/bigfive/check_diff?employee_id=${employeeId}`
  )
}
