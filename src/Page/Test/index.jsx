import { useState, useEffect, useRef } from 'react'
import { useToast } from '@component/Toast'
import OptionMenu from '@component/OptionMenu'
import Toggle from '@component/Toggle'
import Resizer from 'react-image-file-resizer'
import socketIOClient from 'socket.io-client'
import { getContract as getContractBusiness } from '@contract/businessController'
import Web3 from 'web3'
import { keyStores, connect, WalletConnection, Contract } from 'near-api-js'
import detectEthereumProvider from '@metamask/detect-provider'
import {Modal} from "@iscv/modal"

export const CONTRACT_NAME = 'hello1.bongdungyeuem27.testnet' // line 1

function environment(env) {
  switch (env) {
    case 'mainnet': // line 5
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
     
      }
    case 'testnet': // line 14
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
 
      }
    default:
      throw Error(`Unknown environment '${env}'.`)
  }
}

const nearEnv = environment('testnet')

export default function Test() {
  const toast = useToast()
  const connectNear = async () => {
    const near = await connect({
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      ...nearEnv,
    })
    window.walletConnection = new WalletConnection(near)
    window.contract = new Contract(window.walletConnection.account(), CONTRACT_NAME, {
      viewMethods: ['get_greeting'],
      changeMethods: ['get_account_id', 'set_greeting'],
    })
  }
  const getGreeting = async () => {
    const response = await window.contract.get_greeting()
    console.log(response)
  }

  const setGreeting = async () => {
    const response = await window.contract.set_greeting(
      {
        greeting: 'value',
      } // argument name and value - pass empty object if no args required
      // '300000000000000', // attached GAS (optional)
      // '1000000000000000000000000' // attached deposit in yoctoNEAR (optional)
    )
    console.log(response)
  }

  const loginNear = async () => {
    window.walletConnection.requestSignIn({ contractId: CONTRACT_NAME })
  }
  const announceToMetamask = async () => {
    const provider = await detectEthereumProvider()
    var message = 'Some string'
    const web3 = new Web3(provider)
    // var hash = web3.utils.sha3(message)
    var accounts = await web3.eth.getAccounts()
    var signature = await web3.eth.personal.sign(message, accounts[0])
    // var signature = await web3.eth.personal.sign(hash, accounts[0])
    var signing_address = await web3.eth.personal.ecRecover(message, signature)
    console.log(signing_address)
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectNear}>ConnectNear</button>
        <button onClick={loginNear}>Login</button>
        <button onClick={getGreeting}>getGreeting</button>
        <button onClick={setGreeting}>setGreeting</button>
        <button onClick={announceToMetamask}>AnnounceToMetamask</button>
        <button onClick={() => toast.success('success', { time: 30000, pauseOnHover: true })}>success</button>
        {/* <Modal title='aaa'></Modal> */}
      </header>
    </div>
  )
}

// export default function Test() {
//   const toast = useToast()
//   const [checked, setChecked] = useState(false)
//   const [image, setImage] = useState()
//   const [result, setResult] = useState()
//   useEffect(() => {
//     getContractBusiness().then(async (contractBusiness) => {
//       await contractBusiness.methods
//         .getAllProfile()
//         .call()
//         .then((success) => {
//           // success.map((value, index) => {
//           //   if (value['name'].toLowerCase().includes(search.toString().toLowerCase()))
//           //     list.push({ ...value, typeFor: 'business' })
//           // })
//           console.log(success)
//         })
//         .catch((error) => console.log(error))
//     })
//   }, [])
//   return (
//     <>
//       <button onClick={() => toast.success('success', { time: 30000, pauseOnHover: true })}>
//         success
//       </button>
//       <button onClick={() => toast.info('info', { time: 30000, pauseOnHover: true })}>info</button>
//       <button onClick={() => toast.warning('warning', { time: 30000, pauseOnHover: true })}>
//         warning
//       </button>
//       <button onClick={() => toast.error('error', { time: 30000, pauseOnHover: true })}>
//         error
//       </button>
//       <button onClick={() => toast.clear()}>clear</button>
//       <Toggle state={[checked, setChecked]}></Toggle>
//       <div style={{ position: 'fixed', right: 0, top: '100px' }}>
//         {/* <OptionMenu></OptionMenu> */}
//       </div>
//     </>
//   )
// }
