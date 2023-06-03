import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import socketReducer from './reducers/socket'
import botReducer from './reducers/bot'
import logger from 'redux-logger'
import messagesReducer from './reducers/messages'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
    messages: messagesReducer,
    bot: botReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
      // prepend and concat calls can be chained
      .concat(logger)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
