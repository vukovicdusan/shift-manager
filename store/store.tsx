"use client";
import { configureStore } from "@reduxjs/toolkit";
import shiftSlice from "./slices/shiftSlice";
import modalSlice from "./slices/modalSlice";
import dashboardNavSlice from "./slices/dashboardNavSlice";

export const store = configureStore({
  reducer: {
    shifts: shiftSlice,
    modal: modalSlice,
    dashboardNav: dashboardNavSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
