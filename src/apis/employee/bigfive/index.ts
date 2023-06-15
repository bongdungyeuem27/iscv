import axiosServices from '@apis/axiosServices'

export const readBigFive = (bigfiveId: string) => {
  return axiosServices.put(`employee/bigfive/read?bigfive_id=${bigfiveId}`)
}
