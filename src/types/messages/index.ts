import { IBusiness } from "src/globaltypes";
import { IEmployee } from "..";

export enum ERole {
  EMPLOYEE = "employee",
  BUSINESS = "business",
}

export type IRecent = IBusiness & { updatedAt: Date };
