import { useLoading } from '@components/Loading'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMesssages } from '../types/messages'
import { list } from '@components/Header/list'
import { IRecent } from 'src/types/messages'
import { AppDispatch, RootState, store } from '@redux/store'
import { getBusiness } from '@apis/business'
import { getHistory, getRecent } from '@apis/messages'
// import { AppDispatch, RootState } from '../store'
// import { IConnectData } from '../types/messages'
const loading = useLoading()

export type DataState = {
  list: IMesssages[]
  recent: IRecent[]
  current: number | undefined
}

const initialState: DataState = {
  list: [],
  recent: [],
  current: undefined
}

export const crawl = createAsyncThunk<
  { recent: IRecent[] },
  {
    employeeId: number
  },
  { dispatch: AppDispatch; state: RootState }
>('messages/crawl', async ({ employeeId }) => {
  const list = await getRecent(employeeId)
    .then((success) => success.data)
    .catch((error) => console.log(error))
  if (!list)
    return {
      recent: [] as IRecent[] as any
    }
  return {
    recent: list
  }
})

export const history = createAsyncThunk<
  { histories: IMesssages[] | void },
  {
    employeeId: number
    businessId: number
  },
  { dispatch: AppDispatch; state: RootState }
>('messages/history', async ({ employeeId, businessId }) => {
  const histories = await getHistory(employeeId, businessId)
    .then((success) => success.data)
    .catch((error) => console.log(error))
  return {
    histories
  }
})

export const newRecent = createAsyncThunk<
  { recentItem: IRecent } | undefined,
  {
    businessId: number
    updatedAt: Date
  },
  { dispatch: AppDispatch; state: RootState }
>('messages/newrecent', async ({ businessId, updatedAt }, thunkApi) => {
  const employee = await getBusiness(businessId).then((success) => success.data)
  thunkApi.dispatch(history({ employeeId: store.getState().auth.employee?.id!, businessId }))
  return {
    recentItem: { ...employee, updatedAt }
  }
})

export const messagesReducer = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    signout: (state, action) => {},
    addItem: (state, action: PayloadAction<IMesssages>) => {
      state.list.push(action.payload)
    },
    setCurrent: (state, action: PayloadAction<{ businessId: number }>) => {
      state.current = action.payload.businessId
    }
  },
  extraReducers(builder) {
    builder
      .addCase(crawl.fulfilled, (state, action) => {
        state.recent = action.payload.recent
      })
      .addCase(crawl.rejected, (state, action) => {})
    builder
      .addCase(history.fulfilled, (state, action) => {
        state.list = action.payload.histories || []
      })
      .addCase(history.rejected, (state, action) => {})
    builder
      .addCase(newRecent.fulfilled, (state, action) => {
        if (action.payload?.recentItem) {
          if (state.recent.findIndex((x) => x.id === action.payload?.recentItem.id) === -1) {
            console.log(action.payload?.recentItem)
            state.recent.unshift(action.payload.recentItem)
          }
          state.current = action.payload.recentItem.id
        }
      })
      .addCase(newRecent.rejected, (state, action) => {})
  }
})

// creators are generated for each case reducer function
export const { signout, addItem, setCurrent } = messagesReducer.actions

export default messagesReducer.reducer
