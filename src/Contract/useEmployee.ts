import { ethers } from "ethers";
import { EmployeeController__factory } from "../Typechain/index";

export const useEmployee = async (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeController__factory.connect(
    "0x4c5859f0F772848b2D91F1D83E2Fe57935348029",
    signer
  );
};
