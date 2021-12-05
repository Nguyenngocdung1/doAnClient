import { configureStore } from '@reduxjs/toolkit'
import authorReducer from './features/authors/authorSlice'
import bookReducer from './features/books/bookSlice'
import authReducer from './features/auths/authSlice'
export const store = configureStore({
  reducer: {
    authors: authorReducer,
    books: bookReducer.reducer,
    users: authReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch