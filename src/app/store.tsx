import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Redux/Menu/menuSlice";
import teamReducer from "./Redux/Team/team-slice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    team:teamReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
