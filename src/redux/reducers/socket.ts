import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Socket, io } from 'socket.io-client'

import { AppDispatch, RootState, store } from '@redux/store'
import {
  ClientToServerEvents,
  ISocketStore,
  ServerToClientEvents,
  SocketInput,
  SocketOutput
} from '@redux/types/socket'
import { API_ENDPOINT_NODEJS } from '@constants/index'
import { addItem, crawl, newRecent } from './messages'
import { crawlBotMessages } from './bot'
import { addItem as addItemBot } from './bot'
import { v4 } from 'uuid'
import { ERole } from 'src/types/messages'

const initialState: ISocketStore = {
  client: undefined
}

export const setClient = createAsyncThunk<
  SocketOutput,
  SocketInput,
  { dispatch: AppDispatch; state: RootState }
>('socket/setclient', async (data, thunkApi) => {
  const client: Socket<ServerToClientEvents, ClientToServerEvents> = io(API_ENDPOINT_NODEJS, {
    query: { employeeId: data.employeeId },
    path: '/socket.io',
    transports: ['websocket'],
    secure: true
  })
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  thunkApi.dispatch(crawl({ employeeId: store.getState().auth.employee?.id! }))
  thunkApi.dispatch(crawlBotMessages({ employeeId: store.getState().auth.employee?.id! }))

  client.on('bot_notification', (data) => {
    thunkApi.dispatch(addItemBot(data))
  })
  client.on('send', (args) => {
    if (store.getState().messages.current === args.employeeId) {
      thunkApi.dispatch(addItem(args as any))
      thunkApi.dispatch(newRecent({ businessId: args.businessId!, updatedAt: new Date() }))
    }
  })
  return { client }
})

export const disconnect = createAsyncThunk<void, void, { dispatch: AppDispatch; state: RootState }>(
  'socket/disconnect',
  async () => {
    return
  }
)

export const socketSlice = createSlice({
  initialState: initialState,
  name: 'socket',
  reducers: {
    resetSocket: () => initialState
  },
  extraReducers(builder) {
    builder.addCase(setClient.fulfilled, (state, action) => {
      state.client = action.payload.client as any
    })
    builder.addCase(disconnect.fulfilled, (state) => {
      state.client?.disconnect()
      state.client = undefined
    })
  }
})
export const { resetSocket } = socketSlice.actions
export default socketSlice.reducer
