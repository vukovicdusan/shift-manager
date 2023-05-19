"use client";
import { ShiftType } from "@/types/ShiftType";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//take the state from the firebase?
const initialState: ShiftType[] = [];

export const shiftSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    // fetchShifts: (state, action: PayloadAction<ShiftType>) => {
    //   state.push(action.payload);
    // },
    createShift: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { createShift } = shiftSlice.actions;

export default shiftSlice.reducer;
