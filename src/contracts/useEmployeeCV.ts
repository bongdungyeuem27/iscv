import { EmployeeCVController__factory } from "@typechain/index";
import { ethers } from "ethers";

export const useEmployeeCV = (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeCVController__factory.connect(
    "0xaeD6937156933f0EB295a0061805395bad1Bc1a1",
    signer
  );
};
