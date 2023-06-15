/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  IIGData,
  IIGDataInterface,
} from "../../../../database/business/igg/IIGData";

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
    inputs: [],
    name: "destroy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getIIGAccount",
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
    inputs: [],
    name: "iigAccount",
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
        internalType: "address",
        name: "iigAccountAddress",
        type: "address",
      },
    ],
    name: "setIIGAccount",
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
  "0x608060405234801561001057600080fd5b50600080546001600160a01b0319163317905561003261002d3390565b610037565b6100d5565b61003f610066565b6001600160a01b03166000908152600160208190526040909120805460ff19169091179055565b336100796000546001600160a01b031690565b6001600160a01b0316146100d35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640160405180910390fd5b565b6103d4806100e46000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806383197ef01161005b57806383197ef0146100f55780638da5cb5b146100fd578063daea85c51461010e578063f2fde38b1461012157600080fd5b806315612f861461008d5780632417450f146100bc5780632bab69bb146100d157806359dbd735146100e2575b600080fd5b6002546100a0906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6100cf6100ca36600461036e565b610134565b005b6002546001600160a01b03166100a0565b6100cf6100f036600461036e565b61015d565b6100cf610187565b6000546001600160a01b03166100a0565b6100cf61011c36600461036e565b610192565b6100cf61012f36600461036e565b6101c1565b61013c61023f565b6001600160a01b03166000908152600160205260409020805460ff19169055565b6101656102aa565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b61018f61023f565b30ff5b61019a61023f565b6001600160a01b03166000908152600160208190526040909120805460ff19169091179055565b6101c961023f565b6001600160a01b0381166102335760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b61023c8161031e565b50565b336102526000546001600160a01b031690565b6001600160a01b0316146102a85760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161022a565b565b3360009081526001602052604090205460ff16806102d257506000546001600160a01b031633145b6102a85760405162461bcd60e51b815260206004820152601960248201527f5065726d697373696f6e3a206f6e6c7920617070726f76656400000000000000604482015260640161022a565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561038057600080fd5b81356001600160a01b038116811461039757600080fd5b939250505056fea2646970667358221220fbc17ac4eb89dd726ff6ba422a35f7225e2552451f24f7e11275b26e9f554d6764736f6c63430008110033";

type IIGDataConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: IIGDataConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class IIGData__factory extends ContractFactory {
  constructor(...args: IIGDataConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<IIGData> {
    return super.deploy(overrides || {}) as Promise<IIGData>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): IIGData {
    return super.attach(address) as IIGData;
  }
  override connect(signer: Signer): IIGData__factory {
    return super.connect(signer) as IIGData__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IIGDataInterface {
    return new utils.Interface(_abi) as IIGDataInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IIGData {
    return new Contract(address, _abi, signerOrProvider) as IIGData;
  }
}
