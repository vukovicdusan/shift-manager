"use client";
import { ShiftType } from "@/types/ShiftType";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModalInitStateType {
  isOpen: boolean;
  data: { start: string; end: string };
}

const initialState: ModalInitStateType = {
  isOpen: false,
  data: { start: "", end: "" },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // fetchShifts: (state, action: PayloadAction<ShiftType>) => {
    //   state.push(action.payload);
    // },
    openModal: (state, action: PayloadAction<ModalInitStateType>) => {
      state = action.payload;
      console.log("coming from modalSlice:", JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal } = modalSlice.actions;

export default modalSlice.reducer;
