import { ethers } from 'ethers'
import { EmployeeController__factory } from '../typechain/index'

export const useEmployee = (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeController__factory.connect('0xa513E6E4b8f2a923D98304ec87F64353C4D5C853', signer)
}
