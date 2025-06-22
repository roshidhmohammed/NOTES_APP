import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
};

export const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    addAuthUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export default authSlice.reducer;

export const userAuthSelector = (state) => state.authSlice;

export const { addAuthUserDetails } = authSlice.actions;
