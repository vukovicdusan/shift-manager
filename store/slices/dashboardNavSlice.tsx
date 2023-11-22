"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DashboardNavState {
  value: string;
}

const initialState = { value: "Workers" } as DashboardNavState;

export const dashboardNavSlice = createSlice({
  name: "dashboardNav",
  initialState,
  reducers: {
    dashboardNavHandler: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { dashboardNavHandler } = dashboardNavSlice.actions;

export default dashboardNavSlice.reducer;
