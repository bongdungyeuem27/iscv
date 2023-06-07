import { getRecentTask } from '@apis/employee/bot'
import { AppDispatch, RootState } from '@redux/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBotMessages } from '../types/bot'

export type DataState = {
  list: IBotMessages[]
}

const initialState: DataState = {
  list: []
}

export const crawlBotMessages = createAsyncThunk<
  {
    list?: IBotMessages[]
  },
  {
    employeeId: number
  },
  { dispatch: AppDispatch; state: RootState }
>('bot/crawl', async ({ employeeId }) => {
  const list = await getRecentTask(employeeId).then((success) => success.data)
  return {
    list
  }
})

export const botReducer = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IBotMessages>) => {
      state.list.unshift(action.payload)
    }
  },
  extraReducers(builder) {
    builder.addCase(crawlBotMessages.fulfilled, (state, action) => {
      if (action.payload.list) {
        state.list = action.payload.list
      }
    })
  }
})

// creators are generated for each case reducer function
export const { addItem } = botReducer.actions

export default botReducer.reducer
