"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WorkerState {
  value: number;
}

const initialState: WorkerState = {
  value: 0,
};

export const workerSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    createWorker: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { createWorker } = workerSlice.actions;

export default workerSlice.reducer;
