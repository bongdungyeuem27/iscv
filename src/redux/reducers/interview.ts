import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IBotMessages } from '../types/bot'
import { IAnswer, QUESTION_IN } from '@redux/types/interview'

export type DataState = {
  answers: IAnswer[]
  // current: number
}

const initialState: DataState = {
  answers: []
  // current: 0
}

export const botReducer = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    addAnswer: (state, action: PayloadAction<IAnswer>) => {
      state.answers.push(action.payload)
    }
    // setCurrent: (state, action: PayloadAction<{ current: (typeof QUESTION_IN)[number] }>) => {
    //   if (!(action.payload.current in QUESTION_IN)) return
    //   state.current = action.payload.current
    // }
  },
  extraReducers(builder) {}
})

// creators are generated for each case reducer function
export const { addAnswer } = botReducer.actions

export default botReducer.reducer
