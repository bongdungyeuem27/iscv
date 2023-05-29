import { ethers } from "ethers";
import { IEmployee } from "src/types";
import { ERole } from "src/types/messages";

export type IConnectData = {
  account: string | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
  employee: IEmployee | undefined;
};

export type IMesssages = {
  _id: string;
  employeeId?: number;
  businessId?: number;
  role: ERole;
  content: string;
  time: Date;
};

// export type ILoginData = {
//   account: string | undefined
//   signer: ethers.providers.JsonRpcSigner | undefined
// }

// export type ISignOutData = {

// }
// export interface IRegisterData {
//   user: User;
//   accessToken: string;
//   refreshToken: string;
// }

// export interface IAutoData {
//   user: User;
//   accessToken: string;
//   refreshToken: string;
// }

// export interface User {
//   username: string;
//   email: string;
//   _id: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }
