import axiosServices from '@apis/axiosServices'

export const setInterviewAppointment = (employeeId: number, postId: string) => {
  return axiosServices.post<{
    _id: string
    employeeId: number
    applyId: number
    fromTime: Date
    toTime: Date
    createdAt: string
    updatedAt: string
    __v: number
  }>(`employee/interview/appointment/new`, { employeeId, postId })
}
