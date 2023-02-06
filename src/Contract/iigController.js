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
        internalType: 'uint256',
        name: 'businessId',
        type: 'uint256',
      },
    ],
    name: 'addLRRequest',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'businessId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'employeeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'testDate',
        type: 'uint256',
      },
      {
        internalType: 'enum ShiftTest',
        name: 'shiftTest',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'expireDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'listeningScore',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'readingScore',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'addLRResult',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'employeeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'businessId',
        type: 'uint256',
      },
    ],
    name: 'addSWRequest',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'businessId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'employeeId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'testDate',
        type: 'uint256',
      },
      {
        internalType: 'enum ShiftTest',
        name: 'shiftTest',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'expireDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'speakingScore',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'writingScore',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'addSWResult',
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
    inputs: [
      {
        internalType: 'address',
        name: 'listBusinessAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'listEmployeeAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'listRequestAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'listLRResultAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'listSWResultAddress',
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
    inputs: [],
    name: '_checkExistBusinessAccount',
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
      {
        internalType: 'uint256',
        name: 'businessId',
        type: 'uint256',
      },
    ],
    name: '_checkExistRequestLR',
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
      {
        internalType: 'uint256',
        name: 'businessId',
        type: 'uint256',
      },
    ],
    name: '_checkExistRequestSW',
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
    name: 'getListLRResultOfEmployee',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'lrResultId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'businessId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'employeeId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'testDate',
            type: 'uint256',
          },
          {
            internalType: 'enum ShiftTest',
            name: 'shiftTest',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'expireDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'listeningScore',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'readingScore',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
        ],
        internalType: 'struct LRResult[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'getListRequestForBusiness',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'requestId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'businessId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'employeeId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestDate',
            type: 'uint256',
          },
          {
            internalType: 'enum RequestType',
            name: 'requestType',
            type: 'uint8',
          },
          {
            internalType: 'enum StatusRequest',
            name: 'statusRequest',
            type: 'uint8',
          },
        ],
        internalType: 'struct Request[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'getListRequestForEmployee',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'requestId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'businessId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'employeeId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestDate',
            type: 'uint256',
          },
          {
            internalType: 'enum RequestType',
            name: 'requestType',
            type: 'uint8',
          },
          {
            internalType: 'enum StatusRequest',
            name: 'statusRequest',
            type: 'uint8',
          },
        ],
        internalType: 'struct Request[]',
        name: '',
        type: 'tuple[]',
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
    name: 'getListSWResultOfEmployee',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'swResultId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'businessId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'employeeId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'testDate',
            type: 'uint256',
          },
          {
            internalType: 'enum ShiftTest',
            name: 'shiftTest',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'expireDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'speakingScore',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'writingScore',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
        ],
        internalType: 'struct SWResult[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'getListWaitingRequestForBusiness',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'requestId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'businessId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'employeeId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestDate',
            type: 'uint256',
          },
          {
            internalType: 'enum RequestType',
            name: 'requestType',
            type: 'uint8',
          },
          {
            internalType: 'enum StatusRequest',
            name: 'statusRequest',
            type: 'uint8',
          },
        ],
        internalType: 'struct Request[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'businessId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'employeeId',
        type: 'uint256',
      },
    ],
    name: 'getListWaitingRequestForMyBusinessByEmployeeId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'requestId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'businessId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'employeeId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestDate',
            type: 'uint256',
          },
          {
            internalType: 'enum RequestType',
            name: 'requestType',
            type: 'uint8',
          },
          {
            internalType: 'enum StatusRequest',
            name: 'statusRequest',
            type: 'uint8',
          },
        ],
        internalType: 'struct Request[]',
        name: '',
        type: 'tuple[]',
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
      {
        internalType: 'uint256',
        name: 'businessId',
        type: 'uint256',
      },
    ],
    name: 'getListWaitingRequestForMyEmployeeByBusinessId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'requestId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'businessId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'employeeId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestDate',
            type: 'uint256',
          },
          {
            internalType: 'enum RequestType',
            name: 'requestType',
            type: 'uint8',
          },
          {
            internalType: 'enum StatusRequest',
            name: 'statusRequest',
            type: 'uint8',
          },
        ],
        internalType: 'struct Request[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lrResultId',
        type: 'uint256',
      },
    ],
    name: 'getLRResultByLRId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'lrResultId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'businessId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'employeeId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'testDate',
            type: 'uint256',
          },
          {
            internalType: 'enum ShiftTest',
            name: 'shiftTest',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'expireDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'listeningScore',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'readingScore',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
        ],
        internalType: 'struct LRResult',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'swResultId',
        type: 'uint256',
      },
    ],
    name: 'getSWResultBySWId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'swResultId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'businessId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'employeeId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'testDate',
            type: 'uint256',
          },
          {
            internalType: 'enum ShiftTest',
            name: 'shiftTest',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'expireDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'speakingScore',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'writingScore',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
        ],
        internalType: 'struct SWResult',
        name: '',
        type: 'tuple',
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
export const ADDRESS = '0x7042e08B44cDc25876221f747C2De6D52cAAE48D'

export async function getContract() {
  const provider = await detectEthereumProvider()
  const web3 = new Web3(provider)
  return new web3.eth.Contract(ABI, ADDRESS)
}
