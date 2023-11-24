"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TUserSliceState = {
  isAdmin: boolean;
  email: string;
  isLoggedIn: boolean;
};
const initialState = { isAdmin: false, email: "" } as TUserSliceState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userHandler: (state, action: PayloadAction<TUserSliceState>) => {
      state.isAdmin = action.payload.isAdmin;
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const { userHandler } = userSlice.actions;
export default userSlice.reducer;
