import axiosServices from "@apis/axiosServices";
import { IRequestBody } from "./types";

export const postRequest = (body: IRequestBody) => {
  return axiosServices.post(`employee/iig/request`, body);
};
