import { EmployeeCVController__factory } from "@typechain/index";
import { ethers } from "ethers";

export const useEmployeeCV = (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeCVController__factory.connect(
    "0x50A5449060711A82895D13DBb3198C2445acFa99",
    signer
  );
};
