"use client";
import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import dashboardNavSlice from "./slices/dashboardNavSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    dashboardNav: dashboardNavSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
