import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noteTitle: null,
  noteContent: null,
  iSEditable: null,
  colloboratorLists: null,
  allNotes: null,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNoteTitle: (state, action) => {
      state.noteTitle = action.payload;
    },
    addNoteContent: (state, action) => {
      state.noteContent = action.payload;
    },
    updateIsEditable: (state, action) => {
      state.iSEditable = action.payload;
    },
    addColloboratorLists: (state, action) => {
      state.colloboratorLists = action.payload;
    },
    addAllNotes: (state, action) => {
      state.allNotes = action.payload;
    },
  },
});

export default noteSlice.reducer;

export const {
  addNoteTitle,
  addNoteContent,
  updateIsEditable,
  addColloboratorLists,
  addAllNotes,
} = noteSlice.actions;
