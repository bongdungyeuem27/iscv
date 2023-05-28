import { EIIGRequest } from "src/types/certificate/iig";

export type IRequestBody = {
  employeeId: number;
  certificateType: EIIGRequest;
  examId: number;
};
