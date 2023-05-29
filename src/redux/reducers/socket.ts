import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

import { AppDispatch, RootState } from "@redux/store";
import { ISocketStore, SocketInput, SocketOutput } from "@redux/types/socket";
import { API_ENDPOINT_NODEJS } from "@constants/index";

const initialState: ISocketStore = {
  client: undefined,
};

export const setClient = createAsyncThunk<
  SocketOutput,
  SocketInput,
  { dispatch: AppDispatch; state: RootState }
>("socket/setclient", async (data) => {
  const client = io(API_ENDPOINT_NODEJS, {
    query: { employeeId: data.employeeId },
  });
  return { client };
});

export const disconnect = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>("socket/disconnect", async () => {
  return;
});

export const socketSlice = createSlice({
  initialState: initialState,
  name: "socket",
  reducers: {
    resetSocket: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(setClient.fulfilled, (state, action) => {
      state.client = action.payload.client as any;
    });
    builder.addCase(disconnect.fulfilled, (state) => {
      state.client?.disconnect();
      state.client = undefined;
    });
  },
});
export const { resetSocket } = socketSlice.actions;
export default socketSlice.reducer;
