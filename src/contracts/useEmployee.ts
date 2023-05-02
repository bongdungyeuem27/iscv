import { ethers } from "ethers";
import { EmployeeController__factory } from "../typechain/index";

export const useEmployee = async (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeController__factory.connect(
    "0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E",
    signer
  );
};
