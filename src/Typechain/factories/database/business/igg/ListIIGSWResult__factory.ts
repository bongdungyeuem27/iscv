/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ListIIGSWResult,
  ListIIGSWResultInterface,
} from "../../../../database/business/igg/ListIIGSWResult";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "employeeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "testDate",
            type: "uint256",
          },
          {
            internalType: "enum IIGShiftTest",
            name: "shiftTest",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "expireDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "speakingScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "writingScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct IIGSWResult",
        name: "item",
        type: "tuple",
      },
    ],
    name: "Add",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "employeeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "testDate",
            type: "uint256",
          },
          {
            internalType: "enum IIGShiftTest",
            name: "shiftTest",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "expireDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "speakingScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "writingScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct IIGSWResult",
        name: "item",
        type: "tuple",
      },
    ],
    name: "Remove",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "employeeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "testDate",
            type: "uint256",
          },
          {
            internalType: "enum IIGShiftTest",
            name: "shiftTest",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "expireDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "speakingScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "writingScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        internalType: "struct IIGSWResult",
        name: "item",
        type: "tuple",
      },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "at",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "employeeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "testDate",
            type: "uint256",
          },
          {
            internalType: "enum IIGShiftTest",
            name: "shiftTest",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "expireDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "speakingScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "writingScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        internalType: "struct IIGSWResult",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "destroy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAll",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "employeeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "testDate",
            type: "uint256",
          },
          {
            internalType: "enum IIGShiftTest",
            name: "shiftTest",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "expireDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "speakingScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "writingScore",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        internalType: "struct IIGSWResult[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "list",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "employeeId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "testDate",
        type: "uint256",
      },
      {
        internalType: "enum IIGShiftTest",
        name: "shiftTest",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "expireDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "speakingScore",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "writingScore",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "value",
        type: "address",
      },
    ],
    name: "retrive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setEmployeeId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setExprireDate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "employeeId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "testDate",
        type: "uint256",
      },
      {
        internalType: "enum IIGShiftTest",
        name: "shiftTest",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "expireDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "speakingScore",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "writingScore",
        type: "uint256",
      },
    ],
    name: "setRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "enum IIGShiftTest",
        name: "value",
        type: "uint8",
      },
    ],
    name: "setShiftTest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setSpeakingScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setTestDate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setWritingScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b0319163317905561003261002d3390565b610037565b6100d5565b61003f610066565b6001600160a01b03166000908152600160208190526040909120805460ff19169091179055565b336100796000546001600160a01b031690565b6001600160a01b0316146100d35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640160405180910390fd5b565b610db3806100e46000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806383197ef011610097578063e0886f9011610066578063e0886f9014610207578063e6a1b60f14610227578063f2fde38b1461023a578063fe9f0bae1461024d57600080fd5b806383197ef0146101be5780638da5cb5b146101c6578063b34be8d3146101e1578063daea85c5146101f457600080fd5b806359761a5d116100d357806359761a5d1461015e57806377ea9d951461017157806380c9419e1461018457806381847fc4146101ab57600080fd5b80631d7d6896146101055780631f60c8a11461011a5780632417450f1461012d57806353ed514314610140575b600080fd5b610118610113366004610a82565b610260565b005b610118610128366004610ab8565b610295565b61011861013b366004610b5d565b6103df565b610148610408565b6040516101559190610c1c565b60405180910390f35b61011861016c366004610a82565b6104e7565b61011861017f366004610a82565b61051c565b610197610192366004610c6b565b610551565b604051610155989796959493929190610c84565b6101186101b9366004610ccc565b6105ab565b6101186105fd565b6000546040516001600160a01b039091168152602001610155565b6101186101ef366004610a82565b610608565b610118610202366004610b5d565b61063d565b61021a610215366004610c6b565b61066c565b6040516101559190610cf8565b610118610235366004610a82565b610726565b610118610248366004610b5d565b61075b565b61011861025b366004610d0d565b6107d9565b6102686108fd565b806002838154811061027c5761027c610d67565b9060005260206000209060080201600401819055505050565b61029d6108fd565b6002805480835260018082018355600092909252825160089091027f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace810191825560208401517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf82015560408401517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad082015560608401517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad19091018054859460ff199091169083600481111561037657610376610b8d565b02179055506080820151816004015560a0820151816005015560c0820151816006015560e0820151816007015550507f3a916d474e62c331ceff9a3c6e7b3d7e84ebd1c4a272f54ad243e0a4af6eba30816040516103d49190610cf8565b60405180910390a150565b6103e7610973565b6001600160a01b03166000908152600160205260409020805460ff19169055565b60606002805480602002602001604051908101604052809291908181526020016000905b828210156104de5783829060005260206000209060080201604051806101000160405290816000820154815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff16600481111561049257610492610b8d565b60048111156104a3576104a3610b8d565b81526020016004820154815260200160058201548152602001600682015481526020016007820154815250508152602001906001019061042c565b50505050905090565b6104ef6108fd565b806002838154811061050357610503610d67565b9060005260206000209060080201600501819055505050565b6105246108fd565b806002838154811061053857610538610d67565b9060005260206000209060080201600201819055505050565b6002818154811061056157600080fd5b6000918252602090912060089091020180546001820154600283015460038401546004850154600586015460068701546007909701549597509395929460ff909216939092909188565b6105b36108fd565b80600283815481106105c7576105c7610d67565b60009182526020909120600360089092020101805460ff191660018360048111156105f4576105f4610b8d565b02179055505050565b610605610973565b30ff5b6106106108fd565b806002838154811061062457610624610d67565b9060005260206000209060080201600601819055505050565b610645610973565b6001600160a01b03166000908152600160208190526040909120805460ff19169091179055565b610674610a2c565b6002828154811061068757610687610d67565b9060005260206000209060080201604051806101000160405290816000820154815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff1660048111156106e3576106e3610b8d565b60048111156106f4576106f4610b8d565b815260048201546020820152600582015460408201526006820154606082015260079091015460809091015292915050565b61072e6108fd565b806002838154811061074257610742610d67565b9060005260206000209060080201600101819055505050565b610763610973565b6001600160a01b0381166107cd5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6107d6816109dc565b50565b6107e16108fd565b85600288815481106107f5576107f5610d67565b906000526020600020906008020160010181905550846002888154811061081e5761081e610d67565b906000526020600020906008020160020181905550836002888154811061084757610847610d67565b60009182526020909120600360089092020101805460ff1916600183600481111561087457610874610b8d565b0217905550826002888154811061088d5761088d610d67565b90600052602060002090600802016004018190555081600288815481106108b6576108b6610d67565b90600052602060002090600802016005018190555080600288815481106108df576108df610d67565b90600052602060002090600802016006018190555050505050505050565b3360009081526001602052604090205460ff168061092557506000546001600160a01b031633145b6109715760405162461bcd60e51b815260206004820152601960248201527f5065726d697373696f6e3a206f6e6c7920617070726f7665640000000000000060448201526064016107c4565b565b336109866000546001600160a01b031690565b6001600160a01b0316146109715760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016107c4565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60405180610100016040528060008152602001600081526020016000815260200160006004811115610a6057610a60610b8d565b8152602001600081526020016000815260200160008152602001600081525090565b60008060408385031215610a9557600080fd5b50508035926020909101359150565b803560058110610ab357600080fd5b919050565b6000610100808385031215610acc57600080fd5b6040519081019067ffffffffffffffff82118183101715610afd57634e487b7160e01b600052604160045260246000fd5b81604052833581526020840135602082015260408401356040820152610b2560608501610aa4565b60608201526080840135608082015260a084013560a082015260c084013560c082015260e084013560e0820152809250505092915050565b600060208284031215610b6f57600080fd5b81356001600160a01b0381168114610b8657600080fd5b9392505050565b634e487b7160e01b600052602160045260246000fd5b60058110610bc157634e487b7160e01b600052602160045260246000fd5b9052565b8051825260208101516020830152604081015160408301526060810151610bef6060840182610ba3565b506080810151608083015260a081015160a083015260c081015160c083015260e081015160e08301525050565b6020808252825182820181905260009190848201906040850190845b81811015610c5f57610c4b838551610bc5565b928401926101009290920191600101610c38565b50909695505050505050565b600060208284031215610c7d57600080fd5b5035919050565b88815260208101889052604081018790526101008101610ca76060830188610ba3565b8560808301528460a08301528360c08301528260e08301529998505050505050505050565b60008060408385031215610cdf57600080fd5b82359150610cef60208401610aa4565b90509250929050565b6101008101610d078284610bc5565b92915050565b600080600080600080600060e0888a031215610d2857600080fd5b873596506020880135955060408801359450610d4660608901610aa4565b9699959850939660808101359560a0820135955060c0909101359350915050565b634e487b7160e01b600052603260045260246000fdfea26469706673582212201e2e57c78183e6e5f8a849748d660055261a8690f5650e1f941b6adfb6fedc3f64736f6c63430008110033";

type ListIIGSWResultConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ListIIGSWResultConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ListIIGSWResult__factory extends ContractFactory {
  constructor(...args: ListIIGSWResultConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ListIIGSWResult> {
    return super.deploy(overrides || {}) as Promise<ListIIGSWResult>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ListIIGSWResult {
    return super.attach(address) as ListIIGSWResult;
  }
  override connect(signer: Signer): ListIIGSWResult__factory {
    return super.connect(signer) as ListIIGSWResult__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ListIIGSWResultInterface {
    return new utils.Interface(_abi) as ListIIGSWResultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ListIIGSWResult {
    return new Contract(address, _abi, signerOrProvider) as ListIIGSWResult;
  }
}
