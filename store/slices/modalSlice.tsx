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
    openModal: (state, action: PayloadAction<ModalInitStateType>) => {
      state.isOpen = action.payload.isOpen;
      state.data = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal } = modalSlice.actions;

export default modalSlice.reducer;
