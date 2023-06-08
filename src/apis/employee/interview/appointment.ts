import axiosServices from '@apis/axiosServices'
import { API_ENDPOINT_NODEJS } from '@constants/index'
import { IBigFive } from './types'

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

export const readInterviewAppointment = (interviewId: string) => {
  return axiosServices.get(`employee/interview/appointment/read?interview_id=${interviewId}`)
}

export const getBigFive = async (employeeId: string) => {
  const bigFive = await axiosServices
    .get<IBigFive | null>(`employee/interview/appointment/bigfive?employee_id=${employeeId}`)
    .then((success) => success.data)
  if (bigFive) {
    return {
      pdf: `${API_ENDPOINT_NODEJS}machine/interview/${bigFive.interviewId}/report.pdf`
    }
  }
}
