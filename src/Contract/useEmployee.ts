import { ethers } from "ethers";
import { EmployeeController__factory } from "../Typechain/index";

export const useEmployee = async (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeController__factory.connect(
    "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    signer
  );
};
