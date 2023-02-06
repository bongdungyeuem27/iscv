import { ethers } from "ethers";
import { EmployeeController__factory } from "../Typechain/index";

export const useEmployee = async (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeController__factory.connect(
    "0x071586BA1b380B00B793Cc336fe01106B0BFbE6D",
    signer
  );
};
