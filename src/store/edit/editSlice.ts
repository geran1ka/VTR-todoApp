import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  taskEdit: {},
  isEdit: false,
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editStart: (state, action) => {
      state.id = action.payload.id;
      state.isEdit = true;
      state.taskEdit = action.payload;
    },
    editStop: (state) => {
      state.id = "";
      state.isEdit = false;
      state.taskEdit = {};
    },
  },
});

export default editSlice.reducer;

export const { editStart, editStop } = editSlice.actions;
