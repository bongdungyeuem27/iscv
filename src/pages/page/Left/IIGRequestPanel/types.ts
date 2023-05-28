import { EIIGRequest } from "src/types/certificate/iig";
import * as Yup from "yup";

export type IForm = {
  employeeId: number;
  certificateType: EIIGRequest;
  examId: number;
};

export const getSchema = () => {
  return Yup.object({
    employeeId: Yup.number().required("required"),
    certificateType: Yup.string()
      .required("required")
      .oneOf(Object.values(EIIGRequest)),
    examId: Yup.number().required("required"),
  });
};
