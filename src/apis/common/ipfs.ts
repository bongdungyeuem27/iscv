import axiosServices from "@apis/axiosServices";

export const postObject = (data: object) => {
  return axiosServices.post<string>(`common/ipfs/object`, data);
};
export const postJSON = (data: object) => {
  return axiosServices.post<string>(`common/ipfs/json`, data);
};
