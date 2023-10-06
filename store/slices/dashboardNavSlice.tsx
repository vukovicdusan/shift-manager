"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: string = "Add Worker";

export const dashboardNavSlice = createSlice({
  name: "dashboardNav",
  initialState,
  reducers: {
    dashboardNavHandler: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { dashboardNavHandler } = dashboardNavSlice.actions;

export default dashboardNavSlice.reducer;
