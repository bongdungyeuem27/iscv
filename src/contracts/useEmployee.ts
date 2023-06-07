import { ethers } from 'ethers'
import { EmployeeController__factory } from '../typechain/index'

export const useEmployee = (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeController__factory.connect('0x7Dd50F5127Db358fD5Db77841E59D4e5E08217B9', signer)
}
