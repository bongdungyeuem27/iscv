/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ListIIGRequest,
  ListIIGRequestInterface,
} from "../../../../database/business/igg/ListIIGRequest";

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
            name: "businessId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "employeeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "requestDate",
            type: "uint256",
          },
          {
            internalType: "enum IIGRequestType",
            name: "requestType",
            type: "uint8",
          },
          {
            internalType: "enum IIGStatusRequest",
            name: "statusRequest",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct IIGRequest",
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
            name: "businessId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "employeeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "requestDate",
            type: "uint256",
          },
          {
            internalType: "enum IIGRequestType",
            name: "requestType",
            type: "uint8",
          },
          {
            internalType: "enum IIGStatusRequest",
            name: "statusRequest",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct IIGRequest",
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
            name: "businessId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "employeeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "requestDate",
            type: "uint256",
          },
          {
            internalType: "enum IIGRequestType",
            name: "requestType",
            type: "uint8",
          },
          {
            internalType: "enum IIGStatusRequest",
            name: "statusRequest",
            type: "uint8",
          },
        ],
        internalType: "struct IIGRequest",
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
            name: "businessId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "employeeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "requestDate",
            type: "uint256",
          },
          {
            internalType: "enum IIGRequestType",
            name: "requestType",
            type: "uint8",
          },
          {
            internalType: "enum IIGStatusRequest",
            name: "statusRequest",
            type: "uint8",
          },
        ],
        internalType: "struct IIGRequest",
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
            name: "businessId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "employeeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "requestDate",
            type: "uint256",
          },
          {
            internalType: "enum IIGRequestType",
            name: "requestType",
            type: "uint8",
          },
          {
            internalType: "enum IIGStatusRequest",
            name: "statusRequest",
            type: "uint8",
          },
        ],
        internalType: "struct IIGRequest[]",
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
        name: "businessId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "employeeId",
        type: "uint256",
      },
    ],
    name: "isEmployeeHadBeenWaiting",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        name: "businessId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "employeeId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "requestDate",
        type: "uint256",
      },
      {
        internalType: "enum IIGRequestType",
        name: "requestType",
        type: "uint8",
      },
      {
        internalType: "enum IIGStatusRequest",
        name: "statusRequest",
        type: "uint8",
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
    name: "setBusinessId",
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
        name: "businessId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "employeeId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "requestDate",
        type: "uint256",
      },
      {
        internalType: "enum IIGRequestType",
        name: "requestType",
        type: "uint8",
      },
      {
        internalType: "enum IIGStatusRequest",
        name: "statusRequest",
        type: "uint8",
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
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setRequestDate",
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
    name: "setRequestId",
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
        internalType: "enum IIGRequestType",
        name: "value",
        type: "uint8",
      },
    ],
    name: "setRequestType",
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
        internalType: "enum IIGStatusRequest",
        name: "value",
        type: "uint8",
      },
    ],
    name: "setStatusRequest",
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
  "0x60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000072620000666200007860201b60201c565b6200008060201b60201c565b62000218565b600033905090565b62000090620000ea60201b60201c565b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b3373ffffffffffffffffffffffffffffffffffffffff16620001116200016c60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff16146200016a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200016190620001f6565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000620001de60208362000195565b9150620001eb82620001a6565b602082019050919050565b600060208201905081810360008301526200021181620001cf565b9050919050565b6117fe80620002286000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80638da5cb5b116100a2578063e6a1b60f11610071578063e6a1b60f1461027f578063ecb0315b1461029b578063f2fde38b146102cb578063f7f6e9bb146102e7578063fd31e831146103035761010b565b80638da5cb5b146101f9578063cfd41a7e14610217578063daea85c514610233578063e0886f901461024f5761010b565b8063541dd248116100de578063541dd248146101825780637ef3e5721461019e57806380c9419e146101ba57806383197ef0146101ef5761010b565b806306e4e128146101105780632417450f1461012c5780632be2eff11461014857806353ed514314610164575b600080fd5b61012a60048036038101906101259190610e5c565b61031f565b005b61014660048036038101906101419190610efa565b610355565b005b610162600480360381019061015d9190610f4c565b6103b8565b005b61016c610411565b6040516101799190611184565b60405180910390f35b61019c600480360381019061019791906111cb565b61050e565b005b6101b860048036038101906101b39190611389565b610636565b005b6101d460048036038101906101cf91906113b6565b61073d565b6040516101e696959493929190611410565b60405180910390f35b6101f76107a3565b005b6102016107c4565b60405161020e9190611480565b60405180910390f35b610231600480360381019061022c9190610e5c565b6107ed565b005b61024d60048036038101906102489190610efa565b610823565b005b610269600480360381019061026491906113b6565b610885565b6040516102769190611516565b60405180910390f35b61029960048036038101906102949190610e5c565b61095f565b005b6102b560048036038101906102b09190610e5c565b610995565b6040516102c2919061154c565b60405180910390f35b6102e560048036038101906102e09190610efa565b610a8f565b005b61030160048036038101906102fc9190610e5c565b610b12565b005b61031d60048036038101906103189190611567565b610b48565b005b610327610ba1565b806002838154811061033c5761033b6115a7565b5b9060005260206000209060050201600001819055505050565b61035d610c7a565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6103c0610ba1565b80600283815481106103d5576103d46115a7565b5b906000526020600020906005020160040160016101000a81548160ff0219169083600381111561040857610407610fc7565b5b02179055505050565b60606002805480602002602001604051908101604052809291908181526020016000905b8282101561050557838290600052602060002090600502016040518060c0016040529081600082015481526020016001820154815260200160028201548152602001600382015481526020016004820160009054906101000a900460ff1660028111156104a5576104a4610fc7565b5b60028111156104b7576104b6610fc7565b5b81526020016004820160019054906101000a900460ff1660038111156104e0576104df610fc7565b5b60038111156104f2576104f1610fc7565b5b8152505081526020019060010190610435565b50505050905090565b610516610ba1565b846002878154811061052b5761052a6115a7565b5b9060005260206000209060050201600101819055508360028781548110610555576105546115a7565b5b906000526020600020906005020160020181905550826002878154811061057f5761057e6115a7565b5b90600052602060002090600502016003018190555081600287815481106105a9576105a86115a7565b5b906000526020600020906005020160040160006101000a81548160ff021916908360028111156105dc576105db610fc7565b5b021790555080600287815481106105f6576105f56115a7565b5b906000526020600020906005020160040160016101000a81548160ff0219169083600381111561062957610628610fc7565b5b0217905550505050505050565b61063e610ba1565b60028054905081600001818152505060028190806001815401808255809150506001900390600052602060002090600502016000909190919091506000820151816000015560208201518160010155604082015181600201556060820151816003015560808201518160040160006101000a81548160ff021916908360028111156106cc576106cb610fc7565b5b021790555060a08201518160040160016101000a81548160ff021916908360038111156106fc576106fb610fc7565b5b021790555050507f97bf1adc2cadbe5bc095de935f40ef3f626283a7bb5105d980488f5316e0dcbf816040516107329190611516565b60405180910390a150565b6002818154811061074d57600080fd5b90600052602060002090600502016000915090508060000154908060010154908060020154908060030154908060040160009054906101000a900460ff16908060040160019054906101000a900460ff16905086565b6107ab610c7a565b3073ffffffffffffffffffffffffffffffffffffffff16ff5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6107f5610ba1565b806002838154811061080a576108096115a7565b5b9060005260206000209060050201600301819055505050565b61082b610c7a565b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b61088d610dbd565b600282815481106108a1576108a06115a7565b5b90600052602060002090600502016040518060c0016040529081600082015481526020016001820154815260200160028201548152602001600382015481526020016004820160009054906101000a900460ff16600281111561090757610906610fc7565b5b600281111561091957610918610fc7565b5b81526020016004820160019054906101000a900460ff16600381111561094257610941610fc7565b5b600381111561095457610953610fc7565b5b815250509050919050565b610967610ba1565b806002838154811061097c5761097b6115a7565b5b9060005260206000209060050201600201819055505050565b600080600090505b600280549050811015610a835783600282815481106109bf576109be6115a7565b5b906000526020600020906005020160010154148015610a02575082600282815481106109ee576109ed6115a7565b5b906000526020600020906005020160020154145b15610a705760016003811115610a1b57610a1a610fc7565b5b60028281548110610a2f57610a2e6115a7565b5b906000526020600020906005020160040160019054906101000a900460ff166003811115610a6057610a5f610fc7565b5b03610a6f576001915050610a89565b5b8080610a7b90611605565b91505061099d565b50600090505b92915050565b610a97610c7a565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610b06576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610afd906116d0565b60405180910390fd5b610b0f81610cf1565b50565b610b1a610ba1565b8060028381548110610b2f57610b2e6115a7565b5b9060005260206000209060050201600101819055505050565b610b50610ba1565b8060028381548110610b6557610b646115a7565b5b906000526020600020906005020160040160006101000a81548160ff02191690836002811115610b9857610b97610fc7565b5b02179055505050565b60016000610bad610db5565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680610c395750610c036107c4565b73ffffffffffffffffffffffffffffffffffffffff16610c21610db5565b73ffffffffffffffffffffffffffffffffffffffff16145b610c78576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c6f9061173c565b60405180910390fd5b565b3373ffffffffffffffffffffffffffffffffffffffff16610c996107c4565b73ffffffffffffffffffffffffffffffffffffffff1614610cef576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ce6906117a8565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6040518060c001604052806000815260200160008152602001600081526020016000815260200160006002811115610df857610df7610fc7565b5b815260200160006003811115610e1157610e10610fc7565b5b81525090565b6000604051905090565b600080fd5b6000819050919050565b610e3981610e26565b8114610e4457600080fd5b50565b600081359050610e5681610e30565b92915050565b60008060408385031215610e7357610e72610e21565b5b6000610e8185828601610e47565b9250506020610e9285828601610e47565b9150509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610ec782610e9c565b9050919050565b610ed781610ebc565b8114610ee257600080fd5b50565b600081359050610ef481610ece565b92915050565b600060208284031215610f1057610f0f610e21565b5b6000610f1e84828501610ee5565b91505092915050565b60048110610f3457600080fd5b50565b600081359050610f4681610f27565b92915050565b60008060408385031215610f6357610f62610e21565b5b6000610f7185828601610e47565b9250506020610f8285828601610f37565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610fc181610e26565b82525050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6003811061100757611006610fc7565b5b50565b600081905061101882610ff6565b919050565b60006110288261100a565b9050919050565b6110388161101d565b82525050565b6004811061104f5761104e610fc7565b5b50565b60008190506110608261103e565b919050565b600061107082611052565b9050919050565b61108081611065565b82525050565b60c08201600082015161109c6000850182610fb8565b5060208201516110af6020850182610fb8565b5060408201516110c26040850182610fb8565b5060608201516110d56060850182610fb8565b5060808201516110e8608085018261102f565b5060a08201516110fb60a0850182611077565b50505050565b600061110d8383611086565b60c08301905092915050565b6000602082019050919050565b600061113182610f8c565b61113b8185610f97565b935061114683610fa8565b8060005b8381101561117757815161115e8882611101565b975061116983611119565b92505060018101905061114a565b5085935050505092915050565b6000602082019050818103600083015261119e8184611126565b905092915050565b600381106111b357600080fd5b50565b6000813590506111c5816111a6565b92915050565b60008060008060008060c087890312156111e8576111e7610e21565b5b60006111f689828a01610e47565b965050602061120789828a01610e47565b955050604061121889828a01610e47565b945050606061122989828a01610e47565b935050608061123a89828a016111b6565b92505060a061124b89828a01610f37565b9150509295509295509295565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6112a68261125d565b810181811067ffffffffffffffff821117156112c5576112c461126e565b5b80604052505050565b60006112d8610e17565b90506112e4828261129d565b919050565b600060c082840312156112ff576112fe611258565b5b61130960c06112ce565b9050600061131984828501610e47565b600083015250602061132d84828501610e47565b602083015250604061134184828501610e47565b604083015250606061135584828501610e47565b6060830152506080611369848285016111b6565b60808301525060a061137d84828501610f37565b60a08301525092915050565b600060c0828403121561139f5761139e610e21565b5b60006113ad848285016112e9565b91505092915050565b6000602082840312156113cc576113cb610e21565b5b60006113da84828501610e47565b91505092915050565b6113ec81610e26565b82525050565b6113fb8161101d565b82525050565b61140a81611065565b82525050565b600060c08201905061142560008301896113e3565b61143260208301886113e3565b61143f60408301876113e3565b61144c60608301866113e3565b61145960808301856113f2565b61146660a0830184611401565b979650505050505050565b61147a81610ebc565b82525050565b60006020820190506114956000830184611471565b92915050565b60c0820160008201516114b16000850182610fb8565b5060208201516114c46020850182610fb8565b5060408201516114d76040850182610fb8565b5060608201516114ea6060850182610fb8565b5060808201516114fd608085018261102f565b5060a082015161151060a0850182611077565b50505050565b600060c08201905061152b600083018461149b565b92915050565b60008115159050919050565b61154681611531565b82525050565b6000602082019050611561600083018461153d565b92915050565b6000806040838503121561157e5761157d610e21565b5b600061158c85828601610e47565b925050602061159d858286016111b6565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061161082610e26565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611642576116416115d6565b5b600182019050919050565b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006116ba60268361164d565b91506116c58261165e565b604082019050919050565b600060208201905081810360008301526116e9816116ad565b9050919050565b7f5065726d697373696f6e3a206f6e6c7920617070726f76656400000000000000600082015250565b600061172660198361164d565b9150611731826116f0565b602082019050919050565b6000602082019050818103600083015261175581611719565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600061179260208361164d565b915061179d8261175c565b602082019050919050565b600060208201905081810360008301526117c181611785565b905091905056fea26469706673582212202e3efe205beb0d59448aba88da77c5a7e3983f29e251e27e66161306820d781a64736f6c63430008110033";

type ListIIGRequestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ListIIGRequestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ListIIGRequest__factory extends ContractFactory {
  constructor(...args: ListIIGRequestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ListIIGRequest> {
    return super.deploy(overrides || {}) as Promise<ListIIGRequest>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ListIIGRequest {
    return super.attach(address) as ListIIGRequest;
  }
  override connect(signer: Signer): ListIIGRequest__factory {
    return super.connect(signer) as ListIIGRequest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ListIIGRequestInterface {
    return new utils.Interface(_abi) as ListIIGRequestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ListIIGRequest {
    return new Contract(address, _abi, signerOrProvider) as ListIIGRequest;
  }
}