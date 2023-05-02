import { ethers } from 'ethers'

import { getEmployeeByUser } from '@apis/employee/profile'
import { AppDispatch, RootState } from '@redux/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IEmployee } from 'src/types'
import { IConnectData } from '../types/auth'
import { useLoading } from '@components/Loading'
// import { AppDispatch, RootState } from '../store'
// import { IConnectData } from '../types/auth'
const loading = useLoading()

export type LoginState = {
  provider: ethers.providers.Web3Provider
  signer: ethers.providers.JsonRpcSigner | undefined
  account: string | undefined
  employee: IEmployee | undefined
}

const initialState: LoginState = {
  provider: new ethers.providers.Web3Provider(window.ethereum!),
  account: undefined,
  signer: undefined,
  employee: undefined,
}

export const connect = createAsyncThunk<
  IConnectData,
  {
    provider: ethers.providers.Web3Provider
  },
  { dispatch: AppDispatch; state: RootState }
>('auth/connect', async ({ provider }) => {
  loading.open()
  const accounts = await provider
    .send('eth_requestAccounts', [])
    .catch((error) => console.log(error))
  const account = accounts[0]
  if (!account) return { account: undefined, signer: undefined, employee: undefined }
  const signer = provider.getSigner(account)

  const employee = await getEmployeeByUser({ user: account })
    .then((success) => success.data.data.employeeByUser)
    .catch((error) => console.log(error))
  if (!employee) return { account: account, signer: signer, employee: undefined }

  return { account: account, signer: signer, employee: employee }
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
    builder
      .addCase(connect.fulfilled, (state, action) => {
        if (action.payload) {
          state.account = action.payload.account
          state.signer = action.payload.signer
          state.employee = action.payload.employee
          loading.close()
        }
      })
      .addCase(connect.rejected, (state, action) => {
        loading.close()
      })
  },
})

// creators are generated for each case reducer function
export const { signout } = authReducer.actions

export default authReducer.reducer
