import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    isLoading: false,
    showCcolloboratorLists: false,
    showFilterContainer: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setShowCcolloboratorLists: (state) => {
      state.showCcolloboratorLists = !state.showCcolloboratorLists;
    },
    setShowFilterContainer: (state) => {
      state.showFilterContainer = !state.showFilterContainer;
    },
  },
});

export const { setLoading, setShowCcolloboratorLists, setShowFilterContainer } =
  configSlice.actions;
export default configSlice.reducer;
