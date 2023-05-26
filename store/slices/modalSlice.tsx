"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModalInitStateType {
  isOpen: boolean;
  formType: string;
  data: {
    start: string;
    end: string;
    alreadyAssignedWorkers: string[];
    id: string;
    title: string;
    classNames: string[];
  };
}

const initialState: ModalInitStateType = {
  isOpen: false,
  formType: "",
  data: {
    start: "",
    end: "",
    alreadyAssignedWorkers: [],
    id: "",
    title: "",
    classNames: [""],
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalInitStateType>) => {
      state.isOpen = action.payload.isOpen;
      state.formType = action.payload.formType;
      state.data = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal } = modalSlice.actions;

export default modalSlice.reducer;
