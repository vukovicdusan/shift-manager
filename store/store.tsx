"use client";
import { configureStore } from "@reduxjs/toolkit";
import workerSlice from "./slices/workerSlice";
import shiftSlice from "./slices/shiftSlice";
import modalSlice from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    shifts: shiftSlice,
    workers: workerSlice,
    modal: modalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
