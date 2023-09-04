import { ethers } from 'ethers'
import { EmployeeController__factory } from '../typechain/index'

export const useEmployee = (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeController__factory.connect('0xDA904C5b695dCE660Df78D37639A9Df6EE839aBa', signer)
}
