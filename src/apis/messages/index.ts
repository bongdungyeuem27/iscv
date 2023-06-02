import axiosServices from "@apis/axiosServices";
import { IRecent } from "src/types/messages";

export const getRecent = (employeeId: number) => {
  return axiosServices.get<IRecent>(`employee/messages/recent/${employeeId}`);
};
