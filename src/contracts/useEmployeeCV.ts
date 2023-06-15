import { EmployeeCVController__factory } from "@typechain/index";
import { ethers } from "ethers";

export const useEmployeeCV = (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeCVController__factory.connect(
    "0x95eC1741BBEAe28eeb81433075fae80d2Dc03E40",
    signer
  );
};
