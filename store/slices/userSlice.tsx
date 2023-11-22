"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TUserSliceState = {
  isAdmin: boolean;
  email: string;
};
const initialState = { isAdmin: false, email: "" } as TUserSliceState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userHandler: (state, action: PayloadAction<TUserSliceState>) => {
      state.isAdmin = action.payload.isAdmin;
      state.email = action.payload.email;
    },
  },
});

export const { userHandler } = userSlice.actions;
export default userSlice.reducer;
