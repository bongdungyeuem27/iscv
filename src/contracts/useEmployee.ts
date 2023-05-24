import { ethers } from 'ethers'
import { EmployeeController__factory } from '../typechain/index'

export const useEmployee = (signer: ethers.providers.JsonRpcSigner) => {
  return EmployeeController__factory.connect('0xA238D79D6D1733cC82e910820ec64E2AB4d402Ea', signer)
}
