import axiosServices from "@apis/axiosServices";
import { IPFS_GATEWAY } from "@constants/index";

export const postObject = (data: object) => {
  return axiosServices.post<string>(`common/ipfs/object`, data);
};
export const postJSON = (data: object) => {
  return axiosServices.post<string>(`common/ipfs/json`, data);
};

export const getIPFSData = (cid: string) => {
  return axiosServices.get<string>(`${IPFS_GATEWAY}${cid}`);
};
