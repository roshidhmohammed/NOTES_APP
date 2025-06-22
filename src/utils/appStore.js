import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./slices/configSlice";
import userAuthReducer from "./slices/authSlice";
import noteReducer from "./slices/noteSlice";

export const appStore = configureStore({
  reducer: {
    config: configReducer,
    user: userAuthReducer,
    note: noteReducer,
  },
});
