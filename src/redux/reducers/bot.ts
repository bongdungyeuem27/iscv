import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBotMessages } from '../types/bot'

export type DataState = {
  list: IBotMessages[]
}

const initialState: DataState = {
  list: []
}

export const botReducer = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IBotMessages>) => {
      state.list.push(action.payload)
    }
  }
})

// creators are generated for each case reducer function
export const { addItem } = botReducer.actions

export default botReducer.reducer
