import { ethers } from 'ethers'
import { EmployeeController__factory } from '../typechain/index'

export const useEmployee = (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeController__factory.connect('0x76f7D51F20c0e58F02bB294775c90966c195b9D6', signer)
}
