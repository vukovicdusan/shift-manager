"use client";
import { ShiftType } from "@/types/ShiftType";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//take the state from the firebase?
const initialState: ShiftType[] = [
  {
    id: "1",
    title: "Paja",
    start: "2023-05-16T08:00:00",
    end: "2023-05-16T20:00:00",
    className: "paja",
    overtime: { valid: false, amount: 0 },
  },
  {
    id: "2",
    title: "Patak",
    start: "2023-05-16T08:00:00",
    end: "2023-05-16T20:00:00",
    className: "patak",
    overtime: { valid: false, amount: 0 },
  },
  {
    id: "3",
    title: "Tuna",
    start: "2023-05-16T09:00:00",
    end: "2023-05-16T20:00:00",
    className: "tuna",
    overtime: { valid: false, amount: 0 },
  },
  {
    id: "4",
    title: "Paja",
    start: "2023-05-17T21:00:00",
    end: "2023-05-17T20:00:00",
    className: "paja",
    overtime: { valid: false, amount: 0 },
  },
];

export const shiftSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    fetchShifts: (state) => {},
    createShift: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { createShift, fetchShifts } = shiftSlice.actions;

export default shiftSlice.reducer;
