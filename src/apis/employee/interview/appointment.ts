import axiosServices from '@apis/axiosServices'

export const readInterviewAppointment = (interviewId: string) => {
  return axiosServices.get(`employee/appointment/read?interview_id=${interviewId}`)
}
