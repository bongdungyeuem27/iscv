import axiosServices from '../axiosServices'
import { API_ENDPOINT_NODEJS } from '@constant/index'

export const getNotseen = async (appyId) => {
  return axiosServices.get(`${API_ENDPOINT_NODEJS}/business/dashboard/apply/notseen/${appyId}`)
}
export const getSeen = async (appyId) => {
  return axiosServices.get(`${API_ENDPOINT_NODEJS}/business/dashboard/apply/seen/${appyId}`)
}
export const getApplierOfPost = async (appyId) => {
  return axiosServices.get(`${API_ENDPOINT_NODEJS}/business/dashboard/apply/${appyId}`)
}
