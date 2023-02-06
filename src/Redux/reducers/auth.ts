import { ethers } from 'ethers'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import { IConnectData } from '../types/auth'
import { RootState } from './../store'

export type LoginState = {
  provider: ethers.providers.Web3Provider
  signer: ethers.providers.JsonRpcSigner | undefined
  account: string | undefined
}

const initialState: LoginState = {
  provider: new ethers.providers.Web3Provider(window.ethereum!),
  account: undefined,
  signer: undefined,
}

export const connect = createAsyncThunk<
  IConnectData | void,
  {
    provider: ethers.providers.Web3Provider
  },
  { dispatch: AppDispatch; state: RootState }
>('auth/connect', async ({ provider }) => {
  const accounts = await provider.send('eth_requestAccounts', [])
  const account = accounts[0]
  const signer = provider.getSigner(account)

  return { account, signer }
})

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout: (state, action) => {
      state.account = undefined
      state.signer = undefined
      state.provider = new ethers.providers.Web3Provider(window.ethereum!)
    },
  },
  extraReducers(builder) {
    // Khi thực hiện login thành công (Promise fulfilled)
    builder.addCase(connect.fulfilled, (state, action) => {
      if (action.payload) {
        state.account = action.payload.account
        state.signer = action.payload.signer
      }
    })
  },
})

// creators are generated for each case reducer function
export const { signout } = authReducer.actions

export default authReducer.reducer
