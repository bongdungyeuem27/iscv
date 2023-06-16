import { EmployeeCVController__factory } from "@typechain/index";
import { ethers } from "ethers";

export const useEmployeeCV = (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeCVController__factory.connect(
    "0xb5CD614893bA24e46017f0deD73B51DB213F062e",
    signer
  );
};
