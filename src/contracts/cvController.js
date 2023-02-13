import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'

export const ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'employeeId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'data',
        type: 'string',
      },
    ],
    name: 'addCV',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'destroy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'listEmployeeAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'listCVAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: '_checkExistEmployeeAccount',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'employeeId',
        type: 'uint256',
      },
    ],
    name: 'getListCVByEmployeeId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'employeeId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'cvId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'data',
            type: 'string',
          },
        ],
        internalType: 'struct CV[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
export const ADDRESS = '0x3147dB538892B6b1bD4AdA2DC1Cc5f3e56bA4899'

export async function getContract() {
  const provider = await detectEthereumProvider()
  const web3 = new Web3(provider)
  return new web3.eth.Contract(ABI, ADDRESS)
}
