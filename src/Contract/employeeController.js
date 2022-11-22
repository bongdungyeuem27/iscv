import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'

export const ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'listEmployeeAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'listSkillAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'listApplyAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'listAppointmenAddress',
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
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'applyId',
        type: 'uint256',
      },
    ],
    name: '_checkApplyIdBelongsToEmployeeId',
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
        name: 'postId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'applyId',
        type: 'uint256',
      },
    ],
    name: '_checkApplyIdBelongsToPostId',
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
        name: 'postId',
        type: 'uint256',
      },
    ],
    name: '_checkExistApply',
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
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
    ],
    name: '_checkExistSkill',
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
        name: 'category',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'idCardNumber',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'phone',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'professional',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'github',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'linkedin',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'sourceImage',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'password',
        type: 'string',
      },
    ],
    name: 'addEmployee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'level',
        type: 'uint256',
      },
    ],
    name: 'addSkill',
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
      {
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
    ],
    name: 'applyPost',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'value',
        type: 'address',
      },
    ],
    name: 'autoLogin',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
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
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'idCardNumber',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'phone',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'professional',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'github',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'linkedin',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'sourceImage',
        type: 'string',
      },
    ],
    name: 'editEmployee',
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
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'skillId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'level',
        type: 'uint256',
      },
    ],
    name: 'editSkill',
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
    name: 'getAllProfile',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'category',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'idCardNumber',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'phone',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'professional',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'email',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'github',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'linkedin',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'sourceImage',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'password',
            type: 'string',
          },
        ],
        internalType: 'struct Profile[]',
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
    name: 'getListAppointmentByEmployeeIdAndBusinessId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'appointmentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'applyId',
            type: 'uint256',
          },
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
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'status',
            type: 'uint256',
          },
        ],
        internalType: 'struct Appointment[]',
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
    name: 'getListApppointmentByEmployeeId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'appointmentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'applyId',
            type: 'uint256',
          },
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
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'status',
            type: 'uint256',
          },
        ],
        internalType: 'struct Appointment[]',
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
    name: 'getListSkillOfEmployee',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'skillId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'level',
            type: 'uint256',
          },
        ],
        internalType: 'struct Skill[]',
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
    name: 'getPostIdAppliedOfEmployee',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'applyId',
            type: 'uint256',
          },
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
          {
            internalType: 'uint256',
            name: 'postId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'status',
            type: 'uint256',
          },
        ],
        internalType: 'struct Apply[]',
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
    name: 'getProfile',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'category',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'idCardNumber',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'phone',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'professional',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'email',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'github',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'linkedin',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'sourceImage',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'password',
            type: 'string',
          },
        ],
        internalType: 'struct Profile',
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
        internalType: 'string',
        name: 'password',
        type: 'string',
      },
    ],
    name: 'login',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
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
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'skillId',
        type: 'uint256',
      },
    ],
    name: 'removeSkill',
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
]
export const ADDRESS = '0xEB3c04d8c15d9b0584597AF3254e65efc88a1af5'

export async function getContract() {
  const provider = await detectEthereumProvider()
  const web3 = new Web3(provider)
  return new web3.eth.Contract(ABI, ADDRESS)
}
