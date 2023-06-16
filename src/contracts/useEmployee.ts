import { ethers } from 'ethers'
import { EmployeeController__factory } from '../typechain/index'

export const useEmployee = (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeController__factory.connect('0xAE67De5D2AA245DEFd9B9cBb5C7C2d264dD5206C', signer)
}
