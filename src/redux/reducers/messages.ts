import { useLoading } from "@components/Loading";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMesssages } from "../types/messages";
import { list } from "@components/Header/list";
// import { AppDispatch, RootState } from '../store'
// import { IConnectData } from '../types/messages'
const loading = useLoading();

export type DataState = {
  list: IMesssages[];
};

const initialState: DataState = {
  list: [],
};

export const messagesReducer = createSlice({
  name: "messages",
  initialState,
  reducers: {
    signout: (state, action) => {},
    addItem: (state, action: PayloadAction<IMesssages>) => {
      state.list.push(action.payload);
    },
  },
  extraReducers(builder) {},
});

// creators are generated for each case reducer function
export const { signout, addItem } = messagesReducer.actions;

export default messagesReducer.reducer;
