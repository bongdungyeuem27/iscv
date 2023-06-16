import axiosServices from '@apis/axiosServices'
import { IBusiness } from 'src/types/business'

export const searchBusiness = (search?: string) => {
  return axiosServices.get<IBusiness[]>(`employee/search/business?search=${search}`)
}
